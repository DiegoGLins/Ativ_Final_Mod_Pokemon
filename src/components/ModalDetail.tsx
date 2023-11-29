import { Card, CardMedia, CardContent, Typography, Modal, Box, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { Pokemon } from '../types/PokemonType';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    heigth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 50,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
    gap: '15px',
    borderRadius: 4

};

interface ModalDetailProps {
    isOpen: boolean
    actionCancel: () => void
    pokemon: Pokemon
}


const ModalDetail: React.FC<ModalDetailProps> = ({ pokemon, actionCancel, isOpen }) => {

    return (
        <Modal
            onClose={actionCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={isOpen}
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={actionCancel}
                    sx={{ position: 'absolute', right: 28, top: 28, color: (theme) => theme.palette.grey[500], }}>
                    <CloseIcon />
                </IconButton>
                <Card >
                    <CardContent style={{ display: 'flex', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <CardMedia
                            component="img"
                            alt={pokemon.name}
                            height="250"
                            width='480'
                            image={pokemon.sprites.front_default}
                        />
                        <Grid container style={{ display: 'flex', width: '980px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingRight: '50px' }}>
                            <Typography variant="body1" width={'100px'} color='primary.main'>
                                {pokemon.name}
                            </Typography>
                            <Typography variant="body1" width={'100px'} color="text.secondary">
                                ID: {pokemon.id}
                            </Typography>
                            <Typography variant="body1" color="secondary.contrastText">
                                Height: {pokemon.height}
                            </Typography>
                            <Grid item key={pokemon.id} width={'200px'} justifyContent={'center'} alignItems={'center'}>
                                <strong >Abilities :</strong>
                                {pokemon.abilities.map((p) => (
                                    <Typography>{p.ability.name}</Typography>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
};

export default ModalDetail;
