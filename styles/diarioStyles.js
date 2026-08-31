import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Contenedor principal de la pantalla
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C',
  },

  // Contenido del ScrollView
  scroll: {
    paddingBottom: 30,
  },

  // Encabezado superior adaptativo
  header: {
    minHeight: 70,
    backgroundColor: '#171515',
    borderBottomWidth: 1,
    borderBottomColor: '#292525',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Contenedor de la marca y menú
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Ocupa el espacio disponible a la izquierda
    marginRight: 8,
  },

  // Botón del menú lateral
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#45403C',
    backgroundColor: '#262422',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  // Título de la aplicación
  appTitle: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: '800',
  },

  // Nombre del usuario en el encabezado
  headerUser: {
    color: '#AAA',
    fontSize: 12,
    marginTop: 1,
  },

  // Contenedor de los botones de la derecha (Calendario + Nueva Entrada)
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  // Botón para crear una nueva entrada
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#C95700',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    height: 44,
  },

  // Texto del botón nueva entrada
  newButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // Contenedor del buscador
  search: {
    margin: 16,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#35312F',
    backgroundColor: '#1C1A19',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  // Campo de texto del buscador
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#FFF',
    outlineStyle: 'none',
  },

  // Encabezado de la sección
  sectionHeader: {
    paddingHorizontal: 18,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  // Título de la sección
  sectionTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '800',
  },

  // Contador de entradas
  counter: {
    color: '#AAA',
    marginTop: 4,
    fontSize: 13,
  },

  // Contenedor de las tarjetas
  cards: {
    paddingHorizontal: 14,
  },

  // Tarjeta de cada entrada del diario
  card: {
    backgroundColor: '#191817',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#302C29',
    padding: 18,
    marginBottom: 16,
  },

  // Fecha de la entrada
  date: {
    color: '#AAA',
    marginBottom: 12,
  },

  // Título de la entrada
  cardTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },

  // Imagen de la entrada
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 17,
    marginBottom: 12,
  },

  // Texto o resumen de la entrada
  snippet: {
    color: '#E8E2DF',
    fontSize: 15,
    lineHeight: 22,
  },

  // Parte inferior de la tarjeta
  cardBottom: {
    marginTop: 18,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#302C29',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Contenedor de las etiquetas
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    flex: 1,
  },

  // Etiqueta individual
  tag: {
    color: '#DDD',
    borderWidth: 1,
    borderColor: '#4A4541',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 4,
    fontSize: 12,
  },

  // Contenedor de botones de acción de tarjeta
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginLeft: 10,
  },

  // Estado de ánimo de la entrada
  moodBadge: {
    color: '#F59E0B',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
});