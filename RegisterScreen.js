import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/registerStyles';

export default function RegisterScreen({ onRegisterSuccess, onNavigateToLogin }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const crearCuenta = async () => {
    setError('');
    setMensajeExito('');

    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      setError('Completa todos los campos.');
      return;
    }

    try {
      const datos = await AsyncStorage.getItem('usuarios');
      const usuarios = datos ? JSON.parse(datos) : [];

      const existe = usuarios.some(
        (u) => u.correo.toLowerCase() === correo.trim().toLowerCase()
      );

      if (existe) {
        setError('Este correo ya está registrado.');
        return;
      }

      const nuevoUsuario = {
        nombre: nombre.trim(),
        correo: correo.trim(),
        password,
      };

      const listaNueva = [...usuarios, nuevoUsuario];

      await AsyncStorage.setItem('usuarios', JSON.stringify(listaNueva));
      await AsyncStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));

      setMensajeExito(' ¡Cuenta creada exitosamente!');

      setTimeout(() => {
        onRegisterSuccess(nuevoUsuario);
      }, 1500);

    } catch (e) {
      setError('No se pudo crear la cuenta.');
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
        <Text style={styles.subtitle}>Crea tu cuenta</Text>
      </View>

      <View style={styles.card}>
        {/* MENSAJE DE ÉXITO */}
        {mensajeExito ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>{mensajeExito}</Text>
          </View>
        ) : null}

        {/* MENSAJE DE ERROR */}
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={[styles.input, { outlineStyle: 'none' }]}
          placeholder="Nombre"
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
          keyboardType="default"
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
          disabled={!!mensajeExito}
        >
          <Text style={styles.buttonText}>
            {mensajeExito ? '¡Listo!' : 'Crear cuenta'}
          </Text>
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