from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
from pathlib import Path
import numpy as np
import pandas as pd

FRONTEND_URL = "https://studentdepression.onrender.com"

class PredictionRequest(BaseModel):
    gender: str
    age: int
    profession: str
    academic_pressure: int = Field(alias='academic_pressure')
    work_pressure: int = Field(alias='work_pressure')
    cgpa: float
    study_satisfaction: int = Field(alias='study_satisfaction')
    job_satisfaction: int = Field(alias='job_satisfaction')
    sleep_duration: str = Field(alias='sleep_duration')
    dietary_habits: str = Field(alias='dietary_habits')
    suicidal_thoughts: str = Field(alias='suicidal_thoughts')
    work_study_hours: int = Field(alias='work_study_hours')
    financial_stress: int = Field(alias='financial_stress')
    family_history: str = Field(alias='family_history')

    
class PredictionResponse(BaseModel):
    prediction: int
    probability: List[float]
    depression_risk: str

# Carregar o modelo e scaler
RESOURCES_PATH = Path(__file__).parent / "resources"
MODEL_PATH = RESOURCES_PATH / "student-depression-svm.joblib"

# Carregar os modelos
try:
    model = joblib.load(MODEL_PATH)
    print("Modelo carregados com sucesso!")
except Exception as e:
    print(f"Erro ao carregar modelo: {e}")
    model = None

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
    return {}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict_depression(request: PredictionRequest):
    # Verificar se os modelos foram carregados
    if model is None:
        raise HTTPException(
            status_code=500, 
            detail="Modelo ou scaler não carregados corretamente"
        )
    
    try:
        # Converter para numpy array
        # features = np.array(request.features).reshape(1, -1)

        model_input = {
            "Gender": [request.gender],
            "Age": [request.age],
            "Profession": [request.profession],
            "Total Pressure": [request.academic_pressure + request.work_pressure],
            "Total Satisfaction": [request.job_satisfaction + request.study_satisfaction],
            "CGPA": [request.cgpa],
            "Sleep Duration": [request.sleep_duration],
            "Dietary Habits": [request.dietary_habits],
            "Have you ever had suicidal thoughts ?": [request.suicidal_thoughts],
            "Work/Study Hours": [request.work_study_hours],
            "Financial Stress": [request.financial_stress],
            "Family History of Mental Illness": [request.family_history]
        }

        Y_input = pd.DataFrame(model_input)
        
        # Fazer a predição
        prediction = model.predict(Y_input)[0]
        prediction_proba = model.predict_proba(Y_input)[0]
        
        # Determinar o risco de depressão
        depression_risk = "Não depressivo" if prediction == 1 else "Depressivo"
        
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
