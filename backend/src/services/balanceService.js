export const calculateBalances = (expenses, splits) => {
  const balances = {};

  for (const expense of expenses) {
    const payerId = expense.paid_by;

    if (!balances[payerId]) {
      balances[payerId] = 0;
    }

    balances[payerId] += Number(expense.amount);
  }

  for (const split of splits) {
    const userId = split.user_id;

    if (!balances[userId]) {
      balances[userId] = 0;
    }

    balances[userId] -= Number(split.amount_owed);
  }

  return balances;
};
