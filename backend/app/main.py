from fastapi import FastAPI

from app.api.routes.auth import router as auth_router
from app.api.routes.users import router as users_router


app = FastAPI(
    title="SIH26136 API",
    description="Backend API for the Startup Friendly Public Procurement Mechanism",
    version="0.1.0",
)


app.include_router(auth_router)
app.include_router(users_router)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "sih26136-backend",
    }