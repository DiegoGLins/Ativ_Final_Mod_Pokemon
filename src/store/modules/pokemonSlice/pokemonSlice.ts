/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiPokemon from '../../../service/api.service';
import { Pokemon } from '../../../types/PokemonType';
import axios from 'axios';

interface PokemonState {
    data: Pokemon[];
    loading: boolean;
    currentPage: number
    itemsPerPage: number;
    totalPages: number;
    pokedex: Pokemon[]

}

const initialState: PokemonState = {
    data: [],
    currentPage: 1,
    loading: false,
    itemsPerPage: 20,
    totalPages: 1,
    pokedex: []
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
        addPokedex: (state, action: PayloadAction<Pokemon>) => {
            const findPokemon = state.pokedex.find((pokemon) => pokemon.id === action.payload.id)
            if (findPokemon) {
                state.data.push(findPokemon)
                state.pokedex = state.data
                return state
            }
        },
        removePokedex: (state, action: PayloadAction<number>) => {
            const index = state.pokedex.findIndex((pokemon) => pokemon.id === action.payload);
            state.pokedex.splice(index, 1)
            return state
        }
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
        });
    },
});


export const { addPokedex, removePokedex } = pokemonSlice.actions;
export default pokemonSlice.reducer
