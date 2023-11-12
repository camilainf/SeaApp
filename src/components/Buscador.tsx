import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Animated } from 'react-native';

type BuscadorProps = {
    onSearch: (term: string) => void;
    initialValue?: string;
    immediateSearch?: boolean;
};

const Buscador: React.FC<BuscadorProps> = ({ onSearch, initialValue, immediateSearch = false }) => {
    const [searchTerm, setSearchTerm] = useState(initialValue || '');
    const opacity = useState(new Animated.Value(0))[0];

    React.useEffect(() => {
        Animated.timing(opacity, {
            toValue: searchTerm ? 1 : 0,
            duration: 240,
            useNativeDriver: true,
        }).start();
    }, [searchTerm, opacity]);

    const handleTextChange = (text: string) => {
        setSearchTerm(text);
        if (immediateSearch) {
            onSearch(text);
        }
    };

    const handleClearInput = () => {
        setSearchTerm('');
        if (immediateSearch) {
            onSearch('');
        }
    };

    return (
        <View style={styles.buscadorContainer}>
            {searchTerm ? (
                <Animated.View style={[styles.clearButton, { opacity }]}>
                    <TouchableOpacity onPress={handleClearInput}>
                        <MaterialIcons name="close" size={20} color="#AEBFFB" />
                    </TouchableOpacity>
                </Animated.View>
            ) : null}
            <TextInput
                placeholder="¿Qué buscas?"
                style={styles.buscadorTexto}
                placeholderTextColor="#AEBFFB"
                value={searchTerm}
                onChangeText={handleTextChange}
            />
            <TouchableOpacity onPress={() => onSearch(searchTerm)}>
                <MaterialIcons name="search" size={28} color="#AEBFFB" />
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
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    buscadorTexto: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
    },
    clearButton: {
        paddingHorizontal: 5,
    },
});

export default Buscador;
