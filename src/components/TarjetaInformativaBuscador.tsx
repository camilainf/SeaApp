import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TarjetaInformativaBuscador: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePress = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.infoCard}>
            <View style={styles.header}>
                <Text style={styles.boldTitleText}>
                    Explora y conecta
                </Text>
                <MaterialIcons
                    name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color="#FFFFFF"
                    style={styles.iconStyle}
                />
            </View>
            {isExpanded && (
                <View style={styles.content}>
                    <Text style={styles.infoText}>
                        Usa nuestro <Text style={styles.boldText}>buscador</Text> para encontrar los <Text style={styles.boldText}>servicios</Text> que quieras realizar. También puedes encontrar al <Text style={styles.boldText}>trabajador ideal</Text> para tu próxima necesidad. {'\n'}
                        <Text style={styles.boldText}>¡Tu habilidad o el talento que buscas está a solo un clic!</Text>
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    infoCard: {
        backgroundColor: '#90caf9',
        borderRadius: 40,
        padding: 15,
        marginBottom: 10,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: 10,
    },
    infoText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    boldTitleText: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    iconStyle: {
        marginLeft: 8,
    },
});

export default TarjetaInformativaBuscador;
