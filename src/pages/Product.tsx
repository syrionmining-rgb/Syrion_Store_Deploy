import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Zap, TrendingUp, Cpu, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { getModelById, asicModels } from "@/data/asicModels";
import { getBitcoinData, type BitcoinData } from "@/services/bitcoinApi";
import { formatCurrency } from "@/utils/formatters";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";
import iconLogo from "@/assets/images/logo.png";
import s19KProImage from "@/assets/images/S19KPRO.png";
import s19ProPlusPlusImage from "@/assets/images/S19PRO++.png";
import t21Image from "@/assets/images/T21.png";
import s21PlusImage from "@/assets/images/S21+.png";
import s21xpImage from "@/assets/images/S21XP.png";
import s19kpro1 from "@/assets/images/S19KPRO-2.png";
import s19kpro2 from "@/assets/images/S19KPRO-2_1.png";
import s19kpro3 from "@/assets/images/S19KPRO-3.png";
import s19kpro4 from "@/assets/images/S19KPRO-4.png";

const getModelImage = (modelId: string): string => {
  if (modelId === "s19k-pro") return s19KProImage;
  if (modelId === "s19-pro-plus-plus") return s19ProPlusPlusImage;
  if (modelId === "t21") return t21Image;
  if (modelId === "s21-plus") return s21PlusImage;
  if (modelId === "s21-xp") return s21xpImage;
  return s19KProImage;
};

const getS19KProGalleryImages = (): string[] => {
  return [s19KProImage, s19kpro1, s19kpro2, s19kpro3, s19kpro4];
};

const getS19ProPlusPlusGalleryImages = (): string[] => {
  return [s19KProImage, s19kpro1, s19kpro2, s19kpro3, s19kpro4];
};

const getModelImageUrl = (modelId: string): string => {
  const imageMap: { [key: string]: string } = {
    "s19k-pro": "/assets/S19KPRO.png",
    "s19-pro-plus-plus": "/assets/S19PRO++.png",
    "t21": "/assets/T21.png",
    "s21-plus": "/assets/S21+.png",
    "s21-xp": "/assets/S21XP.png",
  };
  const imagePath = imageMap[modelId] || imageMap["s19k-pro"];
  return `https://syrionstore.vercel.app${imagePath}`;
};

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const model = id ? getModelById(id) : undefined;
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);
  const [usdPrice, setUsdPrice] = useState<number>(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!model) {
      navigate("/");
    }
  }, [model, navigate]);

  useEffect(() => {
    let isMounted = true;
    
    const loadBitcoinData = async () => {
      try {
        const data = await getBitcoinData();
        if (isMounted) {
          setBitcoinData(data);
          if (model) {
            setUsdPrice(model.price / data.usdToBrl);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    
    loadBitcoinData();
    
    return () => {
      isMounted = false;
    };
  }, [model]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

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

  const whatsappMessage = `Olá! quero fechar a compra deste modelo\n\n📦 Modelo: ${model.brand} ${model.name}\n⚡ Hashrate: ${model.hashrate} TH/s\n💰 Preço: R$ ${model.price.toLocaleString('pt-BR')}\n\nhttps://syrionstore.vercel.app/produto/${model.id}\n\nPoderia me ajudar?`;
  const whatsappLink = `https://api.whatsapp.com/send/?phone=5551980104595&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Helmet>
        <title>{model.brand} {model.name} - SYRION Store</title>
        <meta name="description" content={`${model.brand} ${model.name} - Minerador ASIC para Bitcoin. ${model.hashrate} TH/s com alta eficiência.`} />
        <meta property="og:title" content={`${model.brand} ${model.name} - SYRION Store`} />
        <meta property="og:description" content={`${model.hashrate} TH/s - Consumo: ${model.power}W - Eficiência: ${model.efficiency} J/TH - R$ ${model.price.toLocaleString('pt-BR')}`} />
        <meta property="og:image" content={getModelImageUrl(model.id)} />
        <meta property="og:url" content={`https://syrionstore.vercel.app/produto/${model.id}`} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="SYRION Store" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${model.brand} ${model.name}`} />
        <meta name="twitter:description" content={`${model.hashrate} TH/s - R$ ${model.price.toLocaleString('pt-BR')}`} />
        <meta name="twitter:image" content={getModelImageUrl(model.id)} />
      </Helmet>
    <div className="min-h-screen hero-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="glass-panel mx-4 mt-4 md:mx-8">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Voltar Button */}
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>

              {/* Logo e Título no meio */}
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                  <img src={iconLogo} alt="SYRION Store" className="w-16 h-16 object-contain" />
                </div>
                <span className="text-xl font-bold text-foreground hidden sm:inline">
                  SYRION<span className="gradient-text ml-2">Store</span>
                </span>
              </a>

              {/* Espaço vazio para balancear */}
              {bitcoinData && bitcoinData.usdToBrl > 0 && (
                <span className="inline-block px-4 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-semibold">
                  USD: R$ {bitcoinData.usdToBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-40 pb-16 px-4 md:px-8">
        <div className="flex justify-center">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl w-full items-center lg:items-stretch">
            {/* Image */}
            <div className="flex items-center justify-center w-full lg:w-auto">
              {model.id === "s19k-pro" || model.id === "s19-pro-plus-plus" ? (
                <div className="glass-panel p-8 w-full max-w-3xl relative">
                  <Carousel
                    opts={{
                      align: "center",
                      loop: true,
                    }}
                    plugins={[
                      Autoplay({
                        delay: 4000,
                      }),
                    ]}
                    setApi={setCarouselApi}
                  >
                    <CarouselContent>
                      {(model.id === "s19k-pro"
                        ? getS19KProGalleryImages()
                        : getS19ProPlusPlusGalleryImages()
                      ).map((image, index) => (
                        <CarouselItem key={index}>
                          <img
                            src={image}
                            alt={`${model.brand} ${model.name} - Imagem ${index + 1}`}
                            className="w-full h-auto max-h-[768px] object-contain rounded-lg"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                  
                  {/* Dots */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-10 bg-black/40 rounded-full px-4 py-2">
                    {Array.from({ length: count }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => carouselApi?.scrollTo(index)}
                        className={`h-3 w-3 rounded-full transition-all ${
                          index === current
                            ? "bg-white w-8"
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="glass-panel p-8 w-full max-w-3xl">
                  <img
                    src={getModelImage(model.id)}
                    alt={`${model.brand} ${model.name}`}
                    className="w-full h-auto max-h-[768px] object-contain rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="max-w-md w-full">
              {model.badge && (
                <span className="inline-block px-4 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-semibold mb-4">
                  {model.badge}
                </span>
              )}

              <div className="flex items-center justify-between mb-1">
                <div className="flex items-baseline gap-4">
                  <h2 className="text-3xl font-bold text-foreground">
                    {model.name}
                  </h2>
                  <span className="stat-value text-2xl md:text-3xl">
                    {model.hashrate} <span className="text-base">TH/s</span>
                  </span>
                </div>
              </div>
              <h1 className="text-base text-muted-foreground mb-6">
                {model.brand}
              </h1>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-panel p-6">
                  <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Real (BRL)</p>
                  <p className="text-3xl font-bold text-foreground">
                    R$ {model.price.toLocaleString('pt-BR')}
                  </p>
                </div>
                {usdPrice > 0 && (
                  <div className="glass-panel p-6">
                    <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Dólar (USDT)</p>
                    <p className="text-3xl font-bold text-primary">
                      ${usdPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div className="glass-panel p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Especificações</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {/* Coluna 1 - Specs técnicas */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        Hash Rate
                      </span>
                      <span className="text-sm font-semibold">{model.hashrate} TH/s</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Consumo
                      </span>
                      <span className="text-sm font-semibold">{model.power} W</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Eficiência
                      </span>
                      <span className="text-sm font-semibold">{model.efficiency} J/TH</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Algoritmo</span>
                      <span className="text-sm font-semibold">{model.algorithm}</span>
                    </div>
                  </div>

                  {/* Coluna 2 - Specs físicas */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Lançamento</span>
                      <span className="text-sm font-semibold">{model.releaseMonth || `Ano ${model.releaseYear}`}</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Tamanho</span>
                      <span className="text-sm font-semibold text-right">{model.dimensions || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Peso</span>
                      <span className="text-sm font-semibold">{model.weight || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Ruído</span>
                      <span className="text-sm font-semibold">{model.noise ? `${model.noise}dB` : "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Garantia do Fabricante */}
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">Garantia do Fabricante</span>
              </div>

              {/* CTA Button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-monterey text-sm py-3 px-6 whitespace-nowrap inline-block"
              >
                Solicitar Cotação
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default Product;
