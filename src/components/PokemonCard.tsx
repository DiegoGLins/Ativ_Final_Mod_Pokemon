/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Snackbar, Alert, Box } from '@mui/material';
import { Pokemon } from '../types/PokemonType';
import ModalDetail from './ModalDetail';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addPokedex, removePokedex } from '../store/modules/pokemonSlice/pokemonSlice';

interface PokemonCardProps {
    pokemon: Pokemon;
    pokedex?: Pokemon
    index?: number
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [addFavorite, setAddFavorite] = useState<boolean>(false)
    const isPokemonInPokedex = useAppSelector((state) => state.pokemon.pokedex.some((p) => p.id === pokemon!.id));

    const handlePokedex = (data: Pokemon) => {
        if (isPokemonInPokedex) {
            setAddFavorite(false)
            setAlertMessage("Pokemon removido da pokedex com sucesso")
            setOpenAlert(true)
            setTimeout(() => {
                dispatch(removePokedex(data.id));
            }, 500)
        } else {
            setAddFavorite(true)
            setAlertMessage("Pokemon adicionado na pokedex com sucesso")
            setOpenAlert(true)
            setTimeout(() => {
                dispatch(addPokedex(data));
            }, 500)
        }
    };

    function handleClose() {
        setOpenModal(false)
    }

    return (
        <>
            <ModalDetail isOpen={openModal} actionCancel={() => handleClose()} pokemon={pokemon} />
            <Box >
                <Card sx={{ paddingTop: '15px', backgroundColor: 'antiquewhite' }}>
                    <Button onClick={() => handlePokedex(pokemon)} sx={{ color: `${addFavorite ? '#eac625' : '#ddd8dd'}`, alignSelf: 'end', display: 'flex', paddingInlineStart: '15px' }}>
                        <StarIcon sx={{ padding: '3px', borderRadius: '100%', width: '21px', height: '21px', backgroundColor: `${addFavorite ? "#000" : "#d58318"}` }} className='favoritePokemon' />
                    </Button>
                    <CardMedia sx={{ borderRadius: '20px' }}
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
                <Snackbar className='styleAlert' open={openAlert} autoHideDuration={1900} onClose={() => setOpenAlert(false)}>
                    <Alert variant='filled' onClose={() => setOpenAlert(false)} severity="success">
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Box >
        </>
    );
};

export default PokemonCard;
