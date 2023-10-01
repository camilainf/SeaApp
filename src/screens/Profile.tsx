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
    imagenDePerfil:"https://dims.apnews.com/dims4/default/cd0d974/2147483647/strip/false/crop/2700x2700+0+0/resize/1486x1486!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F52%2F07%2F94c79693022fc6811604e443c418%2Fb73a1555afe8488ea0a6938a6b177eba",
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
      imagen: "http://html-color.org/AEBEED.jpg",
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
      imagen: "https://www.fanaticosdelasmascotas.cl/wp-content/uploads/2021/03/portada-1.png",
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
      imagen: "https://img.europapress.es/fotoweb/fotonoticia_20200329075935_1200.jpg",
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
      imagen: "https://www.65ymas.com/uploads/s1/85/00/69/calos-maxi-profesor-matematicas-tiktok.jpeg",
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
      imagen: "data:image/jpeg;base64,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",
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
      imagen: "https://media.istockphoto.com/id/1182697204/es/foto/elegante-y-guapo-conductor-dando-pulgares-hacia-arriba.jpg?s=612x612&w=0&k=20&c=Ejkw989OevI0iHfssU8_yBYUuvOpCpi-bii7Vts9UQg=",
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
      imagen: "https://www.uc.cl/site/assets/files/15931/700x532.700x532.jpg",
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
        <View >
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
    marginBottom: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 70,
    
    
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
    marginLeft: 15,
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
