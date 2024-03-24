import React, { useState, useEffect } from "react";
import GoalFormModal from "./GoalFormEdit.js";
import SubtaskFormEdit from "./SubTaskEdit.js";
import { GoalButton } from "../Button/Button.js";
import { faEdit, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const GoalCard = ({
  goal,
  handleEdit,
  handleAddSubtaskClick,
  editingGoal,
  handleSave,
  setEditingGoal,
  editSubTask,
}) => {
  const [editingSubtask, setEditingSubTask] = useState(null);
  const [alertData, setAlertData] = useState(null);

  const handleEditSubtaskClick = (subTask) => {
    if (subTask) {
      setEditingSubTask(subTask);
    } else {
      console.error("Subtask is undefined");
    }
  };
  const checkForAlerts = () => {
    const now = new Date();
    const alertData = [];

    goal.subTasks.forEach((subtask) => {
      if (subtask.reminder && subtask.frequency) {
        const reminder = subtask.reminder.split(":");
        const reminderDate = new Date();
        reminderDate.setHours(reminder[0]);
        reminderDate.setMinutes(reminder[1]);
        const frequency = subtask.frequency;

        const reminderStart = new Date(reminderDate.getTime());
        reminderStart.setMinutes(reminderStart.getMinutes() - 1);

        const reminderEnd = new Date(reminderDate.getTime());
        reminderEnd.setMinutes(reminderEnd.getMinutes());

        if (
          (frequency === "one-a-day" &&
            now.getFullYear() === reminderDate.getFullYear() &&
            now.getMonth() === reminderDate.getMonth() &&
            now.getDate() === reminderDate.getDate()) ||
          (frequency === "twice-a-day" &&
            now.getFullYear() === reminderDate.getFullYear() &&
            now.getMonth() === reminderDate.getMonth() &&
            (now.getDate() === reminderDate.getDate() ||
              now.getDate() === reminderDate.getDate() + 1) &&
            [0, 6].includes(now.getDay())) ||
          (frequency === "no-of-days" &&
            now.getFullYear() === reminderDate.getFullYear() &&
            now.getMonth() === reminderDate.getMonth() &&
            now.getDate() <=
              reminderDate.getDate() + parseInt(subtask.quantity, 10)) ||
          (frequency === "one-a-week" &&
            now.getFullYear() === reminderDate.getFullYear() &&
            now.getMonth() === reminderDate.getMonth() &&
            Math.abs(now.getDay() - reminderDate.getDay()) <= 1)
        ) {
          if (now >= reminderStart && now <= reminderEnd) {
            alertData.push(subtask);
          }
        }
      }
    });

    if (alertData.length > 0) {
      let index = 0;

      const displayNextAlert = () => {
        if (index < alertData.length) {
          const subtask = alertData[index];
          const message = `Task ${subtask.title} is due today!`;
          displayAlert(message);
          index++;
          setTimeout(displayNextAlert, 3000);
        }
      };

      displayNextAlert();
    }
  };

  const displayAlert = (message) => {
    alert(message);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkForAlerts();

      if (alertData && alertData.length > 0) {
        alert(`Task ${alertData[0].title} is due today!`);

        setAlertData([]);
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, [goal.subTasks]);

  return (
    <div className="goalCard">
      <div className="goalInfo">
        <h3>{goal.title}</h3>
        <GoalButton
          className="button icon-with-text"
          onClick={() => handleEdit(goal)}
          icon={faEdit}
          buttonText=""
        />
      </div>
      <div className="goalMinMaxDetails">
        <h6>
          Min -{" "}
          {new Date(goal.minTimelines).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
          })}
        </h6>
        <h6>
          Max -{" "}
          {new Date(goal.maxTimelines).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
          })}
        </h6>
      </div>
      <hr />
      <div className="addSubtask">
        <GoalButton
          className="button icon-with-text"
          onClick={() => handleAddSubtaskClick(goal.title)}
          icon={faCirclePlus}
          buttonText="Add Subtask"
        />
      </div>
      <hr />
      {editingGoal && editingGoal._id === goal._id && (
        <GoalFormModal
          dialogueBoxTitle="Edit Goal"
          goal={goal}
          onSave={handleSave}
          onClose={() => setEditingGoal(null)}
        />
      )}
      <div className="subtasks">
        <table>
          <tbody>
            <tr>
              <th>Edit</th>
              <th>Title</th>
              <th label="quantity">Quan...</th>
              <th label="frequency">Freq...</th>
              <th>Reminder</th>
              <th>Completed</th>
            </tr>
            {goal.subTasks?.map((subtask, index) => (
              <tr key={index}>
                <td>
                  <GoalButton
                    className="button icon-with-text"
                    onClick={() => handleEditSubtaskClick(subtask)}
                    icon={faEdit}
                    buttonText=""
                  />
                </td>
                <td title={subtask.title}>
                  {subtask.title.length > 8
                    ? subtask.title.slice(0, 7) + "..."
                    : subtask.title}
                </td>
                <td>{subtask.quantity}</td>
                <td>{subtask.frequency}</td>
                <td>{subtask.reminder ? "Y" : "N"}</td>
                <td>{subtask.completed ? "Y" : "N"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingGoal && editingGoal._id === goal._id && (
        <GoalFormModal
          dialogueBoxTitle="Edit Goal"
          goal={goal}
          onSave={handleSave}
          onClose={() => setEditingGoal(null)}
        />
      )}
      {editingSubtask && (
        <SubtaskFormEdit
          subtask={editingSubtask}
          onSave={editSubTask}
          onClose={() => setEditingSubTask(null)}
          goalId={goal}
        />
      )}
    </div>
  );
};

export default GoalCard;
