import { useEffect, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';

import {
  PokemonResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

const pokemonNoImg = [
  '10143',
  '10145',
  '10264',
  '10265',
  '10266',
  '10267',
  '10268',
  '10269',
  '10270',
  '10271',
];

export const useAllPokemons = () => {
  //
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1300',
    );
    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return { id, picture, name };
    });

    const pokeFilter = newPokemonList.filter(poke => {
      const invalidPokemon = pokemonNoImg.find(
        invalidPokemon => invalidPokemon === poke.id,
      );
      return !invalidPokemon;
    });

    setSimplePokemonList(pokeFilter);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isFetching,
    simplePokemonList,
  };
};
