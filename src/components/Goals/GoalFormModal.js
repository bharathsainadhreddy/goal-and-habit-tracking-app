// GoalFormModal.js

import React from "react";

const GoalFormModal = ({
  showGoalForm,
  setShowGoalForm,
  handleSubmit,
  dialogueBoxTitle,
}) => {
  const handleClose = () => {
    setShowGoalForm(false);
  };

  return (
    showGoalForm && (
      <div className="dialogue-box">
        <div className="dialogue-box-content">
          <button className="dialogue-box-close" onClick={handleClose}>
            x
          </button>
          <h2> {dialogueBoxTitle}</h2>
          <form className="subtask-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description (max 100 words)</label>
              <textarea
                id="description"
                name="description"
                maxLength={100}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="minTimelines">Min Timelines</label>
              <input
                type="date"
                id="minTimelines"
                name="minTimelines"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxTimelines">Max Timelines</label>
              <input
                type="date"
                id="maxTimelines"
                name="maxTimelines"
                required
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(
                    new Date().getFullYear() + 1,
                    new Date().getMonth(),
                    new Date().getDate()
                  )
                    .toISOString()
                    .split("T")[0]
                }
              />
            </div>

            <button type="submit" className="button-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default GoalFormModal;
