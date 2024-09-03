
import { useEffect, useState } from 'react';
import './App.css';

// species 정보 부르기
async function fetchPokemonData(limit = 15, offset = 0) {
  // 1. 기본 data 불러오기
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  // 2. specise 에서 정보 가져오기
  const speciesPromises = data.results.map(async (pokemon) => {
    const pokemonDetailsResponse = await fetch(pokemon.url);
    const pokemonDetails = await pokemonDetailsResponse.json();

    const speciesDetailsResponse = await fetch(pokemonDetails.species.url);
    const speciesDetails = await speciesDetailsResponse.json();

    //const pokemonTypeResponse = await fetch(pokemonDetails.types.url);
    //const pokemonTypeDetails = await pokemonTypeResponse.json();
    console.log(pokemonDetails.types);

    // 3. specise 정보에서 한국어 가져오기
    const pokeId = speciesDetails.id;
    const koreanName = speciesDetails.names.find(
      (name) => name.language.name === 'ko'
    );
    const generas = speciesDetails.genera.find(
      (gen) => gen.language.name === 'ko'
    )?.genus;
    const flavorTexts = speciesDetails.flavor_text_entries.find(
      (entry) => entry.language.name === 'ko' && entry.version.name === 'omega-ruby'
    )?.flavor_text;
    const poke_img = pokemonDetails.sprites.versions['generation-v']['black-white'].animated.front_default;
    
    return {
      name: koreanName ? koreanName.name : pokemon.name,
      species: pokemon.url, flavorTexts, generas, pokeId, poke_img
    };
  });

  return Promise.all(speciesPromises);

  
}


function App() {
  
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetchPokemonData().then((finalData) => {
      setPokemonData(finalData);
    });
  }, []);
  
  //console.log(pokemonData);
  
  const style = { border: `1px solid #eee`, }
  
  return (
    <div className="App">
      
      <div className='poke_list'>
        {
          pokemonData.map((pokemon) => {
              return(
                <div key={pokemon.pokeId} className='poke_ball' style={style}>
                  <p className='poke_num'>{pokemon.pokeId}</p>
                  {/* <div><img src={pokemon.poke_img} alt={pokemon.name} /></div> */}
                  <p className='poke_name'>{pokemon.name}</p>
                  <p className='poke_genera'>{pokemon.generas}</p>
                  <p className='summary'>{pokemon.flavorTexts}</p>
                </div>
              );
          })
        }
      </div>

    </div>
  );
}

export default App;
