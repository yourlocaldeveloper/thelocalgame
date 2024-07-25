import React, { useContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Image from 'next/image';
import cn from 'classnames';

import allIn from '../../../../public/images/allin.png';
import cardBack from '../../../../public/images/cards/noCard.png';
import { SocketContext } from '../../../../providers/SocketContex';
import {
  ActionType,
  CardStoreType,
  HandActionEnum,
  EquityStoreType,
} from '../../Live.helpers';
import * as Images from './PlayerCard.images';
import {
  getBetWording,
  getWordingForEffectiveAction,
} from './PlayerCard.helpers';

import styles from './PlayerCard.module.scss';

interface PlayerCardProps {
  name: string;
  stack: string;
  effectiveAction: ActionType;
  identifier: string;
  order: number;
  isOriginallyActive?: boolean;
  position: string;
  street: string;
  handleRemoveFoldedCards: (seat: number) => void;
  seat: number;
  getEquitites: () => Promise<void>;
  hand?: CardStoreType;
  equity?: EquityStoreType;
}

interface IPlayerData {
  stack: string;
  action?: string;
  bet?: string;
  isActive: boolean;
  raiseCount: number;
}

export const PlayerCard: React.FC<PlayerCardProps> = (props) => {
  const {
    name,
    stack,
    effectiveAction,
    identifier,
    order,
    isOriginallyActive,
    position,
    street,
    handleRemoveFoldedCards,
    seat,
    getEquitites,
    hand,
    equity,
  } = props;

  const [isActivePlayer, setIsActivePlayer] = useState(isOriginallyActive);
  const [playerAction, setPlayerAction] = useState('');
  const [playerStack, setPlayerStack] = useState(stack);
  const [playerCards, setPlayerCards] = useState([]);
  const [hasFolded, setHasFolded] = useState(false);
  const [actionWording, setActionWording] = useState('');
  const [playerCommited, setPlayerCommited] = useState('');
  const [showPlayerCard, setShowPlayerCard] = useState(false);
  const [showActionText, setShowActionText] = useState(false);
  const [equityPercentage, setEquityPercentage] = useState('');

  const playerCardRef = useRef(null);
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;

  const CHIP_CURRENCY = '£';

  useEffect(() => {
    setShowActionText(false);
    setTimeout(() => {
      setShowPlayerCard(true);
    }, 500);
    console.log('[EQ] Called By useEffect on Player Card');
    getEquitites();
  }, []);

  useEffect(() => {
    console.log(isOriginallyActive);
  }, [isOriginallyActive]);

  useEffect(() => {
    socket.on(identifier, (data) => {
      console.log('PLAYER CARD CALLED', identifier);

      const playerData: IPlayerData = JSON.parse(data);

      const { isActive, stack, action, raiseCount, bet } = playerData;

      console.log('RECIEVED DATA:', playerData);

      setIsActivePlayer(isActive);

      setPlayerStack(stack);

      if (!action) {
        setPlayerAction('');

        return;
      }

      setPlayerCommited(playerData.bet);

      let betWording = action;

      if (action === 'bet') {
        betWording = getBetWording(raiseCount, street);
      }

      if (action === 'allin') {
        betWording = 'banter jam';
      }

      if (action === 'fold') {
        setPlayerAction(action.toUpperCase());
        socket.off(identifier);
        setShowPlayerCard(false);
        handleRemoveFoldedCards(seat);
        setTimeout(() => {
          setHasFolded(true);
        }, 400);
      } else if (action === 'check') {
        setPlayerAction(action.toUpperCase());
      } else {
        setPlayerAction(
          `${betWording} £${Number(bet).toFixed(2)}`.toUpperCase()
        );
      }
    });

    // UNRELATED BUT NOTING HERE.
    // To figure out straddles we just add a Straddle action option pre flop. Then we can modify code for it to be a non closing effective action

    return () => {
      socket.off(identifier);
    };
  }, [socket, street, handleRemoveFoldedCards]);

  useEffect(() => {
    console.log(`playerCard for seat ${seat}`, hand);
    if (hand) {
      setPlayerCards(hand.cards);
    }
  }, [hand, playerCards, setPlayerCards]);

  useEffect(() => {
    console.log('WORDING CALL');
    console.log('effectiveAction', effectiveAction);
    const wording = getWordingForEffectiveAction(
      effectiveAction,
      playerCommited
    );

    setActionWording(wording);
  }, [effectiveAction, playerCommited]);

  useEffect(() => {
    console.log('effectiveAction', effectiveAction);
  }, [effectiveAction]);

  useEffect(() => {
    // We reset the players commited money each street
    setPlayerCommited('');
  }, [street]);

  useEffect(() => {
    if (!equity) {
      return;
    }

    const newEquityPercentage = equity.equity;

    setTimeout(() => setEquityPercentage(newEquityPercentage), 500);
  }, [equity]);

  return (
    <CSSTransition
      classNames={{
        enterActive: styles.animatePlayerCardEnterActive,
        enterDone: styles.animatePlayerCardEnterDone,
        exitActive: styles.animatePlayerCardExitActive,
        exitDone: styles.animatePlayerCardExitDone,
      }}
      timeout={300}
      mountOnEnter={true}
      in={showPlayerCard}
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
            <div className={styles.equity}>{equity && equityPercentage}</div>
          </div>
        </div>
        <div
          className={cn(styles.middleRow, {
            [styles.activePlayer]: isActivePlayer,
          })}
        >
          <div className={styles.name}>{name.toUpperCase()}</div>
          <div className={styles.stack}>
            {playerStack === '0.00' && (
              <Image src={allIn} alt='All In' width={35} />
            )}
            {playerStack !== '0.00' && `${CHIP_CURRENCY}${playerStack}`}
          </div>
        </div>
        <div className={styles.bottomRow}>
          {isActivePlayer && effectiveAction.type === HandActionEnum.NON && (
            <div className={styles.dotFalling}></div>
          )}
          {isActivePlayer && effectiveAction.type !== HandActionEnum.NON && (
            <div className={styles.actionText}>{actionWording}</div>
          )}
          {!isActivePlayer && (
            <div className={styles.actionText}>{playerAction}</div>
          )}
        </div>
      </div>
    </CSSTransition>
  );
};
