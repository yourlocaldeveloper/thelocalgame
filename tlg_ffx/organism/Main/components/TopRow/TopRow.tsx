import React from 'react';

import styles from './TopRow.module.scss';
import { FuncButton, FuncButtonSize } from '../FuncButton';
import {
  faCircleXmark,
  faSimCard,
  faVideo,
  faMicrophone,
  faDisplay,
} from '@fortawesome/free-solid-svg-icons';

interface TopRowProps {}

export const TopRow: React.FC<TopRowProps> = (props) => {
  const {} = props;

  return (
    <div className={styles.topRow}>
      <FuncButton
        size={FuncButtonSize.Small}
        logo={faVideo}
        text={'Camera 1'}
        disabled
      />
      <FuncButton
        size={FuncButtonSize.Small}
        logo={faVideo}
        text={'Camera 2'}
      />
      <FuncButton
        size={FuncButtonSize.Small}
        logo={faVideo}
        text={'Camera 3'}
      />
      <FuncButton size={FuncButtonSize.Small} logo={faMicrophone} />
      <FuncButton
        size={FuncButtonSize.Small}
        logo={faDisplay}
        text={'Profit'}
        positionEnd
      />
      <FuncButton size={FuncButtonSize.Small} logo={faDisplay} text={'VPIP'} />
      <FuncButton size={FuncButtonSize.Small} logo={faSimCard} />
      <FuncButton size={FuncButtonSize.Small} logo={faCircleXmark} />
    </div>
  );
};
