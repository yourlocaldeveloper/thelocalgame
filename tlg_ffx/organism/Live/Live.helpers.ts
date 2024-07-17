export type PlayerType = {
  name: string;
  stack?: string;
  active: boolean;
  seat: number;
  isOriginallyActive: boolean;
};

export type CardStoreType = {
  cards: string[];
  seat: number;
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

export type HandPlayerType = {
  name: string;
  stack: string;
  seat: number;
  action: ActionType;
  committed: string;
};

const TABLE_SIZE = 9;

const cardsToOrderValue = [
  { value: '2', order: 1 },
  { value: '3', order: 2 },
  { value: '4', order: 3 },
  { value: '5', order: 4 },
  { value: '6', order: 5 },
  { value: '7', order: 6 },
  { value: '8', order: 7 },
  { value: '9', order: 8 },
  { value: 'T', order: 9 },
  { value: 'J', order: 10 },
  { value: 'Q', order: 11 },
  { value: 'K', order: 12 },
  { value: 'A', order: 13 },
];

const positionToName = [
  { seat: 0, name: 'SB' },
  { seat: 1, name: 'BB' },
  { seat: 2, name: 'UTG' },
  { seat: 3, name: 'UTG+1' },
  { seat: 4, name: 'UTG+2' },
  { seat: 5, name: 'LJ' },
  { seat: 6, name: 'HJ' },
  { seat: 7, name: 'CO' },
  { seat: 8, name: 'BTN' },
];

export const getOrderedCards = (cards: string[]): string[] => {
  const cardOne = cards[0].split('')[0];
  const cardTwo = cards[1].split('')[0];

  const cardOneOrder = cardsToOrderValue.find(
    (cardCheck) => cardCheck.value === cardOne
  );
  const cardTwoOrder = cardsToOrderValue.find(
    (cardCheck) => cardCheck.value === cardTwo
  );

  console.log('Card One Order', cardOneOrder);
  console.log('Card Two Order', cardTwoOrder);

  if (cardTwoOrder.order > cardOneOrder.order) {
    console.log('New Order', [cardOne, cardTwo]);
    return [cards[1], cards[0]];
  }

  return cards;
};

export const getPlayerPositionValue = (
  preflopOrder: HandPlayerType[],
  seat: number
): number => {
  const playersOrder = preflopOrder.findIndex((player) => player.seat === seat);
  return playersOrder;
};

export const getPlayerPositionName = (
  preflopOrder: HandPlayerType[],
  seat: number
): string => {
  const playersOrder = preflopOrder.findIndex((player) => player.seat === seat);
  const orderScew = TABLE_SIZE - preflopOrder.length;

  let playerOrder: number = playersOrder;

  if (playerOrder > 2) {
    playerOrder = playersOrder + orderScew;
  }

  const position = positionToName.find((pos) => pos.seat === playerOrder);

  return position.name;
};
