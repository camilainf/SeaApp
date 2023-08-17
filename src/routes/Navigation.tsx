import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import SearchJobs from '../screens/SearchJobs';
import Profile from '../screens/Profile';

// Tab Bottom
const Tab = createBottomTabNavigator();

const TabGroup = () => {
    return (
        <Tab.Navigator
            screenOptions={({route, navigation}) => ({
                tabBarIcon: ({color, focused, size}) => {
                    let iconName;
                    switch(route.name) {
                        case "Home":
                            iconName = "home";
                            break;
                        case "Search":
                            iconName = "search";
                            break;
                        case "Perfil":
                            iconName = "person";
                            break;
                        default:
                            iconName = "emoticon-dead";
                    }
                    return <Ionicons name={iconName as any} size={size} color={color}/>
                }
            })}
        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Search" component={SearchJobs}/>
            <Tab.Screen name="Perfil" component={Profile}/>
        </Tab.Navigator>
    )
}

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  );
};

export default Navigation;