import React, { useEffect, useState } from 'react'
import openningBackGround from '../../images/background/back_ground.jpg';
import { useSelector, useDispatch } from 'react-redux';

const BASE_URL = 'https://node-server-api-1.herokuapp.com';

const tableStyle = {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
    margin: 'auto',

}
const HighScoresScreen = () => {
    const playerData = useSelector(Rstate => Rstate.player.player);
    const [highScores, setHighScores] = useState([]);
    useEffect(() => {
        fetch(`${BASE_URL}/scores`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((res) => {
                res.json()
                    .then((json) => {
                        if (res.ok) {
                            setHighScores(json);
                        }
                    })
                    .catch((err) => {
                        console.log('err', err);
                    })
            })
    }, [])
    const toFirstScreen = () => {
        window.location.reload();
    }
    return (
        <div className='highscores-screen'>
            <img className="bg_image" src={openningBackGround} alt="" style={{ filter: 'grayScale(90%)' }} />
            <div className='container'>
                <h2 style={{ marginBottom: '25px' }}>High Scores</h2>
                <div>
                    <table style={tableStyle} cellPadding={5} >
                        <thead></thead>
                        <tbody>
                            {
                                highScores.map((item, index) =>
                                (<tr key={index}>
                                    <td className='name'>{item.name}</td>
                                    <td className="score">{item.scores}</td>
                                </tr>)
                                )
                            }

                        </tbody>
                    </table>
                </div>
                <button onClick={toFirstScreen}>To main menu</button>
            </div>
        </div>
    )
}

export default HighScoresScreen
