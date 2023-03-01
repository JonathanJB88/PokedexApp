import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { PokemonDetails } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
  pokemon: PokemonDetails;
}

export const PokemonDetail = ({ pokemon }: Props) => {
  //
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      {/* Types & Weight */}
      <View style={{ ...styles.container, marginTop: 400 }}>
        <Text style={styles.title}>Types</Text>
        <View style={{ flexDirection: 'row' }}>
          {pokemon.types.map(({ type }) => (
            <Text
              style={{
                ...styles.regularText,
                marginRight: 10,
                textTransform: 'capitalize',
              }}
              key={type.name}>
              {type.name}
            </Text>
          ))}
        </View>
        {/* Weight */}
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.regularText}>
          {(pokemon.weight / 10).toFixed(1)} kg
        </Text>
      </View>

      {/* Sprites */}
      <View style={styles.container}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />

        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />

        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />

        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      {/* Abilities */}
      <View style={styles.container}>
        <Text style={styles.title}>Abilities</Text>
        <View style={{ flexDirection: 'row' }}>
          {pokemon.abilities.map(({ ability }) => (
            <Text
              style={{
                ...styles.regularText,
                marginRight: 10,
                textTransform: 'capitalize',
              }}
              key={ability.name}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Moves */}
      <View style={styles.container}>
        <Text style={styles.title}>Moves</Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {pokemon.moves.map(({ move }, index) => (
            <Text
              style={{
                ...styles.regularText,
                marginRight: 5,
                marginBottom: 5,
                textTransform: 'capitalize',
              }}
              key={move.name}>
              {index === pokemon.moves.length - 1
                ? move.name + '.'
                : move.name + ','}
            </Text>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((stat, index) => (
            <View key={stat.stat.name + index} style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  ...styles.regularText,
                  marginRight: 10,
                  width: 150,
                  textTransform: 'capitalize',
                }}>
                {stat.stat.name}
              </Text>

              <Text
                style={{
                  ...styles.regularText,
                  fontWeight: 'bold',
                }}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>

        {/* Last Sprite */}
        {pokemon.sprites.versions &&
        pokemon.sprites.versions['generation-v'] &&
        pokemon.sprites.versions['generation-v']['black-white'] &&
        pokemon.sprites.versions['generation-v']['black-white'].animated &&
        pokemon.sprites.versions['generation-v']['black-white'].animated
          .front_default ? (
          <View
            style={{
              marginBottom: Platform.OS === 'ios' ? 110 : 90,
              marginTop: 15,
              alignItems: 'center',
            }}>
            <FadeInImage
              uri={
                pokemon.sprites.versions['generation-v']['black-white'].animated
                  .front_default
              }
              style={{ ...styles.basicSprite, width: 50, height: 50 }}
            />
          </View>
        ) : (
          <View
            style={{
              marginBottom: Platform.OS === 'ios' ? 110 : 90,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <FadeInImage
              uri={pokemon.sprites.front_default}
              style={styles.basicSprite}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  regularText: {
    fontSize: 19,
    color: 'black',
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
