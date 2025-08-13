import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetOverviewCard = ({ totalAllocated, totalSpent, totalRemaining, budgetCount }) => {
  const spentPercentage = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;
  
  const getStatusColor = () => {
    if (spentPercentage >= 90) return 'text-error';
    if (spentPercentage >= 75) return 'text-warning';
    return 'text-success';
  };

  const getProgressColor = () => {
    if (spentPercentage >= 90) return 'bg-error';
    if (spentPercentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="glassmorphic-card p-6 mb-6 hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="PiggyBank" size={24} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Budget Overview</h2>
            <p className="text-sm text-foreground/60">{budgetCount} active budgets</p>
          </div>
        </div>
        <div className={`text-right ${getStatusColor()}`}>
          <p className="text-2xl font-bold">{spentPercentage?.toFixed(1)}%</p>
          <p className="text-sm">Used</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-4 rounded-lg bg-white/5">
          <p className="text-sm text-foreground/60 mb-1">Total Allocated</p>
          <p className="text-xl font-semibold text-foreground">${totalAllocated?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-white/5">
          <p className="text-sm text-foreground/60 mb-1">Total Spent</p>
          <p className="text-xl font-semibold text-foreground">${totalSpent?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-white/5">
          <p className="text-sm text-foreground/60 mb-1">Remaining</p>
          <p className="text-xl font-semibold text-success">${totalRemaining?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-foreground/60">
          <span>Overall Progress</span>
          <span>{spentPercentage?.toFixed(1)}% of budget used</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetOverviewCard;