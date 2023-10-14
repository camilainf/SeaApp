import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes/NavigatorTypes';
import { ServicioData } from '../resources/service';
import { UsuarioCasted } from '../resources/user';
import { getAllServices } from '../services/serviceService';
import { getAllUsers } from '../services/userService';
import TarjetaServicioYPerfil from '../components/TarjetaServicioYPerfil';
import { StackNavigationProp } from "@react-navigation/stack";
import { getUserIdFromToken } from '../services/authService';
import Buscador from '../components/Buscador';

type Props = {
    navigation: BuscadorNavigationProp;
    route: BuscadorRouteProp;
};

type BuscadorNavigationProp = StackNavigationProp<RootStackParamList, 'Buscador'>;
type BuscadorRouteProp = RouteProp<RootStackParamList, 'Buscador'>;


const BuscadorScreen: React.FC<Props> = ({ navigation }) => {

    const route = useRoute<BuscadorRouteProp>();

    // Recibe el término de búsqueda desde los parámetros de la ruta
    const initialSearchTerm = route.params?.keyword || '';

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
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

    const usuariosModificados = usuarios.map(u => ({ ...u, id: `${u._id}` }));
    const serviciosModificados = servicios.map(s => ({ ...s, id: `${s.id}` }));
    const allData = [...usuariosModificados, ...serviciosModificados];

    const filterBySearchTerm = (item: ServicioData | UsuarioCasted) => {
        const term = searchTerm.toLowerCase();
        if ('nombreServicio' in item) {
            // Es un servicio
            const serviceNameMatches = item.nombreServicio.toLowerCase().includes(term);
            const categoryMatches = item.categoria.toLowerCase().includes(term);
            return serviceNameMatches || categoryMatches;
        } else {
            // Es un usuario
            return item.nombre.toLowerCase().includes(term);
        }
    };

    const searchResults = searchTerm.trim() !== ''
        ? allData.filter(filterBySearchTerm)
        : [];

    const handleNavigationToResult = async (item: ServicioData | UsuarioCasted) => {
        if ('nombreServicio' in item) {
            // Es un servicio
            navigation.navigate('Servicio', { id: item.id });
        } else {
            // Es un usuario
            const userIdFromToken = await getUserIdFromToken();
            if (item._id === userIdFromToken) {
                // Es el perfil propio
                navigation.navigate('Main', {
                    screen: 'Perfil',
                    params: { id: item._id },
                } as any);

            } else {
                // Es un perfil ajeno
                navigation.navigate('PerfilAjeno', { id: item._id });
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Buscador */}
            <View style={{ paddingHorizontal: 20 }}>
                <Buscador
                    onSearch={(term) => {
                        setSearchTerm(term);
                        console.log('Ícono de búsqueda clickeado');
                    }}
                    initialValue={initialSearchTerm}
                />
            </View>

            {/* Resultados */}
            {searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => {
                        const itemType = 'nombreServicio' in item ? 'servicio' : 'usuario';
                        return (
                            <TouchableOpacity onPress={() => {
                                console.log('Resultado clickeado:', 'nombreServicio' in item ? item.nombreServicio : item.nombre);
                                handleNavigationToResult(item);
                            }}>
                                <TarjetaServicioYPerfil item={item} type={itemType} />
                            </TouchableOpacity>
                        );
                    }}
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
