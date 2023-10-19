import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { UsuarioCasted } from '../resources/user';

type TarjetaSuperiorHomeProps = {
    usuario: UsuarioCasted | undefined;
    ganancia: number;
};

const TarjetaSuperiorHome: React.FC<TarjetaSuperiorHomeProps> = ({ usuario , ganancia}) => {
    const defaultFotoPerfil = require('../../assets/iconos/UserProfileRegistro.png');
    const imagenPerfil = usuario?.imagenDePerfil ? { uri: usuario.imagenDePerfil } : defaultFotoPerfil;
    const logo = require('../../assets/seaJoblogo.png');
    
    return (
        <View style={styles.tarjeta}>
            {/* Logo y foto de perfil */}
            <View style={styles.fila}>
                <View style={styles.containerLogo}>
                    <Image source={logo} style={styles.logo} />
                </View>
                <View style={styles.containerSaludo}>
                    <Text style={styles.saludo}>Hola {usuario?.nombre}!</Text>
                </View>
            </View>

            {/* Saludo y ganancias */}
            <View style={styles.fila}>
                <View style={styles.containerFoto}>
                    <Image source={imagenPerfil} style={styles.fotoPerfil} />
                </View>

                <View style={styles.containerGanancias}>
                    <Text style={styles.gananciaTexto}>Ganancias de dinero</Text>
                    <Text style={styles.gananciaNumero}>${ganancia}CLP</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tarjeta: {
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 16,
        shadowColor: "#000",
        elevation: 6,
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    containerLogo: {
        width: '40%',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: 30,
        resizeMode: 'contain',
    },
    containerSaludo: {
        width: '60%',
        alignItems: 'center',
    },
    saludo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366',
    },
    containerFoto: {
        width: '40%',
        alignItems: 'center',
    },
    fotoPerfil: {
        width: 110,
        height: 110,
        borderRadius: 60,
        resizeMode: 'cover',
    },
    containerGanancias: {
        alignItems: 'center',
        marginRight: 16,
        width: '60%',
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
        color: 'green',
    },
});

export default TarjetaSuperiorHome;