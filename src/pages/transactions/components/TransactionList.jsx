import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TransactionCard from './TransactionCard';

const TransactionList = ({ 
  transactions, 
  onEdit, 
  onDelete, 
  onBulkDelete,
  loading = false,
  hasMore = false,
  onLoadMore
}) => {
  const [selectedTransactions, setSelectedTransactions] = useState(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [groupBy, setGroupBy] = useState('date'); // 'date', 'category', 'none'

  const handleSelectTransaction = useCallback((transactionId) => {
    setSelectedTransactions(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(transactionId)) {
        newSet?.delete(transactionId);
      } else {
        newSet?.add(transactionId);
      }
      
      // Exit selection mode if no items selected
      if (newSet?.size === 0) {
        setSelectionMode(false);
      } else if (!selectionMode) {
        setSelectionMode(true);
      }
      
      return newSet;
    });
  }, [selectionMode]);

  const handleSelectAll = () => {
    if (selectedTransactions?.size === transactions?.length) {
      setSelectedTransactions(new Set());
      setSelectionMode(false);
    } else {
      setSelectedTransactions(new Set(transactions.map(t => t.id)));
      setSelectionMode(true);
    }
  };

  const handleBulkDelete = () => {
    if (selectedTransactions?.size > 0) {
      onBulkDelete(Array.from(selectedTransactions));
      setSelectedTransactions(new Set());
      setSelectionMode(false);
    }
  };

  const exitSelectionMode = () => {
    setSelectedTransactions(new Set());
    setSelectionMode(false);
  };

  const groupTransactions = (transactions, groupBy) => {
    if (groupBy === 'none') {
      return { 'All Transactions': transactions };
    }

    const grouped = {};
    
    transactions?.forEach(transaction => {
      let key;
      
      if (groupBy === 'date') {
        const date = new Date(transaction.date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday?.setDate(yesterday?.getDate() - 1);
        
        if (date?.toDateString() === today?.toDateString()) {
          key = 'Today';
        } else if (date?.toDateString() === yesterday?.toDateString()) {
          key = 'Yesterday';
        } else {
          key = date?.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
        }
      } else if (groupBy === 'category') {
        key = transaction?.category;
      }
      
      if (!grouped?.[key]) {
        grouped[key] = [];
      }
      grouped?.[key]?.push(transaction);
    });
    
    return grouped;
  };

  const groupedTransactions = groupTransactions(transactions, groupBy);

  if (loading && transactions?.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(5)]?.map((_, index) => (
          <div key={index} className="glassmorphic-card p-4 rounded-xl animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
                <div className="h-3 bg-white/20 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-white/20 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (transactions?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Icon name="Receipt" size={32} className="text-foreground/40" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No Transactions Found</h3>
        <p className="text-foreground/60 mb-6">
          Start tracking your expenses by adding your first transaction.
        </p>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => window.dispatchEvent(new CustomEvent('openAddTransaction'))}
        >
          Add Transaction
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* List Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="List" size={20} className="text-foreground/60" />
            <span className="text-sm font-medium text-foreground">
              {transactions?.length} transactions
            </span>
          </div>
          
          {selectionMode && (
            <div className="flex items-center space-x-2 text-sm text-foreground/60">
              <span>{selectedTransactions?.size} selected</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Group By Selector */}
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e?.target?.value)}
            className="px-3 py-1 text-sm glassmorphic-card border border-white/20 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="date">Group by Date</option>
            <option value="category">Group by Category</option>
            <option value="none">No Grouping</option>
          </select>

          {/* Selection Controls */}
          {selectionMode ? (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                iconName={selectedTransactions?.size === transactions?.length ? "Square" : "CheckSquare"}
                iconPosition="left"
              >
                {selectedTransactions?.size === transactions?.length ? 'Deselect All' : 'Select All'}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                iconName="Trash2"
                iconPosition="left"
                disabled={selectedTransactions?.size === 0}
              >
                Delete ({selectedTransactions?.size})
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={exitSelectionMode}
                iconName="X"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectionMode(true)}
              iconName="CheckSquare"
              iconPosition="left"
            >
              Select
            </Button>
          )}
        </div>
      </div>
      {/* Transaction Groups */}
      <div className="space-y-6">
        {Object.entries(groupedTransactions)?.map(([groupName, groupTransactions]) => (
          <div key={groupName} className="space-y-4">
            {groupBy !== 'none' && (
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-foreground">{groupName}</h3>
                <span className="text-sm text-foreground/60">
                  ({groupTransactions?.length} transactions)
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>
            )}
            
            <div className="space-y-3">
              {groupTransactions?.map((transaction) => (
                <TransactionCard
                  key={transaction?.id}
                  transaction={transaction}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isSelected={selectedTransactions?.has(transaction?.id)}
                  onSelect={handleSelectTransaction}
                  selectionMode={selectionMode}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      {hasMore && (
        <div className="text-center py-6">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={loading}
            iconName="ChevronDown"
            iconPosition="right"
          >
            Load More Transactions
          </Button>
        </div>
      )}
      {/* Loading More Indicator */}
      {loading && transactions?.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-flex items-center space-x-2 text-foreground/60">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Loading more transactions...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;