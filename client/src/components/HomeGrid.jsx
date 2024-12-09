import { useEffect, useState } from 'react'

const HomeGrid = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/pokemons');
                const data = await response.json();
                setPokemons(data);
            } catch (error) {
                console.error('Error al obtener los pokemons', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-rows-6 gap-3">
                
                {[...Array(15)].map((_, index) => (
                    <div key={index} className="w-full h-32 bg-gray-300 rounded-md animate-pulse"></div>
                ))}
            </div>
        );
    }

    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-rows-6 gap-3'>
            {pokemons && pokemons.length > 0 ? (
                pokemons.map((pokemon) => (
                    <div key={pokemon.id} className="relative col-span-1 row-span-2">
                        <div className="group relative w-full h-32 overflow-hidden rounded-md cursor-pointer shadow-sm">
                            <img
                                src={pokemon.image}
                                alt={pokemon.name}
                                loading="lazy"
                                className="object-contain w-full h-full transition duration-300 ease-in-out transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 p-4 bg-black bg-opacity-50 flex flex-col justify-between text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ">
                                <p className="text-lg font-semibold">{pokemon.name}</p>
                                <p className="text-sm italic">{pokemon.types.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No se encontraron Pokémon.</p>
            )}
        </div>
    );
};

export default HomeGrid;
