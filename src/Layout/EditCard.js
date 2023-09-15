import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

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
    </div>
  );
}

export default EditCard;
