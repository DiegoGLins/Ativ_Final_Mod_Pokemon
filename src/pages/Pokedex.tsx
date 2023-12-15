
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Ability, PokemonSprites, TypePokemon } from "../types/PokemonType";
import { Grid, CircularProgress } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import NavBar from "../components/NavBar";

export interface Pokedex {
    id: number;
    name: string;
    height: number;
    abilities: Ability[];
    types: TypePokemon[]
    sprites: PokemonSprites
}
interface PokedexProps {
    pokemon?: Pokedex[]
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
            <NavBar />
            <Grid container spacing={2} >
                {pokedexRedux.loading ? <CircularProgress /> : !pokedexRedux.dataPokedex.length ? <h1>{error}</h1> : dataLocal.map((pokemon) => (
                    <Grid item key={pokemon.id} xs={12} sm={5} md={4} lg={3} sx={{ margin: '15px', display: 'inline-grid', justifyContent: 'center' }}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Pokedex;
