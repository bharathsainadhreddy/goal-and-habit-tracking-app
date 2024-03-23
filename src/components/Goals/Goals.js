// Goals.js

import React, { useEffect, useState } from "react";
import "./Goals.css";
import Sidebar from "./Sidebar";
import GoalList from "./GoalList";
import GoalFormModal from "./GoalFormModal";
import AddSubtaskModal from "./SubTask";
import Popup from "../ComingSoonPopup/Popup";
import { GoalButton } from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { makeHttpCallToRestApi } from "../router";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Max_Goal_Display_Limit = process.env.MAX_NUBER_OF_GOALS_FOR_FREE_ACC || 2;

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    minTimelines: "",
    maxTimelines: "",
    subTasks: [],
  });
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    fetchGoalsList();
  }, [userName]);

  const fetchGoalsList = async () => {
    const response = await makeHttpCallToRestApi("/api/goals/list", {
      userName,
      action: "fetchGoalList",
    });
    const data = await response.json();
    setGoals(data.goal);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/register");
  };

  const onAddGoal = async (formData) => {
    const response = await makeHttpCallToRestApi("/api/goals", {
      title: formData.get("title"),
      description: formData.get("description"),
      minTimelines: formData.get("minTimelines"),
      maxTimelines: formData.get("maxTimelines"),
      userName,
      action: "creatingNewGoal",
    });
    const data = await response.json();
    if (response.ok) {
      setGoals([...goals, data]);
      setNewGoal(newGoal);
      setShowGoalForm(false);
      navigate("/goals");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (goals.length < Max_Goal_Display_Limit) {
      await onAddGoal(formData);
      setShowGoalForm(false);
    } else {
      alert("You can have only 2 max goals.");
    }
  };

  const handleSubmitSubtask = async (editedSubtask) => {
    const response = await makeHttpCallToRestApi(
      `/api/subtasks/${editedSubtask._id}`,
      { editedSubtask, action: "editSubTask", subtaskId: editedSubtask._id }
    );

    if (response.ok) {
      setGoals((prevGoals) => {
        return prevGoals.map((goal) => {
          if (goal._id === editedSubtask.goalId) {
            // Find the goal that contains the edited subtask
            return {
              ...goal,
              subTasks: goal.subTasks.map((subtask) => {
                if (subtask._id === editedSubtask._id) {
                  return editedSubtask;
                }
                return subtask;
              }),
            };
          }
          return goal;
        });
      });
      navigate("/goals");
    }
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
  };

  const handleSave = async (editedGoal) => {
    const response = await makeHttpCallToRestApi(`/api/goals/edit`, {
      ...editedGoal,
      action: "editGoalsData",
      goalId: editedGoal._id,
    });

    const data = await response.json();

    if (response.ok) {
      setGoals(
        goals.map((goal) => {
          if (goal._id === data._id) {
            return data;
          } else {
            return goal;
          }
        })
      );
      setEditingGoal(null);
    }
    window.location.reload();
  };

  const handleAddSubtaskClick = (goalId) => {
    setSelectedGoalId(goalId);
    setShowSubtaskForm(true);
  };

  const handleSubtaskClose = () => {
    setShowSubtaskForm(false);
  };

  return (
    <div className="container">
      <Sidebar
        signOut={signOut}
        userName={userName}
        setShowPopup={setShowPopup}
      />
      <div className="main">
        <div className="header">
          <h1>Goals</h1>
          <GoalButton
            className="button icon-with-text"
            onClick={() => setShowGoalForm(true)}
            icon={faCirclePlus}
            buttonText="Add New Goal"
          />
        </div>
        <hr />
        <hr />
        <GoalList
          goals={goals}
          handleEdit={handleEdit}
          handleAddSubtaskClick={handleAddSubtaskClick}
          editingGoal={editingGoal}
          handleSave={handleSave}
          setEditingGoal={handleEdit}
          editSubTask={handleSubmitSubtask}
        />
        <GoalFormModal
          showGoalForm={showGoalForm}
          setShowGoalForm={setShowGoalForm}
          handleSubmit={handleSubmit}
          dialogueBoxTitle="Add New Goal"
        />
      </div>
      {showPopup && (
        <Popup message="Coming Soon!" onClose={() => setShowPopup(false)} />
      )}
      {showSubtaskForm && (
        <AddSubtaskModal
          onSave={(subtask) => handleAddSubtaskClick(selectedGoalId)}
          onClose={handleSubtaskClose}
          goalId={selectedGoalId}
        />
      )}
    </div>
  );
};

export default Goals;
