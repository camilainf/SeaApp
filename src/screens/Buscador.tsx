import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes/NavigatorTypes';
import { ServicioData } from '../resources/service';
import { UsuarioCasted } from '../resources/user';
import { getAllServices } from '../services/serviceService';
import { getAllUsers } from '../services/userService';

type BuscadorRouteProp = RouteProp<RootStackParamList, 'Buscador'>;

const BuscadorScreen: React.FC = ({ }) => {

    const route = useRoute<BuscadorRouteProp>();

    // Recibe el término de búsqueda desde los parámetros de la ruta
    const initialSearchTerm = route.params?.keyword || '';

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const searchIcon = require('../../assets/iconos/Search.png');
    const serviceIcon = require('../../assets/iconos/ImageReferencia.png')

    const [servicios, setServicios] = useState<ServicioData[]>([]);
    const [usuarios, setUsuarios] = useState<UsuarioCasted[]>([]);

    useEffect(() => {
        // Obtener todos los servicios
        getAllServices()
            .then(data => {
                setServicios(data);
            })
            .catch(error => {
                console.error("Error al obtener los servicios:", error);
            });

        // Obtener todos los usuarios
        getAllUsers()
            .then(data => {
                setUsuarios(data);
            })
            .catch(error => {
                console.error("Error al obtener los usuarios:", error);
            });
    }, []); // El array vacío indica que este useEffect se ejecutará solo una vez, cuando el componente se monte

    const usuariosModificados = usuarios.map(u => ({ ...u, id: `usuario-${u._id}` }));
    const serviciosModificados = servicios.map(s => ({ ...s, id: `servicio-${s.id}` }));

    const allData = [...usuariosModificados, ...serviciosModificados];
    const searchResults = searchTerm.trim() !== ''
        ? allData.filter(item =>
            'nombreServicio' in item
                ? item.nombreServicio.toLowerCase().includes(searchTerm.toLowerCase())
                : item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleNavigationToResult = () => {
        console.log("Navegado a la cosa seleccionada")
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
                            console.log('Resultado clickeado:', 'nombreServicio' in item ? item.nombreServicio : item.name);
                            handleNavigationToResult();
                        }}>
                            <Image source={serviceIcon} style={styles.imagenTrabajo} />
                            <Text>{'nombreServicio' in item ? item.nombreServicio : item.name}</Text>
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
