import './pagination.style.css';

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate, currentPage }) => {

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <ul className="pagination">
            {
                pageNumber.map((number) => {
                    return (
                        <li 
                            key={number}
                            className={`page_item ${number === currentPage ? 'active' : ''}`}
                        >
                            <a 
                                href="!#"
                                onClick={(e) => {
                                    paginate(number)
                                    e.preventDefault();
                                }}
                                className="page_link"
                            >
                                {number}
                            </a>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default Pagination;