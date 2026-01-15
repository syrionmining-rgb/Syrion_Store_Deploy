# Changelog - SYRION Store

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

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
