import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  // Contenedor principal de la pantalla
  container: {
    flex: 1,
    backgroundColor: '#E4D5CF',
  },

  // Encabezado
  header: {
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 30,
  },

  // Fila donde están el icono y el título
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Título principal
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#111827',
  },

  // Subtítulo
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: '#64748B',
  },

  // Tarjeta que contiene el formulario
  card: {
    marginHorizontal: 25,
    padding: 32,
    borderRadius: 22,
    backgroundColor: '#FFF',
    elevation: 5,
  },

  // Texto de las etiquetas
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#16345F',
    marginBottom: 9,
    marginTop: 8,
  },

  // Campos de texto
  input: {
    height: 62,
    borderWidth: 1,
    borderColor: '#D9E2EC',
    borderRadius: 17,
    paddingHorizontal: 18,
    fontSize: 17,
    color: '#11271b',
    marginBottom: 12,
    
  },

  // Mensaje de error
  error: {
    color: '#EF4444',
    marginBottom: 10,
    fontSize: 13,
    
  },

  // Botón principal
  button: {
    height: 64,
    borderRadius: 17,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    
  },

  // Texto del botón
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },

  // Contenedor del pie de pantalla
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  // Texto del pie
  footerText: {
    color: '#64748B',
    fontSize: 16,
  },

  // Enlace
  link: {
    color: '#9333EA',
    fontWeight: '700',
    fontSize: 16,
  },
  biometricButton: {
    marginTop: 16,
    alignItems: 'center',
    justifycontent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9333EA',
    backgroundColor: '#F3E8FF', // Morado suave de fondo
  },
  biometricText: {
    marginTop: 6,
    color: '#9333EA',
    fontSize: 14,
    fontWeight: '600',
  },

});