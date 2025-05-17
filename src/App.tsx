import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useLocalStorage } from './hooks/useLocalStorage';
import TransactionForm from './components/TransactionForm';
import type { Transaction, Category } from './interfaces';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', [
    { id: 1, name: 'Salary', type: 'income' },
    { id: 2, name: 'Rent', type: 'expense' }
  ]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Chart data calculation
  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      data: [
        transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
        transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
      ],
      backgroundColor: ['#4CAF50', '#F44336']
    }]
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finance Tracker</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <TransactionForm categories={categories} onSubmit={addTransaction} />
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Transactions</h2>
          {/* Transaction List */}
        </div>
      </div>
      <div className="mt-4">
        <Pie data={chartData} />
      </div>
    </div>
  );
}