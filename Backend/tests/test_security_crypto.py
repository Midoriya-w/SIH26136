from app.security.crypto import encrypt_field, decrypt_field

def test_aes_256_encryption_roundtrip():
    sensitive_acc = "1234567890123456"
    encrypted = encrypt_field(sensitive_acc)
    assert encrypted != sensitive_acc
    # Must use randomized IV so two encryptions of same text yield different ciphertext
    encrypted2 = encrypt_field(sensitive_acc)
    assert encrypted != encrypted2

    # Decrypt
    decrypted = decrypt_field(encrypted)
    assert decrypted == sensitive_acc

def test_mock_pilot_awarded_event_flow(client):
    """Verify B's dependency on A: Mock PilotAwarded event auto-provisions Contract + Milestones in Team B."""
    award_payload = {
        "challengeId": "66a01f111222333444555666",
        "applicationId": "66a02f111222333444555777",
        "startupId": "STARTUP-DRONE-01",
        "departmentId": "DEPT-DISASTER-MAHA",
        "agreedBudget": 950000.0,
        "title": "Autonomous Flood Surveillance Drone Fleet"
    }

    event_res = client.post("/api/v1/events/mock-pilot-awarded", json=award_payload)
    assert event_res.status_code == 200
    assert event_res.json()["status"] == "EVENT_EMITTED"

    # Query contracts to verify auto-provisioned contract
    contracts = client.get("/api/v1/contracts").json()
    matched = [c for c in contracts if c["application_id"] == award_payload["applicationId"]]
    assert len(matched) == 1
    new_contract = matched[0]
    assert new_contract["title"] == award_payload["title"]
    assert new_contract["total_budget"] == 950000.0

    # Verify milestones were automatically created
    contract_id = new_contract["id"]
    milestones = client.get(f"/api/v1/milestones/contract/{contract_id}").json()
    assert len(milestones) == 3
    assert milestones[0]["sequence_order"] == 1
    assert milestones[0]["linked_amount"] == 950000.0 * 0.25

def test_prometheus_metrics_endpoint(client):
    response = client.get("/metrics")
    assert response.status_code == 200
    assert "http_requests_total" in response.text or "http_request_duration_seconds" in response.text
