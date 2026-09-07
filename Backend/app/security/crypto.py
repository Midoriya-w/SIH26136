import os
import base64
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from sqlalchemy.types import TypeDecorator, String
from app.config import settings

# 32 bytes key for AES-256
_raw_key = settings.AES_SECRET_KEY.encode("utf-8")
if len(_raw_key) < 32:
    _raw_key = _raw_key.ljust(32, b"#")
elif len(_raw_key) > 32:
    _raw_key = _raw_key[:32]

_aesgcm = AESGCM(_raw_key)

def encrypt_field(plain_text: str | None) -> str | None:
    """Encrypt a string using AES-256-GCM. Returns base64 encoded nonce + ciphertext."""
    if plain_text is None:
        return None
    nonce = os.urandom(12)  # 96-bit nonce for GCM
    encrypted_bytes = _aesgcm.encrypt(nonce, plain_text.encode("utf-8"), None)
    # Combine nonce + ciphertext
    payload = nonce + encrypted_bytes
    return base64.b64encode(payload).decode("utf-8")

def decrypt_field(cipher_text: str | None) -> str | None:
    """Decrypt a base64 encoded nonce + ciphertext using AES-256-GCM."""
    if cipher_text is None:
        return None
    try:
        data = base64.b64decode(cipher_text.encode("utf-8"))
        nonce = data[:12]
        ciphertext = data[12:]
        decrypted_bytes = _aesgcm.decrypt(nonce, ciphertext, None)
        return decrypted_bytes.decode("utf-8")
    except Exception:
        # Return as-is if decryption fails or was unencrypted legacy
        return cipher_text

class EncryptedString(TypeDecorator):
    """SQLAlchemy TypeDecorator that transparently encrypts and decrypts sensitive fields."""
    impl = String
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is not None:
            return encrypt_field(str(value))
        return None

    def process_result_value(self, value, dialect):
        if value is not None:
            return decrypt_field(str(value))
        return None
