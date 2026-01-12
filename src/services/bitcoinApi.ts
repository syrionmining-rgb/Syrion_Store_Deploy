/**
 * Bitcoin API Service
 * Busca dados públicos de preço BTC e dificuldade da rede
 */

import { API_CACHE_DURATION, CACHE_KEY } from '@/constants/mining';

export interface BitcoinData {
  price: number; // Preço BTC em USD
  difficulty: number; // Dificuldade atual da rede
  blockReward: number; // Recompensa por bloco em BTC
  usdToBrl: number; // Cotação USD para BRL em tempo real
  timestamp: number; // Timestamp da última atualização
}

/**
 * Busca o preço atual do Bitcoin em USD
 * Fonte: Blockchain.info API (pública com CORS)
 */
async function fetchBitcoinPrice(): Promise<number> {
  try {
    const response = await fetch(
      'https://blockchain.info/ticker'
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.USD.last;
  } catch (error) {
    console.error('Erro ao buscar preço BTC:', error);
    // Fallback: preço aproximado
    return 95000;
  }
}

/**
 * Busca a dificuldade atual da rede Bitcoin
 * Fonte: Blockchain.info API (pública com CORS)
 */
async function fetchNetworkDifficulty(): Promise<number> {
  try {
    const response = await fetch('https://blockchain.info/q/getdifficulty');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const difficulty = await response.text();
    return parseFloat(difficulty);
  } catch (error) {
    console.error('Erro ao buscar dificuldade da rede:', error);
    
    // Tenta API alternativa
    try {
      const response2 = await fetch('https://blockstream.info/api/blocks/tip/height');
      if (response2.ok) {
        // Se conseguimos height, usa fallback recente
        return 146472570619931; // ~146T
      }
    } catch (e) {
      console.error('API alternativa também falhou:', e);
    }
    
    // Fallback: dificuldade aproximada atualizada (Janeiro 2026)
    return 146472570619931; // ~146T
  }
}

/**
 * Busca o Block Reward atual da rede Bitcoin
 * Fonte: Blockchain.info API
 */
async function fetchBlockReward(): Promise<number> {
  try {
    const response = await fetch('https://blockchain.info/q/bcperblock');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const reward = await response.text();
    return parseFloat(reward);
  } catch (error) {
    console.error('Erro ao buscar block reward:', error);
    // Fallback: reward pós-halving 2024
    return 3.125;
  }
}

/**
 * Busca a cotação atual USD para BRL em tempo real
 * Fonte: AwesomeAPI (Brasil, dados do mercado)
 */
async function fetchUsdToBrl(): Promise<number> {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const rate = parseFloat(data.USDBRL.bid);
    return rate;
  } catch (error) {
    console.error('Erro ao buscar cotação USD/BRL:', error);
    // Fallback: cotação aproximada
    return 5.85;
  }
}

/**
 * Busca todos os dados necessários do Bitcoin
 * Com cache de 2 minutos para reduzir chamadas de API
 * Cache compartilhado via localStorage entre tabs/janelas
 */

function getCachedData(): BitcoinData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const data = JSON.parse(cached) as BitcoinData;
    const now = Date.now();
    
    // Verifica se cache ainda é válido
    if (now - data.timestamp < API_CACHE_DURATION) {
      return data;
    }
    
    return null;
  } catch (error) {
    // Se houver erro ao ler localStorage, ignora
    return null;
  }
}

function setCachedData(data: BitcoinData): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    // Se houver erro ao salvar (quota excedida, etc), continua sem cache
    console.warn('Não foi possível salvar cache:', error);
  }
}

export async function getBitcoinData(): Promise<BitcoinData> {
  const now = Date.now();
  
  // Verifica cache do localStorage
  const cached = getCachedData();
  if (cached) {
    return cached;
  }
  
  try {
    // Busca dados em paralelo
    const [price, difficulty, blockReward, usdToBrl] = await Promise.all([
      fetchBitcoinPrice(),
      fetchNetworkDifficulty(),
      fetchBlockReward(),
      fetchUsdToBrl(),
    ]);
    
    const data: BitcoinData = {
      price,
      difficulty,
      blockReward,
      usdToBrl,
      timestamp: now,
    };
    
    // Salva no cache
    setCachedData(data);
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do Bitcoin:', error);
    
    // Tenta retornar cache antigo mesmo que expirado
    const oldCache = getCachedData();
    if (oldCache) {
      return oldCache;
    }
    
    // Fallback completo
    return {
      price: 95000,
      difficulty: 146472570619931, // ~146T (atualizado Jan 2026)
      blockReward: 3.125, // Pós-halving 2024
      usdToBrl: 5.85,
      timestamp: now,
    };
  }
}

/**
 * Limpa o cache (útil para forçar atualização)
 */
export function clearCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.warn('Não foi possível limpar cache:', error);
  }
}
