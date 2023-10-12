import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { UsuarioCasted } from '../resources/user';

type TarjetaSuperiorProps = {
    usuario: UsuarioCasted | undefined;
};

const TarjetaSuperior: React.FC<TarjetaSuperiorProps> = ({ usuario }) => {
    const defaultFotoPerfil = require('../../assets/iconos/UserProfileRegistro.png'); // Importa la imagen predeterminada
    const imagenPerfil = usuario?.imagenDePerfil ? { uri: usuario.imagenDePerfil } : defaultFotoPerfil;

    return (
        <View style={styles.tarjetaSuperior}>
            <View style={styles.fila}>
                <Image source={require('../../assets/seaJoblogo.png')} style={styles.logo} />
                <Text style={styles.saludo}>Hola {usuario?.nombre}!</Text>
            </View>
            <View style={styles.fila}>
                <Image source={imagenPerfil} style={styles.fotoPerfil} />
                <View style={styles.gananciasContainer}>
                    <Text style={styles.gananciaTexto}>Ganancias de dinero</Text>
                    <Text style={styles.gananciaNumero}>$39.000 CLP</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tarjetaSuperior: {
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 6,
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    logo: {
        width: 150,
        height: 30,
        resizeMode: 'contain',
    },

    saludo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#66638C',
    },

    fotoPerfil: {
        width: 110,
        height: 110,
        borderRadius: 60,
        resizeMode: 'cover',
    },

    gananciasContainer: {
        alignItems: 'center',
        marginRight: 16,
    },

    gananciaTexto: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: 'left',
        color: '#0182AB',
        marginBottom: 8,
    },

    gananciaNumero: {
        fontSize: 30,
        fontWeight: '400',
        lineHeight: 30,
        letterSpacing: 0,
        textAlign: 'left',
        color: '#47AE64', // Puedes ajustar el tono de verde según prefieras
    },
});

export default TarjetaSuperior;