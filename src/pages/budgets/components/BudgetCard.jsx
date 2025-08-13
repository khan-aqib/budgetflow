import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const spentPercentage = budget?.allocated > 0 ? (budget?.spent / budget?.allocated) * 100 : 0;
  const remaining = budget?.allocated - budget?.spent;

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

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Housing': 'Home',
      'Food & Dining': 'UtensilsCrossed',
      'Transportation': 'Car',
      'Entertainment': 'Gamepad2',
      'Shopping': 'ShoppingBag',
      'Healthcare': 'Heart',
      'Education': 'GraduationCap',
      'Travel': 'Plane',
      'Utilities': 'Zap',
      'Insurance': 'Shield',
      'Savings': 'PiggyBank',
      'Other': 'MoreHorizontal'
    };
    return iconMap?.[category] || 'DollarSign';
  };

  const handleMenuClick = (e) => {
    e?.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEdit = (e) => {
    e?.stopPropagation();
    setShowMenu(false);
    onEdit(budget);
  };

  const handleDelete = (e) => {
    e?.stopPropagation();
    setShowMenu(false);
    onDelete(budget);
  };

  return (
    <div className="glassmorphic-card p-6 hover-lift relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            spentPercentage >= 90 ? 'bg-error/20 text-error' :
            spentPercentage >= 75 ? 'bg-warning/20 text-warning': 'bg-success/20 text-success'
          }`}>
            <Icon name={getCategoryIcon(budget?.category)} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{budget?.category}</h3>
            <p className="text-sm text-foreground/60">{budget?.period}</p>
          </div>
        </div>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMenuClick}
            className="text-foreground/60 hover:text-foreground hover:bg-white/10"
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
          
          {showMenu && (
            <div className="absolute top-full right-0 mt-2 w-40 glassmorphic-card border border-white/20 rounded-lg shadow-lg z-10 animate-fade-in">
              <div className="py-2">
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-white/10 transition-colors duration-200"
                >
                  <Icon name="Edit" size={14} />
                  <span>Edit Budget</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors duration-200"
                >
                  <Icon name="Trash2" size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Amount Details */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-foreground/60">Allocated</span>
          <span className="font-semibold text-foreground">${budget?.allocated?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-foreground/60">Spent</span>
          <span className={`font-semibold ${getStatusColor()}`}>${budget?.spent?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-foreground/60">Remaining</span>
          <span className={`font-semibold ${remaining >= 0 ? 'text-success' : 'text-error'}`}>
            ${Math.abs(remaining)?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-foreground/60">
          <span>Progress</span>
          <span>{spentPercentage?.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          />
        </div>
      </div>
      {/* Status Badge */}
      {spentPercentage >= 90 && (
        <div className="mt-3 flex items-center space-x-2 text-error text-sm">
          <Icon name="AlertTriangle" size={14} />
          <span>Budget exceeded</span>
        </div>
      )}
      {spentPercentage >= 75 && spentPercentage < 90 && (
        <div className="mt-3 flex items-center space-x-2 text-warning text-sm">
          <Icon name="AlertCircle" size={14} />
          <span>Approaching limit</span>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;