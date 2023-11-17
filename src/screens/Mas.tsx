import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Alert, RefreshControl, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getUserIdFromToken, logout } from '../services/authService';
import { deactivateUser, getUserById } from '../services/userService';
import { UsuarioCasted } from '../resources/user';
import { useAlert } from '../context/AlertContext';

interface Props {
  navigation: any;
}

const Mas: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<UsuarioCasted>();
  const [userId, setUserId] = useState<string>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showAlert } = useAlert();

  const obtenerUsuarioActual = async () => {
    try {
      const userId = await getUserIdFromToken();
      if (userId) {
        const user = await getUserById(userId);
        setUser(user);
        setUserId(userId);
      }
    } catch (error) {
      console.error("Error al obtener el userId:", error);
    }
  }

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await obtenerUsuarioActual();
    } catch (error) {
      console.error('Error al refrescar:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
      return () => {
      };
    }, [onRefresh])
  );

  const handleButtonPress = (title: string) => {
    switch (title) {
      case "Desconectarse":
        showAlert(
          "Cerrar sesión",
          "¿Estás seguro que deseas cerrar sesión?",
          async () => {
            try {
              logout();
              navigation.navigate("Auth");

            } catch (error) {
              console.error('Error al desactivar la cuenta del usuario:', error);
              showAlert('Ups 😥', 'Hubo un error al intentar cerrar la sesión, intenta en unos minutos.');
            }
          },
          undefined,
          "Cerrar",
          "Desconectarse"
        );
        break;
      case "Editar datos personales":
        navigation.navigate('EditarPerfil', { userId: userId });
        break;
      case "Desactivar cuenta":
        showAlert(
          "Eliminar cuenta ❗",
          "¿Estás seguro de que quieres eliminar tu cuenta? Tu cuenta pasará a un estado inactivo y esta acción no se puede deshacer.",
          async () => {
            try {
              if (userId) {
                await deactivateUser(userId);
                logout();
                navigation.navigate("Auth");
              }
            } catch (error) {
              console.error('Error al desactivar la cuenta del usuario:', error);
              showAlert('Error ⛔', 'No se pudo desactivar la cuenta. Por favor, inténtalo de nuevo.');
            }
          },
          undefined,
          "Cancelar",
          "Eliminar cuenta"
        );
        break;
      default:
        showAlert(title, "");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container}>
        <Card style={styles.userCard}>
          <Card.Content style={styles.userContent}>
            <Avatar.Image size={50} source={{ uri: user?.imagenDePerfil }} style={styles.userFoto} />
            <Title numberOfLines={1}
    ellipsizeMode="tail" style={styles.userName}>{user?.nombre} {user?.apellidoPaterno}</Title>
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
          icon="account-remove"
          onPress={() => handleButtonPress('Desactivar cuenta')}>
          Desactivar cuenta
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          icon="logout"
          onPress={() => handleButtonPress('Desconectarse')}>
          Desconectarse
        </Button>
      </View>
    </ScrollView>
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
    backgroundColor: 'white',
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  userName: {
    marginLeft: 10,
    width: '80%',
    
  },
  userFoto: {
    backgroundColor: '#44B1EE',
  },
  button: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#44B1EE',
    elevation: 3,
    shadowColor: "#000",
  }
});

export default Mas;
