import React from 'react'


const PUBLIC_URL = process.env.PUBLIC_URL;
const IngameMenu = ({ closeMenu, onCloseMenu, onSaveGame }) => {
    const handleSaveGame = () => {
        onSaveGame();
    }

    return (
        <div className='ingame-menu__container' onKeyDown={closeMenu} tabIndex={0}>
            <div className='ingame-menu__bg'></div>
            <div className='ingame-menu__main'>
                <div className='ingame-menu__close'>
                    <img src={`${PUBLIC_URL}/close.png`} width={25} height={25} onClick={() => onCloseMenu()} />
                </div>
                <h2 className='ingame-menu__title'>Menu</h2>
                <div className='ingame-menu__options-grp'>
                    <div className='ingame-menu__option' onClick={() => onCloseMenu()}>Resume</div>
                    <div className='ingame-menu__option' onClick={handleSaveGame}>Save game</div>
                    <div className='ingame-menu__option'>To main menu</div>
                </div>
            </div>
        </div>
    )
};

export default IngameMenu;
