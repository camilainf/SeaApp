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
import { convertirFecha } from "../utils/randomService";
import { Usuario } from "../resources/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";
import { ServicioData } from "../resources/service";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};


const Profile: React.FC<Props> = ({ navigation }) => {
  
  const UsuarioPerfil: Usuario = {
    id: 1,
    nombre: "Francisco",
    apellidos: "Fuensalida Fuente alba",
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
  const solicitudesCreadas: ServicioData[] = [
    {
      id: 1,
      idCreador: UsuarioPerfil.id,
      nombreServicio: "Promotor de departamentos  ",
      descripcion: "Se necesita trabajador en el area de promotor de departamentos",
      categoria: "Promotor",
      fechaSolicitud: "23/01/23",
      horaSolicitud: "12:00",
      direccion: "Viña del mar, San alfonso #343",
      monto: 40000,
      imagen: "https://via.placeholder.com/150",
      estado: 1,
    },
    {
      id: 2,
      idCreador: UsuarioPerfil.id,
      nombreServicio: "Paseo de perros",
      descripcion: "Necesito que alguien pasee a mi perro este dia viernes a las ",
      categoria: "Miscelanea",
      fechaSolicitud: "09/10/23",
      horaSolicitud: "12:00",
      direccion: "Viña del mar, San alfonso #343",
      monto: 40000,
      imagen: "https://via.placeholder.com/150",
      estado: 3
    },
    {
      id: 3,
      idCreador: UsuarioPerfil.id,
      nombreServicio: "Quiropraxia a domicilio",
      descripcion: "Se necesita persona con conocimientos en quiropraxia para atender a adulto de 30 años con problemas lumbares",
      categoria: "Kinesiologia",
      fechaSolicitud: "01/12/23",
      horaSolicitud: "12:00",
      direccion: "Valparaiso, Juan gomez con calle Quebrada #23",
      monto: 89000,
      imagen: "https://via.placeholder.com/150",
      estado: 2
    },
  ];
  type FechaObjeto = {
    id: string;
    titulo: string;
    fecha: string;
    imagen: any; // Considera especificar un tipo más preciso para 'imagen'
  };
  //const solicitudesCreadas: FechaObjeto[] = [];
  const solicitudesAceptadas : ServicioData[]= [
    {
      id: 4,
      idCreador: UsuarioPerfil.id,
      nombreServicio: "Profesor particular de matematicas",
      descripcion: "Se necesita profesor que ayude a mi hijo que es medio porro en matematicas",
      categoria: "Pedagogia",
      fechaSolicitud: "03/11/23",
      horaSolicitud: "12:00",
      direccion: "La qubrada del aji #333",
      monto: 40000,
      imagen: "https://via.placeholder.com/150",
      estado: 3
    },
    {
      id: 5,
      idCreador: UsuarioPerfil.id,
      nombreServicio: "Diseñador para pagina web",
      descripcion: "Necesito un diseñador que sepa de como estructurar una pagina web, para el diseño de una",
      categoria: "Diseñador grafico",
      fechaSolicitud: "23/01/22",
      horaSolicitud: "12:00",
      direccion: "Remoto",
      monto: 49832,
      imagen: "https://via.placeholder.com/150",
      estado: 2
    },
    {
      id: 6,
      idCreador: UsuarioPerfil.id,
      nombreServicio: "Conductor privado para gala",
      descripcion: "Necesito urgente alguien que pueda de hace de conductor privado para llevar a mi hija a sus XV",
      categoria: "Conductor",
      fechaSolicitud: "01/01/23",
      horaSolicitud: "12:00",
      direccion: "Gomez carreño, los trigos, #450",
      monto: 15000,
      imagen: "https://via.placeholder.com/150",
      estado: 1
    },
    {
      id: 7,
      idCreador: UsuarioPerfil.id,
      nombreServicio: "Ayudante sobre ramo de anatomia y farmacos",
      descripcion: "Necesito a alguien que sepa sobre la asignatura de anatomia y farmacos para mi examen de este ramo",
      categoria: "Ayudantia",
      fechaSolicitud: "23/09/23",
      horaSolicitud: "12:00",
      direccion: "Quilpue, huechuraba, macul, las condes, cerca del patio italiano #44",
      monto: 9000,
      imagen: "https://via.placeholder.com/150",
      estado: 2
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
          fontWeight: "300",

        }}
      >
        Aun no hay solicitudes en este momento.
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
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
            <Text style={styles.datosUser}>
              <FontAwesome
                name="user"
                size={15}
                color="#4E479A"
                style={{ paddingRight: 5 }}
              />{"  "}
              {/* Espacio de 5 unidades */}
              {UsuarioPerfil.nombre} {UsuarioPerfil.apellidos}
            </Text>
          </View>

          {esPerfilPersonal && (
            <View style={styles.infoLine}>
              <Text style={styles.datosUser}>
                
                <FontAwesome
                  name="id-card"
                  size={15}
                  color="#4E479A"
                  style={{ paddingRight: 5 }}
                />{"  "}
                {UsuarioPerfil.rut}
              </Text>
            </View>
          )}
          <View style={styles.infoLine}>
            <TouchableOpacity
              onLongPress={() => mostrarTextoCompleto(UsuarioPerfil.email)}
            >
              <Text
                style={styles.datosUser}
                numberOfLines={2}
                ellipsizeMode="tail"
              ><FontAwesome
              name="envelope"
              size={15}
              color="#4E479A"
              style={{ paddingRight: 5 }}
            />{"  "}
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
                  console.log("Tarjeta Trabajo clickeada:", item.nombreServicio);
                  navigation.navigate('Servicio', item);

                }}
              >
                <Image source={{uri:item.imagen}} style={styles.imagenTrabajo} />
                <View style={{ marginEnd: 90 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ color: "#4E479A", fontWeight: "bold" }}
                  >
                    {item.nombreServicio}
                  </Text>
                  <Text style={{ color: "#4E479A" }}>
                    {convertirFecha(item.fechaSolicitud)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item.id)}
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
      <View style={{ marginBottom: 20 }}>
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
                  console.log("Tarjeta Trabajo clickeada:", item.nombreServicio);
                  navigation.navigate('Servicio', item);

                }}
              >
                <Image source={{uri:item.imagen}} style={styles.imagenTrabajo} />
                <View style={{ marginEnd: 90 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ color: "#4E479A", fontWeight: "bold" }}
                  >
                    {item.nombreServicio}
                  </Text>
                  <Text style={{ color: "#4E479A" }}>
                    {convertirFecha(item.fechaSolicitud)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item.id)}
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
    paddingTop: 30,
    color: "#322E61",
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
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 20,
    paddingEnd: 30,
    paddingTop: 30,
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
