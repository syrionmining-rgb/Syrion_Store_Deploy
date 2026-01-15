import { useState, useMemo, useEffect } from "react";
import { Calculator as CalcIcon, Zap, TrendingUp, Clock, DollarSign, RefreshCw } from "lucide-react";
import { asicModels, getModelById } from "@/data/asicModels";
import { getBitcoinData, clearCache, type BitcoinData } from "@/services/bitcoinApi";
import { calculateMining, calculateROI, type MiningResults } from "@/services/miningCalculator";
import { DEFAULT_ENERGY_COST, DEFAULT_POOL_FEE } from "@/constants/mining";
import { formatCurrency, formatNumber } from "@/utils/formatters";
import { BTCPriceChart } from "./BTCPriceChart";

const Calculator = () => {
  const [selectedModelId, setSelectedModelId] = useState(asicModels[3].id); // S21+ default
  const [electricityCost, setElectricityCost] = useState(DEFAULT_ENERGY_COST);
  const [quantity, setQuantity] = useState(1);
  const [poolFee, setPoolFee] = useState(DEFAULT_POOL_FEE);
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Busca dados do Bitcoin ao montar componente
  useEffect(() => {
    loadBitcoinData();
  }, []);

  const loadBitcoinData = async (forceRefresh = false) => {
    if (forceRefresh) {
      setIsRefreshing(true);
      setIsSpinning(true);
      clearCache(); // Limpa o cache para forçar busca de dados novos
      
      // Para o spin após 1 segundo
      setTimeout(() => {
        setIsSpinning(false);
      }, 1000);
    } else {
      setIsLoading(true);
    }
    
    try {
      const data = await getBitcoinData();
      setBitcoinData(data);
      setLastUpdate(new Date(data.timestamp));
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const calculations = useMemo(() => {
    const model = getModelById(selectedModelId);
    if (!model || !bitcoinData) return null;

    const totalHashrate = model.hashrate * quantity;
    const totalPower = model.power * quantity;
    const totalPrice = model.price * quantity;
    
    // Converter preço de BRL para USD para ROI usando cotação em tempo real
    const totalPriceUSD = totalPrice / bitcoinData.usdToBrl;

    // Calcula usando metodologia WhatToMine
    const miningResults: MiningResults = calculateMining({
      hashrateTHs: totalHashrate,
      powerWatts: totalPower,
      energyCostKWh: electricityCost,
      poolFee: poolFee,
      btcPrice: bitcoinData.price,
      difficulty: bitcoinData.difficulty,
      blockReward: bitcoinData.blockReward,
    });

    const roiDays = calculateROI(totalPriceUSD, miningResults.profitDay);

    return {
      model,
      totalHashrate,
      totalPower,
      totalPrice,
      ...miningResults,
      roiDays,
    };
  }, [selectedModelId, electricityCost, quantity, poolFee, bitcoinData]);

  if (isLoading || !calculations) {
    return (
      <section id="calculadora" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-muted-foreground">Carregando dados do Bitcoin...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="calculadora" className="py-24 relative">
      <div className="absolute inset-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Calculadora de <span className="gradient-text-accent">Rentabilidade</span>
          </h2>
          <p className="text-muted-foreground">
            Simule o retorno do seu investimento com base no modelo escolhido, 
            custo de energia e quantidade de equipamentos.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="glass-panel p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                  <CalcIcon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Configurações</h3>
              </div>

              <div className="space-y-6">
                {/* Model Select */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Modelo do Minerador
                  </label>
                  <select
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    className="input-glass cursor-pointer"
                  >
                    {asicModels.map((model) => (
                      <option key={model.id} value={model.id} className="bg-monterey-surface">
                        {model.brand} {model.name} ({model.hashrate} TH/s)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Quantidade de Equipamentos
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={quantity}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue === '' || inputValue === '-') {
                        setQuantity(1);
                      } else {
                        const value = parseInt(inputValue);
                        if (!isNaN(value)) {
                          setQuantity(Math.max(1, Math.min(1000, value)));
                        }
                      }
                    }}
                    className="input-glass"
                  />
                </div>

                {/* Electricity Cost */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Custo de Energia (USD/kWh)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={electricityCost}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue === '' || inputValue === '-') {
                        setElectricityCost(0);
                      } else {
                        const value = parseFloat(inputValue);
                        if (!isNaN(value)) {
                          setElectricityCost(Math.max(0, value));
                        }
                      }
                    }}
                    className="input-glass"
                  />
                </div>

                {/* Pool Fee */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Taxa da Pool (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={poolFee}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue === '' || inputValue === '-') {
                        setPoolFee(0);
                      } else {
                        const value = parseFloat(inputValue);
                        if (!isNaN(value)) {
                          setPoolFee(Math.max(0, Math.min(10, value)));
                        }
                      }
                    }}
                    className="input-glass"
                  />
                </div>
              </div>

              {/* Bitcoin Data Info */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-muted-foreground">
                    DADOS DA REDE
                  </h4>
                  <button
                    onClick={() => loadBitcoinData(true)}
                    disabled={isRefreshing}
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSpinning ? 'animate-spin' : ''}`} />
                    Atualizar
                  </button>
                </div>
                <div className="glass-panel p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">BTC/USD:</span>
                    <span className="font-semibold">${bitcoinData.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dificuldade:</span>
                    <span className="font-semibold">{(bitcoinData.difficulty / 1e12).toFixed(2)}T</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">USD/BRL:</span>
                    <span className="font-semibold">R$ {bitcoinData.usdToBrl.toFixed(2)}</span>
                  </div>
                  {lastUpdate && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Atualizado: {lastUpdate.toLocaleTimeString('pt-BR')}
                    </p>
                  )}
                </div>
                
                {/* BTC Price Chart */}
                <BTCPriceChart />
              </div>
            </div>

            {/* Results Panel */}
            <div className="glass-panel p-6 md:p-8 glow-blue">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-xl font-bold">Resultados</h3>
              </div>

              {/* Selected Model Info */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-muted-foreground mb-4">
                  MODELO SELECIONADO
                </h4>
                <div className="glass-panel p-4">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-lg">{calculations.model.name}</p>
                    {quantity >= 2 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-foreground text-xs font-semibold border border-blue-500/30">
                        {quantity} unidades
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Hashrate</p>
                      <p className="font-semibold gradient-text">{calculations.model.hashrate} TH/s</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Consumo</p>
                      <p className="font-semibold">{calculations.model.power}W</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Eficiência</p>
                      <p className="font-semibold">{calculations.model.efficiency} J/TH</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-panel p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Hashrate Total</p>
                  <p className="text-2xl font-bold gradient-text">{calculations.totalHashrate} TH/s</p>
                </div>
                <div className="glass-panel p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Investimento</p>
                  <p className="text-2xl font-bold">R$ {calculations.totalPrice.toLocaleString('pt-BR')}</p>
                </div>
              </div>

              {/* Profit Breakdown */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 glass-panel">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-muted-foreground">Lucro Diário</span>
                  </div>
                  <span className="text-xl font-bold text-green-400">
                    ${calculations.profitDay.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 glass-panel">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-muted-foreground">Lucro Mensal</span>
                  </div>
                  <span className="text-xl font-bold text-green-400">
                    ${calculations.profitMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 glass-panel">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-muted-foreground">ROI Estimado</span>
                  </div>
                  <span className="text-xl font-bold text-accent">
                    {calculations.roiDays === Infinity ? '∞' : `~${Math.round(calculations.roiDays).toLocaleString('pt-BR')} dias`}
                  </span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="border-t border-border pt-6">
                <h4 className="text-sm font-semibold text-muted-foreground mb-4">
                  DETALHAMENTO MENSAL
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">BTC Minerado/Dia</span>
                    <span className="text-foreground">{calculations.btcPerDay.toFixed(8)} BTC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Receita Bruta /Mês</span>
                    <span className="text-foreground">${calculations.revenueMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Custo de Energia /Mês</span>
                    <span className="text-red-400">-${calculations.energyCostMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Consumo /Mês</span>
                    <span className="text-foreground">{(calculations.energyKWhDay * 30).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kWh</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa Pool ({poolFee}%)</span>
                    <span className="text-red-400">-${(calculations.revenueMonth * poolFee / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-6 text-center">
                *Resultados estimados com base em dados em tempo real da rede Bitcoin e sujeitos a variações de mercado, rede e custo de energia. Não constituem garantia de rentabilidade ou retorno financeiro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
