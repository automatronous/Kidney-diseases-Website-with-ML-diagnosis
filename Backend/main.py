from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import pickle
import os
import uvicorn
from pathlib import Path

app = FastAPI(title="Kidney Disease Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://kidney-diseases-website-with-ml-diagnosis-q8bsjvvf1.vercel.app","kidney-diseases-website-with-ml-dia-one.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent

with open(BASE_DIR / "kidney_model_v2.pkl", "rb") as f:
    model = pickle.load(f)

FEATURES = [
    "Bp", "Sg", "Al", "Su", "Rbc",
    "Bu", "Sc", "Sod", "Pot", "Hemo",
    "Wbcc", "Rbcc", "Htn"
]

class KidneyInput(BaseModel):
    Bp: float
    Sg: float
    Al: float
    Su: float
    Rbc: float
    Bu: float
    Sc: float
    Sod: float
    Pot: float
    Hemo: float
    Wbcc: float
    Rbcc: float
    Htn: float

@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(data: KidneyInput):
    df = pd.DataFrame([data.model_dump()])[FEATURES]
    pred = int(model.predict(df)[0])
    proba = model.predict_proba(df)[0].tolist()
    confidence = max(proba) * 100
    return {
        "prediction": pred,
        "probabilities": proba,
        "confidence": round(confidence, 2),
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)