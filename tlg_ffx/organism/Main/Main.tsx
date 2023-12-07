import React, { useState } from 'react';
import { CardOverlay } from '../CardOverlay';

import { TopRow } from './components/TopRow';
import { InfoRow } from './components/InfoRow';
import { CardPlayerRow } from './components/CardPlayerRow';
import { CommunityRow } from './components/CommunityRow';
import { SettingsRow } from './components/SettingsRow';
import { GameStateEnum, IPlayerData } from './Main.helpers';
import styles from './Main.module.scss';

interface MainProps {}

export const Main: React.FC<MainProps> = (props) => {
  const [showCardOverlay, setShowCardOverlay] = useState(false);
  const [showPlayerOverlay, setShowPlayerOverlay] = useState(false);
  const [playerData, setPlayerData] = useState<IPlayerData>({
    player1: null,
    player2: null,
    player3: null,
    player4: null,
    player5: null,
    player6: null,
    player7: null,
    player8: null,
    player9: null,
  });

  const [gameState, setGameState] = useState<GameStateEnum>(GameStateEnum.HOME);

  return (
    <>
      {showCardOverlay && (
        <CardOverlay setShowCardOverlay={setShowCardOverlay} />
      )}
      <div className={styles.main}>
        <TopRow gameState={gameState} setGameState={setGameState} />
        <InfoRow gameState={gameState} setGameState={setGameState} />
        <CardPlayerRow
          gameState={gameState}
          playerData={playerData}
          setPlayerData={setPlayerData}
        />
        <CommunityRow gameState={gameState} />
        <SettingsRow gameState={gameState} setGameState={setGameState} />
      </div>
    </>
  );
};
