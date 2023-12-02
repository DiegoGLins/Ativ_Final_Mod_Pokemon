/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Snackbar, Alert, Box } from '@mui/material';
import { Ability, PokemonSprites } from '../types/PokemonType';
import ModalDetail from './ModalDetail';
import StarIcon from '@mui/icons-material/Star';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { favorite } from '../store/modules/pokedexSlice/pokedexSlice';

interface Pokedex {
    id: number;
    name: string;
    height: number;
    abilities: Ability[];
    sprites: PokemonSprites
}

interface PokemonCardProps {
    pokemon: Pokedex;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const isPokemonInPokedex = useAppSelector((state) => state.pokedex.dataPokedex.find(item => item.id === pokemon.id)?.id)

    const handlePokedex = () => {
        if (isPokemonInPokedex) {
            setAlertMessage("Pokemon removido da pokedex com sucesso")
            setOpenAlert(true)
            dispatch(favorite(pokemon));
        } else {
            setAlertMessage("Pokemon adicionado na pokedex com sucesso")
            setOpenAlert(true)
            dispatch(favorite(pokemon));
        }
    };

    function handleClose() {
        setOpenModal(false)
    }

    console.log(isPokemonInPokedex)
    return (
        <>
            <ModalDetail isOpen={openModal} actionCancel={() => handleClose()} pokemon={pokemon} />
            <Box sx={{ display: 'flex', width: '300px', height: '500px', justifyContent: 'space-between' }}>
                <Card sx={{ paddingTop: '15px', backgroundColor: 'antiquewhite', width: '300px', height: '490px', margin: '12px' }}>
                    <Button onClick={handlePokedex} sx={{ color: `${isPokemonInPokedex ? '#eac625' : '#ddd8dd'}`, alignSelf: 'end', display: 'flex', paddingInlineStart: '15px' }}>
                        <StarIcon sx={{ padding: '3px', borderRadius: '100%', width: '21px', height: '21px', backgroundColor: `${isPokemonInPokedex ? "#000" : "#d58318"}` }} className='favoritePokemon' />
                    </Button>
                    <CardMedia sx={{ borderRadius: '20px' }}
                        component="img"
                        alt={pokemon?.name}
                        height="270"
                        width='250'
                        image={pokemon?.sprites.front_default} />
                    <CardContent>
                        <Typography variant="body1" color='primary.main'>
                            <strong>{pokemon?.name}</strong>
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            ID: {pokemon?.id}
                        </Typography>
                        <Typography variant="body1" color="secondary.contrastText">
                            Height: {pokemon?.height}
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
