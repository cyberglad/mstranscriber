# Audio to Text Converter

A full-stack application that converts audio files to text using Faster Whisper. The application includes user authentication, email verification, and a modern web interface.

## Features

- User authentication (signup/login)
- Email verification
- Audio file upload and processing
- Text transcription using Faster Whisper
- Modern responsive UI
- Secure file handling
- Deployable to Render

## Tech Stack

- Frontend: React + TypeScript
- Backend: FastAPI (Python)
- Database: PostgreSQL
- Authentication: JWT
- Audio Processing: Faster Whisper
- Deployment: Render

## Project Structure

```
audio-to-text/
├── frontend/           # React frontend
├── backend/           # FastAPI backend
├── docker/            # Docker configuration
└── render.yaml        # Render deployment configuration
```

## Setup Instructions

1. Clone the repository
2. Set up environment variables (see `.env.example` files in both frontend and backend)
3. Install dependencies:
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt

   # Frontend
   cd frontend
   npm install
   ```
4. Run the development servers:
   ```bash
   # Backend
   cd backend
   uvicorn main:app --reload

   # Frontend
   cd frontend
   npm start
   ```

## Deployment

The application is configured for deployment on Render. See `render.yaml` for deployment configuration.

## License

MIT 