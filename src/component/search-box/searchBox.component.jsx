import './searchBox.style.css'

const SearchBox = ({ onSearchChange }) => {
    return (
        <input 
            type="search" 
            name="poke_search" 
            id="poke_search" 
            className='poke_search_main'
            placeholder='포켓몬 이름을 입력해주세요.'
            onChange = {onSearchChange}
        />
    )
}

export default SearchBox;