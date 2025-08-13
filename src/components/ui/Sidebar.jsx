import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/', 
      icon: 'LayoutDashboard',
      description: 'Overview and summary'
    },
    { 
      label: 'Transactions', 
      path: '/transactions', 
      icon: 'Receipt',
      description: 'Manage expenses and income'
    },
    { 
      label: 'Budgets', 
      path: '/budgets', 
      icon: 'PiggyBank',
      description: 'Set and track spending limits'
    },
    { 
      label: 'Goals', 
      path: '/goals', 
      icon: 'Target',
      description: 'Savings and financial targets'
    },
    { 
      label: 'Reports', 
      path: '/reports', 
      icon: 'BarChart3',
      description: 'Analytics and insights'
    },
    { 
      label: 'Bill Calendar', 
      path: '/bills', 
      icon: 'Calendar',
      description: 'Recurring payments schedule'
    }
  ];

  const secondaryItems = [
    { 
      label: 'Settings', 
      path: '/settings', 
      icon: 'Settings',
      description: 'App preferences'
    },
    { 
      label: 'Help & Support', 
      path: '/help', 
      icon: 'HelpCircle',
      description: 'Get assistance'
    }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-80 z-50 lg:z-30
        glassmorphic-nav border-r border-white/20
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:fixed
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Icon name="DollarSign" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">BudgetFlow</h1>
                <p className="text-xs text-foreground/60">Personal Finance</p>
              </div>
            </div>
            
            {/* Close button for mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden text-foreground/60 hover:text-foreground hover:bg-white/10"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {/* Main Navigation */}
            <div className="space-y-1">
              {navigationItems?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
                      transition-all duration-200 hover-lift group
                      ${isActive 
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/20 shadow-sm' 
                        : 'text-foreground/80 hover:text-foreground hover:bg-white/10'
                      }
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200
                      ${isActive 
                        ? 'bg-primary/20 text-primary' :'bg-white/5 text-foreground/60 group-hover:bg-white/10 group-hover:text-foreground'
                      }
                    `}>
                      <Icon name={item?.icon} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item?.label}</p>
                      <p className="text-xs text-foreground/50 truncate">{item?.description}</p>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse-gentle" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-white/10" />

            {/* Secondary Navigation */}
            <div className="space-y-1">
              <p className="px-4 text-xs font-medium text-foreground/40 uppercase tracking-wider mb-3">
                Account
              </p>
              {secondaryItems?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
                      transition-all duration-200 hover-lift group
                      ${isActive 
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/20' :'text-foreground/80 hover:text-foreground hover:bg-white/10'
                      }
                    `}
                  >
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200
                      ${isActive 
                        ? 'bg-primary/20 text-primary' :'bg-white/5 text-foreground/60 group-hover:bg-white/10 group-hover:text-foreground'
                      }
                    `}>
                      <Icon name={item?.icon} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item?.label}</p>
                      <p className="text-xs text-foreground/50 truncate">{item?.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="glassmorphic-card p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                  <p className="text-xs text-foreground/60 truncate">Premium Account</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-foreground/60">
                <span>Storage Used</span>
                <span>2.1 GB / 5 GB</span>
              </div>
              <div className="mt-2 w-full bg-white/10 rounded-full h-1.5">
                <div className="gradient-progress h-1.5 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;