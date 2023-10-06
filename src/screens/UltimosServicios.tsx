import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getLastServices } from '../services/serviceService'; // Asegúrate de importar el servicio adecuado

const UltimosServicios: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const defaultImage = require('../../assets/iconos/ImageReferencia.png'); // Ajusta la ruta a tu imagen predeterminada
    const [allLoaded, setAllLoaded] = useState(false); // Nuevo estado para verificar si todos los servicios han sido cargados
    const [isFetching, setIsFetching] = useState(false);


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
            const fetchedServices = await getLastServices(skip);

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

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={services}
                renderItem={({ item }) => (
                    <View style={styles.serviceCard}>
                        <Image
                            source={item.imagen && item.imagen !== '' ? { uri: item.imagen } : defaultImage}
                            style={styles.serviceImage}
                        />
                        <Text>{item.nombreServicio}</Text>
                        <Text>{item.descripcion}</Text>
                    </View>
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
        backgroundColor: '#f5f5f5',
    },
    serviceCard: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    serviceImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
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
});

export default UltimosServicios;
