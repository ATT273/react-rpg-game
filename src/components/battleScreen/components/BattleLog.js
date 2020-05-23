import React, { Component } from 'react'

export class BattleLog extends Component {
    
    render() {
        const { battleLogs } = this.props
        const printBattleLog = battleLogs.map((log, index) => (<p key={index}>{log}</p>))

        return (
            <div className={'battle-log'}>
                <p><b>{'Battle logs'}</b></p>
                {printBattleLog}
            </div>
        )
    }
}

export default BattleLog
