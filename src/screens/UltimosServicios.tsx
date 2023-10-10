import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getLastServices } from '../services/serviceService';
import { RouteProp, useRoute } from "@react-navigation/native";
import { MainTabParamList, RootStackParamList } from '../routes/NavigatorTypes';
import ServiceCard from '../components/ServiceCard';

type UltimosServiciosProp = RouteProp<RootStackParamList, "UltimosServicios">;

const UltimosServicios: React.FC = () => {

    const route = useRoute<UltimosServiciosProp>();
    const categoria = route.params?.categoria;

    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const flatListRef = useRef<FlatList>(null);
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

    const handleServiceClick = (serviceId: string) => {
        // Aquí puedes implementar la navegación al servicio específico
        // Por ejemplo:
        // navigation.navigate('ServiceDetail', { serviceId });
        console.log(`Service clicked with ID: ${serviceId}`);
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={services}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleServiceClick(item.id)}>
                        <ServiceCard item={item} />
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
