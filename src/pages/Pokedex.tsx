
import { useEffect, useState } from "react";
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
    const [dataLocal, setDataLocal] = useState<Pokemon[]>([])
    const pokedexRedux = useAppSelector((state) => state.pokemon.pokedex)

    useEffect(() => {
        if (!pokedexRedux) {
            setError("Nenhum pokemon favoritado ainda")
        }
        setLoading(true)
        setDataLocal(pokedexRedux)
        setLoading(false)
    }, [])
    console.log(pokedexRedux)

    return (
        <div>
            <Grid container spacing={2} marginBottom={'30px'}>
                {loading ? <CircularProgress /> : !dataLocal ? <h1>{error}</h1> : dataLocal.map((pokemon) => (
                    <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
                        <PokedexCard pokedex={pokemon} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Pokedex;
