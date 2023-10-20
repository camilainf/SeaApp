import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getLastServices, incrementServiceClick } from '../services/serviceService';
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from '../routes/NavigatorTypes';
import TarjetaServicioYPerfil from '../components/TarjetaServicioYPerfil';
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
    navigation: StackNavigationProp<RootStackParamList>;
};

type UltimosServiciosProp = RouteProp<RootStackParamList, "ListaServicios">;

const ListaServicios: React.FC<Props> = ({ navigation }) => {

    const route = useRoute<UltimosServiciosProp>();
    const categoria = route.params?.categoria;

    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const [allLoaded, setAllLoaded] = useState(false); // Nuevo estado para verificar si todos los servicios han sido cargados
    const [isFetching, setIsFetching] = useState(false);

    const title = categoria ? `Servicios de: ${categoria}` : "Ultimos servicios ⭐️";


    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        if (allLoaded || isFetching) return; // Si ya se está buscando, no hacer nada

        setIsFetching(true);
        setLoading(true);
        const nextSkip = skip + 3; // Calcula el siguiente valor de skip
        setSkip(nextSkip); // Actualiza el valor de skip inmediatamente

        try {
            const fetchedServices = await getLastServices(skip, categoria);

            if (fetchedServices.length < 5) { // Si se devuelven menos de 5 servicios, significa que todos los servicios han sido cargados
                setAllLoaded(true);
            }

            // Filtrar los servicios para evitar duplicados
            const uniqueServices = fetchedServices.filter(
                newService => !services.some(service => service.id === newService.id)
            );

            // Actualizar el estado con los servicios filtrados
            setServices(prevServices => [...prevServices, ...uniqueServices]);
        } catch (error) {
            console.error("Error al obtener los últimos servicios:", error);
        } finally {
            setLoading(false);
            setIsFetching(false);
        }
    };

    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const handleServiceClick = async (service: any) => {

        // Incrementar el contador de clics
        try {
            await incrementServiceClick(service.id);
        } catch (error) {
            console.error("Error al incrementar el contador de clics:", error);
        }

        navigation.navigate("Servicio", service);
    };

    const ListHeader = () => {
        return (
            <>


                {/* Info List */}
                {!categoria && (
                    <View style={styles.infoCard}>
                        <Text style={styles.infoText}>
                            <Text style={styles.boldText}>Descubre</Text> los últimos servicios publicados en
                            <Text style={styles.boldText}> Seajob</Text> y encuentra el que mejor se
                            <Text style={styles.boldText}> adapte</Text> a lo que estás
                            <Text style={styles.boldText}> buscando</Text> 📌.
                        </Text>
                    </View>
                )}
            </>
        );
    };

    return (
        <View style={styles.container}>
            
            {/* Titulo */}
            <Text style={styles.title}>{title}</Text>

            <FlatList
                ref={flatListRef}
                data={services}
                ListHeaderComponent={ListHeader}  // Aquí se añade el componente de encabezado
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleServiceClick(item)}>
                        <TarjetaServicioYPerfil item={item} type="servicio" />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => `${item.id}`}
                onEndReached={fetchServices}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            />
            <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
                <Text style={styles.arrowUp}>↑</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24, // Puedes ajustar el tamaño de fuente según prefieras
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10, // Espaciado vertical para separar el título del FlatList
        color: '#0797FF',
    },
    scrollToTopButton: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        padding: 10,
        backgroundColor: '#0000ff',
        borderRadius: 50,
    },
    arrowUp: {
        color: '#ffffff',
        fontSize: 20,
    },
    infoCard: {
        backgroundColor: '#02B3FF',
        borderRadius: 40, // Redondea las esquinas de la tarjeta
        marginHorizontal: 15, // Margen horizontal para separar la tarjeta de los bordes laterales
        padding: 15, // Espaciado interno de la tarjeta
        marginBottom: 10, // Espaciado inferior para separar la tarjeta del FlatList
    },
    infoText: {
        color: '#FFFFFF', // Color de texto blanco para contrastar con el fondo azul
        fontSize: 16, // Tamaño de fuente
        textAlign: 'center', // Centra el texto horizontalmente
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default ListaServicios;
