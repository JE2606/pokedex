import axios from 'axios'
import { pokemonSchema } from '../schemas/pokemon.schema.js'


export const getPokemons = async (req, res) => {
    try {

        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151', { timeout: 10000 })
        const pokemons = await Promise.all(
            response.data.results.map(async (pokemon) => {
                const detail = await axios.get(pokemon.url)
                return {
                    name: pokemon.name,
                    types: detail.data.types.map((t) => t.type.name),
                    image: detail.data.sprites.front_default,
                }
            }
            ))

        res.status(200).json(pokemons)

    }
    catch (error) {

        console.error(error)
        res.status(500).json({ error: "Error al obtener los pokemons" })

    }
}

export const getPokemon = async (req, res) => {
    try {
        const { id } = req.params
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

        const data = response.data

        const pokemon = {
            name: data.name,
            types: data.types.map((t) => t.type.name),
            image: data.sprites.front_default,
            stats: {
                hp: data.stats.find((s) => s.stat.name === "hp").base_stat,
                attack: data.stats.find((s) => s.stat.name === "attack").base_stat,
                defense: data.stats.find((s) => s.stat.name === "defense").base_stat,
                speed: data.stats.find((s) => s.stat.name === "speed").base_stat,
                height: data.height
            }
        }

        res.status(200).json(pokemon)

    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error al obtener el pokemon" })
    }
}

let pokemonList = []

export const createPokemon = async (req, res) => {
    try {
        const validatedData = pokemonSchema.parse(req.body)

        const exist = pokemonList.some((p) => p.name.toLowerCase() === validatedData.name.toLowerCase())
        if (exist) return res.status(400).json({ error: "Pokemon ya existe" })

        pokemonList.push(validatedData)
        res.status(200).json({ message: "Pokemon creado", data: validatedData })

    } catch (error) {

        if (error.errors) {
            return res.status(400).json({ error: "Datos inválidos", details: error.errors });
        }
        console.error("Error al crear el Pokémon:", error);
        res.status(500).json({ error: "Error interno del servidor" });

    }
}

export const updatePokemon = async (req, res) => {

    const { id } = req.params

    const index = pokemonList.findIndex(pokemon => pokemon.id === parseInt(id))

    if (index === -1) {
        return res.status(404).json({ error: "Pokemon no encontrado" })
    }

    try {
        const validatedData = pokemonSchema.parse(req.body)
        pokemonList[index] = { ...pokemonList[index], ...validatedData }
        res.status(200).json({ message: "Pokemon Actualizado", data: pokemonList[index] })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error al actualizar el pokemon" })
    }

}

export const deletePokemon = async (req, res) => {

    const { id } = req.params

    pokemonList = pokemonList.filter(pokemon => pokemon.id !== parseInt(id))

    if (pokemonList.length === pokemonList.length - 1) {
        return res.status(200).json({ message: "Pokemon Eliminado" })
    }
    res.status(500).json({ error: "Error al eliminar el pokemon" })
}