import { useState } from 'react';

import { Main } from '../organism/Main';

import '../styles/globals.css';

export interface IPlayerData {
  name: string;
  stack: number;
  position: number;
  seat: number;
  hand: string[] | null;
}

export default function HomePage(): JSX.Element {
  const [playerData, setPlayerData] = useState<IPlayerData[] | null>();

  return <Main playerData={playerData} setPlayerData={setPlayerData} />;
}
