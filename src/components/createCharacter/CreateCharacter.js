import React, { useEffect, useState } from 'react'
import ClassesSelection from './ClassesSelection'
import { classes } from '../../data'
import { useSelector, useDispatch } from 'react-redux';
import { createCharacter } from '../../store/player/playerSlice';
import Game from '../../game';
import SkillSelection from './SkillSelection';

const CreateCharacter = ({ startGame }) => {
    const dispatch = useDispatch();
    const player = useSelector(state => state.player.player);
    const [createPlayer, setCreatePlayer] = useState({});
    const [selectedClass, setSelectedClass] = useState({});
    const [selectedSkill, setSelectedSkill] = useState({});
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const initPlayer = Object.assign({}, player);
        const levelExp = Game.calculateCurrentLvlExp(1);
        setCreatePlayer(prevState => ({ ...prevState, ...initPlayer, levelExp }));

    }, [player])

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

            dispatch(createCharacter({ ...createPlayer, plClass: selectedClass.plClass }));
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

    const handleChooseSkill = (data) => {
        setSelectedSkill(data);
        setCreatePlayer(prevState => ({ ...prevState, skills: [data] }))
    }
    return (
        <div className='create-character'>
            <div className='create-character__title'>
                <h1 style={{ color: '#fff' }}>CREATE CHARACTER</h1>
            </div>
            <div className='create-character__form'>
                <div>
                    {/* <form onSubmit={handleCreateCharacter}> */}
                    <div className='form-group'>
                        <label className='form-label'>Character's Name</label>
                        <input type='text' className='form-input' placeholder="Enter your character's name" name='name' onChange={handleUserInput} />
                    </div>
                    <p className='error'>{errors.nameError}</p>
                    <div className='character-stats'>
                        {/* <h3 className='character-stats__title'>Character Stats:</h3> */}
                        <div className='form-group'>
                            <label className='form-label'>Attack</label>
                            <input type='number' className='form-input stats-input' name='atk' placeholder="" onChange={handleUserInput} />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Defense</label>
                            <input type='number' className='form-input stats-input' name='def' placeholder="" onChange={handleUserInput} />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Speed</label>
                            <input type='number' className='form-input stats-input' name='spd' placeholder="" onChange={handleUserInput} />
                        </div>
                        <p className='error'>{errors.statsError}</p>
                    </div>

                    <div className='character-classes'>
                        <h3 className='character-classes__title' style={{ color: '#fff' }}>Choose your class</h3>
                        <div className="character-classes__container">
                            {renderClassesSelection(classes)}
                        </div>
                        <p className='error'>{errors.classError}</p>
                    </div>
                    {
                        selectedClass.value &&
                        <SkillSelection skills={selectedClass.skills} selectedSkill={selectedSkill.key} handleChooseSkill={handleChooseSkill} />
                    }
                    <div className='btn-group'>
                        <button type='submit' className='btn bg-red btn-large create-btn' onClick={handleCreateCharacter}>CREATE</button>
                    </div>
                    {/* </form> */}
                </div>

            </div>
        </div>
    )
}

export default CreateCharacter
