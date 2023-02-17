import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const NotFound = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/poke-warning.png')}
        style={styles.pokeWarning}
      />
      <Text style={styles.title}>POKEMON NOT FOUND</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeWarning: {
    width: 240,
    height: 210,
    opacity: 0.7,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    color: 'black',
  },
});
