import React, { Component } from 'react'
import FighterStatsBlock from './components/FighterStatsBlock'
import PlayerActionsBlock from './components/PlayerActionsBlock'

const intro = {
    transition: 'all 500ms ease-out'
}
export class FightScreen extends Component {
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

    fighter =() => {
        const { player, com } = this.state
        return (
            <>
            <div className="main-content" style={{...intro, opacity: this.state.mainOpacity}} >
                    <FighterStatsBlock player={player} com={com} />
                    <PlayerActionsBlock handleButtonClick={this.handleButtonCLick} />
                    <div className="battle-log"></div>
                </div>
            </>
        )
    }
    handleButtonCLick = () => {
        console.log('button clicked')
    }

    render() {
        const { player, com } = this.state
        console.log('pl', player)
        console.log('coml', com)
        return (
            <div className='fight-screen'>
                <div className="introduction" style={{...intro, display: this.state.display}} >
                    <h3 className='introduction__title'>Prepare for Battle</h3>
                    <div className="introduction__content">
                        <div className="info">
                            INFO
                        </div>
                        <div className="button-group">
                            <button className='btn bg-green' onClick={this.handleReady}>READY!</button>
                        </div>
                    </div>
                </div>
                {
                    player !== null &&
                    this.fighter()
                }
            </div>
        )
    }
}

export default FightScreen
