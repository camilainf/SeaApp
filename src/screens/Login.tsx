import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import * as userService from '../services/userService';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParams';

type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = ({  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation<loginScreenProp>();

    const handleLogin = async () => {
        try {
            const user = await userService.loginUser({ email, password });
            Alert.alert('Inicio de sesión exitoso', 'Bienvenido!');
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al iniciar sesión.');
        }
    };

    return (
        <View>
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} />

            <Text>Contraseña:</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} />

            <Button title="Iniciar Sesión" onPress={handleLogin} />
        </View>
    );
};

export default Login;