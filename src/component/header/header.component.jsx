import { Link, Outlet } from 'react-router-dom';
import './header.style.css';
import Footer from '../footer/footer.component';


const Header = () => {
    return (
        <div className="App">
            <header id='header'>
                <div className="inner">
                    <h1 className='logo'><Link to='/poke_dex/'><img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="Pokedex" /></Link></h1>
                </div>
            </header>
            <div className='cnt'>
                <Outlet/>
                <Footer/>
            </div>
        </div>
    );
}

export default Header;