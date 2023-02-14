import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/images/logo.png';
import { CardOverlay } from '../CardOverlay';
import { PlayerOverlay } from '../PlayerOverlay';
import { IPlayerData } from '../../pages';

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
        <div className={styles.imageWrapper}>
          <Image
            src={logo}
            alt='The Local Game Logo'
            width={500}
            height={500}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button>Players</button>
          <button>Start New Hand</button>
          <button>Reset Game</button>
          <button onClick={() => setShowCardOverlay(!showCardOverlay)}>
            Register Cards
          </button>
        </div>
      </div>
    </>
  );
};
