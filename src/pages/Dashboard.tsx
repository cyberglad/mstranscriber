import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface Transcription {
  id: number;
  filename: string;
  text: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/transcribe/`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setTranscription(response.data.text);
      setTranscriptions([...transcriptions, {
        id: response.data.transcription_id,
        filename: file.name,
        text: response.data.text,
        created_at: new Date().toISOString(),
      }]);
      setFile(null);
    } catch (error) {
      setError('Error transcribing audio file');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/transcriptions/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setTranscriptions(transcriptions.filter(t => t.id !== id));
    } catch (error) {
      setError('Error deleting transcription');
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">
              Welcome, {user?.email}
            </Typography>
            <Button variant="outlined" color="error" onClick={logout}>
              Logout
            </Button>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                component="label"
              >
                Upload Audio File
                <input
                  type="file"
                  hidden
                  accept="audio/*"
                  onChange={handleFileChange}
                />
              </Button>
              {file && (
                <Typography>
                  Selected file: {file.name}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!file || loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Transcribe'}
              </Button>
            </Box>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {transcription && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Transcription Result:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={transcription}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          )}
        </Paper>

        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Previous Transcriptions
          </Typography>
          <List>
            {transcriptions.map((t) => (
              <ListItem
                key={t.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDelete(t.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={t.filename}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {t.text}
                      </Typography>
                      <br />
                      {new Date(t.created_at).toLocaleString()}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard; 