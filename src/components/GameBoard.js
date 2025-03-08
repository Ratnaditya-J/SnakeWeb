import React, { useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const rainbowAnimation = keyframes`
  0% { background-color: #FF0000; }
  17% { background-color: #FF7F00; }
  33% { background-color: #FFFF00; }
  50% { background-color: #00FF00; }
  67% { background-color: #0000FF; }
  83% { background-color: #4B0082; }
  100% { background-color: #8F00FF; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(0.85); }
  50% { transform: scale(0.95); }
  100% { transform: scale(0.85); }
`;

const BoardContainer = styled.div`
  padding: 24px;
  background: #F8F9FA;
  border-radius: 24px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 20px);
  grid-template-rows: repeat(20, 20px);
  gap: 1px;
  background-color: #E8EAED;
  border-radius: 12px;
  padding: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Cell = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => 
    props.isSnake ? props.snakeColor : 
    props.isFood ? (props.isRainbowFood ? '#FF0000' : props.nextFoodColor) : 
    '#FFFFFF'
  };
  border-radius: ${props => {
    if (props.isFood) return '50%';
    if (props.isSnake) {
      return '4px';
    }
    return '2px';
  }};
  transition: all 0.2s ease;
  box-shadow: ${props => 
    props.isSnake ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 
    props.isFood ? `0 2px 4px ${props.isRainbowFood ? 'rgba(255, 0, 0, 0.3)' : props.nextFoodColor + '33'}` : 
    'none'
  };
  ${props => {
    if (props.isFood && props.isRainbowFood) {
      return css`
        animation: ${rainbowAnimation} 2s linear infinite,
                  ${pulseAnimation} 1s ease-in-out infinite;
      `;
    }
    if (props.isFood) {
      return css`
        animation: ${pulseAnimation} 1s ease-in-out infinite;
      `;
    }
    return '';
  }}
`;

const GameBoard = ({ snake, food, gameOver, handleKeyPress, snakeColor, nextFoodColor, isRainbowFood }) => {
  const boardRef = useRef(null);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 20; col++) {
        const isSnake = snake.some(segment => segment.x === col && segment.y === row);
        const isFood = food.x === col && food.y === row;
        board.push(
          <Cell
            key={`${row}-${col}`}
            isSnake={isSnake}
            isFood={isFood}
            snakeColor={snakeColor}
            nextFoodColor={nextFoodColor}
            isRainbowFood={isRainbowFood}
          />
        );
      }
    }
    return board;
  };

  return (
    <BoardContainer>
      <Board ref={boardRef}>
        {renderBoard()}
      </Board>
    </BoardContainer>
  );
};

export default GameBoard; 