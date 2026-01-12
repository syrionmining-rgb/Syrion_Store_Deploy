import { Check, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { asicModels } from "@/data/asicModels";
import { getBitcoinData, type BitcoinData } from "@/services/bitcoinApi";
import { calculateMining, calculateROI } from "@/services/miningCalculator";
import { DEFAULT_ENERGY_COST, DEFAULT_POOL_FEE } from "@/constants/mining";

const ComparisonTable = () => {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBitcoinData();
  }, []);

  const loadBitcoinData = async () => {
    try {
      const data = await getBitcoinData();
      setBitcoinData(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section id="comparativo" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="comparativo" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comparativo <span className="gradient-text">Técnico</span>
          </h2>
          <p className="text-muted-foreground">
            Compare as especificações técnicas de todos os modelos disponíveis 
            e escolha o ideal para sua operação.
          </p>
        </div>

        {/* Table */}
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 md:p-6 text-sm font-semibold text-muted-foreground">
                    Modelo
                  </th>
                  <th className="text-center p-4 md:p-6 text-sm font-semibold text-muted-foreground">
                    Hashrate
                  </th>
                  <th className="text-center p-4 md:p-6 text-sm font-semibold text-muted-foreground">
                    Consumo
                  </th>
                  <th className="text-center p-4 md:p-6 text-sm font-semibold text-muted-foreground">
                    Eficiência
                  </th>
                  <th className="text-center p-4 md:p-6 text-sm font-semibold text-muted-foreground">
                    Lucro/dia*
                  </th>
                  <th className="text-center p-4 md:p-6 text-sm font-semibold text-muted-foreground">
                    Preço
                  </th>
                  <th className="text-center p-4 md:p-6 text-sm font-semibold text-muted-foreground hidden md:table-cell">
                    ROI Est.
                  </th>
                </tr>
              </thead>
              <tbody>
                {bitcoinData && asicModels.map((model, index) => {
                  // Calcula usando metodologia WhatToMine (mesma da calculadora)
                  const miningResults = calculateMining({
                    hashrateTHs: model.hashrate,
                    powerWatts: model.power,
                    energyCostKWh: DEFAULT_ENERGY_COST,
                    poolFee: DEFAULT_POOL_FEE,
                    btcPrice: bitcoinData.price,
                    difficulty: bitcoinData.difficulty,
                    blockReward: bitcoinData.blockReward,
                  });
                  
                  // Converte preço BRL para USD para ROI
                  const priceUSD = model.price / bitcoinData.usdToBrl;
                  const roiDays = calculateROI(priceUSD, miningResults.profitDay);
                  
                  return (
                    <tr
                      key={model.id}
                      className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                        model.featured ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="p-4 md:p-6">
                        <div className="flex items-center gap-3">
                          {model.featured && (
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          )}
                          <div>
                            <p className="font-semibold text-foreground">{model.name}</p>
                            <p className="text-xs text-muted-foreground">{model.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 md:p-6 text-center">
                        <span className="font-bold gradient-text">{model.hashrate} TH/s</span>
                      </td>
                      <td className="p-4 md:p-6 text-center text-foreground">
                        {model.power}W
                      </td>
                      <td className="p-4 md:p-6 text-center">
                        <span className={`font-semibold ${
                          model.efficiency > 19 ? "text-foreground" : 
                          model.efficiency >= 16 ? "text-green-400" : "text-blue-400"
                        }`}>
                          {model.efficiency} J/TH
                        </span>
                      </td>
                      <td className="p-4 md:p-6 text-center">
                        <span className="font-semibold text-green-400">
                          ${miningResults.profitDay.toFixed(2)}
                        </span>
                      </td>
                      <td className="p-4 md:p-6 text-center font-semibold text-foreground">
                        R$ {model.price.toLocaleString('pt-BR')}
                      </td>
                      <td className="p-4 md:p-6 text-center hidden md:table-cell">
                        <span className="text-muted-foreground">
                          {roiDays === Infinity ? '∞' : `~${roiDays} dias`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-border space-y-2">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <span>BTC/USD: ${bitcoinData?.price.toLocaleString()}</span>
              <span>•</span>
              <span>Dificuldade: {bitcoinData ? (bitcoinData.difficulty / 1e12).toFixed(2) : '0'}T</span>
              <span>•</span>
              <span>Block Reward: {bitcoinData?.blockReward} BTC</span>
              <span>•</span>
              <span>USD/BRL: R$ {bitcoinData?.usdToBrl.toFixed(2)}</span>
              <span>•</span>
              <span>Energia: $0.05/kWh</span>
              <span>•</span>
              <span>Pool Fee: 1%</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              *Resultados estimados com base em dados em tempo real da rede Bitcoin e sujeitos a variações de mercado, rede e custo de energia. Não constituem garantia de rentabilidade ou retorno financeiro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
