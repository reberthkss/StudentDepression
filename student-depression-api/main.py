from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
from pathlib import Path

FRONTEND_URL = "https://studentdepression.onrender.com"

# Carregar o modelo e scaler
RESOURCES_PATH = Path(__file__).parent / "resources"
MODEL_PATH = RESOURCES_PATH / "student-depression-svm.joblib"
SCALER_PATH = RESOURCES_PATH / "student-depression-scaler.joblib"

# Carregar os modelos
try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("Modelo e scaler carregados com sucesso!")
except Exception as e:
    print(f"Erro ao carregar modelo/scaler: {e}")
    model = None
    scaler = None

origins = [
        "http://localhost:3000", 
        FRONTEND_URL,
    ]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    }

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}