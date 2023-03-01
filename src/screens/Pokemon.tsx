import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParams } from '../navigator/HomeTab';
import { FadeInImage, PokemonDetail } from '../components';
import { usePokemonDetails } from '../hooks';

interface Props extends StackScreenProps<RootStackParams, 'Pokemon'> {}

export const Pokemon = ({ navigation, route }: Props) => {
  //
  const { simplePokemon, color } = route.params;
  const { name, id, picture } = simplePokemon;
  const { top } = useSafeAreaInsets();
  const { isLoading, pokemon } = usePokemonDetails(id);
  const isVisible = useRef<boolean>(true);

  const handleBack = () => {
    if (isLoading) return;
    if (isVisible.current) {
      navigation.pop();
      isVisible.current = false;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ ...styles.headerContainer, backgroundColor: color }}>
        {/* Back button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ ...styles.backBtn, top: top + 5 }}
          onPress={handleBack}>
          <Icon
            name="return-down-back-outline"
            color="white"
            size={35}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* Pokemon name */}
        <Text
          numberOfLines={2}
          style={{
            ...styles.pokemonName,
            top: top + 40,
          }}>
          {name + '\n#' + id}
        </Text>

        {/* White Pokeball */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />
        {/* Pokemon image */}
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>

      {/* Details & Loading */}
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size={50} color={color} />
        </View>
      ) : (
        <PokemonDetail pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 390,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backBtn: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: 20,
    textTransform: 'capitalize',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -45,
    opacity: 0.6,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
