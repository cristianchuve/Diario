import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity,
  ScrollView, Image, StatusBar, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles/diarioStyles';
import NuevaEntradaModal from './NuevaEntradaModal';
import SidebarDrawer from './SidebarDrawer';

const MOOD_EMOJIS = {
  'Radiante': '✨',
  'Agradecido': '🙏',
  'En calma': '🌿',
  'Inspirado': '💡',
  'Pensativo': '🤔',
  'Estresado': '😰',
  'Cansado': '😴',
  'Melancólico': '🌧️',
};

export default function DiarioScreen({ usuario: usuarioInicial, onLogout }) {
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [busqueda, setBusqueda] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [entradas, setEntradas] = useState([]);
  const [entradaEditar, setEntradaEditar] = useState(null);

  const claveEntradas = `entradas_${usuario?.correo}`;

  useEffect(() => {
    setUsuario(usuarioInicial);
  }, [usuarioInicial]);

  useEffect(() => {
    cargarEntradas();
  }, [usuario?.correo]);

  const cargarEntradas = async () => {
    try {
      const datos = await AsyncStorage.getItem(claveEntradas);
      setEntradas(datos ? JSON.parse(datos) : []);
    } catch (e) {
      setEntradas([]);
    }
  };

  const handleUpdateUsuario = async (nuevoUsuario) => {
    try {
      if (usuario?.correo && usuario.correo !== nuevoUsuario.correo) {
        const entradasActuales = await AsyncStorage.getItem(`entradas_${usuario.correo}`);
        if (entradasActuales) {
          await AsyncStorage.setItem(`entradas_${nuevoUsuario.correo}`, entradasActuales);
          await AsyncStorage.removeItem(`entradas_${usuario.correo}`);
        }
      }

      await AsyncStorage.setItem('usuario_sesion', JSON.stringify(nuevoUsuario));

      const usuariosGuardados = await AsyncStorage.getItem('usuarios');
      if (usuariosGuardados) {
        const listaUsuarios = JSON.parse(usuariosGuardados);
        const listaActualizada = listaUsuarios.map(u => 
          u.correo === usuario?.correo ? nuevoUsuario : u
        );
        await AsyncStorage.setItem('usuarios', JSON.stringify(listaActualizada));
      }

      setUsuario(nuevoUsuario);
    } catch (e) {
      console.log('Error guardando perfil:', e);
    }
  };

  const guardarEntradas = async (lista) => {
    setEntradas(lista);
    await AsyncStorage.setItem(claveEntradas, JSON.stringify(lista));
  };

  const guardarEntrada = async (datos) => {
    if (!datos.titulo?.trim() && !datos.contenido?.trim()) return;

    const base = {
      mood: datos.mood || 'En calma',
      title: datos.titulo?.trim() || 'Sin título',
      snippet: datos.contenido?.trim() || '',
      image: datos.imagen || null,
      date: new Date().toLocaleDateString('es-ES', {
        day: 'numeric', month: 'short', year: 'numeric'
      }),
      tags: datos.etiquetas
        ? datos.etiquetas.split(',').map(t => `#${t.trim()}`).filter(t => t !== '#')
        : [],
    };

    let lista;

    if (entradaEditar) {
      lista = entradas.map(item =>
        item.id === entradaEditar.id ? { ...item, ...base } : item
      );
    } else {
      lista = [{ id: Date.now().toString(), ...base }, ...entradas];
    }

    await guardarEntradas(lista);
    cerrarModal();
  };

  const eliminarEntrada = async (id) => {
    await guardarEntradas(entradas.filter(item => item.id !== id));
  };

  const abrirNueva = () => {
    setEntradaEditar(null);
    setModalVisible(true);
  };

  const editarEntrada = (entrada) => {
    setEntradaEditar(entrada);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setEntradaEditar(null);
  };

  const resultados = entradas.filter(item =>
    `${item.title} ${item.snippet} ${item.tags.join(' ')} ${item.mood || ''}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }
      ]}
    >
      <StatusBar 
      barStyle="light-content" 
      backgroundColor="#121212" 
      translucent={true} />

      <SidebarDrawer
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onNewEntry={abrirNueva}
        usuario={usuario}
        onLogout={onLogout}
        onUpdateUsuario={handleUpdateUsuario}
      />

      <NuevaEntradaModal
        visible={modalVisible}
        onClose={cerrarModal}
        onSave={guardarEntrada}
        entradaAEditar={entradaEditar}
      />

      {/* --- BLOQUE FIJO / ESTÁTICO (NO HACE SCROLL) --- */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
              <Feather 
              name="menu" 
              size={22} 
              color="#FFF" />
            </TouchableOpacity>
            <View>
              <Text style={styles.appTitle}>Mi Diario</Text>
              <Text style={styles.headerUser}>{usuario?.nombre}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.newButton} onPress={abrirNueva}>
            <Feather 
            name="plus" 
            size={17} 
            color="#FFF"/>
            <Text style={styles.newButtonText}>Nueva Entrada</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.search}>
          <Feather 
          name="search" 
          size={18} 
          color="#71717A" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar............."
            placeholderTextColor="#71717A"
            value={busqueda}
            onChangeText={setBusqueda}          
          />
          {busqueda.length > 0 && (
            <TouchableOpacity onPress={() => setBusqueda('')}>
              <Feather 
              name="x" 
              size={20} 
              color="#535384" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* --- BLOQUE DINÁMICO (SOLO ESTO HACE SCROLL) --- */}
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: 10 }]}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Colecciones</Text>
            <Text style={styles.counter}>{resultados.length} páginas registradas</Text>
          </View>
        </View>

        <View style={styles.cards}>
          {resultados.map(item => (
            <View key={item.id} style={styles.card}>
              {item.mood ? (
                <Text style={styles.moodBadge}>
                  {MOOD_EMOJIS[item.mood] || '💭'} {item.mood}
                </Text>
              ) : null}

              <Text style={styles.date}>🗓️ {item.date}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>

              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.cardImage} />
              ) : null}

              <Text style={styles.snippet}>{item.snippet}</Text>

              <View style={styles.cardBottom}>
                <View style={styles.tags}>
                  {item.tags.map((tag, i) => (
                    <Text key={i} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => editarEntrada(item)}>
                    <Feather 
                    name="edit-2" 
                    size={17} 
                    color="#AAA" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => eliminarEntrada(item.id)}>
                    <Feather 
                    name="trash-2" 
                    size={17} 
                    color="#AAA" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}