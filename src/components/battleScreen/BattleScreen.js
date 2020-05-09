import React, { Component } from 'react'
import FighterStatsBlock from './components/FighterStatsBlock'
import PlayerActionsBlock from './components/PlayerActionsBlock'
import PopUp from '../UIComponents/PopUp'

import Game from '../../game'

const intro = {
    transition: 'all 500ms ease-out'
}

class BattleScreen extends Component {
    constructor() {
        super()

        this.state = {
            display: 'block',
            intrOpacity: 1,
            mainOpacity: 0,
            player: {},
            com: {},
            displayCombatLog: {
                display: 'none'
            }
        }
    }

    componentDidMount() {
        const { player, com } = this.props

        this.setState({
            player,
            com
        })
    }
    
    handleReady = () => {
        this.setState({
            intrOpacity: 0,
            mainOpacity: 1,
            display: 'none'
        })
    }

    renderFighters = () => {
        const { player, com } = this.state
        return (
            <>
            <div className="main-content" style={{...intro, opacity: this.state.mainOpacity}} >
                    <FighterStatsBlock player={player} com={com} />
                    <PlayerActionsBlock handleAtkButtonClick={this.handleAtkButtonClick} />
                    <div className="battle-log"></div>
                </div>
            </>
        )
    }

    showComTurn = () => {
        const displayCombatLog= {
            display: 'block'
        }
        this.setState({
            displayCombatLog
        })
    }

    hideComTurn = () => {
        const displayCombatLog= {
            display: 'none'
        }
        this.setState({
            displayCombatLog
        })
    }
    handleAtkButtonClick = (attackerName, targetName) => {
        
        let attacker = this.state[attackerName]
        let target = this.state[targetName]

        const afterAtk = Game.normalAttack(attacker, target)

        this.setState({
            [attackerName]: afterAtk.attacker,
            [targetName]: afterAtk.target
        })
        console.log('cbLog', afterAtk.combatLog)
        const winStatus = Game.winCondition(attacker, target)

        if(winStatus.status === 1 && afterAtk.type === 'player') {
            this.showComTurn()
            setTimeout(() => {
                this.hideComTurn()
                this.handleAtkButtonClick('com', 'player')
            }, 2000)
        }
    }

    render() {
        const { player, com, displayCombatLog } = this.state

        return (
            <div className='fight-screen'>
                <div className={'com-turn'}  style={{ ...displayCombatLog }}>Enemy turn</div>
                <PopUp title={'popup title'} display={this.state.display} handleReady={this.handleReady} />                
                {
                    player !== null &&
                    this.renderFighters()
                }
                
            </div>
        )
    }
}

export default BattleScreen
