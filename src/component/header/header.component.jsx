import './header.style.css';

const Header = () => {
    return (
        <header id='header'>
            <div className="inner">
                <h1 className='logo'><a href="/"><img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="Pokedex" /></a></h1>
            </div>
        </header>
    );
}

export default Header;