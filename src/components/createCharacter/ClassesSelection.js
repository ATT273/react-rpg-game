import React, { Component } from 'react'

export class ClassesSelection extends Component {
    // constructor() {
    //     super()

    // }

    render() {
        const { classInfo, image } = this.props
        return (
            <div className='item'>
                <div className="image-container">
                    <img className='' src={image} alt='knight_class' />
                </div>
                <h3><input type='radio' name='classes' value={classInfo.key} onChange={(e) => this.props.handleChange(e, 'radio')} />{classInfo.name}</h3>
                {/* <p>Bonus: +3 DEF</p> */}
                
            </div>
        )
    }
}

export default ClassesSelection
