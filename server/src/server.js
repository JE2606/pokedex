import express from 'express'
import cors from 'cors'
import pokemonRoutes from './routes/pokemon.routes.js'

const app = express()

app.use(cors({

    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use('/api', pokemonRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server run: http://localhost:${PORT}`)
})