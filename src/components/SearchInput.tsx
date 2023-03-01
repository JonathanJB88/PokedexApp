import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useDebouncedValue } from '../hooks';

interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({ style, onDebounce }: Props) => {
  //
  const [inputValue, setInputValue] = useState('');
  const { debouncedValue } = useDebouncedValue(inputValue);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={{ ...styles.container, ...(style as any) }}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="✨Search a pokemon..."
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Icon name="search-outline" color="grey" size={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    top: 2,
  },
});
