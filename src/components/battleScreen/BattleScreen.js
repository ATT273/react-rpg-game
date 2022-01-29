import React, { useState, useEffect } from 'react'
import FighterStatsBlock from './components/FighterStatsBlock'
import PlayerActionsBlock from './components/PlayerActionsBlock'
import BattleLog from './components/BattleLog'
import ReadyPopUp from './components/ReadyPopUp'
import { motion, AnimatePresence } from 'framer-motion'
import Game from '../../game'
import { useSelector, useDispatch } from 'react-redux';
import { updateStats, updatePlayer } from '../../store/player/playerSlice';
import * as _ from 'lodash';
import { ReactComponent as Loading } from '../../images/svgs/loading.svg';


const BattleScreen = ({ getEvent, comData, updateScore }) => {

    const playerData = useSelector(Rstate => Rstate.player.player);
    const dispatch = useDispatch();
    const [player, setPlayer] = useState({});
    const [com, setCom] = useState({});
    const [isPlayerTurn, setisPlayerTurn] = useState();
    const [showPlayerActionBlock, setShowPlayerActionBlock] = useState(false);
    const [state, setState] = useState({
        display: 'block',
        intrOpacity: 1,
        mainOpacity: 0,
        comKey: '',
        battleLogs: ['Start!!!'],
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
        const _player = _.cloneDeep(playerData);
        setPlayer(_player)
    }, [playerData])

    useEffect(() => {
        const _player = _.cloneDeep(playerData);
        const _com = _.cloneDeep(comData);
        if (isPlayerTurn === undefined) {
            const _isPlayerTurn = _player.stats.spd > _com.stats.spd ? true : false;
            setisPlayerTurn(_isPlayerTurn);
        }
        setPlayer(_player);
        setCom(_com);
    }, []);

    useEffect(() => {
        if (com.hasOwnProperty('type') && player.hasOwnProperty('type')) {

            checkWinCondition(player, com, isPlayerTurn)
        }
    }, [com, player]);

    useEffect(() => {
        if (isPlayerTurn !== undefined) {
            checkWinCondition(player, com)
        }
        if (isPlayerTurn !== undefined && !isPlayerTurn && com.stats.hp > 0) {
            handleAtkButtonClick('com', 'player')
        }
    }, [isPlayerTurn])

    useEffect(() => {
        if (isPlayerTurn && player.name && player.stats.hp > 0) {
            setShowPlayerActionBlock(true);
        } else {
            setShowPlayerActionBlock(false)
        }
    }, [isPlayerTurn, player]);

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

    const handleEndturn = () => { setisPlayerTurn(!isPlayerTurn); }

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

    const checkWinCondition = (player, com) => {
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

        if (!isPlayerTurn) {
            setTimeout(() => {
                handleEndturn();
            }, 500)
        } else {
            handleEndturn();
        }
    }

    const handleNextBtnClick = () => {
        const _player = { ...player };
        const playerExp = player.exp + com.xp;
        _player.exp = playerExp;
        if (playerExp >= player.levelExp) {
            const nextLvl = Game.calculateLvlFromExp(playerExp);
            const newLevelExp = Game.calculateCurrentLvlExp(Math.floor(nextLvl) + 1);
            _player.level = Math.floor(nextLvl) + 1;
            _player.exp = playerExp - player.levelExp;
            _player.levelExp = newLevelExp;
        }
        if (_player.stats.hp > 0) {
            updateScore(com.score);
        }
        dispatch(updatePlayer(_player));
        getEvent();
    }

    return (
        <div className='fight-screen'>
            <AnimatePresence>
                {
                    state.showReadyPopup &&
                    <motion.div
                        className="container"
                        key={'container'}
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
                        key={'main-content'}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        {player !== null && renderFighters()}
                        {showPlayerActionBlock
                            ? <PlayerActionsBlock handleAtkButtonClick={handleAtkButtonClick} showComTurn={state.showComTurn} />
                            : <Loading />}
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
