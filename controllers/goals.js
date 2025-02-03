import Goal from "../models/Goal.js";

export const getGoalsByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated request

    const goals = await Goal.find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "username");

    if (goals.length > 0) {
      res.status(200).json(goals);
    } else {
      res.status(404).json({ message: "No goals found for this user!" });
    }
  } catch (error) {
    console.error("Error fetching goals:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createGoal = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated request

    const goalData = { ...req.body, userId };

    const goal = new Goal(goalData);
    await goal.save();

    res.status(201).json({
      message: "Goal created successfully",
      goal,
    });
  } catch (error) {
    console.error("Error creating goal:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user's ID
    const { id } = req.params; // Goal ID from route params

    // Find the goal by ID and check if it belongs to the logged-in user
    const goal = await Goal.findOne({ _id: id, userId });

    if (!goal) {
      return res.status(404).json({ error: "Goal not found or access denied" });
    }

    // Update the goal with the new data
    Object.assign(goal, req.body);
    await goal.save();

    res.status(200).json({
      message: "Goal updated successfully",
      goal,
    });
  } catch (error) {
    console.error("Error updating goal:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user's ID
    const { id } = req.params; // Goal ID from route params

    console.log(`Deleting goal with ID: ${id} for user: ${userId}`);

    // Find the goal by ID and check if it belongs to the logged-in user
    const goal = await Goal.findOneAndDelete({ _id: id, userId });

    if (!goal) {
      return res.status(404).json({ error: "Goal not found or access denied" });
    }

    res.status(200).json({
      message: "Goal deleted successfully",
      goal, // Return the deleted goal if needed
    });
  } catch (error) {
    console.error("Error deleting goal:", error.message);
    res.status(500).json({ error: error.message });
  }
};
