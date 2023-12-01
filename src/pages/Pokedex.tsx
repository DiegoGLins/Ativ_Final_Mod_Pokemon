
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Pokemon } from "../types/PokemonType";
import { Grid, CircularProgress } from "@mui/material";
import PokedexCard from "../components/PokedexCard";
import apiPokemon from "../service/api.service";

interface PokedexProps {
    pokemon: Pokemon
}

const Pokedex: React.FC<PokedexProps> = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [dataLocal, setDataLocal] = useState<Pokemon[]>([])
    const pokedexRedux = useAppSelector((state) => state.pokemon.pokedex)

    useEffect(() => {
        setLoading(true)
        if (!pokedexRedux.length) {
            setError("Nenhum pokemon favoritado ainda")
            setLoading(false)
        }
        else {
            const fetchDataForPokedex = async () => {
                const promises = pokedexRedux.map((pokemonId) => apiPokemon.get(`/${pokemonId}`));
                const result = await Promise.all(promises);
                const data = result.map((response) => response.data);
                setDataLocal(data);
                setLoading(false);
            };
            fetchDataForPokedex();
            setLoading(false)
        }
    }, [pokedexRedux])
    console.log(pokedexRedux)

    return (
        <div>
            <Grid container spacing={2} marginBottom={'30px'}>
                {loading ? <CircularProgress /> : !dataLocal.length ? <h1>{error}</h1> : dataLocal.map((pokemon) => (
                    <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
                        <PokedexCard pokemon={pokemon} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Pokedex;
