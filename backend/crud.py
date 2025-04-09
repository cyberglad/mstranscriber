from sqlalchemy.orm import Session
import models, schemas, auth
from typing import List
import os
from dotenv import load_dotenv
import emails
from emails.template import JinjaTemplate

load_dotenv()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Send verification email
    send_verification_email(user.email)
    
    return db_user

def get_transcriptions(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Transcription).filter(
        models.Transcription.user_id == user_id
    ).offset(skip).limit(limit).all()

def create_transcription(db: Session, transcription: schemas.TranscriptionCreate, user_id: int):
    db_transcription = models.Transcription(**transcription.dict(), user_id=user_id)
    db.add(db_transcription)
    db.commit()
    db.refresh(db_transcription)
    return db_transcription

def send_verification_email(email: str):
    token = auth.create_email_verification_token(email)
    verification_url = f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/verify-email/{token}"
    
    message = emails.html(
        html=JinjaTemplate("""
        <h1>Verify your email</h1>
        <p>Click the link below to verify your email address:</p>
        <a href="{{ verification_url }}">Verify Email</a>
        """),
        subject="Verify your email",
        mail_from=("Audio to Text", os.getenv("SMTP_USERNAME", "noreply@example.com"))
    )
    
    message.send(
        to=email,
        smtp={
            "host": os.getenv("SMTP_HOST", "smtp.gmail.com"),
            "port": int(os.getenv("SMTP_PORT", "587")),
            "user": os.getenv("SMTP_USERNAME"),
            "password": os.getenv("SMTP_PASSWORD"),
            "tls": True
        }
    ) 