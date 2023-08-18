import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomNavbar from '../components/CustomNavbar';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a SeaJob</Text>
      <Text style={styles.title}>Este es el HOME</Text>
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
