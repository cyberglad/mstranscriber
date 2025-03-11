<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audio Transcriber</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        input, button {
            margin: 10px 0;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        #error {
            color: red;
        }
        #transcription {
            margin-top: 20px;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 4px;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <h1>Audio Transcriber</h1>
    <form id="uploadForm">
        <input type="file" id="audioFile" accept="audio/*">
        <button type="submit">Transcribe</button>
    </form>
    <div id="error"></div>
    <div id="transcription"></div>

    <script>
        const form = document.getElementById('uploadForm');
        const fileInput = document.getElementById('audioFile');
        const button = form.querySelector('button');
        const errorDiv = document.getElementById('error');
        const transcriptionDiv = document.getElementById('transcription');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const file = fileInput.files[0];
            errorDiv.textContent = '';
            transcriptionDiv.textContent = '';

            if (!file) {
                errorDiv.textContent = 'Please select an audio file';
                return;
            }

            button.disabled = true;
            button.textContent = 'Transcribing...';

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('https://audiotranscriber-skor.onrender.com/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (data.error) {
                    errorDiv.textContent = data.error;
                } else {
                    transcriptionDiv.textContent = data.transcription;
                }
            } catch (err) {
                errorDiv.textContent = 'Error connecting to server';
            } finally {
                button.disabled = false;
                button.textContent = 'Transcribe';
            }
        });
    </script>
</body>
</html>
