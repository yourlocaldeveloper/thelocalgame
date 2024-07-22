import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import * as Images from '../PlayerCard/PlayerCard.images';

import styles from './HandInfo.module.scss';

export type HandInfoProps = {
  pot: string;
  title: string;
  communityCards?: string[];
};

const BLINDS_TITLE = 'BLINDS';
const POT_TITLE = 'POT';

export const HandInfo: React.FC<HandInfoProps> = (props) => {
  const { pot, title, communityCards } = props;

  const getCommunityCards = () => {
    return communityCards.map((card) => (
      <Image
        className={styles.card}
        key={card}
        src={Images[`image${card}`]}
        alt={card}
        width={50}
        height={50}
      />
    ));
  };

  return (
    <div className={styles.handInfoContainer}>
      <div className={styles.communityCards}>{getCommunityCards()}</div>
      <div className={styles.potContainer}>
        <span>{POT_TITLE}</span>
        {pot}
      </div>
      <div className={styles.blindsContainer}>
        <span>{BLINDS_TITLE}</span>
        {'10p / 20p'}
      </div>
      <div className={styles.titleContainer}>{title}</div>
    </div>
  );
};
