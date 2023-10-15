import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import { createUser } from "../services/userService";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";
import { useFormik } from "formik";
import CountryPicker from "react-native-country-picker-modal";
import { uploadImage } from "../services/imageService";
import { selectImage } from "../utils/imageUtils";
import { registroSchema } from "../utils/validations/registroValidations";

type Props = { navigation: StackNavigationProp<RootStackParamList>; };
type CountryCode = "CL";

const Registro: React.FC<Props> = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState<CountryCode>("CL");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [profilePicBase64, setProfilePicBase64] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      imagenDePerfil: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      descripcion: "",
      telefono: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
    validationSchema: registroSchema,
    onSubmit: async (values) => {
      console.log("Inicio de onSubmit", values);
    
      if (!profilePic) {
        // Si no se ha seleccionado una foto de perfil, muestra un Alert
        Alert.alert("Error", "Selecciona una foto de perfil antes de continuar.");
        return; // Evita que la solicitud se envíe
      }
    
      try {
        let imageUrl = profilePic;
        if (profilePicBase64) {
          imageUrl = await uploadImage(`data:image/jpeg;base64,${profilePicBase64}`);
        }
    
        const user = {
          ...values,
          telefono: `+56${values.telefono}`,
          calificacion: 0,
          imagenDePerfil: imageUrl || "",
        };
    
        const newUser = await createUser(user);
        console.log("Usuario creado:", newUser);
        Alert.alert("Usuario creado con éxito.", "", [
          {
            text: "OK",
            onPress: () => {
              formik.resetForm();
              navigation.navigate("Auth");
            },
          },
        ]);
      } catch (error) {
        console.error("Error al crear el usuario:", error);
        Alert.alert("Error al crear el usuario :(");
      }
    },

  });

  const handleNavigationToRegister = () => {
    navigation.navigate("TerminosCondiciones");
  };

  const handleAddProfilePic = async () => {
    const { uri, base64 } = await selectImage();
    if (uri) {
      setProfilePic(uri);
    }
    if (base64) {
      setProfilePicBase64(base64);
    }
  };

  const handleNavigationToLogin = () => {
    navigation.goBack();
  };

  return (

    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#5ABEF6", "#2476D3", "#0F4FC2"]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            zIndex: 1,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={styles.centeredContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Creación de cuenta</Text>

            <View style={styles.profilePicContainer}>
              <Image
                
                source={profilePic ? { uri: profilePic } : require("../../assets/iconos/UserProfileRegistro.png")}
                style={styles.profilePic}
              />
              <TouchableOpacity
                style={styles.addIconContainer}
                onPress={handleAddProfilePic}
              >
                <Text style={styles.addIcon}>+</Text>
              </TouchableOpacity>
            </View>

            <Text>Nombre:</Text>
            <TextInput
              value={formik.values.nombre}
              onChangeText={formik.handleChange("nombre")}
              maxLength={40}
              style={[
                styles.input,
                formik.touched.nombre && formik.errors.nombre
                  ? styles.inputError
                  : null,
              ]}
            />

            <Text>Apellido paterno:</Text>
            <TextInput
              value={formik.values.apellidoPaterno}
              onChangeText={formik.handleChange("apellidoPaterno")}
              maxLength={20}
              style={[
                styles.input,
                formik.touched.apellidoPaterno && formik.errors.apellidoPaterno
                  ? styles.inputError
                  : null,
              ]}
            />

            <Text>Apellido materno:</Text>
            <TextInput
              value={formik.values.apellidoMaterno}
              onChangeText={formik.handleChange("apellidoMaterno")}
              maxLength={20}
              style={[
                styles.input,
                formik.touched.apellidoMaterno && formik.errors.apellidoMaterno
                  ? styles.inputError
                  : null,
              ]}
            />
            <Text>Descripción:</Text>
            <TextInput
              value={formik.values.descripcion}
              onChangeText={formik.handleChange("descripcion")}
              maxLength={250}
              multiline={true}
              numberOfLines={4}
              style={[
                styles.input,
                styles.textArea,
                formik.touched.descripcion && formik.errors.descripcion
                  ? styles.inputError
                  : null,
              ]}
            />
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {formik.errors.descripcion}
              </Text>
            ) : null}

            <Text>Teléfono:</Text>
            <View style={styles.telefonoContainer}>
              <View pointerEvents="none">
                <CountryPicker
                  withFilter
                  withFlag
                  withCountryNameButton
                  withCallingCode
                  withCallingCodeButton
                  countryCode={countryCode}
                  onSelect={(country) => {
                    setCountryCode(country.cca2 as CountryCode);
                  }}
                />
              </View>
              <TextInput
                value={formik.values.telefono}
                onChangeText={formik.handleChange("telefono")}
                maxLength={9}
                keyboardType="number-pad"
                style={[
                  styles.inputTelefono,
                  formik.touched.telefono && formik.errors.telefono
                    ? styles.inputError
                    : null,
                ]}
              />
            </View>

            <Text>Email:</Text>
            <TextInput
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              keyboardType="email-address"
              maxLength={30}
              style={[
                styles.input,
                formik.touched.email && formik.errors.email
                  ? styles.inputError
                  : null,
              ]}
            />
            {formik.touched.email && formik.errors.email ? (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {formik.errors.email}
              </Text>
            ) : null}

            <Text>Contraseña:</Text>
            <TextInput
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              secureTextEntry={true}
              style={[
                styles.input,
                formik.touched.password && formik.errors.password
                  ? styles.inputError
                  : null,
              ]}
            />

            <Text>Repetir Contraseña:</Text>
            <TextInput
              value={formik.values.confirmPassword}
              onChangeText={formik.handleChange("confirmPassword")}
              secureTextEntry={true}
              style={[
                styles.input,
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? styles.inputError
                  : null,
              ]}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {formik.errors.confirmPassword}
              </Text>
            ) : null}

            <View style={styles.checkboxContainer}>
              <View style={{ flexDirection: "row" }}>
                <Checkbox
                  value={formik.values.termsAccepted}
                  onValueChange={(value) =>
                    formik.setFieldValue("termsAccepted", value)
                  }
                />
                <Text
                  style={[styles.checkboxText, styles.linkText]}
                  onPress={handleNavigationToRegister}
                >
                  Aceptar términos y condiciones
                </Text>
              </View>
              {formik.touched.termsAccepted && formik.errors.termsAccepted ? (
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  {formik.errors.termsAccepted}
                </Text>
              ) : null}
            </View>

            <View style={styles.buttonsContainer}>
              <View style={[styles.button, styles.roundedButton]}>
                <Button
                  title="Volver"
                  color="#FF5C5C"
                  onPress={handleNavigationToLogin}
                />
              </View>
              <View style={[styles.button, styles.roundedButton]}>
                <Button
                  title="Crear cuenta"
                  color="#5CB1FF"
                  onPress={() => {
                    // console.log("Errores de Formik:", formik.errors);
                    formik.handleSubmit();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingVertical: 0,
    backgroundColor: "#FFFFFF",
  },
  centeredContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  innerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 30,
    width: "94%",
    margin: 50,
    overflow: "hidden",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#F3F6FF",
    maxWidth: "100%",
    flexShrink: 1,
  },

  checkboxContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },

  checkboxText: {
    marginLeft: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  telefonoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputTelefono: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#F3F6FF",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  roundedButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  addIconContainer: {
    position: "absolute",
    bottom: -3,
    right: 100,
    backgroundColor: "orange",
    borderRadius: 15,
    width: 27,
    height: 27,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  addIcon: {
    fontSize: 20,
    color: "white",
  },
  inputError: {
    borderColor: "red",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Registro;
