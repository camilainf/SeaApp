import React, { useState, useRef } from "react";
import { ToastAndroid, View, Text, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Modal, TouchableWithoutFeedback } from "react-native";
import { Rating } from "react-native-elements";
import { calcularPromedioCalificaciones, convertirFecha } from "../utils/randomService";
import { UsuarioCasted } from "../resources/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainTabParamList, RootStackParamList } from "../routes/NavigatorTypes";
import { ServicioData } from "../resources/service";
import { getUserById, obtenerDieneroGanadoUsuario } from "../services/userService";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp, useRoute } from "@react-navigation/native";
import { getUserIdFromToken, getUserIsAdminFromToken } from "../services/authService";
import SinSolicitudes from "../components/SinSolicitudes";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { getCompletedServicesCountByUser, getServicesAcceptedByUser, getServicesByUser, getServicesOfferedByUser } from "../services/serviceService";
import { useAlert } from "../context/AlertContext";
import * as Clipboard from 'expo-clipboard';
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};
type PerfilRouteProp = RouteProp<RootStackParamList & MainTabParamList, "Perfil" | "PerfilAjeno">;

const Profile: React.FC<Props> = ({ navigation }) => {
  //Variables independientes
  const route = useRoute<PerfilRouteProp>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const modalRef = useRef(null); // Referencia para manejar el cierre del menú al tocar fuera
  //Variables de la vista
  const [usuarioData, setUsuarioData] = useState<UsuarioCasted | null>(null);
  const [serviciosPropios, setServiciosPropios] = useState<ServicioData[]>([]);
  const [solicitudesAceptadas, setSolicitudesAceptadas] = useState<ServicioData[]>([]);
  const [solicitudesPendientes, setSolicitudesPendientes] = useState<ServicioData[]>([]);
  const [perfilPersonal, setPerfilPersonal] = useState<boolean>(false);
  const numeroSolicitudesCreadas = serviciosPropios.length; //Valor de solicitudes creadas
  const numeroSolicitudesAceptadas = solicitudesAceptadas.length; //Valor de solicitudes recibidas
  const numeroSolicitudesPendientes = solicitudesPendientes.length;
  const [numeroSolicitudesCompletadas, setNumeroSolicitudesCompletadas] = useState<number>(0);
  //Por ver
  const [gananciaDinero, setGananaciaDinero] = useState<number>(0); //Valor de ganancia de dinero
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ServicioData[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [iconTime, setIconTime] = useState(false);
  // const [iconConstruction, setIconConstruction] = useState(false);

  // Alerta Customizada
  const { showAlert } = useAlert();

  // Modal información de usuario
  const [modalVisible, setModalVisible] = useState(false);


  const copyToClipboard = async (info: string, text: string) => {
    await Clipboard.setStringAsync(text);

    let message = info === "email" ? 'Email copiado al portapapeles' : 'Número copiado al portapapeles';
    ToastAndroid.show(message, ToastAndroid.SHORT);

  };

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
          //Es admin?
          const dataAdmin = await getUserIsAdminFromToken();
          if (dataAdmin) { setIsAdmin(true); setPerfilPersonal(true) }
          //Carga informacion user
          const data = await getUserById(userId);
          setUsuarioData(data);
          //Servicios creados por este usuario
          const fetchedServices = await getServicesByUser(userId);
          setServiciosPropios(fetchedServices);
          //Servicios Aceptados para trabajar por este usuario
          const fetchedServicesAceptados = await getServicesAcceptedByUser(userId);
          setSolicitudesAceptadas(fetchedServicesAceptados);

          //Servicios a los que este usuario ha ofertado y aún no es aceptado para trabajar
          const fetchedServicesPendientes = await getServicesOfferedByUser(userId);
          setSolicitudesPendientes(fetchedServicesPendientes);

          const fetchCompletedServicesCount = async () => {
            console.log("count", usuarioData)
            if (usuarioData) {
              console.log("count2", usuarioData)
              const count = await getCompletedServicesCountByUser(usuarioData._id);
              setNumeroSolicitudesCompletadas(count);
              console.log("count", count)
            }
          };

          fetchCompletedServicesCount();
          //Dinero ganado por el usuario
          const fetchedGanancia = await obtenerDieneroGanadoUsuario(userId);
          setGananaciaDinero(fetchedGanancia);
          setLoading(false);
        } catch (err) {
          console.log(err);
          const error = err as { message?: string };
          setError(error.message || "Ocurrió un error al cargar los datos.");
          setLoading(false);
        }
      };

      fetchData();

      return () => {
      };

    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const handleVerMas = (list: ServicioData[], title: string) => {
    setModalContent(list);
    setIsModalVisible(true);
  };
  const handleCloseMenu = () => {
    setMenuVisible(false);
  };


  const handleEdit = (userId: string | undefined) => {
    if (userId) {
      navigation.navigate('EditarPerfil', { userId: userId });
    } else {
      showAlert('No se puede editar este perfil ⛔', '');
    }

  };
  const handleDelete = (userId: string | undefined) => {
    showAlert('Eliminacion', '');
  };
  return (
    <ScrollView style={styles.container}>
      {/* INFORMACION USUARIO */}
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={isAdmin
            ? ["#FFA500", "#FFA500", "rgba(68, 177, 238, 0)"] // Cambio de azul a verde
            : ["#0F4FC2", "#44B1EE", "rgba(68, 177, 238, 0)"]}
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
          {/* 3 puntitos */}
          {isAdmin ? <View style={{ alignItems: "flex-end", padding: 10 }}>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <FontAwesome name="ellipsis-h" size={20} />
            </TouchableOpacity>

          </View> : <></>}

          <View style={styles.imageContainer}>
            {usuarioData?.imagenDePerfil ? <Image source={{ uri: usuarioData?.imagenDePerfil }} style={styles.profileImage} /> : <Image source={require("../../assets/iconos/usericon.png")} style={styles.profileImage} />}
            <Rating imageSize={20} readonly startingValue={calcularPromedioCalificaciones(usuarioData?.calificacion)} style={styles.rating} />
          </View>
          <Text style={styles.userName} numberOfLines={2} ellipsizeMode="tail">
            {usuarioData?.nombre} {usuarioData?.apellidoPaterno} {usuarioData?.apellidoMaterno}
          </Text>
          <TouchableOpacity style={isAdmin ? styles.contactButtonAdmin : styles.contactButton} onPress={() => setModalVisible(true)}>
            <FontAwesome name="info-circle" size={15} color="white" />
            <Text style={styles.contactButtonText}>Informacion</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Información de contacto</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactText}> {usuarioData?.descripcion}</Text>
              </View>
              <View style={styles.contactInfo}>
                <MaterialIcons name="email" size={24} color="#003366" />
                <Text style={styles.contactText}> {usuarioData?.email}</Text>
                <TouchableOpacity onPress={() => usuarioData?.email && copyToClipboard("email", usuarioData.email)}>
                  <MaterialIcons name="content-copy" size={24} color="#003366" />
                </TouchableOpacity>
              </View>
              <View style={styles.contactInfo}>
                <MaterialIcons name="phone" size={24} color="#003366" />
                <Text style={styles.contactText}> {usuarioData?.telefono}</Text>
                <TouchableOpacity onPress={() => usuarioData?.telefono && copyToClipboard("telefono", usuarioData.telefono)}>
                  <MaterialIcons name="content-copy" size={24} color="#003366" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
                }}>
                Resumen
              </Text>
            </View>
            <View style={styles.fila}>
              {/*Izquierda*/}
              <View style={styles.columnaIzquierda}>
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8, }}>
                  <View style={styles.numberContainer}>
                    <Text style={styles.numberText}>{numeroSolicitudesCreadas > 99 ? "+99" : numeroSolicitudesCreadas}</Text>
                  </View>
                  <Text style={styles.textoSolicitudes}>{numeroSolicitudesCreadas > 1 ? "Solicitudes creadas" : "Solicitud creada"}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8, }}>
                  <View style={styles.numberContainer}>
                    <Text style={styles.numberText}>{numeroSolicitudesAceptadas > 99 ? "+99" : numeroSolicitudesAceptadas}</Text>
                  </View>
                  <Text style={styles.textoSolicitudes}>{numeroSolicitudesAceptadas > 1 ? "Solicitudes aceptadas" : "Solicitud aceptada"}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.numberContainer}>
                    <Text style={styles.numberText}>{numeroSolicitudesPendientes > 99 ? "+99" : numeroSolicitudesPendientes}</Text>
                  </View>
                  <Text style={styles.textoSolicitudes}>{numeroSolicitudesPendientes > 1 ? "Solicitudes pendientes" : "Solicitud pendiente"}</Text>
                </View>
              </View>
              {/*Derecha*/}
              <View style={styles.columnaDerecha}>
                {numeroSolicitudesCompletadas > 0 && (
                  <>
                    <Text style={styles.textoSolicitudes}>
                      {numeroSolicitudesCompletadas > 1 ? "Solicitudes completadas" : "Solicitud completada"}
                    </Text>
                    <View style={styles.numberContainerCompleted}>
                      <Text style={styles.numberText}>
                        {numeroSolicitudesCompletadas > 99 ? "+99" : numeroSolicitudesCompletadas}
                      </Text>
                    </View>
                  </>
                )}
                <Text style={styles.gananciaDineroTexto}>Ganancias de dinero 💰</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.gananciaNumero}>
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
            backgroundColor: "#EEF2FF",
            marginVertical: 8,
            marginHorizontal: 30,
          }}></View>
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 8,
              paddingLeft: 15,
              color: "#415C80",
            }}>
            Solicitudes creadas
          </Text>
          {serviciosPropios.length === 0 ? (
            <SinSolicitudes />
          ) : (
            <View>
              {/* Arreglo solicitudes Creadas */}
              <FlatList
                data={serviciosPropios.slice(0, 5)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.tarjetaTrabajo}
                    onPress={() => {
                      navigation.navigate("Servicio", item);
                    }}>
                    <Image
                      source={
                        item.imagen && item.imagen !== ''
                          ? { uri: item.imagen }
                          : require("../../assets/iconos/ImageReferencia.png")
                      }
                      style={styles.imagenTrabajo}
                    />
                    <View style={{ marginEnd: 50 }}>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#50719D", fontWeight: "bold" }}>
                        {item.nombreServicio}
                      </Text>
                      <Text style={{ color: "#50719D" }}>
                        <FontAwesome name="calendar" size={15} color="#50719D" /> {convertirFecha(item.fechaSolicitud)}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {item.estado === 5 || item.estado === 6 ? (
                        <MaterialIcons name="done-all" size={20} color="green" />
                      ) : item.estado === 4 ? (
                        <FontAwesome name="star" size={20} color="orange" />
                      ) : item.estado === 1 ? (
                        <MaterialIcons name="gavel" size={20} color="#50719D" />
                      ) : item.estado === 2 ? (
                        <MaterialIcons name="play-circle-outline" size={20} color="#E3CF1B" />
                      ) : item.estado === 3 ? (
                        <MaterialIcons name="construction" size={20} color="#E3CF1B" />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => String(item.id)}
                scrollEnabled={false}
              />
              <TouchableOpacity onPress={() => handleVerMas(serviciosPropios, "Solicitudes Creadas")}>
                <Text style={{ color: "#50719D", textAlign: "center" }}>Ver más</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* LISTADO DE SOLICITUDES ACEPTADAS */}
        <View
          style={{
            height: 2,
            backgroundColor: "#EEF2FF",
            marginVertical: 8,
            marginHorizontal: 30,
          }}></View>
        <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              paddingLeft: 15,
              color: "#3B5373",
            }}>
            Solicitudes Aceptadas
          </Text>
          {solicitudesAceptadas.length === 0 ? (
            <SinSolicitudes />
          ) : (
            <View>
              {/* Arreglo solicitudes Aceptadas */}
              <FlatList
                data={solicitudesAceptadas.slice(0, 5)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.tarjetaTrabajo}
                    onPress={() => {
                      navigation.navigate("Servicio", item);
                    }}>
                    <Image
                      source={
                        item.imagen && item.imagen !== ''
                          ? { uri: item.imagen }
                          : require("../../assets/iconos/ImageReferencia.png")
                      }
                      style={styles.imagenTrabajo}
                    />
                    <View style={{ marginEnd: 50 }}>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#50719D", fontWeight: "bold" }}>
                        {item.nombreServicio}
                      </Text>
                      <Text style={{ color: "#50719D" }}>
                        <FontAwesome name="calendar" size={15} color="#50719D" /> {convertirFecha(item.fechaSolicitud)}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {item.estado === 5 || item.estado === 6 ? (
                        <MaterialIcons name="done-all" size={20} color="green" />
                      ) : item.estado === 4 ? (
                        <FontAwesome name="star" size={20} color="orange" />
                      ) : item.estado === 2 ? (
                        <MaterialIcons name="play-circle-outline" size={20} color="#E3CF1B" />
                      ) : item.estado === 3 ? (
                        <MaterialIcons name="construction" size={20} color="#E3CF1B" />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => String(item.id)}
                scrollEnabled={false}
              />
              <TouchableOpacity onPress={() => { handleVerMas(solicitudesAceptadas, "Solicitudes Aceptadas") }}>
                <Text style={{ color: "#50719D", textAlign: "center" }}>Ver más</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* LISTADO DE SOLICITUDES EN LAS QUE EL USUARIO OFERTÓ */}

        <View
          style={{
            height: 2,
            backgroundColor: "#EEF2FF",
            marginVertical: 8,
            marginHorizontal: 30,
          }}></View>
        <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              paddingLeft: 15,
              color: "#3B5373",
            }}>
            Solicitudes Pendientes
          </Text>
          {solicitudesPendientes.length === 0 ? (
            <SinSolicitudes />
          ) : (
            <View>
              {/* Arreglo solicitudes Aceptadas */}
              <FlatList
                data={solicitudesPendientes.slice(0, 5)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.tarjetaTrabajo}
                    onPress={() => {
                      navigation.navigate("Servicio", item);
                    }}>
                    <Image
                      source={
                        item.imagen && item.imagen !== ''
                          ? { uri: item.imagen }
                          : require("../../assets/iconos/ImageReferencia.png")
                      }
                      style={styles.imagenTrabajo}
                    />
                    <View style={{ marginEnd: 50 }}>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#50719D", fontWeight: "bold" }}>
                        {item.nombreServicio}
                      </Text>
                      <Text style={{ color: "#50719D" }}>
                        <FontAwesome name="calendar" size={15} color="#50719D" /> {convertirFecha(item.fechaSolicitud)}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons name="access-time" size={20} color="#50719D" />
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => String(item.id)}
                scrollEnabled={false}
              />
              <TouchableOpacity onPress={() => { setIconTime(true); handleVerMas(solicitudesPendientes, "Solicitudes pendientes"); }}>
                <Text style={{ color: "#50719D", textAlign: "center" }}>Ver más</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {/* Modal de ver mas solicitudes */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Solicitudes</Text>
            <FlatList
              data={modalContent}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tarjetaTrabajo}
                  onPress={() => {
                    navigation.navigate("Servicio", item);
                    setIsModalVisible(false);  // Cierra el modal al seleccionar una solicitud
                  }}
                >
                  <Image
                    source={item.imagen && item.imagen != '' ? { uri: item.imagen } : require("../../assets/iconos/ImageReferencia.png")}
                    style={styles.imagenTrabajo}
                  />
                  <View style={{ marginEnd: 5 }}>
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {item.estado === 5 || item.estado === 6 ? (
                      <MaterialIcons name="done-all" size={20} color="green" />
                    ) : item.estado === 4 ? (
                      <FontAwesome name="star" size={20} color="orange" />
                    ) : item.estado === 1 && !iconTime ? (
                      <MaterialIcons name="gavel" size={20} color="#50719D" />
                    ) : item.estado === 1 && iconTime ? (
                      <MaterialIcons name="access-time" size={20} color="#50719D" />
                    ) : item.estado === 2 ? (
                      <MaterialIcons name="play-circle-outline" size={20} color="#E3CF1B" />
                    ) : item.estado === 3 ? (
                      <MaterialIcons name="construction" size={20} color="#E3CF1B" />
                    ) : null}
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={{ paddingBottom: 50 }}
            />
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setIsModalVisible(!isModalVisible);
              }}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de opciones de servicio */}
      <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={handleCloseMenu} ref={modalRef}>
        <TouchableWithoutFeedback onPress={handleCloseMenu}>
          <View style={styles.modalOverlay}>
            <View style={styles.menuOpciones}>
              <Text style={{ color: "#2E86C1", fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>Opciones para el usuario</Text>

              {/* Editar usuario*/}
              <TouchableOpacity
                onPress={() => {
                  handleEdit(usuarioData?._id);
                }}
                style={styles.opcionMenu}
              >
                <Text style={{ color: "#003366" }}>Editar usuario</Text>
              </TouchableOpacity>

              {/* Eliminar cuenta  */}
              <TouchableOpacity
                onPress={() => {
                  handleDelete(usuarioData?._id);
                }}
                style={styles.opcionMenu}>
                <Text style={{ color: "#003366" }}>Eliminar usuario</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  contactButtonAdmin: {
    marginTop: 10,
    backgroundColor: "#FFA500",
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
    marginRight: 8,
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
    paddingRight: 8,
  },
  columnaDerecha: {
    flex: 0.5,
    paddingLeft: 8,
  },
  textoSolicitudes: {
    color: "#0676C6",
    fontSize: 17,
  },

  textoSolicitudesCompletadas: {
    color: "#0676C6",
    fontSize: 17,
    marginBottom: 8,
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
    color: "green",
  },
  numberContainer: {
    width: 75,
    alignItems: "flex-end",
  },
  numberContainerCompleted: {
    width: 75,
    alignItems: "flex-end",
    marginBottom:8,
    marginLeft: 25
  },
  // Modal 3 puntos
  menuContenedor: {
    alignItems: "flex-end",
  },
  botonTresPuntos: {
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuOpciones: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,

  },
  opcionMenu: {
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#F3F6FF",
    marginTop: 10,
  },
  textoOpcionMenu: {
    color: "black",
  },
  // Tarjeta de solicitudes

  tarjetaTrabajo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    backgroundColor: "#FCFCFC",
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    borderRadius: 8,
  },

  imagenTrabajo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  // Estilos modal de ver mas
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  // Modal información de usuario
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#21618C",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
  },
});
export default Profile;
