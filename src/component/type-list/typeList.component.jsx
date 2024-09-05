import './typeList.style.css';

const TypeList = ({ pokemons, onTypeChange }) => {
    
    // 1. 모든 타입 수집
    const allTypes = pokemons.flatMap((pokemon) => {
        return pokemon.types.map((type) => {
          return {
                koreanType: type.koreanType,
                engType: type.engType
            };
        });
    })
    // 2. 중복 제거
    const uniqueTypes = [...new Map(allTypes.map(type => [type.koreanType, type])).values()];
    
    return (
        <ul className='type_list'>
          <li key="reset" className='all_type' onClick={() => onTypeChange('')}>
            <span>전체 보기</span>
          </li>
          {
            // 3. 출력
            uniqueTypes.map((type, index) => {
              return (
                <li 
                  key={index} 
                  className={`bg_${type.engType}`} 
                  onClick={() => onTypeChange(type.koreanType)}
                >
                  <img src={process.env.PUBLIC_URL + `/img/type_${type.engType}.svg`} alt={type.engType} />
                  <span>{type.koreanType}</span>
                </li>
              );
            })
          }
          <li></li>
        </ul>
    );
}

export default TypeList;