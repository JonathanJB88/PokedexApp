import React from 'react';
import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { View, Platform, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Loading, SearchInput, NotFound } from '../components';
import PokemonCard from '../components/PokemonCard';
import { useAllPokemons, useSearch } from '../hooks';

import { styles } from '../theme/appTheme';

const screenWidth = Dimensions.get('window').width;

export const Search = () => {
  //
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = useAllPokemons();
  const { filteredPokemons, term, setTerm } = useSearch(simplePokemonList);

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
