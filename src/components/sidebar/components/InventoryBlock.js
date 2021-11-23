import React, { useState } from 'react';

function InventoryBlock({ itemIndex, item, onItemUsed, onItemDropped }) {
    const [isShowItemMenu, setIsShowItemMenu] = useState(false);
    const handleMenuBtnClick = () => {
        setIsShowItemMenu(!isShowItemMenu);
    }

    const handleUseItem = () => { setIsShowItemMenu(!isShowItemMenu); onItemUsed(item.key, itemIndex) }

    const handleDropItem = () => { setIsShowItemMenu(!isShowItemMenu); onItemDropped(item.key, itemIndex) }
    return (
        <React.Fragment>
            {
                item
                    ? <div className='item'>
                        <img src={item.image} alt={item.key} className='item-thumb' />
                        {item.qty > 1 && <div className='item-qty'>{item.qty}</div>}
                        <div className='three-dot-menu' onClick={handleMenuBtnClick}></div>
                        {
                            isShowItemMenu &&
                            <ul className='item-menu'>
                                {item.isConsumable && <li onClick={handleUseItem}>Use item</li>}
                                <li onClick={handleDropItem}>Drop item</li>
                            </ul>
                        }
                        <div className='item-stats'>
                            <p><b>{item.name.toUpperCase()}</b></p>
                            <p>price: {item.price}</p>
                            {
                                Object.keys(item.stats).map(key => {
                                    return <p key={key}>{`${key}: ${item.stats[key]}`}</p>
                                })
                            }
                        </div>
                    </div>
                    : <div className='item'></div>
            }
        </React.Fragment>

    )
}

export default InventoryBlock