import React from 'react'

function StatsBar(props) {
    const { stats, name } = props
    return (
        <div style={{position: 'relative'}}>
            <div style={{height: '10px', width: '100px', backgroundColor: 'gray'}}></div>
            <div style={{height: '10px', width: `${stats}px`, position: 'absolute', top: '0px', left: '0px', backgroundColor: name === 'hp' ? 'red' : 'blue'}}></div>
        </div>
    )
}

export default StatsBar
