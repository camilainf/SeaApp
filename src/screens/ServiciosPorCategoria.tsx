import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { RootStackParamList } from '../routes/NavigatorTypes';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getServicesByCategory } from '../services/serviceService';
import { ServicioData } from '../resources/service';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};
type ServiciosPorCategoriaRouteProp = RouteProp<RootStackParamList, 'ServiciosPorCategoria'>;

const ServiciosPorCategoria: React.FC<Props> = ({ navigation }) => {

  const route = useRoute<ServiciosPorCategoriaRouteProp>();

  const categoria = route.params?.categoria;
  const [servicios, setServicios] = useState<ServicioData[]>([]);

  useEffect(() => {
    getServicesByCategory(categoria)
      .then(data => setServicios(data))
      .catch(error => console.error("Error al obtener los servicios:", error));
  }, [categoria]);

  return (
    <View>
      <Text>Servicios de la categoría: {categoria}</Text>
      <FlatList
        data={servicios}
        renderItem={({ item }) => <Text>{item.nombreServicio}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />

    </View>
  );
};

export default ServiciosPorCategoria;

