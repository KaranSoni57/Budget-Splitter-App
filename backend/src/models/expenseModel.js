import pool from "../config/db.js";

export const createExpense = async (groupId, paidBy, title, amount) => {
  const [result] = await pool.query(
    `
        INSERT INTO expenses
        (group_id, paid_by, title, amount)
        VALUES (?, ?, ?, ?)`,
    [groupId, paidBy, title, amount],
  );

  return result;
};

export const deleteExpense = async (expenseId) => {
  const [result] = await pool.query(
    `
        DELETE FROM expenses
        WHERE id = ?`,
    [expenseId],
  );

  return result;
};

export const addExpenseSplit = async (expenseId, userId, amountOwed) => {
  const [result] = await pool.query(
    `
        INSERT INTO expense_splits
        (expense_id, user_id, amount_owed)
        VALUES (?, ?, ?)`,
    [expenseId, userId, amountOwed],
  );

  return result;
};

export const getGroupMembers = async (groupId) => {
  const [rows] = await pool.query(
    `SELECT * FROM group_members
        WHERE group_id = ?`,
    [groupId],
  );

  return rows;
};

export const findExpenseById = async (expenseId) => {
  const [rows] = await pool.query(
    `
        SELECT * FROM expenses
        WHERE id = ?`,
    [expenseId],
  );

  return rows[0];
};
