
import React, { useState } from 'react';
import Header from '@/components/Dashboard/Header';
import MetricCard from '@/components/Dashboard/MetricCard';
import StatusOverviewCard from '@/components/Dashboard/StatusOverviewCard';
import ServiceTrendChart from '@/components/Dashboard/ServiceTrendChart';
import ClientsTable from '@/components/Dashboard/ClientsTable';
import { mockClients, mockMetrics, mockServiceTrends, mockFinancialMetrics } from '@/utils/mockData';
import { formatCurrency } from '@/utils/formatters';
import { 
  CircleDollarSign, 
  TrendingUp, 
  UserPlus,
  Wallet
} from 'lucide-react';

const Index = () => {
  const [period, setPeriod] = useState('30d');
  
  // Calculate clients in good standing (active status)
  const clientsInGoodStanding = mockClients.filter(client => client.status === 'active').length;
  
  // Calculate clients with overdue payments but not blocked
  const clientsOverdueNotBlocked = mockClients.filter(client => {
    const today = new Date();
    const dueDate = new Date(client.dueDate);
    return dueDate < today && client.status !== 'blocked' && client.status !== 'suspended';
  }).length;

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <Header onPeriodChange={setPeriod} />
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Situação Financeira</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="MRR" 
            value={formatCurrency(mockFinancialMetrics.mrr)} 
            description="Receita Recorrente Mensal"
            icon={<CircleDollarSign />}
            className="border-l-4 border-l-green-500"
            trend={{ value: 8.5, isPositive: true }}
          />
          
          <MetricCard 
            title="Margem EBITDA" 
            value={`${mockFinancialMetrics.ebitdaMargin}%`} 
            description="Rentabilidade operacional"
            icon={<TrendingUp />}
            className="border-l-4 border-l-blue-500"
            trend={{ value: 3.2, isPositive: true }}
          />
          
          <MetricCard 
            title="CAC" 
            value={formatCurrency(mockFinancialMetrics.cac)} 
            description="Custo de Aquisição de Cliente"
            icon={<UserPlus />}
            className="border-l-4 border-l-yellow-500"
            trend={{ value: 5.1, isPositive: false }}
          />
          
          <MetricCard 
            title="Fluxo de Caixa Operacional" 
            value={formatCurrency(mockFinancialMetrics.operationalCashFlow)} 
            description="Geração de caixa mensal"
            icon={<Wallet />}
            className="border-l-4 border-l-purple-500"
            trend={{ value: 12.3, isPositive: true }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <StatusOverviewCard metrics={mockMetrics} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <ServiceTrendChart data={mockServiceTrends} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ClientsTable clients={mockClients} />
      </div>
    </div>
  );
};

export default Index;
