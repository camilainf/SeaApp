import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";
import { LinearGradient } from "expo-linear-gradient";
import * as authService from "../services/authService";
import { getToken } from "../services/storageService";
import { decodeToken } from "../services/tokenService";
import { DecodedToken } from "../types/auth";
import { HttpError } from "../resources/httpError";
import { useAlert } from "../context/AlertContext";
import CustomAlert from "../components/CustomAlert";
import { ActivityIndicator } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Auth"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await authService.login({ email, password });
      const user_token = await getToken();

      if (user_token) {
        const decodedInfo = decodeToken(user_token) as DecodedToken;
        if (decodedInfo) {
          console.log("ID del usuario:", decodedInfo.id);
        }
      }

      showAlert(
        "Inicio de sesión exitoso ✅",
        "Bienvenido!",
        undefined,
        () => navigation.navigate("Main", { screen: "Home" })
      );
      setLoading(false);

    } catch (error) {
      setLoading(false);
      const httpError = error as HttpError;

      let errorMessage = 'Hubo un problema al iniciar sesión.';

      if (httpError.status === 400) {
        errorMessage = 'Esta cuenta ha sido desactivada.';
      } else if (httpError.status > 400 && httpError.status < 500) {
        errorMessage = 'Credenciales incorrectas. Por favor, intenta de nuevo.';
      } else if (httpError.status >= 500) {
        errorMessage = 'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.';
      }
      showAlert("Ups 😥", errorMessage);
    }
  };

  const handleNavigationToRegister = () => {
    navigation.navigate("Registro");
  };

  return (
    <LinearGradient
      colors={["#5ABEF6", "#2476D3", "#0F4FC2"]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <CustomAlert />
      <View style={styles.card}>
        <View style={styles.logoImagen}>
          <Image
            source={require("../../assets/seaJoblogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.textoBienvenidos}>Bienvenid@!</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Ingrese su email"/>

        <Text style={styles.label}>Contraseña:</Text>
        <View style={ {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#F3F6FF',
  }}>
      <TextInput
        style={{
          flex: 1,
          paddingRight: 30, // Asegúrate de tener suficiente espacio para el ícono
        }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!passwordVisible}
        placeholder="Ingrese su contraseña"
      />
      <TouchableOpacity
        onPress={() => setPasswordVisible(!passwordVisible)}
        style={{
          position: 'absolute',
          right: 10, // Ajusta este valor según sea necesario
          height: '100%', // Altura del contenedor para centrar verticalmente
          justifyContent: 'center',
        }}
      >
        <FontAwesome
          name={passwordVisible ? "eye" : "eye-slash"}
          size={20}
          color="grey"
        />
      </TouchableOpacity>
    </View>

        {
          loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          )
        }
        <Text style={styles.footerText}>
          No posees una cuenta?, únete a SeaJob pulsando{" "}
          <Text style={styles.linkText} onPress={handleNavigationToRegister}>
            aquí
          </Text>
          !
        </Text>
      </View>
    </LinearGradient>
  );
};

//Estilos
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImagen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: "80%",
    padding: 20,
    borderRadius: 30,
    backgroundColor: "#FCFCFD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  textoBienvenidos: {
    fontSize: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "grey",
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#F3F6FF"
  },
  passwordInput: {
    marginTop: 8,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  footerText: {
    marginTop: 15,
    textAlign: "center",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Login;
