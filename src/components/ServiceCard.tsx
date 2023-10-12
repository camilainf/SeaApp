import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ServicioData } from '../resources/service';
import {UsuarioCasted } from '../resources/user';

const defaultImage = require('../../assets/iconos/Default_imagen.jpg');

interface ServiceCardProps {
    item: ServicioData | UsuarioCasted;
    type: 'servicio' | 'usuario';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, type }) => {

    if (type === 'servicio') {
        const servicioItem = item as ServicioData;

        return (
            <View style={styles.serviceCard}>
                <View style={styles.imageColumn}>
                    <Image
                        source={servicioItem.imagen && servicioItem.imagen !== '' ? { uri: servicioItem.imagen } : defaultImage}
                        style={styles.image}
                    />
                </View>
                <View style={styles.infoColumn}>
                    <Text style={[styles.serviceName, styles.textBold]} numberOfLines={2}>{servicioItem.nombreServicio}</Text>
                    <Text style={styles.serviceDescription} numberOfLines={3}>{servicioItem.descripcion}</Text>
    
                    <View style={styles.iconRowContainer}>
                        <View style={styles.iconRow}>
                            <View style={styles.iconColumn}>
                                <FontAwesome name="map-marker" size={16} color="#4593EE" />
                                <FontAwesome name="calendar" size={16} color="#4593EE" style={styles.iconSpacing} />
                            </View>
                            <View style={styles.iconInfoColumn}>
                                <Text style={styles.textBold}>{servicioItem.direccion}</Text>
                                <Text style={styles.textBold}>{servicioItem.fechaSolicitud}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.categoryTag]} numberOfLines={2}>{servicioItem.categoria}</Text>
                </View>
            </View>
        );
    } else {
        const usuarioItem = item as UsuarioCasted;
        const nombreCompleto = [
            usuarioItem.nombre,
            usuarioItem.apellidoPaterno || '',
            usuarioItem.apellidoMaterno || ''
        ].join(' ').trim();
        return (
            <View style={styles.profileCard}>
                <View style={styles.imageColumn}>
                    <Image
                        source={usuarioItem.imagenDePerfil && usuarioItem.imagenDePerfil !== '' ? { uri: usuarioItem.imagenDePerfil } : defaultImage}
                        style={styles.image}
                    />
                </View>
                <View style={styles.infoColumn}>
                    <Text style={[styles.profileName, styles.textBold]} numberOfLines={2}>{nombreCompleto}</Text>
                    <Text style={[styles.profileDescription]} numberOfLines={5}>Esta es una descripción de ejemplo ❤️, soy una persona muy entusiasmada por trabajar ⭐, denme pega por favor 😥, haré bien mi trabajo LO PROMETO LO JURO.</Text>
                </View>
            </View>
        );
    }
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
    serviceCard: {
        flexDirection: 'row',
        backgroundColor: '#EEF9FF',
        marginHorizontal: 15,
        borderRadius: 10,
        padding: 5,
        paddingBottom: 15,
        paddingTop: 15,
        marginBottom: 10,
        justifyContent: 'space-between',
        height: 250, 
    },
    profileCard: {
        flexDirection: 'row',
        backgroundColor: '#EEF9FF',
        marginHorizontal: 15,
        borderRadius: 10,
        padding: 5,
        paddingBottom: 15,
        paddingTop: 15,
        marginBottom: 10,
        justifyContent: 'space-between',
        height: 250,
    },
    imageColumn: {
        width: '40%',
        height: '100%', 
        marginLeft: 5

    },
    image: {
        width: '100%',
        height: '100%', 
        resizeMode: 'cover',
    },
    infoColumn: {
        width: '60%',
        height: '100%', 
        paddingHorizontal: 10,
        justifyContent: 'center', // Centra el contenido verticalmente
    },
    serviceName: {
        fontSize: 18,
        color: '#4593EE',
        height: 40,
        textAlign: 'center',
        overflow: 'hidden',
    },
    serviceDescription: {
        marginVertical: 10,
        height: 70,
        color: '#4593EE',
        textAlign: 'justify',
        overflow: 'hidden',
    },
    iconRowContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    iconRow: {
        flexDirection: 'row',
    },
    iconColumn: {
        width: '13%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconInfoColumn: {
        width: '80%',
        justifyContent: 'space-between',
    },
    textBold: {
        fontWeight: 'bold', 
        color: '#4593EE',
    },
    iconSpacing: {
        marginTop: 20,
    },
    categoryTag: {
        fontSize: 12,
        backgroundColor: '#8DBEEF',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden',
        borderRadius: 10,
        paddingVertical: 5,
        marginTop: 10,
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontWeight: "500",
    },
    profileName: {
        fontSize: 18,
        color: '#4593EE',
        textAlign: 'center',
        overflow: 'hidden',
        marginBottom: 5, // Reduce el margen inferior
    },

    profileDescription: {
        marginTop: 5, // Reduce el margen superior
        color: '#4593EE',
        textAlign: 'justify',
        overflow: 'hidden',
    },

});

export default ServiceCard;
