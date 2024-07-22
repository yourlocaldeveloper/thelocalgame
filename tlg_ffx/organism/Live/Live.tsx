import React, { useContext, useState, useEffect, useCallback } from 'react';

import { SocketContext } from '../../providers/SocketContex';

import styles from './Live.module.scss';
import { PlayerCard } from './components/PlayerCard';
import {
  ActionType,
  CardStoreType,
  HandActionEnum,
  HandPlayerType,
  PlayerType,
  getOrderedCards,
  getPlayerPositionName,
  getPlayerPositionValue,
} from './Live.helpers';
import { getCardFromUID } from './components/PlayerCard/PlayerCard.helpers';
import { HandInfo } from './components/HandInfo';

export const Live: React.FC = () => {
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const [initialPlayerData, setInitialPlayerData] = useState<PlayerType[]>([]);
  const [preflopOrder, setPreflopOrder] = useState<HandPlayerType[]>([]);
  const [communityCards, setCommunityCards] = useState<string[]>([]);
  const [currentStreet, setCurrentSteet] = useState('');
  const [currentPot, setCurrentPot] = useState('');

  const [playerCards, setPlayerCards] = useState<PlayerType[]>([]);
  const [playerHandStore, setPlayerHandStore] = useState<CardStoreType[]>([]);
  const [effectiveAction, setEffectiveAction] = useState<ActionType>();

  const displayPlayerCards = () => {
    return playerCards.map((player) => (
      <PlayerCard
        name={player.name}
        identifier={String(player.seat)}
        effectiveAction={effectiveAction}
        stack={player.stack}
        order={getPlayerPositionValue(preflopOrder, player.seat)}
        isOriginallyActive={player.isOriginallyActive}
        hand={playerHandStore.find(
          (playerHand) => playerHand.seat === player.seat
        )}
        position={getPlayerPositionName(preflopOrder, player.seat)}
        street={currentStreet}
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

  const handleCommunityCardStore = useCallback(
    (uid: string, socketRef: string) => {
      console.log('test');
      console.log('Current Street In Card Store', currentStreet);
      if (currentStreet) {
        const getLimit = () => {
          switch (currentStreet) {
            case 'preflop':
              return 0;
            case 'flop':
              return 3;
            case 'turn':
              return 4;
            case 'river':
              return 5;
            case 'allin':
              return 5;
            default:
              return 0;
          }
        };

        const limit = getLimit();

        const selectedCard = getCardFromUID(uid);

        const communityStore = [...communityCards];
        const doesCardExist = communityStore.find(
          (card) => card === selectedCard
        );

        console.log('CC Length', communityCards.length);
        console.log('Limit', limit);

        if (communityCards.length !== limit) {
          if (!!doesCardExist) {
            console.log(
              '[CARD STORE] Community Card Already Exists:',
              selectedCard
            );

            return;
          }
          const card = getCardFromUID(uid);

          setCommunityCards((currentCommunityCardStore) => [
            ...currentCommunityCardStore,
            card,
          ]);

          console.log('[CARD STORE] Adding Community Card:', card);
        } else {
          console.log('[CARD STORE] Community Card Limit Reached');
          socket?.off(socketRef);
        }
      }
    },
    [communityCards, currentStreet]
  );

  const handleStreetStore = (street: string) => {
    console.log('STREET:', street);
    setCurrentSteet(street);
  };

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
      console.log('[INFO] New Effective Action', effectiveAction);

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

    socket?.on('currentStreet', (data) => {
      const street = JSON.parse(data);
      setEffectiveAction({
        seat: 0,
        type: HandActionEnum.NON,
      });
      handleStreetStore(street);
    });

    socket.on('resetLivestream', (data) => {
      setCommunityCards([]);
      setCurrentSteet('');
      setPlayerCards([]);
      setPlayerHandStore([]);
      setInitialPlayerData([]);
      setEffectiveAction({
        seat: 0,
        type: HandActionEnum.NON,
      });
    });

    return () => {
      socket.off('initialPlayerData');
      socket.off('preflopOrder');
      socket.off('submitEffectiveAction');
      socket.off('displayPlayer');
      socket.off('resetLivestream');
      socket.off('seatOne');
      socket.off('seatTwo');
      socket.off('seatThree');
      socket.off('seatFour');
      socket.off('currentStreet');
    };
  }, [
    socket,
    playerCards,
    playerHandStore,
    effectiveAction,
    currentStreet,
    setEffectiveAction,
  ]);

  useEffect(() => {
    socket?.on('communityCards', (rfid) =>
      handleCommunityCardStore(rfid.uid, 'communityCards')
    );

    return () => {
      socket?.off('communityCards');
    };
  }, [communityCards, currentStreet]);

  useEffect(() => {
    socket?.on('pot', (data) => {
      const pot = JSON.parse(data);

      console.log('Pot', pot);

      setCurrentPot(pot);
    });

    return () => {
      socket?.off('pot');
    };
  }, [currentPot]);

  useEffect(() => {
    console.log('initialPlayerData:', initialPlayerData);
  }, [initialPlayerData]);

  return (
    <div className={styles.main}>
      <div className={styles.playerCardHolder}>{displayPlayerCards()}</div>
      {currentStreet && (
        <HandInfo
          communityCards={communityCards}
          pot={`£${currentPot}`}
          title='THE LOCAL GAME LIVE'
        />
      )}
    </div>
  );
};
