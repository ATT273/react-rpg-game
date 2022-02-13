import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import './App.css';
import BattleScreen from './components/battleScreen/BattleScreen';
import CreateCharacter from './components/createCharacter/CreateCharacter';
import LootScreen from './components/lootItemScreen/LootScreen';
import CharacterStats from './components/sidebar/CharacterStats';
import WelcomeScreen from './components/welcomeScreen/WelcomeScreen';
import EndGameScreen from './components/endGameScreen/EndGameScreen';
import IngameMenu from './components/UIComponents/IngameMenu';
import HighScoresScreen from './components/highScoreScreen/HighScoreScreen';
import Game from './game';
import openningBackGround from './images/background/back_ground.jpg';
import DarkBG from './images/background/dark_bg.jpg';
import { enemies, items } from './data'
// import { useSelector, useDispatch } from 'react-redux';
// import { updateStats, updateInventory, updateBonusStats, updatePlayer } from './store/player/playerSlice';
import { useRecoilState } from 'recoil';
import { playerState, updatePlayer, updateBonusStats, updateInventory } from './state/player/playerState';


const feedbackLink = 'https://docs.google.com/forms/d/e/1FAIpQLSc20d_rsBd5TJQDf6V56E7DCdpeX16wJ452LYKZUH1sVw6DaA/viewform';
const PUBLIC_URL = process.env.PUBLIC_URL;
const App = () => {
	const [currentEvent, setCurrentEvent] = useState(null);
	const [currentEnemy, setCurrentEnemy] = useState('');
	const [enemy, setEnemy] = useState({ type: 'com' });
	const [player, setPlayer] = useState({});
	const [loot, setLoot] = useState({});
	const [score, setScore] = useState(0);


	const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
	const [showCreateCharacterScreen, setShowCreateCharacterScreen] = useState(false);
	const [showFightScreen, setShowFightScreen] = useState(false);
	const [showLootScreen, setShowLootScreen] = useState(false);
	const [showIngameMenu, setShowIngameMenu] = useState(false);
	const [showEndGameScreen, setShowEndGameScreen] = useState(false);
	const [showHighScoresScreen, setShowHighScoresScreen] = useState(false);
	const [isStartGame, setIsStartGame] = useState(false);
	const [isContinueGame, setIsContinueGame] = useState(false);
	const [saveGame, setSaveGame] = useState(null);

	// const dispatch = useDispatch();
	// const playerData = useSelector(state => state.player.player);

	const [playerData, setPlayerState] = useRecoilState(playerState);

	useEffect(() => {
		const localSaveGame = localStorage.getItem('saveGame');
		const _score = localStorage.getItem('_score');
		if (localSaveGame) {
			setSaveGame(JSON.parse(localSaveGame));
			setScore(_score ?? 0);
		}
	}, []);

	// useEffect(() => {
	// 	if (playerData.stats.hp > 0) {
	// 		setPlayer(playerData);
	// 	} else {
	// 		setShowEndGameScreen(true);
	// 	}

	// }, [playerData]);
	useEffect(() => {
		if (playerData.stats.hp > 0) {
			setPlayer(playerData);
		} else {
			setShowEndGameScreen(true);
		}
	}, [playerData]);

	useEffect(() => {
		if (isContinueGame) {
			const newPlayerData = updatePlayer(saveGame.player)
			setPlayerState(newPlayerData)
			setEnemy(saveGame.enemy);
			setLoot(saveGame.loot);
			setCurrentEnemy(saveGame.currentEnemy);
			setCurrentEvent(saveGame.currentEvent);

			switch (saveGame.currentEvent) {
				case 0:
					onShowFightScreen();
					break;
				case 1:
					onShowLootScreen();
					break;
				case 2:
					onShowShopScreen();
					break;

				default:
					break;
			}
		}
	}, [isContinueGame]);

	const startGame = () => {
		setIsStartGame(true);
		setShowCreateCharacterScreen(true);
	}

	const savePlayerData = (data) => {
		setPlayer(data)
	}
	const showHighScores = () => {
		setShowHighScoresScreen(true);
		// setShowCreateCharacterScreen(true);
	}

	const continueGame = () => {
		setIsStartGame(true);
		setIsContinueGame(true);
	}

	const handleSaveGame = () => {
		const _saveGame = {
			player,
			enemy,
			currentEvent,
			currentEnemy,
			loot
		};

		localStorage.setItem('saveGame', JSON.stringify(_saveGame));
		alert('Save game complete');

	}
	const getEvent = () => {
		let id = Game.getEvent(currentEvent);
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
		const getEnemy = Object.assign({}, Game.getEnemy(currentEnemy, player.level))

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
		onShowLootScreen()
	}

	const takeItem = (item) => {
		const _takeItems = Game.takeItem(item, player.items);

		if (_takeItems.isMaxQty) {
			alert(_takeItems.message)
		} else {
			const bonusStats = Game.getBonusStats(_takeItems.newInventory);
			// const newInventory = updateInventory([..._takeItems.newInventory]);
			// const newBonusStats = updateBonusStats(bonusStats);
			const _player = {
				...player,
				items: [..._takeItems.newInventory],
				bonusStats
			}
			setPlayerState({ ..._player })
			getEvent();
		}
	}

	const leaveItem = () => {
		console.log('leave item')
		getEvent()
	}

	// shop screen
	const onShowShopScreen = () => {

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

	const updateScore = (_score) => {
		const newScore = score + _score;
		setScore(newScore);
	}

	return (
		<div className="App" id='App' >
			{
				!showEndGameScreen
					? <React.Fragment>
						{
							showIngameMenu &&
							<IngameMenu
								closeMenu={handleKeypress}
								onCloseMenu={() => setShowIngameMenu(false)}
								onSaveGame={handleSaveGame} />
						}
						<AnimatePresence>
							{
								!isStartGame &&
								<React.Fragment>
									{
										!showHighScoresScreen
											? <motion.div className="first_screen"
												initial={{ opacity: 1 }}
												transition={{ duration: 1 }}
												exit={{ opacity: 0 }}>
												<img className="bg_image" src={openningBackGround} alt="" />
												<div className='start-btn-group'>
													{saveGame && <button className="btn_start btn" onClick={continueGame}>Continue</button>}
													<button className="btn_start btn" onClick={startGame}>Start!</button>
													<button className="btn_start btn" onClick={showHighScores}>High scores</button>
													<a href={feedbackLink} target='_blank' className='send-feedback'>Đóng góp ý kiến</a>
												</div>
												<div className='version'>version 0.0.1</div>
											</motion.div>
											: <motion.div className="first_screen"
												initial={{ opacity: 1 }}
												transition={{ duration: 1 }}
												exit={{ opacity: 0 }}>
												{/* <HighScoresScreen /> */}
											</motion.div>
									}
								</React.Fragment>
							}
						</AnimatePresence>
						{
							isStartGame &&
							<div className="game_screen" style={{ backgroundImage: `url(${DarkBG})` }} tabIndex="0" onKeyDown={handleKeypress} >
								{
									currentEvent !== null &&
									<header className='game-header'>
										<span className='header-scores'>Scores: {score}</span>
										<img src={`${PUBLIC_URL}/hamburger_menu.png`} alt='menu' width={30} height={30} onClick={() => setShowIngameMenu(!showIngameMenu)} />
									</header>
								}
								<aside className={`side-bar character-detail__sidebar ${player.name !== '' ? 'show-mb' : 'hide-mb'}`}>
									{/* <CharacterStats /> */}
									{
										player.name !== '' &&
										<CharacterStats />
									}
								</aside>
								<main className="main-screen">
									{
										showCreateCharacterScreen &&
										<CreateCharacter startGame={onShowWelcomeScreen} savePlayerData={savePlayerData} />
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
													getEvent={getEvent}
													updateScore={updateScore} />
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
					</React.Fragment>
					: <EndGameScreen scores={score} playerName={'playerState.name'} />
			}

		</div>
	);
}

export default App;
