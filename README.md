# POKEDEX
https://rafdidas.github.io/poke_dex/

## 1. 소개 및 참여 인원
- pokeApi 를 활용한 1번 부터 151번 까지의 포켓몬 도감
- 개인 프로젝트

## 2. 사용 기술
#### `API`
  - PokeApi
  - https://pokeapi.co/docs/v2#pokemon-species
#### `Front-end`
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## 3. 핵심 기능
- PokeAPi로 1번 부터 151번 까지의 포켓몬 정보를 불러와 타입에 따른 분류와 상세설명 및 검색 기능
- 반응형 페이지 작업

## 4. 사이트 구성
   ### 로딩 페이지
   - api를 불러오는 과정의 로딩으로 인해 추가 된 화면
   ### 메인 페이지 
   - 1번 부터 151번 까지의 포켓몬의 정보를 가져오고 첫 화면에는 16개의 포켓몬만 노출 하단의 페이지네이션으로 이동 가능.
   - 151번까지 정보를 가져왔으므로 속성값은 전부 표시
   ### 검색 인풋
   - 검색 인풋을 이용하여 인풋에 입력하는 입력값이 포함 된 항목들을 노출시킴
   ### 속성 카테고리
   - 노출 되어있는 속성값을 클릭 시 해당하는 클릭 값을 가지고 있는 항목들만 노출
   ### 상세 페이지
   - 해당 포켓몬의 정보를 노출

## 5. 핵심 트러블 슈팅 (진행중)
### 5.1. 페이지 로딩 문제와 페이징 변경 예정
- 현재 메인페이지에서 속성 카테고리에 미리 151번까지의 포켓몬이 가지고 있는 속성을 표현하기 위해, 151번까지 한번에 정보를 받아오고 있다. 
이로인해 처음 페이지 진입 시 발생하는 로딩시간을 줄이기 위한 방법을 물색 중.

### 생각한 해결법
- 타입을 위한 151가지의 타입만 전부 가져오고, 페이징을 더보기 혹은 무한스크롤로 변경 해 볼 예정
- 타입 클릭시 문제는 미정

### 현재 포켓몬 정보를 가져오는 코드
```
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
```
## 6. 회고 / 느낀점
- Poke APi는 가져오는 방식이 너무 복잡했던터라 api 활용에 대한 실습을 해보기 좋았다.
- 로딩에 대한 문제를 생각해 볼 수 있었고, 생각 중 이다.
- 가져오고 싶은 정보가 많아서, 로딩 문제 해결 시 점점 업데이트 해나갈 예정
