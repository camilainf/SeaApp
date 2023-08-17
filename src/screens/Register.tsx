import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import * as userService from '../services/userService';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const newUser = await userService.createUser({ name, email, password });
            Alert.alert('Registro exitoso', 'Usuario creado con éxito.');
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al crear el usuario.');
        }
    };

    return (
        <View>
            <Text>Nombre:</Text>
            <TextInput value={name} onChangeText={setName} />

            <Text>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} />

            <Text>Contraseña:</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} />

            <Button title="Registrarse" onPress={handleRegister} />
        </View>
    );
};

export default Register;
