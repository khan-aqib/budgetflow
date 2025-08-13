import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetAlerts = ({ budgets, onDismissAlert, onViewDetails }) => {
  const getAlerts = () => {
    const alerts = [];
    
    budgets?.forEach(budget => {
      const spentPercentage = budget?.allocated > 0 ? (budget?.spent / budget?.allocated) * 100 : 0;
      const remaining = budget?.allocated - budget?.spent;
      
      if (spentPercentage >= 100) {
        alerts?.push({
          id: `exceeded-${budget?.id}`,
          type: 'exceeded',
          severity: 'high',
          title: `${budget?.category} Budget Exceeded`,
          message: `You've spent $${budget?.spent?.toLocaleString()} of your $${budget?.allocated?.toLocaleString()} budget`,
          suggestion: 'Consider reducing spending in this category or increasing the budget limit',
          budget: budget,
          icon: 'AlertTriangle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20'
        });
      } else if (spentPercentage >= 90) {
        alerts?.push({
          id: `warning-${budget?.id}`,
          type: 'warning',
          severity: 'medium',
          title: `${budget?.category} Budget Almost Reached`,
          message: `You've used ${spentPercentage?.toFixed(1)}% of your budget with $${remaining?.toLocaleString()} remaining`,
          suggestion: 'Monitor spending closely to avoid exceeding your budget',
          budget: budget,
          icon: 'AlertCircle',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        });
      } else if (spentPercentage >= 75) {
        alerts?.push({
          id: `caution-${budget?.id}`,
          type: 'caution',
          severity: 'low',
          title: `${budget?.category} Budget 75% Used`,
          message: `You have $${remaining?.toLocaleString()} remaining in this category`,
          suggestion: 'Good progress! Keep tracking to stay within budget',
          budget: budget,
          icon: 'Info',
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20'
        });
      }
    });
    
    return alerts?.sort((a, b) => {
      const severityOrder = { high: 3, medium: 2, low: 1 };
      return severityOrder?.[b?.severity] - severityOrder?.[a?.severity];
    });
  };

  const alerts = getAlerts();

  if (alerts?.length === 0) {
    return (
      <div className="glassmorphic-card p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-success to-accent flex items-center justify-center">
            <Icon name="CheckCircle" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">All Good!</h3>
            <p className="text-sm text-foreground/60">No budget alerts at this time</p>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
            <Icon name="TrendingUp" size={24} className="text-success" />
          </div>
          <p className="text-foreground/80">You're staying within your budget limits. Keep up the great work!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glassmorphic-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-warning to-error flex items-center justify-center">
            <Icon name="Bell" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Budget Alerts</h3>
            <p className="text-sm text-foreground/60">{alerts?.length} active alert{alerts?.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-error"></div>
            <span className="text-xs text-foreground/60">High</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-warning"></div>
            <span className="text-xs text-foreground/60">Medium</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span className="text-xs text-foreground/60">Low</span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`p-4 rounded-lg border ${alert?.bgColor} ${alert?.borderColor} transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg ${alert?.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon name={alert?.icon} size={16} className={alert?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium ${alert?.color} mb-1`}>{alert?.title}</h4>
                    <p className="text-sm text-foreground/80 mb-2">{alert?.message}</p>
                    <p className="text-xs text-foreground/60 italic">{alert?.suggestion}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(alert?.budget)}
                      className="text-foreground/60 hover:text-foreground hover:bg-white/10"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDismissAlert(alert?.id)}
                      className="text-foreground/60 hover:text-foreground hover:bg-white/10"
                    >
                      <Icon name="X" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg bg-white/5">
        <div className="flex items-center space-x-2 text-sm text-foreground/60">
          <Icon name="Lightbulb" size={16} />
          <span>Tip: Set up automatic alerts to get notified when you reach 80% of any budget</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetAlerts;