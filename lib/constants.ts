export interface Category {
  name: string;
  type: 'INCOME' | 'EXPENSE';
}

export const DEFAULT_CATEGORIES: Category[] = [
  // Income categories
  { name: 'Salary', type: 'INCOME' },
  { name: 'Freelance', type: 'INCOME' },
  { name: 'Investments', type: 'INCOME' },
  { name: 'Other Income', type: 'INCOME' },
  
  // Expense categories
  { name: 'Food & Dining', type: 'EXPENSE' },
  { name: 'Rent', type: 'EXPENSE' },
  { name: 'Utilities', type: 'EXPENSE' },
  { name: 'Transportation', type: 'EXPENSE' },
  { name: 'Shopping', type: 'EXPENSE' },
  { name: 'Entertainment', type: 'EXPENSE' },
  { name: 'Healthcare', type: 'EXPENSE' },
  { name: 'Education', type: 'EXPENSE' },
  { name: 'Travel', type: 'EXPENSE' },
  { name: 'Insurance', type: 'EXPENSE' },
  { name: 'Other Expenses', type: 'EXPENSE' },
] 