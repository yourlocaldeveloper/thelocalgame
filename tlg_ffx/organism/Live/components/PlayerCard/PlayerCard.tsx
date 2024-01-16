import React, { useContext, useEffect, useRef } from 'react';
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
}

export const PlayerCard: React.FC<PlayerCardProps> = (props) => {
  const { name, stack, identifier, order } = props;

  const playerCardRef = useRef(null);
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  useEffect(() => {
    socket.on(identifier, (data) => {
      console.log(data);
    });
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
        className={styles.playerCard}
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
        <div className={styles.middleRow}>
          <div className={styles.name}>{name.toUpperCase()}</div>
          <div className={styles.stack}>{stack}</div>
        </div>
        <div className={styles.bottomRow}>{/* Action Place Holder */}</div>
      </div>
    </CSSTransition>
  );
};
