This is a frontend for Audio Transcriber:  
✅ login.html (default page) — Login + Google Login  
✅ signup.html — Signup with email confirmation  
✅ verify.html — Email verification page  
✅ index.html — Transcription page (requires login)  
✅ Session management (JWT tokens in localStorage)  
✅ Logout button  


# Audio Transcriber 🎙️  

A web-based **Audio Transcription App** that allows users to upload audio files and get real-time transcriptions. Features **user authentication** (email & Google login), **email verification**, and a **JWT-protected API**.  

## 🚀 Features  

✅ **Transcribe Audio** - Upload and convert speech to text    
✅ **User Authentication** - Login & Signup with email/password    
✅ **Google Login** - Sign in using Google     
✅ **Email Verification** - Confirm email before logging in    
✅ **Secure API** - Uses JWT for authentication    
✅ **Logout** - Simple session management    

## 🏗️ Project Structure  

📂 audio-transcriber │── 📄 index.html # Transcription page (requires login)   
|── 📄 login.html # Login page (default)   
│── 📄 signup.html # Signup page with email verification   
│── 📄 verify.html # Email confirmation page   
│── 📄 styles.css # Styles for UI   
│── 📄 script.js # Client-side logic   
│── 📂 assets # Static assets (images, icons, etc.)   
│── 📂 backend # Backend API (if included in repo)   
│── 📄 README.md # Documentation  


## 🔧 Installation & Setup  

1. **Clone the repository**  
   ```sh  
   git clone https://github.com/yourusername/audio-transcriber.git  
   cd audio-transcriber  
2. Run the backend  
If you are using a local backend, navigate to the backend folder and start the server.  

3. Open the frontend  
Simply open login.html in a browser.

🔑 Authentication Flow

    Signup - Users register with email/password, and receive a verification email.

    Email Verification - Click the link in the email to activate the account.

    Login - Users log in with credentials or Google OAuth.

    Access Transcriber - Authenticated users can transcribe audio.

    Logout - Ends the session by clearing the JWT token.

🛠️ Tech Stack

    Frontend: HTML, CSS, JavaScript (Vanilla)

    Backend: Node.js, Express, MongoDB (if applicable)

    Authentication: JWT, OAuth (Google Sign-In)

📬 API Endpoints (Backend)
Method	Endpoint	Description
POST	/auth/signup	Register a new user
GET	/auth/verify-email?token=xyz	Verify email
POST	/auth/login	User login
GET	/auth/google-login	Google OAuth login
POST	/upload	Upload audio file (JWT protected)
🎯 To-Do

Improve UI/UX with Tailwind CSS

Support multiple audio formats

    Add history of transcriptions

🤝 Contributing

Contributions are welcome! Feel free to submit a PR or open an issue.
📄 License

This project is open-source and available under the MIT License.
