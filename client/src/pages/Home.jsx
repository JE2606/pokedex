import HomeGrid from "../components/HomeGrid"


const Home = () => {
    return (

        <section
            className="w-full min-h-screen flex flex-col section__home"
        >
            <div className="background__home">
                <div className="flex flex-col md:flex-row md:py-0 md:px-40 py-10 px-8">
                    <div className="md:w-1/2 md:h-[100dvh] w-full flex flex-col justify-end">
                        <h1 className="text-6xl font-semibold text-slate-700 mb-8">Pokedex</h1>
                        <img
                            src="/heroFirstImg.jpg"
                            alt="All pokemons"
                            className="md:h-[460px] md:w-[300px] md:object-contain h-[90dvh] w-full object-contain rounded-md"
                        />
                    </div>
                        <div className="md:w-1/2 w-full flex flex-col justify-center">
                            <img
                                src="heroSecondImg.webp"
                                alt="Pokemons"
                                className="w-full" />
                            <h4 className="my-3 text-2xl font-medium text-slate-600">Bienvenido a tu Pokédex</h4>
                            <p className="text-slate-500">¡Felicidades, entrenador! Estás a punto de embarcarte en una increíble aventura llena de criaturas asombrosas. Aquí encontrarás información detallada sobre los Pokémon que descubras en tu viaje. ¡Prepárate para capturarlos todos y convertirte en el mejor entrenador!</p>
                        </div>
                </div>
            </div>
            <section className="md:py-0 md:px-40 py-10 px-8 mt-5">
                <HomeGrid />
            </section>
        </section>



    )
}

export default Home