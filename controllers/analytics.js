import Expense from "../models/Expense.js";
import Income from "../models/Income.js";

export const getMonthlyAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const expenses = await Expense.find({
      userId,
      date: { $gte: threeMonthsAgo },
    });

    const incomes = await Income.find({
      userId,
      date: { $gte: threeMonthsAgo },
    });

    res.status(200).json({ expenses, incomes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
