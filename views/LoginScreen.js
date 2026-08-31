import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/loginStyles';
import { postLogin } from '../api/AuthApi';
import { autenticarConBiometria } from '../components/biometria'; // Ajusta la ruta a tu helper

export default function LoginScreen({ onLoginSuccess, onNavigateToRegister }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarBotonHuella, setMostrarBotonHuella] = useState(false);

  // 1. Comprobar al iniciar si el usuario activó la biometría
  useEffect(() => {
    verificarEstadoBiometria();
  }, []);

  const verificarEstadoBiometria = async () => {
    try {
      const activa = await AsyncStorage.getItem('biometria_activa');
      const token = await AsyncStorage.getItem('token');
      // Muestra el botón solo si está activa la biometría y ya existe una sesión guardada
      if (activa === 'true' && token) {
        setMostrarBotonHuella(true);
      }
    } catch (e) {
      console.log('Error al verificar biometría:', e);
    }
  };

  // 2. Inicio de sesión manual con Correo y Contraseña
  const iniciarSesion = async () => {
    setError('');

    if (!correo.trim() || !password.trim()) {
      setError('Completa todos los campos.');
      return;
    }

    setCargando(true);

    try {
      const respuesta = await postLogin(correo.trim(), password.trim());
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error || 'Correo o contraseña incorrectos.');
        return;
      }

      if (datos.token) {
        await AsyncStorage.setItem('token', datos.token);
        await AsyncStorage.setItem('usuario', JSON.stringify(datos.usuario));
      }

      onLoginSuccess(datos.usuario);
    } catch (e) {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  // 3. Inicio de sesión mediante Huella / FaceID
  const handleLoginConHuella = async () => {
    const exito = await autenticarConBiometria('Ingresa a tu Diario Íntimo');

    if (exito) {
      try {
        const usuarioString = await AsyncStorage.getItem('usuario');
        if (usuarioString) {
          const usuario = JSON.parse(usuarioString);
          onLoginSuccess(usuario);
        } else {
          Alert.alert('Sesión expirada', 'Por favor ingresa con tu contraseña una vez más.');
        }
      } catch (e) {
        Alert.alert('Error', 'No se pudieron recuperar los datos del usuario.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="sparkles" size={30} color="#9333EA" />
          <Text style={styles.title}>Diario</Text>
        </View>
        <Text style={styles.subtitle}>Bienvenido</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={iniciarSesion}
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          )}
        </TouchableOpacity>

        {/* BOTÓN DE HUELLA / FACE ID */}
        {mostrarBotonHuella && (
          <TouchableOpacity
            style={styles.biometricButton}
            onPress={handleLoginConHuella}
          >
            <Ionicons name="finger-print-outline" size={32} color="#9333EA" />
            <Text style={styles.biometricText}>Ingresar con Huella / FaceID</Text>
          </TouchableOpacity>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={onNavigateToRegister}>
            <Text style={styles.link}> Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}