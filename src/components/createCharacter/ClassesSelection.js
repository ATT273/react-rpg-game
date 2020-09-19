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
                <h3 style={{ textAlign: 'center' }}>
                    <input type='radio' name='classes' value={classInfo.key} onChange={(e) => this.props.handleChange(e, 'radio')} />{classInfo.name}
                </h3>
            </div>
        )
    }
}

export default ClassesSelection
