import { useState } from 'react';
import TicTacToe from './TicTacToe/TicTacToe';
import Snake from './Snake/Snake';
// import Pacman from './Pacman/Pacman';
// import MemoryGame from './MemoryGame/MemoryGame';

const GameContainer = () => {
    const [selectedGame, setSelectedGame] = useState('');

    return (
        <div className="container">
            <h1>Game Collection</h1>
            <div className="btn-group">
                <button onClick={() => setSelectedGame('TicTacToe')} className="btn btn-primary">Tic Tac Toe</button>
                <button onClick={() => setSelectedGame('Snake')} className="btn btn-primary">Snake</button>
                {/*<button onClick={() => setSelectedGame('Pacman')} className="btn btn-primary">Pacman</button>
                <button onClick={() => setSelectedGame('MemoryGame')} className="btn btn-primary">Memory Game</button> */}
            </div>
            <div className="game-area">
                {selectedGame === 'TicTacToe' && <TicTacToe />}
                {selectedGame === 'Snake' && <Snake />}
                {/*{selectedGame === 'Pacman' && <Pacman />}
                {selectedGame === 'MemoryGame' && <MemoryGame />} */}
            </div>
        </div>
    );
};

export default GameContainer;
