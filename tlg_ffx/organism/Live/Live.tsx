import React, { useContext, useState, useEffect, useCallback } from 'react';

import { SocketContext } from '../../providers/SocketContex';

import styles from './Live.module.scss';
import { PlayerCard } from './components/PlayerCard';
import {
  ActionType,
  CardStoreType,
  HandPlayerType,
  PlayerType,
  getOrderedCards,
  getPlayerPositionName,
  getPlayerPositionValue,
} from './Live.helpers';
import { getCardFromUID } from './components/PlayerCard/PlayerCard.helpers';

export const Live: React.FC = () => {
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const [initialPlayerData, setInitialPlayerData] = useState<PlayerType[]>([]);
  const [preflopOrder, setPreflopOrder] = useState<HandPlayerType[]>([]);

  const [playerCards, setPlayerCards] = useState<PlayerType[]>([]);
  const [playerHandStore, setPlayerHandStore] = useState<CardStoreType[]>([]);
  const [effectiveAction, setEffectiveAction] = useState<ActionType>();

  const displayPlayerCards = () => {
    return playerCards.map((player) => (
      <PlayerCard
        name={player.name}
        identifier={String(player.seat)}
        stack={player.stack}
        order={getPlayerPositionValue(preflopOrder, player.seat)}
        isOriginallyActive={player.isOriginallyActive}
        hand={playerHandStore.find(
          (playerHand) => playerHand.seat === player.seat
        )}
        position={getPlayerPositionName(preflopOrder, player.seat)}
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

  const handlePlayerHandStore = useCallback(
    (uid: string, seat: number, socketRef: string) => {
      const handStore = [...playerHandStore];
      const card = getCardFromUID(uid);
      const playerHand = handStore.find((player) => player.seat === seat);

      if (playerHand) {
        const playerHandIndex = handStore.findIndex(
          (player) => player.seat === seat
        );

        const playerCards = playerHand.cards;
        const playerSeat = playerHand.seat;

        if (playerCards.length === 2) {
          socket?.off(socketRef);

          return;
        } else {
          if (playerCards.includes(card)) {
            return;
          }

          const newPlayerHand = [...playerCards, card];

          const newPlayerHandOrdered = getOrderedCards(newPlayerHand);

          const playerHand: CardStoreType = {
            cards: newPlayerHandOrdered,
            seat: playerSeat,
          };

          const newAllPlayerHandStore = [...handStore];
          newAllPlayerHandStore[playerHandIndex] = playerHand;

          setPlayerHandStore(newAllPlayerHandStore);

          return;
        }
      } else {
        const newPlayerHand: CardStoreType = {
          cards: [card],
          seat: seat,
        };

        setPlayerHandStore((currentPlayerHandStore) => [
          ...currentPlayerHandStore,
          newPlayerHand,
        ]);
      }
    },
    [playerHandStore]
  );

  useEffect(() => {
    socket.on('initialPlayerData', (data) => {
      const convertedData = JSON.parse(data);
      setInitialPlayerData(convertedData);
    });

    socket.on('preflopOrder', (data) => {
      const newIncomingOrder: HandPlayerType[] = JSON.parse(data);
      console.log('INCOMING', newIncomingOrder);
      setPreflopOrder(newIncomingOrder);
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

    socket?.on('seatOne', (rfid) =>
      handlePlayerHandStore(rfid.uid, 1, 'seatOne')
    );
    socket?.on('seatTwo', (rfid) =>
      handlePlayerHandStore(rfid.uid, 2, 'seatTwo')
    );
    socket?.on('seatThree', (rfid) =>
      handlePlayerHandStore(rfid.uid, 3, 'seatThree')
    );
    socket?.on('seatFour', (rfid) =>
      handlePlayerHandStore(rfid.uid, 4, 'seatFour')
    );

    socket.on('resetLivestream', (data) => {
      setPlayerCards([]);
      setPlayerHandStore([]);
      setInitialPlayerData([]);
    });

    return () => {
      socket.off('initialPlayerData');
      socket.off('preflopOrder');
      socket.off('submitEffectiveAction');
      socket.off('displayPlayer');
      socket.off('resetLivestream');
      socket?.off('seatOne');
      socket?.off('seatTwo');
      socket?.off('seatThree');
      socket?.off('seatFour');
    };
  }, [socket, playerCards, playerHandStore]);

  useEffect(() => {
    console.log('initialPlayerData:', initialPlayerData);
  }, [initialPlayerData]);

  return (
    <div className={styles.main}>
      <div className={styles.playerCardHolder}>{displayPlayerCards()}</div>
    </div>
  );
};
