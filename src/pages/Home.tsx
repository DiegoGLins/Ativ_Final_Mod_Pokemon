import React from 'react';
import ListPokemon from '../components/ListPokemon';
import NavBar from '../components/NavBar';

const Home: React.FC = () => {
    return (
        <React.Fragment >
            <NavBar />
            <ListPokemon />
        </React.Fragment>
    );
};

export default Home;
