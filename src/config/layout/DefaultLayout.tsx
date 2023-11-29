import { AppBar, Avatar, Box, Container, Grid, IconButton, Toolbar } from '@mui/material';
import pokeball from '/pokeball_icon.png'
import React from 'react';

interface DefaultLayoutProps {
    children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1, marginBottom: '85px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <AppBar position="fixed" >
                    <Toolbar >
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <Avatar alt="Remy Sharp" src={pokeball} />
                        </IconButton>
                        <a style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} href='/pokedex' className='stylePokedex'> <strong style={{ color: '#000' }}>POKEDEX</strong></a>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid container>
                <Grid item xs={12}>
                    <Container>
                        {children}
                    </Container>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default DefaultLayout
