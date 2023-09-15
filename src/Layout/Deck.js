import React, { useEffect, useState } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import {
  useParams,
  Link,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
        setCards(response.cards);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };
    fetchDeck();
  }, [deckId]);

  const handleDeleteDeck = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this deck?"
    );
    if (confirmed) {
      try {
        await deleteDeck(deckId);
        history.push("/");
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  const handleDeleteCard = async (cardId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (confirmed) {
      try {
        await deleteCard(cardId);
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  };

  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
          </ol>
        </nav>
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>

        <Link to={`/decks/${deck.id}/edit`}>
          <button className="btn btn-secondary mr-1">Edit</button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
          <button className="btn btn-primary m-1">Study</button>
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button className="btn btn-primary m-1">Add Cards</button>
        </Link>
        <button
          className="btn btn-danger float-right"
          onClick={handleDeleteDeck}
        >
          Delete
        </button>
      </div>
      <div className="mt-3">
        <h1>Cards</h1>
        {cards.map((card) => (
          <div className="card mb-3" key={card.id}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h5 className="card-title">Front</h5>
                  <p className="card-text">{card.front}</p>
                </div>
                <div className="col-md-6">
                  <h5 className="card-title">Back</h5>
                  <p className="card-text">{card.back}</p>
                  <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                    <button className="btn btn-secondary m-1">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="btn btn-danger m-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Deck;
