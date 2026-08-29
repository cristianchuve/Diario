import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import DiarioScreen from './DiarioScreen';

export default function App() {
  const [pantalla, setPantalla] = useState('login');
  const [usuario, setUsuario] = useState(null);

  const entrarAlDiario = (datosUsuario) => {
    setUsuario(datosUsuario);
    setPantalla('diario');
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setPantalla('login');
  };

  if (pantalla === 'register') {
    return (
      <RegisterScreen
        onRegisterSuccess={entrarAlDiario}
        onNavigateToLogin={() => setPantalla('login')}
      />
    );
  }

  if (pantalla === 'diario') {
    return (
      <DiarioScreen
        usuario={usuario}
        onLogout={cerrarSesion}
      />
    );
  }

  return (
    <LoginScreen
      onLoginSuccess={entrarAlDiario}
      onNavigateToRegister={() => setPantalla('register')}
    />
  );
}
