// Vercel Serverless Function para gerar Open Graph meta tags dinâmicos
// Este arquivo vai ser executado no servidor do Vercel

export default function handler(req, res) {
  const { productId } = req.query;

  // Mapeamento de produtos
  const products = {
    "s19k-pro": {
      name: "Antminer S19K Pro",
      brand: "Bitmain",
      hashrate: 120,
      power: 2760,
      efficiency: 23,
      price: 17900,
      image: "https://syrionstore.vercel.app/assets/S19KPRO.png"
    },
    "s19-pro-plus-plus": {
      name: "Antminer S19 Pro++",
      brand: "Bitmain",
      hashrate: 198,
      power: 3250,
      efficiency: 16.41,
      price: 19900,
      image: "https://syrionstore.vercel.app/assets/S19PRO%2B%2B.png"
    },
    "t21": {
      name: "Antminer T21",
      brand: "Bitmain",
      hashrate: 190,
      power: 3610,
      efficiency: 19,
      price: 29950,
      image: "https://syrionstore.vercel.app/assets/T21.png"
    },
    "s21-plus": {
      name: "Antminer S21+",
      brand: "Bitmain",
      hashrate: 235,
      power: 3878,
      efficiency: 16.5,
      price: 32250,
      image: "https://syrionstore.vercel.app/assets/S21%2B.png"
    },
    "s21-xp": {
      name: "Antminer S21 XP",
      brand: "Bitmain",
      hashrate: 270,
      power: 3645,
      efficiency: 13.5,
      price: 44775,
      image: "https://syrionstore.vercel.app/assets/S21XP.png"
    }
  };

  const product = products[productId];

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const title = `${product.brand} ${product.name} - SYRION Store`;
  const description = `${product.hashrate} TH/s - Consumo: ${product.power}W - Eficiência: ${product.efficiency} J/TH - R$ ${product.price.toLocaleString('pt-BR')}`;
  const url = `https://syrionstore.vercel.app/produto/${productId}`;

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${product.image}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="SYRION Store">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${product.image}">
  
  <!-- Redirect to actual product page -->
  <script>
    window.location.href = '${url}';
  </script>
</head>
<body>
  <p>Redirecionando para <a href="${url}">${title}</a>...</p>
</body>
</html>
  `;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
