import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { createUser } from "../services/userService";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const Register: React.FC<Props> = ({ navigation }) => {

    const formik = useFormik({
        initialValues: {
            name: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            telefono: "",
            email: "",
            password: "",
            confirmPassword: "",
            termsAccepted: false,
            day: "",
            month: "",
            year: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Requerido"),
            apellidoPaterno: Yup.string().required("Requerido"),
            apellidoMaterno: Yup.string().required("Requerido"),
            telefono: Yup.string().required("Requerido"),
            email: Yup.string()
                .email("Ingrese un email válido")
                .required("Debe ingresar un email."),
            password: Yup.string().required("Requerido"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir') // Validación de coincidencia de contraseñas
                .required("Debe ingresar su contraseña."),
            termsAccepted: Yup.boolean()
                .oneOf([true], 'Debe aceptar los términos.')
                .required("Requerido"),
            day: Yup.string().required("Requerido"),
            month: Yup.string().required("Requerido"),
            year: Yup.string().required("Requerido"),
        }),
        onSubmit: async (values) => {
            try {
                const user = {
                    ...values,
                };
                const newUser = await createUser(user);
                console.log('Usuario creado:', newUser);
                Alert.alert(
                    "Usuario creado con éxito.",
                    "",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                formik.resetForm();
                                navigation.navigate("Auth");
                            },
                        },
                    ]
                );

            } catch (error) {
                console.error("Error al enviar la solicitud:", error);
                Alert.alert("Error al crear el servicio.");
            }
        },
    });

    const handleAddProfilePic = () => {
        // Función que se llama al tocar el icono "más"
        Alert.alert('Agregar foto de perfil', 'Aquí se debe implementar la funcionalidad para agregar o cambiar la foto de perfil.');
    };

    const handleNavigationToLogin = () => {
        navigation.goBack();
    };

    return (
        <LinearGradient
            colors={["#5ABEF6", "#2476D3", "#0F4FC2"]}
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <ScrollView style={styles.container}>
                <View style={styles.centeredContainer}>
                    <View style={styles.innerContainer}>

                        <Text style={styles.title}>Creación de cuenta</Text>

                        <View style={styles.profilePicContainer}>
                            <Image
                                source={require('../../assets/iconos/UserProfileRegistro.png')} // Ruta imagen predeterminada
                                style={styles.profilePic}
                            />
                            <TouchableOpacity style={styles.addIconContainer} onPress={handleAddProfilePic}>
                                <Text style={styles.addIcon}>+</Text>
                            </TouchableOpacity>
                        </View>

                        <Text>Nombre:</Text>
                        <TextInput
                            value={formik.values.name}
                            onChangeText={formik.handleChange('name')}
                            style={[
                                styles.input,
                                formik.touched.name && formik.errors.name ? styles.inputError : null
                            ]}
                        />

                        <Text>Apellido paterno:</Text>
                        <TextInput
                            value={formik.values.apellidoPaterno}
                            onChangeText={formik.handleChange('apellidoPaterno')}
                            style={[
                                styles.input,
                                formik.touched.apellidoPaterno && formik.errors.apellidoPaterno ? styles.inputError : null
                            ]}
                        />

                        <Text>Apellido materno:</Text>
                        <TextInput
                            value={formik.values.apellidoMaterno}
                            onChangeText={formik.handleChange('apellidoMaterno')}
                            style={[
                                styles.input,
                                formik.touched.apellidoMaterno && formik.errors.apellidoMaterno ? styles.inputError : null
                            ]}
                        />

                        <Text>Teléfono:</Text>
                        <TextInput
                            value={formik.values.telefono}
                            onChangeText={formik.handleChange('telefono')}
                            style={[
                                styles.input,
                                formik.touched.telefono && formik.errors.telefono ? styles.inputError : null
                            ]}
                        />

                        {/* <Text>Teléfono:</Text>
                        <View style={styles.dateContainer}>
                            <View style={styles.dateInput}>
                                <Text>+56</Text>
                            </View>
                            <TextInput
                                value={formik.values.telefono}
                                onChangeText={formik.handleChange('telefono')}
                                style={[
                                    styles.dateInput,
                                    formik.touched.telefono && formik.errors.telefono ? styles.inputError : null
                                ]}
                            />
                        </View> */}


                        {/* <Text>Fecha de Nacimiento:</Text>
                        <View style={styles.dateContainer}>
                            <TextInput
                                placeholder="Día"
                                value={formik.values.day}
                                onChangeText={formik.handleChange('day')}
                                style={[
                                    styles.dateInput,
                                    styles.input,
                                    formik.touched.day && formik.errors.day ? styles.inputError : null
                                ]}
                            />
                            <TextInput
                                placeholder="Mes"
                                value={formik.values.month}
                                onChangeText={formik.handleChange('month')}
                                style={[
                                    styles.dateInputMonth,
                                    styles.input,
                                    formik.touched.month && formik.errors.month ? styles.inputError : null
                                ]}
                            />
                            <TextInput
                                placeholder="Año"
                                value={formik.values.year}
                                onChangeText={formik.handleChange('year')}
                                style={[
                                    styles.dateInput,
                                    styles.input,
                                    formik.touched.year && formik.errors.year ? styles.inputError : null
                                ]}
                            />
                        </View> */}

                        <Text>Email:</Text>
                        <TextInput
                            value={formik.values.email}
                            onChangeText={formik.handleChange('email')}
                            keyboardType="email-address" // Asegura que el teclado sea de tipo email
                            style={[
                                styles.input,
                                formik.touched.email && formik.errors.email ? styles.inputError : null
                            ]}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.email}</Text>
                        ) : null}

                        <Text>Contraseña:</Text>
                        <TextInput
                            value={formik.values.password}
                            onChangeText={formik.handleChange('password')}
                            secureTextEntry={true}
                            style={[
                                styles.input,
                                formik.touched.password && formik.errors.password ? styles.inputError : null
                            ]}
                        />

                        <Text>Repetir Contraseña:</Text>
                        <TextInput
                            value={formik.values.confirmPassword}
                            onChangeText={formik.handleChange('confirmPassword')}
                            secureTextEntry={true}
                            style={[
                                styles.input,
                                formik.touched.confirmPassword && formik.errors.confirmPassword ? styles.inputError : null
                            ]}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.confirmPassword}</Text>
                        ) : null}

                        <View style={styles.checkboxContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <Checkbox
                                    value={formik.values.termsAccepted}
                                    onValueChange={(value) => formik.setFieldValue('termsAccepted', value)}
                                />
                                <Text style={styles.checkboxText}>Aceptar términos y condiciones</Text>
                            </View>
                            {formik.touched.termsAccepted && formik.errors.termsAccepted ? (
                                <Text style={{
                                    color: 'red',
                                }}>{formik.errors.termsAccepted}</Text>
                            ) : null}
                        </View>


                        <View style={styles.buttonsContainer}>
                            <View style={[styles.button, styles.roundedButton]}>
                                <Button title="Volver" color="#FF5C5C" onPress={handleNavigationToLogin} />
                            </View>
                            <View style={[styles.button, styles.roundedButton]}>
                                <Button title="Crear cuenta" color="#5CB1FF" onPress={() => formik.handleSubmit()} />
                            </View>
                        </View>
                    </View>
                </View >
            </ScrollView>
        </LinearGradient>


    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
    },
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    innerContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
        width: '98%',
        maxWidth: '90%',
        margin: 50,
        flexShrink: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#F3F6FF',
    },

    checkboxContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },

    checkboxText: {
        marginLeft: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    profilePicContainer: {
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    dateInputMonth: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        borderRadius: 50,
        marginHorizontal: 5, // Espaciado entre los botones
    },
    roundedButton: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden', // Esto es importante para que el borderRadius se aplique correctamente
    },
    addIconContainer: {
        position: 'absolute',
        bottom: -3,
        right: 100,
        backgroundColor: 'orange',
        borderRadius: 15,
        width: 27,
        height: 27,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    addIcon: {
        fontSize: 20,
        color: 'white',
    },
    inputError: {
        borderColor: 'red',
    },
});

export default Register;
