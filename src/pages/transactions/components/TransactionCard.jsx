import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionCard = ({ 
  transaction, 
  onEdit, 
  onDelete, 
  isSelected = false, 
  onSelect, 
  selectionMode = false 
}) => {
  const [showActions, setShowActions] = useState(false);

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Food & Dining': 'UtensilsCrossed',
      'Transportation': 'Car',
      'Shopping': 'ShoppingBag',
      'Entertainment': 'Gamepad2',
      'Bills & Utilities': 'Receipt',
      'Healthcare': 'Heart',
      'Travel': 'Plane',
      'Education': 'GraduationCap',
      'Groceries': 'ShoppingCart',
      'Gas': 'Fuel',
      'Coffee': 'Coffee',
      'Subscription': 'CreditCard',
      'Gym': 'Dumbbell',
      'Other': 'MoreHorizontal'
    };
    return iconMap?.[category] || 'MoreHorizontal';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Food & Dining': 'text-orange-500 bg-orange-50',
      'Transportation': 'text-blue-500 bg-blue-50',
      'Shopping': 'text-purple-500 bg-purple-50',
      'Entertainment': 'text-pink-500 bg-pink-50',
      'Bills & Utilities': 'text-red-500 bg-red-50',
      'Healthcare': 'text-green-500 bg-green-50',
      'Travel': 'text-cyan-500 bg-cyan-50',
      'Education': 'text-indigo-500 bg-indigo-50',
      'Groceries': 'text-emerald-500 bg-emerald-50',
      'Gas': 'text-yellow-500 bg-yellow-50',
      'Coffee': 'text-amber-500 bg-amber-50',
      'Subscription': 'text-violet-500 bg-violet-50',
      'Gym': 'text-teal-500 bg-teal-50',
      'Other': 'text-gray-500 bg-gray-50'
    };
    return colorMap?.[category] || 'text-gray-500 bg-gray-50';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(Math.abs(amount));
  };

  const handleLongPress = () => {
    if (onSelect) {
      onSelect(transaction?.id);
    }
  };

  return (
    <div 
      className={`
        glassmorphic-card p-4 rounded-xl hover-lift transition-all duration-200 cursor-pointer
        ${isSelected ? 'ring-2 ring-primary bg-primary/5' : ''}
        ${selectionMode ? 'transform scale-95' : ''}
      `}
      onClick={() => selectionMode ? onSelect?.(transaction?.id) : setShowActions(!showActions)}
      onContextMenu={(e) => {
        e?.preventDefault();
        handleLongPress();
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          {/* Selection Checkbox */}
          {selectionMode && (
            <div className="flex items-center">
              <div className={`
                w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200
                ${isSelected 
                  ? 'bg-primary border-primary' :'border-gray-300 hover:border-primary'
                }
              `}>
                {isSelected && <Icon name="Check" size={12} color="white" />}
              </div>
            </div>
          )}

          {/* Category Icon */}
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            ${getCategoryColor(transaction?.category)}
          `}>
            <Icon 
              name={getCategoryIcon(transaction?.category)} 
              size={20} 
            />
          </div>

          {/* Transaction Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground truncate">
                {transaction?.description}
              </h3>
              <span className={`
                font-bold text-lg
                ${transaction?.type === 'expense' ? 'text-red-500' : 'text-green-500'}
              `}>
                {transaction?.type === 'expense' ? '-' : '+'}
                {formatAmount(transaction?.amount)}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-foreground/60">
              <span className="flex items-center space-x-2">
                <Icon name="Tag" size={14} />
                <span>{transaction?.category}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{formatDate(transaction?.date)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Menu */}
        {!selectionMode && (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e?.stopPropagation();
                setShowActions(!showActions);
              }}
              className="text-foreground/60 hover:text-foreground"
            >
              <Icon name="MoreVertical" size={16} />
            </Button>

            {showActions && (
              <div className="absolute right-0 top-full mt-2 w-48 glassmorphic-card border border-white/20 rounded-lg shadow-lg z-10 animate-fade-in">
                <div className="py-2">
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      onEdit(transaction);
                      setShowActions(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-white/10 transition-colors duration-200"
                  >
                    <Icon name="Edit" size={16} />
                    <span>Edit Transaction</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      onDelete(transaction?.id);
                      setShowActions(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50/10 transition-colors duration-200"
                  >
                    <Icon name="Trash2" size={16} />
                    <span>Delete Transaction</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Additional Details (Expandable) */}
      {showActions && !selectionMode && transaction?.notes && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-foreground/70">
            <Icon name="FileText" size={14} className="inline mr-2" />
            {transaction?.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;