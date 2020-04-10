import React, { Component } from 'react';
import CreateCharacter from './components/CreateCharacter'
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      showWelcomeScreen: false,
      showCreateCharacterScreen: true
    }
  }

  createCharacter = (character) => {
    console.log(character)
    this.setState({
      showWelcomeScreen: true,
      showCreateCharacterScreen: false
    })
  }

  render () {
    const { showWelcomeScreen, showCreateCharacterScreen } = this.state
    return (
      <div className="App">
        {
          showCreateCharacterScreen &&
          <CreateCharacter createCharacter={(character) => this.createCharacter(character)} />
        }
        {
          showWelcomeScreen &&
          <div>Welcome screen</div>
        }
      </div>
    );
  }
  
}

export default App;
