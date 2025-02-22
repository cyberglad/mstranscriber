Tech stack
✅ Frontend (React/Next.js)
✅ Backend (Python, FastAPI, Node.js)
✅ AI Transcription (Whisper API - OpenAI)
✅ Cloud Deployment (Vercel + Render + S3)
✅ Integration Guide
How it Works
✅ Frontend → Sends audio file to FastAPI backend
✅ Backend → Uploads file to AWS S3, then calls Whisper API
✅ Whisper API → Transcribes audio & returns text
✅ Frontend → Displays transcription to user



##Windows Local Development Setup - 12.7.2021 

🛠 1️⃣ Install Prerequisites
Before running the project, install these tools:

🔹 Required Software
✅ Python (3.8+) → Install from python.org
✅ Node.js (16+) → Install from nodejs.org
✅ Git → Install from git-scm.com
✅ FFmpeg (Required for Whisper) → Install from FFmpeg.org

👉 To verify installation, run in PowerShell or Command Prompt:

sh
Copy
Edit
python --version
node --version
git --version
ffmpeg -version

if not installed
pip install openai-whisper ffmpeg-python

🖥 2️⃣ Backend - Install & Run FastAPI
📌 Install Dependencies

Open Command Prompt and navigate to the backend folder:

sh
Copy
Edit
cd backend
Create a virtual environment (recommended):

sh
Copy
Edit
python -m venv venv
Activate the virtual environment:

sh
Copy
Edit
venv\Scripts\activate
Install required Python packages:

sh
Copy
Edit
pip install fastapi uvicorn openai python-multipart
📌 Set OpenAI API Key

Create a .env file in the backend/ folder and add:

ini
Copy
Edit
OPENAI_API_KEY=your_openai_api_key
Load environment variables using python-dotenv:

sh
Copy
Edit
pip install python-dotenv
Modify main.py to use .env:

📌 Run the Backend

sh
Copy
Edit
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
🔹 Open http://127.0.0.1:8000/docs in your browser to test the API.

🌐 3️⃣ Frontend - Install & Run Next.js
📌 Install Dependencies

Open Command Prompt, navigate to the frontend folder:

sh
Copy
Edit
cd frontend
Install required packages:

sh
Copy
Edit
npm install

#Create a New package.json (If Missing)
Open Command Prompt (not inside the venv):
sh
Copy
Edit
cd C:\Users\taaglyu1\Documents\git\sideproject\frontend
Run this command to create a new package.json:
sh
Copy
Edit
npm init -y
This will generate a basic package.json file.

Open package.json and check if it contains this section:

json
Copy
Edit
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
📌 Start the Frontend

sh
Copy
Edit
npm run dev
🔹 Open http://localhost:3000 in your browser to see the UI.

🔄 4️⃣ Test the Full Setup
1️⃣ Open http://localhost:3000
2️⃣ Upload an MP3/WAV file
3️⃣ The FastAPI backend will call Whisper API
4️⃣ The transcript appears in the UI

🚀 5️⃣ Next Steps
Deploy Backend → Render, DigitalOcean, or AWS
Deploy Frontend → Vercel
Store Files in S3 → Instead of local processing
Add Stripe for Payments → Monetize the service
