import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInputMask } from "react-native-masked-text";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getToken } from "../services/storageService";
import { decodeToken } from "../services/tokenService";
import { DecodedToken } from "../types/auth";
import { createService } from "../services/serviceService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";
import { Categoria } from "../resources/category";
import { getAllCategories } from "../services/categoryService";
import { selectImage } from "../utils/imageUtils";
import { uploadImage } from "../services/imageService";
import { Image } from "react-native-elements";
import { crearServicioSchema } from "../utils/validations/crearServicioValidations";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const Crear: React.FC<Props> = ({ navigation }) => {

  const [showInfo, setShowInfo] = useState(false);
  const [montoSinFormato, setMontoSinFormato] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [serviceReferencePic, setServiceReferencePic] = useState<string | null>(null);
  const [serviceReferencePicBase64, setServiceReferencePicBase64] = useState<string | null>(null);
  const montoInputRef = useRef<TextInputMask>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const currentDate = new Date();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getAllCategories();
        const sortedData = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setCategorias(sortedData);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

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
    validationSchema: crearServicioSchema,
    onSubmit: async (values) => {
      try {
        const token = await getToken();

        if (!token) {
          navigation.navigate("Auth");
          return;
        }

        const decodedToken = decodeToken(token) as DecodedToken;
        const idCreador = decodedToken.id;
        console.log("monto sin formato: ", montoSinFormato);
        let imageUrl = serviceReferencePic;
        if (serviceReferencePicBase64) {
          imageUrl = await uploadImage(`data:image/jpeg;base64,${serviceReferencePicBase64}`);
        }

        const servicio = {
          idCreador,
          ...values,
          monto: montoSinFormato,
          estado: 1,
          imagen: imageUrl || "",
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
                setSelectedDate(new Date());
                setShowInfo(false);
                setServiceReferencePic(null);
                setServiceReferencePicBase64(null);
                navigation.navigate("Main", { screen: "Home" });
              },
            },
          ]
        );
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
            setSelectedDate(new Date());
            setShowInfo(false);
            setServiceReferencePic(null);
            setServiceReferencePicBase64(null);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleAddServiceReferencePic = async () => {
    const { uri, base64 } = await selectImage();
    if (uri) {
      setServiceReferencePic(uri);
    }
    if (base64) {
      setServiceReferencePicBase64(base64);
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      // const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().substr(-2)}`;
      formik.setFieldValue("fechaSolicitud", formattedDate);
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowTimePicker(false);
    if (date) {
      setSelectedDate(date);
      const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
      formik.setFieldValue("horaSolicitud", formattedTime);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Creación de servicio</Text>
        <TouchableOpacity onPress={toggleInfo} style={styles.infoIcon}>
          <FontAwesome name="info-circle" size={24} color="#44B1EE" />
        </TouchableOpacity>
      </View>

      {/* Más Información */}
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

      {/* Nombre */}
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

      {/* Categoría */}
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
          <Picker.Item label="Seleccione categoría" value="" />
          {categorias.map((categoria) => (
            <Picker.Item key={categoria.id} label={categoria.nombre} value={categoria.nombre} />
          ))}
        </Picker>


      </View>

      {/* Descripcion */}
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
        maxLength={300}
        style={[
          styles.input,
          formik.touched.descripcion && formik.errors.descripcion ? styles.inputError : null
        ]}
      />

      {/* Horario */}
      <View style={styles.row}>

        {/* Fecha */}
        <View style={styles.column}>
          <Text style={styles.label}>
            Fecha{"  "}
            <FontAwesome name="calendar" size={16} color="#4E479A" />
          </Text>
          <View style={styles.dateTimePickerContainer}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text>{formik.values.fechaSolicitud || "Selecciona una fecha"}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={currentDate}
              />
            )}
          </View>
        </View>

        {/* Hora */}
        <View style={styles.column}>
          <Text style={styles.label}>
            Hora{"  "}
            <FontAwesome name="clock-o" size={16} color="#4E479A" />
          </Text>
          <View style={styles.dateTimePickerContainer}>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Text>{formik.values.horaSolicitud || "Selecciona una hora"}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>
        </View>

      </View>

      {/* Dirección */}
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

      {/* Monto */}
      <Text style={styles.label}>
        Monto del servicio{"  "}
        <FontAwesome name="money" size={16} color="#4E479A" />
      </Text>
      <TextInputMask
        ref={montoInputRef}
        type={"money"}
        options={{
          precision: 0, // Sin decimales
          separator: '.', // Separador de miles
          unit: '$',
          suffixUnit: ''
        }}
        maxLength={19}
        placeholder="$0"
        value={formik.values.monto}
        onChangeText={(text) => {
          formik.setFieldValue("monto", text);
          const rawValue = text.replace(/[^0-9]/g, ''); // Esto elimina todos los caracteres que no sean dígitos
          const numericValue = parseFloat(rawValue);
          if (!isNaN(numericValue)) {
            setMontoSinFormato(numericValue);
          } else {
            console.log("Error al convertir el monto a un número:", rawValue);
          }
        }}
        style={[
          styles.input,
          formik.touched.monto && formik.errors.monto ? styles.inputError : null
        ]}
      />

      {/* Seleccionar imagen de referencia */}
      <Text style={styles.label}>
        Imagen de servicio{"  "}
        <FontAwesome name="image" size={16} color="#4E479A" />
      </Text>
      <TouchableOpacity
        onPress={handleAddServiceReferencePic}
        style={{
          backgroundColor: "#80AAD4",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
      >
        {serviceReferencePic && (
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: serviceReferencePic }}
              style={{ width: '100%', height: 200, marginBottom: 10, alignSelf: 'center' }}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                backgroundColor: 'white',
                borderRadius: 15,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setServiceReferencePic(null);
                setServiceReferencePicBase64(null);
              }}
            >
              <FontAwesome name="times" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        <Text style={{ color: "white", alignSelf: 'center' }}>Selecciona una imagen de referencia</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',

  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#4E479A",
  },
  infoIcon: {
    marginLeft: 10,
    padding: 10,
  },

  infoBox: {
    backgroundColor: "#F3F6FF",
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#5F5C7D",
  },
  separator: {
    height: 1,
    backgroundColor: "#D3D3D8",
    marginVertical: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 16,
    color: "#4E479A",
  },
  input: {
    height: 50,
    borderColor: "#E1E1E6",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#F3F6FF",
    color: "#6B6B7D",
  },
  picker: {
    flex: 1,
    color: "#6B6B7D",
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
    borderRadius: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  inputError: {
    borderColor: 'red',
  },
  pickerContainer: {
    height: 50,
    borderColor: "#E1E1E6",
    borderWidth: 1,
    paddingHorizontal: 0,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#F3F6FF",
    color: "#6B6B7D",
    justifyContent: 'center',
  },
  dateTimePickerContainer: {
    height: 50,
    borderColor: "#E1E1E6",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#F3F6FF",
    color: "#6B6B7D",
    justifyContent: 'center',
  },
});

export default Crear;
