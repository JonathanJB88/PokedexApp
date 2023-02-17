import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Pokemon } from '../screens';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

export type RootStackParams = {
  Home: undefined;
  Pokemon: { simplePokemon: SimplePokemon; color: string };
};

const Stack = createStackNavigator<RootStackParams>();

export const HomeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pokemon" component={Pokemon} />
    </Stack.Navigator>
  );
};
