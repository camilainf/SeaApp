import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from './types';
import Home from '../screens/Home';
import SearchJobs from '../screens/SearchJobs';
import Profile from '../screens/Profile';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabGroup: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({route, navigation}) => ({
                tabBarIcon: ({color, focused, size}) => {
                    let iconName;
                    switch(route.name) {
                        case "Home":
                            iconName = "home";
                            break;
                        case "Explorar":
                            iconName = "search";
                            break;
                        case "Perfil":
                            iconName = "person";
                            break;
                        default:
                            iconName = "emoticon-dead";
                    }
                    return <Ionicons name={iconName as any} size={size} color={color}/>
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Explorar" component={SearchJobs}/>
            <Tab.Screen name="Perfil" component={Profile}/>
        </Tab.Navigator>
    );
};

export default TabGroup;
