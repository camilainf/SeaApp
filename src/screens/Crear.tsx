import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInputMask } from "react-native-masked-text";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getToken } from "../services/storageService";
import { decodeToken } from "../services/tokenService";
import { DecodedToken } from "../types/auth";
import { createService } from "../services/serviceService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const Crear: React.FC<Props> = ({ navigation }) => {

  const [showInfo, setShowInfo] = useState(false);
  const [montoSinFormato, setMontoSinFormato] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      nombreServicio: "",
      categoria: "",
      descripcion: "",
      fechaSolicitud: "",
      horaSolicitud: "",
      direccion: "",
      monto: "",
    },
    validationSchema: Yup.object({
      nombreServicio: Yup.string().required("Requerido"),
      categoria: Yup.string().required("Requerido"),
      descripcion: Yup.string().required("Requerido"),
      fechaSolicitud: Yup.string().required("Requerido"),
      horaSolicitud: Yup.string().required("Requerido"),
      direccion: Yup.string().required("Requerido"),
      monto: Yup.string().required("Requerido"),
    }),
    onSubmit: async (values) => {
      try {
        const token = await getToken();
        if (token) {
          const decodedToken = decodeToken(token) as DecodedToken;
          const idCreador = decodedToken.id;
          const servicio = {
            idCreador,
            ...values,
            monto: montoSinFormato,
            estado: 1,
          };
          const newService = await createService(servicio);
          console.log('Servicio creado:', newService);
          Alert.alert(
            "Servicio creado con éxito.",
            "",
            [
              {
                text: "OK",
                onPress: () => {
                  formik.resetForm();
                  setShowInfo(false);
                  navigation.navigate("Main", { screen: "Home" });
                },
              },
            ]
          );
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        Alert.alert("Error al crear el servicio.");
      }
    },
  });

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleCancelar = () => {
    Alert.alert(
      "Creación del servicio cancelada",
      "",
      [
        {
          text: "OK",
          onPress: () => {
            formik.resetForm();
            setShowInfo(false);
            navigation.goBack();
          },
        },
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Creación de servicio</Text>
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
        value={formik.values.nombreServicio}
        onChangeText={formik.handleChange('nombreServicio')}
        onBlur={formik.handleBlur('nombreServicio')}
        maxLength={40}
        style={[
          styles.input,
          formik.touched.nombreServicio && formik.errors.nombreServicio ? styles.inputError : null
        ]}
      />

      <Text style={styles.label}>
        Categoría{"  "}
        <FontAwesome name="tag" size={16} color="#4E479A" />
      </Text>
      <View style={[
        styles.pickerContainer,
        formik.touched.categoria && formik.errors.categoria ? styles.inputError : null
      ]}>
        <Picker
          selectedValue={formik.values.categoria}
          onValueChange={(itemValue) => formik.setFieldValue("categoria", itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Categoria 1" value="cat1" />
          <Picker.Item label="Categoria 2" value="cat2" />
          {/* Agrega más categorías según lo necesites */}
        </Picker>
      </View>

      <Text style={styles.label}>
        Descripción{"  "}
        <FontAwesome name="pencil-square-o" size={16} color="#4E479A" />
      </Text>
      <TextInput
        placeholder="Descripción del servicio"
        value={formik.values.descripcion}
        onChangeText={formik.handleChange("descripcion")}
        onBlur={formik.handleBlur("descripcion")}
        multiline
        numberOfLines={4}
        maxLength={120}
        style={[
          styles.input,
          formik.touched.descripcion && formik.errors.descripcion ? styles.inputError : null
        ]}
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
            value={formik.values.fechaSolicitud}
            onChangeText={(value) => formik.setFieldValue("fechaSolicitud", value)}
            onBlur={formik.handleBlur("fechaSolicitud")}
            style={[
              styles.input,
              formik.touched.fechaSolicitud && formik.errors.fechaSolicitud ? styles.inputError : null
            ]}
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
            value={formik.values.horaSolicitud}
            onChangeText={(value) => formik.setFieldValue("horaSolicitud", value)}
            onBlur={formik.handleBlur("horaSolicitud")}
            style={[
              styles.input,
              formik.touched.horaSolicitud && formik.errors.horaSolicitud ? styles.inputError : null
            ]}
          />
        </View>
      </View>

      <Text style={styles.label}>
        Dirección del servicio{"  "}
        <FontAwesome name="map-marker" size={16} color="#4E479A" />
      </Text>
      <TextInput
        placeholder="Ejemplo: Calle Falsa 123"
        value={formik.values.direccion}
        onChangeText={formik.handleChange("direccion")}
        onBlur={formik.handleBlur("direccion")}
        style={[
          styles.input,
          formik.touched.direccion && formik.errors.direccion ? styles.inputError : null
        ]}
      />

      <Text style={styles.label}>
        Monto del servicio{"  "}
        <FontAwesome name="money" size={16} color="#4E479A" />
      </Text>
      <TextInputMask
        type={"money"}
        options={{
          precision: 0, // Sin decimales
          separator: '.', // Separador de miles
          delimiter: '.', // Separador decimal (no se usará debido a precision: 0)
          unit: '$',
          suffixUnit: ''
        }}
        maxLength={18}
        placeholder="$0"
        value={formik.values.monto}
        onChangeText={(text, rawText) => {
          formik.setFieldValue("monto", text);
          setMontoSinFormato(Number(rawText));
        }}
        style={[
          styles.input,
          formik.touched.monto && formik.errors.monto ? styles.inputError : null
        ]}
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
          onPress={handleCancelar}
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
          onPress={() => formik.handleSubmit()}
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
    marginLeft: 10,
    padding: 10, // Añade un padding
  },

  infoBox: {
    backgroundColor: "#F3F6FF", // Cambia esto al color de fondo deseado
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
    flex: 1, // Ocupa todo el espacio vertical disponible
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
  inputError: {
    borderColor: 'red',
  },
  pickerContainer: {
    height: 50,
    borderColor: "#E1E1E6", // Borde más sutil.
    borderWidth: 1,
    paddingHorizontal: 12, // Un poco más de padding horizontal.
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#F3F6FF",
    color: "#6B6B7D", // Asegúrate de que tenga los mismos estilos que los TextInput
    justifyContent: 'center', // Para centrar el contenido verticalmente
  },

});

export default Crear;
