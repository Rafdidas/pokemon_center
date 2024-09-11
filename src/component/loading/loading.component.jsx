import './loading.style.css';

const ball_list = [
    {
        id: 1,
        ball_img: 'pokeball2.png'
    },
    {
        id: 2,
        ball_img: 'masterball.png'
    },
    {
        id: 3,
        ball_img: 'megaball.png'
    },
    {
        id: 4,
        ball_img: 'ultraball.png'
    }
]

const Loading = () => {
    
    return (
        <div id='loading'>
            <div className='load_box'>
                <h3>Loading...</h3>
                <ul className='pokeballs'>
                    {
                        ball_list.map((ball) => {
                            return (
                                <li key={ball.id}><img src={process.env.PUBLIC_URL + `/img/${ball.ball_img}`} alt="ball" /></li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Loading;