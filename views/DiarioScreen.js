import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity,
  ScrollView, Image, StatusBar, Platform, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles/diarioStyles';
import NuevaEntradaModal from '../components/NuevaEntradaModal';
import SidebarDrawer from '../components/SidebarDrawer';
import {
  getEntradas,
  postEntrada,
  putEntrada,
  deleteEntrada,
  buscarEntradas
} from '../api/EntradaApi';

export default function DiarioScreen({ usuario: usuarioInicial, onLogout }) {
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [busqueda, setBusqueda] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [entradas, setEntradas] = useState([]);
  const [entradaEditar, setEntradaEditar] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Estados para el calendario nativo de Expo Go
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  useEffect(() => {
    setUsuario(usuarioInicial);
  }, [usuarioInicial]);

  useEffect(() => {
    cargarEntradas();
  }, []);

  const cargarEntradas = async () => {
    setCargando(true);
    setFechaSeleccionada(null);
    setBusqueda('');
    try {
      const respuesta = await getEntradas();
      const datos = await respuesta.json();
      if (respuesta.ok) {
        setEntradas(datos.entradas || []);
      }
    } catch (e) {
      console.log('Error al obtener entradas del backend:', e);
    } finally {
      setCargando(false);
    }
  };

  const handleUpdateUsuario = async (nuevoUsuario) => {
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
      setUsuario(nuevoUsuario);
    } catch (e) {
      console.log('Error guardando perfil:', e);
    }
  };

  const guardarEntrada = async (datos) => {
    if (!datos.titulo?.trim() && !datos.contenido?.trim()) return;

    let arregloEtiquetas = [];
    if (Array.isArray(datos.etiquetas)) {
      arregloEtiquetas = datos.etiquetas;
    } else if (typeof datos.etiquetas === 'string' && datos.etiquetas.trim() !== '') {
      arregloEtiquetas = datos.etiquetas
        .split(',')
        .map(t => t.trim().replace('#', ''))
        .filter(t => t !== '');
    }

    try {
      if (entradaEditar) {
        const respuesta = await putEntrada(entradaEditar._id, {
          titulo: datos.titulo?.trim(),
          contenido: datos.contenido?.trim(),
          animo: datos.mood?.trim(),
          etiquetas: arregloEtiquetas,
          imagen: datos.imagen
        });

        if (respuesta.ok) cargarEntradas();
      } else {
        const respuesta = await postEntrada(
          datos.titulo?.trim(),
          datos.contenido?.trim(),
          datos.mood?.trim(),
          arregloEtiquetas
        );

        if (respuesta.ok) cargarEntradas();
      }
    } catch (e) {
      console.log('Error al guardar entrada:', e);
    }

    cerrarModal();
  };

  const eliminarEntrada = async (id) => {
    try {
      const respuesta = await deleteEntrada(id);
      if (respuesta.ok) {
        setEntradas(entradas.filter(item => item._id !== id));
      }
    } catch (e) {
      console.log('Error al eliminar entrada:', e);
    }
  };

  const ejecutarBusqueda = async (texto) => {
    setBusqueda(texto);
    setFechaSeleccionada(null);
    if (!texto.trim()) {
      cargarEntradas();
      return;
    }

    try {
      const respuesta = await buscarEntradas({ query: texto.trim() });
      const datos = await respuesta.json();
      if (respuesta.ok) {
        setEntradas(datos.entradas || []);
      }
    } catch (e) {
      console.log('Error al buscar entradas:', e);
    }
  };

  // Manejo directo del DatePicker Nativo para Android / iOS en Expo Go
  const alSeleccionarFecha = async (event, fecha) => {
    // En Android se oculta al seleccionar o cancelar
    setMostrarCalendario(Platform.OS === 'ios');

    // Si el usuario presiona "Cancelar" en Android
    if (event.type === 'dismissed' || !fecha) return;

    setFechaSeleccionada(fecha);
    setBusqueda('');
    setCargando(true);

    // Formateo exacto de fecha local para evitar desfases horarios
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();

    try {
      const respuesta = await buscarEntradas({ anio, mes, dia });
      const datos = await respuesta.json();
      if (respuesta.ok) {
        setEntradas(datos.entradas || []);
      }
    } catch (e) {
      console.log('Error al filtrar por fecha:', e);
    } finally {
      setCargando(false);
    }
  };

  const abrirNueva = () => {
    setEntradaEditar(null);
    setModalVisible(true);
  };

  const editarEntrada = (entrada) => {
    setEntradaEditar({
      ...entrada,
      id: entrada._id,
      title: entrada.titulo,
      snippet: entrada.contenido,
      mood: entrada.animo,
      tags: entrada.etiquetas || []
    });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setEntradaEditar(null);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor="#121212" translucent={true} />

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

      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
              <Feather name="menu" size={20} color="#FFF" />
            </TouchableOpacity>
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.appTitle} numberOfLines={1}>Mi Diario</Text>
              <Text style={styles.headerUser} numberOfLines={1}>{usuario?.username || usuario?.nombre}</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[
                styles.menuButton,
                fechaSeleccionada ? { backgroundColor: '#C95700', marginRight: 0 } : { marginRight: 0 }
              ]}
              onPress={() => setMostrarCalendario(true)}
            >
              <Feather name="calendar" size={19} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.newButton} onPress={abrirNueva}>
              <Feather name="plus" size={16} color="#FFF" />
              <Text style={styles.newButtonText}>Nueva Entrada</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Despliegue del Calendario Nativo en Expo Go */}
        {mostrarCalendario && (
          <DateTimePicker
            value={fechaSeleccionada || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            maximumDate={new Date()} // Deshabilita fechas futuras
            onChange={alSeleccionarFecha}
          />
        )}

        <View style={styles.search}>
          <Feather name="search" size={18} color="#71717A" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por título, ánimo o etiqueta..."
            placeholderTextColor="#71717A"
            value={busqueda}
            onChangeText={ejecutarBusqueda}
          />
          {(busqueda.length > 0 || fechaSeleccionada) && (
            <TouchableOpacity onPress={cargarEntradas}>
              <Feather name="x" size={20} color="#535384" />
            </TouchableOpacity>
          )}
        </View>

        {fechaSeleccionada && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6 }}>
            <Text style={{ color: '#F59E0B', fontSize: 13, fontWeight: '600' }}>
              Filtrado por fecha: {fechaSeleccionada.toLocaleDateString('es-ES')}
            </Text>
            <TouchableOpacity onPress={cargarEntradas}>
              <Text style={{ color: '#AAA', fontSize: 12, textDecorationLine: 'underline' }}>(Limpiar)</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: 10 }]}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Colecciones</Text>
            <Text style={styles.counter}>{entradas.length} páginas encontradas</Text>
          </View>
        </View>

        {cargando ? (
          <ActivityIndicator color="#C95700" size="large" style={{ marginTop: 20 }} />
        ) : (
          <View style={styles.cards}>
            {entradas.map(item => (
              <View key={item._id} style={styles.card}>
                {item.animo ? (
                  <Text style={styles.moodBadge}>
                    💭 {item.animo}
                  </Text>
                ) : null}

                <Text style={styles.date}>
                  🗓️ {new Date(item.fecha || item.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                </Text>

                <Text style={styles.cardTitle}>{item.titulo}</Text>

                {item.imagen ? (
                  <Image source={{ uri: item.imagen }} style={styles.cardImage} />
                ) : null}

                <Text style={styles.snippet}>{item.contenido}</Text>

                <View style={styles.cardBottom}>
                  <View style={styles.tags}>
                    {item.etiquetas?.map((tag, i) => (
                      <Text key={i} style={styles.tag}>#{tag}</Text>
                    ))}
                  </View>
                  <View style={styles.actions}>
                    <TouchableOpacity onPress={() => editarEntrada(item)}>
                      <Feather name="edit-2" size={17} color="#AAA" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => eliminarEntrada(item._id)}>
                      <Feather name="trash-2" size={17} color="#AAA" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}