from typing import Optional, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
from pathlib import Path
import numpy as np

FRONTEND_URL = "https://studentdepression.onrender.com"

# Modelo Pydantic para validação dos dados de entrada
class PredictionRequest(BaseModel):
    features: List[float]  # Lista de features numéricas
    
class PredictionResponse(BaseModel):
    prediction: int
    probability: List[float]
    depression_risk: str

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

@app.post("/predict", response_model=PredictionResponse)
async def predict_depression(request: PredictionRequest):
    # Verificar se os modelos foram carregados
    if model is None or scaler is None:
        raise HTTPException(
            status_code=500, 
            detail="Modelo ou scaler não carregados corretamente"
        )
    
    try:
        # Converter para numpy array
        features = np.array(request.features).reshape(1, -1)
        
        # Aplicar o scaler
        features_scaled = scaler.transform(features)
        
        # Fazer a predição
        prediction = model.predict(features_scaled)[0]
        prediction_proba = model.predict_proba(features_scaled)[0]
        
        # Determinar o risco de depressão
        depression_risk = "Alto" if prediction == 1 else "Baixo"
        
        return PredictionResponse(
            prediction=int(prediction),
            probability=prediction_proba.tolist(),
            depression_risk=depression_risk
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=400, 
            detail=f"Erro ao processar predição: {str(e)}"
        )

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}