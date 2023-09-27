import React from "react";
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
} from "react-native";
import { Rating, Card } from "react-native-elements";
import { convertirFecha } from "../services/randomService";
import { Usuario } from "../resources/user";

const Profile: React.FC = () => {
  const UsuarioPerfil: Usuario = {
    id: 1,
    nombre: "Juan",
    apellidos: "Pérez",
    rut: "12345678-9",
    contraseña: "1234",
    email: "sebastian.moyano.r@mail.pucv.cl",
    fechaDeNacimiento: "23/45/1980",

    calificacion: 4.5,
  };
  const mostrarTextoCompleto = (texto: string) => {
    Alert.alert("Email completo", texto);
  };
  const esPerfilPersonal = true; // Crear funcion que valide que este es el usuario de este perfil
  
  const gananciaDinero = 4300; //
  const solicitudesCreadass = [
    {
      id: "1",
      titulo: "Promotor de departamentos",
      fecha: "22/06/24",
      imagen: require("../../assets/iconos/ImageReferencia.png"),
    },
    {
      id: "2",
      titulo: "Quiropraxia a domicilio",
      fecha: "04/12/21",
      imagen: require("../../assets/iconos/ImageReferencia.png"),
    },
  ];
  type FechaObjeto = {
    id: string;
    titulo: string;
    fecha: string;
    imagen: any; // Considera especificar un tipo más preciso para 'imagen'
  };
  const solicitudesCreadas: FechaObjeto[] = [];
  const solicitudesAceptadas = [
    {
      id: "1",
      titulo: "Profesor particular de matematicas",
      fecha: "22/06/24",
      imagen: require("../../assets/iconos/ImageReferencia.png"),
    },
    {
      id: "2",
      titulo: "TENGO MIEDOOOOOAODJOIASDOAJDOIASIJDAOSJDIOADOAJSDOAJSDAOS",
      fecha: "04/12/21",
      imagen: require("../../assets/iconos/ImageReferencia.png"),
    },
    {
      id: "3",
      titulo: "Quiropraxia a domicilio",
      fecha: "04/12/21",
      imagen: require("../../assets/iconos/ImageReferencia.png"),
    },
    {
      id: "4",
      titulo: "Quiropraxia a domicilio",
      fecha: "04/12/21",
      imagen: require("../../assets/iconos/ImageReferencia.png"),
    },
  ];
  const numeroSolicitudesCreadas = solicitudesCreadas.length; //Valor de solicitudes creadas
  const numeroSolicitudesAceptadas = solicitudesAceptadas.length; //Valor de solicitudes recibidas

  const SinSolicitudes = () => (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Un simple círculo con un ícono/texto dentro */}
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 50,
          backgroundColor: "#EEF2FF",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 30, color: "#4E479A" }}>!</Text>
      </View>

      <Text
        style={{
          textAlign: "center",
          marginVertical: 5,
          fontSize: 18,
          color: "#4E479A",
        }}
      >
        Aun no hay solicitudes en este momento.
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* TEXTO DE PERFIL */}
      <View>
        <Text style={styles.textoPerfil}>Perfil</Text>
      </View>
      {/* INFORMACION USUARIO */}
      <View style={styles.profileSection}>
        <View style={styles.profileSection}>
          {UsuarioPerfil.imagenDePerfil ? (
            <Image
              source={{ uri: UsuarioPerfil.imagenDePerfil }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require("../../assets/iconos/usericon.png")}
              style={styles.profileImage}
            />
          )}
        </View>
        <View style={styles.userInfo}>
          <View style={styles.infoLine}>
            <Text style={styles.textoDatosUser}>Nombre: </Text>
            <Text style={styles.datosUser}>{UsuarioPerfil.nombre}</Text>
          </View>

          <View style={styles.infoLine}>
            <Text style={styles.textoDatosUser}>Apellido: </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.datosUser}
            >
              {UsuarioPerfil.apellidos}
            </Text>
          </View>

          <View style={styles.infoLine}>
            <Text style={styles.textoDatosUser}>Rut: </Text>
            <Text style={styles.datosUser}>{UsuarioPerfil.rut}</Text>
          </View>

          <View style={styles.infoLine}>
            <Text style={styles.textoDatosUser}>Email: </Text>
            <TouchableOpacity
              onLongPress={() => mostrarTextoCompleto(UsuarioPerfil.email)}
            >
              <Text
                style={styles.datosUser}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {UsuarioPerfil.email}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* ESTRELLAS DE VALORACION */}
      <Rating
        imageSize={20}
        readonly
        startingValue={UsuarioPerfil.calificacion} // valor inicial
        style={styles.rating}
      />
      {/* TARJETA RESUMEN  */}
      {esPerfilPersonal && (
        <View style={styles.tarjetaResumen}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#4E479A",
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
                <Text style={styles.textoSolicitudes}>Solicitudes creadas</Text>
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
                  Solicitudes Agendadas
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
          width: "100%",
        }}
      ></View>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            marginBottom: 8,
            paddingLeft: 15,
            color: "#4E479A",
          }}
        >
          Solicitudes creadas
        </Text>
        {solicitudesCreadas.length === 0 ? (
          <SinSolicitudes />
        ) : (
          <FlatList
            data={solicitudesCreadas}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tarjetaTrabajo}
                onPress={() => {
                  console.log("Tarjeta Trabajo clickeada:", item.titulo);
                }}
              >
                <Image source={item.imagen} style={styles.imagenTrabajo} />
                <View style={{ marginEnd: 90 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ color: "#4E479A", fontWeight: "bold" }}
                  >
                    {item.titulo}
                  </Text>
                  <Text style={{ color: "#4E479A" }}>
                    {convertirFecha(item.fecha)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
      </View>
      {/* LISTADO DE SOLICITUDES REALIZADAS */}
      <View
        style={{
          height: 2,
          backgroundColor: "#EEF2FF", // Color gris claro
          marginVertical: 8, // Margen vertical para espacio arriba y abajo
          width: "100%",
        }}
      ></View>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            marginBottom: 10,
            paddingLeft: 15,
            color: "#4E479A",
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
                  console.log("Tarjeta Trabajo clickeada:", item.titulo);
                }}
              >
                <Image source={item.imagen} style={styles.imagenTrabajo} />
                <View style={{ marginEnd: 90 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ color: "#4E479A", fontWeight: "bold" }}
                  >
                    {item.titulo}
                  </Text>
                  <Text style={{ color: "#4E479A" }}>
                    {convertirFecha(item.fecha)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  // Informacion de usuario
  textoPerfil: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 2,
    color: "#322E61",

  },
  infoLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8, // Puedes ajustar este valor para dar espacio entre las líneas
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
    paddingEnd: 30,
    paddingTop:20,
  },
  datosUser: {
    fontSize: 16,
    color: "#322E61",
  },
  textoDatosUser: {
    fontSize: 16,
    color: "#322E61",
    fontWeight: "bold",
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
    fontWeight: "400",
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
  // Tarjeta de solicitudes
  tarjetaSolicitudes: {
    padding: 16,
    backgroundColor: "#F3F6FF",
    borderRadius: 8,
    marginBottom: 16,
  },

  tarjetaTrabajo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F6FF",
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
