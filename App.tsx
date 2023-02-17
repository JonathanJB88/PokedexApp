import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/HomeTab';
import { Tabs } from './src/navigator/Tabs';

const App = () => {
  return (
    <NavigationContainer>
      {/* <Navigator /> */}
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
