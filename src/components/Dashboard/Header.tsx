
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTimePeriodOptions } from '@/utils/formatters';

interface HeaderProps {
  onPeriodChange: (period: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onPeriodChange }) => {
  const [period, setPeriod] = useState('30d');
  const periodOptions = getTimePeriodOptions();

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    onPeriodChange(value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard de Gerenciamento de Serviços</h1>
        <p className="text-muted-foreground">
          Monitore os serviços e clientes em tempo real
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Período:</span>
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            {periodOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Header;
