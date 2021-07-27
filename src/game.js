import { enemies, items } from './data'

class Game {
    static getEnemy(key) {
        const filterEnemies = enemies.filter(enemy => enemy.key !== key)
        const randomIdx = Math.floor(Math.random() * (filterEnemies.length));
        return JSON.parse(JSON.stringify(filterEnemies[randomIdx]))
    }

    static normalAttack(attacker, target) {
        const dmgDealed = (attacker.stats.atk - target.stats.def) > 0 ? attacker.stats.atk - target.stats.def : 0
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
        return items[0]
    }
    static getEvent() {
        return Math.floor(Math.random() * Math.floor(2));
    }

}

export default Game