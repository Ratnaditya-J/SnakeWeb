import React from 'react';
import styled from 'styled-components';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import useGameLogic from './hooks/useGameLogic';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 800px;
  margin: 32px auto;
  padding: 32px;
  background: #FFFFFF;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #202124;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  margin: 0;
  letter-spacing: -0.5px;
`;

const Controls = styled.div`
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: #5f6368;
  background: #F8F9FA;
  padding: 16px 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  background: ${props => props.gameOver ? '#1a73e8' : '#EA4335'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${props => props.gameOver ? '#1557b0' : '#d93025'};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

const ControlKey = styled.span`
  background: #E8EAED;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Roboto Mono', monospace;
  margin: 0 4px;
`;

const ControlText = styled.p`
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Stats = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const StatItem = styled.div`
  background: #F8F9FA;
  padding: 12px 24px;
  border-radius: 12px;
  text-align: center;

  h3 {
    margin: 0;
    color: #5f6368;
    font-size: 14px;
    font-weight: 500;
  }

  p {
    margin: 4px 0 0;
    color: #202124;
    font-size: 24px;
    font-weight: 500;
  }
`;

function App() {
  const {
    snake,
    food,
    score,
    gameOver,
    direction,
    isPlaying,
    startGame,
    handleKeyPress,
    snakeColor,
    speed,
    nextFoodColor,
    isRainbowFood
  } = useGameLogic();

  return (
    <GameContainer className="game-container">
      <Title>Snake Game</Title>
      
      <Stats>
        <StatItem>
          <h3>SCORE</h3>
          <p>{score}</p>
        </StatItem>
        <StatItem>
          <h3>SPEED</h3>
          <p>{Math.round((1000 / speed) * 10) / 10}x</p>
        </StatItem>
      </Stats>

      <GameBoard
        snake={snake}
        food={food}
        gameOver={gameOver}
        handleKeyPress={handleKeyPress}
        snakeColor={snakeColor}
        nextFoodColor={nextFoodColor}
        isRainbowFood={isRainbowFood}
      />

      <Button 
        onClick={startGame} 
        gameOver={gameOver}
      >
        {isPlaying ? 'Restart Game' : 'Start Game'}
      </Button>

      <Controls>
        <ControlText>
          Move with <ControlKey>←</ControlKey> <ControlKey>↑</ControlKey> <ControlKey>↓</ControlKey> <ControlKey>→</ControlKey>
        </ControlText>
        <ControlText>
          Pause with <ControlKey>space</ControlKey>
        </ControlText>
        <ControlText style={{ fontSize: '12px', color: '#5f6368' }}>
          Look for rainbow food for special effects! (Worth 5 points)
        </ControlText>
      </Controls>
    </GameContainer>
  );
}

export default App; 