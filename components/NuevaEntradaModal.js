import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { styles } from '../styles/nuevaEntradaStyles';

export default function NuevaEntradaModal({ visible, onClose, onSave, entradaAEditar }) {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [etiquetasInput, setEtiquetasInput] = useState('');
  const [imagen, setImagen] = useState(null);
  const [mood, setMood] = useState('');

  useEffect(() => {
    if (visible) {
      if (entradaAEditar) {
        setTitulo(entradaAEditar.titulo || entradaAEditar.title || '');
        setContenido(entradaAEditar.contenido || entradaAEditar.snippet || '');
        
        const listaEtiquetas = entradaAEditar.etiquetas || entradaAEditar.tags || [];
        const textoEtiquetas = listaEtiquetas
          .map(t => String(t).replace('#', ''))
          .join(', ');
        
        setEtiquetasInput(textoEtiquetas);
        setImagen(entradaAEditar.imagen || entradaAEditar.image || null);
        setMood(entradaAEditar.animo || entradaAEditar.mood || '');
      } else {
        limpiar();
      }
    }
  }, [entradaAEditar, visible]);

  const limpiar = () => {
    setTitulo('');
    setContenido('');
    setEtiquetasInput('');
    setImagen(null);
    setMood('');
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
    onSave({ titulo, contenido, etiquetas: etiquetasInput, imagen, mood });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                <Feather name="x" size={22} color="#AAA" />
              </TouchableOpacity>
            </View>

            {/* Input para ingreso libre de Estado de Ánimo */}
            <Text style={styles.label}>Estado de Ánimo</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="¿Cómo te sientes? (Ej. Radiante, Pensativo, Melancólico...)"
              placeholderTextColor="#888"
              value={mood}
              onChangeText={setMood}
            />

            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Título.............."
              placeholderTextColor="#888"
              value={titulo}
              onChangeText={setTitulo}
            />

            <Text style={styles.label}>Contenido</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Querido diario, hoy fue un día de..."
              placeholderTextColor="#888"
              multiline
              value={contenido}
              onChangeText={setContenido}
            />

            <Text style={styles.label}>Etiquetas (separadas por coma)</Text>
            <TextInput
              style={styles.tagInput}
              placeholder="trabajo, ideas, diario"
              placeholderTextColor="#777"
              value={etiquetasInput}
              onChangeText={setEtiquetasInput}
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