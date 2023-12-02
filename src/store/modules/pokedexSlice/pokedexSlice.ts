/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiPokemon from '../../../service/api.service';
import { Ability, PokemonSprites } from '../../../types/PokemonType';

interface Pokedex {
    id: number;
    name: string;
    height: number;
    abilities: Ability[];
    sprites: PokemonSprites
}
interface PokemonState {
    dataPokedex: Pokedex[];
    loading: boolean;
    currentPage: number
    itemsPerPage: number;
    totalPages: number;
    // pokedex: number[]
}

export const initialState: PokemonState = {
    dataPokedex: [],
    currentPage: 1,
    loading: false,
    itemsPerPage: 20,
    totalPages: 1,
    // pokedex: [],
};


export const getPokedex = createAsyncThunk('getPokedex', async (_, { getState }) => {
    const state = getState() as { pokemon: PokemonState };
    const promises = state.pokemon.dataPokedex.map((pokemon) => apiPokemon.get(`/${pokemon}`));
    const result = await Promise.all(promises);
    const data = result.map((response) => response?.data);
    if (data) {
        state.pokemon.dataPokedex
        return data
    }
    return []
}
);

const pokedexSlice = createSlice({
    name: 'pokedex',
    initialState,
    reducers: {
        // addPokedex: (state, action: PayloadAction<number>) => {
        //     const findpokemon = action.payload
        //     const data = state.dataPokedex.find(item => item.id === findpokemon)
        //     if (!data) {
        //         state.pokedex.push(findpokemon);
        //     }
        // },
        favorite: (state, action: PayloadAction<Pokedex>) => {
            const findpokemon = action.payload
            const data = state.dataPokedex.find(item => item.id === findpokemon.id)
            if (!data) {
                state.dataPokedex.push(findpokemon);
                return state
            }
            const index = state.dataPokedex.findIndex((pokemon) => pokemon.id === action.payload.id);
            state.dataPokedex.splice(index, 1)
            return state
        },
        // removePokedex: (state, action: PayloadAction<number>) => {
        //     const index = state.dataPokedex.findIndex((pokemon) => pokemon.id === action.payload);
        //     state.dataPokedex.splice(index, 1)
        //     return state
        // }

        // removePokedex: (state, action: PayloadAction<number>) => {
        //     const dataFavorite = state.dataPokedex.some((pokemon) => pokemon.id === action.payload)
        //     if (dataFavorite) {
        //         const index = state.dataPokedex.findIndex((pokemon) => pokemon.id === action.payload)
        //         state.pokedex.splice(index, 1)
        //     }
        //     return state
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getPokedex.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPokedex.fulfilled, (state, action) => {
            state.loading = false;
            state.dataPokedex = action.payload
        })
    },
});


export const { favorite } = pokedexSlice.actions;
export default pokedexSlice.reducer
