from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

FRONTEND_URL = "https://studentdepression.onrender.com/"

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

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}