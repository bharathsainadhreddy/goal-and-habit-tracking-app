// GoalList.js

import React from "react";
import GoalCard from "./GoalCard";

const GoalList = ({
  goals,
  handleEdit,
  handleAddSubtaskClick,
  editingGoal,
  handleSave,
  setEditingGoal,
  editSubTask,
}) => {
  return (
    <div className="goals">
      {goals?.map((goal) => (
        <GoalCard
          key={goal._id}
          goal={goal}
          handleEdit={handleEdit}
          handleAddSubtaskClick={handleAddSubtaskClick}
          editingGoal={editingGoal}
          handleSave={handleSave}
          setEditingGoal={setEditingGoal}
          editSubTask={editSubTask}
        />
      ))}
    </div>
  );
};

export default GoalList;
