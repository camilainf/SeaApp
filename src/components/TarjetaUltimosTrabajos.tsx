import React from 'react';
import { View, Text, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';

type TarjetaUltimosTrabajosProps = {
    onPress: () => void;
};

const TarjetaUltimosTrabajos: React.FC<TarjetaUltimosTrabajosProps> = ({ onPress }) => {
    const serviceIcon = require('../../assets/iconos/Work.png');

    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.tarjetaUltimosTrabajos}>
                <Text style={styles.saludoUltimosTrabajos}>
                    ¡Ve los últimos {"\n"}
                    servicios {"\n"}
                    publicados!
                </Text>
                <Image source={serviceIcon} style={{ ...styles.iconoUltimosTrabajos, tintColor: 'white' }} />
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({

    // VER ULTIMOS TRABAJOS

    tarjetaUltimosTrabajos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#02B3FF', // Color de fondo de la tarjeta
        borderRadius: 8,
        marginBottom: 20,
        elevation: 6,
    },

    saludoUltimosTrabajos: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white', // Color de la letra
        flex: 1, // Asegura que el texto ocupe todo el espacio disponible
        flexWrap: 'wrap', // Permite que el texto se envuelva
    },

    iconoUltimosTrabajos: {
        width: 82,
        height: 82,
        marginRight: 16,
        tintColor: 'white', // Color del icono
    },
});

export default TarjetaUltimosTrabajos;
