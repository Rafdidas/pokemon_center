
import { useEffect, useState } from 'react';
import './App.css';

import Header from './component/header/header.component';
import SearchBox from './component/search-box/searchBox.component';
import PokeList from './component/pokemon-list/pokeList.component';
import TypeList from './component/type-list/typeList.component';
import Pagination from './component/pagination/pagination.component';
import { Route, Routes } from 'react-router-dom';
import Detail from './component/detail/detail.component';
import Footer from './component/footer/footer.component';

// 포켓몬 데이터를 가져오는 함수
async function fetchPokemonData(limit = 151, offset = 0) {
  // 1. 기본 data 불러오기
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  // 2. species 및 이미지, 타입 정보 가져오기
  const speciesPromises = data.results.map(async (pokemon) => {
    const pokemonDetailsResponse = await fetch(pokemon.url);
    const pokemonDetails = await pokemonDetailsResponse.json();

    const speciesDetailsResponse = await fetch(pokemonDetails.species.url);
    const speciesDetails = await speciesDetailsResponse.json();

    //const typeSpeciesResponse = await fetch(typeListDetails.species.url);
    //const typeSpecies = await typeSpeciesResponse.json();
    
    // 3. 각 타입의 추가 정보 가져오기
    const typesPromises = pokemonDetails.types.map(async (typeInfo) => {
      const typeResponse = await fetch(typeInfo.type.url);
      const typeDetails = await typeResponse.json();
      const koreanType = typeDetails.names.find(
        (type) => type.language.name === 'ko',
      );
      const engType = typeDetails.names.find(
        (type) => type.language.name === 'en',
      );
      
      return {
        name: typeInfo.type.name,
        koreanType: koreanType ? koreanType.name : typeInfo.type.name,
        engType: engType ? engType.name.toLocaleLowerCase() : typeInfo.type.name,
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
    
    
    const flavorTexts = speciesDetails.flavor_text_entries.find(
      (entry) => entry.language.name === 'ko' && entry.version.name === 'x'
    )?.flavor_text;
    // const flavorTexts = speciesDetails.flavor_text_entries
    //   .filter((entry) => entry.language.name === 'ko' && entry.version.name === 'omega-ruby')
    //   .map((entry) => entry.flavor_text);

    const poke_img = pokemonDetails.sprites.versions['generation-v']['black-white'].animated.front_default;

    return {
      name: koreanName ? koreanName.name : pokemon.name,
      species: pokemon.url, 
      flavorTexts, 
      generas, 
      pokeId, 
      poke_img, 
      types, 
    };
    
  });
  return Promise.all(speciesPromises);
}

function App() {
  
  const [pokemonData, setPokemonData] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 현재페이지
  const pokemonsPerPage = 16; // 페이지 당 포켓몬

  useEffect(() => {
    fetchPokemonData().then((finalData) => {
      setPokemonData(finalData);
      setFilteredPokemon(finalData);
    });
  }, []);

  // 이름 검색 필터링
  useEffect(() => {
    const newFilteredPokemon = pokemonData.filter((poke) => {
      return poke.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredPokemon(newFilteredPokemon);
    setCurrentPage(1); // 필터 적용 시 페이지를 첫 페이지로 초기화
  }, [pokemonData, searchField]);

  // 타입 필터링 
  useEffect(() => {
    if (typeFilter === '') {
      setFilteredPokemon(pokemonData); // 타입 필터가 없으면 모든 포켓몬 보여줌
    } else {
      const fiteredByType = pokemonData.filter((pokemon) => {
        return (
          pokemon.types.some((type) => type.koreanType === typeFilter)
        );
      });
      setFilteredPokemon(fiteredByType);
    }
    setCurrentPage(1); // 필터 적용 시 페이지를 첫 페이지로 초기화
  }, [typeFilter, pokemonData]);

  // 페이지네이션 관련 계산
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const onSearchChange = (envent) => {
    const searchFieldSrting = envent.target.value.toLocaleLowerCase();
    setSearchField(searchFieldSrting);
  }

  const onTypeChange = (koreanType) => {
    setTypeFilter(koreanType);
    setSearchField('');
  }

  // 페이지 변경 함수
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  
  return (
    <div className="App">
      <Header />
      <div className='cntbody'>
        <Routes>
          <Route path='/*' element={
            <>
              <SearchBox onSearchChange={onSearchChange} />
              <TypeList pokemons={filteredPokemon} onTypeChange={onTypeChange} />
              <PokeList pokemons={currentPokemons} />
              <Pagination
                pokemonsPerPage={pokemonsPerPage}
                totalPokemons={filteredPokemon.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          } />
          <Route path='/detail/:id' element={<Detail  />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
