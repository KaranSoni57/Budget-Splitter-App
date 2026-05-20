import {
  createExpense,
  deleteExpense,
  addExpenseSplit,
  getGroupMembers,
  findExpenseById,
} from "../models/expenseModel.js";

export const createNewExpense = async (req, res) => {
  try {
    const { groupId, title, amount } = req.body;

    if (!groupId || !title || !amount) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const paidBy = req.user.id;

    const expense = await createExpense(groupId, paidBy, title, amount);

    const members = await getGroupMembers(groupId);

    const splitAmount = amount / members.length;

    for (const member of members) {
      await addExpenseSplit(expense.insertId, member.user_id, splitAmount);
    }

    res.status(201).json({
      message: "Expense successfully added.",
      expenseId: expense.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteUserExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = findExpenseById(expenseId);

    if (!expense) {
      return res.status(400).json({
        message: "Expense not found",
      });
    }

    await deleteExpense(expenseId);
    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
