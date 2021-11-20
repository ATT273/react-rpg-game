import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import './App.css';
import BattleScreen from './components/battleScreen/BattleScreen';
import CreateCharacter from './components/createCharacter/CreateCharacter';
import LootScreen from './components/lootItemScreen/LootScreen';
import CharacterStats from './components/sidebar/CharacterStats';
import WelcomeScreen from './components/welcomeScreen/WelcomeScreen';
import IngameMenu from './components/UIComponents/IngameMenu';
import Game from './game';
import openningBackGround from './images/background/back_ground.jpg';
import DarkBG from './images/background/dark_bg.jpg';
import { enemies, items } from './data'
import { useSelector, useDispatch } from 'react-redux';
import { updateStats, updateInventory, updateBonusStats } from './store/player/playerSlice';

const App = () => {
	const [currentEvent, setCurrentEvent] = useState(null);
	const [currentEnemy, setCurrentEnemy] = useState('');
	const [enemy, setEnemy] = useState({ type: 'com' });
	const [player, setPlayer] = useState({});


	const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
	const [showCreateCharacterScreen, setShowCreateCharacterScreen] = useState(true);
	const [showFightScreen, setShowFightScreen] = useState(false);
	const [showLootScreen, setShowLootScreen] = useState(false);
	const [showIngameMenu, setShowIngameMenu] = useState(false);
	const [isStartGame, setIsStartGame] = useState(false);
	const [loot, setLoot] = useState({});

	const dispatch = useDispatch();
	const playerData = useSelector(state => state.player.player);

	useEffect(() => {
		setPlayer(playerData)
	}, [playerData])

	const startGame = () => {
		setIsStartGame(true)
	}

	const getEvent = () => {
		let id = Game.getEvent(currentEvent)
		setCurrentEvent(id);

		// let id  = 1
		if (id === 0) {
			getBattleData()
		} else if (id === 1) {
			getLootData()
		} else if (id === 2) {
			getShopData()
		}
	}

	// battle screen
	const getBattleData = () => {
		const getEnemy = Object.assign({}, Game.getEnemy(currentEnemy))

		setCurrentEnemy(getEnemy.key);
		setEnemy(prevState => ({ ...prevState, ...getEnemy }))
		onShowFightScreen()
	}

	const onShowWelcomeScreen = () => {
		setShowWelcomeScreen(true);
		setShowCreateCharacterScreen(false);
	}

	const onShowFightScreen = () => {
		setShowWelcomeScreen(false);
		setShowFightScreen(true);
		setShowLootScreen(false);
	}

	// loot screen
	const onShowLootScreen = () => {
		setShowFightScreen(false);
		setShowWelcomeScreen(false);
		setShowLootScreen(true);
	}

	const getLootData = () => {
		const lootItem = Game.getLootItem()
		setLoot(lootItem);
		// setState({
		// 	loot: lootItem
		// })
		onShowLootScreen()
	}

	const takeItem = (item) => {
		const _takeItems = Game.takeItem(item, player.items);

		if (_takeItems.duplicate) {
			alert(_takeItems.message)
		} else {
			const bonusStats = Game.getBonusStats(_takeItems.newInventory);
			dispatch(updateInventory([..._takeItems.newInventory]));
			dispatch(updateBonusStats(bonusStats));
			console.log(_takeItems.message);
		}
		// if (player.items.length < 6) {
		// 	let checkDuplicate = false
		// 	player.items.forEach((pItem) => {
		// 		if (pItem.key === item.key) {
		// 			checkDuplicate = true
		// 			console.log('You \'ve already had this item')
		// 		}
		// 	})
		// 	if (!checkDuplicate) {
		// 		const inventory = [...player.items, item];

		// 		// player.bonusStats = { ...Game.getBonusStats(player.items) }
		// 	}

		// } else if (player.items.length > 6) {
		// 	console.log('Please remove 1 of your items')
		// }

		getEvent()
	}

	const leaveItem = () => {
		console.log('leave item')
		getEvent()
	}

	// shop screen
	const showShopScreen = () => {

	}

	const getShopData = () => {
		console.log('get shop');
	}

	const handleKeypress = (e) => {
		const key = e.keyCode
		switch (key) {
			case 27:
				setShowIngameMenu(!showIngameMenu);
				break;

			default:
				break;
		}
	}



	return (
		<div className="App" onKeyDown={handleKeypress} tabIndex="0" >
			{
				showIngameMenu &&
				<IngameMenu closeMenu={handleKeypress} />
			}
			<AnimatePresence>
				{
					!isStartGame &&
					<motion.div className="first_screen"
						initial={{ opacity: 1 }}
						transition={{ duration: 1 }}
						exit={{ opacity: 0 }}>
						<img className="bg_image" src={openningBackGround} alt="" />
						<button className="btn_start btn" onClick={startGame}>Start!</button>
					</motion.div>
				}

			</AnimatePresence>
			{
				isStartGame &&
				<div className="game_screen" style={{ backgroundImage: `url(${DarkBG})` }} >
					<aside className="side-bar character-detail__sidebar">
						{
							player.name !== '' &&
							<CharacterStats player={player} />
						}
					</aside>
					<main className="main-screen">
						{
							showCreateCharacterScreen &&
							<CreateCharacter startGame={onShowWelcomeScreen} />
						}
						{
							showWelcomeScreen &&
							<AnimatePresence>
								<motion.div className="container"
									initial={{ opacity: 0 }}
									transition={{ duration: 1 }}
									animate={{ opacity: 1 }}>
									<WelcomeScreen toFightScreen={getEvent} />
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
										comData={enemy}
										comKey={enemy.key}
										getEvent={getEvent} />
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
									<LootScreen item={loot} takeItem={takeItem} leaveItem={leaveItem} />
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

export default App;
