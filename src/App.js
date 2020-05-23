import React, { Component } from 'react';
import CreateCharacter from './components/createCharacter/CreateCharacter'
import WelcomeScreen from './components/welcomeScreen/WelcomeScreen'
import BattleScreen from './components/battleScreen/BattleScreen'
import CharacterStats from './components/sidebar/CharacterStats'

import Game from './game'

import player_img from './images/player/player.png'
import './App.css';

class App extends Component {
	constructor() {
		super()

		this.state = {
			showWelcomeScreen: false,
			showCreateCharacterScreen: true,
			showFightScreen: false,
			showLootScreen: false,
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
			}
		}
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
		const { showWelcomeScreen, showCreateCharacterScreen, showFightScreen, player, enemy } = this.state

		return (
			<div className="App">
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
						<WelcomeScreen toFightScreen={this.getBattleData} />
					}
					{
						showFightScreen &&
						<BattleScreen 
							player={player} 
							com={enemy}
							savePlayerStats={this.savePLayerStats} />
					}
				</main>
				<aside className="side-bar help__sidebar"></aside>
			</div>
		);
	}

}

export default App;
