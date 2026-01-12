/**
 * Funções utilitárias para formatação de valores
 */

/**
 * Formata número para padrão brasileiro (pt-BR)
 * @param value - Valor numérico
 * @param decimals - Número de casas decimais (padrão: 2)
 * @returns String formatada com separadores brasileiros
 */
export function formatCurrency(value: number, decimals: number = 2): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formata número inteiro para padrão brasileiro
 * @param value - Valor numérico
 * @returns String formatada com separadores de milhar
 */
export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString('pt-BR');
}

/**
 * Verifica se está dentro do horário comercial
 * @param startDay - Dia inicial (1 = segunda)
 * @param endDay - Dia final (5 = sexta)
 * @param startHour - Hora inicial (0-23)
 * @param endHour - Hora final (0-23)
 * @returns true se estiver no horário comercial
 */
export function isBusinessHours(
  startDay: number = 1,
  endDay: number = 5,
  startHour: number = 9,
  endHour: number = 18
): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const isBusinessDay = day >= startDay && day <= endDay;
  const isBusinessHour = hour >= startHour && hour < endHour;

  return isBusinessDay && isBusinessHour;
}
