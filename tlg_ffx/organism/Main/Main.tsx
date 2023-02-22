import React, { useState } from 'react';
import { CardOverlay } from '../CardOverlay';
import { PlayerOverlay } from '../PlayerOverlay';
import { IPlayerData } from '../../pages';

import { TopRow } from './components/TopRow';
import { InfoRow } from './components/InfoRow';
import { CardPlayerRow } from './components/CardPlayerRow';
import { CommunityRow } from './components/CommunityRow';
import { SettingsRow } from './components/SettingsRow';
import { GameStateEnum } from './Main.helpers';
import styles from './Main.module.scss';

interface MainProps {
  playerData: IPlayerData[];
  setPlayerData: React.Dispatch<React.SetStateAction<IPlayerData[]>>;
}

export const Main: React.FC<MainProps> = (props) => {
  const [showCardOverlay, setShowCardOverlay] = useState(false);
  const [showPlayerOverlay, setShowPlayerOverlay] = useState(false);

  const [gameState, setGameState] = useState<GameStateEnum>(GameStateEnum.GAME);

  return (
    <>
      {showCardOverlay && (
        <CardOverlay setShowCardOverlay={setShowCardOverlay} />
      )}
      <PlayerOverlay />
      <div className={styles.main}>
        <TopRow gameState={gameState} setGameState={setGameState} />
        <InfoRow gameState={gameState} setGameState={setGameState} />
        <CardPlayerRow gameState={gameState} />
        <CommunityRow gameState={gameState} />
        <SettingsRow gameState={gameState} setGameState={setGameState} />
      </div>
    </>
  );
};
