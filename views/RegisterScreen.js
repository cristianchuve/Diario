import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/registerStyles';
import { postRegister } from '../api/AuthApi'; // <-- Importamos la función

export default function RegisterScreen({ onRegisterSuccess, onNavigateToLogin }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const crearCuenta = async () => {
    setError('');
    setMensajeExito('');

    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      setError('Completa todos los campos.');
      return;
    }

    setCargando(true);

    try {
      
      const respuesta = await postRegister(nombre.trim(), correo.trim(), password.trim());
      const datos = await respuesta.json();

      if (!respuesta.ok) {
      
        setError(datos.error || 'No se pudo crear la cuenta.');
        setCargando(false);
        return;
      }

      if (datos.token) {
        await AsyncStorage.setItem('token', datos.token);
        await AsyncStorage.setItem('usuario', JSON.stringify(datos.usuario));
      }

      setMensajeExito(' ¡Cuenta creada exitosamente!');

      setTimeout(() => {
        onRegisterSuccess(datos.usuario);
      }, 1500);

    } catch (e) {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="sparkles" size={30} color="#9333EA" />
          <Text style={styles.title}>Diario</Text>
        </View>
        <Text style={styles.subtitle}>Crea tu cuenta</Text>
      </View>

      <View style={styles.card}>
        {mensajeExito ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>{mensajeExito}</Text>
          </View>
        ) : null}

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={[styles.input, { outlineStyle: 'none' }]}
          placeholder="Nombre de usuario"
          placeholderTextColor="#94A3B8"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={[styles.input, { outlineStyle: 'none' }]}
          placeholder="Correo@gmail.com"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={[styles.input, { outlineStyle: 'none' }]}
          placeholder="Crea una contraseña"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity 
          style={[styles.button, mensajeExito ? styles.buttonSuccess : null]} 
          onPress={crearCuenta}
          disabled={!!mensajeExito || cargando}
        >
          {cargando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>
              {mensajeExito ? '¡Listo!' : 'Crear cuenta'}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.link}> Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}