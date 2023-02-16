import React, { useState } from 'react';
import { CardOverlay } from '../CardOverlay';
import { PlayerOverlay } from '../PlayerOverlay';
import { IPlayerData } from '../../pages';

import { TopRow } from './components/TopRow';
import styles from './Main.module.scss';

interface MainProps {
  playerData: IPlayerData[];
  setPlayerData: React.Dispatch<React.SetStateAction<IPlayerData[]>>;
}

export const Main: React.FC<MainProps> = (props) => {
  const [showCardOverlay, setShowCardOverlay] = useState(false);
  const [showPlayerOverlay, setShowPlayerOverlay] = useState(false);

  return (
    <>
      {showCardOverlay && (
        <CardOverlay setShowCardOverlay={setShowCardOverlay} />
      )}
      <PlayerOverlay />
      <div className={styles.main}>
        <TopRow />
      </div>
    </>
  );
};
