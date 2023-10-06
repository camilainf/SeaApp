import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";
import { CategoriaPopular } from '../resources/category';
import { getPopularCategories } from '../services/categoryService';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  const [categoriasPopulares, setCategoriasPopulares] = useState<CategoriaPopular[]>([]);

  // Al cargar el componente, obtener las categorías populares
  useEffect(() => {
    const fetchCategoriasPopulares = async () => {
      try {
        const categorias = await getPopularCategories();
        setCategoriasPopulares(categorias.map(cat => ({
          ...cat,
          imagen: require('../../assets/iconos/ImageReferencia.png') // Establecer imagen por defecto, esto es temporal.
        })));
      } catch (error) {
        console.error("Error al obtener las categorías populares:", error);
      }
    };

    fetchCategoriasPopulares();
  }, []);

  const usuario = {
    nombre: 'Case',
    foto: ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_i2_vJN5rUWFIs3kXNqiy2EyzgYXwKUFvJg&usqp=CAU'),
  };

  const trabajosDestacados = [
    { id: '1', titulo: 'Trabajo 1', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '2', titulo: 'Trabajo 2', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '3', titulo: 'Trabajo 3', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '4', titulo: 'Trabajo 4', imagen: require('../../assets/iconos/ImageReferencia.png') },
    { id: '5', titulo: 'Trabajo 5', imagen: require('../../assets/iconos/ImageReferencia.png') },
  ];

  const serviceIcon = require('../../assets/iconos/Work.png');
  const searchIcon = require('../../assets/iconos/Search.png');

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <ScrollView style={styles.container}>

      <LinearGradient
        colors={['#0F4FC2', '#44B1EE', 'rgba(68, 177, 238, 0)']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={styles.contentContainer}>
        {/* Tarjeta superior */}
        <View style={styles.tarjetaSuperior}>
          <View style={styles.fila}>
            <Image source={require('../../assets/seaJoblogo.png')} style={styles.logo} />
            <Text style={styles.saludo}>Hola {usuario.nombre}!</Text>
          </View>
          <View style={styles.fila}>
            <Image source={{ uri: usuario.foto }} style={styles.fotoPerfil} />
            <View style={styles.gananciasContainer}>
              <Text style={styles.gananciaTexto}>Ganancias de dinero</Text>
              <Text style={styles.gananciaNumero}>39.000 CLP</Text>
            </View>
          </View>
        </View>

        {/* Buscador */}
        <View style={styles.buscadorContainer}>
          <TextInput
            placeholder="¿Qué buscas?"
            style={styles.buscadorTexto}
            placeholderTextColor="#AEBFFB"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity onPress={() => {
            console.log('Ícono de búsqueda clickeado');
            if (searchTerm.trim() !== '') {  // Verifica que searchTerm no esté vacío o solo contenga espacios en blanco
              navigation.navigate('Buscador', { keyword: searchTerm });  // Navega a BuscadorScreen con searchTerm como parámetro
            } else {
              console.log('Por favor, ingresa una palabra en el buscador.');
              // Puedes mostrar un mensaje al usuario indicando que debe ingresar una palabra en el buscador
            }
          }}>
            <Image source={searchIcon} style={styles.iconoLupa} />
          </TouchableOpacity>
        </View>

        {/* Trabajos destacados */}
        <View style={styles.tarjeta}>
          <Text style={styles.tituloTrabajos}>Trabajos destacados ⭐️</Text>
          <FlatList
            data={trabajosDestacados}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.tarjetaTrabajo} onPress={() => {
                console.log('Tarjeta Trabajo clickeada:', item.titulo);
              }}>
                <Image source={item.imagen} style={styles.imagenTrabajo} />
                <Text>{item.titulo}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />

        </View>

        {/* Categorias destacadas */}
        <View style={styles.tarjeta}>
          <Text style={styles.tituloTrabajos}>Categorías destacadas 🤔</Text>
          <FlatList
            data={categoriasPopulares} // Utilizar el estado de categorías populares
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tarjetaCategoria}
                onPress={() => {
                  navigation.navigate('ServiciosPorCategoria', { categoria: item.nombre });
                }}
              >
                <Image source={require('../../assets/iconos/ImageReferencia.png')} style={styles.imagenCategoria} />
                <Text style={styles.tituloCategoria}>{item.nombre}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>

        {/* Ve los ultimos trabajos */}
        <TouchableNativeFeedback onPress={() => {
          navigation.navigate('UltimosServicios'); // Asume que 'LastServices' es el nombre de la ruta para LastServicesScreen en tu Navigator
        }}>
          <View style={styles.tarjetaUltimosTrabajos}>
            <Text style={styles.saludoUltimosTrabajos}>
              ¡Ve los últimos {"\n"}
              servicios {"\n"}
              publicados!
            </Text>
            <Image source={serviceIcon} style={{ ...styles.iconoUltimosTrabajos, tintColor: 'white' }} />
          </View>
        </TouchableNativeFeedback>

      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({

  // ESTILOS GENERALES

  container: {
    paddingVertical: 0,
    backgroundColor: '#FFFFFF',
  },

  tarjeta: {
    padding: 16,
    backgroundColor: '#F3F6FF',
    borderRadius: 8,
    marginBottom: 16,
  },

  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '15%',
    zIndex: 1,
  },

  contentContainer: {
    zIndex: 2,
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  // TARJETA SUPERIOR

  tarjetaSuperior: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
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
    color: '#66638C',
  },

  fotoPerfil: {
    width: 110,
    height: 110,
    borderRadius: 60,
    resizeMode: 'cover',
  },

  gananciasContainer: {
    marginRight: 16,
  },

  gananciaTexto: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#0182AB',
    marginBottom: 8,
  },

  gananciaNumero: {
    fontSize: 30,
    fontWeight: '400',
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#47AE64', // Puedes ajustar el tono de verde según prefieras
  },

  // BUSCADOR

  buscadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F6FF',
    borderRadius: 50,
    marginBottom: 16, // Agregamos un margen inferior para separarlo de los siguientes elementos
    paddingHorizontal: 30,
    paddingVertical: 10
  },

  iconoLupa: {
    width: 28,
    height: 28,
  },

  buscadorTexto: {
    fontSize: 16,
    flex: 1,
  },

  // TRABAJOS DESTACADOS

  tituloTrabajos: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#66638C',
  },

  tarjetaTrabajo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },

  imagenTrabajo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },

  // CATEGORIAS DESTACADAS

  tarjetaCategoria: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    margin: 8,
    elevation: 4,
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
    color: '#66638C',
  },

  // VER ULTIMOS TRABAJOS

  tarjetaUltimosTrabajos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#66AFFF', // Color de fondo de la tarjeta
    borderRadius: 8,
    marginBottom: 20,
    elevation: 6,
  },

  saludoUltimosTrabajos: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white', // Color de la letra
    flex: 1, // Asegura que el texto ocupe todo el espacio disponible
    flexWrap: 'wrap', // Permite que el texto se envuelva
  },

  iconoUltimosTrabajos: {
    width: 82,
    height: 82,
    marginRight: 16,
    tintColor: 'white', // Color del icono
  },

});

export default HomeScreen;
