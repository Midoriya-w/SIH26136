import io
from datetime import datetime, timezone
from typing import List
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from app.services.storage_service import storage_service

class PDFService:
    @staticmethod
    def generate_contract_pdf(contract, clauses: List, milestones: List, signatures: List) -> bytes:
        """Generate official Pilot Agreement PDF combining metadata, clauses, milestones, and signatures."""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=36,
            bottomMargin=36
        )

        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'TitleStyle',
            parent=styles['Heading1'],
            fontSize=16,
            leading=20,
            alignment=1,  # Center
            textColor=colors.HexColor('#0F172A')
        )
        subtitle_style = ParagraphStyle(
            'SubTitleStyle',
            parent=styles['Heading3'],
            fontSize=11,
            leading=14,
            alignment=1,
            textColor=colors.HexColor('#475569')
        )
        section_style = ParagraphStyle(
            'SectionStyle',
            parent=styles['Heading2'],
            fontSize=12,
            leading=16,
            textColor=colors.HexColor('#1E3A8A'),
            spaceBefore=12,
            spaceAfter=6
        )
        body_style = ParagraphStyle(
            'Body',
            parent=styles['Normal'],
            fontSize=9,
            leading=13,
            textColor=colors.HexColor('#334155')
        )
        bold_body_style = ParagraphStyle(
            'BoldBody',
            parent=body_style,
            fontName='Helvetica-Bold'
        )

        elements = []

        # Header
        elements.append(Paragraph("MahaBridge GovTech Procurement Framework", title_style))
        elements.append(Paragraph("PILOT INNOVATION AGREEMENT & EXECUTION CONTRACT", subtitle_style))
        elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#2563EB'), spaceBefore=8, spaceAfter=12))

        # Metadata Table
        meta_data = [
            [Paragraph("<b>Contract ID:</b>", body_style), Paragraph(str(contract.id), body_style),
             Paragraph("<b>Date Generated:</b>", body_style), Paragraph(datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"), body_style)],
            [Paragraph("<b>Challenge Ref (Team A):</b>", body_style), Paragraph(str(contract.challenge_id), body_style),
             Paragraph("<b>Application Ref:</b>", body_style), Paragraph(str(contract.application_id), body_style)],
            [Paragraph("<b>Department ID:</b>", body_style), Paragraph(str(contract.department_id), body_style),
             Paragraph("<b>Startup ID:</b>", body_style), Paragraph(str(contract.startup_id), body_style)],
            [Paragraph("<b>Pilot Title:</b>", body_style), Paragraph(str(contract.title), bold_body_style),
             Paragraph("<b>Total Sanctioned Budget:</b>", body_style), Paragraph(f"INR {contract.total_budget:,.2f}", bold_body_style)]
        ]
        t_meta = Table(meta_data, colWidths=[1.5*inch, 2.3*inch, 1.5*inch, 2.2*inch])
        t_meta.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        elements.append(t_meta)
        elements.append(Spacer(1, 10))

        # Milestones Section
        elements.append(Paragraph("1. Milestone & Tranche Disbursement Schedule", section_style))
        milestone_rows = [
            [Paragraph("<b>Seq</b>", bold_body_style),
             Paragraph("<b>Milestone Deliverable</b>", bold_body_style),
             Paragraph("<b>Planned Date</b>", bold_body_style),
             Paragraph("<b>Linked Amount</b>", bold_body_style),
             Paragraph("<b>Status</b>", bold_body_style)]
        ]
        for m in milestones:
            milestone_rows.append([
                Paragraph(str(m.sequence_order), body_style),
                Paragraph(f"<b>{m.title}</b><br/>{m.deliverable_description}", body_style),
                Paragraph(m.planned_date.strftime("%Y-%m-%d") if hasattr(m.planned_date, 'strftime') else str(m.planned_date), body_style),
                Paragraph(f"INR {m.linked_amount:,.2f}", body_style),
                Paragraph(str(m.status), bold_body_style)
            ])

        t_miles = Table(milestone_rows, colWidths=[0.5*inch, 3.7*inch, 1.1*inch, 1.2*inch, 1.0*inch])
        t_miles.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#E2E8F0')),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#94A3B8')),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        elements.append(t_miles)
        elements.append(Spacer(1, 10))

        # Legal & IP Clauses Section
        elements.append(Paragraph("2. Governing Legal & Intellectual Property (IP) Clauses", section_style))
        for idx, cl in enumerate(clauses, start=1):
            elements.append(Paragraph(f"<b>2.{idx} {cl.title}</b> (Category: {cl.category} | Version {cl.version})", bold_body_style))
            elements.append(Paragraph(cl.content, body_style))
            elements.append(Spacer(1, 4))

        # Signatures Section
        elements.append(Spacer(1, 8))
        elements.append(Paragraph("3. Statutory E-Signature Authentication (Aadhaar eSign / DigiLocker)", section_style))
        sig_rows = [
            [Paragraph("<b>Signatory Role</b>", bold_body_style),
             Paragraph("<b>Signatory Name</b>", bold_body_style),
             Paragraph("<b>Method</b>", bold_body_style),
             Paragraph("<b>Status</b>", bold_body_style),
             Paragraph("<b>Transaction Ref / Signed At</b>", bold_body_style)]
        ]
        for s in signatures:
            sig_time = s.signed_at.strftime("%Y-%m-%d %H:%M") if s.signed_at else "Pending"
            sig_rows.append([
                Paragraph(str(s.signatory_role), body_style),
                Paragraph(str(s.signatory_name), body_style),
                Paragraph(str(s.sign_type), body_style),
                Paragraph(f"<b>{s.status}</b>", body_style),
                Paragraph(f"Txn: {s.transaction_id[:16]}...<br/>Date: {sig_time}", body_style)
            ])

        t_sig = Table(sig_rows, colWidths=[1.4*inch, 1.8*inch, 1.3*inch, 1.0*inch, 2.0*inch])
        t_sig.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#DCFCE7')),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#86EFAC')),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        elements.append(t_sig)

        # Tamper-evidence notice
        elements.append(Spacer(1, 14))
        elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#94A3B8'), spaceAfter=6))
        elements.append(Paragraph(
            "<b>Tamper-Evident Security Seal:</b> This digital agreement is cryptographically secured with SHA-256 under CERT-In and IT Act Section 10A guidelines. Any modification invalidates the digital hash registered in the MahaBridge procurement ledger.",
            body_style
        ))

        doc.build(elements)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes

    @staticmethod
    def generate_validation_certificate_pdf(certificate, contract, kpis: List) -> bytes:
        """Generate official Pilot Validation Certificate with Composite Adoption-Readiness Score."""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=40,
            leftMargin=40,
            topMargin=40,
            bottomMargin=40
        )

        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CertTitle',
            parent=styles['Heading1'],
            fontSize=18,
            leading=22,
            alignment=1,
            textColor=colors.HexColor('#1E3A8A')
        )
        subtitle_style = ParagraphStyle(
            'CertSubTitle',
            parent=styles['Normal'],
            fontSize=11,
            leading=15,
            alignment=1,
            textColor=colors.HexColor('#475569')
        )
        body_style = ParagraphStyle(
            'CertBody',
            parent=styles['Normal'],
            fontSize=10,
            leading=14,
            textColor=colors.HexColor('#1E293B')
        )
        score_style = ParagraphStyle(
            'ScoreStyle',
            parent=styles['Heading1'],
            fontSize=28,
            leading=32,
            alignment=1,
            textColor=colors.HexColor('#16A34A')
        )

        elements = []

        elements.append(Paragraph("GOVERNMENT OF MAHARASHTRA / GOVTECH INNOVATION", subtitle_style))
        elements.append(Paragraph("OFFICIAL PILOT VALIDATION CERTIFICATE", title_style))
        elements.append(Paragraph(f"Certificate No: <b>{certificate.certificate_number}</b>", subtitle_style))
        elements.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#1E3A8A'), spaceBefore=8, spaceAfter=14))

        cert_text = (
            f"This is to certify that the GovTech innovation pilot titled <b>'{contract.title}'</b> "
            f"(Contract ID: <code>{contract.id}</code>), undertaken by Startup ID: <b>{contract.startup_id}</b> "
            f"for Department ID: <b>{contract.department_id}</b>, has undergone comprehensive independent verification."
        )
        elements.append(Paragraph(cert_text, body_style))
        elements.append(Spacer(1, 12))

        # CARS Score Banner
        elements.append(Paragraph(f"CARS Score: {certificate.cars_score:.1f} / 100", score_style))
        elements.append(Paragraph(f"<b>Adoption Verdict:</b> {certificate.recommendation}", subtitle_style))
        elements.append(Spacer(1, 14))

        # KPI Variance Table
        elements.append(Paragraph("<b>Evaluated KPI Performance Metrics:</b>", body_style))
        elements.append(Spacer(1, 4))
        kpi_rows = [
            [Paragraph("<b>Metric Name</b>", body_style),
             Paragraph("<b>Baseline</b>", body_style),
             Paragraph("<b>Target</b>", body_style),
             Paragraph("<b>Achieved</b>", body_style),
             Paragraph("<b>Variance %</b>", body_style),
             Paragraph("<b>Status</b>", body_style)]
        ]
        for k in kpis:
            kpi_rows.append([
                Paragraph(k.metric_name, body_style),
                Paragraph(f"{k.baseline_value} {k.unit}", body_style),
                Paragraph(f"{k.target_value} {k.unit}", body_style),
                Paragraph(f"{k.achieved_value} {k.unit}", body_style),
                Paragraph(f"{k.variance_pct:+.1f}%", body_style),
                Paragraph(f"<b>{k.status}</b>", body_style)
            ])

        t_kpis = Table(kpi_rows, colWidths=[2.2*inch, 1.0*inch, 1.0*inch, 1.0*inch, 1.0*inch, 1.0*inch])
        t_kpis.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        elements.append(t_kpis)
        elements.append(Spacer(1, 14))

        # Sign-off info
        elements.append(Paragraph(
            f"<b>Independent Validator:</b> {certificate.validator_name} (ID: {certificate.validator_id})<br/>"
            f"<b>Issued Date:</b> {certificate.issued_at.strftime('%Y-%m-%d')}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;"
            f"<b>Valid Until:</b> {certificate.expiry_date.strftime('%Y-%m-%d')}",
            body_style
        ))
        elements.append(Spacer(1, 14))
        elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#94A3B8'), spaceAfter=6))
        elements.append(Paragraph(
            f"<b>Tamper-Evident SHA-256 Fingerprint:</b><br/><code>{certificate.sha256_hash}</code>",
            body_style
        ))

        doc.build(elements)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes

pdf_service = PDFService()
