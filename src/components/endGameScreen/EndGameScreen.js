import React, { useEffect, useState } from 'react'
import openningBackGround from '../../images/background/back_ground.jpg';
import { useSelector, useDispatch } from 'react-redux';

const BASE_URL = 'https://node-server-api-1.herokuapp.com';

const EndGameScreen = ({ scores, playerName }) => {
    const [highscoreResult, setHighscoreResult] = useState(false);
    useEffect(() => {
        if (playerName) {
            fetch(`${BASE_URL}/scores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ name: playerName, scores })
            })
                .then((res) => {
                    res.json()
                        .then((json) => {
                            if (res.ok) {
                                setHighscoreResult(true);
                                alert(json.message)
                            }
                        })
                        .catch((err) => {
                            console.log('err', err);
                        })
                })
        }
    }, [playerName]);

    const toFirstScreen = () => {
        window.location.reload();
    }

    return (
        <div className='endgame-screen'>
            <img className="bg_image" src={openningBackGround} alt="" style={{ filter: 'grayScale(90%)' }} />
            <div className='container'>
                <h2>You are defeated! Your journey ends here.</h2>
                <h3>Scores: {scores}</h3>
                <button onClick={toFirstScreen} disabled={!highscoreResult}>Play again</button>
            </div>
        </div>
    )
}

export default EndGameScreen
