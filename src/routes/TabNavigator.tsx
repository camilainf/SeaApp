import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from './types';
import Home from '../screens/Home';
import SearchJobs from '../screens/SearchJobs';
import Profile from '../screens/Profile';
import { Image } from 'react-native';


const Tab = createBottomTabNavigator<MainTabParamList>();

const homeIcon = require('../../assets/tab-icons/Home.png');
const createIcon = require('../../assets/tab-icons/Create.png');
const profileIcon = require('../../assets/tab-icons/Profile.png');
const masIcon = require('../../assets/tab-icons/Settings.png');


const TabGroup: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({route, navigation}) => ({
                tabBarIcon: ({color, focused, size}) => {
                    let iconSource;
                    switch(route.name) {
                        case "Home":
                            iconSource = homeIcon;
                            break;
                        case "Crear":
                            iconSource = createIcon;
                            break;
                        case "Perfil":
                            iconSource = profileIcon;
                            break;
                        default:
                            iconSource = masIcon;
                    }
                    return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }}/>
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Crear" component={SearchJobs}/>
            <Tab.Screen name="Perfil" component={Profile}/>
            <Tab.Screen name="Mas" component={Home}/>
        </Tab.Navigator>
    );
};

export default TabGroup;
