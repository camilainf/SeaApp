import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomNavbar: React.FC = () => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.title}>Mi App</Text>
            {/* Aquí puedes agregar otros componentes como botones, iconos, etc. */}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        // Puedes agregar otros estilos para personalizar tu navbar
    },
    title: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CustomNavbar;

