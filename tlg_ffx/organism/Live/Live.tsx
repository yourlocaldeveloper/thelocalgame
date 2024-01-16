import React, { useContext, useState, useEffect } from 'react';

import { SocketContext } from '../../providers/SocketContex';

import styles from './Live.module.scss';
import { PlayerCard } from './components/PlayerCard';
import { PlayerType } from './Live.helpers';

export const Live: React.FC = () => {
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const [initialPlayerData, setInitialPlayerData] = useState<PlayerType[]>([]);

  useEffect(() => {
    socket.on('initialPlayerData', (data) => {
      const convertedData = JSON.parse(data);
      setInitialPlayerData(convertedData);
    });

    socket.on('addPlayer', (data) => {
      const addPlayerData: PlayerType = JSON.parse(data);
    });

    return () => {
      socket.off('initialPlayerData');
    };
  }, []);

  useEffect(() => {
    console.log('initialPlayerData:', initialPlayerData);
  }, [initialPlayerData]);

  return (
    <div className={styles.main}>
      <div className={styles.playerCardHolder}>
        <PlayerCard
          name={'MIGLE'}
          identifier={'s1'}
          stack={'€77+£42'}
          order={3}
        />
        <PlayerCard
          name={'Aaron'}
          identifier={'s2'}
          stack={'100 x Kissies'}
          order={2}
        />
        <PlayerCard
          name={'Bluse'}
          identifier={'s3'}
          stack={'100 x Scratches'}
          order={1}
        />
      </div>
    </div>
  );
};
