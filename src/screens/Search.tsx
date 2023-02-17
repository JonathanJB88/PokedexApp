import React, { useEffect, useState } from 'react';
import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { View, Platform, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Loading, PokemonCard, SearchInput, NotFound } from '../components';
import { useAllPokemons } from '../hooks';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

import { styles } from '../theme/appTheme';

const screenWidth = Dimensions.get('window').width;

export const Search = () => {
  //
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = useAllPokemons();
  const [filteredPokemons, setFilteredPokemons] = useState<SimplePokemon[]>([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term.length === 0) {
      return setFilteredPokemons([]);
    }

    if (isNaN(Number(term))) {
      const pokemonByName = simplePokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredPokemons(pokemonByName);
    } else {
      const pokemonById = simplePokemonList.find(
        pokemon => pokemon.id === term,
      );
      setFilteredPokemons(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <TouchableWithoutFeedback onPressOut={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}>
        <SearchInput
          onDebounce={value => setTerm(value)}
          style={{
            position: 'absolute',
            zIndex: 999,
            width: screenWidth - 40,
            top: Platform.OS === 'ios' ? top + 10 : top + 30,
          }}
        />
        {term && filteredPokemons.length === 0 ? (
          <NotFound />
        ) : (
          <FlatList
            data={filteredPokemons}
            keyExtractor={pokemon => pokemon.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            //Header
            ListHeaderComponent={
              <Text
                style={{
                  ...styles.globalMargin,
                  ...styles.title,
                  paddingBottom: 10,
                  marginTop: Platform.OS === 'ios' ? top + 70 : top + 85,
                }}>
                {term}
              </Text>
            }
            renderItem={({ item: pokemon }) => (
              <PokemonCard pokemon={pokemon} />
            )}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
