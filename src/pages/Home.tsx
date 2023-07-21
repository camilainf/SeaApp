import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a AppServis</Text>
      <Text style={styles.title}>Esta es una prueba</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
