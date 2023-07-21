import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{
          uri: 'https://loremflickr.com/640/360',
        }}
      />

      <Text style={styles.profileName}>Nombre del usuario</Text>

      <Text style={styles.profileDescription}>
        Este es un ejemplo de descripción de usuario. Aquí puedes poner algo sobre ti, tus intereses, etc.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileDescription: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Profile;
