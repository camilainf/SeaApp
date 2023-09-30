import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";
import { LinearGradient } from "expo-linear-gradient";
import * as authService from "../services/authService";


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

  const handleLogin = async () => {
    try {
      const data = await authService.login({ email, password });
      console.log(data);
      Alert.alert("Inicio de sesión exitoso", "Bienvenido!");
      navigation.navigate("Main", { screen: "Home" });
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al iniciar sesión.");
    }
  };


  const handleNavigationToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <LinearGradient
      colors={["#5ABEF6", "#2476D3", "#0F4FC2"]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.card}>
        <View style={styles.logoImagen}>
          <Image
            source={require("../../assets/seaJoblogo.png")} // Ajusta la ruta de acuerdo a tu estructura de directorios
            style={styles.logo} // Ajusta el tamaño de acuerdo a tus necesidades
            resizeMode="contain" // Esto asegura que la imagen se ajuste manteniendo la relación de aspecto
          />
        </View>

        <Text style={styles.textoBienvenidos}>Bienvenid@!</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
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
    // Esto hace que el contenedor ocupe todo el espacio disponible en la pantalla
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
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
