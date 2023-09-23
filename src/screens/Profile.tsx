import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Rating, Card } from "react-native-elements";

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
                {/* TEXTO DE PERFIL */}
      <Text style={styles.textoPerfil}>Perfil</Text>
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
              
        <View style={styles.tarjeta}>
          <View style={styles.fila}>
            <Text>
              Resumen
            </Text>
          </View>
          <View style={styles.fila}>
            <Text>
              hola
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
    padding: 20,
    backgroundColor: "#fff",
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
    width: '90%',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#322E61',
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
});
export default Profile;
