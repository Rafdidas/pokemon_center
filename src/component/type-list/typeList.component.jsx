import './typeList.style.css';

const TypeList = ({ pokemons }) => {
    
    // 1. 모든 타입 수집
    const allTypes = pokemons.flatMap((pokemon) => {
        return pokemon.types.map((type) => {
        return type.koreanType;
        });
    })
    // 2. 중복 제거
    const uniqueTypes = [...new Set(allTypes)];
    
    return (
        <ul className='type_list'>
          {
            // 3. 출력
            uniqueTypes.map((type, index) => {
              return (
                <li key={index} value={type}><span>{type}</span></li>
              );
            })
          }
        </ul>
    );
}

export default TypeList;