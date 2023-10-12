import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { convertirFecha } from "../utils/randomService";
import { useRoute, RouteProp } from "@react-navigation/native";
import { MainTabParamList, RootStackParamList } from "../routes/NavigatorTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { UsuarioCasted } from "../resources/user";
import { getUserById } from "../services/userService";
import { ServicioData } from "../resources/service";
import { getServiceById, obtenerTextoEstado } from "../services/serviceService";
import { getUserIdFromToken } from "../services/authService";
import { Oferta, Postoferta } from "../resources/offer";
import { getOffersByServiceId, postOffer } from "../services/offerService";
const defaultImage = require("../../assets/iconos/Default_imagen.jpg");

type ServicioRouteProp = RouteProp<RootStackParamList, "Servicio">;

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const ServicioScreen: React.FC<Props> = ({ navigation }) => {
  //Variables Independientes de la vista
  const route = useRoute<ServicioRouteProp>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [valorarModalVisible, setValorarModalVisible] = useState(false); // Estado del modal de valoración
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [crearOfertaModalVisible, setCrearOfertaModalVisible] = useState(false);
  const [verOfertasModalVisible, setVerOfertasModalVisible] = useState(false);
  const idServicio = route.params.id || null;
  const [ofertasCargadas, setOfertasCargadas] = useState<Oferta[]>([]);
  const [servicioCargado, setServicioCargado] = useState<ServicioData | null>(
    null
  );
  const [confirmModalVisible, setConfirmModalVisible] =
    useState<boolean>(false);
  const [usuariosOfertantes, setUsuariosOfertantes] = useState<
    Record<string, UsuarioCasted>
  >({});
  const [selectedOferta, setSelectedOferta] = useState<Oferta | null>(null);
  const [estadoSolicitud, setEstadoSolicitud] = useState<number>(1);
  const [userCreador, setUserCreador] = useState<UsuarioCasted | null>(null);
  const [esDueno, setEsDueno] = useState<boolean>(false); // Aquí deberías determinar si esDueño es verdadero o falso
  const [userToken, setUserToken] = useState<string | null>("");
  //NO TOCAR TODAVIA ESTA VARIABLE
  const [valoracion, setValoracion] = useState(1.0); // Estado para la valoración
  const [ofertaValue, setOfertaValue] = useState<string>(""); // Estado para el valor de la oferta

  const fetchData = async () => {
    setIsLoading(true); // Comienza la carga

    try {
      // 1. Obtener datos del servicio
      if (idServicio) {
        const fetchedServicio = await getServiceById(idServicio);
        setServicioCargado(fetchedServicio);

        // 2. Usando el servicio obtenido, cargar datos del usuario creador
        if (fetchedServicio && fetchedServicio.idCreador) {
          const fetchedUser = await getUserById(fetchedServicio.idCreador);
          setUserCreador(fetchedUser);
          const userData = await getUserIdFromToken();
          setUserToken(userData);
          if (fetchedServicio.idCreador === userData) {
            setEsDueno(true);
          } else {
            setEsDueno(false);
          }
        }
        // 3. Aquí puedes cargar el estado de la solicitud y cualquier otro dato que necesites.
        // Por ejemplo:
        setEstadoSolicitud(fetchedServicio.estado);
        const fetchedOffer = await getOffersByServiceId(idServicio);
        setOfertasCargadas(fetchedOffer);
        const userPromises = fetchedOffer.map((offer) =>
          getUserById(offer.idCreadorOferta)
        );
        const ofertantes = await Promise.all(userPromises);
        const usuariosOfertantesMap: Record<string, UsuarioCasted> = {};
        ofertantes.forEach((offerUser) => {
          usuariosOfertantesMap[offerUser._id] = offerUser;
        });
        setUsuariosOfertantes(usuariosOfertantesMap);
      }
    } catch (error) {
      console.error("Hubo un error:", error);
      Alert.alert(
        "Error",
        "No se pudo obtener la información. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false); // Termina la carga
    }
    setIsLoading(false);
    setIsRefreshing(false); // Agregar esta línea
  };

  useEffect(() => {
    fetchData();
  }, [idServicio]); // Se llamará cada vez que idServicio cambie.
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  const handlePublicarOfertas = async () => {
    if (idServicio && ofertaValue && userToken) {
      try {
        const postOferta = {
          idCreadorOferta: userToken,
          idServicio: idServicio,
          montoOfertado: parseInt(ofertaValue),
        };
        
        const response = await postOffer(postOferta);
  
        // Si llegas aquí, la oferta se ha creado correctamente
        Alert.alert("Oferta creada", "Tu oferta ha sido creada con éxito!", [
          {
            text: "Ok",
            onPress: () => console.log("Oferta creada con éxito"),
          },
        ]);
  
      } catch (error) {
        if (error instanceof Error) {
            console.error("Hubo un error al crear la oferta:", error.message);
            Alert.alert(
                "Error",
                error.message || "Hubo un problema al crear la oferta. Por favor intenta nuevamente.",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Error al crear oferta"),
                    },
                ]
            );
        } else {
            console.error("Hubo un error al crear la oferta:", error);
            Alert.alert(
                "Error",
                "Hubo un problema al crear la oferta. Por favor intenta nuevamente.",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Error al crear oferta"),
                    },
                ]
            );
        }
      }
    } else {
      Alert.alert(
        "Error",
        "Asegúrate de haber ingresado todos los datos necesarios.",
        [
          {
            text: "Ok",
            onPress: () => console.log("Datos incompletos"),
          },
        ]
      );
    }
  };
  
  
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}></View>
      {/* Barra de Usuario */}
      {!esDueno && (
        <View style={styles.userBar}>
          {/* Contenedor para la imagen y el nombre */}
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", flex: 1 }} // Añade flex para que ocupe el espacio disponible
            onPress={() => {
              navigation.navigate("PerfilAjeno", {
                id: servicioCargado?.idCreador || "",
              });
            }}
          >
            <Image
              source={
                userCreador?.imagenDePerfil
                  ? { uri: userCreador?.imagenDePerfil }
                  : require("./../../assets/iconos/UserProfile.png")
              }
              style={styles.userImage}
            />
            <View style={styles.userNameContainer}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.userName}
              >
                {userCreador?.name} {userCreador?.apellidoPaterno}{" "}
                {userCreador?.apellidoMaterno}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Botón de contactar */}
          {userCreador && (
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.contactButtonText}>Contactar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {/* Modal de informacion de contacto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Los datos del usuario son:</Text>
            <View style={styles.contactInfo}>
              <MaterialIcons name="email" size={24} color="#003366" />
              <Text style={styles.contactText}> {userCreador?.email}</Text>
            </View>
            <View style={styles.contactInfo}>
              <FontAwesome name="phone" size={24} color="#003366" />
              <Text style={styles.contactText}> {userCreador?.telefono}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*Titulo de servicio */}
      <Text style={styles.title}>{servicioCargado?.nombreServicio}</Text>
      {/* Imagen del servicio */}
      <View>
        <Image
          source={
            servicioCargado?.imagen
              ? { uri: servicioCargado?.imagen }
              : defaultImage
          }
          style={styles.image}
        />
        {/* Estado y categoria */}
        <View style={{ marginTop: 25, marginBottom: 10 }}>
          <Text style={styles.estadoText}>
            Estado: {obtenerTextoEstado(servicioCargado?.estado)}
          </Text>

          <Text style={styles.categoriaText}>{servicioCargado?.categoria}</Text>
        </View>
      </View>
      {/* Descripcion de servicio */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Descripción:</Text>
        <Text style={styles.descriptionText}>
          {servicioCargado?.descripcion}
        </Text>
      </View>
      <View>
        {/*Fecha de solicitud */}
        <Text style={styles.date}>
          <FontAwesome name="calendar" size={16} color="#476D9A" />
          {"  "}
          {convertirFecha(servicioCargado?.fechaSolicitud)}
        </Text>
        {/* Hora de solicitud*/}
        <Text style={styles.date}>
          <FontAwesome name="clock-o" size={16} color="#476D9A" />
          {"  "}
          {servicioCargado?.horaSolicitud}
        </Text>
      </View>
      {/*Direccion de solicitud */}
      <Text style={styles.address}>
        <FontAwesome name="map-marker" size={16} color="#476D9A" />
        {"  "}
        {servicioCargado?.direccion}
      </Text>
      {/*Texto de mongo, y el valor */}
      <Text style={styles.amount}>Monto: ${servicioCargado?.monto}</Text>
      {/*Boton oferta/veroferta/valorar*/}
      <View style={{ paddingHorizontal: 30 }}>
        {estadoSolicitud === 1 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (esDueno) {
                setVerOfertasModalVisible(true);
              } else {
                setCrearOfertaModalVisible(true);
              }
            }}
          >
            <Text style={styles.buttonText}>
              {esDueno ? "Ver ofertas" : "Ofertar"}
            </Text>
          </TouchableOpacity>
        )}

        {estadoSolicitud === 2 && (
          <TouchableOpacity
            style={esDueno ? styles.buttonYellow : styles.button}
            onPress={() => {
              if (esDueno) {
                Alert.alert(
                  "Por iniciar",
                  "Debes esperar que el trabajador inicie el servicio"
                );
              } else {
                Alert.alert(
                  "Comenzar",
                  "Se ha dado comienzo al servicio, si ves necesario, comunicate con el contratador para avisarle 😉"
                );
              }
            }}
          >
            <Text style={styles.buttonText}>
              {esDueno ? "Por iniciar" : "Comenzar"}
            </Text>
          </TouchableOpacity>
        )}

        {estadoSolicitud === 3 && (
          <TouchableOpacity
            style={esDueno ? styles.buttonGray : styles.button}
            onPress={() => {
              if (esDueno) {
                Alert.alert(
                  "En proceso",
                  "El trabajador sigue en proceso con este servicio, espera a que este termine"
                );
              } else {
                Alert.alert(
                  "Terminar",
                  "Se ha terminado el servicio, comunicate con el contratador para avisarle"
                );
              }
            }}
          >
            <Text style={styles.buttonText}>
              {esDueno ? "En proceso" : "Terminar"}
            </Text>
          </TouchableOpacity>
        )}

        {estadoSolicitud === 4 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setValorarModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>Valorar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/*Modal de Creacion de oferta*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={crearOfertaModalVisible}
        onRequestClose={() => {
          setCrearOfertaModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, backgroundColor: "white" }}>
            <Text style={styles.modalTitle}>Crear oferta</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 8,
              }}
            >
              <Text style={{ padding: 10 }}>CLP</Text>
              <TextInput
                style={{ flex: 1, height: 40, paddingHorizontal: 10 }}
                placeholder="Ingrese el valor de la oferta"
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={(text) => setOfertaValue(text)}
              />
            </View>
            <View style={{ ...styles.modalButtons, marginTop: 20 }}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setCrearOfertaModalVisible(false);
                  setOfertaValue("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => {
                  handlePublicarOfertas();

                  setCrearOfertaModalVisible(false);
                  setOfertaValue("");
                }}
              >
                <Text style={styles.createButtonText}>Crear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/*Modal de ver ofertas*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={verOfertasModalVisible}
        onRequestClose={() => {
          setVerOfertasModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              <FontAwesome name="bullhorn" size={24} color="#2E86C1" /> Ofertas
              publicadas
            </Text>
            {ofertasCargadas.length > 0 ? (
              ofertasCargadas.map((oferta, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("PerfilAjeno", {
                        id:
                          usuariosOfertantes[oferta.idCreadorOferta]?._id || "",
                      });
                      setVerOfertasModalVisible(false);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Image
                      source={
                        usuariosOfertantes[oferta.idCreadorOferta]
                          ?.imagenDePerfil
                          ? {
                              uri: usuariosOfertantes[oferta.idCreadorOferta]
                                ?.imagenDePerfil,
                            }
                          : require("../../assets/iconos/UserProfile.png")
                      }
                      style={styles.ofertaImage}
                    />
                    <Text
                      style={{ marginRight: 3, maxWidth: 120 }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {usuariosOfertantes[oferta.idCreadorOferta]?.name ||
                        "Cargando..."}
                    </Text>
                  </TouchableOpacity>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ marginRight: 10, fontWeight: "bold" }}>
                      CLP ${oferta.montoOfertado.toLocaleString()}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedOferta(oferta);
                        setConfirmModalVisible(true);
                      }}
                    >
                      {/* Aquí puedes reemplazar el ícono por el de tu elección */}
                      <MaterialIcons name="check" size={24} color="green" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={{ marginRight: 10, color: "grey" }}>
                  No hay ofertas disponibles por el momento...
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVerOfertasModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal de confirmación */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => {
          setConfirmModalVisible(false);
        }}
      >
        <View style={styles.centeredViewModal}>
          <View style={styles.modalViewModal}>
            <Text style={styles.descripcionModal}>
              Quieres aceptar la oferta por el monto de:
            </Text>
            <Text style={styles.amountText}>
              CLP {selectedOferta?.montoOfertado.toLocaleString()}
            </Text>
            <View style={styles.modalButtonsModal}>
              <TouchableOpacity
                style={[styles.buttonModall, styles.cancelButtonModal]}
                onPress={() => {
                  setConfirmModalVisible(false);
                }}
              >
                <Text style={styles.buttonTextModal}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonModall, styles.createButtonModal]}
                onPress={() => {
                  console.log(
                    "Oferta aceptada:",
                    selectedOferta?.montoOfertado
                  );
                  setConfirmModalVisible(false);
                  setVerOfertasModalVisible(false);
                }}
              >
                <Text style={styles.buttonTextModal}>Sí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de valoración */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={valorarModalVisible}
        onRequestClose={() => {
          setValorarModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Calificar Usuario</Text>
            <Text>Valoración:</Text>
            <Slider
              minimumValue={1.0}
              maximumValue={5.0}
              step={0.1}
              value={valoracion}
              onValueChange={(value) => setValoracion(value)}
              style={{ width: 300, marginBottom: 20 }} // Ajusta la longitud de la barra
            />
            <Text>{valoracion.toFixed(1)}</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => {
                // Aquí puedes realizar la lógica para enviar la valoración
                // Por ejemplo, enviarla al servidor
                // Luego, cierra el modal
                setValorarModalVisible(false);
              }}
            >
              <Text style={styles.createButtonText}>Enviar Valoración</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 40, // Para añadir espacio después del botón.
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3C4872",
    textAlign: "center",
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: 230,
    resizeMode: "cover",
    borderRadius: 15,
    alignSelf: "center",
    marginBottom: 30,
  },
  descriptionContainer: {
    backgroundColor: "#F3F6FF",
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  descriptionTitle: {
    fontWeight: "600",
    fontSize: 21,
    color: "#343a40",
    marginBottom: 15,
  },
  //MODAL CONFIRMACION
  modalButtonsModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalViewModal: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
  },
  descripcionModal: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },

  cancelButtonModal: {
    backgroundColor: "#FF6B6B",
  },

  createButtonModal: {
    backgroundColor: "#4CAF50", // Un verde representativo para el botón de "Sí"
  },

  buttonTextModal: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  buttonModall: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  // ACA
  amountText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 17,
    lineHeight: 26,
    color: "#5F5C7D",
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 17,
    color: "#003366",
    marginRight: 25,
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 17,
    color: "#003366",
    marginBottom: 30,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#003366",
    marginBottom: 35,
  },
  button: {
    backgroundColor: "#3D86CE",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 19,
  },
  estadoText: {
    position: "absolute",
    bottom: 12,
    left: 12,
    color: "white",
    backgroundColor: "#8DBEEF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 15,
    fontWeight: "600",
  },
  categoriaText: {
    position: "absolute",
    bottom: 12,
    right: 12,
    color: "white",
    backgroundColor: "#8DBEEF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 15,
    fontWeight: "600",
  },
  userBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 5,
    borderBottomWidth: 1, // Puedes eliminarlo si no te gusta
    borderBottomColor: "#003366",
  },

  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 2,
  },

  userNameContainer: {
    // Esta es la nueva View que envolverá el nombre del usuario
    flex: 2, // Ajusta este valor si es necesario
    marginRight: 10, // Un pequeño margen para asegurar el espacio entre el nombre y el botón
    marginLeft: 5,
  },

  userName: {
    fontSize: 18,
    color: "#003366", // Un tono azul-grisáceo para el nombre
    flexShrink: 1, // Asegura que el texto pueda reducirse si es necesario
    overflow: "hidden", // Esconde el exceso de texto
  },

  contactButton: {
    padding: 7,
    paddingHorizontal: 20,
    backgroundColor: "#1D5F9C",
    borderRadius: 8,
    alignItems: "center",
  },
  contactButtonText: {
    color: "#FFFFFF",
  },

  // Nuevos estilos para el modal:
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)", // Fondo semi transparente
  },
  modalView: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2E86C1",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 18,
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
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  //Estilos para modal
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 8,
    marginRight: 5,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  createButton: {
    flex: 1,
    backgroundColor: "#44B1EE",
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
  createButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },

  // Estilos para el modal de ver ofertas
  ofertaImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Esto hace que la imagen sea redonda, puedes ajustar según necesites
    marginRight: 10,
  },

  // ofertaItem: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   backgroundColor: "#EEF2FF",
  //   padding: 10,
  //   marginBottom: 10,
  //   borderRadius: 8,
  // },
  buttonYellow: {
    backgroundColor: "#FFC700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonGray: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default ServicioScreen;
