/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiPokemon from '../../../service/api.service';
import { Ability, Pokemon, PokemonSprites } from '../../../types/PokemonType';
import axios from 'axios';

// interface Pokedex {
//     id: number;
//     name: string;
//     height: number;
//     abilities: Ability[];
//     sprites: PokemonSprites
// }
interface PokemonState {
    data: Pokemon[];
    loading: boolean;
    currentPage: number
    itemsPerPage: number;
    totalPages: number;
    // pokedex: number[]
}

export const initialState: PokemonState = {
    data: [],
    currentPage: 1,
    loading: false,
    itemsPerPage: 20,
    totalPages: 1,
    // pokedex: [],
};


export const getPokemon = createAsyncThunk('getPokemon', async (page: number, { getState }) => {
    const state = getState() as { pokemon: PokemonState };
    const { itemsPerPage } = state.pokemon;
    const response = await apiPokemon.get(`/?limit=20&offset=${(page - 1) * 20}`)
    const totalCount = response.data.count;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const promises = response.data.results.map((p: any) => {
        return axios.get(p.url);
    });

    const result = await Promise.all(promises);

    const data = result.reduce((acc, val) => {
        acc.push(val.data);
        return acc;
    }, []);
    return { data, totalPages, page };
}
);


const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        pokemons: (state, action) => {
            state.data = action.payload
            return state
        }
        // addPokedex: (state, action: PayloadAction<number>) => {
        //     const findpokemon = action.payload
        //     const data = state.pokedex.find(item => item === findpokemon)
        //     if (!data) {
        //         state.pokedex.push(findpokemon);
        //     }
        // },
        // removePokedex: (state, action: PayloadAction<number>) => {
        //     const index = state.pokedex.findIndex((pokemon) => pokemon === action.payload);
        //     state.pokedex.splice(index, 1)
        //     return state
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getPokemon.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPokemon.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.totalPages = action.payload.totalPages
            state.currentPage = action.payload.page
        })
    },
});


export const { pokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer
