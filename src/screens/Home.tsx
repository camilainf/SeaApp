import React, { useState } from 'react';
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
import { ActivityIndicator } from 'react-native-paper';
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
  const [gananciaDinero, setGananaciaDinero] = useState<number>(0);
  const [isProfileImageLoaded, setIsProfileImageLoaded] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
      return () => { };
    }, [])
  );

  const loadData = async () => {
    try {
      setIsRefreshing(true);

      const [categorias, servicios] = await Promise.all([
        getPopularCategories(),
        getServicesTopOfWeek(),
      ]);

      const userId = await getUserIdFromToken();
      if (!userId) {
        throw new Error("No se pudo obtener el ID del usuario.");
      }

      const user = await getUserById(userId);
      setUsuario(user);

      if (user.imagenDePerfil) {
        // Pre-cargar la imagen de perfil
        Image.prefetch(user.imagenDePerfil).then(() => {
          setIsProfileImageLoaded(true);
        }, error => {
          console.error("Error al cargar la imagen de perfil:", error);
          setIsProfileImageLoaded(true);
        });
      } else {
        setIsProfileImageLoaded(true);
      }

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
      setIsRefreshing(false);
    }
  };

  const handleServiceClick = async (service: any) => {
    try {
      await incrementServiceClick(service.id);
    } catch (error) { console.error("Error al incrementar el contador de clics:", error); }
    navigation.navigate("Servicio", service);
  };

  const handleVerMasCategorias = async () => {
    navigation.navigate("Categorias");
  };

  return !isProfileImageLoaded ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={loadData} />}>
      <LinearGradient colors={usuario?.isAdmin ? ["#FFA500", "#FFA500", "rgba(68, 177, 238, 0)"] : ["#0F4FC2", "#44B1EE", "rgba(68, 177, 238, 0)"]} style={styles.gradientBackground} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} />
      <View style={styles.contentContainer}>
        <TarjetaSuperiorHome usuario={usuario} ganancia={gananciaDinero} />

        <Buscador
          onSearch={(term) => {
            navigation.navigate("Buscador", { keyword: term });
          }}
          immediateSearch={false} // No realizar búsqueda inmediata desde Home
        />

        {/* Trabajos destacados */}
        {!usuario?.isAdmin ? (
          <>
            <View style={styles.tarjeta}>
              <Text style={styles.tituloTrabajos}>Trabajos destacados ⭐️</Text>
              {serviciosDestacados.length === 0 ? (
                <Text style={{ textAlign: 'center', margin: 10, color: '#50719D' }}>
                  Aún no hay servicios publicados, ¡Comienza publicando el tuyo! :)
                </Text>
              ) : (
                <FlatList
                  data={serviciosDestacados}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.tarjetaTrabajo}
                      onPress={() => {
                        handleServiceClick(item);
                      }}>
                      <Image source={item.imagen && item.imagen !== "" ? { uri: item.imagen } : defaultImage} style={styles.imagenTrabajo} />
                      <View style={{ maxWidth: "91%" }}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#50719D", fontWeight: "500" }}>
                          {item.nombreServicio}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              )}
            </View>

            {/* Categorias destacadas*/}
            <View style={styles.tarjeta}>
              <Text style={styles.tituloTrabajos}>Categorías destacadas 🤔</Text>
              <FlatList
                data={categoriasPopulares}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.tarjetaCategoria}
                    onPress={() => {
                      navigation.navigate("ListaServicios", { categoria: item.nombre });
                    }}>
                    <Image source={item.imagen && item.imagen !== "" ? { uri: item.imagen } : require("../../assets/iconos/ImageReferencia.png")} style={styles.imagenCategoria} />

                    <Text style={styles.tituloCategoria}>{item.nombre}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                scrollEnabled={false}
              />

              {/* VER MÁS */}
              <TouchableOpacity onPress={() => handleVerMasCategorias()}>
                <Text style={styles.categoriaText}>Ver más...</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (

          <View >

            <Text style={{ color: "#415C80", fontSize: 20, marginVertical: 25, marginHorizontal: 10 }}>Estas en la vista de <Text style={{ fontWeight: "bold" }}>admin</Text> . Aca podras <Text style={{ fontWeight: "bold" }}>eliminar y editar </Text> servicios y usuarios si es necesario 🙌.</Text>
          </View>

        )}

        {/* Ve los ultimos trabajos */}
        <TarjetaUltimosTrabajos
          onPress={() => {
            navigation.navigate("ListaServicios", { categoria: "" });
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  categoriaText: {
    alignContent: "center",
    color: "white",
    backgroundColor: "#0787E2",
    marginVertical: 20,
    paddingVertical: 10,
    marginHorizontal: "25%",

    borderRadius: 8,
    fontSize: 15,
    fontWeight: "600",
    textAlign: 'center',
  },

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
    height: '18%',
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default HomeScreen;