import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './NavigatorTypes';
import Login from '../screens/Login';
import TabGroup from '../components/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Registro from '../screens/Registro';
import BuscadorScreen from '../screens/Buscador';
import ServicioScreen from '../screens/Servicio';
import TerminosCondiciones from '../screens/TerminosCondiciones';
import Profile from '../screens/Profile';
import ListaServicios from '../screens/ListaServicios';
import EditarPerfil from '../screens/EditarPerfil';
import Crear from '../screens/Crear';
import Categorias from '../screens/Categorias';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>

                <Stack.Screen
                    name="Auth"
                    component={Login}
                />

                <Stack.Screen
                    name="Registro"
                    component={Registro}
                />

                <Stack.Screen
                    name="Buscador"
                    component={BuscadorScreen}
                    options={{
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTitle: 'Buscador',
                    }}
                />

                <Stack.Screen
                    name="TerminosCondiciones"
                    component={TerminosCondiciones}
                />

                <Stack.Screen
                    name="Servicio"
                    component={ServicioScreen}
                    options={{
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTitle: '',
                    }}
                />

                <Stack.Screen
                    name="ListaServicios"
                    component={ListaServicios}
                    options={{
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTitle: '',

                    }}
                />

                <Stack.Screen
                    name="EditarPerfil"
                    component={EditarPerfil}
                    options={{
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTitle: '',

                    }}
                />

                <Stack.Screen
                    name="PerfilAjeno"
                    component={Profile}
                    options={{
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTitle: 'Perfil Usuario',
                    }}
                />

                <Stack.Screen
                    name="EditarServicio"
                    component={Crear}
                    options={{
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTitle: '',

                    }}
                />

                <Stack.Screen
                    name="Main"
                    component={TabGroup}
                />

                <Stack.Screen
                    name="Categorias"
                    component={Categorias}
                    options={{
                        headerShown: true,
                        headerBackTitleVisible: false,
                        headerTitle: 'Categorías',

                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
