import React from 'react'

function InventoryBlock({ item }) {
    return (
        <React.Fragment>
            {
                item
                    ? <div className='item'>
                        <img src={item.image} alt={item.key} className='item-thumb' />
                        <div className='item-stats'>
                            <p>price: {item.price}</p>
                            {
                                Object.keys(item.stats).map(key => {
                                    return <p>{`${key}: ${item.stats[key]}`}</p>
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