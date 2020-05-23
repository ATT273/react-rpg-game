import React, { Component } from 'react'
import FighterStatsBlock from './components/FighterStatsBlock'
import PlayerActionsBlock from './components/PlayerActionsBlock'
import BattleLog from './components/BattleLog'
import ReadyPopUp from './components/ReadyPopUp'

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
            battleLogs: ['fafafa'],
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
            
                    <FighterStatsBlock player={player} com={com} />
                    
               
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
    checkWinCondition = (winStatus, attacker, target, afterAtk) => {
        winStatus = Game.winCondition(attacker, target)

        if(winStatus.status === 1 && afterAtk.type === 'player') {
            this.showComTurn()
            setTimeout(() => {
                this.hideComTurn()
                this.handleAtkButtonClick('com', 'player')
            }, 1000)
        }

        if(winStatus.status === 0) {
            this.setState({
                battleLogs: [...this.state.battleLogs, winStatus.message]
            })

            this.savePlayerStats()
        }
    }

    savePlayerStats = () => {
        this.props.savePlayerStats(this.state.player)
    }

    handleAtkButtonClick = async (attackerName, targetName) => {
        
        let attacker = this.state[attackerName]
        let target = this.state[targetName]
        let winStatus = {}
        const afterAtk = Game.normalAttack(attacker, target)

        await this.setState({
            [attackerName]: afterAtk.attacker,
            [targetName]: afterAtk.target,
            battleLogs: [...this.state.battleLogs, afterAtk.combatLog]
        })
        
        await this.checkWinCondition(winStatus, this.state[attackerName], this.state[targetName], afterAtk)

    }

    render() {
        const { player, displayCombatLog, battleLogs } = this.state

        return (
            <div className='fight-screen'>
                <div className={'com-turn'}  style={{ ...displayCombatLog }}>Enemy turn ... </div>
                <ReadyPopUp 
                    title={'ready title'} 
                    display={this.state.display} 
                    size={'big'}
                    renderButtons={true}
                    renderInfo={true}
                    handleReady={this.handleReady} />                
                
                <div className="main-content" style={{...intro, opacity: this.state.mainOpacity}} >
                {
                    player !== null &&
                    this.renderFighters()
                }
                <PlayerActionsBlock handleAtkButtonClick={this.handleAtkButtonClick} />
                <BattleLog battleLogs={battleLogs} />
                </div>
                
            </div>
        )
    }
}

export default BattleScreen
