import { useEffect, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonDetails } from '../interfaces/pokemonInterfaces';

export const usePokemonDetails = (id: string) => {
  //
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>(
    {} as PokemonDetails,
  );

  const loadPokemonDetails = async () => {
    const response = await pokemonApi.get<PokemonDetails>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemonDetails(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemonDetails();
  }, []);

  return {
    isLoading,
    pokemon: pokemonDetails,
  };
};
