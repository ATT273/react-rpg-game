import React from 'react'
import openningBackGround from '../../images/background/back_ground.jpg';
const EndGameScreen = () => {
    const toFirstScreen = () => {
        window.location.reload();
    }
    return (
        <div className='endgame-screen'>
            <img className="bg_image" src={openningBackGround} alt="" style={{ filter: 'grayScale(90%)' }} />
            <div className='container'>
                <h2>You are defeated! Your journey ends here.</h2>
                <button onClick={toFirstScreen}>Play again</button>
            </div>
        </div>
    )
}

export default EndGameScreen
