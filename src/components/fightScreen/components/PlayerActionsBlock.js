import React from 'react'

function PlayerActionsBlock(props) {
    return (
        <div className="player-actions">
            <div className="button-group">
                <button className="btn bg-green w-200" onClick={props.handleButtonCLick} >Attack</button>
                <button className="btn bg-green w-200">Skill 1</button>
                <button className="btn bg-green w-200">Skill 2</button>
                <button className="btn bg-green w-200">Skill 3</button>
            </div>
        </div>
    )
}

export default PlayerActionsBlock
