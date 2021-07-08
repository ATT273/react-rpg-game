import { AnimatePresence, motion } from 'framer-motion';
import React, { Component } from 'react';
import './App.css';
import BattleScreen from './components/battleScreen/BattleScreen';
import CreateCharacter from './components/createCharacter/CreateCharacter';
import LootScreen from './components/lootItemScreen/LootScreen';
import CharacterStats from './components/sidebar/CharacterStats';
import WelcomeScreen from './components/welcomeScreen/WelcomeScreen';
import Game from './game';
import openningBackGround from './images/background/back_ground.jpg';
import player_img from './images/player/player.png';

class App extends Component {
	constructor() {
		super()

		this.state = {
			showWelcomeScreen: false,
			showCreateCharacterScreen: true,
			showFightScreen: false,
			showLootScreen: false,
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
				items: []
			},
			enemy: {
				type: 'com'
			},
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
		let id = Game.getEvent()
		console.log(`id`, id)
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
		const enemy = { ...this.state.enemy, ...Game.getEnemy() }

		this.setState({
			enemy
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
		console.log('item', item)
		let { player } = this.state
		if (player.items.length < 6) {
			player.items = [...player.items, item]
		}

		this.setState({
			player,
		}, () => console.log('pla', this.state.player))
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

	render() {
		const { startGame, showWelcomeScreen, showCreateCharacterScreen, showFightScreen, showLootScreen,
			player, enemy, loot } = this.state

		return (
			<div className="App">
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
					<div className="game_screen">
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
