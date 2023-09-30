import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { convertirFecha } from "../utils/randomService";
import { ServicioProps } from "../resources/service";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../routes/NavigatorTypes";

type BuscadorRouteProp = RouteProp<RootStackParamList, "Servicio">;

const ServicioScreen: React.FC = () => {
  const route = useRoute<BuscadorRouteProp>();
  const servicioCargado = route.params || {};
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const esDueno = false; // Aquí deberías determinar si esDueño es verdadero o falso
  const userCargado = {
    nombre: "Hector Lopez Valenzuela",
    email: "efpyi@example.com",
    telefono: "+569123456789"};
  return ( 
    <ScrollView style={styles.container}>
      {/* Boton para ir pa atras*/}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="#476D9A" />
        </TouchableOpacity>
        
      </View>
      {/* Barra de Usuario */}
      {!esDueno && (
        <View style={styles.userBar}>
        <Image source={{ uri: "user_image_url" }} style={styles.userImage} />
        <View style={styles.userNameContainer}>
          <Text numberOfLines={2}
                ellipsizeMode="tail" style={styles.userName}>{userCargado.nombre}</Text>
        </View>
        <TouchableOpacity style={styles.contactButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.contactButtonText}>Contactar</Text>
        </TouchableOpacity>
      </View>
      )}
      {/* Modal de informacion */}
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
              <Text style={styles.contactText}> {userCargado.email}</Text>
            </View>
            <View style={styles.contactInfo}>
              <FontAwesome name="phone" size={24} color="#003366" />
              <Text style={styles.contactText}> {userCargado.telefono}</Text>
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
      <Text style={styles.title}>{servicioCargado.nombreServicio}</Text>
      {/* Imagen del servicio */}
      <View>
        <Image source={{ uri: servicioCargado.imagen }} style={styles.image} />
        {/* Estado y categoria */}
        <View style={{ marginTop: 25, marginBottom: 10 }}>
          <Text style={styles.estadoText}>Estado: 1</Text>
          <Text style={styles.categoriaText}>{servicioCargado.categoria}</Text>
        </View>
      </View>
      {/* Descripcion de servicio */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Descripción:</Text>
        <Text style={styles.descriptionText}>
          {servicioCargado.descripcion}
        </Text>
      </View>
      <View>
        <Text style={styles.date}>
          <FontAwesome name="calendar" size={16} color="#476D9A" />
          {"  "}
          {convertirFecha(servicioCargado.fechaSolicitud)}
        </Text>
        <Text style={styles.date}>
          <FontAwesome name="clock-o" size={16} color="#476D9A" />
          {"  "}
          {servicioCargado.horaSolicitud}
        </Text>
      </View>
      <Text style={styles.address}>
        <FontAwesome name="map-marker" size={16} color="#476D9A" />
        {"  "}
        {servicioCargado.direccion}
      </Text>
      <Text style={styles.amount}>Monto: ${servicioCargado.monto}</Text>
      <View style={{ paddingHorizontal: 30 }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            {esDueno ? "Ver ofertas" : "Ofertar"}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Sección de Servicios Relacionados */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingBottom: 40, // Para añadir espacio después del botón.
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginTop: 10,
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
    borderBottomColor: '#003366',
  },

  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  userNameContainer: {
    // Esta es la nueva View que envolverá el nombre del usuario
    flex: 2, // Ajusta este valor si es necesario
    marginRight: 10, // Un pequeño margen para asegurar el espacio entre el nombre y el botón
  },

  userName: {
    fontSize: 18,
    color: '#003366',  // Un tono azul-grisáceo para el nombre
    flexShrink: 1, // Asegura que el texto pueda reducirse si es necesario
    overflow: "hidden", // Esconde el exceso de texto
  },

  contactButton: {
    padding: 10,
    //marginLeft:30,
    //marginRight:80,
    backgroundColor: "#1D5F9C",
    borderRadius: 8,
    flex: 1,
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
    backgroundColor: "#003366",
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
});

export default ServicioScreen;
