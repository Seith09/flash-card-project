import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api/index";

function EditCard() {
  const { cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await readCard(cardId);
        setCard(response);
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };
    fetchCard();
  }, [cardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateCard({ ...card, id: cardId });
      history.goBack();
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  return (
    <div>
      <h1>Edit Card</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            rows="4"
            value={card.front}
            onChange={(e) => setCard({ ...card, front: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            rows="4"
            value={card.back}
            onChange={(e) => setCard({ ...card, back: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditCard;
