import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();

  const routeMap = {
    '/': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/transactions': { label: 'Transactions', icon: 'Receipt' },
    '/budgets': { label: 'Budgets', icon: 'PiggyBank' },
    '/goals': { label: 'Goals', icon: 'Target' },
    '/reports': { label: 'Reports', icon: 'BarChart3' },
    '/bills': { label: 'Bill Calendar', icon: 'Calendar' },
    '/settings': { label: 'Settings', icon: 'Settings' },
    '/help': { label: 'Help & Support', icon: 'HelpCircle' }
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Dashboard', path: '/', icon: 'LayoutDashboard' }];

    if (pathSegments?.length === 0) return breadcrumbs;

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const route = routeMap?.[currentPath];
      
      if (route) {
        breadcrumbs?.push({
          label: route?.label,
          path: currentPath,
          icon: route?.icon,
          isLast: index === pathSegments?.length - 1
        });
      } else {
        // Handle dynamic segments or unknown routes
        const formattedLabel = segment?.charAt(0)?.toUpperCase() + segment?.slice(1)?.replace(/-/g, ' ');
        breadcrumbs?.push({
          label: formattedLabel,
          path: currentPath,
          icon: 'FileText',
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on dashboard
  if (location?.pathname === '/' && !customItems) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-foreground/60 mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((item, index) => (
          <li key={item?.path} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-foreground/40" 
              />
            )}
            
            {item?.isLast ? (
              <div className="flex items-center space-x-2 text-foreground font-medium">
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </div>
            ) : (
              <a
                href={item?.path}
                className="flex items-center space-x-2 hover:text-foreground transition-colors duration-200 hover:underline"
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;