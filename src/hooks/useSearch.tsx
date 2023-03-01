import { useEffect, useState } from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

export const useSearch = (pokemons: SimplePokemon[]) => {
  const [filteredPokemons, setFilteredPokemons] = useState<SimplePokemon[]>([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term.length === 0) {
      return setFilteredPokemons([]);
    }

    if (isNaN(Number(term))) {
      const pokemonByName = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredPokemons(pokemonByName);
    } else {
      const pokemonById = pokemons.find(pokemon => pokemon.id === term);
      setFilteredPokemons(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  return {
    filteredPokemons,
    term,
    setTerm,
  };
};
