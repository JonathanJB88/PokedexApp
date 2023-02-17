import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParams } from './HomeTab';
import { Pokemon, Search } from '../screens';

const Tab = createStackNavigator<RootStackParams>();

export const SearchTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Tab.Screen name="Home" component={Search} />
      <Tab.Screen name="Pokemon" component={Pokemon} />
    </Tab.Navigator>
  );
};
