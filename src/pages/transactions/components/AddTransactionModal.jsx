import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddTransactionModal = ({ isOpen, onClose, onAdd, editTransaction = null }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date()?.toISOString()?.split('T')?.[0],
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: 'Food & Dining', label: 'Food & Dining', icon: 'UtensilsCrossed' },
    { value: 'Transportation', label: 'Transportation', icon: 'Car' },
    { value: 'Shopping', label: 'Shopping', icon: 'ShoppingBag' },
    { value: 'Entertainment', label: 'Entertainment', icon: 'Gamepad2' },
    { value: 'Bills & Utilities', label: 'Bills & Utilities', icon: 'Receipt' },
    { value: 'Healthcare', label: 'Healthcare', icon: 'Heart' },
    { value: 'Travel', label: 'Travel', icon: 'Plane' },
    { value: 'Education', label: 'Education', icon: 'GraduationCap' },
    { value: 'Groceries', label: 'Groceries', icon: 'ShoppingCart' },
    { value: 'Gas', label: 'Gas', icon: 'Fuel' },
    { value: 'Coffee', label: 'Coffee', icon: 'Coffee' },
    { value: 'Subscription', label: 'Subscription', icon: 'CreditCard' },
    { value: 'Gym', label: 'Gym', icon: 'Dumbbell' },
    { value: 'Other', label: 'Other', icon: 'MoreHorizontal' }
  ];

  const transactionTypes = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' }
  ];

  useEffect(() => {
    if (editTransaction) {
      setFormData({
        description: editTransaction?.description,
        amount: editTransaction?.amount?.toString(),
        category: editTransaction?.category,
        type: editTransaction?.type,
        date: editTransaction?.date,
        notes: editTransaction?.notes || ''
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        category: '',
        type: 'expense',
        date: new Date()?.toISOString()?.split('T')?.[0],
        notes: ''
      });
    }
    setErrors({});
  }, [editTransaction, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData?.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const transactionData = {
        ...formData,
        amount: parseFloat(formData?.amount),
        id: editTransaction?.id || Date.now()?.toString()
      };

      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onAdd(transactionData);
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 sm:mx-0 glassmorphic-card border border-white/20 rounded-t-2xl sm:rounded-2xl shadow-2xl animate-slide-in-left sm:animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-foreground">
            {editTransaction ? 'Edit Transaction' : 'Add New Transaction'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Transaction Type */}
          <Select
            label="Transaction Type"
            options={transactionTypes}
            value={formData?.type}
            onChange={(value) => handleInputChange('type', value)}
            error={errors?.type}
          />

          {/* Description */}
          <Input
            label="Description"
            type="text"
            placeholder="Enter transaction description"
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            error={errors?.description}
            required
          />

          {/* Amount */}
          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            value={formData?.amount}
            onChange={(e) => handleInputChange('amount', e?.target?.value)}
            error={errors?.amount}
            required
            min="0"
            step="0.01"
          />

          {/* Category */}
          <Select
            label="Category"
            placeholder="Select a category"
            options={categories}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            searchable
            required
          />

          {/* Date */}
          <Input
            label="Date"
            type="date"
            value={formData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            error={errors?.date}
            required
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notes (Optional)
            </label>
            <textarea
              placeholder="Add any additional notes..."
              value={formData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              rows={3}
              className="w-full px-3 py-2 glassmorphic-card border border-white/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              fullWidth
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isLoading}
              fullWidth
              iconName={editTransaction ? "Save" : "Plus"}
              iconPosition="left"
            >
              {editTransaction ? 'Update Transaction' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;