import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const TerminosCondiciones: React.FC<Props> = ({ navigation }) => {

    const handleNavigationToRegister = () => {
        navigation.goBack();
    };

    return (
        <LinearGradient
            colors={["#5ABEF6", "#2476D3", "#0F4FC2"]}
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Términos y condiciones</Text>
                <ScrollView style={styles.termsContainer}>
                    <View style={styles.termItem}>
                        <Text style={styles.termNumber}>1.</Text>
                        <Text style={styles.termText}>Aceptación de los Términos: Al utilizar SeaJob, el usuario acepta y se compromete a cumplir con los siguientes términos y condiciones. Si no está de acuerdo con alguno de los términos, no debe utilizar la aplicación.</Text>
                    </View>

                    <View style={styles.termItem}>
                        <Text style={styles.termNumber}>2.</Text>
                        <Text style={styles.termText}>Descripción del Servicio: SeaJob es una plataforma que permite a los usuarios solicitar o proporcionar servicios temporales o trabajos no formales.</Text>
                    </View>

                    <View style={styles.termItem}>
                        <Text style={styles.termNumber}>3.</Text>
                        <Text style={styles.termText}>Registro: Para utilizar SeaJob, es necesario registrarse proporcionando información verdadera y actualizada.</Text>
                    </View>

                    <View style={styles.termItem}>
                        <Text style={styles.termNumber}>4.</Text>
                        <Text style={styles.termText}>Conducta del Usuario: Los usuarios se comprometen a no utilizar el servicio para fines ilegales o prohibidos.</Text>
                    </View>

                    <View style={styles.termItem}>
                        <Text style={styles.termNumber}>5.</Text>
                        <Text style={styles.termText}>Privacidad: Toda la información personal proporcionada por los usuarios será tratada de acuerdo con la Política de Privacidad de SeaJob.</Text>
                    </View>

                    <View style={styles.termItem}>
                        <Text style={styles.termNumber}>6.</Text>
                        <Text style={styles.termText}>Limitación de Responsabilidad: SeaJob no se hace responsable de la calidad, veracidad o legalidad de los servicios ofrecidos por los usuarios.</Text>
                    </View>

                    <View style={styles.termItem}>
                        <Text style={styles.termNumber}>7.</Text>
                        <Text style={styles.termText}>Propiedad Intelectual: Todos los derechos sobre el contenido, diseño y código de la aplicación pertenecen a SeaJob y no pueden ser utilizados sin permiso.</Text>
                    </View>

                    <View style={styles.termItem}>
                        <Text style={styles.termNumber}>8.</Text>
                        <Text style={styles.termText}>Modificación de los Términos: Estos términos y condiciones pueden ser modificados en cualquier momento, y es responsabilidad del usuario revisar regularmente estos términos.</Text>
                    </View>

                    <View style={styles.termItem}>
                        <Text style={styles.termNumber}>9.</Text>
                        <Text style={styles.termText}>Leyes Aplicables: Estos términos se rigen por las leyes de Chile, y cualquier disputa será resuelta en los tribunales de Chile.</Text>
                    </View>

                    <View style={styles.termItem}>
                        <Text style={styles.termNumberTen}>10.</Text>
                        <Text style={styles.termText}>Contacto: Para cualquier consulta sobre estos términos y condiciones, por favor, contactar a contacto@seajob.com.</Text>
                    </View>

                    <View style={[styles.button, styles.roundedButton]}>
                        <Button title="Volver" color="#5CB1FF" onPress={handleNavigationToRegister} />
                    </View>
                </ScrollView>

            </View>
        </LinearGradient>
    );
};

// Estilos
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "80%",
        padding: 20,
        marginVertical: 80,
        borderRadius: 30,
        backgroundColor: "#FCFCFD",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    termsContainer: {
        marginBottom: 20,
    },
    button: {
        borderRadius: 50,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    roundedButton: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#322E61',
        marginBottom: 20,
    },
    termItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    termNumber: {
        color: '#322E61',
        marginRight: 14,
    },

    termNumberTen: {
        color: '#322E61',
        marginRight: 5,
    },

    termText: {
        flex: 1,
        fontSize: 15,
        color: '#322E61',
        textAlign: 'justify',
    },
});

export default TerminosCondiciones;






