import React, { useState } from "react";

const GoalForm = ({ goal, onSave, onClose }) => {
  const [title, setTitle] = useState(goal.title || "");
  const [completed, setCompleted] = useState(goal.completed || false);
  const [minTimelines, setMinTimelines] = useState(goal.minTimelines || "");
  const [maxTimelines, setMaxTimelines] = useState(goal.maxTimelines || "");

  const handleSave = () => {
    onSave({ ...goal, title, completed, minTimelines, maxTimelines });
  };

  const toggleCompleted = () => {
    setCompleted((prevCompleted) => !prevCompleted);
    onSave({ ...goal, completed: !goal.completed });
  };

  return (
    <div className="dialogue-box">
      <div className="dialogue-box-content">
        <button className="dialogue-box-close" onClick={onClose}>
          x
        </button>
        <h2>Edit Goal</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="minTimelines">Min Timelines</label>
            <input
              type="date"
              id="minTimelines"
              name="minTimelines"
              value={minTimelines ? minTimelines.split("T")[0] : ""}
              onChange={(e) => setMinTimelines(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxTimelines">MaxTimelines</label>
            <input
              type="date"
              id="maxTimelines"
              name="maxTimelines"
              value={maxTimelines ? maxTimelines.split("T")[0] : ""}
              onChange={(e) => setMaxTimelines(e.target.value)}
              required
            />
          </div>
          <div className="toggle-completed">
            <label htmlFor="toggleCompleted">Completed:</label>
            <label htmlFor="toggleCompleted" className="switch">
              <input
                type="checkbox"
                id="toggleCompleted"
                name="toggleCompleted"
                checked={completed}
                onChange={toggleCompleted}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <button onClick={handleSave} className="button-submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default GoalForm;
