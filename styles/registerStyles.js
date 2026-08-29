import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  // Encabezado
  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 28,
  },

  // Fila del título
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Título "Diario"
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#111827',
  },

  // Subtítulo
  subtitle: {
    marginTop: 8,
    fontSize: 18,
    color: '#64748B',
  },

  // Tarjeta del formulario
  card: {
    marginHorizontal: 30,
    padding: 32,
    borderRadius: 22,
    backgroundColor: '#FFF',
    elevation: 4,
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
    color: '#111827',
    marginBottom: 12,
  },

  // Botón
  button: {
    height: 64,
    borderRadius: 17,
    backgroundColor: '#16839B',
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

  // Contenedor del pie
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
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

  // 🟢 Estilo para el contenedor de éxito
  successBox: {
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  successText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  //  Estilo para el contenedor de error
  errorBox: {
    backgroundColor: '#EF4444',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  errorText: {
    color: '#FFF',
    fontSize: 13,
  },

  //  Estilo dinámico para el botón cuando ya se creó la cuenta
  buttonSuccess: {
    backgroundColor: '#4bfcc1',
  },


});