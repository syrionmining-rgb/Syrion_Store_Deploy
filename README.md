# 🪙 Syrion Store - E-commerce de Mineradores ASIC

<div align="center">
  
  ![Bitcoin Mining](https://img.shields.io/badge/Bitcoin-Mining-orange?style=for-the-badge&logo=bitcoin)
  ![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
  ![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
  
  **Plataforma completa para venda de equipamentos de mineração Bitcoin**
  
  [Demo](https://www.syrionstore.com) · [Report Bug](https://github.com/seu-usuario/syrion-store/issues) · [Request Feature](https://github.com/seu-usuario/syrion-store/issues)

</div>

---

## 📋 Sobre o Projeto

Syrion Store é uma landing page moderna e responsiva desenvolvida para comercialização de mineradores ASIC (Application-Specific Integrated Circuit) de Bitcoin. O site oferece uma experiência completa com calculadora de rentabilidade em tempo real, comparativo técnico de equipamentos e integração com dados da rede Bitcoin.

### ✨ Principais Features

- 🔥 **Catálogo de Produtos**: 5 modelos premium (Antminer S19, S21, T21)
- 📊 **Calculadora de Rentabilidade**: Cálculos em tempo real usando metodologia WhatToMine
- 📈 **Gráfico BTC**: Histórico de preços dos últimos 90 dias
- ⚖️ **Comparativo Técnico**: Tabela comparativa de hashrate, consumo, eficiência e ROI
- 💹 **Dados em Tempo Real**: Integração com APIs públicas (Blockchain.info, CoinGecko, AwesomeAPI)
- 🕐 **Status Online**: Indicador de horário de atendimento (Segunda a Sexta, 9h-18h)
- 🌐 **Multilíngua**: Interface em Português (BR)
- 📱 **Responsivo**: Design adaptável para mobile, tablet e desktop
- ⚡ **Performance**: Build otimizado com Vite e lazy loading
- 🔒 **SEO Otimizado**: Meta tags, sitemap, robots.txt

---

## 🎯 Demo

Acesse: **[www.syrionstore.com](https://www.syrionstore.com)**

### 📸 Screenshots

<details>
<summary>Ver Screenshots</summary>

#### Hero Section
![Hero](docs/screenshots/hero.png)

#### Catálogo de Produtos
![Produtos](docs/screenshots/produtos.png)

#### Calculadora de Rentabilidade
![Calculadora](docs/screenshots/calculadora.png)

#### Comparativo Técnico
![Comparativo](docs/screenshots/comparativo.png)

</details>

---

## 🛠️ Tech Stack

### Core
- **[React 18.3](https://react.dev)** - Biblioteca JavaScript para interfaces
- **[TypeScript 5.6](https://www.typescriptlang.org)** - Superset tipado do JavaScript
- **[Vite 5.4](https://vitejs.dev)** - Build tool de próxima geração
- **[Tailwind CSS 3.4](https://tailwindcss.com)** - Framework CSS utility-first

### UI Components
- **[shadcn/ui](https://ui.shadcn.com)** - Componentes de interface reutilizáveis
- **[Radix UI](https://www.radix-ui.com)** - Primitivas de UI acessíveis
- **[Lucide React](https://lucide.dev)** - Ícones SVG modernos
- **[Recharts](https://recharts.org)** - Biblioteca de gráficos

### State & Data
- **[TanStack React Query](https://tanstack.com/query)** - Gerenciamento de estado assíncrono
- **[React Hook Form](https://react-hook-form.com)** - Gerenciamento de formulários
- **[Zod](https://zod.dev)** - Validação de schemas TypeScript

### APIs Externas
- **[Blockchain.info](https://blockchain.info)** - Preço BTC, dificuldade da rede, block reward
- **[AwesomeAPI](https://docs.awesomeapi.com.br)** - Cotação USD/BRL em tempo real
- **[CoinGecko](https://www.coingecko.com/api)** - Histórico de preços BTC (90 dias)

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** ou **yarn**

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/syrion-store.git

# 2. Entre na pasta
cd syrion-store

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em: **http://localhost:8080**

---

## 📦 Build para Produção

```bash
# Gerar build otimizado
npm run build

# Testar build localmente
npm run preview
```

Os arquivos otimizados serão gerados na pasta `dist/`.

---

## 🌐 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/syrion-store)

```bash
# Via CLI
npx vercel --prod
```

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/seu-usuario/syrion-store)

```bash
# Via CLI
npx netlify deploy --prod
```

### Outros Provedores

O projeto é compatível com qualquer serviço de hospedagem estática:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Hostinger/cPanel (veja `DEPLOY.md`)

---

## 📁 Estrutura do Projeto

```
syrion-store/
├── public/              # Arquivos estáticos
│   ├── favicon.png      # Ícone do site
│   ├── .htaccess        # Configuração Apache
│   ├── robots.txt       # SEO
│   └── sitemap.xml      # Mapa do site
├── src/
│   ├── assets/          # Recursos (imagens)
│   │   └── images/      # Logos, produtos
│   ├── components/      # Componentes React
│   │   ├── ui/          # Componentes shadcn/ui
│   │   ├── Calculator.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── CTASection.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ModelCard.tsx
│   │   └── ModelsSection.tsx
│   ├── constants/       # Constantes globais
│   │   └── mining.ts    # Configurações de mineração
│   ├── data/            # Dados estáticos
│   │   └── asicModels.ts # Especificações dos mineradores
│   ├── hooks/           # Custom React Hooks
│   ├── lib/             # Bibliotecas e configs
│   ├── pages/           # Páginas da aplicação
│   ├── services/        # Serviços e APIs
│   │   ├── bitcoinApi.ts        # Integração APIs Bitcoin
│   │   └── miningCalculator.ts  # Cálculos de rentabilidade
│   ├── utils/           # Funções utilitárias
│   │   └── formatters.ts # Formatação de valores
│   ├── App.tsx          # Componente raiz
│   └── main.tsx         # Entry point
├── index.html           # HTML principal
├── package.json         # Dependências
├── tailwind.config.ts   # Configuração Tailwind
├── tsconfig.json        # Configuração TypeScript
├── vite.config.ts       # Configuração Vite
├── vercel.json          # Configuração Vercel
├── netlify.toml         # Configuração Netlify
├── DEPLOY.md            # Guia de deploy completo
└── STRUCTURE.md         # Documentação da estrutura
```

Veja `STRUCTURE.md` para documentação detalhada da arquitetura.

---

## 🧮 Cálculos de Mineração

O projeto implementa a **metodologia WhatToMine** para cálculos precisos:

### Fórmula BTC/Dia
```typescript
BTC/dia = (Hashrate_H/s × 86400 × Block_Reward) / (Difficulty × 2^32)
```

### Parâmetros
- **Hashrate**: TH/s do equipamento
- **Consumo**: Watts
- **Custo Energia**: USD/kWh (padrão: $0.05)
- **Taxa Pool**: % (padrão: 1%)
- **Preço BTC**: Tempo real via API
- **Dificuldade**: Tempo real via API
- **Block Reward**: Tempo real via API (3.125 BTC pós-halving 2024)

### Cache
- Duração: 2 minutos
- Armazenamento: localStorage (compartilhado entre tabs)
- Fallback: Valores estáticos em caso de falha de API

---

## 🔧 Configurações

### Constantes de Mineração

Edite `src/constants/mining.ts`:

```typescript
export const DEFAULT_ENERGY_COST = 0.05; // USD/kWh
export const DEFAULT_POOL_FEE = 1;       // 1%
export const API_CACHE_DURATION = 120000; // 2 minutos
export const BUSINESS_HOURS = {
  startDay: 1,   // Segunda
  endDay: 5,     // Sexta
  startHour: 9,  // 9h
  endHour: 18,   // 18h
};
```

### Informações de Contato

Edite `src/components/CTASection.tsx` e `src/components/Footer.tsx`:

```typescript
// WhatsApp
href="https://wa.me/SEU_NUMERO"

// Email
href="mailto:syrion.loja@gmail.com"

// Telefone
tel:+595123456789
```

### Modelos de Mineradores

Adicione/edite equipamentos em `src/data/asicModels.ts`:

```typescript
{
  id: "novo-modelo",
  name: "Antminer S22",
  brand: "Bitmain",
  hashrate: 300,      // TH/s
  power: 3500,        // Watts
  efficiency: 11.67,  // J/TH
  algorithm: "SHA-256",
  price: 50000,       // BRL
  badge: "Lançamento",
  featured: true
}
```

---

## 🎨 Customização de Estilo

### Tailwind Config

Edite `tailwind.config.ts` para alterar cores, fontes e tema:

```typescript
theme: {
  extend: {
    colors: {
      primary: "hsl(var(--primary))",
      // Adicione suas cores
    }
  }
}
```

### CSS Global

Edite variáveis CSS em `src/index.css`:

```css
:root {
  --primary: 221 83% 53%;
  --accent: 221 83% 53%;
  /* Customize aqui */
}
```

---

## 🧪 Testes

```bash
# Executar testes (quando implementado)
npm run test

# Lint
npm run lint
```

---

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: ~200KB (gzipped)

### Otimizações Implementadas
- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Imagens otimizadas
- ✅ Cache de API (2 minutos)
- ✅ Minificação CSS/JS
- ✅ Tree shaking
- ✅ GZIP compression

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

### Padrões de Commit

- `Add:` Nova funcionalidade
- `Fix:` Correção de bug
- `Update:` Atualização de código existente
- `Refactor:` Refatoração de código
- `Docs:` Documentação

---

## 🐛 Issues & Suporte

Encontrou um bug ou tem uma sugestão?

1. Verifique se já existe uma [issue aberta](https://github.com/seu-usuario/syrion-store/issues)
2. Se não, [crie uma nova issue](https://github.com/seu-usuario/syrion-store/issues/new)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Syrion Store**

- Website: [www.syrionstore.com](https://www.syrionstore.com)
- Email: syrion.loja@gmail.com
- Localização: Ciudad del Este, Paraguay

---

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com) - Componentes de UI
- [Blockchain.info](https://blockchain.info) - API de dados Bitcoin
- [CoinGecko](https://www.coingecko.com) - API de preços
- [AwesomeAPI](https://docs.awesomeapi.com.br) - Cotação USD/BRL
- [Bitmain](https://www.bitmain.com) - Especificações dos equipamentos

---

## 📞 Contato

Para dúvidas comerciais ou suporte:

- 📧 Email: syrion.loja@gmail.com
- 📍 Endereço: Ciudad del Este, Paraguay
- 🕐 Atendimento: Segunda a Sexta, 9h às 18h

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

[![Star on GitHub](https://img.shields.io/github/stars/seu-usuario/syrion-store?style=social)](https://github.com/seu-usuario/syrion-store)

---

Feito com ❤️ e ⚡ por [Syrion Store](https://www.syrionstore.com)

</div>
