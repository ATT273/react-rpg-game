import React from 'react'
import StatsBar from '../../UIComponents/StatsBar'

function FighterStatsBlock(props) {
    const { player, com } = props
    return (
        <>
            {
                player.stats !== undefined &&

                <div className="fighters-stats">
                    <div className="player">
                        <img src={player.image} alt="player_avatar" />
                        <div className="hp-mp">
                            <p><b>HP: </b> {player.stats.hp}/{player.stats.maxHP}</p>
                            <StatsBar stats={{ hp: player.stats.hp, maxHP: player.stats.maxHP }} name={'hp'} />
                            <p><b>MP: </b> {player.stats.mp}/{player.stats.maxMP}</p>
                            <StatsBar stats={{ mp: player.stats.mp, maxMP: player.stats.maxMP }} name={'mp'} />
                        </div>
                        <div className="stats">
                            <p><b>ATK: </b> {player.stats.atk}</p>
                            <p><b>DEF: </b> {player.stats.def}</p>
                            <p><b>SPD: </b> {player.stats.spd}</p>
                        </div>
                    </div>
                    <div className="com">
                        <img src={com.image} alt="com_avatar" />
                        <div className="hp-mp">
                            <p><b>HP: </b> {com.stats.hp}/{com.stats.maxHP}</p>
                            <StatsBar stats={{ hp: com.stats.hp, maxHP: com.stats.maxHP }} name={'hp'} />
                            <p><b>MP: </b> {com.stats.mp}/{com.stats.maxMP}</p>
                            <StatsBar stats={{ mp: com.stats.mp, maxMP: com.stats.maxMP }} name={'mp'} />
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
