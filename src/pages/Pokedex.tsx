
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Ability, PokemonSprites } from "../types/PokemonType";
import { Grid, CircularProgress } from "@mui/material";
import PokemonCard from "../components/PokemonCard";

interface Pokedex {
    id: number;
    name: string;
    height: number;
    abilities: Ability[];
    sprites: PokemonSprites
}
interface PokedexProps {
    pokemon: Pokedex[]
}

const Pokedex: React.FC<PokedexProps> = () => {
    const [error, setError] = useState('')
    const [dataLocal, setDataLocal] = useState<Pokedex[]>([])
    const pokedexRedux = useAppSelector((state) => state.pokedex)

    useEffect(() => {
        if (!pokedexRedux.dataPokedex.length) {
            setError("Nenhum pokemon favoritado ainda")
        }
        else {
            setDataLocal(pokedexRedux.dataPokedex)
        }
    }, [pokedexRedux])

    return (
        <div>
            <Grid container spacing={2} >
                {pokedexRedux.loading ? <CircularProgress /> : !pokedexRedux.dataPokedex.length ? <h1>{error}</h1> : dataLocal.map((pokemon) => (
                    <Grid sx={{ margin: '15px' }} item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Pokedex;
