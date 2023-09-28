import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes/NavigatorTypes';

type BuscadorRouteProp = RouteProp<RootStackParamList, 'Buscador'>;

const BuscadorScreen: React.FC = () => {

    const route = useRoute<BuscadorRouteProp>();

    // Recibe el término de búsqueda desde los parámetros de la ruta
    const initialSearchTerm = route.params?.keyword || '';

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const searchIcon = require('../../assets/iconos/Search.png');

    // Ejemplo de arreglos de datos para búsqueda
    const usuarios = [
        { id: '1', nombre: 'Camila Escobedo' },
        { id: '2', nombre: 'Sebastian Moyano' },
        { id: '3', nombre: 'CaSe Escoyano' },
    ];

    const servicios = [
        { id: '1', nombre: 'Jardineria en verano' },
        { id: '2', nombre: 'Pasear perro puddle' },
        { id: '3', nombre: 'Cuidar niño chico' },
        { id: '4', nombre: 'Programar pagina web' },
    ];

    const categorias = [
        { id: '1', nombre: 'Jardineria' },
        { id: '2', nombre: 'Paseador de perro' },
        { id: '3', nombre: 'Cocinero' },
        { id: '4', nombre: 'Programación' },
    ];

    const allData = [...usuarios, ...servicios, ...categorias];

    const searchResults = allData.filter(item => item.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <View style={styles.container}>
            {/* Buscador */}
            <View style={styles.buscadorContainer}>
                <TextInput
                    placeholder={searchTerm || "¿Qué buscas?"}
                    style={styles.buscadorTexto}
                    placeholderTextColor="#AEBFFB"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <TouchableOpacity onPress={() => {
                    console.log('Ícono de búsqueda clickeado');
                }}>
                    <Image source={searchIcon} style={styles.iconoLupa} />
                </TouchableOpacity>
            </View>

            {/* Resultados */}
            {searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => (
                        <View style={styles.resultItem}>
                            <Text>{item.nombre}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={styles.noResultsText}>No hay resultados</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },

    buscadorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F6FF',
        borderRadius: 50,
        marginBottom: 16,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginVertical: 30,
    },

    buscadorTexto: {
        fontSize: 16,
        flex: 1,
    },

    iconoLupa: {
        width: 28,
        height: 28,
    },

    resultItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },

    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#888',
    },
});

export default BuscadorScreen;
