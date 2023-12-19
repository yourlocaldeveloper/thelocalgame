import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import styles from './PlayerCard.module.scss';

import As from '../../../../public/images/cards/As.png';
import cardBack from '../../../../public/images/cards/back.png';
import background from '../../../../public/images/poker-background.png';

interface PlayerCardProps {
  name: string;
  stack: string;
  position: string;
  action?: string;
  cardOne?: string;
  cardTwo?: string;
  logo?: string;
  active?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = (props) => {
  const { name, stack, position, logo, action, active, cardOne, cardTwo } =
    props;

  const playerCardRef = useRef(null);

  return (
    <CSSTransition
      classNames={styles.animatePlayerCard}
      nodeRef={playerCardRef}
      timeout={2000}
      in={true}
    >
      <div ref={playerCardRef} className={styles.playerCard}>
        <div className={styles.topRow}>
          <img className={styles.cardOne} src={As.src} />
          <img className={styles.cardTwo} src={As.src} />
          <div className={styles.topRowInfo}>
            <div className={styles.position}>{position.toUpperCase()}</div>
            <div className={styles.equity}>17%</div>
          </div>
        </div>
        <div className={styles.middleRow}>
          <div className={styles.name}>{name.toUpperCase()}</div>
          <div className={styles.stack}>{stack}</div>
        </div>
        <div className={styles.bottomRow}>{action}</div>
      </div>
    </CSSTransition>
  );
};
