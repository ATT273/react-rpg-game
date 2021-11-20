import React, { useState, useEffect } from 'react'
import FighterStatsBlock from './components/FighterStatsBlock'
import PlayerActionsBlock from './components/PlayerActionsBlock'
import BattleLog from './components/BattleLog'
import ReadyPopUp from './components/ReadyPopUp'
import { motion, AnimatePresence } from 'framer-motion'
import Game from '../../game'
import { useSelector, useDispatch } from 'react-redux';
import { updateStats } from '../../store/player/playerSlice';
import * as _ from 'lodash';

// const intro = {
//     transition: 'all 500ms ease-out'
// }

const BattleScreen = ({ getEvent, comData }) => {

    const playerData = useSelector(Rstate => Rstate.player.player);
    const dispatch = useDispatch();
    const [player, setPlayer] = useState({});
    const [com, setCom] = useState({});
    const [attacker, setAttacker] = useState('');
    const [state, setState] = useState({
        display: 'block',
        intrOpacity: 1,
        mainOpacity: 0,
        comKey: '',
        battleLogs: ['start'],
        displayCombatLog: {
            display: 'none'
        },
        showReadyPopup: true,
        showBattleScreen: false,
        showNextBtn: false,
        initState: {},
        showComTurn: false
    })

    useEffect(() => {
        setCom(comData)
    }, [comData])

    useEffect(() => {
        setPlayer(playerData)
    }, [playerData])

    useEffect(() => {
        const _player = _.cloneDeep(playerData);
        const _com = _.cloneDeep(comData);
        setPlayer(_player);
        setCom(_com);
    }, []);

    useEffect(() => {
        if (com.hasOwnProperty('type') && player.hasOwnProperty('type')) {
            checkWinCondition(player, com, attacker)
        }
    }, [com, player]);

    useEffect(() => {
        if (attacker !== '') {
            checkWinCondition(player, com, attacker)
        }
        if (attacker === 'player') {
            handleAtkButtonClick('com', 'player')
        }
    }, [attacker])
    const handleReady = () => {

        setState(prev => ({
            ...prev,
            intrOpacity: 0,
            mainOpacity: 1,
            display: 'none',
            showReadyPopup: false,
            showBattleScreen: true,
        }))
    }

    const renderFighters = () => {
        return (
            <>
                <FighterStatsBlock player={player} com={com} />
            </>
        )
    }

    const showComTurn = () => {
        const displayCombatLog = {
            display: 'flex',
            opacity: '0.1'
        }
        setState(prev => ({
            ...prev,
            displayCombatLog,
            showComTurn: true
        }))
    }

    const hideComTurn = () => {
        const displayCombatLog = {
            display: 'none'
        }
        setState(prev => ({
            ...prev,
            displayCombatLog,
            showComTurn: false
        }))
    }

    const checkWinCondition = (player, com, attackerName) => {
        let winStatus = Game.winCondition(player, com)

        // if (winStatus.status === 1 && attacker === 'player') {
        //     // showComTurn()
        //     // setTimeout(() => {
        //     //     hideComTurn()
        //     //     handleAtkButtonClick('com', 'player')
        //     // }, 1000)
        // }
        if (winStatus.status === 0) {
            setState(prev => ({
                ...prev,
                battleLogs: [...state.battleLogs, winStatus.message],
                showNextBtn: true,
            }))
        }
    }

    const handleAtkButtonClick = async (attackerName, targetName) => {
        setAttacker(attackerName)
        let attacker = attackerName === 'player' ? player : com
        let target = targetName === 'player' ? player : com
        // let winStatus = {}
        const afterAtk = Game.normalAttack(attacker, target)

        if (attackerName === 'player') {
            setPlayer(afterAtk.attacker);
            setCom(afterAtk.target);
        } else {
            setPlayer(afterAtk.target);
            setCom(afterAtk.attacker);
        }

        setState(prev => ({
            ...prev,
            battleLogs: [...state.battleLogs, afterAtk.combatLog]
        }))
    }

    const handleNextBtnClick = () => {
        dispatch(updateStats(player.stats));
        getEvent();
    }

    return (
        <div className='fight-screen'>


            <AnimatePresence>
                {
                    state.showReadyPopup &&
                    <motion.div
                        className="container"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}>
                        <ReadyPopUp
                            title={'ready for the battle'}
                            content={`${player.name} vs ${com.name}`}
                            display={state.display}
                            size={'big'}
                            renderButtons={true}
                            renderInfo={true}
                            handleReady={handleReady} />
                    </motion.div>
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    state.showBattleScreen &&

                    <motion.div className="main-content"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        {/* {
                                showComTurn &&
                                <div className={'com-turn-popup-bg'} >
                                    <div className={'com-turn-popup'} style={{ ...displayCombatLog }}>Enemy turn ... </div>
                                </div>
                            } */}

                        {/* <div className='test-msg'>absadad</div> */}
                        {
                            player !== null &&
                            renderFighters()
                        }
                        <PlayerActionsBlock handleAtkButtonClick={handleAtkButtonClick} showComTurn={state.showComTurn} />
                        <BattleLog battleLogs={state.battleLogs} />
                        {
                            state.showNextBtn &&
                            <button className="btn bg-green w-200" style={{ margin: 'auto' }} onClick={handleNextBtnClick}>Next</button>
                        }
                    </motion.div>

                }
            </AnimatePresence>

        </div>
    )
}

export default BattleScreen
