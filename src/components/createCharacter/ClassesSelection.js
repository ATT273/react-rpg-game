import React, { Component } from 'react'

export class ClassesSelection extends Component {
    // constructor() {
    //     super()

    // }

    render() {
        const { classInfo, image } = this.props
        return (
            <div className='item'>
                <h3 style={{ textAlign: 'center', marginBottom: '10px', color: '#fff' }}>
                    <input type='radio' name='plClass' value={classInfo.key} onChange={this.props.handleChange} />{classInfo.name}
                </h3>
                <div className="image-container">
                    <img className='' src={image} alt='knight_class' />
                </div>

            </div>
        )
    }
}

export default ClassesSelection
