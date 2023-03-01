import { useEffect, useRef, useState } from 'react';
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

export const usePokemon = () => {
  //
  const [isLoading, setIsLoading] = useState(true);
  const [isReached, setIsReached] = useState(false);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const nextUrlPage = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  const loadPokemons = async () => {
    if (isReached) return;
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonResponse>(nextUrlPage.current);
    nextUrlPage.current = resp.data.next;
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
    const pokemons = [...simplePokemonList, ...pokeFilter];
    setSimplePokemonList(pokemons);
    setIsReached(pokemons.length >= 1269);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isLoading,
    isReached,
    simplePokemonList,
    loadPokemons,
  };
};
