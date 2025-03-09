
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { DailyServiceTrend } from '@/utils/mockData';
import { formatDate } from '@/utils/formatters';

interface ServiceTrendChartProps {
  data: DailyServiceTrend[];
}

const ServiceTrendChart: React.FC<ServiceTrendChartProps> = ({ data }) => {
  // Format the data for display
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date)
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Evolução de Serviços Ativos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
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
                formatter={(value: number) => [`${value} serviços ativos`, '']}
              />
              <Line
                type="monotone"
                dataKey="activeCount"
                stroke="#3B82F6"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Serviços Ativos"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTrendChart;
