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
                        <div className='image-container'>
                            <img src={player.image} alt="player_avatar" />
                        </div>
                        <div className="hp-mp">
                            <p><b>HP: </b> {player.stats.hp}/{player.stats.maxHP}</p>
                            <StatsBar stats={{ hp: player.stats.hp, maxHP: player.stats.maxHP }} name={'hp'} />
                            <p><b>MP: </b> {player.stats.mp}/{player.stats.maxMP}</p>
                            <StatsBar stats={{ mp: player.stats.mp, maxMP: player.stats.maxMP }} name={'mp'} />
                        </div>
                        <div className="stats">
                            <p><b>ATK: </b> {player.stats.atk}
                                <i className='txt-green'>{player.bonusStats.atk > 0 ? `(+ ${player.bonusStats.atk})` : ''}</i>
                                <i className='txt-purple'>{player.buffs.atk > 0 ? `(+ ${player.buffs.atk})` : ''}</i>
                            </p>
                            <p><b>DEF: </b> {player.stats.def}
                                <i className='txt-green'>{player.bonusStats.def > 0 ? `(+ ${player.bonusStats.def})` : ''}</i>
                                <i className='txt-purple'>{player.buffs.def > 0 ? `(+ ${player.buffs.def})` : ''}</i>
                            </p>
                            <p><b>SPD: </b> {player.stats.spd}
                                <i className='txt-green'>{player.bonusStats.spd > 0 ? `(+ ${player.bonusStats.spd})` : ''}</i>
                                <i className='txt-purple'>{player.buffs.spd > 0 ? `(+ ${player.buffs.spd})` : ''}</i>
                            </p>
                        </div>
                    </div>
                    <div className="com">
                        <div className='image-container'>
                            <img src={com.image} alt="com_avatar" />
                        </div>
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
