import { AnimatePresence, motion } from 'framer-motion';
import React, { Component } from 'react';
import './App.css';
import BattleScreen from './components/battleScreen/BattleScreen';
import CreateCharacter from './components/createCharacter/CreateCharacter';
import LootScreen from './components/lootItemScreen/LootScreen';
import CharacterStats from './components/sidebar/CharacterStats';
import WelcomeScreen from './components/welcomeScreen/WelcomeScreen';
import IngameMenu from './components/UIComponents/IngameMenu';
import Game from './game';
import openningBackGround from './images/background/back_ground.jpg';
import player_img from './images/player/player.png';
import { enemies, items } from './data'
class App extends Component {
	constructor() {
		super()

		this.state = {
			showWelcomeScreen: false,
			showCreateCharacterScreen: true,
			showFightScreen: false,
			showLootScreen: false,
			isShowIngameMenu: false,
			startGame: false,
			player: {
				type: 'player',
				name: '',
				image: null,
				plClass: '',
				stats: {
					hp: 100,
					mp: 100,
					atk: 0,
					def: 0,
					spd: 0
				},
				bonusStats: {
					hp: 0,
					mp: 0,
					atk: 0,
					def: 0,
					spd: 0
				},
				items: []
			},
			enemy: {
				type: 'com'
			},
			currentEnemy: '',
			currentEvent: null,
			loot: {

			}
		}
	}

	startGame = () => {
		this.setState({
			startGame: true,
		})
	}

	createCharacter = (character) => {
		const { name, atk, def, spd, slClass } = character
		let player = { ...this.state.player }
		let stats = { ...this.state.player.stats }

		player.name = name
		player.image = player_img
		player.plClass = slClass
		stats.atk = Number(atk)
		stats.def = Number(def)
		stats.spd = Number(spd)
		player.stats = stats

		this.setState({
			player,
			showWelcomeScreen: true,
			showCreateCharacterScreen: false
		})
	}

	getEvent = () => {
		const { currentEvent } = this.state
		let id = Game.getEvent(currentEvent)
		this.setState({
			currentEvent: id
		})
		// let id  = 1
		if (id === 0) {
			this.getBattleData()
		} else if (id === 1) {
			this.getLootData()
		} else if (id === 2) {
			this.getShopData()
		}
	}

	// battle screen
	getBattleData = () => {
		const { currentEnemy } = this.state
		const getEnemy = Object.assign({}, Game.getEnemy(currentEnemy))

		this.setState({
			enemy: { ...getEnemy },
			currentEnemy: getEnemy.key
		})

		this.showFightScreen()
	}

	showFightScreen = () => {
		this.setState({
			showWelcomeScreen: false,
			showFightScreen: true
		})
	}

	// loot screen
	showLootScreen = () => {
		this.setState({
			showLootScreen: true,
			showFightScreen: false,
			showWelcomeScreen: false,
		})
	}

	getLootData = () => {
		const lootItem = Game.getLootItem()
		this.setState({
			loot: lootItem
		})
		this.showLootScreen()
	}

	takeItem = (item) => {
		let { player } = this.state
		if (player.items.length < 6) {
			let checkDuplicate = false
			player.items.forEach((pItem) => {
				if (pItem.key === item.key) {
					checkDuplicate = true
					console.log('You \'ve already had this item')
				}
			})
			if (!checkDuplicate) {
				player.items = [...player.items, item]

				player.bonusStats = { ...Game.getBonusStats(player.items) }
			}

		} else if (player.items.length > 6) {
			console.log('Please remove 1 of your items')
		}


		this.setState({
			player,
		}, () => {
			console.log('pla', this.state.player)
			this.getEvent()
		})
	}

	leaveItem = () => {
		console.log('leave item')
		this.getEvent()
	}

	// shop screen
	showShopScreen = () => {

	}

	getShopData = () => {
		console.log('get shop');
	}

	savePLayerStats = (data) => {
		this.setState({
			player: data
		})
	}

	handleKeypress = (e) => {
		const key = e.keyCode
		switch (key) {
			case 27:
				this.setState({
					isShowIngameMenu: !this.state.isShowIngameMenu
				})
				break;

			default:
				break;
		}
	}

	render() {
		const { startGame, showWelcomeScreen, showCreateCharacterScreen, showFightScreen, showLootScreen,
			player, enemy, loot, isShowIngameMenu } = this.state

		return (
			<div className="App" onKeyDown={this.handleKeypress} tabIndex="0">
				{
					isShowIngameMenu &&
					<IngameMenu closeMenu={this.handleKeypress} />
				}
				<AnimatePresence>
					{
						!startGame &&
						<motion.div className="first_screen"
							initial={{ opacity: 1 }}
							transition={{ duration: 1 }}
							exit={{ opacity: 0 }}>
							<img className="bg_image" src={openningBackGround} alt="" />
							<button className="btn_start btn" onClick={this.startGame}>Start!</button>
						</motion.div>
					}

				</AnimatePresence>
				{
					startGame &&
					<div className="game_screen" >
						<aside className="side-bar character-detail__sidebar">
							{
								player.name !== '' &&
								<CharacterStats player={player} />
							}

						</aside>
						<main className="main-screen">
							{
								showCreateCharacterScreen &&
								<CreateCharacter createCharacter={(character) => this.createCharacter(character)} />
							}
							{
								showWelcomeScreen &&
								<AnimatePresence>
									<motion.div className="container"
										initial={{ opacity: 0 }}
										transition={{ duration: 1 }}
										animate={{ opacity: 1 }}>
										<WelcomeScreen toFightScreen={this.getEvent} />
									</motion.div>
								</AnimatePresence>
							}
							{
								showFightScreen &&
								<AnimatePresence>
									<motion.div className="container"
										initial={{ opacity: 0 }}
										transition={{ duration: 1 }}
										animate={{ opacity: 1 }}>
										<BattleScreen
											player={player}
											com={enemy}
											comKey={enemy.key}
											savePlayerStats={this.savePLayerStats}
											getEvent={this.getEvent} />
									</motion.div>
								</AnimatePresence>

							}
							{
								showLootScreen &&
								<AnimatePresence>
									<motion.div className="container"
										initial={{ opacity: 0 }}
										transition={{ duration: 1 }}
										animate={{ opacity: 1 }}>
										<LootScreen item={loot} takeItem={this.takeItem} leaveItem={this.leaveItem} />
									</motion.div>
								</AnimatePresence>
							}
						</main>
						<aside className="side-bar help__sidebar"></aside>
					</div>
				}
			</div>
		);
	}

}

export default App;
