import React, { Component } from 'react'

export default class IngameMenu extends Component {
    render() {
        return (
            <div className='ingame-menu__container' onKeyDown={this.props.closeMenu} tabIndex={0}>
                <div className='ingame-menu__bg'></div>
                <div className='ingame-menu__main'>
                    <h2 className='ingame-menu__title'>Menu</h2>
                    <div className='ingame-menu__options-grp'>
                        <div className='ingame-menu__option'>Resume</div>
                        <div className='ingame-menu__option'>Save game</div>
                        <div className='ingame-menu__option'>To main menu</div>
                    </div>
                </div>

            </div>
        )
    }
}
