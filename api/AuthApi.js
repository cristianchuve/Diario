import AsyncStorage from '@react-native-async-storage/async-storage';

const API_LOGIN_URL = 'http://10.33.195.104:5000/api/auth/login';
const API_REGISTER_URL = 'http://10.33.195.104:5000/api/auth/register';
const API_USER_URL = 'http://10.33.195.104:5000/api/auth';

export async function postLogin(email, password) {
  const respuesta = await fetch(API_LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  });

  return respuesta;
}

export async function postRegister(username, email, password) {
  const respuesta = await fetch(API_REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    }),
  });

  return respuesta;
}
export async function putActualizarPerfil(idUsuario, datosActualizados) {
  try {
    const token = await AsyncStorage.getItem('token');

    const respuesta = await fetch(`${API_USER_URL}/${idUsuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(datosActualizados),
    });

    return respuesta;
  } catch (e) {
    console.log('Error en la petición putActualizarPerfil:', e);
    throw e;
  }
}