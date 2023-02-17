import React from 'react';

import styles from './InfoRow.module.scss';
import { FuncButton, FuncButtonSize, FuncButtonColor } from '../FuncButton';

interface InfoRowProps {}

export const InfoRow: React.FC<InfoRowProps> = (props) => {
  const {} = props;

  return (
    <div className={styles.infoRow}>
      <FuncButton
        size={FuncButtonSize.Large}
        color={FuncButtonColor.Yellow}
        text={'HAND 1'}
      />
      <FuncButton
        size={FuncButtonSize.Large}
        color={FuncButtonColor.Yellow}
        text={'HOLDEM'}
        disabled
        positionEnd
      />
    </div>
  );
};
