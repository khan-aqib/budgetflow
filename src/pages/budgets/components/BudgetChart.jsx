import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const BudgetChart = ({ budgets, viewType }) => {
  const chartData = budgets?.map((budget, index) => ({
    name: budget?.category,
    value: budget?.allocated,
    spent: budget?.spent,
    color: getColorByIndex(index)
  }));

  function getColorByIndex(index) {
    const colors = [
      '#6366F1', // indigo
      '#8B5CF6', // violet
      '#06B6D4', // cyan
      '#10B981', // emerald
      '#F59E0B', // amber
      '#EF4444', // red
      '#EC4899', // pink
      '#84CC16', // lime
      '#F97316', // orange
      '#6B7280'  // gray
    ];
    return colors?.[index % colors?.length];
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      const spentPercentage = data?.value > 0 ? (data?.spent / data?.value) * 100 : 0;
      
      return (
        <div className="glassmorphic-card p-3 border border-white/20 rounded-lg shadow-lg">
          <p className="font-medium text-foreground mb-2">{data?.name}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground/60">Allocated:</span>
              <span className="text-foreground font-medium">${data?.value?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Spent:</span>
              <span className="text-foreground font-medium">${data?.spent?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/60">Used:</span>
              <span className="text-foreground font-medium">{spentPercentage?.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry?.color }}
            />
            <span className="text-sm text-foreground/80">{entry?.value}</span>
          </div>
        ))}
      </div>
    );
  };

  if (budgets?.length === 0) {
    return (
      <div className="glassmorphic-card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No Budget Data</h3>
        <p className="text-foreground/60">Create your first budget to see spending distribution</p>
      </div>
    );
  }

  return (
    <div className="glassmorphic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Budget Distribution</h3>
          <p className="text-sm text-foreground/60">
            {viewType === 'monthly' ? 'Monthly' : 'Yearly'} allocation breakdown
          </p>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-center p-4 rounded-lg bg-white/5">
          <p className="text-sm text-foreground/60 mb-1">Total Categories</p>
          <p className="text-2xl font-bold text-foreground">{budgets?.length}</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-white/5">
          <p className="text-sm text-foreground/60 mb-1">Avg. Utilization</p>
          <p className="text-2xl font-bold text-foreground">
            {budgets?.length > 0 
              ? (budgets?.reduce((acc, budget) => acc + (budget?.spent / budget?.allocated * 100), 0) / budgets?.length)?.toFixed(1)
              : 0
            }%
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetChart;