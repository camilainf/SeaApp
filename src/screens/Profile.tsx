import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Rating, Card } from "react-native-elements";

const Profile: React.FC = () => {
  const esPerfilPersonal = true;
  const numeroSolicitudesCreadas = 23; //Valor de solicitudes creadas
  const numeroSolicitudesAceptadas = 1; //Valor de solicitudes recibidas
  const gananciaDinero = 2000; ///
  return (
    <View style={styles.container}>
      {/* TEXTO DE PERFIL */}
      <View>
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
      <View style={styles.tarjetaResumen}>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#4E479A",
              paddingLeft:15
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
                  {numeroSolicitudesCreadas > 99 ? "+99" : numeroSolicitudesCreadas}
                </Text>
              </View>
              <Text style={styles.textoSolicitudes}>Solicitudes creadas</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.numberContainer}>
                <Text style={styles.numberText}>
                  {numeroSolicitudesAceptadas > 99 ? "+99" : numeroSolicitudesAceptadas}
                </Text>
              </View>
              <Text style={styles.textoSolicitudes}>Solicitudes Agendadas</Text>
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
  // Informacion de usuario
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
  // Tarjeta Resunen
  tarjetaResumen: {
    paddingRight: 16,
    paddingTop: 5,
    marginTop: 20,
    backgroundColor: "#FFF",
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
    color: "#4E479A",
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
    color: "#4E479A",
    fontSize: 17,
  },
  numberText: {
    color: "#4E479A",
    fontWeight: "bold",
    fontSize: 30,
    paddingHorizontal: 10,
  },
  gananciaDineroTexto: {
    color: "#4E479A",
    fontWeight: "500",
    fontSize: 15,
  },
  gananciaNumero: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "#47AE64", // Puedes ajustar el tono de verde según prefieras
  },
  numberContainer: {
    width: 75, // Puedes ajustar este valor según la cantidad máxima de dígitos que esperas
    alignItems: "flex-end", // Alinea el texto a la derecha
  },
});
export default Profile;
