import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'

function PokemonFight({userFight, enemyFight}) {
    const cardsStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '120px',
        padding: '30px',
    
        fontSize: '15px',
        fontFamily: "Poppins",
    }
    
    const h1Style = {
        color: 'rgb(59, 59, 234)',
    }
    
    const userStyle = {
        color: 'rgb(30, 30, 130)',
    }
    
    
    const enemyStyle = {
        color: 'rgb(230, 44, 44)',
    }
    
  
// const formula = ((((2/5+2)*B*60/D)/50)+2)*Z/255

  return (
    <>
        <h1 style={h1Style}>Let the fight begin!</h1>
        <div style={cardsStyle}>
              <Card style={userStyle} sx={{width: '13em'}}>
                <h4>YOU</h4>
                <h2>{userFight.name}</h2>
                <img src={userFight.sprites.front_default}/>
                <h3>HP: {userFight.stats[0].base_stat}</h3>
                <h3>Attack: {userFight.stats[1].base_stat}</h3>
                <h3>Defense: {userFight.stats[2].base_stat}</h3>
             </Card>
             <h2>VS</h2>
             <Card style={enemyStyle} sx={{width: '13em'}}>
                <h4>ENEMY</h4>
                <h2>{enemyFight.name}</h2>
              <img src={enemyFight.sprites.front_default}/>
                <h3>HP: {enemyFight.stats[0].base_stat}</h3>
                <h3>Attack: {enemyFight.stats[1].base_stat}</h3>
                <h3>Defense: {enemyFight.stats[2].base_stat}</h3>
            </Card>
         </div>
    </>
  )
}

export default PokemonFight