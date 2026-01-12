import { Cpu, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import type { AsicModel } from "@/data/asicModels";
import { getBitcoinData, type BitcoinData } from "@/services/bitcoinApi";
import { calculateMining } from "@/services/miningCalculator";
import { DEFAULT_POOL_FEE } from "@/constants/mining";
import { formatCurrency } from "@/utils/formatters";
import s19ProImage from "@/assets/images/S19PRO.png";
import t21Image from "@/assets/images/T21.png";
import s21xpImage from "@/assets/images/S21XP.png";

interface ModelCardProps {
  model: AsicModel;
  index: number;
}

const ModelCard = ({ model, index }: ModelCardProps) => {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);
  const [monthlyProfit, setMonthlyProfit] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    
    const loadBitcoinData = async () => {
      try {
        const data = await getBitcoinData();
        if (isMounted) {
          setBitcoinData(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Erro ao carregar dados:', error);
        }
      }
    };
    
    loadBitcoinData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (bitcoinData) {
      const miningResults = calculateMining({
        hashrateTHs: model.hashrate,
        powerWatts: model.power,
        energyCostKWh: 0, // Sem custo de energia nos cards
        poolFee: DEFAULT_POOL_FEE,
        btcPrice: bitcoinData.price,
        difficulty: bitcoinData.difficulty,
        blockReward: bitcoinData.blockReward,
      });
      setMonthlyProfit(miningResults.profitMonth);
    }
  }, [bitcoinData, model.hashrate, model.power]);

  const showImage = index === 0 || index === 1 || index === 2 || index === 3 || index === 4;
  
  const getImageForCard = () => {
    if (index === 2) return t21Image;
    if (index === 3 || index === 4) return s21xpImage;
    return s19ProImage;
  };

  return (
    <div
      className={`glass-card p-6 opacity-0 animate-fade-up stagger-${index + 1} relative overflow-visible ${
        model.featured ? "ring-1 ring-primary/30 glow-purple" : ""
      }`}
    >
      {/* Badge */}
      {model.badge && (
        <div className="absolute -top-3 left-6 z-10">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-primary to-accent text-white">
            {model.badge}
          </span>
        </div>
      )}

      {/* Product Image for first, second, third, fourth and fifth model */}
      {showImage && (
        <div className="flex items-center justify-center mb-6 mt-2 px-2">
          <img 
            src={getImageForCard()} 
            alt={model.name}
            className="w-full aspect-square object-contain rounded-lg"
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-8 mt-2">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {model.brand}
          </p>
          <h3 className="text-xl font-bold text-foreground">{model.name}</h3>
          <p className="text-xs text-muted-foreground mt-2">SHA256 | BTC/BCH/BSV</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Cpu className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass-panel p-3">
          <p className="text-xs text-muted-foreground mb-1">Hashrate</p>
          <p className="text-lg font-bold gradient-text">{model.hashrate} TH/s</p>
        </div>
        <div className="glass-panel p-3">
          <p className="text-xs text-muted-foreground mb-1">Eficiência</p>
          <p className="text-lg font-bold text-foreground">{model.efficiency} J/TH</p>
        </div>
        <div className="glass-panel p-3">
          <p className="text-xs text-muted-foreground mb-1">
            Consumo - {model.name === "Antminer T21" ? "380-415V" : "220-227V"}
          </p>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            <p className="text-lg font-bold text-foreground">{model.power}W</p>
          </div>
        </div>
        <div className="glass-panel p-3">
          <p className="text-xs text-muted-foreground mb-1">Lucro/mês*</p>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <p className="text-lg font-bold text-green-400">
              ${formatCurrency(monthlyProfit)}
            </p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">A partir de</p>
          <p className="text-3xl font-bold text-foreground">
            R$ {model.price.toLocaleString('pt-BR')}
          </p>
        </div>
        <a
          href="#contato"
          className="btn-monterey text-sm py-3 px-6 whitespace-nowrap"
        >
          Solicitar Cotação
        </a>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        *Estimativa baseada na cotação atual, valores podem variar de acordo com o mercado.
      </p>
    </div>
  );
};

export default ModelCard;
