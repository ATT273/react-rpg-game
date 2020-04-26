import React from 'react'

const WelcomeScreen = (props) => {
    return (
        <div className='welcome-screen'>
            <div className="main-content">
            welcome
            </div>
            <div className="button-group ">
                <button className='btn btn-large bg-green' onClick={props.toFightScreen}> Start </button>
            </div>
        </div>
    )
}

export default WelcomeScreen
