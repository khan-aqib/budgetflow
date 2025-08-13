import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onBulkAdjust, onApplyTemplate, onExportReport }) => {
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustmentType, setAdjustmentType] = useState('percentage');
  const [adjustmentValue, setAdjustmentValue] = useState('');

  const quickActions = [
    {
      id: 'bulk-adjust',
      title: 'Bulk Adjust',
      description: 'Adjust all budgets by percentage or amount',
      icon: 'Calculator',
      color: 'from-primary to-secondary',
      action: () => setShowAdjustModal(true)
    },
    {
      id: 'apply-template',
      title: 'Apply Template',
      description: 'Reset budgets using a template',
      icon: 'Layout',
      color: 'from-accent to-primary',
      action: onApplyTemplate
    },
    {
      id: 'export-report',
      title: 'Export Report',
      description: 'Download budget analysis as PDF',
      icon: 'Download',
      color: 'from-success to-accent',
      action: onExportReport
    }
  ];

  const handleBulkAdjust = () => {
    if (adjustmentValue) {
      onBulkAdjust({
        type: adjustmentType,
        value: parseFloat(adjustmentValue)
      });
      setShowAdjustModal(false);
      setAdjustmentValue('');
    }
  };

  return (
    <>
      <div className="glassmorphic-card p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            <p className="text-sm text-foreground/60">Manage all budgets efficiently</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 hover-lift text-left group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action?.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} color="white" />
              </div>
              <h4 className="font-medium text-foreground mb-1">{action?.title}</h4>
              <p className="text-sm text-foreground/60">{action?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Bulk Adjust Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glassmorphic-card w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Bulk Adjust Budgets</h3>
                <p className="text-sm text-foreground/60">Apply changes to all budget categories</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAdjustModal(false)}
                className="text-foreground/60 hover:text-foreground hover:bg-white/10"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Adjustment Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAdjustmentType('percentage')}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      adjustmentType === 'percentage' ?'border-primary bg-primary/10 text-primary' :'border-white/20 bg-white/5 text-foreground/80 hover:border-white/40'
                    }`}
                  >
                    <Icon name="Percent" size={16} className="mx-auto mb-1" />
                    <div className="text-sm">Percentage</div>
                  </button>
                  <button
                    onClick={() => setAdjustmentType('amount')}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      adjustmentType === 'amount' ?'border-primary bg-primary/10 text-primary' :'border-white/20 bg-white/5 text-foreground/80 hover:border-white/40'
                    }`}
                  >
                    <Icon name="DollarSign" size={16} className="mx-auto mb-1" />
                    <div className="text-sm">Fixed Amount</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {adjustmentType === 'percentage' ? 'Percentage Change' : 'Amount Change'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={adjustmentValue}
                    onChange={(e) => setAdjustmentValue(e?.target?.value)}
                    placeholder={adjustmentType === 'percentage' ? 'e.g., 10 for +10%' : 'e.g., 100 for +$100'}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60">
                    {adjustmentType === 'percentage' ? '%' : '$'}
                  </div>
                </div>
                <p className="text-xs text-foreground/60 mt-1">
                  Use negative values to decrease budgets
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => setShowAdjustModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleBulkAdjust}
                disabled={!adjustmentValue}
              >
                Apply Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActionsPanel;