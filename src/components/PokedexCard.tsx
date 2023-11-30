import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from '@mui/material';
import { Pokemon } from '../types/PokemonType';
import ModalDetail from './ModalDetail';

interface PokedexCardProps {
    pokedex: Pokemon
}

const PokedexCard: React.FC<PokedexCardProps> = ({ pokedex }) => {
    const [openModal, setOpenModal] = useState<boolean>(false)


    function handleClose() {
        setOpenModal(false)
    }

    return (
        <>
            <ModalDetail isOpen={openModal} actionCancel={() => handleClose()} pokemon={pokedex} />
            <Box>
                <Grid container sx={{ width: '300px', height: '580px', alignItems: 'center', justifyContent: 'center' }}>
                    <Card sx={{ paddingTop: '15px', backgroundColor: 'antiquewhite', width: '500px', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>
                        <CardMedia
                            component="img"
                            alt={pokedex!.name}
                            height="220"
                            width='480'
                            image={pokedex.sprites.front_default} />
                        <CardContent >
                            <Typography variant="body1" color='primary.main'>
                                <strong>{pokedex.name}</strong>
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                ID: {pokedex.id}
                            </Typography>
                            <Typography variant="body1" color="secondary.contrastText">
                                Height: {pokedex.height}
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
