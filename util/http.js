import axios from 'axios';

const BASE_URL =
  'https://react-native-a4321-default-rtdb.asia-southeast1.firebasedatabase.app';

export const storeExpense = async (expenseData, token) => {
  const response = await axios.post(BASE_URL + '/expenses.json', expenseData);
  const id = response.data.name;
  return id;
};

export const getExpenses = async (token) => {
  const response = await axios.get(BASE_URL + '/expenses.json');

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = async (id, expenseData, token) => {
  const response = await axios.put(
    BASE_URL + `/expenses/${id}.json`,
    expenseData
  );
  return response.data;
};

export const deleteExpense = async (id, token) => {
  const response = await axios.delete(BASE_URL + `/expenses/${id}.json`);
  return response.data;
};
