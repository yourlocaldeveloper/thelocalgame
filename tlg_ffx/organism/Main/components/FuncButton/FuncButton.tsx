import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import styles from './FuncButton.module.scss';

export enum FuncButtonSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
}

export enum FuncButtonColor {
  Yellow,
  Blue,
  Green,
  White,
  Black,
}

interface FuncButtonProps {
  size: FuncButtonSize;
  color?: FuncButtonColor;
  text?: string;
  logo?: IconProp;
  onClick?: () => void;
  positionCorner?: boolean;
  positionEnd?: boolean;
  disabled?: boolean;
}

export const FuncButton: React.FC<FuncButtonProps> = (props) => {
  const {
    size,
    color,
    text,
    logo,
    onClick,
    positionCorner,
    positionEnd,
    disabled,
  } = props;

  return (
    <button
      onClick={onClick}
      className={cn(styles.button, {
        [styles.sm]: size === FuncButtonSize.Small,
        [styles.md]: size === FuncButtonSize.Medium,
        [styles.lg]: size === FuncButtonSize.Large,
        [styles.yellow]: color === FuncButtonColor.Yellow,
        [styles.blue]: color === FuncButtonColor.Blue,
        [styles.green]: color === FuncButtonColor.Green,
        [styles.white]: color === FuncButtonColor.White,
        [styles.black]: color === FuncButtonColor.Black,
        [styles.corner]: positionCorner,
        [styles.end]: positionEnd,
      })}
      disabled={disabled}
    >
      {logo && <FontAwesomeIcon icon={logo} className={styles.icon} />}
      {text && (
        <p className={cn({ [styles.textIcon]: logo })}>{text.toUpperCase()}</p>
      )}
    </button>
  );
};
