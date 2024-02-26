import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';

function UserPokemon({setUserFight}) {
  const [usersPokemons, setUsersPokemons] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        return null;
      }
    };

    const pokemonUrls = [
      "https://pokeapi.co/api/v2/pokemon/bulbasaur",
      "https://pokeapi.co/api/v2/pokemon/charizard",
      "https://pokeapi.co/api/v2/pokemon/poliwhirl"
    ];

    const fetchAndStorePokemonData = async () => {
      const pokemonDataArray = await Promise.all(pokemonUrls.map(fetchData));

      const filteredPokemonData = pokemonDataArray.filter(Boolean);

      filteredPokemonData.forEach((pokemonData) => {
        localStorage.setItem(pokemonData.name, JSON.stringify(pokemonData));
      });

      setUsersPokemons(filteredPokemonData);
      setLoading(false); 
    };

    fetchAndStorePokemonData();
  }, []); 

  const clickHandle = (pokemon) => {
    setUserFight(pokemon);
  };

  const userPokemonConStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-around',
    alignItems: 'center',

    gap: '2em',
}

const userPokeStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
}

  return (
    <>
      <h2>Choose your Pokemon!</h2>
        <div style={userPokemonConStyle}>
          {usersPokemons.map((pokemon, index) => (
            <Card variant='outlined' style={userPokeStyle} key={index} onClick={() => clickHandle(pokemon)}>
              <CardActionArea>
                 <p>{pokemon.name}</p>
                 <img src={pokemon.sprites.front_default} alt={`${pokemon.name} sprite`} />
              </CardActionArea>
            </Card>
          ))}
        </div>
    </>
  );
}

export default UserPokemon;