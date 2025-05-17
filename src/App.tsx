import { useState, useEffect } from 'react';
import  { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartOptions } from 'chart.js'
import { Pie } from 'react-chartjs-2';
import { useLocalStorage } from './hooks/useLocalStorage';
import TransactionForm from './components/TransactionForm';
import type { Transaction, Category } from './interfaces';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', []);

  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };


  const addCategory = (category) => {
    setCategories(prevCategory => [...prevCategory, category])
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Type', 'Amount', 'Date', 'Category', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => {
        const category = categories.find(c => c.id === t.categoryId);
        return [
          t.id,
          t.type,
          t.amount.toFixed(2),
          t.date,
          category?.name || 'Unknown',
          `"${t.notes.replace(/"/g, '""')}"`
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredTransactions = transactions.filter(t => {
    const typeMatch = filterType === 'all' || t.type === filterType;
    const categoryMatch = filterCategory === 'all' || t.categoryId === filterCategory;
    return typeMatch && categoryMatch;
  });

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [{
      data: [totalIncome, totalExpenses, totalIncome - totalExpenses],
      backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
      borderWidth: 1
    }]
  };

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            return `${label}: $${value.toFixed(2)}`;
          }
        }
      }
    }
  };

  useEffect(() => {
    setCategories([
      { id: 1, name: 'Salary', type: 'income' },
      { id: 2, name: 'Rent', type: 'expense' },
      { id: 3, name: 'Groceries', type: 'expense' },
      { id: 4, name: 'Freelance', type: 'income' }
    ])
  })

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Personal Finance Tracker</h1>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transaction Form */}
        <div className="lg:col-span-1">
          <TransactionForm categories={categories} onSubmit={addTransaction} />
        </div>

        {/* Transactions List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Financial Overview</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-white"
                >Download
                </button>
              </div>
            </div>
            <div className="h-64">
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl font-semibold">Transactions</h2>
              <div className="flex flex-wrap gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
                  className="p-2 border rounded"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <select
                  onChange={(e) => setFilterCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                  className="p-2 border rounded"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={() => {
                    
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-white"
                >Add category
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(transaction => {
                      const category = categories.find(c => c.id === transaction.categoryId);
                      return (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              transaction.type === 'income' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {category?.name || 'Unknown'}
                            </span>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">{transaction.notes}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => deleteTransaction(transaction.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}