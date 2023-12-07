import React, { useState } from 'react';

import styles from './CardPlayerRow.module.scss';
import { FuncButton, FuncButtonSize, FuncButtonColor } from '../FuncButton';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { GameStateEnum, IPlayerData, IPlayer } from '../../Main.helpers';
import { PlayerOverlay } from './components/PlayerOverlay';

interface CardPlayerRowProps {
  gameState: GameStateEnum;
  playerData: IPlayerData;
  setPlayerData: (playerData: IPlayerData) => void;
}

export const CardPlayerRow: React.FC<CardPlayerRowProps> = (props) => {
  const { gameState, playerData, setPlayerData } = props;

  const [showPlayerOvlay, setShowPlayerOverlay] = useState(false);
  const [playerSelector, setPlayerSelector] = useState('');

  const {
    player1,
    player2,
    player3,
    player4,
    player5,
    player6,
    player7,
    player8,
    player9,
  } = playerData;

  return (
    <>
      <div className={styles.cardRow}>
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={player1?.cards ? faCheck : faXmark}
          disabled={!player1?.cards}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={player2?.cards ? faCheck : faXmark}
          disabled={!player2?.cards}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={player3?.cards ? faCheck : faXmark}
          disabled={!player3?.cards}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={player4?.cards ? faCheck : faXmark}
          disabled={!player4?.cards}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={player5?.cards ? faCheck : faXmark}
          disabled={!player5?.cards}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={player6?.cards ? faCheck : faXmark}
          disabled={!player6?.cards}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={player7?.cards ? faCheck : faXmark}
          disabled={!player7?.cards}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={player8?.cards ? faCheck : faXmark}
          disabled={!player8?.cards}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={player9?.cards ? faCheck : faXmark}
          disabled={!player9?.cards}
        />
      </div>
      <div className={styles.playerRow}>
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text={player1?.name ? player1.name : 'Seat 1'}
          onClick={() => {
            setPlayerSelector('player1');
            setShowPlayerOverlay(true);
          }}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text={player2?.name ? player2.name : 'Seat 2'}
          onClick={() => {
            setPlayerSelector('player2');
            setShowPlayerOverlay(true);
          }}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text={player3?.name ? player3.name : 'Seat 3'}
          onClick={() => {
            setPlayerSelector('player3');
            setShowPlayerOverlay(true);
          }}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text={player4?.name ? player4.name : 'Seat 4'}
          onClick={() => {
            setPlayerSelector('player4');
            setShowPlayerOverlay(true);
          }}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text={player5?.name ? player5.name : 'Seat 5'}
          onClick={() => {
            setPlayerSelector('player5');
            setShowPlayerOverlay(true);
          }}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text={player6?.name ? player6.name : 'Seat 6'}
          onClick={() => {
            setPlayerSelector('player6');
            setShowPlayerOverlay(true);
          }}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text={player7?.name ? player7.name : 'Seat 7'}
          onClick={() => {
            setPlayerSelector('player7');
            setShowPlayerOverlay(true);
          }}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text={player8?.name ? player8.name : 'Seat 8'}
          onClick={() => {
            setPlayerSelector('player8');
            setShowPlayerOverlay(true);
          }}
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text={player9?.name ? player9.name : 'Seat 9'}
          onClick={() => {
            setPlayerSelector('player9');
            setShowPlayerOverlay(true);
          }}
        />
      </div>
      {showPlayerOvlay && (
        <PlayerOverlay
          playerData={playerData}
          playerSelector={playerSelector}
          setShowPlayerOverlay={setShowPlayerOverlay}
          setPlayerData={setPlayerData}
        />
      )}
    </>
  );
};
