import React from 'react';

import styles from './InfoRow.module.scss';
import { FuncButton, FuncButtonSize, FuncButtonColor } from '../FuncButton';
import { GameStateEnum } from '../../Main.helpers';

interface InfoRowProps {
  gameState: GameStateEnum;
  setGameState: (gameState: GameStateEnum) => void;
}

export const InfoRow: React.FC<InfoRowProps> = (props) => {
  const { gameState } = props;

  return (
    <div className={styles.infoRow}>
      {gameState === GameStateEnum.GAME && (
        <FuncButton
          size={FuncButtonSize.Large}
          color={FuncButtonColor.Yellow}
          text={'HAND 1'}
        />
      )}
      <FuncButton
        size={FuncButtonSize.Large}
        color={FuncButtonColor.Yellow}
        text={'HOLDEM'}
        positionEnd
      />
    </div>
  );
};
