import React, { Component } from 'react'
import FighterStatsBlock from './components/FighterStatsBlock'
import PlayerActionsBlock from './components/PlayerActionsBlock'
import BattleLog from './components/BattleLog'
import ReadyPopUp from './components/ReadyPopUp'
import { motion, AnimatePresence } from 'framer-motion'
import Game from '../../game'


// const intro = {
//     transition: 'all 500ms ease-out'
// }

class BattleScreen extends Component {
    constructor() {
        super()

        this.state = {
            display: 'block',
            intrOpacity: 1,
            mainOpacity: 0,
            player: {},
            com: {},
            comKey: '',
            battleLogs: ['start'],
            displayCombatLog: {
                display: 'none'
            },
            showReadyPopup: true,
            showBattleScreen: false,
            showNextBtn: false,
            initState: {}
        }
    }

    componentDidMount() {
        const { player, com } = this.props
        const initState = { ...this.state }

        this.setState({
            player,
            com,
            initState
        })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.comKey !== state.comKey) {
            return {
                ...state.initState,
                com: props.com,
                player: props.player,
                comKey: props.comKey
            }
        } else return null
    }
    handleReady = () => {
        this.setState({
            intrOpacity: 0,
            mainOpacity: 1,
            display: 'none',
            showReadyPopup: false,
            showBattleScreen: true,
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
        const displayCombatLog = {
            display: 'flex',
            opacity: '0.1'
        }
        this.setState({
            displayCombatLog
        })
    }

    hideComTurn = () => {
        const displayCombatLog = {
            display: 'none'
        }
        this.setState({
            displayCombatLog
        })
    }

    checkWinCondition = (attacker, target, afterAtk) => {
        let winStatus = Game.winCondition(attacker, target)

        if (winStatus.status === 1 && afterAtk.type === 'player') {
            this.showComTurn()
            setTimeout(() => {
                this.hideComTurn()
                this.handleAtkButtonClick('com', 'player')
            }, 1000)
        }

        if (winStatus.status === 0) {
            this.setState({
                battleLogs: [...this.state.battleLogs, winStatus.message],
                showNextBtn: true,
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
        // let winStatus = {}
        const afterAtk = Game.normalAttack(attacker, target)

        await this.setState({
            [attackerName]: afterAtk.attacker,
            [targetName]: afterAtk.target,
            battleLogs: [...this.state.battleLogs, afterAtk.combatLog]
        })

        await this.checkWinCondition(this.state[attackerName], this.state[targetName], afterAtk)

    }

    render() {
        const { player, displayCombatLog, battleLogs, com, showReadyPopup, showBattleScreen, showNextBtn } = this.state
        // style={{ ...displayCombatLog }}
        return (
            <div className='fight-screen'>
                {/* <div className={'com-turn-popup-bg'} >
                    <div className={'com-turn-popup'} style={{ ...displayCombatLog }}>Enemy turn ... </div>
                </div> */}

                <AnimatePresence>
                    {
                        showReadyPopup &&
                        <motion.div
                            className="container"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}>
                            <ReadyPopUp
                                title={'ready for the battle'}
                                content={`${player.name} vs ${com.name}`}
                                display={this.state.display}
                                size={'big'}
                                renderButtons={true}
                                renderInfo={true}
                                handleReady={this.handleReady} />
                        </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        showBattleScreen &&

                        <motion.div className="main-content"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}>
                            {
                                player !== null &&
                                this.renderFighters()
                            }
                            <PlayerActionsBlock handleAtkButtonClick={this.handleAtkButtonClick} />
                            <BattleLog battleLogs={battleLogs} />
                            {
                                showNextBtn &&
                                <button className="btn bg-green w-200" style={{ margin: 'auto' }} onClick={this.props.getEvent}>Next</button>
                            }
                        </motion.div>

                    }
                </AnimatePresence>

            </div>
        )
    }
}

export default BattleScreen
