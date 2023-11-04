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
        backgroundColor: '#02B3FF', 
        borderRadius: 8,
        marginBottom: 20,
        elevation: 6,
    },

    saludoUltimosTrabajos: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white', 
        flex: 1,
        flexWrap: 'wrap', 
    },

    iconoUltimosTrabajos: {
        width: 82,
        height: 82,
        marginRight: 16,
        tintColor: 'white',
    },
});

export default TarjetaUltimosTrabajos;
