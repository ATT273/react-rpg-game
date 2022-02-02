import React from 'react'
import SkillSelection from './SkillSelection';

const ClassesSelection = ({ classInfo, image, handleChange, selectedClass }) => {
    return (
        <div className={`item ${selectedClass === classInfo.key ? 'active' : ''}`}>
            <div className="image-container" onClick={() => handleChange({ value: classInfo.key, bonuses: classInfo.bonuses, skills: classInfo.skills })}>
                <img className='' src={image} alt='knight_class' />
            </div>
            <h3 className='class-title'>{classInfo.name}</h3>
            <div className='class-bonus'>
                {Object.keys(classInfo.bonuses).map(key => (
                    <p key={key} style={{ color: '#fff' }}>{`+${classInfo.bonuses[key]} ${key}`} </p>
                ))}
            </div>
        </div>
    )
}

export default ClassesSelection
