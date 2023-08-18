import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import * as userService from '../services/userService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const Login: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const user = await userService.loginUser({ email, password });
            Alert.alert('Inicio de sesión exitoso', 'Bienvenido!');
            navigation.navigate('Main', {screen: 'Home'});

        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al iniciar sesión.');
        }
    };

    return (
        <View style= {styles.container } >
            <Text style={styles.label} >Email:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />

            <Text style={styles.label} >Contraseña:</Text>
            <TextInput style={[styles.input, styles.passwordInput]} value={password} onChangeText={setPassword} secureTextEntry={true} />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 60,
        marginTop: 300
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: 'grey'
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16
    },
    passwordInput: {
        marginTop: 8
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 24
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    }
});

export default Login;