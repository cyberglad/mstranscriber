import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token || '');
        setStatus('success');
        setTimeout(() => {
          navigate('/login', {
            state: { message: 'Email verified successfully! You can now log in.' }
          });
        }, 3000);
      } catch (error) {
        setStatus('error');
        setError('Invalid or expired verification token');
      }
    };

    verify();
  }, [token, verifyEmail, navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            Email Verification
          </Typography>
          {status === 'loading' && (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Verifying your email...</Typography>
            </Box>
          )}
          {status === 'success' && (
            <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
              Email verified successfully! Redirecting to login...
            </Alert>
          )}
          {status === 'error' && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default VerifyEmail; 