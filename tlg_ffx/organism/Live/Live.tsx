import React from 'react';

import styles from './Live.module.scss';
import { PlayerCard } from './components/PlayerCard';

export const Live: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.playerCardHolder}>
        <PlayerCard
          name={'MIGLE'}
          stack={'€77+£42'}
          action={'£100 TO CALL'}
          position={'utg'}
          active
        />
        <PlayerCard
          name={'Aaron'}
          stack={'100 x Kissies'}
          action={'£100 TO CALL'}
          position={'utg'}
          active
        />
        <PlayerCard
          name={'Bluse'}
          stack={'100 x Scratches'}
          action={'£100 TO CALL'}
          position={'utg'}
          active
        />
      </div>
    </div>
  );
};
