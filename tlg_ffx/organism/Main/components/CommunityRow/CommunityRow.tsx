import React, { useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './CommunityRow.module.scss';
import { FuncButton, FuncButtonSize, FuncButtonColor } from '../FuncButton';
import { CommunityCards } from './components/CommunityCards';

interface CommunityRowProps {}

export const CommunityRow: React.FC<CommunityRowProps> = (props) => {
  const {} = props;

  const [showCommunityCards, setShowCommunityCards] = useState(false);

  return (
    <>
      {showCommunityCards && (
        <>
          <div className={styles.communityRow}>
            <FuncButton size={FuncButtonSize.Medium} text={'Miss Deal'} />
            <CommunityCards />
            <FuncButton size={FuncButtonSize.Medium} text={'Hide Graphics'} />
          </div>
          <div className={styles.playerInfoRow}>
            <FuncButton
              size={FuncButtonSize.Large}
              color={FuncButtonColor.Black}
              text={'[5] Aaron - Stack £40'}
            />
          </div>
        </>
      )}
      {!showCommunityCards && (
        <>
          <div className={styles.blindsRow}>
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.White}
              text={'BTN'}
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Black}
              text={'SB'}
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Black}
              text={'BB'}
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Green}
              logo={faXmark}
              disabled
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Green}
              logo={faXmark}
              disabled
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Green}
              logo={faXmark}
              disabled
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Green}
              logo={faXmark}
              disabled
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Green}
              logo={faXmark}
              disabled
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Green}
              logo={faXmark}
              disabled
            />
          </div>
          <div className={styles.stackRow}>
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Yellow}
              text={'£40'}
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Yellow}
              text={'£40'}
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Yellow}
              text={'£40'}
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Yellow}
              text={'£40'}
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Yellow}
              text={'£40'}
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Yellow}
              text={'£40'}
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Yellow}
              text={'£40'}
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Yellow}
              text={'£40'}
            />
            <FuncButton
              size={FuncButtonSize.Small}
              color={FuncButtonColor.Yellow}
              text={'£40'}
            />
          </div>
        </>
      )}
    </>
  );
};
