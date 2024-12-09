import { z } from 'zod';

export const pokemonSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(50, "El nombre debe tener menos de 50 caracteres"),
    type: z.enum(["fire", "water", "grass", "electric", "psychic", "rock", "ground", "flying", "bug", "poison", "normal", "dark", "steel", "fairy", "ice", "dragon", "ghost", "fighting"], "El tipo debe ser válido"),
    stats: (z.object({
        hp: z.number().min(1, "El HP debe ser un número mayor a 0").max(255, "El HP debe ser un número menor a 255"),
        attack: z.number().min(1, "El ataque debe ser un número mayor a 0").max(100, "El ataque debe ser un número menor a 100"),
        defense: z.number().min(1, "La defensa debe ser un número mayor a 0").max(100, "La defensa debe ser un número menor a 100"),
        speed: z.number().min(1, "La velocidad debe ser un número mayor a 0").max(100, "La velocidad debe ser un número menor a 100"),
        height: z.number().min(1, "La altura debe ser un número mayor a 0").max(20, "La altura debe ser un número menor a 20"),
    }))
})