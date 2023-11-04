import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../routes/NavigatorTypes';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { Image } from 'react-native';
import Mas from '../screens/Mas';
import Crear from '../screens/Crear';

const Tab = createBottomTabNavigator<MainTabParamList>();

const homeIcon = require('../../assets/tab-icons/Home.png');
const createIcon = require('../../assets/tab-icons/Create.png');
const profileIcon = require('../../assets/tab-icons/Profile.png');
const masIcon = require('../../assets/tab-icons/Settings.png');


const TabGroup: React.FC = () => {

    
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
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
            <Tab.Screen name="Crear" component={Crear}/>
            <Tab.Screen name="Perfil" component={Profile} />
            <Tab.Screen name="Mas" component={Mas}/>
        </Tab.Navigator>
    );
};

export default TabGroup;
