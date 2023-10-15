import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Avatar, Button, Card, Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getUserIdFromToken, logout } from '../services/authService';
import { selectImage } from '../utils/imageUtils';
import { uploadImage } from '../services/imageService';
import { getUserById, updateUserProfilePic } from '../services/userService';
import { UsuarioCasted } from '../resources/user';

interface Props {
  navigation: any;
}

const Mas: React.FC<Props> = ({ navigation }) => {

  const [user, setUser] = useState<UsuarioCasted>();

  const obtenerUsuarioActual = async () => {
    try {
      const userId = await getUserIdFromToken();
      if (userId) {
        const user = await getUserById(userId);
        setUser(user);
      }

    } catch (error) {
      console.error("Error al obtener el userId:", error);
    }
  }

  useEffect(() => {
    obtenerUsuarioActual();
  }, []);

  const handleButtonPress = (title: string) => {
    if (title === "Desconectarse") {
      logout();
      navigation.navigate("Auth");
    } else {
      Alert.alert(title);
    }
  };

  const handleEditProfilePic = async () => {
    // 1. Selecciona la imagen
    const { uri, base64 } = await selectImage();

    if (base64 && user) {
      try {
        // 2. Sube la imagen a Cloudinary
        const newImageUrl = await uploadImage(`data:image/jpeg;base64,${base64}`);

        // 3. Actualiza la base de datos con la nueva URL (aquí necesitas una función para hacerlo)
        await updateUserProfilePic(user._id, newImageUrl); // Asumiendo que tienes una función así

        // 4. Actualiza el estado local (opcional)
        setUser(prevState => ({ ...prevState, imagenDePerfil: newImageUrl } as UsuarioCasted));
      } catch (error) {
        console.error("Error al editar la foto de perfil:", error);
        Alert.alert("Error al editar la foto de perfil.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.userCard}>
        <Card.Content style={styles.userContent}>
          <Avatar.Image size={50} source={{ uri: user?.imagenDePerfil }} style={{ backgroundColor: '#44B1EE' }} />
          <Title style={styles.userName}>{user?.nombre}</Title>
        </Card.Content>
      </Card>

      <Button
        style={styles.button}
        mode="contained"
        icon="account-edit"
        onPress={() => handleButtonPress('Editar datos personales')}>
        Editar datos personales
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        icon="camera"
        onPress={handleEditProfilePic}>
        Editar foto de perfil
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        icon="delete"
        onPress={() => handleButtonPress('Eliminar servicio')}>
        Eliminar servicio
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        icon="pencil"
        onPress={() => handleButtonPress('Editar servicio')}>
        Editar servicio
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        icon="account-remove"
        onPress={() => handleButtonPress('Eliminar cuenta')}>
        Eliminar cuenta
      </Button>

      <Button
        style={styles.button}
        mode="contained"
        icon="logout"
        onPress={() => handleButtonPress('Desconectarse')}>
        Desconectarse
      </Button>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 20,
    backgroundColor: 'white'
  },

  userCard: {
    flexDirection: 'row',
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white'
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    marginLeft: 10
  },
  button: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#44B1EE',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  }
});

export default Mas;
