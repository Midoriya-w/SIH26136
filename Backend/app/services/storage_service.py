import os
import hashlib
from typing import Tuple
from app.config import settings

class StorageService:
    def __init__(self):
        self.pdf_dir = settings.PDF_STORAGE_DIR
        self.proof_dir = settings.PROOF_STORAGE_DIR
        os.makedirs(self.pdf_dir, exist_ok=True)
        os.makedirs(self.proof_dir, exist_ok=True)

    @staticmethod
    def calculate_sha256(content_bytes: bytes) -> str:
        """Compute cryptographic SHA-256 hash of bytes for tamper-evidence."""
        return hashlib.sha256(content_bytes).hexdigest()

    def save_pdf(self, file_name: str, content_bytes: bytes) -> Tuple[str, str]:
        """Save PDF bytes to disk and return (file_url, sha256_hash)."""
        file_path = os.path.join(self.pdf_dir, file_name)
        with open(file_path, "wb") as f:
            f.write(content_bytes)
        sha256_hash = self.calculate_sha256(content_bytes)
        # Relative file URL
        file_url = f"/storage/pdfs/{file_name}"
        return file_url, sha256_hash

    def save_proof(self, file_name: str, content_bytes: bytes) -> Tuple[str, str]:
        """Save milestone proof file to disk and return (file_url, sha256_hash)."""
        file_path = os.path.join(self.proof_dir, file_name)
        with open(file_path, "wb") as f:
            f.write(content_bytes)
        sha256_hash = self.calculate_sha256(content_bytes)
        file_url = f"/storage/proofs/{file_name}"
        return file_url, sha256_hash

storage_service = StorageService()
