import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ServicioProps } from "../resources/service";
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes/NavigatorTypes';

type BuscadorRouteProp = RouteProp<RootStackParamList, 'Servicio'>;

const ServicioScreen: React.FC = () => {
  const route = useRoute<BuscadorRouteProp>();
  const servicioCargado = route.params || {};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{servicioCargado.nombreServicio}</Text>
      <Image source={{ uri: servicioCargado.imagen }} style={styles.image} />
      <Text style={styles.text}>Categoría: {servicioCargado.categoria}</Text>
      <Text style={styles.text}>
        Descripción: {servicioCargado.descripcion}
      </Text>
      <Text style={styles.text}>
        Fecha de Solicitud: {servicioCargado.fechaSolicitud}
      </Text>
      <Text style={styles.text}>Dirección: {servicioCargado.direccion}</Text>
      <Text style={styles.text}>Monto: ${servicioCargado.monto}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ServicioScreen;
