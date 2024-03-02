import { Text, View } from 'react-native';

const ExpensesSummary = ({ periodName, expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>Total: ${totalExpenses.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;
