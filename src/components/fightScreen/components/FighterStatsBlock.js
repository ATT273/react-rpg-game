import React from 'react'
import StatsBar from  '../../UIComponents/StatsBar'

function FighterStatsBlock(props) {
    const {player, com } = props
    return (
        <>
        {
            player.stats !== undefined &&
            
            <div className="fighters-stats">
                <div className="player">
                        <img src={player.image} alt="player_avatar"/>
                        <div className="hp-mp">
                        <p><b>HP: </b> {player.stats.hp}/100</p>
                        <StatsBar stats={player.stats.hp} name={'hp'} />
                        <p><b>MP: </b> {player.stats.mp}/100</p>
                        <StatsBar stats={player.stats.hp} name={'mp'} />
                        </div>
                        <div className="stats">
                            <p><b>ATK: </b> {player.stats.atk}</p>
                            <p><b>DEF: </b> {player.stats.def}</p>
                            <p><b>SPD: </b> {player.stats.spd}</p>
                        </div>
                </div>
                <div className="com">
                <img src={com.image} alt="com_avatar"/>
                        <div className="hp-mp">
                        <p><b>HP: </b> {com.stats.hp}/100</p>
                        <StatsBar stats={com.stats.hp} name={'hp'} />
                        <p><b>MP: </b> {com.stats.mp}/100</p>
                        <StatsBar stats={com.stats.mp} name={'mp'} />
                        </div>
                        <div className="stats">
                            <p><b>ATK: </b> {com.stats.atk}</p>
                            <p><b>DEF: </b> {com.stats.def}</p>
                            <p><b>SPD: </b> {com.stats.spd}</p>
                        </div>
                </div>
            </div>
        }
        </>
    )
}

export default FighterStatsBlock
