import { combineReducers } from '@reduxjs/toolkit';
import pokemonSlice from './pokemonSlice/pokemonSlice';
import pokedexSlice from './pokedexSlice/pokedexSlice';


export default combineReducers({
    pokemon: pokemonSlice,
    pokedex: pokedexSlice
});
