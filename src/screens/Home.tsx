import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";
import { CategoriaPopular } from '../resources/category';
import { getPopularCategories } from '../services/categoryService';
import { getServicesTopOfWeek, incrementServiceClick } from '../services/serviceService';
import { ServicioData } from '../resources/service';
import { UsuarioCasted } from '../resources/user';
import { getUserIdFromToken } from '../services/authService';
import { getUserById, obtenerDieneroGanadoUsuario } from '../services/userService';
import TarjetaSuperiorHome from '../components/TarjetaSuperiorHome';
import Buscador from '../components/Buscador';
import TarjetaUltimosTrabajos from '../components/TarjetaUltimosTrabajos';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  const defaultImage = require('../../assets/iconos/Default_imagen.jpg');
  const [categoriasPopulares, setCategoriasPopulares] = useState<CategoriaPopular[]>([]);
  const [serviciosDestacados, setServiciosDestacados] = useState<ServicioData[]>([]);
  const [usuario, setUsuario] = useState<UsuarioCasted>();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [gananciaDinero, setGananaciaDinero] = useState<number>(0); //Valor de ganancia de dinero
  const [initialLoading, setInitialLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (initialLoading) {
          // Si es la carga inicial, muestra el indicador de carga.
          await loadData();
          setInitialLoading(false); // Indica que la carga inicial se ha completado.
        } else {
          // Si no es la carga inicial, actualiza los datos en segundo plano.
          loadData();
        }
      };

      fetchData();

      return () => { }; // Retorna una función de limpieza vacía (no hay nada que limpiar en este caso).
    }, [initialLoading]) // Dependencia en initialLoading para saber si es la carga inicial o no.
  );

  const loadData = async () => {
    try {
      setIsRefreshing(true); // Solo se usa para el control de "pull-to-refresh".

      const [categorias, servicios] = await Promise.all([
        getPopularCategories(),
        getServicesTopOfWeek(),
      ]);

      const userId = await getUserIdFromToken();
      if (!userId) {
        throw new Error("No se pudo obtener el ID del usuario.");
      }

      setUsuario(await getUserById(userId));
      //Dinero ganado:
      const fetchedGanancia = await obtenerDieneroGanadoUsuario(userId);
      setGananaciaDinero(fetchedGanancia);
      //Ser categorias populares
      setCategoriasPopulares(categorias.map(cat => ({
        ...cat,
      })));

      setServiciosDestacados(servicios);

    } catch (error) {
      console.error("Error al cargar los datos:", error);
    } finally {
      setIsRefreshing(false); // Finaliza el "pull-to-refresh" si está activo.
    }
  };

  const handleServiceClick = async (service: any) => {
    console.log(`Servicio clickeado con ID: ${service.id}`);
    try {
      await incrementServiceClick(service.id);
    } catch (error) {
      console.error("Error al incrementar el contador de clics:", error);
    }

    navigation.navigate("Servicio", service);
  };

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={loadData}
        />
      }>

      <LinearGradient
        colors={['#0F4FC2', '#44B1EE', 'rgba(68, 177, 238, 0)']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={styles.contentContainer}>

        <TarjetaSuperiorHome usuario={usuario} ganancia={gananciaDinero} />

        <Buscador
          onSearch={(term) => {
            navigation.navigate('Buscador', { keyword: term });
          }}
          immediateSearch={false}
        />

        {/* Trabajos destacados */}
        <View style={styles.tarjeta}>
          <Text style={styles.tituloTrabajos}>Trabajos destacados ⭐️</Text>
          <FlatList
            data={serviciosDestacados}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.tarjetaTrabajo} onPress={() => {
                handleServiceClick(item)
              }}>
                <Image
                  source={item.imagen && item.imagen !== '' ? { uri: item.imagen } : defaultImage}
                  style={styles.imagenTrabajo}
                />
                <View style={{ maxWidth: "91%" }}><Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#50719D", fontWeight: '500', }}>{item.nombreServicio}</Text></View>

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
            data={categoriasPopulares}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tarjetaCategoria}
                onPress={() => {
                  navigation.navigate('ListaServicios', { categoria: item.nombre });
                }}
              >
                <Image
                  source={item.imagen && item.imagen !== "" ? { uri: item.imagen } : require('../../assets/iconos/ImageReferencia.png')}
                  style={styles.imagenCategoria}
                />

                <Text style={styles.tituloCategoria}>{item.nombre}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>


        {/* Ve los ultimos trabajos */}
        <TarjetaUltimosTrabajos onPress={() => {
          navigation.navigate('ListaServicios', { categoria: "" });
        }} />

      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({

  // ESTILOS GENERALES

  container: {
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

  // TRABAJOS DESTACADOS

  tituloTrabajos: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#415C80',
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
