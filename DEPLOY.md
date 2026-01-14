# 🚀 Guia de Deploy - Syrion Store

## ✅ Status Atual: PRONTO PARA PRODUÇÃO

Seu projeto está **quase pronto** para produção! Só faltam alguns ajustes finais.

---

## 📋 Checklist Pré-Deploy

### ✅ Já Implementado
- [x] Build configurado (`npm run build`)
- [x] TypeScript sem erros
- [x] Componentes otimizados
- [x] Cache de API implementado
- [x] Imagens otimizadas
- [x] Responsive design
- [x] Validações de input

### ⚠️ Ajustes Necessários

#### 1. **Atualizar Informações de Contato Reais**

**Arquivos a editar:**

**`src/components/CTASection.tsx`**
```typescript
// Linha 30-32: Atualizar WhatsApp
href="https://wa.me/SEU_NUMERO_AQUI" 

// Linha 46: Atualizar Email
href="mailto:syrion.loja@gmail.com" // ✅ Já configurado

// Linha 57: Atualizar Telefone
href="tel:SEU_TELEFONE_AQUI"
(00) 00000-0000 // ⚠️ Atualizar

// Linha 67: Atualizar WhatsApp do botão principal
href="https://wa.me/SEU_NUMERO_AQUI?text=..."
```

**`src/components/Footer.tsx`**
```typescript
// Linha 58: Email
mailto:syrion.loja@gmail.com // ✅ Já configurado

// Linha 67: Telefone
tel:+00000000000 // ⚠️ Atualizar
(00) 00000-0000 // ⚠️ Atualizar

// Linha 74: Endereço
Ciudad del Este, Paraguay // ✅ Já configurado
```

#### 2. **Configurar Analytics (Opcional mas Recomendado)**

Adicione Google Analytics ou similar para rastrear visitantes.

---

## 🏗️ Build para Produção

### Passo 1: Gerar Build de Produção

```powershell
# No terminal do projeto
npm run build
```

Isso cria a pasta `dist/` com arquivos otimizados:
- HTML/CSS/JS minificados
- Imagens otimizadas
- Code splitting automático
- Hash nos nomes de arquivos para cache

### Passo 2: Testar Localmente

```powershell
npm run preview
```

Acesse `http://localhost:4173` para testar a versão de produção.

---

## 🌐 Opções de Hospedagem

### **Opção 1: Vercel (RECOMENDADO - Gratuito)**

**Por que Vercel?**
- ✅ Deploy automático do GitHub
- ✅ SSL gratuito (HTTPS)
- ✅ CDN global
- ✅ Zero configuração

**Passos:**
1. Crie conta em [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Clique em "Deploy"
4. Pronto! URL automática: `syrion-store.vercel.app`

**Comando alternativo:**
```powershell
npx vercel
```

---

### **Opção 2: Netlify (Também Gratuito)**

**Passos:**
1. Crie conta em [netlify.com](https://netlify.com)
2. Arraste a pasta `dist/` no dashboard
3. Ou conecte repositório GitHub
4. Deploy automático

**Comando alternativo:**
```powershell
npx netlify deploy --prod
```

---

### **Opção 3: Hostinger/cPanel (Hospedagem Tradicional)**

**Passos:**
1. Faça build: `npm run build`
2. Compacte a pasta `dist/` em `.zip`
3. Acesse cPanel do seu servidor
4. Vá em "Gerenciador de Arquivos"
5. Extraia o `.zip` na pasta `public_html/`
6. Configure domínio

**Requisitos:**
- Servidor com suporte a SPA (Single Page Application)
- Arquivo `.htaccess` para rotas (veja abaixo)

---

### **Opção 4: GitHub Pages**

**Passos:**
1. Instale gh-pages:
```powershell
npm install --save-dev gh-pages
```

2. Adicione ao `package.json`:
```json
{
  "homepage": "https://seu-usuario.github.io/syrion-store",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy:
```powershell
npm run deploy
```

---

## 📄 Arquivos de Configuração

### Para Hostinger/cPanel (Apache)

Crie `.htaccess` dentro de `dist/` antes de fazer upload:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compressão
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## 🔒 Configurações de Segurança

### Headers de Segurança (para Vercel)

Crie `vercel.json` na raiz:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 📊 Monitoramento Pós-Deploy

### Google Analytics

Adicione ao `index.html` antes do `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎯 Passo a Passo Completo (Vercel - Mais Fácil)

### 1. **Preparar Código**
```powershell
# Atualizar contatos reais no código
# Testar localmente
npm run dev

# Gerar build
npm run build
```

### 2. **Criar Repositório GitHub**
```powershell
# Inicializar git (se ainda não fez)
git init
git add .
git commit -m "Deploy inicial Syrion Store"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/seu-usuario/syrion-store.git
git push -u origin main
```

### 3. **Deploy na Vercel**
- Acesse [vercel.com](https://vercel.com)
- Login com GitHub
- Clique "New Project"
- Selecione repositório `syrion-store`
- Clique "Deploy"
- **Pronto!** Site online em ~1 minuto

### 4. **Configurar Domínio Próprio (Opcional)**
- Na Vercel, vá em "Settings" > "Domains"
- Adicione seu domínio (ex: `syrionstore.com`)
- Configure DNS conforme instruções
- SSL automático

---

## ⚡ Otimizações Extras (Opcional)

### 1. Adicionar Sitemap

Crie `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seudominio.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 2. Adicionar robots.txt

Crie `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://seudominio.com/sitemap.xml
```

### 3. Meta Tags SEO

Já está em `index.html`, mas verifique:
- Title
- Description
- Open Graph tags
- Twitter Cards

---

## 🐛 Troubleshooting

### Problema: Rotas não funcionam após refresh
**Solução:** Configure redirecionamento no servidor (ver `.htaccess` acima)

### Problema: Imagens não carregam
**Solução:** Verifique paths relativos (use `@/assets/images/...`)

### Problema: APIs bloqueadas por CORS
**Solução:** APIs públicas do projeto já têm CORS configurado. Se criar sua própria API, configure headers CORS.

---

## ✅ Checklist Final

Antes de fazer deploy, confirme:

- [ ] Todas as informações de contato atualizadas
- [ ] `npm run build` executa sem erros
- [ ] `npm run preview` funciona localmente
- [ ] Imagens carregam corretamente
- [ ] Links de WhatsApp/Email funcionam
- [ ] Calculadora funciona com APIs reais
- [ ] Status "Online" funciona corretamente
- [ ] Responsive em mobile/tablet testado
- [ ] Favicon configurado

---

## 🎉 Pronto para Deploy!

**Recomendação:** Use **Vercel** para primeiro deploy (5 minutos)

```powershell
# Comando rápido
npm run build && npx vercel --prod
```

Depois de online, compartilhe o link e monitore através do dashboard da Vercel!

---

## 📞 Suporte

Se tiver dúvidas durante deploy, verifique:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)
