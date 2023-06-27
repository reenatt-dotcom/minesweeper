import React, { useState } from 'react';
import MinesweeperGrid from './MinesweeperGrid';

const App = () => {
  const initialGrid = [
    ['1', '1', '-', '-', '-', '1', '1', '1', '-', '-'],
    ['*', '2', '1', '1', '1', '2', '*', '1', '1', '1'],
    ['1', '2', '*', '1', '1', '*', '3', '2', '2', '*'],
    ['1', '3', '4', '4', '3', '3', '3', '*', '2', '1'],
    ['1', '*', '*', '*', '*', '3', '*', '2', '1', '-'],
    ['1', '3', '4', '4', '3', '*', '3', '2', '1', '1'],
    ['1', '2', '*', '1', '2', '*', '2', '1', '*', '1'],
    ['*', '3', '2', '1', '2', '2', '2', '1', '2', '2'],
    ['2', '*', '1', '-', '1', '*', '2', '1', '1', '*'],
    ['1', '1', '1', '-', '1', '2', '*', '1', '1', '1']
  ];

  const [grid, setGrid] = useState(initialGrid);

  const resetGame = () => {
    setGrid(initialGrid);
  };

  return (
    <div className="app">
      <h1>Minesweeper Grid</h1>
      <MinesweeperGrid grid={grid} />
      <span>Open a tile: left-click on a tile</span>
      <br></br>

<span>Flag a tile: right-click on a tile</span>
    </div>
  );
};

export default App;
