
export type ServiceStatus = 
  | 'active'
  | 'canceled'
  | 'reduced'
  | 'blocked'
  | 'suspended'
  | 'negotiation'
  | 'negative';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: ServiceStatus;
  dueDate: string;
  lastPayment: string;
  amountDue: number;
  contractStart: string;
  contractEnd: string | null;
}

export interface ServiceMetrics {
  active: number;
  canceled: number;
  reduced: number;
  blocked: number;
  suspended: number;
  negotiation: number;
  negative: number;
}

export interface DailyServiceTrend {
  date: string;
  activeCount: number;
}

// Generate random clients
const statuses: ServiceStatus[] = ['active', 'canceled', 'reduced', 'blocked', 'suspended', 'negotiation', 'negative'];

const generateRandomClients = (count: number): Client[] => {
  const clients: Client[] = [];
  
  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const today = new Date();
    
    // Generate a random date within the last year
    const contractStartDate = new Date(today);
    contractStartDate.setDate(today.getDate() - Math.floor(Math.random() * 365));
    
    // Random due date within the next month
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + Math.floor(Math.random() * 30));
    
    // Last payment date within the last month
    const lastPaymentDate = new Date(today);
    lastPaymentDate.setDate(today.getDate() - Math.floor(Math.random() * 30));
    
    // Contract end date (null for active contracts)
    const contractEndDate = status === 'canceled' ? new Date(today) : null;
    if (contractEndDate) {
      contractEndDate.setDate(today.getDate() + Math.floor(Math.random() * 90));
    }
    
    clients.push({
      id: `CLI-${(1000 + i).toString()}`,
      name: `Cliente ${i + 1}`,
      email: `cliente${i + 1}@example.com`,
      phone: `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      status,
      dueDate: dueDate.toISOString().split('T')[0],
      lastPayment: lastPaymentDate.toISOString().split('T')[0],
      amountDue: Math.floor(Math.random() * 10000) / 100,
      contractStart: contractStartDate.toISOString().split('T')[0],
      contractEnd: contractEndDate ? contractEndDate.toISOString().split('T')[0] : null,
    });
  }
  
  return clients;
};

// Calculate metrics based on clients
export const calculateMetrics = (clients: Client[]): ServiceMetrics => {
  const metrics: ServiceMetrics = {
    active: 0,
    canceled: 0,
    reduced: 0,
    blocked: 0,
    suspended: 0,
    negotiation: 0,
    negative: 0,
  };
  
  clients.forEach(client => {
    metrics[client.status]++;
  });
  
  return metrics;
};

// Generate daily service trends for the last 30 days
export const generateServiceTrends = (): DailyServiceTrend[] => {
  const trends: DailyServiceTrend[] = [];
  const today = new Date();
  
  // Start with a baseline of 100 active services
  let activeCount = 100;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Randomly increase or decrease active count by 0-5
    const change = Math.floor(Math.random() * 11) - 5;
    activeCount += change;
    activeCount = Math.max(70, activeCount); // Ensure it doesn't go below 70
    
    trends.push({
      date: date.toISOString().split('T')[0],
      activeCount,
    });
  }
  
  return trends;
};

// Export mock data
export const mockClients = generateRandomClients(100);
export const mockMetrics = calculateMetrics(mockClients);
export const mockServiceTrends = generateServiceTrends();
