
import React, { useState } from 'react';
import Header from '@/components/Dashboard/Header';
import MetricCard from '@/components/Dashboard/MetricCard';
import StatusOverviewCard from '@/components/Dashboard/StatusOverviewCard';
import ServiceTrendChart from '@/components/Dashboard/ServiceTrendChart';
import ClientsTable from '@/components/Dashboard/ClientsTable';
import { mockClients, mockMetrics, mockServiceTrends } from '@/utils/mockData';
import { 
  Users, 
  CheckCircle, 
  AlertCircle,
  WifiOff,
  FileWarning,
  Activity,
  BarChart4,
  MessageSquareWarning
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard 
          title="Clientes em Dia" 
          value={clientsInGoodStanding} 
          description="Clientes com pagamentos em dia"
          icon={<CheckCircle />}
          className="border-l-4 border-l-green-500"
        />
        
        <MetricCard 
          title="Clientes em Atraso" 
          value={clientsOverdueNotBlocked} 
          description="Pendência sem bloqueio"
          icon={<AlertCircle />}
          className="border-l-4 border-l-yellow-500"
          trend={{ value: 2.5, isPositive: false }}
        />
        
        <MetricCard 
          title="Serviços Ativos" 
          value={mockMetrics.active} 
          description="Total de serviços em uso"
          icon={<Activity />}
          className="border-l-4 border-l-blue-500"
          trend={{ value: 4.2, isPositive: true }}
        />
        
        <MetricCard 
          title="Serviços Bloqueados" 
          value={mockMetrics.blocked} 
          description="Por inadimplência"
          icon={<WifiOff />}
          className="border-l-4 border-l-gray-500"
        />
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
