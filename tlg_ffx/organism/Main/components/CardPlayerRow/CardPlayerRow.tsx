import React from 'react';

import styles from './CardPlayerRow.module.scss';
import { FuncButton, FuncButtonSize, FuncButtonColor } from '../FuncButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { GameStateEnum } from '../../Main.helpers';

interface CardPlayerRowProps {
  gameState: GameStateEnum;
}

export const CardPlayerRow: React.FC<CardPlayerRowProps> = (props) => {
  const { gameState } = props;

  return (
    <>
      <div className={styles.cardRow}>
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={faXmark}
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={faXmark}
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={faXmark}
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={faXmark}
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={faXmark}
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={faXmark}
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={faXmark}
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={faXmark}
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          logo={faXmark}
          disabled
        />
      </div>
      <div className={styles.playerRow}>
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text='Aaron'
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text='Aaron'
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text='Aaron'
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text='Aaron'
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text='Aaron'
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text='Aaron'
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text='Aaron'
          disabled
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text='Aaron'
        />
        <FuncButton
          size={FuncButtonSize.Small}
          color={FuncButtonColor.Blue}
          text='Aaron'
          disabled
        />
      </div>
    </>
  );
};
