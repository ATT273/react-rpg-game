import React, { Component } from 'react'

const intro = {
    transition: 'all 500ms ease-out'
}

const defaultSize = {
    width: '100px',
    height: '100px'
}

const bigSize = {
    width: '300px',
    height: '200px'
}
class PopUp extends Component {
   

    render() {
        const { display, title, renderButtons, renderInfo, size } = this.props
        let popupSize = {}
        if(size === 'big') {
            popupSize = bigSize
        } else {
            popupSize = defaultSize
        }
        return (
            <div className="popup bg-red" style={{...intro, ...popupSize, display: display}}>
                <div className="popup__container">
                    <h3 className='popup__title'>{title}</h3>
                    <div className="popup__content">
                        {
                            renderInfo &&
                            this.renderPopUpInfo()
                        }
                        {
                            renderButtons &&
                            this.renderPopUpButtons()
                        }
                    </div>
                </div>
            </div>
        )
    }

    /**
     * @inheritdoc
     */
    renderPopUpButtons = () =>  {
        return (
            <div className="popup__button button-group">
                <button className='btn bg-green' onClick={this.handleReady}>READY!</button>
            </div>
        )
    }

    /**
     * @inheritdoc
     */
    renderPopUpInfo = () => {
        return (
            <div className="popup__info">
                <div>'popup info'</div>
            </div>
        )
    }

    handleReady = () => {
        this.props.handleReady()
    }
    
}

export default PopUp
