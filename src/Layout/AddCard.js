import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState(null);

  const handleFrontChange = (event) => {
    setFront(event.target.value);
  };

  const handleBackChange = (event) => {
    setBack(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (front.length > 0 && back.length > 0) {
      try {
        await createCard(deckId, { front, back });
        history.push(`/decks/${deckId}`);
        setFront("");
        setBack("");
      } catch (error) {
        console.error("Error adding card:", error);
      }
    } else {
      window.alert(
        "You need to make a valid input for the front and back of the cards"
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

  const deckName = deck.name;

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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front:
          </label>
          <textarea
            className="form-control"
            id="front"
            rows="3"
            value={front}
            onChange={handleFrontChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back:
          </label>
          <textarea
            className="form-control"
            id="back"
            rows="3"
            value={back}
            onChange={handleBackChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          className="btn btn-secondary ml-2"
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddCard;
