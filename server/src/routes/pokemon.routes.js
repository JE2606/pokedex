import express from 'express';

import {
    getPokemons,
    getPokemon,
    createPokemon,
    updatePokemon,
    deletePokemon
} from '../controllers/pokemon.controller.js';

const routes = express.Router();

routes.get('/pokemons', getPokemons);
routes.get('/pokemons/:id', getPokemon);
routes.post('/pokemons/create', createPokemon);
routes.put('/pokemons/:id', updatePokemon);
routes.delete('/pokemons/:id', deletePokemon);

export default routes