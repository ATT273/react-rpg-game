import React from 'react'

const intro = {
    transition: 'all 500ms ease-out'
}

function PopUp(props) {
    return (
        <div>
            <div className="introduction" style={{...intro, display: props.display}} >
                    <h3 className='introduction__title'>Prepare for Battle</h3>
                    <div className="introduction__content">
                        <div className="info">
                            {props.title}
                        </div>
                        <div className="button-group">
                            <button className='btn bg-green' onClick={props.handleReady}>READY!</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default PopUp
