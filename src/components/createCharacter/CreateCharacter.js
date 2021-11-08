import React, { useEffect, useState } from 'react'
import ClassesSelection from './ClassesSelection'
import { classes } from '../../data'
import { useSelector, useDispatch } from 'react-redux';
import { updateStats } from '../../store/player/playerSlice';

const CreateCharacter = () => {
    const dispatch = useDispatch();
    const player = useSelector(state => state.player.player);
    const [createPlayer, setCreatePlayer] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setCreatePlayer(prevState => ({ ...prevState, ...player }));
    }, [])

    const renderClassesSelection = () => {
        let classSelection = []
        for (let item in classes) {
            classSelection.push(
                <ClassesSelection
                    key={classes[item].key}
                    classInfo={classes[item]}
                    image={classes[item].image}
                    handleChange={handleUserInput} />
            )
        }
        return classSelection
    }

    const handleCreateCharacter = (e) => {
        e.preventDefault()
        // const { name, atk, def, spd, slClass } = this.state
        let err = false;
        if (createPlayer.name === '') {
            setErrors(prevState => ({ ...prevState, nameError: 'Please enter your character`s name' }));
            err = true
        } else if (createPlayer.atk === 0 || createPlayer.def === 0 || createPlayer.spd === 0) {
            setErrors(prevState => ({ ...prevState, statsError: 'Please enter your stats' }));
            err = true
        } else if (Number(createPlayer.atk) + Number(createPlayer.def) + Number(createPlayer.spd) > 12) {
            setErrors(prevState => ({ ...prevState, statsError: 'Can not assign more than 12 point to stats' }));
            err = true
        } else if (createPlayer.plClass === '') {
            setErrors(prevState => ({ ...prevState, classError: 'Please choose your class' }));
            err = true
        }

        // if (!err) {
        //     this.props.createCharacter(this.state)
        // } else {
        //     console.log('errrr')
        // }
    }

    const handleUserInput = (e) => {

        let statsError;
        if (['atk', 'def', 'spd'].includes(e.target.name)) {
            if (e.target.value < 0) {
                statsError = 'can not assign negative number to stats';
                setErrors(prevState => ({ ...prevState, statsError }));
            } else {
                console.log(`e.target.value`, e.target.value);
                console.log(`e.target.name`, e.target.name);
                setCreatePlayer(prevState => ({ ...prevState, stats: { ...prevState.stats, [e.target.name]: e.target.value } }));
            }
        } else {
            console.log(`e.target.value`, e.target.value);
            console.log(`e.target.name`, e.target.name);
            setCreatePlayer(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        }
    }

    return (
        <div className='create-character'>
            <div className='create-character__title'>
                <h1 style={{ color: '#fff' }}>CREATE CHARACTER</h1>
            </div>
            <div className='create-character__form'>
                <form onSubmit={handleCreateCharacter}>
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
                    <button type='submit' className='btn bg-red btn-large'>CREATE</button>
                </form>
            </div>
        </div>
    )
}

export default CreateCharacter
