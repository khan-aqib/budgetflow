import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterBar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  transactionCount = 0 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Food & Dining', label: 'Food & Dining' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Bills & Utilities', label: 'Bills & Utilities' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Education', label: 'Education' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Gas', label: 'Gas' },
    { value: 'Coffee', label: 'Coffee' },
    { value: 'Subscription', label: 'Subscription' },
    { value: 'Gym', label: 'Gym' },
    { value: 'Other', label: 'Other' }
  ];

  const transactionTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'expense', label: 'Expenses' },
    { value: 'income', label: 'Income' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'amount-desc', label: 'Highest Amount' },
    { value: 'amount-asc', label: 'Lowest Amount' },
    { value: 'category', label: 'Category A-Z' }
  ];

  const timeRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = () => {
    return filters?.category !== 'all' || 
           filters?.type !== 'all' || 
           filters?.timeRange !== 'all' || 
           filters?.minAmount || 
           filters?.maxAmount ||
           filters?.startDate ||
           filters?.endDate;
  };

  return (
    <div className="glassmorphic-card p-4 rounded-xl border border-white/20 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-foreground/60" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          <span className="text-sm text-foreground/60">
            ({transactionCount} transactions)
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="text-foreground/60 hover:text-foreground"
          >
            Advanced
          </Button>
          
          {hasActiveFilters() && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              className="text-foreground/60 hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Basic Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Category"
          options={categories}
          value={filters?.category || 'all'}
          onChange={(value) => handleFilterChange('category', value)}
          className="w-full"
        />

        <Select
          label="Type"
          options={transactionTypes}
          value={filters?.type || 'all'}
          onChange={(value) => handleFilterChange('type', value)}
          className="w-full"
        />

        <Select
          label="Time Range"
          options={timeRanges}
          value={filters?.timeRange || 'all'}
          onChange={(value) => handleFilterChange('timeRange', value)}
          className="w-full"
        />

        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy || 'date-desc'}
          onChange={(value) => handleFilterChange('sortBy', value)}
          className="w-full"
        />
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-white/10 pt-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Min Amount
              </label>
              <input
                type="number"
                placeholder="$0.00"
                value={filters?.minAmount || ''}
                onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
                className="w-full px-3 py-2 glassmorphic-card border border-white/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Max Amount
              </label>
              <input
                type="number"
                placeholder="$999.99"
                value={filters?.maxAmount || ''}
                onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
                className="w-full px-3 py-2 glassmorphic-card border border-white/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
                step="0.01"
              />
            </div>

            {/* Custom Date Range */}
            {filters?.timeRange === 'custom' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters?.startDate || ''}
                    onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
                    className="w-full px-3 py-2 glassmorphic-card border border-white/20 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filters?.endDate || ''}
                    onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
                    className="w-full px-3 py-2 glassmorphic-card border border-white/20 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Active Filter Tags */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
          {filters?.category !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
              <span>Category: {filters?.category}</span>
              <button
                onClick={() => handleFilterChange('category', 'all')}
                className="hover:bg-primary/30 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {filters?.type !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
              <span>Type: {filters?.type}</span>
              <button
                onClick={() => handleFilterChange('type', 'all')}
                className="hover:bg-secondary/30 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {filters?.timeRange !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
              <span>Time: {timeRanges?.find(t => t?.value === filters?.timeRange)?.label}</span>
              <button
                onClick={() => handleFilterChange('timeRange', 'all')}
                className="hover:bg-accent/30 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;