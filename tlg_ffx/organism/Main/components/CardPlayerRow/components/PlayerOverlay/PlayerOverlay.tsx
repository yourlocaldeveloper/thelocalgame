import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';

import { IPlayer, IPlayerData } from '../../../../Main.helpers';

import styles from './PlayerOverlay.module.scss';

interface PlayerOverlayProps {
  playerData: IPlayerData;
  playerSelector: string;
  setShowPlayerOverlay: (showPlayerOverlay: boolean) => void;
  setPlayerData: (playerData: IPlayerData) => void;
}

export const PlayerOverlay: React.FC<PlayerOverlayProps> = (props) => {
  const { playerData, playerSelector, setShowPlayerOverlay, setPlayerData } =
    props;
  const [selectedPlayerData, setPlayerSelectedData] = useState<IPlayer | null>(
    null
  );

  const [playerName, setPlayerName] = useState(selectedPlayerData?.name);
  const [stack, setStack] = useState(selectedPlayerData?.stack);

  useEffect(() => {
    setPlayerName(selectedPlayerData?.name);
    setStack(selectedPlayerData?.stack);
  }, [selectedPlayerData]);

  useEffect(() => {
    switch (playerSelector) {
      case 'player1':
        setPlayerSelectedData(playerData?.player1);
        break;
      case 'player2':
        setPlayerSelectedData(playerData?.player2);
        break;
      case 'player3':
        setPlayerSelectedData(playerData?.player3);
        break;
      case 'player4':
        setPlayerSelectedData(playerData?.player4);
        break;
      case 'player5':
        setPlayerSelectedData(playerData?.player5);
        break;
      case 'player6':
        setPlayerSelectedData(playerData?.player6);
        break;
      case 'player7':
        setPlayerSelectedData(playerData?.player7);
        break;
      case 'player8':
        setPlayerSelectedData(playerData?.player8);
        break;
      case 'player9':
        setPlayerSelectedData(playerData?.player9);
        break;
    }
  }, [playerSelector]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setPlayerName(name);
  };

  const handleStackChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStack = +e.target.value;
    setStack(newStack);
  };

  const submitPlayerData = (e: FormEvent<HTMLFormElement>) => {
    // TODO: Create universal function for updating player data.
    switch (playerSelector) {
      case 'player1':
        console.log('PLAYERNAME: ', playerName);
        const newPlayer1Data = {
          ...playerData,
          player1: {
            ...playerData.player1,
            name: playerName,
            stack: stack,
          },
        };
        console.log(newPlayer1Data);
        setPlayerData(newPlayer1Data);
        break;
      case 'player2':
        const newPlayer2Data = {
          ...playerData,
          player2: {
            ...playerData.player2,
            name: playerName,
            stack: stack,
          },
        };
        setPlayerData(newPlayer2Data);
        break;
      case 'player3':
        const newPlayer3Data = {
          ...playerData,
          player3: {
            ...playerData.player3,
            name: playerName,
            stack: stack,
          },
        };
        setPlayerData(newPlayer3Data);
        break;
      case 'player4':
        const newPlayer4Data = {
          ...playerData,
          player4: {
            ...playerData.player4,
            name: playerName,
            stack: stack,
          },
        };
        setPlayerData(newPlayer4Data);
        break;
      case 'player5':
        const newPlayer5Data = {
          ...playerData,
          player5: {
            ...playerData.player5,
            name: playerName,
            stack: stack,
          },
        };
        setPlayerData(newPlayer5Data);
        break;
      case 'player6':
        const newPlayer6Data = {
          ...playerData,
          player6: {
            ...playerData.player6,
            name: playerName,
            stack: stack,
          },
        };
        setPlayerData(newPlayer6Data);
        break;
      case 'player7':
        const newPlayer7Data = {
          ...playerData,
          player7: {
            ...playerData.player7,
            name: playerName,
            stack: stack,
          },
        };
        setPlayerData(newPlayer7Data);
        break;
      case 'player8':
        const newPlayer8Data = {
          ...playerData,
          player8: {
            ...playerData.player8,
            name: playerName,
            stack: stack,
          },
        };
        setPlayerData(newPlayer8Data);
        break;
      case 'player9':
        const newPlayer9Data = {
          ...playerData,
          player9: {
            ...playerData.player9,
            name: playerName,
            stack: stack,
          },
        };
        setPlayerData(newPlayer9Data);
        break;
    }
    e.preventDefault();
    setShowPlayerOverlay(false);
  };

  return (
    <form className={styles.main} onSubmit={submitPlayerData}>
      <div>
        <h1>Name</h1>
        <input name='name' value={playerName} onChange={handleNameChange} />
      </div>
      <div>
        <h1>Stack</h1>
        <input
          className={styles.stackInput}
          type='number'
          name='stack'
          min='0.00'
          max='10000.00'
          step='0.01'
          value={stack}
          onChange={handleStackChange}
        />
      </div>
      <div className={styles.submitWrapper}>
        <input className={styles.submit} type='submit' value='Submit' />
      </div>
      <button
        className={styles.closeButton}
        onClick={() => setShowPlayerOverlay(false)}
      >
        X
      </button>
    </form>
  );
};
