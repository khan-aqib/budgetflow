import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  transactionCount = 1,
  isLoading = false 
}) => {
  if (!isOpen) return null;

  const isMultiple = transactionCount > 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glassmorphic-card border border-white/20 rounded-2xl shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <Icon name="Trash2" size={24} className="text-red-600" />
          </div>
          
          <h2 className="text-xl font-bold text-foreground mb-2">
            {isMultiple ? 'Delete Transactions' : 'Delete Transaction'}
          </h2>
          
          <p className="text-foreground/70">
            {isMultiple 
              ? `Are you sure you want to delete ${transactionCount} transactions? This action cannot be undone.`
              : 'Are you sure you want to delete this transaction? This action cannot be undone.'
            }
          </p>
        </div>

        {/* Warning Box */}
        <div className="mx-6 mb-6 p-4 bg-red-50/10 border border-red-200/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-red-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-red-600 mb-1">Warning</h4>
              <p className="text-sm text-red-500/80">
                {isMultiple 
                  ? 'All selected transactions will be permanently removed from your records.' :'This transaction will be permanently removed from your records.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 p-6 pt-0">
          <Button
            variant="outline"
            onClick={onClose}
            fullWidth
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isLoading}
            fullWidth
            iconName="Trash2"
            iconPosition="left"
          >
            {isMultiple ? `Delete ${transactionCount} Transactions` : 'Delete Transaction'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;