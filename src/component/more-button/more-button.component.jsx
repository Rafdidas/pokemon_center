import './more-button.style.css';

const MoreButton = ({ loadMorePokemons }) => {
  return (
    <p className="load-more" onClick={loadMorePokemons}>
        <img src={process.env.PUBLIC_URL + '/img/masterball.png'} alt="masterball" />
        <span >더 보기</span>
    </p>
  );
};

export default MoreButton;