import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Avatar, Button, Card, Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  navigation: any;
}

const Mas: React.FC<Props> = ({ navigation }) => {
  const user = {
    name: 'Nombre del Usuario',
    image: 'URL_IMAGEN_USUARIO'
  };

  const handleButtonPress = (title: string) => {
    if (title === "Desconectarse") {
      navigation.navigate("Auth");
    } else {
      Alert.alert(title);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.userCard}>
        <Card.Content style={styles.userContent}>
          <Avatar.Image size={50} source={{ uri: user.image }} style={{ backgroundColor: '#44B1EE' }} />
          <Title style={styles.userName}>{user.name}</Title>
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
        onPress={() => handleButtonPress('Editar foto de perfil')}>
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
