# Estrutura do Projeto - Syrion Store

## 📁 Organização de Pastas

```
src/
├── assets/              # Recursos estáticos
│   └── images/          # Imagens (logos, produtos)
├── components/          # Componentes React
│   └── ui/             # Componentes de UI (shadcn/ui)
├── constants/          # Constantes centralizadas
│   └── mining.ts       # Constantes de mineração
├── data/               # Dados e modelos
│   └── asicModels.ts   # Especificações dos mineradores
├── hooks/              # Custom React Hooks
├── lib/                # Bibliotecas e configurações
├── pages/              # Páginas da aplicação
├── services/           # Serviços e APIs
│   ├── bitcoinApi.ts   # API de dados do Bitcoin
│   └── miningCalculator.ts # Cálculos de mineração
└── utils/              # Funções utilitárias
    ├── formatters.ts   # Formatação de valores
    └── utils.ts        # Utilitários gerais
```

## 🔧 Constantes Centralizadas

**`src/constants/mining.ts`**
- `DEFAULT_ENERGY_COST`: Custo padrão de energia (0.05 USD/kWh)
- `DEFAULT_POOL_FEE`: Taxa padrão da pool (1%)
- `API_CACHE_DURATION`: Duração do cache de API (2 minutos)
- `BUSINESS_HOURS`: Horários de atendimento

## 🛠️ Utilitários

**`src/utils/formatters.ts`**
- `formatCurrency(value, decimals)`: Formata valores monetários em pt-BR
- `formatNumber(value)`: Formata números inteiros em pt-BR
- `isBusinessHours()`: Verifica se está no horário comercial

## 📦 Imports Padronizados

Todos os componentes agora utilizam imports do alias `@/`:

```typescript
import { DEFAULT_ENERGY_COST } from '@/constants/mining';
import { formatCurrency } from '@/utils/formatters';
import logo from '@/assets/images/logo.png';
```

## 🎯 Componentes Principais

- **Header**: Navegação principal
- **Hero**: Seção hero com CTAs
- **ModelsSection**: Grid de modelos de mineradores
- **Calculator**: Calculadora de rentabilidade
- **ComparisonTable**: Tabela comparativa
- **CTASection**: Seção de contato com status online
- **FAQ**: Perguntas frequentes
- **Footer**: Rodapé

## 🔄 Estado Global

- Cache de API compartilhado via `localStorage`
- Verificação de horário comercial atualizada a cada minuto
- Dados do Bitcoin em tempo real com cache de 2 minutos

## 📝 Boas Práticas Implementadas

✅ Constantes centralizadas (sem magic numbers)
✅ Funções reutilizáveis para formatação
✅ Imagens organizadas em assets
✅ Imports com aliases (@/)
✅ Cache compartilhado entre tabs
✅ Validação de inputs
✅ Cleanup de useEffect para prevenir memory leaks
✅ TypeScript com tipagem completa
