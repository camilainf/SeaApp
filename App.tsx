import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/pages/Home';
import Page1 from './src/pages/Page1';
import Page2 from './src/pages/Page2';
import Page3 from './src/pages/Page3';

type TabNavigatorParams = {
  Home: undefined,
  Page1: undefined,
  Page2: undefined,
  Profile: undefined,
};

const Tab = createBottomTabNavigator<TabNavigatorParams>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Page1" component={Page1} />
        <Tab.Screen name="Page2" component={Page2} />
        <Tab.Screen name="Profile" component={Page3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
