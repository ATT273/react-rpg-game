import React, { useRef, useEffect } from 'react'

const BattleLog = ({ battleLogs }) => {
    const battleLogRef = useRef();
    const printBattleLog = battleLogs.map((log, index) => (<p key={index}>{log}</p>))
    useEffect(() => {
        const scroll = battleLogRef.current.scrollHeight - battleLogRef.current.clientHeight;
        battleLogRef.current.scrollTo({
            top: scroll,
            left: 0,
            behavior: 'smooth'
        })
    }, [battleLogs]);

    return (
        <div ref={battleLogRef} className={'battle-log'}>
            <p><b>{'Battle logs'}</b></p>
            {printBattleLog}
        </div>
    )
}

export default BattleLog
