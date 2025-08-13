import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateBudgetModal = ({ isOpen, onClose, onCreateBudget }) => {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customBudget, setCustomBudget] = useState({
    category: '',
    allocated: '',
    period: 'monthly'
  });

  const budgetTemplates = [
    {
      id: 'student',
      name: 'Student Budget',
      description: 'Perfect for college students managing limited income',
      icon: 'GraduationCap',
      categories: [
        { category: 'Food & Dining', allocated: 300, percentage: 30 },
        { category: 'Transportation', allocated: 150, percentage: 15 },
        { category: 'Entertainment', allocated: 100, percentage: 10 },
        { category: 'Education', allocated: 200, percentage: 20 },
        { category: 'Shopping', allocated: 100, percentage: 10 },
        { category: 'Other', allocated: 150, percentage: 15 }
      ],
      totalBudget: 1000
    },
    {
      id: 'family',
      name: 'Family Budget',
      description: 'Comprehensive budget for families with children',
      icon: 'Users',
      categories: [
        { category: 'Housing', allocated: 1500, percentage: 30 },
        { category: 'Food & Dining', allocated: 800, percentage: 16 },
        { category: 'Transportation', allocated: 600, percentage: 12 },
        { category: 'Healthcare', allocated: 400, percentage: 8 },
        { category: 'Education', allocated: 300, percentage: 6 },
        { category: 'Entertainment', allocated: 300, percentage: 6 },
        { category: 'Savings', allocated: 500, percentage: 10 },
        { category: 'Other', allocated: 600, percentage: 12 }
      ],
      totalBudget: 5000
    },
    {
      id: 'professional',
      name: 'Professional Budget',
      description: 'Ideal for working professionals with steady income',
      icon: 'Briefcase',
      categories: [
        { category: 'Housing', allocated: 2000, percentage: 25 },
        { category: 'Food & Dining', allocated: 600, percentage: 7.5 },
        { category: 'Transportation', allocated: 800, percentage: 10 },
        { category: 'Healthcare', allocated: 400, percentage: 5 },
        { category: 'Entertainment', allocated: 600, percentage: 7.5 },
        { category: 'Shopping', allocated: 400, percentage: 5 },
        { category: 'Travel', allocated: 800, percentage: 10 },
        { category: 'Savings', allocated: 1600, percentage: 20 },
        { category: 'Other', allocated: 800, percentage: 10 }
      ],
      totalBudget: 8000
    },
    {
      id: 'freelancer',
      name: 'Freelancer Budget',
      description: 'Flexible budget for freelancers with variable income',
      icon: 'Laptop',
      categories: [
        { category: 'Housing', allocated: 1200, percentage: 30 },
        { category: 'Food & Dining', allocated: 400, percentage: 10 },
        { category: 'Transportation', allocated: 300, percentage: 7.5 },
        { category: 'Healthcare', allocated: 300, percentage: 7.5 },
        { category: 'Education', allocated: 200, percentage: 5 },
        { category: 'Entertainment', allocated: 200, percentage: 5 },
        { category: 'Utilities', allocated: 300, percentage: 7.5 },
        { category: 'Savings', allocated: 600, percentage: 15 },
        { category: 'Other', allocated: 500, percentage: 12.5 }
      ],
      totalBudget: 4000
    }
  ];

  const categoryOptions = [
    { value: 'Housing', label: 'Housing' },
    { value: 'Food & Dining', label: 'Food & Dining' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Savings', label: 'Savings' },
    { value: 'Other', label: 'Other' }
  ];

  const periodOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleCreateFromTemplate = () => {
    if (selectedTemplate) {
      selectedTemplate?.categories?.forEach(category => {
        onCreateBudget({
          id: Date.now() + Math.random(),
          category: category?.category,
          allocated: category?.allocated,
          spent: Math.random() * category?.allocated * 0.8, // Random spent amount
          period: 'Monthly'
        });
      });
      onClose();
      setSelectedTemplate(null);
    }
  };

  const handleCreateCustom = () => {
    if (customBudget?.category && customBudget?.allocated) {
      onCreateBudget({
        id: Date.now(),
        category: customBudget?.category,
        allocated: parseFloat(customBudget?.allocated),
        spent: 0,
        period: customBudget?.period === 'monthly' ? 'Monthly' : 
               customBudget?.period === 'weekly' ? 'Weekly' : 'Yearly'
      });
      onClose();
      setCustomBudget({ category: '', allocated: '', period: 'monthly' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glassmorphic-card w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Plus" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Create New Budget</h2>
              <p className="text-sm text-foreground/60">Choose a template or create custom budget</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground hover:bg-white/10"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'templates' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-foreground/60 hover:text-foreground hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Layout" size={16} />
              <span>Templates</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'custom' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-foreground/60 hover:text-foreground hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Settings" size={16} />
              <span>Custom</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'templates' ? (
            <div className="space-y-6">
              {/* Template Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgetTemplates?.map((template) => (
                  <div
                    key={template?.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover-lift ${
                      selectedTemplate?.id === template?.id
                        ? 'border-primary bg-primary/10' :'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedTemplate?.id === template?.id
                          ? 'bg-primary/20 text-primary' :'bg-white/10 text-foreground/60'
                      }`}>
                        <Icon name={template?.icon} size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{template?.name}</h3>
                        <p className="text-sm text-foreground/60">{template?.description}</p>
                      </div>
                    </div>
                    <div className="text-sm text-foreground/80 mb-2">
                      Total Budget: <span className="font-semibold">${template?.totalBudget?.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-foreground/60">
                      {template?.categories?.length} categories included
                    </div>
                  </div>
                ))}
              </div>

              {/* Template Details */}
              {selectedTemplate && (
                <div className="glassmorphic-card p-4 animate-fade-in">
                  <h4 className="font-semibold text-foreground mb-3">Budget Breakdown</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedTemplate?.categories?.map((category, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded bg-white/5">
                        <span className="text-sm text-foreground/80">{category?.category}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium text-foreground">${category?.allocated}</div>
                          <div className="text-xs text-foreground/60">{category?.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Select
                label="Budget Category"
                placeholder="Select a category"
                options={categoryOptions}
                value={customBudget?.category}
                onChange={(value) => setCustomBudget(prev => ({ ...prev, category: value }))}
                required
              />
              
              <Input
                label="Budget Amount"
                type="number"
                placeholder="Enter amount"
                value={customBudget?.allocated}
                onChange={(e) => setCustomBudget(prev => ({ ...prev, allocated: e?.target?.value }))}
                required
              />
              
              <Select
                label="Budget Period"
                options={periodOptions}
                value={customBudget?.period}
                onChange={(value) => setCustomBudget(prev => ({ ...prev, period: value }))}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-white/10">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          {activeTab === 'templates' ? (
            <Button
              variant="default"
              onClick={handleCreateFromTemplate}
              disabled={!selectedTemplate}
            >
              Create from Template
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleCreateCustom}
              disabled={!customBudget?.category || !customBudget?.allocated}
            >
              Create Budget
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBudgetModal;