import React, { useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageErrorEventData,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  View,
} from 'react-native';

import { useAnimation } from '../hooks';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

const defaultImg = 'https://www.pngall.com/wp-content/uploads/4/Pokeball.png';

export const FadeInImage = ({ uri, style = {} }: Props) => {
  //
  const { opacity, fadeIn } = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
    setIsLoading(false);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...(style as any),
      }}>
      {isLoading && (
        <ActivityIndicator
          style={{ position: 'absolute' }}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        source={{ uri: uri === null ? defaultImg : uri }}
        onError={onError}
        onLoad={finishLoading}
        style={{
          ...(style as any),
          opacity,
        }}
      />
    </View>
  );
};
