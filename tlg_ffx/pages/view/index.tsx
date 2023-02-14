import { Live } from '../../organism/Live';

export interface IPlayerData {
  name: string;
  stack: number;
  position: number;
  seat: number;
  hand: string[] | null;
}

export default function View(): JSX.Element {
  return <Live />;
}
