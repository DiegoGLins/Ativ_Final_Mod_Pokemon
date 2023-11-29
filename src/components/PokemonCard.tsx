import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import { Pokemon } from '../types/PokemonType';
import ModalDetail from './ModalDetail';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addPokedex, removePokedex } from '../store/modules/pokemonSlice/pokemonSlice';

interface PokemonCardProps {
    pokemon: Pokemon;
    pokedex?: Pokemon
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState<boolean>(false)
    const isPokemonInPokedex = useAppSelector((state) => state.pokemon.pokedex.some((p) => p.id === pokemon!.id));

    const handlePokedex = (data: Pokemon) => {
        if (isPokemonInPokedex) {
            dispatch(removePokedex(data.id));
        } else {
            dispatch(addPokedex(data));
            // dispatch(getPokemon(data.id))
            console.log(data!)
        }
    };

    function handleClose() {
        setOpenModal(false)
    }

    return (
        <>
            <ModalDetail isOpen={openModal} actionCancel={() => handleClose()} pokemon={pokemon} />
            <Card sx={{ paddingTop: '15px', backgroundColor: 'antiquewhite' }}>
                <Button onClick={() => handlePokedex(pokemon!)} sx={{ alignSelf: 'end', display: 'flex', paddingInlineStart: '15px', color: "#000" }}>
                    <StarOutlineIcon className='favoritePokemon' />
                </Button>
                <CardMedia
                    component="img"
                    alt={pokemon.name}
                    height="220"
                    width='80'
                    image={pokemon.sprites.front_default} />
                <CardContent>
                    <Typography variant="body1" color='primary.main'>
                        <strong>{pokemon.name}</strong>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        ID: {pokemon.id}
                    </Typography>
                    <Typography variant="body1" color="secondary.contrastText">
                        Height: {pokemon.height}
                    </Typography>
                    <Grid item xs={12} sx={{ padding: '15px 0px 0px 0px' }} justifyContent={'center'} alignItems={'center'}>
                        <Button onClick={() => setOpenModal(true)} variant='contained'>Detalhes</Button>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
};

export default PokemonCard;
