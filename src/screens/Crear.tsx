import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import { TextInputMask } from "react-native-masked-text"; // Importamos la biblioteca
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Crear: React.FC = () => {
  const [nombreServicio, setNombreServicio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [horaSolicitud, setHoraSolicitud] = useState("");
  const [direccion, setDireccion] = useState("");
  const [monto, setMonto] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const toggleModal = (message: string) => {
    Alert.alert(message);
    setModalVisible(!isModalVisible);
  };

  const guardar = () => {
    const servicio = {
      nombreServicio,
      categoria,
      descripcion,
      fechaSolicitud: `${fechaSolicitud} ${horaSolicitud}`,
      direccion,
      monto,
    };
    console.log(servicio);
    toggleModal("Servicio creado con éxito");
  };

  const cancelar = () => {
    toggleModal("Creación del servicio cancelada");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Creación de solicitud</Text>
        <TouchableOpacity onPress={toggleInfo} style={styles.infoIcon}>
          <FontAwesome name="info-circle" size={24} color="#44B1EE" />
        </TouchableOpacity>
      </View>

      {showInfo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            En este apartado podrás crear una solicitud de servicio que
            necesites, en donde es necesario que agregues el{" "}
            <Text style={styles.bold}>nombre del servicio</Text>, la{" "}
            <Text style={styles.bold}>categoría</Text> de este, para poder
            identificarlo mejor, su <Text style={styles.bold}>descripción</Text>
            , donde es importante que se especifiquen todos los puntos, la{" "}
            <Text style={styles.bold}>fecha y hora</Text> del servicio, la{" "}
            <Text style={styles.bold}>dirección</Text> de donde quieres que se
            ejecute (en caso de no ser presencial, puedes escribirlo aquí
            mismo), por último, agregar el{" "}
            <Text style={styles.bold}>monto</Text> que propones y una{" "}
            <Text style={styles.bold}>imagen del servicio</Text> referente. ⭐️
          </Text>
        </View>
      )}
      <View style={styles.separator} />

      <Text style={styles.label}>
        Nombre del servicio{"  "}
        <FontAwesome name="briefcase" size={16} color="#4E479A" />
      </Text>
      <TextInput
        placeholder="Ejemplo: Corte de pasto"
        value={nombreServicio}
        onChangeText={setNombreServicio}
        style={styles.input}
      />

      <Text style={styles.label}>
        Categoría{"  "}
        <FontAwesome name="tag" size={16} color="#4E479A" />
      </Text>
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue.toString())}
        style={styles.picker}
      >
        <Picker.Item label="Categoria 1" value="cat1" />
        <Picker.Item label="Categoria 2" value="cat2" />
        {/* Agrega más categorías según lo necesites */}
      </Picker>

      <Text style={styles.label}>
        Descripción{"  "}
        <FontAwesome name="pencil-square-o" size={16} color="#4E479A" />
      </Text>
      <TextInput
        placeholder="Descripción del servicio"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>
            Fecha{"  "}
            <FontAwesome name="calendar" size={16} color="#4E479A" />
          </Text>
          <TextInputMask
            type={"datetime"}
            options={{
              format: "DD/MM/YY",
            }}
            placeholder="DD/MM/YY"
            value={fechaSolicitud}
            onChangeText={setFechaSolicitud}
            style={styles.input}
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>
            Hora{"  "}
            <FontAwesome name="clock-o" size={16} color="#4E479A" />
          </Text>
          <TextInputMask
            type={"datetime"}
            options={{
              format: "HH:MM",
            }}
            placeholder="HH:MM"
            value={horaSolicitud}
            onChangeText={setHoraSolicitud}
            style={styles.input}
          />
        </View>
      </View>

      <Text style={styles.label}>
        Dirección del servicio{"  "}
        <FontAwesome name="map-marker" size={16} color="#4E479A" />
      </Text>
      <TextInput
        placeholder="Ejemplo: Calle Falsa 123"
        value={direccion}
        onChangeText={setDireccion}
        style={styles.input}
      />

      <Text style={styles.label}>
        Monto del servicio{"  "}
        <FontAwesome name="money" size={16} color="#4E479A" />
      </Text>
      <TextInput
        placeholder="0$"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>
        Imagen de servicio{"  "}
        <FontAwesome name="image" size={16} color="#4E479A" />
      </Text>
      <TouchableOpacity
        onPress={() => console.log("Se presionó botón de imagen")}
        style={{
          backgroundColor: "#80AAD4",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white" }}>Selecciona una imagen</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={cancelar}
          style={{
            backgroundColor: "#FF6B6B",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>CANCELAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={guardar}
          style={{
            backgroundColor: "#44B1EE",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>GUARDAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row", // Alinea los elementos en una fila horizontal
    alignItems: "center", // Centra verticalmente los elementos
    justifyContent: 'space-between', // Alinea los elementos en el espacio disponible

  },
  header: { // Permite que el texto ocupe todo el espacio disponible
    fontSize: 25,
    fontWeight: "bold",
    color: "#4E479A",
    //marginStart:50
  },
  infoIcon: {
    marginLeft: 10, // Agrega espacio entre el texto y el icono
  },
  infoBox: {
    backgroundColor: "#F0F0F0", // Cambia esto al color de fondo deseado
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#5F5C7D",
  },
  separator: {
    height: 1,
    backgroundColor: "#D3D3D8", // Color más sutil para el separador.
    marginVertical: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 10, // Un poco menos de espacio entre el label y el input.
    fontSize: 16,
    color: "#4E479A", // Color más oscuro para los labels.
  },
  input: {
    height: 50,
    borderColor: "#E1E1E6", // Borde más sutil.
    borderWidth: 1,
    paddingHorizontal: 12, // Un poco más de padding horizontal.
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#F3F6FF",
    color: "#6B6B7D", // Color para el texto dentro de los inputs.
  },
  picker: {
    height: 50,
    borderColor: "#E1E1E6",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    color: "#6B6B7D", // Color para el texto dentro del picker.
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 40,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  roundedButton: {
    borderRadius: 10, // Ajusta el valor según la cantidad de redondeo deseada
  },
  bold: {
    fontWeight: "bold",
  },
});

export default Crear;
