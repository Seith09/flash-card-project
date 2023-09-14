import React from "react";
import { readDeck } from "../utils/api/index";
import { useState, useEffect } from "react";

function Study({ match }) {
  const { deckId } = match.params;
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
      <div>
        <h1>Study: {deck.name}</h1>
        <p>test</p>
      </div>
    </>
  );
}

export default Study;
