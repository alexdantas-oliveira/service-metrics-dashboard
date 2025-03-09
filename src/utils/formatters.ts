
/**
 * Format a number as currency (BRL)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Format a date string (YYYY-MM-DD) to localized format (DD/MM/YYYY)
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

/**
 * Get a human-readable status label
 */
export const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    active: 'Ativo',
    canceled: 'Cancelado',
    reduced: 'Reduzido',
    blocked: 'Bloqueado',
    suspended: 'Suspenso',
    negotiation: 'Em Negociação',
    negative: 'Negativado',
  };
  
  return statusMap[status] || status;
};

/**
 * Get time period options for the filter
 */
export const getTimePeriodOptions = () => [
  { value: '7d', label: 'Últimos 7 dias' },
  { value: '30d', label: 'Últimos 30 dias' },
  { value: '90d', label: 'Últimos 90 dias' },
  { value: '6m', label: 'Últimos 6 meses' },
  { value: '1y', label: 'Último ano' },
  { value: 'custom', label: 'Personalizado' },
];
