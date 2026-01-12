/**
 * Constantes de mineração usadas em todo o projeto
 */

// Custos e taxas padrão
export const DEFAULT_ENERGY_COST = 0.05; // USD/kWh
export const DEFAULT_POOL_FEE = 1; // 1%

// Cache
export const API_CACHE_DURATION = 2 * 60 * 1000; // 2 minutos
export const CACHE_KEY = 'bitcoin_data_cache';

// Horário de atendimento
export const BUSINESS_HOURS = {
  startDay: 1, // Segunda-feira
  endDay: 5,   // Sexta-feira
  startHour: 9,
  endHour: 18,
} as const;
