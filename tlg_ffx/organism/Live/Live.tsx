import React, { useContext, useState, useEffect, useCallback } from 'react';

import { SocketContext } from '../../providers/SocketContex';

import styles from './Live.module.scss';
import { PlayerCard } from './components/PlayerCard';
import { ActionType, PlayerType } from './Live.helpers';

export const Live: React.FC = () => {
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const [initialPlayerData, setInitialPlayerData] = useState<PlayerType[]>([]);

  const [playerCards, setPlayerCards] = useState<PlayerType[]>([]);
  const [effectiveAction, setEffectiveAction] = useState<ActionType>();

  const displayPlayerCards = () => {
    return playerCards.map((player) => (
      <PlayerCard
        name={player.name}
        identifier={String(player.seat)}
        stack={player.stack}
        order={player.seat}
        isOriginallyActive={player.isOriginallyActive}
      />
    ));
  };

  const handleDisplayPlayer = useCallback(
    (player: PlayerType) => {
      if (playerCards.includes(player)) {
        return;
      }

      setPlayerCards([...playerCards, player]);
    },
    [playerCards, setPlayerCards]
  );

  useEffect(() => {
    socket.on('initialPlayerData', (data) => {
      const convertedData = JSON.parse(data);
      setInitialPlayerData(convertedData);
    });

    socket.on('submitEffectiveAction', (data) => {
      const effectiveAction: ActionType = JSON.parse(data);

      setEffectiveAction(effectiveAction);
    });

    socket.on('displayPlayer', (data) => {
      const newPlayerData: PlayerType = JSON.parse(data);

      console.log('DISPLAY PLAYER:', newPlayerData);

      handleDisplayPlayer(newPlayerData);
    });

    socket.on('resetLivestream', (data) => {
      setPlayerCards([]);
      setInitialPlayerData([]);
    });

    return () => {
      socket.off('initialPlayerData');
      socket.off('submitEffectiveAction');
      socket.off('displayPlayer');
      socket.off('resetLivestream');
    };
  }, [socket, playerCards]);

  useEffect(() => {
    console.log('initialPlayerData:', initialPlayerData);
  }, [initialPlayerData]);

  return (
    <div className={styles.main}>
      <div className={styles.playerCardHolder}>{displayPlayerCards()}</div>
    </div>
  );
};
