def test_validation_kpi_and_cars_score(client, dept_auth_headers, validator_auth_headers):
    # 1. Get sample contract
    contracts = client.get("/api/v1/contracts").json()
    contract_id = contracts[0]["id"]

    # 2. Add a new KPI metric
    kpi_payload = {
        "contract_id": contract_id,
        "metric_name": "API Response Latency p99",
        "baseline_value": 450.0,
        "target_value": 150.0,
        "achieved_value": 120.0,
        "unit": "ms"
    }
    kpi_res = client.post("/api/v1/validation/kpis", json=kpi_payload, headers=dept_auth_headers)
    assert kpi_res.status_code == 200
    kpi = kpi_res.json()
    assert kpi["status"] in ["EXCEEDED", "ACHIEVED"]

    # 3. Update KPI achieved value
    kpi_id = kpi["id"]
    update_res = client.put(f"/api/v1/validation/kpis/{kpi_id}", json={"achieved_value": 110.0}, headers=validator_auth_headers)
    assert update_res.status_code == 200
    assert update_res.json()["achieved_value"] == 110.0

    # 4. Compute CARS Score
    cars_res = client.get(f"/api/v1/validation/contract/{contract_id}/cars-score")
    assert cars_res.status_code == 200
    cars_data = cars_res.json()
    assert "composite_score" in cars_data
    assert cars_data["composite_score"] >= 0.0
    assert cars_data["recommendation"] in ["SCALE_UP_RECOMMENDED", "CONDITIONAL_APPROVAL", "NOT_RECOMMENDED"]

    # 5. Assign Time-Boxed Independent Validator
    assign_payload = {
        "validator_id": "VALIDATOR-IIT-BOMBAY-01",
        "duration_days": 14
    }
    assign_res = client.post(
        f"/api/v1/validation/contract/{contract_id}/assign-validator",
        json=assign_payload,
        headers=dept_auth_headers
    )
    assert assign_res.status_code == 200
    assign_data = assign_res.json()
    assert assign_data["is_active"] is True
    assert "scoped_token" in assign_data

    # 6. Issue Validation Certificate
    cert_res = client.post(
        f"/api/v1/validation/contract/{contract_id}/issue-certificate?summary=Independent%20testing%20passed%20successfully.",
        headers=validator_auth_headers
    )
    assert cert_res.status_code == 200
    cert_data = cert_res.json()
    assert cert_data["certificate_number"].startswith("CERT-VAL-")
    assert len(cert_data["sha256_hash"]) == 64
    assert cert_data["pdf_url"].endswith(".pdf")
