import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface PriceData {
  date: string;
  price: number;
}

export const BTCPriceChart = () => {
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPriceHistory();
  }, []);

  const fetchPriceHistory = async () => {
    try {
      // CoinGecko API - histórico de 90 dias
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=90&interval=daily'
      );
      
      if (!response.ok) {
        throw new Error('Falha ao buscar histórico de preços');
      }

      const data = await response.json();
      
      // Formata dados para o gráfico
      const formattedData: PriceData[] = data.prices.map((item: [number, number]) => ({
        date: new Date(item[0]).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        price: Math.round(item[1])
      }));

      setPriceHistory(formattedData);
    } catch (error) {
      console.error('Erro ao buscar histórico de preços:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="glass-panel p-4 mt-4">
        <p className="text-xs text-muted-foreground text-center">Carregando histórico...</p>
      </div>
    );
  }

  if (priceHistory.length === 0) {
    return null;
  }

  return (
    <div className="glass-panel p-4 mt-4">
      <h5 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
        90 dias BTC/USD:
      </h5>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={priceHistory} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10, fill: '#888' }}
            interval="preserveStartEnd"
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#888' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            domain={['dataMin - 1000', 'dataMax + 1000']}
            width={45}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.8)', 
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'BTC']}
            labelStyle={{ color: '#888' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#3b82f6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
