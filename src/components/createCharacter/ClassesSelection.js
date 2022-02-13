import React, { useState, useEffect } from 'react'
import SkillSelection from './SkillSelection';
import { classes } from '../../data';

const classKeys = ['knight', 'warrior', 'assassin', 'mage'];

const ClassesSelection = ({ handleUpdateClassData }) => {
    const [activeClass, setActiveClass] = useState(0);
    const [selectedSkill, setSelectedSkill] = useState({});

    useEffect(() => {
        // setSelectedSkill({});
        handleUpdateClassData({ plClass: classes[classKeys[activeClass]].key, stats: { ...classes[classKeys[activeClass]].stats }, skills: [] })
    }, [activeClass]);

    const handlePrevClass = () => {
        if (activeClass > 0) setActiveClass(activeClass - 1)
    }

    const handleNextClass = () => {
        if (activeClass < 3) setActiveClass(activeClass + 1)
    }

    const handleSkillSelected = (data) => {
        setSelectedSkill(data);
        handleUpdateClassData({ skills: [data] });
    }

    return (
        <div className='class-container'>
            <div className='class-image'>
                <img src={classes[classKeys[activeClass]].image} />
                <span className='prev-class' onClick={handlePrevClass}></span>
                <span className='next-class' onClick={handleNextClass}></span>
            </div>
            <div className='class-info'>
                <div className='class-stats'>
                    <div><p>Hp: {classes[classKeys[activeClass]].stats.hp}</p></div>
                    <div><p>Atk: {classes[classKeys[activeClass]].stats.atk}</p></div>
                    <div><p>Def: {classes[classKeys[activeClass]].stats.def}</p></div>
                    <div><p>Int: {classes[classKeys[activeClass]].stats.int}</p></div>
                    <div><p>Spd: {classes[classKeys[activeClass]].stats.spd}</p></div>
                </div>
                <SkillSelection skills={classes[classKeys[activeClass]].skills} selectedSkill={selectedSkill.key} handleChooseSkill={handleSkillSelected} />
            </div>
        </div>
        // <div className={`item ${selectedClass === classInfo.key ? 'active' : ''}`}>
        //     <div className="image-container" onClick={() => handleChange({ value: classInfo.key, bonuses: classInfo.bonuses, skills: classInfo.skills })}>
        //         <img className='' src={image} alt='knight_class' />
        //     </div>
        //     <h3 className='class-title'>{classInfo.name}</h3>
        //     <div className='class-bonus'>
        //         {Object.keys(classInfo.bonuses).map(key => (
        //             <p key={key} style={{ color: '#fff' }}>{`+${classInfo.bonuses[key]} ${key}`} </p>
        //         ))}
        //     </div>
        // </div>
    )
}

export default ClassesSelection
