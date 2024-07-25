const e = require('express');
const RFID = require('../model/rfid');
const { TexasHoldem } = require('poker-odds-calc');

const resetRFID = () => {
  const status = RFID.deleteMany({}, (err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });

  return status;
};

const findFirstHand = async () => {
  const data = await RFID.find({}).limit(1);

  if (data) return data;
};

const getEquityPercentages = (players, cards, communityCards) => {
  if (cards.length < 2) {
    console.log('CATCH');
    return [];
  }

  console.log('[EQUITY] players', players);
  console.log('[EQUITY] cards', cards);
  console.log('[EQUITY] communityCards', communityCards);

  const Table = new TexasHoldem();

  let playerSeatsInHand = [];

  players.forEach((player) => playerSeatsInHand.push(player.seat));

  const cardsFiltered = cards.filter((playerCards) =>
    playerSeatsInHand.find((playerSeat) => playerCards.seat === playerSeat)
  );

  console.log('[EQUITY] playerSeatsInHand', playerSeatsInHand);
  console.log('[EQUITY] cardsFiltered', cardsFiltered);

  cardsFiltered.forEach((playersCard) =>
    Table.addPlayer([playersCard.cards[0], playersCard.cards[1]])
  );

  if (cardsFiltered.length < 2) {
    console.log('CATCH');
    return [];
  }

  if (communityCards && communityCards.length >= 3) {
    Table.setBoard(communityCards);
  }

  const tableResult = Table.calculate();

  const allPlayers = tableResult.getPlayers();

  let equities = [];

  allPlayers.forEach((player) => {
    const selectedPlayer = cards.find((playerCards) => {
      const playerHand = playerCards.cards.join('');
      return playerHand === player.getHand();
    });

    const isPlayerCardVisible = players.find(
      (player) => player.seat === selectedPlayer.seat
    );

    if (!!isPlayerCardVisible) {
      const equityPercentage =
        String(Math.round(player.getWinsPercentage())) + '%';

      equities.push({
        seat: selectedPlayer.seat,
        equity: equityPercentage,
      });
    }
  });

  console.log('equities', equities);

  return equities;
};

module.exports = {
  resetRFID,
  findFirstHand,
  getEquityPercentages,
};
