import React, { useEffect, useState } from "react";
import { deleteDeck, listDecks } from "../utils/api/index";

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
      <button type="button" className="btn btn-secondary mb-3">
        Create Deck
      </button>
      <div>
        {decks.map((deck) => (
          <div key={deck.id} className="border p-3 mb-3">
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <button type="button" className="btn btn-secondary m-1">
              view
            </button>
            <button type="button" className="btn btn-primary m-1">
              study
            </button>
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
