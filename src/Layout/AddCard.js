import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();

  const [card, setCard] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (card.front.length > 0 && card.back.length > 0) {
      try {
        await createCard(deckId, card);
        setCard({ front: "", back: "" });
        // Instead of redirecting, you can stay on the same page for adding more cards
      } catch (error) {
        console.error("Error adding card:", error);
      }
    } else {
      window.alert(
        "You need to make a valid input for the front and back of the card"
      );
    }
  };

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };
    fetchDeck();
  }, [deckId]);

  const deckName = deck ? deck.name : "Deck Name";

  const handleDoneClick = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item">Add Card</li>
        </ol>
      </nav>
      <h2>{deck ? `${deck.name}: Add Card` : "Add Card"}</h2>
      <CardForm
        cardData={card}
        onSubmit={handleSubmit}
        onChange={(field) => (event) => {
          setCard({
            ...card,
            [field]: event.target.value,
          });
        }}
      />
      <button className="btn btn-secondary mt-1" onClick={handleDoneClick}>
        Done
      </button>
    </div>
  );
}

export default AddCard;
