import React, { useCallback, useMemo } from 'react';
import { Image, FlatList, ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PokemonCard from '../components/PokemonCard';
import { usePokemon } from '../hooks';

import { styles } from '../theme/appTheme';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

export const Home = () => {
  //
  const { top } = useSafeAreaInsets();
  const { simplePokemonList, isReached, loadPokemons } = usePokemon();

  const memoizedValue = useMemo(
    () =>
      ({ item: pokemon }: { item: SimplePokemon }) =>
        <PokemonCard pokemon={pokemon} />,
    [],
  );

  const _renderItem = useCallback(memoizedValue, [simplePokemonList]);

  const _keyExtractor = (pokemon: SimplePokemon) => pokemon.id;

  const renderHeader = () => (
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
  );

  const renderFooter = () => (
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
        <ActivityIndicator style={{ height: 100 }} size={20} color="grey" />
      )}
    </>
  );

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokeballBg}
      />

      <View style={{ alignItems: 'center' }}>
        <FlatList
          removeClippedSubviews
          initialNumToRender={5}
          maxToRenderPerBatch={40}
          data={simplePokemonList}
          keyExtractor={_keyExtractor}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          //Header
          ListHeaderComponent={renderHeader}
          renderItem={_renderItem}
          //Infinite Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  );
};
