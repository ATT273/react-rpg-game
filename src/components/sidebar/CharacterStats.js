import React, { Component } from 'react'
import player_img from '../../images/player/player.png'
import StatsBar from '../UIComponents/StatsBar'
import { useSelector, useDispatch } from 'react-redux';
import InventoryBlock from './components/InventoryBlock';

const CharacterStats = () => {
    const player = useSelector(state => state.player.player);

    const renderInventory = () => {
        [0, 1, 2, 3, 4, 5].map(x => {
            return <InventoryBlock item={player.items[x]} />
        })
    }
    return (
        <React.Fragment>
            <div className="stats">
                <div className="player-avatar">
                    <img src={player_img} alt="player_avatar" />
                </div>
                <div className="player-stats">
                    <div className="item">
                        <p><b>{player.name}</b></p>
                    </div>
                    <div className="item">
                        <p><b>HP: </b> {player.stats.hp}/{player.stats.maxHP}<i className='txt-green'>{player.bonusStats.hp > 0 ? `(+ ${player.bonusStats.hp})` : ''}</i></p>
                        <StatsBar stats={{ hp: player.stats.hp, maxHP: player.stats.maxHP }} name={'hp'} />
                    </div>
                    <div className="item">
                        <p><b>MP: </b> {player.stats.mp}/{player.stats.maxMP} <i className='txt-green'>{player.bonusStats.mp > 0 ? `(+ ${player.bonusStats.mp})` : ''}</i></p>
                        <StatsBar stats={{ mp: player.stats.mp, maxMP: player.stats.maxMP }} name={'mp'} />
                    </div>
                    <div className="item">
                        <p><b>Lvl {player.level}: </b> {player.exp}/{player.levelExp}</p>
                    </div>
                    <div className="item">
                        <p><b>ATK: </b> {player.stats.atk} <i className='txt-green'>{player.bonusStats.atk > 0 ? `(+ ${player.bonusStats.atk})` : ''}</i></p>
                    </div>
                    <div className="item">
                        <p><b>DEF: </b> {player.stats.def} <i className='txt-green'>{player.bonusStats.def > 0 ? `(+ ${player.bonusStats.def})` : ''}</i></p>
                    </div>
                    <div className="item">
                        <p><b>SPD: </b> {player.stats.spd} <i className='txt-green'>{player.bonusStats.spd > 0 ? `(+ ${player.bonusStats.spd})` : ''}</i></p>
                    </div>
                </div>
            </div>
            <div className='player-inventory'>
                {[0, 1, 2, 3, 4, 5].map(x => {
                    return <InventoryBlock key={x} item={player.items[x]} />
                })}
            </div>
        </React.Fragment>
    )
}
export default CharacterStats
