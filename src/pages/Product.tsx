import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, TrendingUp, Cpu } from "lucide-react";
import { useEffect } from "react";
import { getModelById, asicModels } from "@/data/asicModels";
import { formatCurrency } from "@/utils/formatters";
import s19KProImage from "@/assets/images/S19KPRO.png";
import s19ProPlusPlusImage from "@/assets/images/S19PRO++.png";
import t21Image from "@/assets/images/T21.png";
import s21PlusImage from "@/assets/images/S21+.png";
import s21xpImage from "@/assets/images/S21XP.png";

const getModelImage = (modelId: string): string => {
  if (modelId === "s19k-pro") return s19KProImage;
  if (modelId === "s19-pro-plus-plus") return s19ProPlusPlusImage;
  if (modelId === "t21") return t21Image;
  if (modelId === "s21-plus") return s21PlusImage;
  if (modelId === "s21-xp") return s21xpImage;
  return s19KProImage;
};

const getModelImageUrl = (modelId: string): string => {
  const imageMap: { [key: string]: string } = {
    "s19k-pro": "https://syrionstore.vercel.app/src/assets/images/S19KPRO.png",
    "s19-pro-plus-plus": "https://syrionstore.vercel.app/src/assets/images/S19PRO++.png",
    "t21": "https://syrionstore.vercel.app/src/assets/images/T21.png",
    "s21-plus": "https://syrionstore.vercel.app/src/assets/images/S21+.png",
    "s21-xp": "https://syrionstore.vercel.app/src/assets/images/S21XP.png",
  };
  return imageMap[modelId] || imageMap["s19k-pro"];
};

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const model = id ? getModelById(id) : undefined;

  useEffect(() => {
    if (!model) {
      navigate("/");
    }
  }, [model, navigate]);

  if (!model) {
    return <div>Produto não encontrado</div>;
  }

  const monthlyProfit = model.dailyRevenue * 30 - model.dailyPowerCost * 30;
  const roiDays = model.price / (model.dailyRevenue - model.dailyPowerCost);

  const whatsappMessage = `Encontrei esse modelo ${model.brand} ${model.name} - ${model.hashrate} TH/s e quero fechar uma compra. Pode me ajudar? https://syrionstore.vercel.app/produto/${model.id}`;
  const whatsappLink = `https://api.whatsapp.com/send/?phone=5551980104595&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Meta Tags para Open Graph */}
      <head>
        <title>{model.brand} {model.name} - SYRION Store</title>
        <meta property="og:title" content={`${model.brand} ${model.name} - SYRION Store`} />
        <meta property="og:description" content={`${model.hashrate} TH/s - Consumo: ${model.power}W - Eficiência: ${model.efficiency} J/TH - R$ ${model.price.toLocaleString('pt-BR')}`} />
        <meta property="og:image" content={getModelImageUrl(model.id)} />
        <meta property="og:url" content={`https://syrionstore.vercel.app/produto/${model.id}`} />
        <meta property="og:type" content="product" />
        <meta name="description" content={`${model.brand} ${model.name} - Minerador ASIC para Bitcoin. ${model.hashrate} TH/s com alta eficiência.`} />
      </head>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="glass-panel mx-4 mt-4 md:mx-8">
          <div className="container mx-auto px-6 py-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="flex items-center justify-center">
              <div className="glass-panel p-8 w-full">
                <img
                  src={getModelImage(model.id)}
                  alt={`${model.brand} ${model.name}`}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              {model.badge && (
                <span className="inline-block px-4 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-semibold mb-4">
                  {model.badge}
                </span>
              )}

              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {model.brand}
              </h1>
              <h2 className="text-2xl text-muted-foreground mb-6">
                {model.name}
              </h2>

              {/* Price */}
              <div className="glass-panel p-6 mb-6">
                <p className="text-muted-foreground text-sm mb-2">Preço</p>
                <p className="text-4xl font-bold text-foreground">
                  R$ {model.price.toLocaleString('pt-BR')}
                </p>
              </div>

              {/* Specifications */}
              <div className="glass-panel p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Especificações</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      Hash Rate
                    </span>
                    <span className="font-semibold">{model.hashrate} TH/s</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Consumo
                    </span>
                    <span className="font-semibold">{model.power} W</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Eficiência
                    </span>
                    <span className="font-semibold">{model.efficiency} J/TH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Algoritmo</span>
                    <span className="font-semibold">{model.algorithm}</span>
                  </div>
                </div>
              </div>

              {/* Profitability */}
              <div className="glass-panel p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Rentabilidade Estimada</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Lucro Mensal</span>
                    <span className="text-lg font-bold text-green-400">
                      R$ {monthlyProfit.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ROI</span>
                    <span className="font-semibold">~{Math.round(roiDays)} dias</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-monterey w-full text-center py-4 text-lg font-semibold block"
              >
                Solicitar Cotação via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;
