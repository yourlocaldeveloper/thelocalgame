import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import styles from './PlayerCard.module.scss';

import As from '../../../../public/images/cards/As.png';
import cardBack from '../../../../public/images/cards/back.png';
import background from '../../../../public/images/poker-background.png';
import { SocketContext } from '../../../../providers/SocketContex';
import { getCardFromUID } from './PlayerCard.helpers';

interface PlayerCardProps {
  name: string;
  stack: string;
  identifier: string;
  order: number;
  isOriginallyActive?: boolean;
}

interface IPlayerData {
  stack: string;
  action?: string;
  bet?: string;
  isActive: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = (props) => {
  const { name, stack, identifier, order, isOriginallyActive } = props;

  const [isActivePlayer, setIsActivePlayer] = useState(isOriginallyActive);
  const [playerAction, setPlayerAction] = useState('');
  const [playerStack, setPlayerStack] = useState(stack);
  const [playerCards, setPlayerCards] = useState([]);
  const [hasFolded, setHasFolded] = useState(false);

  const playerCardRef = useRef(null);
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  useEffect(() => {
    console.log(isOriginallyActive);
  }, [isOriginallyActive]);

  const handlePlayerHandStore = useCallback(
    (uid: string, socketRef: string) => {
      const card = getCardFromUID(uid);
      let playerHand: string[] = playerCards;

      if (playerCards.length === 2) {
        socket?.off(socketRef);
        console.log('HAND STORE CARD DISABLE');
        return;
      }

      playerHand.push(card);

      setPlayerCards([...playerHand]);
    },
    [playerCards]
  );

  useEffect(() => {
    socket.on(identifier, (data) => {
      const playerData: IPlayerData = JSON.parse(data);

      console.log('RECIEVED DATA:', playerData);

      setIsActivePlayer(playerData.isActive);

      setPlayerStack(playerData.stack);

      if (!playerData.action) {
        setPlayerAction('');

        return;
      }

      if (playerData.action === 'fold') {
        setPlayerAction(playerData.action.toUpperCase());
        setTimeout(() => {
          setHasFolded(true);
        }, 2000);
      } else if (playerData.action === 'check') {
        setPlayerAction(playerData.action.toUpperCase());
      } else {
        setPlayerAction(
          `${playerData.action} £${Number(playerData.bet).toFixed(
            2
          )}`.toUpperCase()
        );
      }
    });

    socket.on(`${identifier}-cards`, (data) => {
      // const playerCardData = JSON.parse(data);

      console.log('RECIEVED CARDS:', data.uid);
      handlePlayerHandStore(data?.uid, `${identifier}-cards`);
    });

    return () => {
      socket.off(identifier);
    };
  }, [socket]);

  return (
    <CSSTransition
      classNames={styles.animatePlayerCard}
      nodeRef={playerCardRef}
      timeout={2000}
      in={true}
    >
      <div
        ref={playerCardRef}
        className={cn(styles.playerCard, { [styles.hide]: hasFolded })}
        style={{ order: order }}
      >
        <div className={styles.topRow}>
          <div className={styles.cardsTest}>
            {playerCards.length === 2 ? playerCards[0] : ''}
          </div>
          <div className={styles.cardsTest}>
            {playerCards.length === 2 ? playerCards[1] : ''}
          </div>
          <div className={styles.topRowInfo}>
            <div className={styles.position}>{/* Position Place Holder */}</div>
            <div className={styles.equity}>17%</div>
          </div>
        </div>
        <div
          className={cn(styles.middleRow, {
            [styles.activePlayer]: isActivePlayer,
          })}
        >
          <div className={styles.name}>{name.toUpperCase()}</div>
          <div className={styles.stack}>{playerStack}</div>
        </div>
        <div className={styles.bottomRow}>
          {isActivePlayer && <div className={styles.dotFalling}></div>}
          {!isActivePlayer && <div>{playerAction}</div>}
        </div>
      </div>
    </CSSTransition>
  );
};
