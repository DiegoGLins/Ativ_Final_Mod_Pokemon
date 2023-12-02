import { AppBar, Avatar, Box, Container, Grid, Toolbar } from '@mui/material';
import pokeball from '/pokeball_icon.png'
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface DefaultLayoutProps {
    children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    const pokedexRedux = useAppSelector((state) => state.pokedex.dataPokedex)

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1, marginBottom: '85px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <AppBar position="fixed" >
                    <Toolbar sx={{ gap: "2px", }}>
                        <Avatar style={{ paddingRight: '30px' }} alt="Remy Sharp" src={pokeball} />
                        <a href='/'>
                            <ArrowBackIcon className='styleGoBack' style={{ paddingRight: '50px', color: "#000", height: '60px', width: '35px' }} />
                        </a>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontFamily: 'sans-serif',
                            fontSize: '35px',
                            color: '#000',
                        }} >
                            <a className='stylePokedex' href='/pokedex' style={{ textDecoration: 'none' }} ><strong style={{ color: '#000', textDecoration: 'none', paddingRight: '10px' }}>POKEDEX</strong></a><strong>{'- '}{`${pokedexRedux.length}`}</strong></div>
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
