import React, { useContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import styles from './PlayerCard.module.scss';

import As from '../../../../public/images/cards/As.png';
import cardBack from '../../../../public/images/cards/back.png';
import background from '../../../../public/images/poker-background.png';
import { SocketContext } from '../../../../providers/SocketContex';

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
  const [hasFolded, setHasFolded] = useState(false);

  const playerCardRef = useRef(null);
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  useEffect(() => {
    console.log(isOriginallyActive);
  }, [isOriginallyActive]);

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
      } else {
        setPlayerAction(
          `${playerData.action} £${Number(playerData.bet).toFixed(
            2
          )}`.toUpperCase()
        );
      }
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
          <img className={styles.cardOne} src={As.src} />
          <img className={styles.cardTwo} src={As.src} />
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
