import React, { useState } from 'react';

import styles from './SettingsRow.module.scss';
import { FuncButton, FuncButtonSize, FuncButtonColor } from '../FuncButton';
import { GameStateEnum } from '../../Main.helpers';

interface SettingsRowProps {
  gameState: GameStateEnum;
  setGameState: (gameState: GameStateEnum) => void;
}

export const SettingsRow: React.FC<SettingsRowProps> = (props) => {
  const { gameState, setGameState } = props;

  const [showStartGame, setShowStartGame] = useState(false);
  const [showPlayerAction, setShowPlayerAction] = useState(false);

  return (
    <>
      {gameState === GameStateEnum.HOME && (
        <div className={styles.settingsRow}>
          <FuncButton size={FuncButtonSize.Large} text={'Start Game'} />
        </div>
      )}
      {gameState === GameStateEnum.SETUP && (
        <>
          <div className={styles.settingsNamesRow}>
            <FuncButton
              size={FuncButtonSize.Medium}
              color={FuncButtonColor.Black}
              text={'Dealer'}
            />
            <FuncButton
              size={FuncButtonSize.Medium}
              color={FuncButtonColor.Black}
              text={'Small Blind'}
            />
            <FuncButton
              size={FuncButtonSize.Medium}
              color={FuncButtonColor.Black}
              text={'Big Blind'}
            />
          </div>
          <div className={styles.settingsRow}>
            <FuncButton size={FuncButtonSize.Small} text={'<'} />
            <FuncButton size={FuncButtonSize.Small} text={'>'} />
            <FuncButton size={FuncButtonSize.Medium} text={'£0.10'} />
            <FuncButton size={FuncButtonSize.Medium} text={'£0.20'} />
            <FuncButton
              size={FuncButtonSize.Medium}
              text={'Start Hand'}
              positionCorner
            />
          </div>
        </>
      )}
      {gameState === GameStateEnum.GAME && (
        <div className={styles.betRow}>
          <FuncButton size={FuncButtonSize.Medium} text={'Fold'} />
          <FuncButton size={FuncButtonSize.Medium} text={'Check'} />
          <FuncButton size={FuncButtonSize.Medium} text={'Bet'} />
          <FuncButton size={FuncButtonSize.Medium} text={'All In'} />
        </div>
      )}
    </>
  );
};
