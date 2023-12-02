import { AppBar, Grid, Toolbar } from '@mui/material'
import pokeballPikachu from '/pokeball-pikachu.png'
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import pokedex from '/pokedex.png'
import pokemonTitle from '/pokemon-title.png'
interface DefaultLayoutProps {
    children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    const pokedexRedux = useAppSelector((state) => state.pokedex.dataPokedex)

    return (
        <React.Fragment>
            <Grid container item xs={12} md={8} sm={6} sx={{ flexGrow: 1, marginBottom: '150px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <AppBar position="fixed" >
                    <Toolbar sx={{ gap: "2px", height: '130px' }}>
                        <img style={{ padding: '12px 40px 0px 60px', height: '75px', width: '80px' }} alt="Remy Sharp" src={pokeballPikachu} />
                        <a href='/'>
                            <ArrowBackIcon className='styleGoBack' style={{ padding: '18px 50px 0px 0px', color: "#fff", height: '60px', width: '35px' }} />
                        </a>
                        <a className='stylePokedex' href='/pokedex' style={{ textDecoration: 'none' }} >
                            <strong style={{ color: '#fff', padding: '0px 10px 0px 0px', fontSize: '45px', position: 'relative', bottom: '50px' }}>POKEDEX</strong>
                            <img src={pokedex} style={{ height: '130px', width: '170px', zIndex: '-2px', paddingTop: '32px' }} />
                            <strong style={{ color: '#fff' }} className='countPokedex'>{pokedexRedux.length}</strong>
                        </a>
                        <img src={pokemonTitle} style={{ height: '120px', width: '340px', paddingLeft: '75px' }} alt='pokemon-title'></img>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid container>
                {children}
            </Grid>
        </React.Fragment>
    );
};

export default DefaultLayout
