import './pokeBall.style.css';

const PokeBall = ({ pokemons }) => {
    return (
        <div key={pokemons.pokeId} className='poke_ball' >
            <p className='poke_num'>{pokemons.pokeId}</p>
            <p className='poke_name'>{pokemons.name}</p>
            <p className='poke_genera'>{pokemons.generas}</p>
            {/* <div><img src={pokemon.poke_img} alt={pokemon.name} /></div> */}
            <ul className='poke_type'>
            {
                pokemons.types.map((type,index) => {
                return (
                    <li key={index}>{type.koreanType}</li>
                )
                })
            }
            </ul>
            {
                pokemons.flavorTexts.slice(0, 3).map((text) => {
                    return (
                        <p key={pokemons.pokeId}>{text}</p>
                    )
                })
            }
            
            {/* <p className='summary'>{pokemons.flavorTexts}</p> */}
        </div>
    );
}

export default PokeBall;