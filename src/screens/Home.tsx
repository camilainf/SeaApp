import React from 'react';
import { View, Text, Image, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen: React.FC = () => {
  const usuario = {
    nombre: 'User',
    foto: require('../../assets/iconos/usericon.png'),
  };

  const trabajosDestacados = [
    { id: '1', titulo: 'Trabajo 1', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '2', titulo: 'Trabajo 2', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '3', titulo: 'Trabajo 3', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '4', titulo: 'Trabajo 4', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '5', titulo: 'Trabajo 5', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '6', titulo: 'Trabajo 6', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '7', titulo: 'Trabajo 7', imagen: require('../../assets/iconos/ImageReferencia.png') },
  ];

  const categoriasDestacadas = [
    { id: '1', titulo: 'Categoría 1', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '2', titulo: 'Categoría 2', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '3', titulo: 'Categoría 3', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '4', titulo: 'Categoría 4', imagen: require('../../assets/iconos/ImageReferencia.png') },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>

        {/* Tarjeta superior */}
        <View style={styles.tarjeta}>
          <View style={styles.fila}>
            <Image source={require('../../assets/seaJoblogo.png')} style={styles.logo} />
            <Text style={styles.saludo}>Hola {usuario.nombre}!</Text>
          </View>
          <View style={styles.fila}>
          <Image source={usuario.foto} style={styles.fotoPerfil} />
            <View>
              <Text>Ganancias de dinero</Text>
              <Text>39.000 CLP</Text>
            </View>
          </View>
        </View>

        {/* Buscador */}
        <View style={styles.tarjeta}>
          <View style={styles.buscadorContainer}>
            <Image source={{ uri: 'URL_ICONO_LUPA' }} style={styles.iconoLupa} />
            <TextInput placeholder="¿Qué buscas?" style={styles.buscador} />
          </View>
        </View>

        {/* Trabajos destacados */}
        <View style={styles.tarjeta}>
          <Text style={styles.tituloTrabajos}>Trabajos destacados</Text>
          <FlatList
            data={trabajosDestacados}
            renderItem={({ item }) => (
              <View style={styles.tarjetaTrabajo}>
                <Image source={item.imagen} style={styles.imagenTrabajo} />
                <Text>{item.titulo}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Categorias destacadas */}
        <View style={styles.tarjeta}>
          <Text style={styles.tituloTrabajos}>Categorías destacadas</Text>
          <FlatList
            data={categoriasDestacadas}
            renderItem={({ item }) => (
              <View style={styles.tarjetaCategoria}>
                <Image source={item.imagen} style={styles.imagenCategoria} />
                <Text style={styles.tituloCategoria}>{item.titulo}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2} // Mostrar en 2 columnas
          />
        </View>

        {/* Ve los ultimos trabajos */}
        <TouchableOpacity style={styles.tarjetaUltimosTrabajos} onPress={() => {
          // Aquí agregar la lógica para manejar el clic
          console.log('Tarjeta clickeada');
        }}>
          <Text style={styles.saludoUltimosTrabajos}>¡Ve los últimos servicios publicados!</Text>
          <Image source={{ uri: 'URL_ICONO_LUPA' }} style={styles.iconoUltimosTrabajos} />
        </TouchableOpacity>

      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingVertical: 40
  },
  tarjeta: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  logo: {
    width: 150,
    height: 30,
    resizeMode: 'contain',
  },
  saludo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 25,
    resizeMode: 'contain',
  },
  buscadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 8,
  },
  iconoLupa: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buscador: {
    flex: 1,
  },
  tituloTrabajos: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tarjetaTrabajo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  imagenTrabajo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  tarjetaCategoria: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    margin: 8,
  },
  imagenCategoria: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  tituloCategoria: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tarjetaUltimosTrabajos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
  },
  saludoUltimosTrabajos: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconoUltimosTrabajos: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;
