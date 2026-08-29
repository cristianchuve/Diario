import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  // Fondo oscuro que cubre toda la pantalla
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  // Menú lateral
  drawer: {
    width: '88%',
    maxWidth: 390,
    backgroundColor: '#1B1817',
    padding: 18,
    paddingTop: 25,
    borderRightWidth: 1,
    borderRightColor: '#38322E',
  },

  // Espacio restante fuera del menú
  background: {
    flex: 1,
  },

  // Encabezado del menú
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  // Logo
  logo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#C95700',
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
  },

  // Título del menú
  title: {
    flex: 1,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },

  // Contenedor del perfil
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#443D38',
    borderRadius: 18,
    backgroundColor: '#25211F',
  },

  // Avatar del usuario
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#9333EA',
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 12,
  },

  // Nombre del usuario
  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },

  // Correo del usuario
  email: {
    color: '#AAA',
    marginTop: 3,
    fontSize: 12,
  },

  // Botón nueva entrada
  newEntry: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#C95700',
    padding: 15,
    borderRadius: 15,
    marginTop: 16,
  },

  // Texto del botón nueva entrada
  newEntryText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 16,
  },

  // Título de las secciones
  section: {
    color: '#F59E0B',
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 14,
  },

  // Elementos del menú
  item: {
    color: '#E8E2DF',
    fontSize: 16,
    paddingVertical: 13,
  },

  // Botón cerrar sesión
  logout: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: '#302C29',
  },

  // Texto cerrar sesión
  logoutText: {
    color: '#F87171',
    fontWeight: '700',
  },

  // --- AÑADIR ESTOS ESTILOS DENTRO DE TU StyleSheet.create ---

  modalEditContent: {
    height: 'auto',
    padding: 20,
    borderRadius: 16,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
  },
  editScroll: {
    marginTop: 15,
  },
  avatarPickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPickerTouch: {
    position: 'relative',
  },
  editAvatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatarFallback: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#9333EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarInitials: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  cameraIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F59E0B',
    padding: 6,
    borderRadius: 15,
  },
  avatarHint: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
  },
  inputLabel: {
    color: '#AAA',
    marginBottom: 5,
    fontSize: 13,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    outlineStyle: 'none',
  },
  inputPassword: {
    backgroundColor: '#2A2A2A',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    outlineStyle: 'none',
  },
  saveButton: {
    backgroundColor: '#F59E0B',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});