import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/sidebarStyles';
import { putActualizarPerfil } from '../api/AuthApi';
import { comprobarSoporteBiometrics } from './biometria';

export default function SidebarDrawer({ visible, onClose, onNewEntry, usuario, onLogout, onUpdateUsuario }) {
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [usarBiometria, setUsarBiometria] = useState(false);

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || usuario.username || '');
      setCorreo(usuario.correo || usuario.email || '');
      setPassword(usuario.password || '');
      setAvatar(usuario.avatar || null);
      cargarPreferenciaBiometria();
    }
  }, [usuario, modalEditVisible]);

  // Funciones de Biometría
  const cargarPreferenciaBiometria = async () => {
    try {
      const activo = await AsyncStorage.getItem('biometria_activa');
      if (activo === 'true') {
        setUsarBiometria(true);
      } else {
        setUsarBiometria(false);
      }
    } catch (e) {
      console.log('Error al cargar preferencia de biometría:', e);
    }
  };

  const toggleBiometria = async (valor) => {
    if (valor) {
      const soporte = await comprobarSoporteBiometrics();
      if (!soporte) {
        Alert.alert('No disponible', 'Este dispositivo no tiene biometría configurada o activada.');
        return;
      }
      await AsyncStorage.setItem('biometria_activa', 'true');
      setUsarBiometria(true);
      Alert.alert('¡Activado!', 'Ahora podrás ingresar con tu huella desde el Login.');
    } else {
      await AsyncStorage.setItem('biometria_activa', 'false');
      setUsarBiometria(false);
    }
  };

  // Selector de imagen de perfil
  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Se necesitan permisos para acceder a tus imágenes.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const uriImagen = asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : asset.uri;
      setAvatar(uriImagen);
    }
  };

  // Actualizar perfil
  const guardarCambiosPerfil = async () => {
    if (!nombre.trim() || !correo.trim()) {
      Alert.alert('Atención', 'El nombre y el correo son obligatorios');
      return;
    }

    try {
      const idUsuario = usuario._id || usuario.id;
      if (!idUsuario) {
        Alert.alert('Error', 'No se encontró el ID del usuario');
        return;
      }

      const datosNuevos = {
        username: nombre.trim(),
        email: correo.trim(),
        ...(password ? { password: password.trim() } : {}),
        avatar: avatar,
      };

      const respuesta = await putActualizarPerfil(idUsuario, datosNuevos);
      const contentType = respuesta.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        const textoError = await respuesta.text();
        console.log('Respuesta del servidor (no JSON):', textoError);
        Alert.alert('Error', `Error del servidor (${respuesta.status}): Ruta no encontrada.`);
        return;
      }

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        if (onUpdateUsuario) {
          await onUpdateUsuario(resultado.usuario);
        }
        setModalEditVisible(false);
        Alert.alert('Éxito', 'Perfil actualizado con éxito');
      } else {
        Alert.alert('Error', resultado.error || resultado.mensaje || 'Error al actualizar');
      }
    } catch (e) {
      console.log('Error de conexión:', e);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <>
      {/* DRAWER PRINCIPAL */}
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.overlay}>
          <View style={styles.drawer}>
            <View style={styles.header}>
              <Text style={styles.logo}>D</Text>
              <Text style={styles.title}>Diario Íntimo</Text>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={22} color="#888" />
              </TouchableOpacity>
            </View>

            {/* PERFIL (BOTÓN DE EDICIÓN) */}
            <TouchableOpacity
              style={styles.profile}
              onPress={() => setModalEditVisible(true)}
              activeOpacity={0.7}
            >
              {usuario?.avatar ? (
                <Image source={{ uri: usuario.avatar }} style={styles.profileImage} />
              ) : (
                <Text style={styles.avatar}>
                  {(usuario?.username || usuario?.nombre || 'U').charAt(0).toUpperCase()}
                </Text>
              )}

              <View style={styles.profileInfo}>
                <Text style={styles.name}>{usuario?.username || usuario?.nombre || 'Usuario'}</Text>
                <Text style={styles.email}>{usuario?.email || usuario?.correo || ''}</Text>
              </View>
              <Feather name="edit-3" size={18} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.newEntry} onPress={onNewEntry}>
              <Feather name="plus-circle" size={20} color="#FFF" />
              <Text style={styles.newEntryText}>Escribir Nueva Entrada</Text>
            </TouchableOpacity>

            {/* OPCIÓN DE BLOQUEO POR HUELLA / FACE ID */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 4, borderTopWidth: 1, borderTopColor: '#334155', marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Feather name="shield" size={20} color="#9333EA" />
                <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '500' }}>Bloqueo por Huella</Text>
              </View>
              <Switch
                value={usarBiometria}
                onValueChange={toggleBiometria}
                trackColor={{ false: '#475569', true: '#9333EA' }}
              />
            </View>

            <TouchableOpacity style={styles.logout} onPress={onLogout}>
              <Feather name="log-out" size={17} color="#F87171" />
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.background} onPress={onClose} />
        </View>
      </Modal>

      {/* MODAL DE EDICIÓN DE PERFIL */}
      <Modal visible={modalEditVisible} transparent animationType="fade" onRequestClose={() => setModalEditVisible(false)}>
        <View style={styles.overlay}>
          <View style={[styles.drawer, styles.modalEditContent]}>
            <View style={styles.header}>
              <Text style={styles.title}>Editar Perfil</Text>
              <TouchableOpacity onPress={() => setModalEditVisible(false)}>
                <Feather name="x" size={22} color="#888" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.editScroll}>
              {/* SELECTOR DE FOTO DE PERFIL */}
              <View style={styles.avatarPickerContainer}>
                <TouchableOpacity onPress={seleccionarImagen} style={styles.avatarPickerTouch}>
                  {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.editAvatarImage} />
                  ) : (
                    <View style={styles.editAvatarFallback}>
                      <Text style={styles.editAvatarInitials}>
                        {(nombre || 'U').charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  )}

                  <View style={styles.cameraIconBadge}>
                    <Feather name="camera" size={14} color="#FFF" />
                  </View>
                </TouchableOpacity>
                <Text style={styles.avatarHint}>
                  Toca la imagen para cambiar la foto
                </Text>
              </View>

              <Text style={styles.inputLabel}>Nombre de usuario</Text>
              <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Tu nombre de usuario"
                placeholderTextColor="#666"
              />

              <Text style={styles.inputLabel}>Correo Electrónico</Text>
              <TextInput
                style={styles.input}
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="correo@ejemplo.com"
                placeholderTextColor="#666"
              />

              <Text style={styles.inputLabel}>Contraseña</Text>
              <TextInput
                style={styles.inputPassword}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Nueva contraseña (dejar en blanco para no cambiar)"
                placeholderTextColor="#666"
              />

              <TouchableOpacity style={styles.saveButton} onPress={guardarCambiosPerfil}>
                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}