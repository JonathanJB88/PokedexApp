import React, { memo, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageColors from 'react-native-image-colors';

import { FadeInImage } from './';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { RootStackParams } from '../navigator/HomeTab';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParams, 'Pokemon'>;

const PokemonCard = ({ pokemon }: Props) => {
  //
  const [bgColor, setBgColor] = useState('grey');

  const isMounted = useRef(true);
  const { navigate } = useNavigation<ScreenNavigationProp>();

  const getImgColors = async () => {
    try {
      const colors = await ImageColors.getColors(pokemon.picture, {
        fallback: 'grey',
      });

      if (!isMounted.current) return;

      colors.platform === 'ios'
        ? setBgColor(colors.background || 'grey')
        : setBgColor(colors.dominant || 'grey');
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      }
    }
  };

  useEffect(() => {
    getImgColors();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigate('Pokemon', { simplePokemon: pokemon, color: bgColor })
      }>
      <View style={{ ...styles.cardContainer, backgroundColor: bgColor }}>
        {/* Pokemon name */}
        <View>
          <Text style={styles.name}>
            {pokemon.name} {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokeballContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokeball}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(PokemonCard);

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    width: windowWidth * 0.4,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 7,
    left: 10,
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
  pokeballContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
  pokeball: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
});
