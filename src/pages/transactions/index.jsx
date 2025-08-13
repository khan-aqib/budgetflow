import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';

import AddTransactionModal from './components/AddTransactionModal';
import FilterBar from './components/FilterBar';
import TransactionList from './components/TransactionList';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import SearchBar from './components/SearchBar';

const TransactionsPage = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [deleteTransactionIds, setDeleteTransactionIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Mock transactions data
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      description: 'Starbucks Coffee',
      amount: 5.75,
      category: 'Coffee',
      type: 'expense',
      date: '2025-01-13',
      notes: 'Morning coffee before work'
    },
    {
      id: '2',
      description: 'Uber Ride',
      amount: 12.50,
      category: 'Transportation',
      type: 'expense',
      date: '2025-01-13',
      notes: 'Ride to downtown meeting'
    },
    {
      id: '3',
      description: 'Freelance Payment',
      amount: 850.00,
      category: 'Other',
      type: 'income',
      date: '2025-01-12',
      notes: 'Web development project payment'
    },
    {
      id: '4',
      description: 'Grocery Shopping',
      amount: 67.89,
      category: 'Groceries',
      type: 'expense',
      date: '2025-01-12',
      notes: 'Weekly grocery shopping at Whole Foods'
    },
    {
      id: '5',
      description: 'Netflix Subscription',
      amount: 15.99,
      category: 'Subscription',
      type: 'expense',
      date: '2025-01-11',
      notes: 'Monthly streaming subscription'
    },
    {
      id: '6',
      description: 'Gas Station',
      amount: 45.20,
      category: 'Gas',
      type: 'expense',
      date: '2025-01-11',
      notes: 'Fill up tank for weekend trip'
    },
    {
      id: '7',
      description: 'Movie Tickets',
      amount: 28.00,
      category: 'Entertainment',
      type: 'expense',
      date: '2025-01-10',
      notes: 'Date night at the cinema'
    },
    {
      id: '8',
      description: 'Salary Deposit',
      amount: 3200.00,
      category: 'Other',
      type: 'income',
      date: '2025-01-10',
      notes: 'Monthly salary deposit'
    },
    {
      id: '9',
      description: 'Gym Membership',
      amount: 49.99,
      category: 'Gym',
      type: 'expense',
      date: '2025-01-09',
      notes: 'Monthly fitness membership'
    },
    {
      id: '10',
      description: 'Online Course',
      amount: 89.99,
      category: 'Education',
      type: 'expense',
      date: '2025-01-08',
      notes: 'React development course on Udemy'
    }
  ]);

  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    timeRange: 'all',
    sortBy: 'date-desc',
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: ''
  });

  // Filter and search transactions
  const filteredTransactions = useCallback(() => {
    let filtered = [...transactions];

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter(transaction =>
        transaction?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        transaction?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        transaction?.notes?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(transaction => transaction?.category === filters?.category);
    }

    // Type filter
    if (filters?.type !== 'all') {
      filtered = filtered?.filter(transaction => transaction?.type === filters?.type);
    }

    // Amount range filter
    if (filters?.minAmount) {
      filtered = filtered?.filter(transaction => transaction?.amount >= parseFloat(filters?.minAmount));
    }
    if (filters?.maxAmount) {
      filtered = filtered?.filter(transaction => transaction?.amount <= parseFloat(filters?.maxAmount));
    }

    // Time range filter
    if (filters?.timeRange !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered?.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        
        switch (filters?.timeRange) {
          case 'today':
            return transactionDate >= today;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo?.setDate(weekAgo?.getDate() - 7);
            return transactionDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo?.setMonth(monthAgo?.getMonth() - 1);
            return transactionDate >= monthAgo;
          case 'quarter':
            const quarterAgo = new Date(today);
            quarterAgo?.setMonth(quarterAgo?.getMonth() - 3);
            return transactionDate >= quarterAgo;
          case 'year':
            const yearAgo = new Date(today);
            yearAgo?.setFullYear(yearAgo?.getFullYear() - 1);
            return transactionDate >= yearAgo;
          case 'custom':
            if (filters?.startDate && filters?.endDate) {
              return transactionDate >= new Date(filters.startDate) && 
                     transactionDate <= new Date(filters.endDate);
            }
            return true;
          default:
            return true;
        }
      });
    }

    // Sort transactions
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'amount-desc':
          return b?.amount - a?.amount;
        case 'amount-asc':
          return a?.amount - b?.amount;
        case 'category':
          return a?.category?.localeCompare(b?.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [transactions, searchTerm, filters]);

  const displayedTransactions = filteredTransactions();

  // Event listeners for FAB
  useEffect(() => {
    const handleOpenAddTransaction = () => {
      setIsAddModalOpen(true);
    };

    window.addEventListener('openAddTransaction', handleOpenAddTransaction);
    return () => window.removeEventListener('openAddTransaction', handleOpenAddTransaction);
  }, []);

  const handleAddTransaction = (transactionData) => {
    if (editTransaction) {
      // Update existing transaction
      setTransactions(prev => 
        prev?.map(t => t?.id === editTransaction?.id ? transactionData : t)
      );
      setEditTransaction(null);
    } else {
      // Add new transaction
      setTransactions(prev => [transactionData, ...prev]);
    }
    setIsAddModalOpen(false);
  };

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction);
    setIsAddModalOpen(true);
  };

  const handleDeleteTransaction = (transactionId) => {
    setDeleteTransactionIds([transactionId]);
    setIsDeleteModalOpen(true);
  };

  const handleBulkDelete = (transactionIds) => {
    setDeleteTransactionIds(transactionIds);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setTransactions(prev => 
      prev?.filter(t => !deleteTransactionIds?.includes(t?.id))
    );
    setIsDeleteModalOpen(false);
    setDeleteTransactionIds([]);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      type: 'all',
      timeRange: 'all',
      sortBy: 'date-desc',
      minAmount: '',
      maxAmount: '',
      startDate: '',
      endDate: ''
    });
    setSearchTerm('');
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more data
    setTimeout(() => {
      setLoading(false);
      setHasMore(false); // For demo purposes
    }, 1000);
  };

  // Calculate summary statistics
  const totalExpenses = displayedTransactions?.filter(t => t?.type === 'expense')?.reduce((sum, t) => sum + t?.amount, 0);

  const totalIncome = displayedTransactions?.filter(t => t?.type === 'income')?.reduce((sum, t) => sum + t?.amount, 0);

  const netAmount = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <Header 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {/* Main Content */}
      <main className="lg:ml-80 pt-16 lg:pt-16">
        <div className="p-4 lg:p-8">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Transactions</h1>
                <p className="text-foreground/60">
                  Track and manage all your financial transactions
                </p>
              </div>
              
              <Button
                variant="default"
                onClick={() => setIsAddModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
                className="hidden sm:flex"
              >
                Add Transaction
              </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="glassmorphic-card p-4 rounded-xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <Icon name="TrendingDown" size={20} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Total Expenses</p>
                    <p className="text-xl font-bold text-red-600">
                      ${totalExpenses?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glassmorphic-card p-4 rounded-xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Total Income</p>
                    <p className="text-xl font-bold text-green-600">
                      ${totalIncome?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glassmorphic-card p-4 rounded-xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    netAmount >= 0 ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    <Icon 
                      name="DollarSign" 
                      size={20} 
                      className={netAmount >= 0 ? 'text-blue-600' : 'text-orange-600'} 
                    />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Net Amount</p>
                    <p className={`text-xl font-bold ${
                      netAmount >= 0 ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      ${Math.abs(netAmount)?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar 
            onSearch={setSearchTerm}
            placeholder="Search transactions by description, category, or notes..."
          />

          {/* Filter Bar */}
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
            transactionCount={displayedTransactions?.length}
          />

          {/* Transaction List */}
          <TransactionList
            transactions={displayedTransactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
            onBulkDelete={handleBulkDelete}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      </main>
      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fab sm:hidden"
        aria-label="Add new transaction"
      >
        <Icon name="Plus" size={24} color="white" />
      </button>
      {/* Modals */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditTransaction(null);
        }}
        onAdd={handleAddTransaction}
        editTransaction={editTransaction}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteTransactionIds([]);
        }}
        onConfirm={confirmDelete}
        transactionCount={deleteTransactionIds?.length}
      />
    </div>
  );
};

export default TransactionsPage;