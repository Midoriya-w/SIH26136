import os
import sys
import uuid
from datetime import datetime, timedelta, timezone

# Add Backend to python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal, Base, engine
from app.models.contract import Contract, Clause, Signature, CyberChecklistItem
from app.models.milestone import Milestone, DeliverableProof, PaymentLedger
from app.models.validation import KPIRecord, ValidationCertificate
from app.models.scale_up import ScaleUpProposal, ScaleUpApproval, ReplicationRecord
from app.models.gem import GeMCatalogueItem
from app.models.audit import AuditLog
from app.services.pdf_service import pdf_service
from app.services.storage_service import storage_service

def run_seed():
    print("[INIT] Initializing Database and Tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(Contract).first():
            print("[INFO] Database already contains contracts. Skipping seed.")
            return

        print("[SEED] Seeding Model Clauses...")
        clauses = [
            Clause(
                title="Intellectual Property (IP) Rights & Foreground Ownership",
                category="IP_OWNERSHIP",
                version=1,
                content=(
                    "All pre-existing background IP remains the exclusive property of the Startup. "
                    "The Department receives a non-exclusive, perpetual, royalty-free license to use the solution "
                    "for non-commercial administrative purposes across Government of Maharashtra departments."
                ),
                is_mandatory=True,
                is_active=True
            ),
            Clause(
                title="Data Sovereignty & CERT-In Localization Compliance",
                category="DATA_LOCALIZATION",
                version=1,
                content=(
                    "Under DPDPA 2023 and CERT-In mandates, all telemetry, citizen data, and database records "
                    "shall be stored within sovereign Indian borders on MeitY empanelled data centers. No data "
                    "may be egressed outside India without explicit Cabinet approval."
                ),
                is_mandatory=True,
                is_active=True
            ),
            Clause(
                title="Strict Non-Disclosure & Confidentiality",
                category="CONFIDENTIALITY",
                version=1,
                content=(
                    "The parties agree that technical schematics, government citizen records, and commercial figures "
                    "constitute confidential information protected under the Official Secrets Act, surviving for 5 years."
                ),
                is_mandatory=True,
                is_active=True
            ),
            Clause(
                title="Liquidated Damages for Delayed Deliverables",
                category="LIABILITY",
                version=1,
                content=(
                    "Delays attributable solely to the Startup beyond 30 days of the planned milestone date "
                    "incur a penalty of 0.5% per week on the respective tranche, capped at 10% of total pilot budget."
                ),
                is_mandatory=False,
                is_active=True
            )
        ]
        db.add_all(clauses)
        db.flush()

        print("[SEED] Seeding Sample Pilot Contract...")
        contract_id = str(uuid.uuid4())
        now = datetime.now(timezone.utc)

        contract = Contract(
            id=contract_id,
            challenge_id="66a01f789abc123456789012",  # Cross-DB Mongo ObjectId string
            application_id="66a02f789abc123456789034",
            startup_id="STARTUP-AGRITECH-001",
            department_id="DEPT-AGRICULTURE-MAHA",
            title="AI-Driven Smart Irrigation & Pest Early Warning Network",
            total_budget=1500000.0,
            status="ACTIVE",
            created_at=now - timedelta(days=45)
        )
        contract.clauses = clauses
        db.add(contract)
        db.flush()

        print("[SEED] Seeding Signatures (Aadhaar eSign & DigiLocker)...")
        sig1 = Signature(
            contract_id=contract.id,
            signatory_name="Vikramaditya Sharma (Founder & CEO)",
            signatory_role="STARTUP",
            sign_type="AADHAAR_ESIGN",
            status="COMPLETED",
            transaction_id="ESIGN-TXN-STARTUP-7721",
            certificate_details="CertSerial=GOI-CCA-8831|Aadhaar-SHA256",
            signed_at=now - timedelta(days=44)
        )
        sig2 = Signature(
            contract_id=contract.id,
            signatory_name="Dr. Rajesh Patil, IAS (Joint Secretary)",
            signatory_role="DEPARTMENT",
            sign_type="DIGILOCKER",
            status="COMPLETED",
            transaction_id="ESIGN-TXN-DEPT-9912",
            certificate_details="CertSerial=MAHA-NIC-4412|DigiLocker-DS",
            signed_at=now - timedelta(days=43)
        )
        db.add_all([sig1, sig2])

        print("[SEED] Seeding Milestones & Deliverables...")
        m1 = Milestone(
            contract_id=contract.id,
            sequence_order=1,
            title="Phase 1: Sensor Gateway Architecture & CERT-In Gap Clearance",
            deliverable_description="Deployment of 50 edge IoT gateways in Nashik district and cybersecurity audit clearance.",
            planned_date=now - timedelta(days=30),
            actual_date=now - timedelta(days=28),
            linked_amount=375000.0,
            status="DISBURSED",
            delay_days=0
        )
        m2 = Milestone(
            contract_id=contract.id,
            sequence_order=2,
            title="Phase 2: Live Sensor Grid & Farmer Advisory Portal Integration",
            deliverable_description="Real-time telemetry ingestion from 500 farms and mobile app advisory broadcast.",
            planned_date=now - timedelta(days=10),
            actual_date=now - timedelta(days=8),
            linked_amount=675000.0,
            status="VERIFIED",
            delay_days=0
        )
        m3 = Milestone(
            contract_id=contract.id,
            sequence_order=3,
            title="Phase 3: Independent Impact Validation & Pilot Final Outcome",
            deliverable_description="Independent verification of crop yield improvement and scale-up readiness report.",
            planned_date=now + timedelta(days=20),
            actual_date=None,
            linked_amount=450000.0,
            status="PENDING",
            delay_days=0
        )
        db.add_all([m1, m2, m3])
        db.flush()

        print("[SEED] Seeding Deliverable Proofs & PFMS Payment Ledger...")
        proof1 = DeliverableProof(
            milestone_id=m1.id,
            file_name="Phase1_Architecture_and_Security_Audit.pdf",
            file_url="/storage/proofs/Phase1_Architecture_and_Security_Audit.pdf",
            file_hash="a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0",
            uploaded_by="STARTUP-AGRITECH-001",
            comments="CERT-In audit certificate and telemetry network deployment report."
        )
        db.add(proof1)

        # AES-256 Encrypted Payment Ledger
        payment = PaymentLedger(
            milestone_id=m1.id,
            amount=375000.0,
            beneficiary_acc_enc="98765432101234",
            ifsc_code_enc="SBIN0001234",
            pfms_reference_no="PFMS-2026-NASHIK-00912",
            treasury_sanction_order="TSO-MAHA-AGRI-2026-881",
            sanctioned_by="FINANCE-OFFICER-01",
            disbursed_at=now - timedelta(days=25),
            status="SETTLED"
        )
        db.add(payment)

        print("[SEED] Seeding KPIs & Comparison Records...")
        kpi1 = KPIRecord(
            contract_id=contract.id,
            metric_name="Water Consumption Reduction",
            baseline_value=100.0,
            target_value=70.0,
            achieved_value=64.5,
            unit="%",
            variance_pct=-35.5,
            status="EXCEEDED"
        )
        kpi2 = KPIRecord(
            contract_id=contract.id,
            metric_name="Pest Outbreak Detection Latency",
            baseline_value=72.0,
            target_value=12.0,
            achieved_value=8.5,
            unit="Hours",
            variance_pct=-88.2,
            status="EXCEEDED"
        )
        kpi3 = KPIRecord(
            contract_id=contract.id,
            metric_name="Active Farmer Advisory Adoption",
            baseline_value=0.0,
            target_value=500.0,
            achieved_value=580.0,
            unit="Farmers",
            variance_pct=16.0,
            status="EXCEEDED"
        )
        db.add_all([kpi1, kpi2, kpi3])

        print("[SEED] Seeding CERT-In Cyber Checklist Items...")
        checklist = [
            CyberChecklistItem(
                contract_id=contract.id,
                item_key="CERT_IN_01",
                title="Data Encryption at Rest",
                description="AES-256 encryption applied to all PII and financial ledgers.",
                is_compliant=True,
                attested_by="CHIEF_SECURITY_OFFICER",
                attested_at=now - timedelta(days=40)
            ),
            CyberChecklistItem(
                contract_id=contract.id,
                item_key="CERT_IN_02",
                title="TLS 1.3 in Transit",
                description="Enforce HTTPS/TLS encryption across all endpoints.",
                is_compliant=True,
                attested_by="CHIEF_SECURITY_OFFICER",
                attested_at=now - timedelta(days=40)
            ),
            CyberChecklistItem(
                contract_id=contract.id,
                item_key="CERT_IN_03",
                title="Multi-Factor & Aadhaar eSign Authentication",
                description="Statutory non-repudiation for contract signing and financial release.",
                is_compliant=True,
                attested_by="CHIEF_SECURITY_OFFICER",
                attested_at=now - timedelta(days=40)
            )
        ]
        db.add_all(checklist)

        print("[SEED] Seeding GeM Catalogue Product Item...")
        gem_item = GeMCatalogueItem(
            contract_id=contract.id,
            startup_id="STARTUP-AGRITECH-001",
            product_title="KrishiDrishti AI Smart Irrigation & Pest Gateway",
            category_code="GEM-CAT-AG-004",
            gem_product_id="GEM-PROD-KRISHI-01",
            sync_status="EXPORTED_BATCH",
            price=24999.0,
            specifications='{"solar_powered": true, "lorawan_range_km": 15, "ai_edge_inference": "TensorRT-Micro", "ip67_rated": true}'
        )
        db.add(gem_item)

        print("[SEED] Generating Sealed Contract PDF & SHA-256 Hash...")
        pdf_bytes = pdf_service.generate_contract_pdf(contract, clauses, [m1, m2, m3], [sig1, sig2])
        pdf_url, sha256_hash = storage_service.save_pdf(f"Contract_{contract.id[:8]}_Sealed.pdf", pdf_bytes)
        contract.signed_pdf_url = pdf_url
        contract.pdf_sha256_hash = sha256_hash

        print("[SEED] Seeding Audit Log Entries...")
        audit = AuditLog(
            actor_id="Dr. Rajesh Patil, IAS",
            role="DEPARTMENT",
            action="CONTRACT_SIGNED",
            entity="Contract",
            entity_id=contract.id,
            ip_address="10.20.1.42",
            details='{"transactionId": "ESIGN-TXN-DEPT-9912", "sha256": "' + sha256_hash + '"}'
        )
        db.add(audit)

        db.commit()
        print("[SUCCESS] Database successfully seeded with full post-award procurement data!")

    except Exception as e:
        db.rollback()
        print(f"[ERROR] Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    run_seed()
