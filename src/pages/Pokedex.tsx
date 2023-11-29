
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Pokemon } from "../types/PokemonType";
import { Grid, CircularProgress } from "@mui/material";
import PokedexCard from "../components/PokedexCard";

interface PokedexProps {
    pokemon: Pokemon
}

const Pokedex: React.FC<PokedexProps> = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const pokedexRedux = useAppSelector((state) => state.pokemon.data)

    console.log(pokedexRedux)

    return (
        <div>
            {/* <PokedexCard pokedex={pokedexRedux[0]} /> */}
            <Grid container spacing={2} marginBottom={'30px'}>
                {loading ? <CircularProgress /> : !pokedexRedux ? <h1>{error}</h1> : pokedexRedux.map((pokemon) => (
                    <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
                        <PokedexCard pokedex={pokemon} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Pokedex;
