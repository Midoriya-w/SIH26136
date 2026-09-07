def test_get_clauses_library(client):
    response = client.get("/api/v1/contracts/clauses")
    assert response.status_code == 200
    clauses = response.json()
    assert len(clauses) >= 4
    categories = [c["category"] for c in clauses]
    assert "IP_OWNERSHIP" in categories
    assert "DATA_LOCALIZATION" in categories

def test_list_contracts(client):
    response = client.get("/api/v1/contracts")
    assert response.status_code == 200
    contracts = response.json()
    assert len(contracts) > 0
    contract = contracts[0]
    assert "total_budget" in contract
    assert "challenge_id" in contract

def test_create_and_sign_contract_flow(client, dept_auth_headers, startup_auth_headers):
    # 1. Create Contract
    payload = {
        "challenge_id": "66a01f999999999999999999",
        "application_id": "66a02f999999999999999999",
        "startup_id": "STARTUP-MEDTECH-TEST",
        "department_id": "DEPT-HEALTH-MAHA",
        "title": "Automated Tele-Radiology Diagnostic Suite",
        "total_budget": 800000.0
    }
    create_res = client.post("/api/v1/contracts", json=payload, headers=dept_auth_headers)
    assert create_res.status_code == 200
    contract_data = create_res.json()
    contract_id = contract_data["id"]
    assert contract_data["status"] == "DRAFT"

    # 2. Initiate Startup Signature
    sig_req_1 = {
        "signatory_name": "Rohan Gupta",
        "signatory_role": "STARTUP",
        "sign_type": "AADHAAR_ESIGN"
    }
    sig1_res = client.post(f"/api/v1/signatures/initiate/{contract_id}", json=sig_req_1, headers=startup_auth_headers)
    assert sig1_res.status_code == 200
    sig1_data = sig1_res.json()
    txn_1 = sig1_data["transaction_id"]

    # 3. Simulate Webhook callback for Startup
    webhook_1 = {
        "transaction_id": txn_1,
        "status": "COMPLETED",
        "certificate_serial": "GOI-TEST-001",
        "signature_fingerprint": "SHA256-TEST-STARTUP"
    }
    wh1_res = client.post("/api/v1/signatures/webhook", json=webhook_1)
    assert wh1_res.status_code == 200

    # 4. Initiate Department Signature
    sig_req_2 = {
        "signatory_name": "Suresh Deshmukh",
        "signatory_role": "DEPARTMENT",
        "sign_type": "DIGILOCKER"
    }
    sig2_res = client.post(f"/api/v1/signatures/initiate/{contract_id}", json=sig_req_2, headers=dept_auth_headers)
    assert sig2_res.status_code == 200
    txn_2 = sig2_res.json()["transaction_id"]

    # 5. Simulate Webhook callback for Department -> should seal contract with SHA-256
    webhook_2 = {
        "transaction_id": txn_2,
        "status": "COMPLETED",
        "certificate_serial": "GOI-TEST-002",
        "signature_fingerprint": "SHA256-TEST-DEPT"
    }
    wh2_res = client.post("/api/v1/signatures/webhook", json=webhook_2)
    assert wh2_res.status_code == 200

    # 6. Verify Contract is now ACTIVE and sealed with SHA-256 hash
    contract_check = client.get(f"/api/v1/contracts/{contract_id}")
    assert contract_check.status_code == 200
    updated_contract = contract_check.json()
    assert updated_contract["status"] == "ACTIVE"
    assert updated_contract["pdf_sha256_hash"] is not None
    assert len(updated_contract["pdf_sha256_hash"]) == 64

    # 7. Check Tamper Evidence Endpoint
    tamper_res = client.get(f"/api/v1/contracts/{contract_id}/verify-tamper")
    assert tamper_res.status_code == 200
    tamper_data = tamper_res.json()
    assert tamper_data["is_tamper_evident_valid"] is True
    assert tamper_data["status"] == "TAMPER_FREE_AUTHENTIC"
