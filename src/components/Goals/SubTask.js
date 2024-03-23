import React, { useState } from "react";
import Select from "react-select";
import { makeHttpCallToRestApi } from "../router";

const SubTask = ({ onSave, onClose, goalId }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const userName = localStorage.getItem("userName");

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const options = [
    { value: "one-a-day", label: "One a day" },
    { value: "twice-a-day", label: "Twice a day" },
    { value: "no-of-days", label: "No of days" },
    { value: "one-a-week", label: "One a week" },
  ];

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
      goalTitle: goalId,
      userName: userName,
    };

    try {
      const response = await makeHttpCallToRestApi("/api/subtasks", {
        ...data,
        action: "subTaskUpdate",
      });

      const updatedGoal = await response.json();
      onSave({ ...updatedGoal, goalId: goalId });
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  return (
    <div className="dialogue-box">
      <div className="dialogue-box-content">
        <button className="dialogue-box-close" onClick={onClose}>
          ×
        </button>
        <h2>Add Sub-Task</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" required />
          </div>
          <div className="form-group">
            <label htmlFor="frequency">Frequency</label>
            <Select
              id="frequency"
              name="frequency"
              options={options}
              onChange={handleChange}
              value={selectedOption}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reminder">Reminder</label>
            <input
              type="time"
              id="reminder-time"
              name="reminder-time"
              required
            />
          </div>
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubTask;
