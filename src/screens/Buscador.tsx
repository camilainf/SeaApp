import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes/NavigatorTypes';
import { listaCategorias, listaServicios, listaUsuarios } from '../resources/Listas';

type BuscadorRouteProp = RouteProp<RootStackParamList, 'Buscador'>;

const BuscadorScreen: React.FC = ({ }) => {

    const route = useRoute<BuscadorRouteProp>();

    // Recibe el término de búsqueda desde los parámetros de la ruta
    const initialSearchTerm = route.params?.keyword || '';

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const searchIcon = require('../../assets/iconos/Search.png');
    const serviceIcon = require('../../assets/iconos/ImageReferencia.png')

    const usuariosModificados = listaUsuarios.map(u => ({ ...u, id: `usuario-${u.id}` }));
    const serviciosModificados = listaServicios.map(s => ({ ...s, id: `servicio-${s.id}` }));
    const categoriasModificadas = listaCategorias.map(c => ({ ...c, id: `categoria-${c.id}` }));

    const allData = [...usuariosModificados, ...serviciosModificados, ...categoriasModificadas];
    const searchResults = searchTerm.trim() !== '' ? allData.filter(item => item.nombre.toLowerCase().includes(searchTerm.toLowerCase())) : [];

    const handleNavigationToResult = () => {
        console.log("Navegado a la cosa seleccionada")
        // navigation.navigate('screen');
    };

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
                        <TouchableOpacity style={styles.tarjetaTrabajo} onPress={() => {
                            console.log('Resultado clickeado:', item.nombre);
                            handleNavigationToResult(); // AQUI SE DEBE IMPLEMENTAR EL NAVIGATOR A LA VISTA ESPECIFICA DEPENDIENDO DEL TIPO DE ENTIDAD DEL RESULTADO QUE SE CLICKEE
                        }}>
                            {/* Puedes agregar una imagen si la tienes, de lo contrario omite esta línea */}
                            <Image source={serviceIcon} style={styles.imagenTrabajo} />
                            <Text>{item.nombre}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <View>
                    <Text style={styles.noResultsText}>No hay resultados</Text>
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
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
        marginVertical: 5,
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
    tarjetaTrabajo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        marginBottom: 20,
        elevation: 4,
        borderRadius: 8,
    },

    imagenTrabajo: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 16,
    },
});

export default BuscadorScreen;
