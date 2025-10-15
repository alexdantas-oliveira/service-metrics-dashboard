
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { DailyServiceTrend } from '@/utils/mockData';
import { formatDate, getStatusLabel } from '@/utils/formatters';

interface ServiceTrendChartProps {
  data: DailyServiceTrend[];
}

// Cores dos status (mesmas do StatusOverviewCard)
const STATUS_COLORS = {
  active: "#10B981",
  canceled: "#EF4444",
  reduced: "#F59E0B",
  blocked: "#6B7280",
  suspended: "#8B5CF6",
  negotiation: "#3B82F6",
  negative: "#DC2626",
  overdue: "#FB923C",
};

const ServiceTrendChart: React.FC<ServiceTrendChartProps> = ({ data }) => {
  // Format the data for display
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date)
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Evolução dos Serviços</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value, index) => {
                  // Only show every 5th label to avoid overcrowding
                  return index % 5 === 0 ? value : '';
                }}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(label) => `Data: ${label}`}
                formatter={(value: number, name: string) => [value, getStatusLabel(name as any)]}
              />
              <Legend 
                formatter={(value) => getStatusLabel(value as any)}
                wrapperStyle={{ paddingTop: '20px' }}
              />
              
              <Line
                type="monotone"
                dataKey="active"
                stroke={STATUS_COLORS.active}
                strokeWidth={2}
                dot={false}
                name="active"
              />
              <Line
                type="monotone"
                dataKey="canceled"
                stroke={STATUS_COLORS.canceled}
                strokeWidth={2}
                dot={false}
                name="canceled"
              />
              <Line
                type="monotone"
                dataKey="reduced"
                stroke={STATUS_COLORS.reduced}
                strokeWidth={2}
                dot={false}
                name="reduced"
              />
              <Line
                type="monotone"
                dataKey="blocked"
                stroke={STATUS_COLORS.blocked}
                strokeWidth={2}
                dot={false}
                name="blocked"
              />
              <Line
                type="monotone"
                dataKey="suspended"
                stroke={STATUS_COLORS.suspended}
                strokeWidth={2}
                dot={false}
                name="suspended"
              />
              <Line
                type="monotone"
                dataKey="negotiation"
                stroke={STATUS_COLORS.negotiation}
                strokeWidth={2}
                dot={false}
                name="negotiation"
              />
              <Line
                type="monotone"
                dataKey="negative"
                stroke={STATUS_COLORS.negative}
                strokeWidth={2}
                dot={false}
                name="negative"
              />
              <Line
                type="monotone"
                dataKey="overdue"
                stroke={STATUS_COLORS.overdue}
                strokeWidth={2}
                dot={false}
                name="overdue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTrendChart;
