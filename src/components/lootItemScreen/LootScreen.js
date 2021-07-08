import React, { Component } from 'react'

export default class LootScreen extends Component {
    constructor(props) {
        super()

    }

    renderStats = () => {
        const { item } = this.props
        let stats = []
        for (const stat in item.stats) {
            if (item.stats.hasOwnProperty(stat)) {
                stats.push(
                    <p key={stat}>{`${stat}: ${item.stats[stat]}`}</p>
                )
            }
        }

        return stats
    }

    render() {
        const { item } = this.props
        return (
            <div className="loot-screen">
                <div className="item-img">
                    <img src={item.image} alt="" />
                </div>
                <div className="item-detail">
                    <p>{item.name.toUpperCase()}</p>
                    <p>{`price: ${item.price}`}</p>
                    {this.renderStats()}                
                </div>
                <div className="button-group">
                    <button className="btn bg-green w-200" onClick={() => this.props.takeItem(item)}>Take</button>
                    <button className="btn bg-red w-200" onClick={this.props.leaveItem}>Leave</button>
                </div>
            </div>
        )
    }
}
