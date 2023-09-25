import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import Login from '../screens/Login';
import TabGroup from '../components/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Register from '../screens/Register';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Main" component={TabGroup}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
