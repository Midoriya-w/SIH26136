def test_gem_adapter_workflow(client, startup_auth_headers, dept_auth_headers):
    # 1. Fetch Categories
    cat_res = client.get("/api/v1/gem/categories")
    assert cat_res.status_code == 200
    categories = cat_res.json()
    assert len(categories) > 0
    assert any("category_code" in c for c in categories)

    # 2. Push to Catalogue Staging
    contracts = client.get("/api/v1/contracts").json()
    contract_id = contracts[0]["id"]

    push_payload = {
        "contract_id": contract_id,
        "startup_id": "STARTUP-IOT-TEST",
        "product_title": "Automated Smart City Water Flow Controller",
        "category_code": "GEM-CAT-IT-003",
        "price": 18500.0,
        "specifications": {"flow_rate_lpm": 250, "wireless": "NB-IoT", "warranty_years": 3}
    }
    push_res = client.post("/api/v1/gem/catalogue/push", json=push_payload, headers=startup_auth_headers)
    assert push_res.status_code == 200
    p_data = push_res.json()
    gem_prod_id = p_data["gem_product_id"]
    assert gem_prod_id.startswith("GEM-PROD-")

    # 3. Check Sync Status
    status_res = client.get(f"/api/v1/gem/catalogue/status/{gem_prod_id}")
    assert status_res.status_code == 200
    assert status_res.json()["gem_product_id"] == gem_prod_id

    # 4. Batch JSON export
    json_res = client.get("/api/v1/gem/export/json", headers=dept_auth_headers)
    assert json_res.status_code == 200
    json_data = json_res.json()
    assert "catalogue_items" in json_data
    assert json_data["gem_catalogue_version"] == "2.4"

    # 5. Batch CSV export
    csv_res = client.get("/api/v1/gem/export/csv", headers=dept_auth_headers)
    assert csv_res.status_code == 200
    assert "GEM_PRODUCT_ID" in csv_res.text
    assert "BASE_PRICE_INR" in csv_res.text
