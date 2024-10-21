import { useNavigate } from 'react-router-dom';
import './pokeBall.style.css';

const PokeBall = ({ pokemons }) => {
    const navigate = useNavigate();

    return (
        <div key={pokemons.pokeId} className='poke_ball' onClick={() => { navigate(`/detail/${pokemons.pokeId}`) }}>
            <div className='name_section'>
                <img src={process.env.PUBLIC_URL + `/img/pixel_ball.png`} alt="pixel_ball" />
                <p className='poke_name'>{pokemons.pokeId}. {pokemons.name}</p>
            </div>
            
            <div className='poke_img'><img src={pokemons.poke_img} alt={pokemons.name} /></div>
            <ul className='poke_type'>
            {
                pokemons.types.map((type,index) => {
                return (
                    <li 
                        key={index} 
                        className={`bg_${type.engType}`}
                    >
                        <img src={process.env.PUBLIC_URL + `/img/type_${type.engType}.svg`} alt={type.engType} />
                        <span>{type.koreanType}</span>
                    </li>
                )
                })
            }
            </ul>
            {/* <p className='poke_genera'>{pokemons.generas}</p> */}
            {/* <p className='summary'>{pokemons.flavorTexts}</p> */}
            {/* {
                pokemons.flavorTexts.slice(0, 3).map((text) => {
                    return (
                        <p key={pokemons.pokeId}>{text}</p>
                    )
                })
            } */}
        </div>
    );
}

export default PokeBall;