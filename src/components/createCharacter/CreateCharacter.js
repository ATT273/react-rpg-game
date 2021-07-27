import React, { Component } from 'react'
import ClassesSelection from './ClassesSelection'
import { classes } from '../../data'

export class CreateCharacter extends Component {
    constructor() {
        super()

        this.state = {
            name: '',
            atk: null,
            def: null,
            spd: null,
            slClass: '',
            statsError: '',
            nameError: '',
            classError: ''
        }
    }

    renderClassesSelection = (classes) => {
        let classSelection = []
        for(let item in classes) {
            classSelection.push(
                <ClassesSelection
                key={classes[item].key}
                classInfo={classes[item]}
                image={classes[item].image}
                handleChange={(e, type) => this.handleUserInput(e, type)} />
            )
        }
        return classSelection
    }

    handleCreateCharacter = (e) => {
        e.preventDefault()
        const { name, atk, def, spd, slClass } = this.state
        let err = false
        if(name === '') {
            this.setState({
                nameError: 'Please enter your character`s name'
            })
            err = true
        } else if(atk === '' ||  def === '' || spd === ''){
            this.setState({
                statsError: 'Please enter your stats'
            })
            err = true
        } else if(Number(atk)  + Number(def)  + Number(spd) > 12) {
            // this.setState({
            //     statsError: 'Can not assign more than 12 point to stats'
            // })
            // err = true
        } else if(slClass === '') {
            this.setState({
                classError: 'Please choose your class'
            })
            err = true
        }

        if(!err) {
            this.props.createCharacter(this.state)
        } else {
            console.log('errrr')
        }
    }

    handleUserInput = (e, type) => {
        switch (type) {
            case 'atk':
                if(e.target.value < 0) {
                    console.log('negative')
                    this.setState({
                        statsError: 'can not assign negative number to stats'
                    })
                } else {
                    this.setState({
                        atk: e.target.value,
                        statsError: ''
                    })
                }
                break;
            case 'def':
                if(e.target.value < 0) {
                    this.setState({
                        statsError: 'can not assign negative number to stats'
                    })
                } else {
                    this.setState({
                        def: e.target.value,
                        statsError: ''
                    })
                }
                break;
            case 'spd':
                if(e.target.value < 0) {
                    this.setState({
                        statsError: 'can not assign negative number to stats'
                    })
                } else {
                    this.setState({
                        spd: e.target.value,
                        statsError: ''
                    })
                }
                break;
            case 'name':
                this.setState({
                    name: e.target.value
                })
                break;
            case 'radio':
                this.setState({
                    slClass: e.target.value
                })
                break;
        
            default:
                break;
        }
        
    }
    render() {
        return (
            <div className='create-character'>
                <div className='create-character__title'>
                    <h1>CREATE CHARACTER</h1>
                </div>
                <div className='create-character__form'>
                    <form onSubmit={this.handleCreateCharacter}>
                        <div className='form-group'>
                            <label className='form-label'>Character's Name</label>
                            <input type='text' className='form-input' placeholder="Enter your character's name" onChange={(e) => this.handleUserInput(e, 'name')} />
                        </div>
                        <p className='error'>{this.state.nameError}</p>
                        <div className='character-stats'>
                            {/* <h3 className='character-stats__title'>Character Stats:</h3> */}
                            <div className='form-group'>
                                <label className='form-label'>Attack</label>
                                <input type='number' className='form-input stats-input' placeholder="" onChange={(e) => this.handleUserInput(e, 'atk')} />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Defense</label>
                                <input type='number' className='form-input stats-input' placeholder="" onChange={(e) => this.handleUserInput(e, 'def')} />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Speed</label>
                                <input type='number' className='form-input stats-input' placeholder="" onChange={(e) => this.handleUserInput(e, 'spd')} />
                            </div>
                            <p className='error'>{this.state.statsError}</p>
                        </div>
                        
                        <div className='character-classes'>
                            <h3 className='character-classes__title'>Choose your class</h3>
                            <div className="character-classes__container">
                                {
                                    this.renderClassesSelection(classes)
                                }
                            </div>
                            <p className='error'>{this.state.classError}</p>
                        </div>
                        <button type='submit' className='btn bg-red btn-large'>CREATE</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateCharacter
