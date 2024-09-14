import React from 'react';
import { useAuth } from '@/store/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Cerrar Sesión</button>;
};

export default LogoutButton;