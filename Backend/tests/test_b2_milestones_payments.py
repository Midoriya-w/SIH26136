import io

def test_milestone_and_payment_lifecycle(client, startup_auth_headers, dept_auth_headers, finance_auth_headers):
    # 1. Create a dedicated contract with milestone for this lifecycle test
    contract_payload = {
        "challenge_id": "66a01f888888888888888888",
        "application_id": "66a02f888888888888888888",
        "startup_id": "STARTUP-LIFECYCLE-TEST",
        "department_id": "DEPT-FINANCE-MAHA",
        "title": "Lifecycle Test Pilot",
        "total_budget": 500000.0
    }
    c_res = client.post("/api/v1/contracts", json=contract_payload, headers=dept_auth_headers)
    assert c_res.status_code == 200
    contract_id = c_res.json()["id"]

    # 2. Add milestone
    new_m_payload = {
        "contract_id": contract_id,
        "sequence_order": 1,
        "title": "Integration Testing & Live Deployment",
        "deliverable_description": "Deliverable proof for test pipeline.",
        "planned_date": "2026-10-15T10:00:00Z",
        "linked_amount": 250000.0
    }
    m_res = client.post("/api/v1/milestones", json=new_m_payload, headers=dept_auth_headers)
    assert m_res.status_code == 200
    target_m = m_res.json()
    milestone_id = target_m["id"]

    # 3. Upload Deliverable Proof
    file_content = b"%PDF-1.4 Fake test milestone proof content for SIH 2026."
    files = {"file": ("test_proof.pdf", io.BytesIO(file_content), "application/pdf")}
    data = {"comments": "Completed edge device testing."}
    proof_res = client.post(
        f"/api/v1/milestones/{milestone_id}/submit-proof",
        files=files,
        data=data,
        headers=startup_auth_headers
    )
    assert proof_res.status_code == 200
    proof_data = proof_res.json()
    assert proof_data["file_hash"] is not None

    # 4. Department Officer Verifies Milestone
    verify_payload = {
        "is_approved": True,
        "comments": "Inspected test proof and verified successfully."
    }
    verify_res = client.post(
        f"/api/v1/milestones/{milestone_id}/verify",
        json=verify_payload,
        headers=dept_auth_headers
    )
    assert verify_res.status_code == 200
    assert verify_res.json()["status"] == "VERIFIED"

    # 5. Finance Officer Releases Payment Tranche
    payment_payload = {
        "milestone_id": milestone_id,
        "beneficiary_account_number": "50100456789123",
        "ifsc_code": "HDFC0001234",
        "treasury_sanction_order": "TSO-MAHA-TEST-909"
    }
    release_res = client.post(
        "/api/v1/payments/release",
        json=payment_payload,
        headers=finance_auth_headers
    )
    assert release_res.status_code == 200
    ledger_data = release_res.json()
    assert ledger_data["status"] == "SETTLED"
    assert "PFMS-" in ledger_data["pfms_reference_no"]
    assert ledger_data["beneficiary_account_masked"].startswith("XXXXXX")

    # 6. Verify Payment Ledger List
    ledger_list_res = client.get("/api/v1/payments/ledger", headers=finance_auth_headers)
    assert ledger_list_res.status_code == 200
    assert len(ledger_list_res.json()) >= 1

    # 7. Test CSV and Excel exports
    csv_res = client.get("/api/v1/payments/export/csv", headers=finance_auth_headers)
    assert csv_res.status_code == 200
    assert "PFMS Reference No" in csv_res.text

    excel_res = client.get("/api/v1/payments/export/excel", headers=finance_auth_headers)
    assert excel_res.status_code == 200
    assert len(excel_res.content) > 100
