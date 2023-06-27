import React, { useState } from 'react';
import './styles.css';

const MinesweeperGrid = ({ grid }) => {
  const [cellStates, setCellStates] = useState(
    Array(grid.length)
      .fill(0)
      .map(() => Array(grid[0].length).fill('-'))
  );
  const [gameStatus, setGameStatus] = useState('playing');

  const handleClick = (rowIndex, columnIndex) => {
    if (gameStatus !== 'playing' || cellStates[rowIndex][columnIndex] === '🚩') return;

    const updatedCellStates = [...cellStates];

    const revealAdjacentCells = (row, col) => {
      if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return;
      }

      if (updatedCellStates[row][col] === '-') {
        updatedCellStates[row][col] = grid[row][col];

        if (grid[row][col] === ' ') {
          revealAdjacentCells(row - 1, col); // Up
          revealAdjacentCells(row + 1, col); // Down
          revealAdjacentCells(row, col - 1); // Left
          revealAdjacentCells(row, col + 1); // Right
        }
      }
    };

    if (grid[rowIndex][columnIndex] === ' ') {
      revealAdjacentCells(rowIndex, columnIndex);
    } else if (grid[rowIndex][columnIndex] === '*') {
      updatedCellStates[rowIndex][columnIndex] = '💣';
      setGameStatus('lost');
    } else {
      updatedCellStates[rowIndex][columnIndex] = grid[rowIndex][columnIndex];
    }

    setCellStates(updatedCellStates);
  };

  const handleRightClick = (event, rowIndex, columnIndex) => {
    event.preventDefault();
    if (gameStatus !== 'playing') return;

    const updatedCellStates = [...cellStates];

    if (updatedCellStates[rowIndex][columnIndex] === '-') {
      updatedCellStates[rowIndex][columnIndex] = '🚩';
    } else if (updatedCellStates[rowIndex][columnIndex] === '🚩') {
      updatedCellStates[rowIndex][columnIndex] = '-';
    }

    setCellStates(updatedCellStates);
  };

  const checkWinCondition = () => {
    let allNonMineRevealed = true;

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col] !== '*' && cellStates[row][col] === '-') {
          allNonMineRevealed = false;
          break;
        }
      }
      if (!allNonMineRevealed) break;
    }

    if (allNonMineRevealed) {
      setGameStatus('won');
    }
  };

  return (
    <div className="minesweeper-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="line">
          {row.map((cell, columnIndex) => (
            <button
              key={columnIndex}
              className={`cell ${cellStates[rowIndex][columnIndex] ? 'revealed' : ''}`}
              onClick={() => {
                handleClick(rowIndex, columnIndex);
                checkWinCondition();
              }}
              onContextMenu={(event) => handleRightClick(event, rowIndex, columnIndex)}
            >
              {cellStates[rowIndex][columnIndex]}
            </button>
          ))}
        </div>
      ))}
      {gameStatus === 'lost' && (
        <div>
          <p className="game-status">You lost!</p>
        </div>
      )}
      {gameStatus === 'won' && (
        <div>
          <p className="game-status">You won!</p>
        </div>
      )}
    </div>
  );
};

export default MinesweeperGrid;
