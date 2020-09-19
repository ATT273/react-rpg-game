import React, { Component } from 'react';
import CreateCharacter from './components/createCharacter/CreateCharacter'
import WelcomeScreen from './components/welcomeScreen/WelcomeScreen'
import BattleScreen from './components/battleScreen/BattleScreen'
import CharacterStats from './components/sidebar/CharacterStats'

import Game from './game'

import player_img from './images/player/player.png'
import openningBackGround from './images/background/back_ground.jpg'
import './App.css';
import { motion, AnimatePresence } from 'framer-motion'

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
				}
			},
			enemy: {
				type: 'com'
			},
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
		console.log('id', id)
	}

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

	savePLayerStats = (data) => {
		this.setState({
			player: data
		})
	}

	render() {
		const { startGame, showWelcomeScreen, showCreateCharacterScreen, showFightScreen, player, enemy } = this.state

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
										<WelcomeScreen toFightScreen={this.getBattleData} />
									</motion.div>
								</AnimatePresence>
							}
							{
								showFightScreen &&
								<BattleScreen
									player={player}
									com={enemy}
									savePlayerStats={this.savePLayerStats}
									getEvent={this.getEvent} />
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
