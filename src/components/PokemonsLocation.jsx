import React from 'react'
import Button from '@mui/material/Button';

function PokemonsLocation({ locations, setSelectedLocation }) {

  return (
    <div>
      <h1>Pokemon Locations</h1>
      <ul>
        {locations.map((location, index) => (
          <Button variant="contained" className="locations"key={index} location={location} onClick={() => setSelectedLocation(location.name)}>
            {location.name}
          </Button>
        ))}
      </ul>
    </div>
  );
}

export default PokemonsLocation