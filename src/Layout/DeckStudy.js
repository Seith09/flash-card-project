import React, { useState } from "react";
import { Link } from "react-router-dom";

function DeckStudy({ deck }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);

  const cards = deck.cards;

  if (cards.length < 3) {
    return (
      <div>
        <h2>Not Enough Cards</h2>
        <p>You need at least 3 cards in the deck to start studying.</p>
        <Link to={`/decks/${deck.id}/add`}>
          <button className="btn btn-primary">Add Cards</button>
        </Link>
      </div>
    );
  }

  const handleFlip = () => {
    setIsFront(!isFront);
  };

  const handleNext = () => {
    if (isFront) {
      // Show the back side first
      setIsFront(false);
    } else if (currentCardIndex < cards.length - 1) {
      // Go to the next card
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFront(true);
    } else {
      const confirmed = window.confirm(
        `Restart cards? \n\nClick 'cancel' to return to the home page`
      );

      if (confirmed) {
        setCurrentCardIndex(0);
        setIsFront(true);
      } else {
        window.location.href = "/";
      }
    }
  };

  const currentCard = cards[currentCardIndex];

  return (
    <div>
      <div>
        <h2>
          Card {currentCardIndex + 1} of {cards.length}
        </h2>
        <p>{isFront ? currentCard.front : currentCard.back}</p>
        <button
          onClick={handleFlip}
          className="btn btn-secondary float-left m-1"
        >
          Flip
        </button>
      </div>
      {!isFront && (
        <div>
          <button className="btn btn-primary m-1" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DeckStudy;
