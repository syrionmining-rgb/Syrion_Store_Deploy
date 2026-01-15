# Changelog v1.2 - Sessão 15 de Janeiro de 2026

## Resumo das Alterações
Sessão de refinamento da interface do usuário, otimizações móveis e ajustes de layout nos cards de produtos e calculadora.

---

## 🔧 Alterações Implementadas

### 1. **Botões Hero (Hero.tsx)**
- Ajustados botões "Modelos Disponíveis" e "Calcular Rentabilidade"
- Adicionado `max-w-xs sm:max-w-none mx-auto` para deixá-los mais estreitos no mobile
- Mantido tamanho normal no desktop
- Adicionadas classes `rounded-lg border border-primary/20` para bordas consistentes

### 2. **Campos de Input - Alignamento (index.css)**
- Adicionado `line-height: 1.5` para todos inputs, textarea, select
- Adicionado `vertical-align: middle` para alinhar cursor verticalmente
- Adicionado `caret-color: hsl(210 95% 65%)` para colorir o cursor

### 3. **Componente Input Radix UI (ui/input.tsx)**
- Adicionadas classes de alinhamento ao componente reutilizável

### 4. **Calculadora - Lógica de Números (Calculator.tsx)**
- **Quantidade**: Corrigida lógica para permitir apagar e adicionar números
- **Custo de Energia**: Mesmo tratamento da lógica
- **Taxa da Pool**: Mesmo tratamento com limite máximo de 10%
- Agora permite campo vazio temporariamente antes de setar valor padrão

### 5. **Rótulos da Calculadora (Calculator.tsx)**
- "DETALHAMENTO MENSAL" → removido (revertido)
- "Receita Bruta" → "Receita Bruta /Mês"
- "Custo de Energia" → "Custo de Energia /Mês"
- "Consumo Mensal" → "Consumo /Mês"

### 6. **Imagens de Produtos**
- Atualizado mapeamento de imagens em `Product.tsx`:
  - s19k-pro → S19KPRO.png
  - s19-pro-plus-plus → S19PRO++.png
  - t21 → T21.png
  - s21-plus → S21+.png
  - s21-xp → S21XP.png

- Atualizado mapeamento em `ModelCard.tsx`:
  - Removidas importações antigas (S19PRO.png)
  - Adicionadas importações corretas para todos os modelos
  - Função `getImageForModel()` criada para mapear modelos a imagens

### 7. **Styled dos Cards de Modelos (ModelCard.tsx)**
- Adicionado `rounded-3xl` aos primeiros 2 cards (S19K Pro e S19 Pro++)
- Todas as imagens de cards com `rounded-lg` (padronizado)
- Condição `index < 2` para aplicar classe especial aos primeiros cards

### 8. **Seção CTA - "Pronto para Começar a Minerar" (CTASection.tsx)**
- Adicionado `leading-relaxed` ao h2 para aumentar espaçamento vertical
- Cards de contato (WhatsApp, E-mail, Telefone):
  - Adicionado `w-full sm:max-w-none mx-auto px-4 sm:px-0`
  - Agora ficam mais estreitos no mobile, normais no desktop

### 9. **Validação do Telefone (Verificação)**
- Confirmado que todos os 6 links do WhatsApp usam: **5551980104595**
  - Header.tsx (2 locais)
  - CTASection.tsx (2 locais)
  - ModelCard.tsx (1 local)
  - Product.tsx (1 local)

---

## 📱 Otimizações Móveis
- ✅ Botões CTA com tamanho reduzido e controlado
- ✅ Inputs com cursor alinhado corretamente
- ✅ Cards de contato mais estreitos
- ✅ Imagens com bordas arredondadas consistentes
- ✅ Título da seção CTA com espaçamento melhorado

---

## 🐛 Bugs Corrigidos
- ❌ Cursor flutuando abaixo do texto nos inputs (CORRIGIDO)
- ❌ Campo numérico preso ao valor 0 quando apagado (CORRIGIDO)
- ❌ Imagens de produtos não carregando (CORRIGIDO)

---

## 📊 Arquivos Modificados
- `src/components/Hero.tsx`
- `src/components/Calculator.tsx`
- `src/components/ModelCard.tsx`
- `src/components/CTASection.tsx`
- `src/components/ui/input.tsx`
- `src/pages/Product.tsx`
- `src/index.css`

---

## ✅ Status Final
- ✅ Desenvolvimento rodando: http://localhost:8080/
- ✅ Rede local: http://192.168.1.157:8080/
- ✅ Todos os números de telefone atualizados
- ✅ Imagens de produtos mapeadas corretamente
- ✅ Interface otimizada para mobile

---

**Versão:** 1.2  
**Data:** 15 de Janeiro de 2026  
**Desenvolvedor:** GitHub Copilot
