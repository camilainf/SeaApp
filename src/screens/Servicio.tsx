import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, Alert, ActivityIndicator, RefreshControl } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { convertirFecha } from "../utils/randomService";
import { useRoute, RouteProp } from "@react-navigation/native";
import { MainTabParamList, RootStackParamList } from "../routes/NavigatorTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { UsuarioCasted } from "../resources/user";
import { getUserById, handleEnviarValoracion } from "../services/userService";
import { ServicioData } from "../resources/service";
import { deleteService, getServiceById, obtenerTextoEstado, updateServiceStatus } from "../services/serviceService";
import { getUserIdFromToken } from "../services/authService";
import { Oferta, Postoferta } from "../resources/offer";
import { getOfferAcceptedByServiceId, getOffersByServiceId, handleAceptarOferta, handlePublicarOfertas, postOffer } from "../services/offerService";
import { Icon } from "react-native-elements";
import { actualizarValoracion, crearValoracion, obtenerValoracionesServicio } from "../services/valoracionService";
import { Valoracion } from "../resources/valoration";
const defaultImage = require("../../assets/iconos/Default_imagen.jpg");

type ServicioRouteProp = RouteProp<RootStackParamList, "Servicio">;

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const ServicioScreen: React.FC<Props> = ({ navigation }) => {
  //Variables Independientes de la vista
  const route = useRoute<ServicioRouteProp>();
  const idServicio = route.params.id || null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [valorarModalVisible, setValorarModalVisible] = useState(false); // Estado del modal de valoración
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [crearOfertaModalVisible, setCrearOfertaModalVisible] = useState(false);
  const [verOfertasModalVisible, setVerOfertasModalVisible] = useState(false);
  const [isDescriptionVisible, setDescriptionVisibility] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState<boolean>(false);
  //Datos importantes
  const [ofertasCargadas, setOfertasCargadas] = useState<Oferta[]>([]);
  const [servicioCargado, setServicioCargado] = useState<ServicioData | null>(null);
  const [usuariosOfertantes, setUsuariosOfertantes] = useState<Record<string, UsuarioCasted>>({});
  const [selectedOferta, setSelectedOferta] = useState<Oferta | null>(null);
  const [userCreador, setUserCreador] = useState<UsuarioCasted | null>(null);
  const [esDueno, setEsDueno] = useState<boolean>(false); // Aquí deberías determinar si esDueño es verdadero o falso
  const [userToken, setUserToken] = useState<string | null>("");
  const [valoracion, setValoracion] = useState(1.0); // Estado para la valoración
  const [ofertaValue, setOfertaValue] = useState<string>(""); // Estado para el valor de la oferta
  const [usuarioOferta, setUsuarioOferta] = useState<UsuarioCasted | null>(null);
  const [valoracionController, setValoracionController] = useState<Valoracion | null>(null);
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
        //Carga de todas las ofertas del servicio
        const fetchedOffer = await getOffersByServiceId(idServicio);
        setOfertasCargadas(fetchedOffer);
        //Carga de todos los usuarios ofertantes
        const userPromises = fetchedOffer.map((offer) => getUserById(offer.idCreadorOferta));
        const ofertantes = await Promise.all(userPromises);
        const usuariosOfertantesMap: Record<string, UsuarioCasted> = {};
        ofertantes.forEach((offerUser) => {
          usuariosOfertantesMap[offerUser._id] = offerUser;
        });
        setUsuariosOfertantes(usuariosOfertantesMap);
        //Carga de la oferta seleccionada
        const fetchedOfferSelected = await getOfferAcceptedByServiceId(idServicio);
        if (fetchedOfferSelected && fetchedOfferSelected.idCreadorOferta) {
          const fetchedUserSelected = await getUserById(fetchedOfferSelected.idCreadorOferta);
          setUsuarioOferta(fetchedUserSelected);
        }
        //Cargar Proceso de calificacion

        if (fetchedServicio.estado >= 4) {
          const valoracionData = await obtenerValoracionesServicio(idServicio);
          setValoracionController(valoracionData);
          if (valoracionData.dueñoValoro && valoracionData.trabajadorValoro) {
            updateServiceStatus(idServicio, 5);
          }
        }
      }
    } catch (error) {
      console.error("Hubo un error:", error);
      Alert.alert("Error", "No se pudo obtener la información. Por favor, intenta de nuevo.");
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

  const handleDeleteService = async (serviceId: string) => {
    Alert.alert(
      "Eliminar servicio",
      "¿Estás seguro de que quieres eliminar este servicio?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            console.log("Cancelado");
          },
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              const response = await deleteService(serviceId);
              navigation.navigate('Main', {
                screen: 'Perfil',
                params: { id: userCreador?._id },
              } as any);
              console.log(response);
            } catch (error) {
              console.error("No se pudo eliminar el servicio:", error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
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
            }}>
            <Image source={userCreador?.imagenDePerfil ? { uri: userCreador?.imagenDePerfil } : require("./../../assets/iconos/UserProfile.png")} style={styles.userImage} />
            <View style={styles.userNameContainer}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.userName}>
                {userCreador?.nombre} {userCreador?.apellidoPaterno} {userCreador?.apellidoMaterno}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Botón de contactar */}
          {userCreador && (
            <TouchableOpacity style={styles.contactButton} onPress={() => setModalVisible(true)}>
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
        }}>
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
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*Titulo de servicio */}
      <Text style={styles.title}>{servicioCargado?.nombreServicio}</Text>
      {/* Imagen del servicio */}
      <View>
        <Image source={servicioCargado?.imagen ? { uri: servicioCargado?.imagen } : defaultImage} style={styles.image} />
        {/* Estado y categoria */}
        <View style={{ marginTop: 25, marginBottom: 10 }}>
          <Text style={styles.estadoText}>Estado: {obtenerTextoEstado(servicioCargado?.estado)}</Text>

          <Text style={styles.categoriaText}>{servicioCargado?.categoria}</Text>
        </View>
      </View>
      {/* Descripcion de servicio */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Descripción:</Text>
        <Text style={styles.descriptionText}>{servicioCargado?.descripcion}</Text>
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
      {/* SECCION DEL MONTO */}
      {usuarioOferta ? (
        <TouchableOpacity
          style={styles.offerUserContainer}
          onPress={() => {
            navigation.navigate("PerfilAjeno", {
              id: usuarioOferta._id,
            });
          }}>
          <Image source={usuarioOferta.imagenDePerfil ? { uri: usuarioOferta.imagenDePerfil } : require("./../../assets/iconos/UserProfile.png")} style={styles.offerUserImage} />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.offerUserName}>
            {usuarioOferta.nombre} {usuarioOferta.apellidoPaterno} {usuarioOferta.apellidoMaterno}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#003366" }}>${servicioCargado?.monto} CLP</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.amount}>Monto: ${servicioCargado?.monto} CLP </Text>
      )}

      {/*Boton oferta/veroferta/valorar*/}
      <View style={{ paddingHorizontal: 30 }}>
        {servicioCargado?.estado === 1 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (esDueno) {
                setVerOfertasModalVisible(true);
              } else {
                setCrearOfertaModalVisible(true);
              }
            }}>
            <Text style={styles.buttonText}>
              {esDueno ? (
                <>
                  Ver ofertas <FontAwesome name="eye" size={20} color="white" />
                </>
              ) : (
                <>
                  Ofertar <FontAwesome name="gavel" size={20} color="white" />
                </>
              )}
            </Text>
          </TouchableOpacity>
        )}
        {/* Verificar primero si el usuario tiene permiso basado en el token y la oferta/creador. */}
        {servicioCargado && servicioCargado.estado >= 2 && (userToken === usuarioOferta?._id || userToken === servicioCargado?.idCreador) ? (
          <>
            {servicioCargado?.estado === 2 && (
              <TouchableOpacity
                style={esDueno ? styles.buttonYellow : styles.button}
                onPress={async () => {
                  const message = esDueno ? "Por iniciar" : "Comenzar";
                  if (!esDueno) {
                    await updateServiceStatus(idServicio, 3);
                    onRefresh();
                  }
                  Alert.alert(message, esDueno ? "Debes esperar que el trabajador inicie el servicio, si ves necesario, puedes comunicarte con el trabajador 😉" : "Se ha dado comienzo al servicio, si ves necesario, comunicate con el contratador para avisarle 😉");
                }}>
                <Text style={styles.buttonText}>
                  {esDueno ? (
                    <>
                      Por iniciar <FontAwesome name="clock-o" size={20} color="white" />
                    </>
                  ) : (
                    <>
                      Comenzar <FontAwesome name="play" size={16} color="white" />
                    </>
                  )}
                </Text>
              </TouchableOpacity>
            )}

            {servicioCargado?.estado === 3 && (
              <TouchableOpacity
                style={esDueno ? styles.buttonGray : styles.buttonTerminar}
                onPress={async () => {
                  const message = esDueno ? "En proceso" : "Terminar";
                  if (!esDueno) {
                    await updateServiceStatus(idServicio, 4);
                    await crearValoracion(idServicio, servicioCargado.idCreador, userCreador?._id);
                    onRefresh();
                  }
                  Alert.alert(message, esDueno ? "El trabajador sigue en proceso con este servicio, espera a que este termine" : "Se ha terminado el servicio, comunicate con el contratador para avisarle");
                }}>
                <Text style={styles.buttonText}>
                  {esDueno ? (
                    <>
                      {" "}
                      En proceso <FontAwesome name="hand-paper-o" size={20} color="white" />
                    </>
                  ) : (
                    <>
                      Terminar <FontAwesome name="rocket" size={17} color="white" />
                    </>
                  )}
                </Text>
              </TouchableOpacity>
            )}

            {servicioCargado?.estado === 4 && (
              <>
                {(esDueno ? !valoracionController?.dueñoValoro : !valoracionController?.trabajadorValoro) ? (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setValorarModalVisible(true);
                      onRefresh();
                    }}>
                    <Text style={styles.buttonText}>
                      Valorar <FontAwesome name="handshake-o" size={16} color="white" />
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{ color: "#00162D", fontSize: 17, marginBottom: 20 }}>Ya haz <Text style={{ fontWeight: "bold" }}>evaluado</Text> al usuario, Si ves necesario, <Text style={{ fontWeight: "bold" }}>comunicate</Text> con el otro usuario para la <Text style={{ fontWeight: "bold" }}>finalizacion</Text> del servicio. ✅</Text>
                )}
              </>
              //
            )}

            {servicioCargado && servicioCargado?.estado > 4 && (
              // <TouchableOpacity
              //   style={styles.button}
              //   onPress={() => {
              //     Alert.alert("El servicio ya se encuentra finalizado 👌🏻");
              //   }}>
              //   <Text style={styles.buttonText}>Terminado</Text>
              // </TouchableOpacity>
              <Text style={{ fontSize: 20, color: "#00162D", marginBottom: 15 }}>
                El servicio actual ya se encuentra <Text style={{ fontWeight: "bold" }}>finalizado</Text> y <Text style={{ fontWeight: "bold" }}>valorado </Text> por ambos usuarios! ✅
              </Text>
            )}
          </>
        ) : (
          <>{servicioCargado && servicioCargado?.estado !== 1 && <Text style={{ color: "#00162D", fontSize: 20, marginBottom: 20 }}>Esta solicitud ya ha sido tomada. Sigue buscando para encontrar la tuya 🙌🏻</Text>}</>
        )}
      </View>

      {/*Modal de Creacion de oferta*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={crearOfertaModalVisible}
        onRequestClose={() => {
          setCrearOfertaModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, backgroundColor: "white" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Text style={styles.modalTitle}>Crear oferta </Text>
              <TouchableOpacity style={{ marginBottom: 5 }} onPress={() => setDescriptionVisibility(!isDescriptionVisible)}>
                <FontAwesome name="question-circle" size={22} color="#2E86C1" />
              </TouchableOpacity>
            </View>
            {isDescriptionVisible && (
              <Text
                style={{
                  marginBottom: 15,
                  fontSize: 14,
                  color: "#003366",
                  paddingHorizontal: 10,
                  textAlign: "justify",
                }}>
                Ingrese el valor de la oferta para participar en la solicitud. Asegúrese de ofrecer un precio justo y competitivo.
              </Text>
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 8,
              }}>
              <Text style={{ padding: 10 }}>CLP</Text>
              <TextInput style={{ flex: 1, height: 40, paddingHorizontal: 10 }} placeholder="Ingrese el valor de la oferta" keyboardType="number-pad" maxLength={10} onChangeText={(text) => setOfertaValue(text)} />
            </View>
            <View style={{ ...styles.modalButtons, marginTop: 20 }}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setCrearOfertaModalVisible(false);
                  setOfertaValue("");
                }}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.createButton, ofertaValue ? {} : { opacity: 0.5 }]} // Opcional: Agrega un estilo cuando esté deshabilitado.
                onPress={() => {
                  handlePublicarOfertas(idServicio, ofertaValue, userToken);
                  setCrearOfertaModalVisible(false);
                  setOfertaValue("");
                  onRefresh();
                }}
                disabled={!ofertaValue} // Desactiva el botón si ofertaValue está vacío o nulo.
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
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              <FontAwesome name="bullhorn" size={24} color="#2E86C1" /> Ofertas publicadas
            </Text>
            {ofertasCargadas.length > 0 ? (
              ofertasCargadas.map((oferta, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                  key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("PerfilAjeno", {
                        id: usuariosOfertantes[oferta.idCreadorOferta]?._id || "",
                      });
                      setVerOfertasModalVisible(false);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}>
                    <Image
                      source={
                        usuariosOfertantes[oferta.idCreadorOferta]?.imagenDePerfil
                          ? {
                            uri: usuariosOfertantes[oferta.idCreadorOferta]?.imagenDePerfil,
                          }
                          : require("../../assets/iconos/UserProfile.png")
                      }
                      style={styles.ofertaImage}
                    />
                    <Text style={{ marginRight: 3, maxWidth: 120 }} numberOfLines={1} ellipsizeMode="tail">
                      {usuariosOfertantes[oferta.idCreadorOferta]?.nombre || "Cargando..."}
                    </Text>
                  </TouchableOpacity>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ marginRight: 10, fontWeight: "bold" }}>CLP ${oferta.montoOfertado.toLocaleString()}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedOferta(oferta);
                        setConfirmModalVisible(true);
                      }}>
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
                }}>
                <Text style={{ marginRight: 10, color: "grey" }}>No hay ofertas disponibles por el momento...</Text>
              </View>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setVerOfertasModalVisible(false)}>
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
        }}>
        <View style={styles.centeredViewModal}>
          <View style={styles.modalViewModal}>
            <Text style={styles.descripcionModal}>Quieres aceptar la oferta por el monto de:</Text>
            <Text style={styles.amountText}>CLP {selectedOferta?.montoOfertado.toLocaleString()}</Text>
            <View style={styles.modalButtonsModal}>
              <TouchableOpacity
                style={[styles.buttonModall, styles.cancelButtonModal]}
                onPress={() => {
                  setConfirmModalVisible(false);
                }}>
                <Text style={styles.buttonTextModal}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonModall, styles.createButtonModal]}
                onPress={() => {
                  handleAceptarOferta(selectedOferta);
                  setConfirmModalVisible(false);
                  setVerOfertasModalVisible(false);
                  onRefresh();
                }}>
                <Text style={styles.buttonTextModal}>Sí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de valoración valorar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={valorarModalVisible}
        onRequestClose={() => {
          setValorarModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Calificar Usuario</Text>
            <Text style={styles.modalInstruction}>Desliza para seleccionar una valoración al usuario entre 1.0 y 5.0,</Text>
            <Slider minimumValue={1.0} maximumValue={5.0} step={0.1} value={valoracion} onValueChange={(value) => setValoracion(value)} style={{ width: 300, marginBottom: 20 }} />
            <Text style={styles.valoracionText}>{valoracion.toFixed(1)}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButtonValoration}
                onPress={() => {
                  setValorarModalVisible(false);
                }}>
                <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 19, textAlign: "center" }}>Cancelar Valoracion</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.createButton}
                onPress={async () => {
                  {
                    esDueno ? await handleEnviarValoracion(usuarioOferta?._id, valoracion) : await handleEnviarValoracion(userCreador?._id, valoracion);
                  }
                  {
                    esDueno ? await actualizarValoracion(valoracionController?.id, true, null) : await actualizarValoracion(valoracionController?.id, null, true);
                  }
                  await setValorarModalVisible(false);
                  onRefresh();
                  Alert.alert("Valoracion enviada", "Gracias por valorar al usuario ⭐");
                }}>
                <Text style={{ color: "#FFFFFF", textAlign: "center", fontSize: 19, fontWeight: "bold" }}>Enviar Valoración</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {esDueno && (
        <View>
          <TouchableOpacity
            style={{ backgroundColor: "black", alignItems: "center", marginBottom: 10, borderRadius: 15, }}
            onPress={() => {
              console.log("Boton editar servicio");
              if (idServicio) navigation.navigate('EditarServicio', { servicioId: idServicio});
            }}>
            <Text style={{ color: "white", fontSize: 20, margin: 10 }}>Editar servicio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: "black", alignItems: "center", marginBottom: 10, borderRadius: 15, }}
            onPress={() => {
              console.log("Boton eliminar servicio");
              if (idServicio) handleDeleteService(idServicio);
            }}>
            <Text style={{ color: "white", fontSize: 20, margin: 10 }}>Eliminar servicio</Text>
          </TouchableOpacity>
        </View>
      )}

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
  // ESTILO DE MONTO SECTION
  offerUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 35,
  },
  offerUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  offerUserName: {
    flex: 1, // Para que ocupe el espacio restante y los puntos suspensivos funcionen.
    fontWeight: "400",
    fontSize: 18,
    color: "#003366",
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
  buttonTerminar: {
    backgroundColor: "green",
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
  buttonFinished: {
    backgroundColor: "green",
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
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
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
    backgroundColor: "#DB912C",
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
  //Estilos modal valoracion
  modalInstruction: {
    color: "#555",
    marginBottom: 10,
  },
  valoracionText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E86C1",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButtonValoration: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
    backgroundColor: "#FB6865",
    alignItems: "center",
  },
});

export default ServicioScreen;
