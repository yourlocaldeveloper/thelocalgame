import React, { useContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Image from 'next/image';
import cn from 'classnames';

import styles from './PlayerCard.module.scss';

import cardBack from '../../../../public/images/cards/noCard.png';
import background from '../../../../public/images/poker-background.png';
import { SocketContext } from '../../../../providers/SocketContex';
import { CardStoreType } from '../../Live.helpers';
import * as Images from './PlayerCard.images';

interface PlayerCardProps {
  name: string;
  stack: string;
  identifier: string;
  order: number;
  isOriginallyActive?: boolean;
  position: string;
  hand?: CardStoreType;
}

interface IPlayerData {
  stack: string;
  action?: string;
  bet?: string;
  isActive: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = (props) => {
  const { name, stack, identifier, order, isOriginallyActive, position, hand } =
    props;

  const [isActivePlayer, setIsActivePlayer] = useState(isOriginallyActive);
  const [playerAction, setPlayerAction] = useState('');
  const [playerStack, setPlayerStack] = useState(stack);
  const [playerCards, setPlayerCards] = useState([]);
  const [hasFolded, setHasFolded] = useState(false);

  const playerCardRef = useRef(null);
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const CHIP_CURRENCY = '£';

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

    // UNRELATED BUT NOTING HERE.
    // To figure out straddles we just add a Straddle action option pre flop. Then we can modify code for it to be a non closing effective action

    return () => {
      socket.off(identifier);
    };
  }, [socket]);

  useEffect(() => {
    if (hand) {
      setPlayerCards(hand.cards);
    }
  }, [hand, playerCards, setPlayerCards]);

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
        <div className={styles.cardRow}>
          <div className={styles.cardImage}>
            {playerCards[0] ? (
              <Image
                src={Images[`image${playerCards[0]}`]}
                alt={playerCards[0]}
              />
            ) : (
              <Image src={cardBack} alt={'Card Missing'} />
            )}
          </div>
          <div className={styles.cardImage}>
            {playerCards[1] ? (
              <Image
                src={Images[`image${playerCards[1]}`]}
                alt={playerCards[1]}
              />
            ) : (
              <Image src={cardBack} alt={'Card Missing'} />
            )}
          </div>
        </div>
        <div className={styles.topRow}>
          <div className={styles.topRowInfo}>
            <div className={styles.position}>{position}</div>
            <div className={styles.equity}>17%</div>
          </div>
        </div>
        <div
          className={cn(styles.middleRow, {
            [styles.activePlayer]: isActivePlayer,
          })}
        >
          <div className={styles.name}>{name.toUpperCase()}</div>
          <div className={styles.stack}>{`${CHIP_CURRENCY}${playerStack}`}</div>
        </div>
        <div className={styles.bottomRow}>
          {isActivePlayer && <div className={styles.dotFalling}></div>}
          {!isActivePlayer && <div>{playerAction}</div>}
        </div>
      </div>
    </CSSTransition>
  );
};
