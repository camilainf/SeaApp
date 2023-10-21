import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ServicioData } from '../resources/service';
import {UsuarioCasted } from '../resources/user';

const defaultImage = require('../../assets/iconos/Default_imagen.jpg');

interface TarjetaProps {
    item: ServicioData | UsuarioCasted;
    type: 'servicio' | 'usuario';
}

const TarjetaServicioYPerfil: React.FC<TarjetaProps> = ({ item, type }) => {

    if (type === 'servicio') {
        const servicioItem = item as ServicioData;

        return (
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#EEF9FF',
                borderRadius: 10,
                padding: 10,
                marginBottom: 20,
                alignItems: 'center',  // Asegura que los elementos están centrados verticalmente
            }}>
                <View style={{ flex: 0.4, alignItems: "flex-start" }}>
                    {/* Imagen del servicio */}
                    <Image
                        source={servicioItem.imagen && servicioItem.imagen !== '' ? { uri: servicioItem.imagen } : defaultImage}
                        style={{ width: 150, height: 150 ,borderRadius:10}}
            resizeMode="contain" 
                    />
                </View>
                <View style={{ flex: 0.6, alignItems: "flex-start", justifyContent: 'space-between', marginStart:10 }}>  
                    {/* texto nombre*/}
                    <View style={{ alignItems: 'center', width: '100%', marginRight: 5}}> 
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: '#4593EE', textAlign: 'center' }}>
                            {servicioItem.nombreServicio}
                        </Text>
                    </View>
                    {/* texto descripcion*/}
                    <View style={{ height: 50 ,marginRight: 1, marginTop:10}}>  
                        <Text numberOfLines={2} style={{ color: "#4593EE" }}>
                            {servicioItem.descripcion}
                        </Text>
                    </View>
                    {/* Zona Direccion/ Fecha / Tag*/}
                    <View>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: '#4593EE', }}>
                            <FontAwesome name="map-marker" size={16} color="#4593EE" /> {" "}
                            {servicioItem.direccion}
                        </Text>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: '#4593EE', marginTop: 10 }}>
                            <FontAwesome name="calendar" size={16} color="#4593EE" /> {" "}
                            {servicioItem.fechaSolicitud}
                        </Text>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: '#4593EE', marginTop: 10 }}>
                            <FontAwesome name="tag" size={16} color="#4593EE" /> {" "}
                            {servicioItem.categoria}
                        </Text>
                    </View>
            
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
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#EEF9FF',
                borderRadius: 20,
                padding: 10,
                marginBottom: 20,
                  // Asegura que los elementos están centrados verticalmente
            }}>
                <View style={{ flex: 0.4, alignItems: "flex-start" }}>
                    {/* Imagen del servicio */}
                    <Image
                        source={usuarioItem.imagenDePerfil && usuarioItem.imagenDePerfil !== '' ? { uri: usuarioItem.imagenDePerfil } : defaultImage}
                        style={{ width: 150, height: 150 ,borderRadius:10}}
            resizeMode="contain" 
                    />
                </View>
                <View style={{ flex: 0.6, alignItems: "flex-start", marginRight: 1, marginTop:20 ,marginStart:10}}>  
                    {/* texto nombre*/}
                    <View style={{ alignItems: 'center', width: '100%' ,marginBottom:15}}> 
                        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: '#4593EE', textAlign: 'center' }}>
                            {usuarioItem.nombre} {usuarioItem.apellidoPaterno} {usuarioItem.apellidoMaterno}
                        </Text>
                    </View>
                    {/* texto descripcion*/}
                    <View >  
                        <Text numberOfLines={8} style={{ color: "#4593EE" ,marginRight: 5,marginBottom:10}}>
                            <FontAwesome name="id-card-o" size={16} color="#4593EE" /> {" "}{usuarioItem.descripcion}
                        </Text>
                    </View>
            
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    
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

export default TarjetaServicioYPerfil;
