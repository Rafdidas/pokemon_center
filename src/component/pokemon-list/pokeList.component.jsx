import PokeBall from '../poke-ball/pokeBall.component';
import './pokeList.style.css';

const PokeList = ({pokemons}) => {
    return (
        <div className='poke_list'>
        {
          pokemons.map((pokemon, index) => {
              return(
                <PokeBall key={index} pokemons={pokemon} />
              );
          })
        }
      </div>
    )
}

export default PokeList;