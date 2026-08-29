import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  // Fondo oscuro detrás del modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    justifyContent: 'center',
    padding: 10,
  },

  // Contenedor principal del modal
  modal: {
    maxHeight: '94%',
    backgroundColor: '#1B1918',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#49433E',
    padding: 20,
  },

  // Encabezado del modal
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#302C29',
    paddingBottom: 14,
  },

  // Título del modal
  modalTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },

  // Fecha del modal
  modalDate: {
    color: '#AAA',
    marginTop: 3,
    fontSize: 12,
  },

  // Etiquetas de los campos
  label: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 8,
  },

  // Contenedor de estados de ánimo
  moods: {
    flexDirection: 'row',
    gap: 7,
    paddingBottom: 8,
  },

  // Botón de estado de ánimo
  mood: {
    padding: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#403B37',
    minWidth: 78,
    alignItems: 'center',
  },

  // Estado de ánimo seleccionado
  moodActive: {
    borderColor: '#F59E0B',
    backgroundColor: '#3A270D',
  },

  // Texto del estado de ánimo
  moodText: {
    color: '#DDD',
    fontSize: 11,
  },

  // Campo del título
  titleInput: {
    borderWidth: 1,
    borderColor: '#403B37',
    borderRadius: 14,
    color: '#FFF',
    padding: 15,
    fontSize: 17,
    marginTop: 10,
  },

  // Campo del contenido
  contentInput: {
    minHeight: 210,
    borderWidth: 1,
    borderColor: '#403B37',
    borderRadius: 14,
    color: '#FFF',
    padding: 15,
    fontSize: 15,
    marginTop: 10,
    textAlignVertical: 'top',
  },

  // Botón para agregar fotografía
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginVertical: 14,
  },

  // Texto del botón de fotografía
  photoText: {
    color: '#F59E0B',
    fontWeight: '700',
  },

  // Campo de etiquetas
  tagInput: {
    borderWidth: 1,
    borderColor: '#403B37',
    borderRadius: 12,
    color: '#FFF',
    padding: 13,
  },

  // Pie del modal
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#302C29',
    marginTop: 18,
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Botón cancelar
  cancel: {
    borderWidth: 1,
    borderColor: '#4A4541',
    padding: 13,
    borderRadius: 12,
  },

  // Texto del botón cancelar
  cancelText: {
    color: '#FFF',
  },

  // Botón guardar
  save: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#C95700',
    padding: 13,
    borderRadius: 12,
  },

  // Texto del botón guardar
  saveText: {
    color: '#FFF',
    fontWeight: '700',
  },

});