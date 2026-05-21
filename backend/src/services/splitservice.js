export const calculateEqualSplit = (totalAmount, totalMembers) => {
  const splitAmount = totalAmount / totalMembers;

  return Number(splitAmount.toFixed(2));
};
