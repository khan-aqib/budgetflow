import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import BudgetOverviewCard from './components/BudgetOverviewCard';
import BudgetCard from './components/BudgetCard';
import CreateBudgetModal from './components/CreateBudgetModal';
import BudgetChart from './components/BudgetChart';
import QuickActionsPanel from './components/QuickActionsPanel';
import BudgetAlerts from './components/BudgetAlerts';

const BudgetsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewType, setViewType] = useState('monthly');
  const [budgets, setBudgets] = useState([]);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  // Initialize with mock budget data
  useEffect(() => {
    const mockBudgets = [
      {
        id: 1,
        category: 'Housing',
        allocated: 2000,
        spent: 1850,
        period: 'Monthly'
      },
      {
        id: 2,
        category: 'Food & Dining',
        allocated: 600,
        spent: 425,
        period: 'Monthly'
      },
      {
        id: 3,
        category: 'Transportation',
        allocated: 400,
        spent: 380,
        period: 'Monthly'
      },
      {
        id: 4,
        category: 'Entertainment',
        allocated: 300,
        spent: 150,
        period: 'Monthly'
      },
      {
        id: 5,
        category: 'Shopping',
        allocated: 250,
        spent: 320,
        period: 'Monthly'
      },
      {
        id: 6,
        category: 'Healthcare',
        allocated: 200,
        spent: 75,
        period: 'Monthly'
      }
    ];
    setBudgets(mockBudgets);
  }, []);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleCreateBudget = (newBudget) => {
    setBudgets(prev => [...prev, newBudget]);
  };

  const handleEditBudget = (budget) => {
    // In a real app, this would open an edit modal
    console.log('Edit budget:', budget);
  };

  const handleDeleteBudget = (budgetToDelete) => {
    if (window.confirm(`Are you sure you want to delete the ${budgetToDelete?.category} budget?`)) {
      setBudgets(prev => prev?.filter(budget => budget?.id !== budgetToDelete?.id));
    }
  };

  const handleBulkAdjust = (adjustment) => {
    setBudgets(prev => prev?.map(budget => {
      let newAllocated = budget?.allocated;
      if (adjustment?.type === 'percentage') {
        newAllocated = budget?.allocated * (1 + adjustment?.value / 100);
      } else {
        newAllocated = budget?.allocated + adjustment?.value;
      }
      return {
        ...budget,
        allocated: Math.max(0, newAllocated)
      };
    }));
  };

  const handleApplyTemplate = () => {
    setIsCreateModalOpen(true);
  };

  const handleExportReport = () => {
    // In a real app, this would generate and download a PDF report
    alert('Budget report exported successfully!');
  };

  const handleDismissAlert = (alertId) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const handleViewDetails = (budget) => {
    // In a real app, this would navigate to budget details or open a modal
    console.log('View budget details:', budget);
  };

  // Calculate totals
  const totalAllocated = budgets?.reduce((sum, budget) => sum + budget?.allocated, 0);
  const totalSpent = budgets?.reduce((sum, budget) => sum + budget?.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  // Filter out dismissed alerts
  const activeBudgets = budgets?.filter(budget => {
    const spentPercentage = budget?.allocated > 0 ? (budget?.spent / budget?.allocated) * 100 : 0;
    const alertId = spentPercentage >= 100 ? `exceeded-${budget?.id}` : 
                   spentPercentage >= 90 ? `warning-${budget?.id}` : 
                   spentPercentage >= 75 ? `caution-${budget?.id}` : null;
    return !alertId || !dismissedAlerts?.includes(alertId);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <main className="lg:ml-80 pt-16 lg:pt-16">
        <div className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Budget Management</h1>
                <p className="text-foreground/60">
                  Track and manage your spending limits across different categories
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                {/* View Toggle */}
                <div className="flex items-center space-x-1 bg-white/20 rounded-lg p-1">
                  <button
                    onClick={() => setViewType('monthly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewType === 'monthly' ?'bg-white text-primary shadow-sm' :'text-foreground/60 hover:text-foreground hover:bg-white/10'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setViewType('yearly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewType === 'yearly' ?'bg-white text-primary shadow-sm' :'text-foreground/60 hover:text-foreground hover:bg-white/10'
                    }`}
                  >
                    Yearly
                  </button>
                </div>
                
                <Button
                  variant="default"
                  onClick={() => setIsCreateModalOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                  className="shadow-lg hover:shadow-xl"
                >
                  Create Budget
                </Button>
              </div>
            </div>

            {/* Budget Overview */}
            <BudgetOverviewCard
              totalAllocated={totalAllocated}
              totalSpent={totalSpent}
              totalRemaining={totalRemaining}
              budgetCount={budgets?.length}
            />

            {/* Budget Alerts */}
            <BudgetAlerts
              budgets={activeBudgets}
              onDismissAlert={handleDismissAlert}
              onViewDetails={handleViewDetails}
            />

            {/* Quick Actions Panel */}
            <QuickActionsPanel
              onBulkAdjust={handleBulkAdjust}
              onApplyTemplate={handleApplyTemplate}
              onExportReport={handleExportReport}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Budget Cards */}
              <div className="xl:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Budget Categories</h2>
                  <div className="flex items-center space-x-2 text-sm text-foreground/60">
                    <Icon name="Calendar" size={16} />
                    <span>{viewType === 'monthly' ? 'This Month' : 'This Year'}</span>
                  </div>
                </div>
                
                {budgets?.length === 0 ? (
                  <div className="glassmorphic-card p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                      <Icon name="PiggyBank" size={32} className="text-foreground/40" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No Budgets Yet</h3>
                    <p className="text-foreground/60 mb-6 max-w-md mx-auto">
                      Start managing your finances by creating your first budget. Choose from our templates or create a custom one.
                    </p>
                    <Button
                      variant="default"
                      onClick={() => setIsCreateModalOpen(true)}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Create Your First Budget
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {budgets?.map((budget) => (
                      <BudgetCard
                        key={budget?.id}
                        budget={budget}
                        onEdit={handleEditBudget}
                        onDelete={handleDeleteBudget}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Budget Chart */}
              <div className="xl:col-span-1">
                <BudgetChart budgets={budgets} viewType={viewType} />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Create Budget Modal */}
      <CreateBudgetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateBudget={handleCreateBudget}
      />
    </div>
  );
};

export default BudgetsPage;