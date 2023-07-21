// Importación de módulos necesarios
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente de la Página de Inicio
const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a AppServis</Text>
      <Text style={styles.title}>Esta es una prueba</Text>
    </View>
  );
};

// Definición de estilos
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

// Exportación del componente
export default Home;
