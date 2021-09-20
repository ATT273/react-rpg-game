import React from 'react'

function PlayerActionsBlock(props) {
    return (
        <div className="player-actions">
            <div className="button-group">
                <button disabled={props.showComTurn} className="btn bg-green w-200" onClick={() => props.handleAtkButtonClick('player', 'com')} >Attack</button>
                <button disabled={props.showComTurn} className="btn bg-green w-200">Skill 1</button>
                <button disabled={props.showComTurn} className="btn bg-green w-200">Skill 2</button>
                <button disabled={props.showComTurn} className="btn bg-green w-200">Skill 3</button>
            </div>
        </div>
    )
}

export default PlayerActionsBlock
