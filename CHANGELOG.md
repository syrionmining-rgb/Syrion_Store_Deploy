# Changelog - SYRION Store

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.3.1] - 2026-01-15

### 🐛 Corrigido
- **Open Graph og:image com caracteres especiais**: URL-codificado caracteres especiais (`+`) nos caminhos das imagens para corrigir problemas de preview em WhatsApp e outras plataformas de compartilhamento social
  - Alterado: `/assets/S21+.png` → `/assets/S21%2B.png`
  - Alterado: `/assets/S19PRO++.png` → `/assets/S19PRO%2B%2B.png`
  - Isso garante que social crawlers possam acessar corretamente as imagens de preview

## [1.3.0] - 2026-01-15

### ✨ Adicionado
- **Sistema Open Graph completo** com meta tags dinâmicas para compartilhamento em redes sociais (WhatsApp, Facebook, Telegram, Twitter)
- **Biblioteca react-helmet-async** para gerenciamento dinâmico de meta tags por página
- **Carousel de imagens** com autoplay (4s) para produtos S19K Pro e S19 Pro++
- **Navegação visual com dots** (bolinhas) dentro do carousel para seleção de imagens
- **Especificações técnicas expandidas** no modelo de dados:
  - Dimensões (width × height × depth em mm)
  - Peso do equipamento (em kg)
  - Nível de ruído (em dB)
- **Página de detalhes do produto** com exibição dinâmica de:
  - Galeria de imagens com carousel
  - Especificações técnicas completas
  - Cálculo de preço em USD com conversão BRL/USD em tempo real
  - ROI e lucro mensal projetado
  - Hashrate destacado próximo ao nome do produto

### 🔧 Modificado
- **Estrutura de dados (asicModels.ts)**:
  - Extensão da interface AsicModel com campos: `releaseMonth`, `dimensions`, `weight`, `noise`
  - Atualização de todos os 5 produtos com especificações completas e precisas
- **Página de Produto (Product.tsx)**:
  - Integração com Helmet para meta tags dinâmicas
  - Implementação de carousel com embla-carousel-react
  - Layout responsivo com imagem à esquerda e detalhes à direita (desktop) ou empilhados (mobile)
  - Adição de badge de conversão USD/BRL no header
  - Posicionamento de especificações técnicas com grid layout
- **Entry Point (main.tsx)**:
  - Envolvimento da aplicação com HelmetProvider para habilitar gerenciamento de meta tags
- **Estrutura Meta Tags**:
  - og:title, og:description, og:image, og:url, og:type, og:site_name
  - twitter:card, twitter:title, twitter:description, twitter:image
  - meta description padrão para SEO

### 🎨 Melhorias Visuais
- Carousel com autoplay suave (transição a cada 4 segundos)
- Dots de navegação com design minimalista (brancos com background semi-transparente preto)
- Imagens do carousel com `rounded-lg` para consistência visual
- Especificações técnicas em card com glass-panel effect
- Estilo de stats value para destaque de hashrate

### 🔗 SEO & Social Sharing
- Cada página de produto tem meta tags únicos com título, descrição e imagem específica
- Preview automático em plataformas de compartilhamento (WhatsApp, Facebook, etc.)
- URLs canonicais para produtos
- Estrutura de dados pronta para schema.org (product schema)
- Meta tags responsivos tanto para desktop quanto mobile

### 📦 Dependências Adicionadas
- `react-helmet-async@^2.0.5` - Gerenciamento de meta tags dinâmicos

### 🐛 Correções
- Garantia de que os meta tags sejam atualizados quando a página de produto é carregada
- Importação correta de imagens do carousel (S19KPRO-2.png, S19KPRO-2_1.png, S19KPRO-3.png, S19KPRO-4.png)

### 📱 Responsividade
- Carousel funcional em todos os tamanhos de tela
- Especificações técnicas em grid adaptável (1 coluna no mobile, 2 colunas no desktop)
- Imagens com `max-w-3xl` e altura máxima para manter proporção
- Navegação com dots visível em todos os breakpoints

## [1.2.0] - 2026-01-15

### ✨ Adicionado
- **Otimizações móveis** para buttons e cards de contato
- **Alinhamento aprimorado de inputs** com cursor posicionado corretamente
- **Mapeamento completo de imagens** para todos os modelos de ASIC

### 🔧 Modificado
- Botões Hero ("Modelos Disponíveis" e "Calcular Rentabilidade") com tamanho reduzido no mobile
- Inputs com `line-height: 1.5` e `vertical-align: middle` para melhor UX
- Cursor (caret) colorido com azul primário em todos os campos
- **Rótulos da Calculadora**:
  - "Receita Bruta" → "Receita Bruta /Mês"
  - "Custo de Energia" → "Custo de Energia /Mês"
  - "Consumo Mensal" → "Consumo /Mês"
- Cards de contato (WhatsApp, E-mail, Telefone) mais estreitos no mobile
- Título da seção CTA com `leading-relaxed` para melhor espaçamento
- Imagens de cards de produtos com `rounded-lg` padronizado
- Cards S19K Pro e S19 Pro++ com `rounded-3xl` especial

### 🐛 Corrigido
- Cursor flutuando abaixo do texto nos inputs (alinhamento vertical)
- Campo de Taxa da Pool preso ao valor 0 quando apagado
- Quantidade de equipamentos não permitindo exclusão
- Custo de energia não permitindo exclusão
- Importações de imagens de produtos (S19KPRO.png, S19PRO++.png, T21.png, S21+.png, S21XP.png)

### 📱 Responsividade
- Botões CTA com `max-w-xs sm:max-w-none` no mobile
- Cards de contato com `px-4 sm:px-0` padding responsivo
- Todos os inputs com alinhamento vertical consistente

## [1.1.0] - 2026-01-14

### ✨ Adicionado
- **Páginas dinâmicas de produtos** com Open Graph meta tags para preview no WhatsApp
- **Sistema de integração WhatsApp** com mensagens personalizadas por modelo
- **Links dinâmicos de produto** em todos os botões "Solicitar Cotação"
- **Proteção de conteúdo** contra cópia, seleção de texto e acesso a DevTools
- **Novo email de contato** (syrion.mining@gmail.com)
- **Novo número de telefone** (+55 51 8010-4595)
- **Rota `/produto/:id`** para exibir detalhes de cada minerador

### 🔧 Modificado
- Atualizados todos os links do WhatsApp com novo número
- Botões "Falar com Consultor" agora abrem em nova aba
- Tamanho reduzido do botão `.btn-monterey` para melhor UX
- Domínio base configurado como `syrionstore.vercel.app`

### 🛡️ Proteções Implementadas
- Bloqueio de clique direito em todo o site
- Desabilitar seleção de texto (user-select: none)
- Bloqueio de Ctrl+C, Ctrl+X, F12, Ctrl+Shift+I
- Imagens protegidas contra drag & drop
- Detecção de DevTools aberto

### 📱 Mensagens Personalizadas WhatsApp
- **Cards de modelos**: "Olá, quero fechar a compra desta [MARCA] [MODELO] - [TH/s]. Poderia me ajudar?"
- **Página de produto**: "Encontrei esse modelo [MARCA] [MODELO] - [TH/s] e quero fechar uma compra. Pode me ajudar?"
- Ambas incluem link do produto para preview no WhatsApp

### 📊 Open Graph Tags
- Títulos dinâmicos com marca e modelo
- Descrições com especificações técnicas
- Imagens do produto
- URLs corretas para cada produto

## [1.0.0] - 2026-01-14

### ✨ Inicial
- Estrutura base do projeto
- Componentes principais (Hero, Models, Calculator, CTA, FAQ, Footer)
- Design com tema Monterey Dark
- Integração com APIs de Bitcoin
- Calculadora de rentabilidade
- Comparação de modelos
- FAQ com acordeons

---

## Como Usar Este Changelog

- **Adicionado** para novos recursos
- **Modificado** para mudanças em funcionalidades existentes
- **Removido** para recursos removidos
- **Corrigido** para correções de bugs
- **Protegido** para mudanças de segurança
