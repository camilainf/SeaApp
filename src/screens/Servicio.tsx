import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { convertirFecha } from "../utils/randomService";
import { ServicioProps } from '../resources/service';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes/NavigatorTypes';

type BuscadorRouteProp = RouteProp<RootStackParamList, 'Servicio'>;

const ServicioScreen: React.FC = () => {
  const route = useRoute<BuscadorRouteProp>();
  const servicioCargado = route.params || {};
  const navigation = useNavigation();
  
  const esDueno = true; // Aquí deberías determinar si esDueño es verdadero o falso
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#1C3F70" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{servicioCargado.nombreServicio}</Text>

      <View style={styles.imageContainer}>
        <Image source={{ uri: servicioCargado.imagen }} style={styles.image} />
        <View style={{marginTop:25 ,marginBottom:10}}>
          <Text style={styles.estadoText}>Estado: 1</Text>
        <Text style={styles.categoriaText}>{servicioCargado.categoria}</Text>
        </View>
        
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Descripción:</Text>
        <Text style={styles.descriptionText}>{servicioCargado.descripcion}</Text>
      </View>
      <Text style={styles.date}>
        <FontAwesome name="calendar" size={16} color="#4E479A" />
        {'  '}
        {convertirFecha(servicioCargado.fechaSolicitud)}
      </Text>
      <Text style={styles.address}>
        <FontAwesome name="map-marker" size={16} color="#4E479A" />
        {'  '}
        {servicioCargado.direccion}
      </Text>
      <Text style={styles.amount}>Monto: ${servicioCargado.monto}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{esDueno ? 'Ver ofertas' : 'Ofertar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB', // Un azul claro
    padding: 20,
    paddingTop: 10, // Reduce el espacio superior
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Reduce el espacio después del botón de retroceso
  },
  backButton: {
    marginVertical: 20, // Incrementa espacio debajo del botón de retroceso
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4E479A', // Azul marino
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 320,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,  // Reducir el margen inferior para dar espacio a los textos
  },
  text: {
    fontSize: 16,
    color: '#4E479A',
    marginBottom: 10,
  },
  descriptionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 2,
    
  },
  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#4E479A',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#4E479A',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    color: '#4E479A',
    marginBottom: 10,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    color: '#4E479A',
    marginBottom: 15,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#4E479A',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4E479A',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  estadoText: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    color: 'white',  // Puedes ajustar el color si lo prefieres
    backgroundColor: '#7B72E8',  // Un fondo semi-transparente para mejorar la legibilidad
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  categoriaText: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    color: 'white',
    backgroundColor: '#7B72E8',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  imageContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
});

export default ServicioScreen;
