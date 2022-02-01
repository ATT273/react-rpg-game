import React from 'react';

function SkillSelection({ skills, selectedSkill, handleChooseSkill }) {
    return <div className='skills-container'>
        <h3>Choose 1 skill</h3>
        {
            skills.map((item, index) => (
                <div key={index} className={`skill-item ${selectedSkill === item.key ? 'active' : ''}`} onClick={() => handleChooseSkill(item)}>
                    <div className='name'>{item.name}</div>
                    <div className='cost'>cost: {item.cost}</div>
                    <div className={`target-${item.target}`}>target: {item.target}</div>
                    {item.effects.map((fx, fxIndex) => (
                        <div key={fxIndex} className={`effects`}> {fx.value} {fx.stats}</div>
                    ))}
                </div>
            ))
        }
    </div>;
}

export default SkillSelection;
