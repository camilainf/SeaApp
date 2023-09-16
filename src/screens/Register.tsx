import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image, ScrollView  } from 'react-native';
import Checkbox from 'expo-checkbox';
import * as userService from '../services/userService';

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [rut, setRut] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleRegister = async () => {
        // Aquí puedes agregar validaciones adicionales si lo deseas
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }
        if (!termsAccepted) {
            Alert.alert('Error', 'Debes aceptar los términos y condiciones.');
            return;
        }

        try {
            const newUser = await userService.createUser({ name, email, password });
            Alert.alert('Registro exitoso', 'Usuario creado con éxito.');
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al crear el usuario.');
        }
    };

    const handleAddProfilePic = () => {
        // Función que se llama al tocar el icono "más"
        Alert.alert('Agregar foto de perfil', 'Aquí se debe implementar la funcionalidad para agregar o cambiar la foto de perfil.');
    };

    return (
        <ScrollView style={styles.container}>
            <View  style={styles.centeredContainer}>
                <View style={styles.innerContainer}>

                    <Text style={styles.title}>Creación de cuenta</Text>

                    <View style={styles.profilePicContainer}>
                        <Image
                            source={require('../assets/images/descargar.png')} // Ruta imagen predeterminada
                            style={styles.profilePic}
                        />
                        <TouchableOpacity style={styles.addIconContainer} onPress={handleAddProfilePic}>
                            <Text style={styles.addIcon}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <Text>Nombre:</Text>
                    <TextInput value={name} onChangeText={setName} style={styles.input} />

                    <Text>Apellidos:</Text>
                    <TextInput value={surname} onChangeText={setSurname} style={styles.input} />

                    <Text>RUT:</Text>
                    <TextInput value={rut} onChangeText={setRut} style={styles.input} />

                    <Text>Fecha de Nacimiento:</Text>
                    <View style={styles.dateContainer}>
                        <TextInput placeholder="Día" value={day} onChangeText={setDay} style={[styles.dateInput, styles.input]} />
                        <TextInput placeholder="Mes" value={month} onChangeText={setMonth} style={[styles.dateInputMonth, styles.input]} />
                        <TextInput placeholder="Año" value={year} onChangeText={setYear} style={[styles.dateInput, styles.input]} />
                    </View>

                    <Text>Email:</Text>
                    <TextInput value={email} onChangeText={setEmail} style={styles.input} />

                    <Text>Contraseña:</Text>
                    <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.input} />

                    <Text>Repetir Contraseña:</Text>
                    <TextInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} style={styles.input} />

                    <View style={styles.checkboxContainer}>
                        <Checkbox value={termsAccepted} onValueChange={setTermsAccepted} />
                        <Text style={styles.checkboxText}>Aceptar términos y condiciones</Text>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <View style={[styles.button, styles.roundedButton]}>
                            <Button title="Volver" color="#FF5C5C" onPress={() => { /* Aquí función para volver atrás */ }} />
                        </View>
                        <View style={[styles.button, styles.roundedButton]}>
                            <Button title="Crear cuenta" color="#5CB1FF" onPress={handleRegister} />
                        </View>
                    </View>

                    
                </View>
            </View >
        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
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
        width: '85%',
        margin: 50
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
        flexDirection: 'row',
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
});

export default Register;
