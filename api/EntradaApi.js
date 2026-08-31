import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://10.33.195.104:5000/api'; // Ajusta según la IP o dominio de tu servidor

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export async function getEntradas() {
  const headers = await getAuthHeaders();
  return await fetch(`${API_BASE_URL}/entradas`, {
    method: 'GET',
    headers
  });
}

export async function postEntrada(titulo, contenido, animo, etiquetas, fecha) {
  const headers = await getAuthHeaders();
  return await fetch(`${API_BASE_URL}/entradas`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ titulo, contenido, animo, etiquetas, fecha })
  });
}

export async function putEntrada(id, datos) {
  const headers = await getAuthHeaders();
  return await fetch(`${API_BASE_URL}/entradas/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(datos)
  });
}

export async function deleteEntrada(id) {
  const headers = await getAuthHeaders();
  return await fetch(`${API_BASE_URL}/entradas/${id}`, {
    method: 'DELETE',
    headers
  });
}

// Búsqueda multi-criterio por query (título, ánimo, etiqueta o contenido)
export async function buscarEntradas(params = {}) {
  const headers = await getAuthHeaders();
  
  const queryParams = new URLSearchParams();
  if (params.query) queryParams.append('query', params.query);
  if (params.animo) queryParams.append('animo', params.animo);
  if (params.etiqueta) queryParams.append('etiqueta', params.etiqueta);
  if (params.anio) queryParams.append('anio', params.anio);
  if (params.mes) queryParams.append('mes', params.mes);
  if (params.dia) queryParams.append('dia', params.dia);

  return await fetch(`${API_BASE_URL}/entradas/buscar?${queryParams.toString()}`, {
    method: 'GET',
    headers
  });
}