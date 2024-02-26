import { useEffect, useState } from 'react'
import './App.css'
import PokemonsLocation from './components/PokemonsLocation';
import EncounteredPokemon from './components/EncounteredPokemon.jsx';
import PokemonFight from './components/PokemonFight';


function App() {

  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState("");
  const [goBack, setGoBack] = useState(false)
  const [userFight, setUserFight] = useState([])
  const [enemyFight, setEnemyFight] = useState([])
  const [beginFight, setBeginFight] = useState(false)

  useEffect(() => {
    console.log('userFight:', userFight);
    console.log('enemyFight:', enemyFight);
  }, [userFight, enemyFight]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location/")
      .then(res=> res.json())
      .then(data => setLocations(data.results));
  }, []);

  const handleGoBack = () => {
    setGoBack(true);
  };

  useEffect(() => {
    if (goBack) {
      setSelectedLocation('');
      setGoBack(false); 
    }
  }, [goBack]);

  return (
    <>
      { beginFight ? (
          <PokemonFight userFight={userFight} enemyFight={enemyFight} />
      ) : selectedLocation && !goBack ? (
        <div>
          <EncounteredPokemon
            selectedLocation={selectedLocation}
            handleGoBack={handleGoBack}
            setUserFight={setUserFight}
            setEnemyFight={setEnemyFight}
            setBeginFight={setBeginFight}
          />
        </div>
      ) : (
        <div>
          <PokemonsLocation locations={locations} setSelectedLocation={setSelectedLocation} />
        </div>
      )}
    </>
  );
}

export default App