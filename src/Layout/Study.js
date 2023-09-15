import React from "react";
import { readDeck } from "../utils/api/index";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom/cjs/react-router-dom.min";
import DeckStudy from "./DeckStudy";

function Study({ match }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

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

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}/study`}>Study</Link>
          </li>
        </ol>
      </nav>
      <div>
        <h1>Study: {deck.name}</h1>
        <div className="border p-3">
          <DeckStudy deck={deck} />
        </div>
      </div>
    </>
  );
}

export default Study;
