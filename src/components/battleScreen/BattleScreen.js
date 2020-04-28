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
            com: {}
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

    handleAtkButtonClick = (attackerName, targetName) => {
        
        let attacker = this.state[attackerName]
        let target = this.state[targetName]

        const afterAtk = Game.normalAttack(attacker, target)

        this.setState({
            attacker: afterAtk.attacker,
            com: afterAtk.target
        })

        const winStatus = Game.winCondition(attacker, target)

        // console.log('after', afterAtk)
        // if(afterAtk.type === 'player') {
        //     this.handleAtkButtonClick(afterAtk.target, afterAtk.attacker)
        // }
        

        console.log('check', winStatus)
    }

    render() {
        const { player, com } = this.state

        return (
            <div className='fight-screen'>
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
