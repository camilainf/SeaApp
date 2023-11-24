import React, { useCallback, useState } from "react";
import { View, StyleSheet, Alert, RefreshControl, ScrollView, Modal, Dimensions, Text ,Image} from "react-native";
import { Avatar, Button, Card, Title } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { getUserIdFromToken, logout } from "../services/authService";
import { deactivateUser, getUserById } from "../services/userService";
import { UsuarioCasted } from "../resources/user";
import { useAlert } from "../context/AlertContext";

interface Props {
  navigation: any;
}
interface TutorialPage {
  title: string;
  content: string;
}
const Mas: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<UsuarioCasted>();
  const [userId, setUserId] = useState<string>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isTutorialVisible, setIsTutorialVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 6;

  const { showAlert } = useAlert();

  const obtenerUsuarioActual = async () => {
    try {
      const userId = await getUserIdFromToken();
      if (userId) {
        const user = await getUserById(userId);
        setUser(user);
        setUserId(userId);
      }
    } catch (error) {
      console.error("Error al obtener el userId:", error);
    }
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await obtenerUsuarioActual();
    } catch (error) {
      console.error("Error al refrescar:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
      return () => {};
    }, [onRefresh])
  );

  const handleButtonPress = (title: string) => {
    switch (title) {
      case "Desconectarse":
        showAlert(
          "Cerrar sesión",
          "¿Estás seguro que deseas cerrar sesión?",
          async () => {
            try {
              logout();
              navigation.navigate("Auth");
            } catch (error) {
              console.error("Error al desactivar la cuenta del usuario:", error);
              showAlert("Ups 😥", "Hubo un error al intentar cerrar la sesión, intenta en unos minutos.");
            }
          },
          undefined,
          "Cerrar",
          "Desconectarse"
        );
        break;
      case "Editar datos personales":
        navigation.navigate("EditarPerfil", { userId: userId });
        break;
      case "Desactivar cuenta":
        showAlert(
          "Eliminar cuenta ❗",
          "¿Estás seguro de que quieres eliminar tu cuenta? Tu cuenta pasará a un estado inactivo y esta acción no se puede deshacer.",
          async () => {
            try {
              if (userId) {
                await deactivateUser(userId);
                logout();
                navigation.navigate("Auth");
              }
            } catch (error) {
              console.error("Error al desactivar la cuenta del usuario:", error);
              showAlert("Error ⛔", "No se pudo desactivar la cuenta. Por favor, inténtalo de nuevo.");
            }
          },
          undefined,
          "Cancelar",
          "Eliminar cuenta"
        );
        break;
      case "Tutorial":
        console.log("Se abre tutorial");
        break;
      default:
        showAlert(title, "");
    }
  };

  //Tutorial

  const handleTutorialNavigation = (direction: string) => {
    if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderTutorialPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <View>
            <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 23, fontWeight: "700", color: "#3F3844" }}>Bienvenidos a Seajob! 🌊</Text>
            </View>

            <Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13 , textAlign:"justify"}}>
  En esta aplicación podrás <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}>crear </Text>distintos <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}>servicios</Text> para trabajos en los que necesitas ayuda o
  <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}> poder encontrar</Text> algún trabajo en el que te <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}>interese participar</Text>.
</Text>
<Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 10 , textAlign:"justify"}}>Primero, para empezar en esta aplicación, debemos familiarizarnos con las <Text style={{ fontSize: 15, fontWeight: "600", color: "#3F3844" }}>4 vistas principales de Seajob</Text>, que son:</Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>1. Home / Menú principal </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>2. Creación de servicio </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>3. Vista Perfil </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>4. Sección "Más" </Text>
          </View>
        );

      case 1:
        return (<View>
          <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 23, fontWeight: "700", color: "#3F3844" }}>Menú principal ⭐</Text>
          </View>

          <Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13, marginBottom: 5 , textAlign:"justify"}}>
  En esta vista, podremos ver 5 elementos, que son:
</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>1. Resumen personal </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>2. Sección de búsqueda </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>3. Publicaciones destacadas </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>4. Categorías destacadas </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>5. Últimos servicios </Text>
<Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13, marginBottom: 5 , textAlign:"justify"}}>
  El primer elemento mostrará la imagen de <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}>perfil del usuario</Text>, su <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}>nombre</Text> y el <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}>monto obtenido</Text> mediante los trabajos.
</Text>
<Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13, marginBottom: 5 , textAlign:"justify"}}>
  En la sección de búsqueda, habrá una barra para buscar tanto un <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}>servicio</Text> o una <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}>solicitud</Text> mediante su nombre o categoría.
</Text>
<Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13, marginBottom: 5 , textAlign:"justify"}}>
  En el tercer elemento, se mostrarán todas las <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}>publicaciones destacadas</Text> de la plataforma.
</Text>
<Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13, marginBottom: 5, textAlign:"justify" }}>
  De la misma forma, en la sección de categorías destacadas, se mostrarán todas las <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}>categorías destacadas</Text> de la plataforma.
</Text>
<Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13, marginBottom: 5 , textAlign:"justify"}}>
  Finalmente, en el quinto elemento, se mostrará un botón que nos guiará a la vista de todas las <Text style={{ fontSize: 15, fontWeight: "bold", color: "#3F3844" }}>solicitudes ordenadas</Text> según su orden de publicación.
</Text>
        </View>);
        
      case 2:
        return (<View>
          <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 23, fontWeight: "700", color: "#3F3844" }}>Creación de servicio 📝</Text>
          </View>

<Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13 , textAlign:"justify"}}>
  En esta vista, podremos crear un servicio en el cual necesitemos ayuda de algún trabajador. Para esto, debemos llenar los siguientes campos:
</Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>1. Nombre del servicio </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>2. Categoría </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>3. Descripción </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>4. Fecha y hora </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>5. Dirección del servicio </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>6. Monto del servicio </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>7. La imagen del servicio </Text>

        </View>);
      case 3:
        return(
          <View>
          <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 23, fontWeight: "700", color: "#3F3844" }}>Perfil 👤</Text>
          </View>

          <Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13, textAlign:"justify" }}>
  En esta vista, podremos ver la información personal de nuestro usuario, que incluye:
</Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>1. Información del usuario </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>2. Resumen </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>3. Solicitudes Creadas </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>4. Solicitudes Aceptadas </Text>
<Text style={{ fontSize: 16, fontWeight: "bold", color: "#3F3844", marginTop: 10 }}>5. Solicitudes Pendientes </Text>
          </View>
        );
      case 4:
        return(
          <View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 23, fontWeight: "700", color: "#3F3844" }}>Mas ⚙️</Text>
          </View>

          <Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13 , textAlign:"justify"}}>
            En esta vista , se podra ingresar las opciones adicionales de la aplicacion, aqui se podra <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>Editar datos personales</Text>, <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>Desactivar cuenta</Text> si es requerido, ver el <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>tutorial</Text> de la aplicacion o <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>Desconectarse</Text> del sistema.
          </Text>
          </View>
        );
      case 5:
        return(
          <View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 23, fontWeight: "700", color: "#3F3844" }}>General 🌍</Text>
          </View>

          <Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13, textAlign:"justify"}}>
          El propósito de esta aplicación es <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>conectar</Text> a usuarios que necesiten ayuda con un trabajo con usuarios que sepan como resolver estas necesidades. Para esto, seajob, otorga un espacio en donde se puedan crear servicios para que estos <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>interactúen y se pongan de acuerdo</Text> para este trabajo.            
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13, textAlign:"justify"}}>
          Estos servicios poseen 5 estados, siendo el primero el <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>ofertando</Text>. En este estado, los creadores del servicio podrán <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>Ver las ofertas</Text> publicadas por otros usuarios y los trabajadores podrán <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>crear una oferta</Text> para el servicio          </Text>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13 , textAlign:"justify"}}>
            Una vez aceptada una oferta, el servicio pasara a estado <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>"Por iniciar"</Text>. en este estado <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>solo el trabajador</Text> le podra dar inicio al trabajo 
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13 , textAlign:"justify"}}>
          Luego de esto, el servicio estará en estado <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>"Trabajando"</Text>, de misma forma de la anterior, solo el trabajador podrá <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>finalizar el trabajo</Text> y así el servicio pasara a estado <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>"Finalizado"</Text>          </Text>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "#3F3844", marginTop: 13 , textAlign:"justify"}}>
          Finalmente, cuando un servicio termine este periodo, pasara a estado <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>"En valoración"</Text>, desde acá , será necesario que <Text style={{fontSize:15 , fontWeight:"bold", color:"#3F3844"}}>ambos usuarios</Text> deberán valorase entre si.          </Text>
          </View>
        )
      default:
        return (<View>
          <Text style={{marginBottom:10}}>Pagina de nueva funcionalidad en progreso...</Text>
          <Text>no seas inpaciente C: </Text>
          </View>);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
      <View style={styles.container}>
        <Card style={styles.userCard}>
          <Card.Content style={styles.userContent}>
            <Avatar.Image size={50} source={{ uri: user?.imagenDePerfil }} style={styles.userFoto} />
            <Title numberOfLines={1} ellipsizeMode="tail" style={styles.userName}>
              {user?.nombre} {user?.apellidoPaterno}
            </Title>
          </Card.Content>
        </Card>
        <Button style={styles.button} mode="contained" icon="account-edit" onPress={() => handleButtonPress("Editar datos personales")}>
          Editar datos personales
        </Button>
        <Button style={styles.button} mode="contained" icon="account-remove" onPress={() => handleButtonPress("Desactivar cuenta")}>
          Desactivar cuenta
        </Button>
        <Button style={styles.button} mode="contained" icon="star" onPress={() => setIsTutorialVisible(true)}>
          Tutorial Seajob
        </Button>
        <Button style={styles.button} mode="contained" icon="logout" onPress={() => handleButtonPress("Desconectarse")}>
          Desconectarse
        </Button>
      </View>

      {/* Modal de tutorial */}
      <Modal visible={isTutorialVisible} animationType="fade" onRequestClose={() => setIsTutorialVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Fondo semitransparente
          }}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 20,
              width: "80%", // Ancho del modal como porcentaje de la pantalla
            }}>
            <ScrollView style={{ maxHeight: 500 }}>{renderTutorialPageContent()}</ScrollView>

            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
              <Button onPress={() => handleTutorialNavigation("prev")} disabled={currentPage === 0} textColor="#1F80B8">
                Anterior
              </Button>
              <Button onPress={() => handleTutorialNavigation("next")} disabled={currentPage === totalPages - 1} textColor="#1F80B8">
                Siguiente
              </Button>
              <Button onPress={() => setIsTutorialVisible(false)} textColor="#1F80B8">
                Cerrar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 20,
    backgroundColor: "white",
  },
  userCard: {
    flexDirection: "row",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    backgroundColor: "white",
  },
  userContent: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
  },
  userName: {
    marginLeft: 10,
    width: "80%",
  },
  userFoto: {
    backgroundColor: "#44B1EE",
  },
  button: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#44B1EE",
    elevation: 3,
    shadowColor: "#000",
  },
});

export default Mas;
