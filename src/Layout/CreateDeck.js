import React from "react";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "", description: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeck({
      ...deck,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newDeck = await createDeck(deck);
      history.push(`/decks/${newDeck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>

      <h1>Create Deck</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={deck.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            value={deck.description}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mr-2"
          onSubmit={handleSubmit}
        >
          Submit
        </button>
        <Link to="/" className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </>
  );
}

export default CreateDeck;
