/**
 * Mining Calculator Service
 * Implementa a metodologia exata do WhatToMine para cálculo de rentabilidade ASIC
 */

export interface MiningInputs {
  hashrateTHs: number;      // Hashrate em TH/s
  powerWatts: number;        // Consumo em Watts
  energyCostKWh: number;     // Custo de energia por kWh
  poolFee?: number;          // Taxa da pool (%) - opcional
  btcPrice: number;          // Preço do BTC em USD
  difficulty: number;        // Dificuldade atual da rede
  blockReward: number;       // Recompensa por bloco em BTC
}

export interface MiningResults {
  btcPerDay: number;         // BTC minerado por dia
  revenueDay: number;        // Receita diária (USD)
  revenueMonth: number;      // Receita mensal (USD)
  energyKWhDay: number;      // Consumo energético diário (kWh)
  energyCostDay: number;     // Custo energético diário (USD)
  energyCostMonth: number;   // Custo energético mensal (USD)
  profitDay: number;         // Lucro diário (USD)
  profitMonth: number;       // Lucro mensal (USD)
  profitYear: number;        // Lucro anual (USD)
}

// CONSTANTES DA REDE BITCOIN
const BLOCKS_PER_DAY = 144;           // Blocos minerados por dia
const MINING_CONSTANT = Math.pow(2, 32); // 2^32

/**
 * Calcula rentabilidade de mineração seguindo metodologia WhatToMine
 * 
 * Fórmula:
 * 1. Converter hashrate para H/s: TH/s * 10^12
 * 2. Probabilidade de bloco: hashrate_hs / (difficulty * 2^32)
 * 3. BTC/dia: probability * 144 * block_reward
 * 4. Receita: btc/dia * preço_btc
 * 5. Aplicar pool fee
 * 6. Subtrair custo energético
 */
export function calculateMining(inputs: MiningInputs): MiningResults {
  const {
    hashrateTHs,
    powerWatts,
    energyCostKWh,
    poolFee = 0,
    btcPrice,
    difficulty,
    blockReward
  } = inputs;

  // 1. Converter hashrate para H/s
  const hashrateHS = hashrateTHs * 1e12;

  // 2. Calcular BTC por dia usando fórmula correta do WhatToMine
  // BTC/dia = (Hashrate_H/s * 86400 segundos * Block_Reward) / (Difficulty * 2^32)
  const btcPerDay = (hashrateHS * 86400 * blockReward) / (difficulty * MINING_CONSTANT);

  // 3. Receita diária bruta (USD)
  const revenueDayGross = btcPerDay * btcPrice;

  // 4. Aplicar taxa da pool
  const revenueDay = revenueDayGross * (1 - poolFee / 100);

  // 5. Calcular consumo energético diário (kWh)
  const energyKWhDay = (powerWatts * 24) / 1000;

  // 6. Calcular custo energético diário (USD)
  const energyCostDay = energyKWhDay * energyCostKWh;

  // 7. Calcular lucro diário
  const profitDay = revenueDay - energyCostDay;

  // 8. Calcular valores mensais (30 dias)
  const revenueMonth = revenueDay * 30;
  const energyCostMonth = energyCostDay * 30;
  const profitMonth = profitDay * 30;

  // 10. Calcular lucro anual (365 dias)
  const profitYear = profitDay * 365;

  return {
    btcPerDay,
    revenueDay,
    revenueMonth,
    energyKWhDay,
    energyCostDay,
    energyCostMonth,
    profitDay,
    profitMonth,
    profitYear,
  };
}

/**
 * Calcula ROI (Return on Investment) em dias
 * @param investmentUSD Investimento inicial em USD
 * @param profitPerDay Lucro diário em USD
 * @returns Número de dias para ROI, ou Infinity se lucro <= 0
 */
export function calculateROI(investmentUSD: number, profitPerDay: number): number {
  if (profitPerDay <= 0) {
    return Infinity;
  }
  return Math.round(investmentUSD / profitPerDay);
}

/**
 * Formata BTC com precisão adequada
 */
export function formatBTC(btc: number): string {
  return btc.toFixed(8);
}

/**
 * Formata valores monetários
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency === 'BRL' ? 'BRL' : 'USD',
  }).format(value);
}
