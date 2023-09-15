function CardForm({ cardData, onSubmit, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          className="form-control"
          id="front"
          rows="4"
          value={cardData.front}
          onChange={onChange("front")}
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
          value={cardData.back}
          onChange={onChange("back")}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
    </form>
  );
}

export default CardForm;
