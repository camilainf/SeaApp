import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

type BuscadorProps = {
    onSearch: (term: string) => void;
    initialValue?: string;
};

const Buscador: React.FC<BuscadorProps> = ({ onSearch, initialValue }) => {
    const [searchTerm, setSearchTerm] = useState(initialValue || '');
    const searchIcon = require('../../assets/iconos/Search.png');

    return (
        <View style={styles.buscadorContainer}>
            <TextInput
                placeholder="¿Qué buscas?"
                style={styles.buscadorTexto}
                placeholderTextColor="#AEBFFB"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <TouchableOpacity onPress={() => {
                if (searchTerm.trim() !== '') {
                    onSearch(searchTerm);
                }
            }}>
                <Image source={searchIcon} style={styles.iconoLupa} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buscadorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F6FF',
        borderRadius: 50,
        marginBottom: 16,
        paddingHorizontal: 30,
        paddingVertical: 10
    },
    iconoLupa: {
        width: 28,
        height: 28,
    },
    buscadorTexto: {
        fontSize: 16,
        flex: 1,
    },
});

export default Buscador;