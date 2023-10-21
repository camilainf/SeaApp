import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Alert, RefreshControl, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getUserIdFromToken, logout } from '../services/authService';
import { getUserById } from '../services/userService';
import { UsuarioCasted } from '../resources/user';

interface Props {
  navigation: any;
}

const Mas: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<UsuarioCasted>();
  const [userId, setUserId] = useState<string>();
  const [isRefreshing, setIsRefreshing] = useState(false);

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
        // Aquí puedes realizar alguna acción cuando la pantalla pierde el foco, si es necesario.
      };
    }, [onRefresh])
  );

  const handleButtonPress = (title: string) => {
    switch (title) {
      case "Desconectarse":
        logout();
        navigation.navigate("Auth");
        break;
      case "Editar datos personales":
        navigation.navigate('EditarPerfil', { userId: userId });
        break;
      default:
        Alert.alert(title);
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
          icon="account-remove"
          onPress={() => handleButtonPress('Desactivar cuenta')}>
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
  }
});

export default Mas;
