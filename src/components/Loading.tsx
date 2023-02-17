import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator size={50} color="grey" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    opacity: 0.7,
    color: 'black',
  },
});
