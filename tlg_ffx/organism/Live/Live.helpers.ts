export type PlayerType = {
  name: string;
  stack?: string;
  active: boolean;
  seat: number;
  isOriginallyActive: boolean;
};

export enum HandActionEnum {
  NON = 'non',
  FOLD = 'fold',
  CHECK = 'check',
  CALL = 'call',
  BET = 'bet',
  ALLIN = 'allin',
}

export type ActionType = {
  seat: number;
  type: HandActionEnum;
  bet?: string;
};

export type LivePlayerType = {
  name: string;
  stack: string;
  seat: number;
  action: ActionType;
  committed: string;
};
