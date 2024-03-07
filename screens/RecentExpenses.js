import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { getExpenses } from '../util/http';
import LoadIngOverlay from '../components/UI/LoadIngOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const expenses = await getExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsLoading(false);
    };

    fetchExpenses();
  }, []);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (isLoading) {
    return <LoadIngOverlay />;
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;
