import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Rating, Card } from "react-native-elements";
import { calcularPromedioCalificaciones, convertirFecha } from "../utils/randomService";
import { UsuarioCasted } from "../resources/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainTabParamList, RootStackParamList } from "../routes/NavigatorTypes";
import { ServicioData, ServicioDataNew } from "../resources/service";
import { getUserById, obtenerDieneroGanadoUsuario } from "../services/userService";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp, useRoute } from "@react-navigation/native";
import { getUserIdFromToken } from "../services/authService";
import SinSolicitudes from "../components/SinSolicitudes";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { getServicesAcceptedByUser, getServicesByUser } from "../services/serviceService";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};
type PerfilRouteProp = RouteProp<
  RootStackParamList & MainTabParamList,
  "Perfil" | "PerfilAjeno"
>;

const Profile: React.FC<Props> = ({ navigation }) => {
  //Variables independientes
  const route = useRoute<PerfilRouteProp>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //Variables de la vista
  const [usuarioData, setUsuarioData] = useState<UsuarioCasted | null>(null);
  const [serviciosPropios, setServiciosPropios] = useState<ServicioData[]>([]);
  const [solicitudesAceptadas, setSolicitudesAceptadas] = useState<ServicioData[]>([]);
  const [perfilPersonal, setPerfilPersonal] = useState<boolean>(false);
  const numeroSolicitudesCreadas = serviciosPropios.length; //Valor de solicitudes creadas
  const numeroSolicitudesAceptadas = solicitudesAceptadas.length; //Valor de solicitudes recibidas
  //Por ver
  const [gananciaDinero, setGananaciaDinero] = useState<number>(0); //Valor de ganancia de dinero

  //const solicitudesAceptadas: ServicioData[] = [];
  

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          let userId;

          if (route.params?.id) {
            userId = route.params.id;
          } else {
            userId = await getUserIdFromToken();
            if (!userId) {
              throw new Error("No se pudo obtener el ID del usuario.");
            }
            setPerfilPersonal(true);
          }

          const data = await getUserById(userId);
          setUsuarioData(data);
          //Servicios creados por este usuario
          const fetchedServices = await getServicesByUser(userId);
          setServiciosPropios(fetchedServices);
          //Servicios Aceptados para trabajar por este usuario
          const fetchedServicesAceptados = await getServicesAcceptedByUser(userId);
          setSolicitudesAceptadas(fetchedServicesAceptados);
          //Dinero ganado por el usuario
          const fetchedGanancia = await obtenerDieneroGanadoUsuario(userId);
          setGananaciaDinero(fetchedGanancia);
          setLoading(false);
        } catch (err) {
          console.log(err)
          const error = err as { message?: string };
          setError(error.message || "Ocurrió un error al cargar los datos.");
          setLoading(false);
          
        }
      };

      fetchData();

      return () => {
        // Aquí puedes añadir lógica de limpieza si es necesario.
      };
    }, [])
  );

  if (loading) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  
  
  return (
    <ScrollView style={styles.container}>
      {/* INFORMACION USUARIO */}
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#0F4FC2", "#44B1EE", "rgba(68, 177, 238, 0)"]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "20%",
            zIndex: 1,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={styles.profileCard}>
          <View style={styles.imageContainer}>
            {usuarioData?.imagenDePerfil ? (
              <Image
                source={{ uri: usuarioData?.imagenDePerfil }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require("../../assets/iconos/usericon.png")}
                style={styles.profileImage}
              />
            )}
            <Rating
              imageSize={20}
              readonly
              startingValue={calcularPromedioCalificaciones(usuarioData?.calificacion)}
              style={styles.rating}
            />
          </View>
          <Text style={styles.userName} numberOfLines={2} ellipsizeMode="tail">
            {usuarioData?.nombre} {usuarioData?.apellidoPaterno}{" "}
            {usuarioData?.apellidoMaterno}
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() =>
              Alert.alert(
                "Información de contacto",
                `ℹ️  ${usuarioData?.descripcion}\n\n📧  ${usuarioData?.email}\n\n📞  ${usuarioData?.telefono}`,
                [{ text: "OK" }]
              )
            }
          >
            <FontAwesome name="info-circle" size={15} color="white" />
            <Text style={styles.contactButtonText}>Informacion</Text>
          </TouchableOpacity>
        </View>

        {/* TARJETA RESUMEN  */}
        {perfilPersonal && (
          <View style={styles.tarjetaResumen}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#415C80",
                  paddingLeft: 15,
                }}
              >
                Resumen
              </Text>
            </View>
            <View style={styles.fila}>
              {/*Izquierda*/}
              <View style={styles.columnaIzquierda}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <View style={styles.numberContainer}>
                    <Text style={styles.numberText}>
                      {numeroSolicitudesCreadas > 99
                        ? "+99"
                        : numeroSolicitudesCreadas}
                    </Text>
                  </View>
                  <Text style={styles.textoSolicitudes}>
                    Solicitudes creadas
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.numberContainer}>
                    <Text style={styles.numberText}>
                      {numeroSolicitudesAceptadas > 99
                        ? "+99"
                        : numeroSolicitudesAceptadas}
                    </Text>
                  </View>
                  <Text style={styles.textoSolicitudes}>
                    Solicitudes aceptadas
                  </Text>
                </View>
              </View>
              {/*Derecha*/}
              <View style={styles.columnaDerecha}>
                <Text style={styles.gananciaDineroTexto}>
                  Ganancias de dinero 💰
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.gananciaNumero}
                >
                  {gananciaDinero} CLP
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* LISTADO DE SOLICITUDES CREADAS */}
        <View
          style={{
            height: 2,
            backgroundColor: "#EEF2FF", // Color gris claro
            marginVertical: 8, // Margen vertical para espacio arriba y abajo
            marginHorizontal: 30,
          }}
        ></View>
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 8,
              paddingLeft: 15,
              color: "#415C80",
            }}
          >
            Solicitudes creadas
          </Text>
          {serviciosPropios.length === 0 ? (
            <SinSolicitudes />
          ) : (
            <FlatList
              data={serviciosPropios}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tarjetaTrabajo}
                  onPress={() => {
                    
                    navigation.navigate("Servicio", item);
                  }}
                >
                  <Image
                    source={require("../../assets/iconos/ImageReferencia.png")}
                    style={styles.imagenTrabajo}
                  />
                  <View style={{ marginEnd: 90 }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ color: "#50719D", fontWeight: "bold" }}
                    >
                      {item.nombreServicio}
                    </Text>
                    <Text style={{ color: "#50719D" }}>
                      <FontAwesome name="calendar" size={15} color="#50719D" /> {" "} {convertirFecha(item.fechaSolicitud)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => String(item.id)}
              scrollEnabled={false}
            />
          )}
        </View>
        {/* LISTADO DE SOLICITUDES Aceptadas */}
        <View
          style={{
            height: 2,
            backgroundColor: "#EEF2FF", // Color gris claro
            marginVertical: 8, // Margen vertical para espacio arriba y abajo
            //width: "100%",
            marginHorizontal: 30,
          }}
        ></View>
        <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              paddingLeft: 15,
              color: "#3B5373",
            }}
          >
            Solicitudes Aceptadas
          </Text>
          {solicitudesAceptadas.length === 0 ? (
            <SinSolicitudes />
          ) : (
            <FlatList
              data={solicitudesAceptadas}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tarjetaTrabajo}
                  onPress={() => {
                    
                    navigation.navigate("Servicio", item);
                  }}
                >
                  <Image
                    source={require("../../assets/iconos/ImageReferencia.png")}
                    style={styles.imagenTrabajo}
                  />
                  <View style={{ marginEnd: 90 }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ color: "#50719D", fontWeight: "bold" }}
                    >
                      {item.nombreServicio}
                    </Text>
                    <Text style={{ color: "#50719D" }}>
                    <FontAwesome name="calendar" size={15} color="#50719D" /> {" "}{convertirFecha(item.fechaSolicitud)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => String(item.id)}
              scrollEnabled={false}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    backgroundColor: "#FFFFFF",
  },
  // Informacion de usuario
  profileCard: {
    margin: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: "white",
    padding: 20,
    zIndex: 2,
  },
  profileHeader: {
    flexDirection: "row",
    marginBottom: 20,
  },
  imageContainer: {
    marginRight: 15,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    color: "#415C80",
    fontWeight: "bold",
    textAlign: "center",
  },
  contactButton: {
    marginTop: 10,
    backgroundColor: "#0787E2",
    padding: 5,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 10,
  },
  contactButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  rating: {
    marginTop: 0,
  },
  textoPerfil: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 30,
    color: "#435A9B",
  },
  infoLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingRight: 110,
  },
  icon: {
    marginRight: 8, // Espacio entre el ícono y el texto
  },
  userInfo: {
    marginLeft: 20,
    paddingEnd: 30,
    paddingTop: 30,
  },
  datosUser: {
    fontSize: 16,
    color: "#546E7A",
  },
  textoDatosUser: {
    fontSize: 16,
    color: "#546E7A",
    fontWeight: "bold",
  },
  summaryCard: {
    marginTop: 20,
  },
  summaryValue: {
    fontWeight: "bold",
  },
  // Tarjeta Resunen
  tarjetaResumen: {
    paddingRight: 16,
    paddingTop: 5,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#F3F6FF",
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  resumenTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  columnaIzquierda: {
    flex: 0.3,
    paddingRight: 8, // Espacio entre las dos columnas
  },
  columnaDerecha: {
    flex: 0.5,
    paddingLeft: 8, // Espacio entre las dos columnas
  },
  textoSolicitudes: {
    color: "#0676C6",
    fontSize: 17,
  },
  numberText: {
    color: "#0676C6",
    fontWeight: "400",
    fontSize: 27,
    paddingHorizontal: 10,
  },
  gananciaDineroTexto: {
    color: "#0676C6",
    fontWeight: "500",
    fontSize: 15,
  },
  gananciaNumero: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "green", // Puedes ajustar el tono de verde según prefieras
  },
  numberContainer: {
    width: 75, // Puedes ajustar este valor según la cantidad máxima de dígitos que esperas
    alignItems: "flex-end", // Alinea el texto a la derecha
  },
  // Tarjeta de solicitudes

  tarjetaTrabajo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCFCFC",
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
});
export default Profile;
