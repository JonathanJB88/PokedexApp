import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { HomeTab } from './HomeTab';
import { SearchTab } from './SearchTab';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? -5 : 10,
          fontSize: 14,
        },
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.85)',
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 85 : 65,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeTab}
        options={{
          tabBarLabel: 'Pokemon List',
          tabBarIcon: ({ color }) => (
            <Icon name="list-outline" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <Icon name="search-outline" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
