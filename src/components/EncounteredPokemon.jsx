import React, { useEffect, useState } from 'react'
import UserPokemon from './UserPokemon';
import Button from '@mui/material/Button';
import { Card, CardActionArea } from '@mui/material';
import PokemonFight from './PokemonFight';


function EncounteredPokemon({ selectedLocation, handleGoBack, setUserFight, setEnemyFight, setBeginFight}) {

  const [pokemonsEncountered, setPokemonsEncountered] = useState([])
  const [randomIndex, setRandomIndex] = useState(null);
  const [randomPoke, setRandomPoke] = useState([])

  const getRandomPokemon = () => {
    const newIndex = Math.floor(Math.random() * pokemonsEncountered.length);
    setRandomIndex(newIndex);
  };


//fetching pokemons in location
  useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/location-area/${selectedLocation}-area`)
        .then((res) => res.json())
        .then((data) => setPokemonsEncountered(data.pokemon_encounters))
        .catch((error) => console.error('Error fetching data:', error));
  
  }, [selectedLocation]);


  //fetching random pokemon in location
  useEffect(() => {
    if (randomIndex !== null && pokemonsEncountered.length > 0) {
      const randomPokemon = pokemonsEncountered[randomIndex].pokemon;

      fetch(randomPokemon.url)
        .then((res) => res.json())
        .then((data) => setRandomPoke(data))
        .catch((error) => console.error('Error fetching random Pokemon data:', error));
    }
  }, [randomIndex, pokemonsEncountered]);

 const clickFight = () => {
  setBeginFight(true)
  setEnemyFight(randomPoke)
 }

  return (
    <div>
      {pokemonsEncountered.length !== 0 ? (
        <>
        <h1>Pokemon Encounters</h1>
        <UserPokemon setUserFight={setUserFight}/>
          <Button variant="contained" onClick={getRandomPokemon}>Get Random Enemy Pokemon</Button>
          {randomIndex !== null && (
            <Card variant='outlined' sx={{maxWidth: "fit-content"}}>
              <p>{pokemonsEncountered[randomIndex].pokemon.name}</p>
              <img src={randomPoke.sprites?.front_default} alt={randomPoke.name} />
            </Card>
          )}
          <Button variant='contained' onClick={clickFight}>Fight!</Button>
        </>
      ) :
      (
        <>
        <h1>HMM where are the pokemons?</h1>
        <Button variant="contained" onClick={handleGoBack}>SELECT ANOTHER LOCATION</Button>
        </>
      )}
    </div>
  );
}

export default EncounteredPokemon