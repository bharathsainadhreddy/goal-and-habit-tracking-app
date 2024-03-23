import React, { useState } from "react";
import Select from "react-select";
import { makeHttpCallToRestApi } from "../router";

const SubTaskFromEdit = ({ subtask, onSave, onClose, goalId }) => {
  const [title, setTitle] = useState(subtask.title || "");
  const [completed, setCompleted] = useState(subtask.completed || false);
  const [quantity, setQuantity] = useState(subtask.quantity || "");
  const [frequency, setFrequency] = useState(subtask.frequency || "");
  const [reminder, setReminder] = useState(subtask.reminder || "");
  const userName = localStorage.getItem("userName");

  const handleChange = (value) => {
    setFrequency(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to the server with the form data
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      quantity: formData.get("quantity"),
      frequency: formData.get("frequency"),
      reminder: formData.get("reminder-time"),
      goalId: goalId._id,
      userName: userName,
      subtaskId: subtask._id,
      action: "subTaskUpdate",
    };

    try {
      const response = await makeHttpCallToRestApi("/api/subtasks/edit", {
        ...data,
      });

      const updatedGoal = await response.json();
      onSave({ ...updatedGoal, goalId: goalId });
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  const toggleCompleted = () => {
    setCompleted((prevCompleted) => !prevCompleted);
    onSave({ ...subtask, completed: !subtask.completed });
  };
  const options = [
    { value: "one-a-day", label: "One a day" },
    { value: "twice-a-day", label: "Twice a day" },
    { value: "no-of-days", label: "No of days" },
    { value: "one-a-week", label: "One a week" },
  ];

  return (
    <div className="dialogue-box">
      <div className="dialogue-box-content">
        <button className="dialogue-box-close" onClick={onClose}>
          x
        </button>
        <h2>Edit Sub Task</h2>
        <form className="form" onSubmit={handleSubmit}>
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
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="frequency">Frequency</label>
            <Select
              id="frequency"
              name="frequency"
              options={options}
              onChange={(value) => handleChange(value)}
              value={frequency}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reminder">Reminder</label>
            <input
              type="time"
              id="reminder-time"
              name="reminder-time"
              onChange={(e) => setReminder(e.target.value)}
              value={reminder}
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
          <button type="submit" className="button-submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default SubTaskFromEdit;
