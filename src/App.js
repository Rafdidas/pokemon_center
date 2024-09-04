
import { useEffect, useState } from 'react';
import './App.css';

import Header from './component/header/header.component';
import SearchBox from './component/search-box/searchBox.component';
import PokeList from './component/pokemon-list/pokeList.component';
import TypeList from './component/type-list/typeList.component';
// 포켓몬 데이터를 가져오는 함수
async function fetchPokemonData(limit = 16, offset = 0) {
  // 1. 기본 data 불러오기
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  // 2. species 및 이미지, 타입 정보 가져오기
  const speciesPromises = data.results.map(async (pokemon) => {
    const pokemonDetailsResponse = await fetch(pokemon.url);
    const pokemonDetails = await pokemonDetailsResponse.json();

    const speciesDetailsResponse = await fetch(pokemonDetails.species.url);
    const speciesDetails = await speciesDetailsResponse.json();
    // 3. 각 타입의 추가 정보 가져오기
    const typesPromises = pokemonDetails.types.map(async (typeInfo) => {
      const typeResponse = await fetch(typeInfo.type.url);
      const typeDetails = await typeResponse.json();
      const koreanType = typeDetails.names.find(
        (type) => type.language.name === 'ko'
      );
      return {
        name: typeInfo.type.name,
        koreanType: koreanType ? koreanType.name : typeInfo.type.name,
        url: typeInfo.type.url,
      };
    });
    // 모든 타입의 정보를 가져오기
    const types = await Promise.all(typesPromises);
    // species 정보에서 한국어 이름, genera, flavor text 가져오기
    const pokeId = speciesDetails.id;
    const koreanName = speciesDetails.names.find(
      (name) => name.language.name === 'ko'
    );
    const generas = speciesDetails.genera.find(
      (gen) => gen.language.name === 'ko'
    )?.genus;
    // const flavorTexts = speciesDetails.flavor_text_entries.find(
    //   (entry) => entry.language.name === 'ko' && entry.version.name === 'omega-ruby'
    // )?.flavor_text;
    const flavorTexts = speciesDetails.flavor_text_entries
      .filter((entry) => entry.language.name === 'ko' && entry.version.name === 'omega-ruby')
      .map((entry) => entry.flavor_text);

    const poke_img = pokemonDetails.sprites.versions['generation-v']['black-white'].animated.front_default;
    
    

    return {
      name: koreanName ? koreanName.name : pokemon.name,
      species: pokemon.url, flavorTexts, generas, pokeId, poke_img, types
    };
    
  });
  return Promise.all(speciesPromises);
}

function App() {
  
  const [pokemonData, setPokemonData] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  useEffect(() => {
    fetchPokemonData().then((finalData) => {
      setPokemonData(finalData);
      setFilteredPokemon(finalData);
    });
  }, []);

  useEffect(() => {
    const newFilteredPokemon = pokemonData.filter((poke) => {
      return poke.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredPokemon(newFilteredPokemon);
  }, [pokemonData, searchField]);

  const onSearchChange = (envent) => {
    const searchFieldSrting = envent.target.value.toLocaleLowerCase();
    setSearchField(searchFieldSrting);
  }
  
  return (
    <div className="App">
      <Header />
      <div className='cntbody'>
        <SearchBox onSearchChange={onSearchChange} />
        <TypeList pokemons={filteredPokemon} />
        <PokeList pokemons={filteredPokemon} />
      </div>
    </div>
  );
}

export default App;
