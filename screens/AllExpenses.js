import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expensesContext.expenses}
      fallbackText="No registered expenses found!"
    />
  );
};

export default AllExpenses;
