
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
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
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value} serviços`, '']}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                name="Quantidade" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.status as keyof typeof COLORS]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusOverviewCard;
