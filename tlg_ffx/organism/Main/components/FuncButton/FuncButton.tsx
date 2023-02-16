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

// TO-DO: Add color enum to change color through props

interface FuncButtonProps {
  size: FuncButtonSize;
  text?: string;
  logo?: IconProp;
  onClick?: () => void;
  positionEnd?: boolean;
  disabled?: boolean;
}

export const FuncButton: React.FC<FuncButtonProps> = (props) => {
  const { size, text, logo, onClick, positionEnd, disabled } = props;

  return (
    <button
      onClick={onClick}
      className={cn(styles.button, {
        [styles.sm]: size === FuncButtonSize.Small,
        [styles.md]: size === FuncButtonSize.Medium,
        [styles.lg]: size === FuncButtonSize.Large,
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
