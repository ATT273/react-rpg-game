import React, { useState, useEffect } from 'react'

function BounusStatsPointScreen({ stats, handleUpdateClassData, handlePrevStep, handleCreate }) {
    const [statsState, setStatsState] = useState({});
    const [points, setPoints] = useState(5);

    useEffect(() => {
        console.log('run');
        setStatsState(stats);

    }, []);

    // useEffect(() => {
    //     handleUpdateClassData({ stats: statsState });
    // }, [statsState]);

    const handleAddPoint = (type) => {
        const _stats = { ...statsState };
        if (type === 'hp') {
            _stats[type] += 1;
            _stats['maxHP'] += 1;
        } else {
            _stats[type] += 1;
        }
        setStatsState(_stats);
        setPoints(points - 1);
    }

    const handleSubtractPoint = (type) => {
        const _stats = { ...statsState };
        if (type === 'hp') {
            _stats[type] -= 1;
            _stats['maxHP'] -= 1;
        } else {
            _stats[type] -= 1;
        }
        setStatsState(_stats);
        setPoints(points + 1);
    }

    return (
        <div>
            <h4 className='stats-note'>You have {points} points to assign to your stats</h4>
            <div className='class-stats'>
                <div className='editable-stats'>
                    <p>Hp: {statsState.hp}</p>
                    <div className='btn-group'>
                        <button
                            className='btn btn-square bg-dark-red'
                            onClick={() => handleAddPoint('hp')}
                            disabled={points === 0}
                        >+</button>
                        <button
                            className='btn btn-square btn-sub'
                            style={{ opacity: statsState.hp > stats.hp ? 1 : 0 }}
                            onClick={() => handleSubtractPoint('hp')}
                            disabled={points === 5 || statsState.hp === stats.hp}>-</button>
                    </div>
                </div>
                <div className='editable-stats'>
                    <p>Atk: {statsState.atk}</p>
                    <div className='btn-group'>
                        <button className='btn btn-square bg-dark-red' onClick={() => handleAddPoint('atk')} disabled={points === 0}>+</button>
                        <button
                            className='btn btn-square btn-sub'
                            style={{ opacity: statsState.atk > stats.atk ? 1 : 0 }}
                            onClick={() => handleSubtractPoint('atk')}
                            disabled={points === 5 || statsState.atk === stats.atk}
                        >-</button>
                    </div>
                </div>
                <div className='editable-stats'>
                    <p>Def: {statsState.def}</p>
                    <div className='btn-group'>
                        <button className='btn btn-square bg-dark-red' onClick={() => handleAddPoint('def')} disabled={points === 0}>+</button>
                        <button
                            className='btn btn-square btn-sub'
                            style={{ opacity: statsState.def > stats.def ? 1 : 0 }}
                            onClick={() => handleSubtractPoint('def')}
                            disabled={points === 5 || statsState.def === stats.def}
                        >-</button>
                    </div>
                </div>
                <div className='editable-stats'>
                    <p>Int: {statsState.int}</p>
                    <div className='btn-group'>
                        <button className='btn btn-square bg-dark-red' onClick={() => handleAddPoint('int')} disabled={points === 0}>+</button>

                        <button
                            className='btn btn-square btn-sub'
                            style={{ opacity: statsState.int > stats.int ? 1 : 0 }}
                            onClick={() => handleSubtractPoint('int')}
                            disabled={points === 5 || statsState.int === stats.int}
                        >-</button>
                    </div>
                </div>
                <div className='editable-stats'>
                    <p>Spd: {statsState.spd}</p>
                    <div className='btn-group'>
                        <button className='btn btn-square bg-dark-red' onClick={() => handleAddPoint('spd')} disabled={points === 0}>+</button>

                        <button
                            className='btn btn-square btn-sub'
                            style={{ opacity: statsState.spd > stats.spd ? 1 : 0 }}
                            onClick={() => handleSubtractPoint('spd')}
                            disabled={points === 5 || statsState.spd === stats.spd}
                        >-</button>
                    </div>
                </div>

            </div>
            <div className='btn-group'>
                <button className='btn bg-green' onClick={handlePrevStep} style={{ marginRight: '10px' }}>Back</button>
                <button type='submit' className='btn bg-green' onClick={() => handleCreate(statsState)}>Create</button>
            </div>
        </div>
    )
}

export default BounusStatsPointScreen