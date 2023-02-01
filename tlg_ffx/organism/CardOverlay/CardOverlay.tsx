import React, { useEffect, useState } from 'react';

import styles from './CardOverlay.module.scss';

interface CardOverlayProps {
  setShowCardOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardOverlay: React.FC<CardOverlayProps> = (props) => {
  const { setShowCardOverlay } = props;
  const [allCards, setAllCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/card/all', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setAllCards(data);
      });
  }, []);

  const submitCardData = async (card) => {
    setStatusMessage('Loading');

    const response = await fetch('http://localhost:8080/card/add', {
      method: 'POST',
      body: JSON.stringify({ card: card }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response) {
      setStatusMessage('Card Did Not Add');
      return;
    }

    const data = await response.json();

    setAllCards(data);

    setStatusMessage('Card Added');
  };

  const submitReset = async () => {
    const response = await fetch('http://localhost:8080/rfid/reset', {
      method: 'DELETE',
    });

    if (!response) {
      setStatusMessage('Card Did Not Add');
      return;
    } else {
      setStatusMessage('DB RESET');
    }
  };

  const cardView = allCards.map((card) => (
    <button
      className={styles.card}
      disabled={card.uid ? true : false}
      onClick={() => submitCardData(card._id)}
    >
      {card._id}
    </button>
  ));

  return (
    <div className={styles.main}>
      <button
        onClick={() => setShowCardOverlay(false)}
        className={styles.closeButton}
      >
        x
      </button>
      <div className={styles.registerWrapper}>
        <h1>{statusMessage}</h1>
        <button onClick={() => submitReset()}>Reset RFID</button>
      </div>
      <div className={styles.cardWrapper}>{cardView}</div>
    </div>
  );
};
