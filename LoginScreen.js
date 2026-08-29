import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/loginStyles';

export default function LoginScreen({ onLoginSuccess, onNavigateToRegister }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const iniciarSesion = async () => {
    setError('');

    if (!correo.trim() || !password.trim()) {
      setError('Completa todos los campos.');
      return;
    }

    try {
      const datos = await AsyncStorage.getItem('usuarios');
      const usuarios = datos ? JSON.parse(datos) : [];

      const usuario = usuarios.find(
        (u) => u.correo.toLowerCase() === correo.trim().toLowerCase()
      );

      if (!usuario) {
        setError('Correo incorrecto.');
        return;
      }

      if (usuario.password !== password) {
        setError('Contraseña incorrecta.');
        return;
      }

      onLoginSuccess(usuario);
    } catch (e) {
      setError('No se pudo iniciar sesión.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons 
          name="sparkles" 
          size={30} 
          color="#9333EA" />
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
          keyboardType="default"
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

        <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

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
