import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './NavigatorTypes';
import Login from '../screens/Login';
import TabGroup from '../components/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Register from '../screens/Register';
import BuscadorScreen from '../screens/Buscador';
import ServicioScreen from '../screens/Servicio';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen
                    name="Buscador"
                    component={BuscadorScreen}
                    options={{
                        headerShown: true, // Muestra la barra superior
                        headerBackTitleVisible: true, // Oculta el título de volver atrás
                        headerTitle: 'Buscador', // Establece el título en una cadena vacía para ocultarlo
                    }}
                />
                <Stack.Screen name="Main" component={TabGroup} />
                <Stack.Screen name="Servicio" 
                component={ServicioScreen} 
                options={{
                    headerShown: true, // Muestra la barra superior
                    headerBackTitleVisible: false, // Oculta el título de volver atrás
                    headerTitle: '', // Establece el título en una cadena vacía para ocultarlo
                }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
