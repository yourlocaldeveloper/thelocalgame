import React from 'react';
import cn from 'classnames';

import styles from './PlayerCard.module.scss';

import As from '../../../../public/images/cards/As.png';
import cardBack from '../../../../public/images/cards/back.png';

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

  return (
    <div className={styles.playerView}>
      <div className={styles.topView}>
        <div className={styles.topLeftView}>
          <div className={styles.playerIcon}></div>
        </div>
        <div className={styles.topRightView}>
          <div className={styles.cards}>
            <img src={cardOne ? cardOne : cardBack.src} />
            <img src={cardTwo ? cardTwo : cardBack.src} />
          </div>
          <div
            className={cn(styles.playerNameView, {
              [styles.playNameViewActive]: active,
            })}
          >
            <div className={styles.playerName}>
              <p>{name}</p>
            </div>
            <div className={styles.position}>
              <p>{position.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomView}>
        <div className={styles.stack}>
          <p>{stack}</p>
        </div>
        <div className={styles.action}>
          <p className={styles.number}>{action}</p>
        </div>
      </div>
    </div>
  );
};
