import React from 'react'

function PlayerActionsBlock({ showComTurn, handleAtkButtonClick, handleSkillBtnClick, player }) {
    return (
        <div className="player-actions">
            <div className="button-group">
                <button disabled={showComTurn} className="btn bg-green w-200" onClick={() => handleAtkButtonClick('player', 'com')} >Attack</button>
                <button disabled={showComTurn || player.stats.mp < player.skills[0].cost} className="btn bg-green w-200" onClick={() => handleSkillBtnClick(player.skills[0].key)}>{player.skills[0].name}</button>
                {/* <button disabled={showComTurn} className="btn bg-green w-200">Skill 2</button>
                <button disabled={showComTurn} className="btn bg-green w-200">Skill 3</button> */}
            </div>
        </div>
    )
}

export default PlayerActionsBlock
