export interface Transaction {
    id: number;
    type: 'income' | 'expense';
    amount: number;
    date: string;
    categoryId: number;
    notes: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    type: 'income' | 'expense';
  }