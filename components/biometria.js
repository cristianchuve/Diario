import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export async function comprobarSoporteBiometrics() {
  const tieneHardware = await LocalAuthentication.hasHardwareAsync();
  if (!tieneHardware) return false;

  const estaEnrolado = await LocalAuthentication.isEnrolledAsync();
  return estaEnrolado;
}

export async function autenticarConBiometria(mensajePrompt = 'Confirma tu identidad') {
  try {
    const esCompatible = await comprobarSoporteBiometrics();

    if (!esCompatible) {
      Alert.alert(
        'Biometría no disponible',
        'Tu dispositivo no cuenta con biometría configurada o activa.'
      );
      return false;
    }

    const resultado = await LocalAuthentication.authenticateAsync({
      promptMessage: mensajePrompt,
      fallbackLabel: 'Usar contraseña',
      cancelLabel: 'Cancelar',
      disableDeviceFallback: false,
    });

    return resultado.success;
  } catch (error) {
    console.log('Error en biometría:', error);
    return false;
  }
}