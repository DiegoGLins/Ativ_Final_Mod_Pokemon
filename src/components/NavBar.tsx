import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import pokedex from '/pokedex.png'
import pokemonTitle from '/pokemon-title.png'
import { useNavigate, } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { AppBar, Button, Grid, Toolbar } from '@mui/material'
import pokeballPikachu from '/pokeball-pikachu.png'

const NavBar = () => {

    const navigate = useNavigate()

    function handleGoBack() {
        navigate('/')
    }

    function handlePokedex() {
        navigate('/pokedex')
    }

    const pokedexRedux = useAppSelector((state) => state.pokedex.dataPokedex)

    return (
        <Grid container item xs={12} sm={6} md={4} lg={3} sx={{ flexGrow: 1, marginBottom: '170px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <AppBar position="fixed" >
                <Toolbar sx={{ gap: "2px", height: '130px' }}>
                    <img style={{ padding: '12px 40px 0px 60px', height: '75px', width: '80px' }} alt="Remy Sharp" src={pokeballPikachu} />
                    <Button onClick={handleGoBack}>
                        <ArrowBackIcon className='styleGoBack' style={{ padding: '18px 50px 0px 0px', color: "#fff", height: '60px', width: '35px' }} />
                    </Button>
                    <Button onClick={handlePokedex} style={{ textDecoration: 'none' }} className='stylePokedex'>
                        <strong className='hideTitlePokedex' style={{ color: '#fff', padding: '0px 10px 0px 0px', fontSize: '45px', position: 'relative', top: '10px' }}>POKEDEX</strong>
                        <img src={pokedex} style={{ height: '130px', width: '170px', zIndex: '-2px', paddingTop: '32px' }} />
                        <strong style={{ color: '#fff' }} className={pokedexRedux.length > 9 ? 'countPokedex' : 'countSinglePokedex'}>{pokedexRedux.length}</strong>
                    </Button>
                    <img className='hideTitlePokemon' src={pokemonTitle} style={{ height: '120px', width: '340px', paddingLeft: '75px' }} alt='pokemon-title'></img>
                </Toolbar>
            </AppBar>
        </Grid>
    )
}

export default NavBar

