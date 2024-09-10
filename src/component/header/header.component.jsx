import { Link } from 'react-router-dom';
import './header.style.css';


const Header = () => {
    return (
        <header id='header'>
            <div className="inner">
                <h1 className='logo'><Link to='/poke_dex/'><img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="Pokedex" /></Link></h1>
            </div>
        </header>
    );
}

export default Header;