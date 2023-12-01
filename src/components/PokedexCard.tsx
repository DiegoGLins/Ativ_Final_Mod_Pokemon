import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button } from '@mui/material';
import { Pokemon } from '../types/PokemonType';
import ModalDetail from './ModalDetail';
// import apiPokemon from '../service/api.service';

interface PokedexCardProps {
    pokemon: Pokemon
    pokedexId?: number
}

const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
    const [openModal, setOpenModal] = useState<boolean>(false)

    function handleClose() {
        setOpenModal(false)
    }

    return (
        <>
            <ModalDetail isOpen={openModal} actionCancel={() => handleClose()} pokemon={pokemon!} />
            <Box>
                <Grid container sx={{ width: '300px', height: '580px', alignItems: 'center', justifyContent: 'center' }}>
                    <Card sx={{ paddingTop: '15px', backgroundColor: 'antiquewhite', width: '500px', alignItems: 'center', justifyContent: 'center' }}>
                        <CardMedia
                            component="img"
                            alt={pokemon.name}
                            height="300"
                            width='480'
                            image={pokemon?.sprites.front_default} />
                        <CardContent >
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
                </Grid>
            </Box>
        </>
    );
};

export default PokedexCard;
