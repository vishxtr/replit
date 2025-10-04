from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.alerts import router as alerts_router
from backend.chat import router as chat_router
from backend.remediate import router as remediate_router
from backend.simulate import router as simulate_router


def create_app() -> FastAPI:
    app = FastAPI(title="Smart SOC Backend")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(alerts_router)
    app.include_router(chat_router)
    app.include_router(remediate_router)
    app.include_router(simulate_router)

    @app.get("/")
    async def root():
        return {"status": "ok", "routes": ["/api/chat", "/api/alerts", "/api/remediate/{id}", "/api/simulate/*"]}

    return app


app = create_app()



