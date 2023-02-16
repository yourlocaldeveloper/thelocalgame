import React from 'react';

import styles from './Live.module.scss';
import { PlayerCard } from './components/PlayerCard';

export const Live: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.playerCardHolder}>
        <PlayerCard
          name={'Adam Gill'}
          stack={'£100'}
          action={'£100 TO CALL'}
          position={'utg'}
          active
        />
      </div>
    </div>
  );
};
