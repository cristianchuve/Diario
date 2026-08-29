import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles/nuevaEntradaStyles';

export default function NuevaEntradaModal({ visible, onClose, onSave, entradaAEditar }) {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [etiquetas, setEtiquetas] = useState('');
  const [imagen, setImagen] = useState(null);
  const [mood, setMood] = useState('En calma');

  useEffect(() => {
    if (entradaAEditar) {
      setTitulo(entradaAEditar.title || '');
      setContenido(entradaAEditar.snippet || '');
      setEtiquetas((entradaAEditar.tags || []).map(t => t.replace('#', '')).join(', '));
      setImagen(entradaAEditar.image || null);
      setMood(entradaAEditar.mood || 'En calma');
    } else {
      limpiar();
    }
  }, [entradaAEditar, visible]);

  const limpiar = () => {
    setTitulo('');
    setContenido('');
    setEtiquetas('');
    setImagen(null);
    setMood('En calma');
  };

  const seleccionarFoto = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const guardar = () => {
    onSave({ titulo, contenido, etiquetas, imagen, mood });
  };

  const moods = ['Radiante', 'Agradecido', 'En calma', 'Inspirado', 'Pensativo', 'Estresado', 'Cansado', 'Melancólico'];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {entradaAEditar ? 'Editar página' : 'Nueva página en tu Diario'}
                </Text>
                <Text style={styles.modalDate}>
                  {new Date().toLocaleDateString('es-ES')}
                </Text>
              </View>
              <TouchableOpacity onPress={onClose}>
                <Feather 
                name="x" 
                size={22} 
                color="#AAA" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Estado de Animo!</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.moods}>
                {moods.map(m => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.mood, mood === m && styles.moodActive]}
                    onPress={() => setMood(m)}
                  >
                    <Text style={styles.moodText}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <TextInput
              style={styles.titleInput}
              placeholder="Título.............."
              placeholderTextColor="#888"
              value={titulo}
              onChangeText={setTitulo}
            />

            <TextInput
              style={styles.contentInput}
              placeholder="Querido diario, hoy fue un día de..."
              placeholderTextColor="#888"
              multiline
              value={contenido}
              onChangeText={setContenido}
            />

            <Text style={styles.label}>Etiquetas</Text>

            <TextInput
              style={styles.tagInput}
              placeholder="Añadir etiqueta."
              placeholderTextColor="#777"
              value={etiquetas}
              onChangeText={setEtiquetas}
            />

            <View style={styles.footer}>
              <TouchableOpacity style={styles.cancel} onPress={onClose}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.save} onPress={guardar}>
                <Feather name="save" size={16} color="#FFF" />
                <Text style={styles.saveText}>Guardar en mi Diario</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
