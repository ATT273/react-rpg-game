import { enemies } from './data'

class Game {
    static getEnemy() {
        return enemies.tiger
    }

    static normalAttack(attacker, target) {
        console.log('gameatt', attacker)
        console.log('gametar', target)
        const dmgDealed = (attacker.stats.atk - target.stats.def) > 0 ? attacker.stats.atk - target.stats.def : 0
        target.stats.hp = (target.stats.hp - dmgDealed) < 0 ? 0 : target.stats.hp - dmgDealed 
        let type = attacker.type
        console.log('type', type)
        return { attacker, target, type }
    }

    static winCondition(player, com) {
        if(player.stats.hp === 0) {
            return {
                status: 0,
                message: 'You are defeated'
            }
        }

        if(com.stats.hp === 0) {
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

}

export default Game