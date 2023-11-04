import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";
import { Categoria } from '../resources/category';
import { getAllCategories } from '../services/categoryService';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Categorias: React.FC<Props> = ({ navigation }) => {

    const [categoriasPopulares, setCategoriasPopulares] = useState<Categoria[]>([]);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            loadData();
            return () => { };
        }, [])
    );

    const loadData = async () => {
        try {
            setIsRefreshing(true);

            const [categorias] = await Promise.all([
                getAllCategories(),
            ]);

            //Ser categorias populares
            setCategoriasPopulares(categorias.map(cat => ({
                ...cat,
            })));


        } catch (error) {
            console.error("Error al cargar los datos:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={loadData} />}>
            <View style={styles.contentContainer}>

                {/* Categorias destacadas*/}
                <View style={styles.tarjeta}>
                    <FlatList
                        data={categoriasPopulares}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.tarjetaCategoria}
                                onPress={() => {
                                    navigation.navigate("ListaServicios", { categoria: item.nombre });
                                }}>
                                <Image source={item.imagen && item.imagen !== "" ? { uri: item.imagen } : require("../../assets/iconos/ImageReferencia.png")} style={styles.imagenCategoria} />

                                <Text style={styles.tituloCategoria}>{item.nombre}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        scrollEnabled={false}
                    />
                </View>


            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFFFFF',
    },

    tarjeta: {
        borderRadius: 8,
        marginBottom: 16,
    },

    contentContainer: {
        zIndex: 2,
        padding: 10,
        paddingHorizontal: 20,
    },

    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#415C80',
    },

    tarjetaCategoria: {
        flex: 1,
        padding: 16,

        backgroundColor: '#FFF',
        borderRadius: 8,
        margin: 8,
        elevation: 4,
    },

    imagenCategoria: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
    },

    tituloCategoria: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#66638C',
    },

});

export default Categorias;