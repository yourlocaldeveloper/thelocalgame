import React, { useState } from 'react';

import styles from './TopRow.module.scss';
import { FuncButton, FuncButtonSize } from '../FuncButton';
import {
  faCircleXmark,
  faSimCard,
  faVideo,
  faMicrophone,
  faMicrophoneSlash,
  faDisplay,
} from '@fortawesome/free-solid-svg-icons';
import { GameStateEnum } from '../../Main.helpers';

export enum CameraEnum {
  LEFT,
  RIGHT,
  FLOP,
}

interface TopRowProps {
  gameState: GameStateEnum;
  setGameState: (gameState: GameStateEnum) => void;
}

export const TopRow: React.FC<TopRowProps> = (props) => {
  const { setGameState } = props;

  const [camera, setCamera] = useState<CameraEnum>(CameraEnum.LEFT);
  const [muteMicrophone, setMuteMicrophone] = useState(false);

  return (
    <div className={styles.topRow}>
      <FuncButton
        size={FuncButtonSize.Small}
        logo={faVideo}
        text={'Camera 1'}
        disabled={camera === CameraEnum.LEFT}
        onClick={() => setCamera(CameraEnum.LEFT)}
      />
      <FuncButton
        size={FuncButtonSize.Small}
        logo={faVideo}
        text={'Camera 2'}
        disabled={camera === CameraEnum.RIGHT}
        onClick={() => setCamera(CameraEnum.RIGHT)}
      />
      <FuncButton
        size={FuncButtonSize.Small}
        logo={faVideo}
        text={'Camera 3'}
        disabled={camera === CameraEnum.FLOP}
        onClick={() => setCamera(CameraEnum.FLOP)}
      />
      <FuncButton
        size={FuncButtonSize.Small}
        logo={muteMicrophone ? faMicrophoneSlash : faMicrophone}
        onClick={() => setMuteMicrophone(!muteMicrophone)}
      />
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
