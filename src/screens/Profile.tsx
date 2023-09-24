import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Rating, Card } from "react-native-elements";

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
                {/* TEXTO DE PERFIL */}
      <View >
        <Text style={styles.textoPerfil}>Perfil</Text>
      </View>
                {/* INFORMACION USUARIO */}
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/iconos/usericon.png")}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.datosUser}>Alexander</Text>
          <Text style={styles.datosUser}>Gonzales Figueroa</Text>
          <Text style={styles.datosUser}>20.123.321-k</Text>
        </View>
      </View>
              {/* ESTRELLAS DE VALORACION */}
      <Rating
        imageSize={20}
        readonly
        startingValue={3.3} // valor inicial
        style={styles.rating}
      />
              {/* TARJETA RESUMEN  */}
              <View style={styles.tarjeta}>
          <View style={styles.fila}>
            <Text>Hola que tal !</Text>
          </View>
          <View style={styles.fila}>
            <Text numberOfLines={1} ellipsizeMode="tail">
              holaBienvenido al sistema de gestión de usuarios de la Universidad
              de La Laguna.uw 
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail">
              Esta es la pagina de perfil de usuario.
            </Text>
            <View>
              <Text>Ganancias de dinero</Text>
              <Text>39.000 CLP</Text>
            </View>
          </View>
        </View>
              {/* LISTADO DE SOLICITUDES CREADAS */}
              {/* LISTADO DE SOLICITUDES REALIZADAS */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingVertical: 30,
  },
  textoPerfil: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20,
    color: "#322E61",
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 20,
  },
  datosUser: {
    fontSize: 20,
    color: "#322E61",
  },
  rating: {
    alignSelf: "flex-start",

    marginLeft: 20,
  },
  summaryCard: {
    marginTop: 20,
  },
  summaryValue: {
    fontWeight: "bold",
  },
  tarjeta: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#322E61',
    //flexDirection: "row",

  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
});
export default Profile;
