/* eslint-disable no-return-assign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length > 0) {
      const incomes = this.transactions
        .map(p => (p.type === 'income' ? p.value : 0))
        .reduce((acc, item) => (acc += item));

      const outcomes = this.transactions
        .map(p => (p.type === 'outcome' ? p.value : 0))
        .reduce((acc, atual) => (acc += atual));

      const total = incomes - outcomes;

      this.balance = {
        income: incomes,
        outcome: outcomes,
        total,
      };
    }
    return this.balance;
  }

  public create(transaction: Transaction): Transaction {
    const newTransaction = new Transaction(transaction);

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
