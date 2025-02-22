import os
from fastapi import FastAPI, UploadFile, File
import whisper
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
model = whisper.load_model("base")  # Use "tiny", "small", "medium", "large" if needed

app = FastAPI()

@app.post("/upload")
async def upload_audio(file: UploadFile = File(...)):
    audio_data = await file.read()
    with open("temp.mp3", "wb") as f:
        f.write(audio_data)
    
    result = model.transcribe("temp.mp3")
    return {"transcription": result["text"]}
