
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ServiceMetrics } from '@/utils/mockData';
import { getStatusLabel } from '@/utils/formatters';

interface StatusOverviewCardProps {
  metrics: ServiceMetrics;
}

const StatusOverviewCard: React.FC<StatusOverviewCardProps> = ({ metrics }) => {
  const data = Object.entries(metrics).map(([status, count]) => ({
    name: getStatusLabel(status),
    value: count,
    status,
  }));
  
  const COLORS = {
    active: "#10B981",     // green
    canceled: "#EF4444",   // red
    reduced: "#F59E0B",    // amber
    blocked: "#6B7280",    // gray
    suspended: "#8B5CF6",  // purple
    negotiation: "#3B82F6", // blue
    negative: "#B91C1C",   // dark red
  };

  const total = Object.values(metrics).reduce((sum, count) => sum + count, 0);
  
  const renderCustomizedLabel = ({ name, percent }: any) => {
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Situação Geral dos Serviços</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-4">
          {Object.entries(metrics).map(([status, count]) => (
            <div key={status} className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted">
              <div className={`status-badge status-${status} mb-2`}>
                {getStatusLabel(status)}
              </div>
              <span className="text-2xl font-bold">{count}</span>
              <span className="text-xs text-muted-foreground">
                {((count / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>

        <div className="h-[300px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.status as keyof typeof COLORS]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} serviços`, '']}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusOverviewCard;
