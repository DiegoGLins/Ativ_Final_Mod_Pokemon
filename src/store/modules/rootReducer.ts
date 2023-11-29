import { combineReducers } from '@reduxjs/toolkit';
import pokemonSlice from './pokemonSlice/pokemonSlice';


export default combineReducers({
    pokemon: pokemonSlice
});
