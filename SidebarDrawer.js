import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles/sidebarStyles';

export default function SidebarDrawer({ visible, onClose, onNewEntry, usuario, onLogout, onUpdateUsuario }) {
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || '');
      setCorreo(usuario.correo || '');
      setPassword(usuario.password || '');
      setAvatar(usuario.avatar || null);
    }
  }, [usuario, modalEditVisible]);

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a tus imágenes.');
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

  const guardarCambiosPerfil = async () => {
    if (!nombre.trim() || !correo.trim()) return;

    if (onUpdateUsuario) {
      await onUpdateUsuario({
        ...usuario,
        nombre: nombre.trim(),
        correo: correo.trim(),
        password: password,
        avatar: avatar,
      });
    }
    setModalEditVisible(false);
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
                  {(usuario?.nombre || 'U').charAt(0).toUpperCase()}
                </Text>
              )}

              <View style={styles.profileInfo}>
                <Text style={styles.name}>{usuario?.nombre || 'Usuario'}</Text>
                <Text style={styles.email}>{usuario?.correo || ''}</Text>
              </View>
              <Feather 
              name="edit-3" 
              size={18} 
              color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.newEntry} onPress={onNewEntry}>
              <Feather 
              name="plus-circle" 
              size={20} 
              color="#FFF" />
              <Text style={styles.newEntryText}>Escribir Nueva Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logout} onPress={onLogout}>
              <Feather 
              name="log-out" 
              size={17} 
              color="#F87171" />
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
                <Feather 
                name="x" 
                size={22} 
                color="#888" />
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
                    <Feather 
                    name="camera" 
                    size={14} 
                    color="#FFF" />
                  </View>
                </TouchableOpacity>
                <Text style={styles.avatarHint}>
                  Toca la imagen para cambiar la foto
                </Text>
              </View>

              <Text style={styles.inputLabel}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Tu nombre"
                placeholderTextColor="#666"
              />

              <Text style={styles.inputLabel}>Correo Electrónico</Text>
              <TextInput
                style={styles.input}
                value={correo}
                onChangeText={setCorreo}
                keyboardType="default"
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
                placeholder="Nueva contraseña"
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