import React, { useEffect, useState } from "react";
import { deleteDeck, listDecks } from "../utils/api/index";
import { Link } from "react-router-dom";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await listDecks();
        setDecks(response);
      } catch (error) {
        return error;
      }
    };
    fetchDecks();
  }, []);

  const handleDeleteDeck = async (deckId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (confirmed) {
      try {
        await deleteDeck(deckId);
        setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  };

  return (
    <>
      <Link to={`/decks/new`}>
        <button type="button" className="btn btn-secondary mb-3">
          Create Deck
        </button>
      </Link>

      <div>
        {decks.map((deck) => (
          <div key={deck.id} className="border p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1>{deck.name}</h1>
              <p className="card-count">
                {`${deck.cards ? deck.cards.length : 0} cards`}
              </p>
            </div>
            <p>{deck.description}</p>

            <Link to={`/decks/${deck.id}`}>
              <button type="button" className="btn btn-secondary m-1">
                View
              </button>
            </Link>

            <Link to={`/decks/${deck.id}/study`}>
              <button type="button" className="btn btn-primary m-1">
                Study
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-danger float-right"
              onClick={() => handleDeleteDeck(deck.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
