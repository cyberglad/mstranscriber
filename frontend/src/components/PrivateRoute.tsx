import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (!user.is_verified) {
    return <Navigate to="/login" state={{ message: 'Please verify your email first' }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 