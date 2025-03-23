
import React from 'react';
// Importando componentes de interface do usuário para criar o cartão
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Importando componentes do Recharts para criar o gráfico de barras
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
// Importando os dados simulados para o exemplo
import { ServiceMetrics } from '@/utils/mockData';
// Importando funções auxiliares para formatação
import { getStatusLabel } from '@/utils/formatters';

// Definindo o tipo de dados que este componente vai receber
interface StatusOverviewCardProps {
  metrics: ServiceMetrics;
}

// O componente principal que mostra um resumo dos status dos serviços
const StatusOverviewCard: React.FC<StatusOverviewCardProps> = ({ metrics }) => {
  // Transformando os dados recebidos em um formato que o gráfico possa entender
  // Converte os pares chave-valor (ex: 'active': 10) em uma lista de objetos
  const data = Object.entries(metrics).map(([status, count]) => ({
    name: getStatusLabel(status), // Traduz o código do status para um texto legível (ex: 'active' -> 'Ativo')
    value: count,                 // Quantidade de serviços neste status
    status,                       // Guarda o código do status para usar nas cores
  }));
  
  // Definindo as cores para cada tipo de status
  // Cada status terá uma cor específica no gráfico para melhor visualização
  const COLORS = {
    active: "#10B981",     // verde para serviços ativos
    canceled: "#EF4444",   // vermelho para serviços cancelados
    reduced: "#F59E0B",    // âmbar para serviços reduzidos
    blocked: "#6B7280",    // cinza para serviços bloqueados
    suspended: "#8B5CF6",  // roxo para serviços suspensos
    negotiation: "#3B82F6", // azul para serviços em negociação
    negative: "#B91C1C",   // vermelho escuro para serviços negativados
  };

  // Calculando o total de serviços para mostrar porcentagens
  const total = Object.values(metrics).reduce((sum, count) => sum + count, 0);
  
  return (
    // Componente Card que envolve todo o conteúdo
    <Card className="col-span-4">
      {/* Cabeçalho do cartão com título */}
      <CardHeader>
        <CardTitle>Situação Geral dos Serviços</CardTitle>
      </CardHeader>
      {/* Conteúdo principal do cartão */}
      <CardContent>
        {/* Grade com pequenos cards mostrando cada status e sua quantidade */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-4">
          {/* Para cada tipo de status, criamos um pequeno card */}
          {Object.entries(metrics).map(([status, count]) => (
            <div key={status} className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted">
              {/* Mostra o nome do status (ex: "Ativo", "Cancelado") */}
              <div className={`status-badge status-${status} mb-2`}>
                {getStatusLabel(status)}
              </div>
              {/* Mostra o número total deste status */}
              <span className="text-2xl font-bold">{count}</span>
              {/* Mostra a porcentagem que este status representa do total */}
              <span className="text-xs text-muted-foreground">
                {((count / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>

        {/* Área do gráfico de barras */}
        <div className="h-[300px] mt-6">
          {/* Componente que faz o gráfico se ajustar ao tamanho do container */}
          <ResponsiveContainer width="100%" height="100%">
            {/* O gráfico de barras propriamente dito */}
            <BarChart
              data={data} // Os dados transformados que serão mostrados
              margin={{
                top: 5,       // Espaço em cima do gráfico
                right: 30,    // Espaço à direita
                left: 20,     // Espaço à esquerda
                bottom: 25,   // Espaço embaixo (maior para acomodar os rótulos)
              }}
            >
              {/* Grade de fundo para facilitar a leitura dos valores */}
              <CartesianGrid strokeDasharray="3 3" />
              {/* Eixo X (horizontal) mostrando os nomes dos status */}
              <XAxis 
                dataKey="name" 
                angle={-45}       // Inclina os rótulos para não se sobreporem
                textAnchor="end"  // Alinha o texto pelo final
                height={60}       // Altura para acomodar os rótulos inclinados
                tick={{ fontSize: 12 }} // Tamanho da fonte dos rótulos
              />
              {/* Eixo Y (vertical) mostrando as quantidades */}
              <YAxis />
              {/* Tooltip que aparece ao passar o mouse sobre as barras */}
              <Tooltip 
                formatter={(value: number) => [`${value} serviços`, '']} // Formata o valor (ex: "10 serviços")
                labelFormatter={(label) => `${label}`} // Formata o rótulo (nome do status)
              />
              {/* Legenda do gráfico */}
              <Legend />
              {/* A barra do gráfico que mostra os valores */}
              <Bar 
                dataKey="value"    // Qual valor dos dados será usado para a altura da barra
                name="Quantidade"  // Nome que aparece na legenda
                fill="#8884d8"     // Cor padrão (que será substituída pelas cores específicas)
                radius={[4, 4, 0, 0]} // Cantos arredondados no topo das barras
              >
                {/* Para cada item de dados, aplicamos uma cor específica baseada no status */}
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
