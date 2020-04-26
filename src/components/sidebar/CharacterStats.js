import React, { Component } from 'react'
import player_img from '../../images/player/player.png'
import StatsBar from '../UIComponents/StatsBar'

export class CharacterStats extends Component {
    constructor(props) {
        super()
        
    }
    
    render() {
        const { player } = this.props
        return (
            <div className="stats">
                <div className="player-avatar">
                    <img src={player_img} alt="player_avatar"/>
                </div>
                <div className="player-stats">
                    <div className="item">
                        <p><b>{player.name}</b></p>
                    </div>
                    <div className="item">
                        <p><b>HP: </b> {player.stats.hp}/100</p>
                        <StatsBar stats={player.stats.hp} name={'hp'} />
                    </div>
                    <div className="item">
                        <p><b>MP: </b> {player.stats.mp}/100</p>
                        <StatsBar stats={player.stats.mp} name={'mp'} />
                    </div>
                    <div className="item">
                        <p><b>ATK: </b> {player.stats.atk}</p>
                    </div>
                    <div className="item">
                        <p><b>DEF: </b> {player.stats.def}</p>
                    </div>
                    <div className="item">
                        <p><b>SPD: </b> {player.stats.spd}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CharacterStats
