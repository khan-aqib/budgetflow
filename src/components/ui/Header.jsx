import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
    { label: 'Transactions', path: '/transactions', icon: 'Receipt' },
    { label: 'Budgets', path: '/budgets', icon: 'PiggyBank' },
    { label: 'Goals', path: '/goals', icon: 'Target' },
    { label: 'Reports', path: '/reports', icon: 'BarChart3' }
  ];

  const moreItems = [
    { label: 'Bill Calendar', path: '/bills', icon: 'Calendar' },
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' }
  ];

  const getCurrentPageTitle = () => {
    const currentItem = [...navigationItems, ...moreItems]?.find(item => item?.path === location?.pathname);
    return currentItem?.label || 'Dashboard';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphic-nav border-b border-white/20">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Mobile Menu + Logo */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden text-foreground hover:bg-white/10"
            aria-label="Toggle navigation menu"
          >
            <Icon 
              name={isMenuOpen ? "X" : "Menu"} 
              size={24} 
              className="transition-transform duration-200" 
            />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="DollarSign" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground hidden sm:block">
              BudgetFlow
            </span>
          </div>
        </div>

        {/* Center Section - Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <a
              key={item?.path}
              href={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                location?.pathname === item?.path
                  ? 'bg-white/20 text-primary shadow-sm'
                  : 'text-foreground/80 hover:text-foreground hover:bg-white/10'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </a>
          ))}
          
          {/* More Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-foreground/80 hover:text-foreground hover:bg-white/10"
            >
              <Icon name="MoreHorizontal" size={18} />
              <span className="ml-2">More</span>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`ml-1 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} 
              />
            </Button>
            
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 glassmorphic-card border border-white/20 rounded-lg shadow-lg animate-fade-in">
                <div className="py-2">
                  {moreItems?.map((item) => (
                    <a
                      key={item?.path}
                      href={item?.path}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-white/10 transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section - User Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/80 hover:text-foreground hover:bg-white/10 relative"
          >
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-white"></span>
          </Button>

          {/* User Avatar */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-foreground/60">Premium User</p>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Page Title */}
      <div className="lg:hidden px-4 pb-3">
        <h1 className="text-lg font-semibold text-foreground">{getCurrentPageTitle()}</h1>
      </div>
    </header>
  );
};

export default Header;