import { enemies, events, items } from './data'

class Game {
    static getEnemy(key) {
        const filterEnemies = enemies.filter(enemy => enemy.key !== key)
        const randomIdx = Math.floor(Math.random() * (filterEnemies.length));
        return JSON.parse(JSON.stringify(filterEnemies[randomIdx]))
    }

    static normalAttack(attacker, target) {
        const bonusStats = this.getBonusStats(attacker.type === 'player' ? attacker.items : target.items);
        const atkAttacker = attacker.type === 'player' ? (attacker.stats.atk + bonusStats.atk) : attacker.stats.atk;
        const defTarget = target.type === 'player' ? (target.stats.def + bonusStats.def) : target.stats.def;
        const dmgDealed = (atkAttacker - defTarget) > 0 ? atkAttacker - defTarget : 0
        let type = attacker.type
        target.stats.hp = (target.stats.hp - dmgDealed) < 0 ? 0 : target.stats.hp - dmgDealed

        const combatLog = `${attacker.name} deals ${dmgDealed} damage`

        return { attacker, target, type, combatLog }
    }

    static winCondition(player, com) {
        if (player.stats.hp === 0) {
            return {
                status: 0,
                message: 'You are defeated'
            }
        }

        if (com.stats.hp === 0) {
            return {
                status: 0,
                message: 'You win'
            }
        }

        return {
            status: 1,
            message: 'continue'
        }
    }

    static getLootItem() {
        // const filterEvents = events.filter(event => event.id !== id)
        const randomIdx = Math.floor(Math.random() * (items.length));
        return items[randomIdx]
    }
    static getEvent(id) {
        const filterEvents = events.filter(event => event.id !== id)
        const randomIdx = Math.floor(Math.random() * (filterEvents.length));
        return filterEvents[randomIdx].id
    }

    static getBonusStats(itemList) {
        const bonusStats = {
            atk: 0,
            def: 0,
            hp: 0,
            spd: 0,
            mp: 0
        }
        itemList.forEach(item => {
            bonusStats.atk += item.stats.atk !== undefined ? item.stats.atk : 0
            bonusStats.def += item.stats.def !== undefined ? item.stats.def : 0
            bonusStats.hp += item.stats.hp !== undefined ? item.stats.hp : 0
            bonusStats.mp += item.stats.mp !== undefined ? item.stats.mp : 0
            bonusStats.spd += item.stats.spd !== undefined ? item.stats.spd : 0

        })

        return bonusStats
    }

    static takeItem(item, itemList) {
        let newInventory = [...itemList];
        let message = '';
        let checkDuplicate = false;
        if (itemList.length < 6) {

            itemList.forEach((pItem) => {
                if (pItem.key === item.key) {
                    checkDuplicate = true
                    message = 'You \'ve already had this item';
                }
                if (pItem.type === item.type) {
                    checkDuplicate = true
                    message = `You can\'t have 2 items with the type of ${item.type}`;
                }
            })
            if (!checkDuplicate) {
                newInventory.push(item);
                message = `${item.name} is added to your inventory`;
                // const bonusStats = Game.getBonusStats(inventory);
                // dispatch(updateInventory([...inventory]));
                // dispatch(updateBonusStats(bonusStats));
                // player.bonusStats = { ...Game.getBonusStats(itemList) }
            }

        } else if (itemList.length > 6) {
            console.log('Please remove 1 of your items')
        }
        return { newInventory, message, duplicate: checkDuplicate }
    }
}

export default Game