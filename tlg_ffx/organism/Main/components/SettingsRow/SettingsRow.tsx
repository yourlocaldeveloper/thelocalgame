import React, { useState } from 'react';

import styles from './SettingsRow.module.scss';
import { FuncButton, FuncButtonSize, FuncButtonColor } from '../FuncButton';

interface SettingsRowProps {}

export const SettingsRow: React.FC<SettingsRowProps> = (props) => {
  const {} = props;

  const [showStartGame, setShowStartGame] = useState(false);

  return (
    <>
      {showStartGame && (
        <div className={styles.settingsRow}>
          <FuncButton size={FuncButtonSize.Large} text={'Start Game'} />
        </div>
      )}
      {!showStartGame && (
        <>
          <div className={styles.settingsNamesRow}>
            <FuncButton
              size={FuncButtonSize.Medium}
              color={FuncButtonColor.Black}
              text={'Dealer Position'}
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
    </>
  );
};
