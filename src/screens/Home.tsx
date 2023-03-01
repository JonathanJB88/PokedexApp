import React from 'react';
import { Image, FlatList, ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PokemonCard } from '../components';
import { usePokemon } from '../hooks';

import { styles } from '../theme/appTheme';

export const Home = () => {
  //
  const { top } = useSafeAreaInsets();
  const { simplePokemonList, isReached, loadPokemons } = usePokemon();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokeballBg}
      />

      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          //Header
          ListHeaderComponent={
            <Text
              style={{
                ...styles.globalMargin,
                ...styles.title,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: 10,
              }}>
              Pokedex
            </Text>
          }
          renderItem={({ item: pokemon }) => <PokemonCard pokemon={pokemon} />}
          //Infinite Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={() => (
            <>
              {isReached ? (
                <Text
                  style={{
                    height: 120,
                    textAlign: 'center',
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: 20,
                  }}>
                  No more pokemons
                </Text>
              ) : (
                <ActivityIndicator
                  style={{ height: 100 }}
                  size={20}
                  color="grey"
                />
              )}
            </>
          )}
        />
      </View>
    </>
  );
};
