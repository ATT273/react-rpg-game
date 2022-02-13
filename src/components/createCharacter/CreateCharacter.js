import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ClassesSelection from './ClassesSelection';
import BounusStatsPointScreen from './BounusStatsPointScreen';
import { classes } from '../../data';
// import { useSelector, useDispatch } from 'react-redux';
// import { createCharacter } from '../../store/player/playerSlice';
import Game from '../../game';
import SkillSelection from './SkillSelection';
import { useRecoilState } from 'recoil';
import { playerState, updateStats, updatePlayer, createCharacter } from '../../state/player/playerState';

const inputData = ['name', 'stats', 'class', 'skill'];
const CreateCharacter = ({ startGame, savePlayerData }) => {
    // const dispatch = useDispatch();
    const [playerData, setPlayerState] = useRecoilState(playerState);
    // const player = useSelector(state => state.player.player);
    const [step, setStep] = useState(1);
    const [createPlayer, setCreatePlayer] = useState({});
    const [selectedClass, setSelectedClass] = useState({});
    const [selectedSkill, setSelectedSkill] = useState({});
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const initPlayer = Object.assign({}, playerData);
        const levelExp = Game.calculateCurrentLvlExp(1);
        setCreatePlayer(prevState => ({ ...prevState, ...initPlayer, levelExp }));

    }, [playerData])

    const renderClassesSelection = () => {
        let classSelection = []
        for (let item in classes) {
            classSelection.push(
                <ClassesSelection
                    selectedClass={selectedClass.value}
                    key={classes[item].key}
                    classInfo={classes[item]}
                    image={classes[item].image}
                    handleChange={handleSelectClass} />
            )
        }
        return classSelection
    }

    const handleCreateCharacter = (e) => {
        let err = false;
        if (createPlayer.name === '') {
            setErrors(prevState => ({ ...prevState, nameError: 'Please enter your character`s name' }));
            err = true
        } else if (createPlayer.atk === 0 || createPlayer.def === 0 || createPlayer.spd === 0) {
            setErrors(prevState => ({ ...prevState, statsError: 'Please enter your stats' }));
            err = true
        } else if (Number(createPlayer.stats.atk) + Number(createPlayer.stats.def) + Number(createPlayer.stats.spd) > 12) {
            setErrors(prevState => ({ ...prevState, statsError: 'Can not assign more than 12 point to stats' }));
            err = true
        } else if (createPlayer.plClass === '') {
            setErrors(prevState => ({ ...prevState, classError: 'Please choose your class' }));
            err = true
        } else if (createPlayer.skills.length === 0) {
            setErrors(prevState => ({ ...prevState, classError: 'Please choose your skill' }));
            err = true
        }
        if (!err) {
            Object.keys(selectedClass.bonuses).map(key => {
                createPlayer.stats[key] += selectedClass.bonuses[key]
            })

            const newPlayer = createCharacter({ ...createPlayer, plClass: selectedClass.plClass });
            setPlayerState(newPlayer)
            startGame();
        } else {
            console.log('errrr')
        }
    }

    const handleSelectClass = (data) => {
        setSelectedClass(data);
        setSelectedSkill({});
        setCreatePlayer(prevState => ({ ...prevState, plClass: data.value, skills: [] }))
        // setCreatePlayer(prevState => ({ ...prevState, plClass: data.value, bonusStats }));
    }
    // console.log('createPlayer', createPlayer)
    const handleUserInput = (e) => {
        let statsError;
        const name = e.target.name;
        const value = e.target.value;
        if (['atk', 'def', 'spd'].includes(name)) {
            if (Number(e.target.value) < 0) {
                statsError = 'can not assign negative number to stats';
                setErrors(prevState => ({ ...prevState, statsError }));
            } else {
                if (e.target !== null) setCreatePlayer(prevState => ({ ...prevState, stats: { ...prevState.stats, [name]: Number(value) } }));
            }
        } else {
            if (e.target !== null) setCreatePlayer(prevState => ({ ...prevState, [name]: value }));
        }
    }

    const handleUpdateClassData = (data) => {
        setCreatePlayer(prevState => ({ ...prevState, ...data }))
    }
    const checkErrors = () => {
        let error = false;
        switch (step) {
            case 1:
                if (createPlayer.name === '') {
                    setErrors(prevState => ({ ...prevState, error: 'Please enter your character`s name' }));
                    error = true;
                }
                break;
            case 2:
                if (createPlayer.skills.length === 0) {
                    setErrors(prevState => ({ ...prevState, error: 'Select 1 skill to learn' }));
                    error = true;
                }
                break;
            // case 3:
            //     error = true;
            //     break;
            // case 4:
            //     error = true;
            //     break;

            default:
                error = false;
                break;
        }
        return error;
    }
    const handleNextStep = () => {
        const error = checkErrors();
        if (step < 3) {
            if (!error) {
                setStep(step + 1);
                setErrors({});
            }
        } else {
            savePlayerData(createPlayer)
            startGame();
        }

    }

    const handlePrevStep = () => {
        setStep(step - 1);
    }

    return (
        <div className='create-character'>
            <div className='create-character__title'>
                <h1 style={{ color: '#fff', margin: 0 }}>CREATE CHARACTER</h1>
            </div>
            <div className='create-character__form'>
                <div className="form-container">
                    {
                        step === 1 &&
                        <motion.div
                            className='form-group'
                            initial={{ opacity: 0, x: 500 }}
                            transition={{ duration: 0.7 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}>
                            {/* <label className='form-label'>Character's Name</label> */}
                            <input type='text' className='form-input' placeholder="Enter your name" name='name' onChange={handleUserInput} value={createPlayer.name} />
                        </motion.div>
                    }
                    {
                        step === 2 &&
                        <motion.div
                            className='character-classes'
                            initial={{ opacity: 0, x: 500 }}
                            transition={{ duration: 0.7 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}>
                            <h3 className='character-classes__title' style={{ color: '#fff' }}>Choose your class</h3>
                            <div className="character-classes__container">
                                <ClassesSelection handleUpdateClassData={handleUpdateClassData} />
                            </div>
                            <p className='error'>{errors.classError}</p>
                        </motion.div>
                    }
                    {
                        step === 3 &&
                        <div className='character-stats'>
                            <BounusStatsPointScreen stats={createPlayer.stats} handleUpdateClassData={handleUpdateClassData} />
                        </div>
                    }
                    <div><p className='error'>{errors.error}</p></div>
                    <div className='btn-group'>
                        {step > 1 &&
                            <button className='btn bg-green' onClick={handlePrevStep} style={{ marginRight: '10px' }}>Back</button>
                        }
                        <button type='submit' className='btn bg-green' onClick={handleNextStep}>Next</button>
                    </div>
                </div>

                {/* <div className='btn-group'>
                        <button type='submit' className='btn bg-red btn-large create-btn' onClick={handleCreateCharacter}>CREATE</button>
                    </div> */}
            </div>
        </div>
    )
}

export default CreateCharacter
