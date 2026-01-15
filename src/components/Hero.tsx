import { ArrowRight, Zap, Shield, DollarSign } from "lucide-react";

const Hero = () => {
  const stats = [
    { value: "270", unit: "TH/s", label: "Máximo Hashrate" },
    { value: "13.5", unit: "J/TH", label: "Melhor Eficiência" },
    { value: "5", label: "Modelos Premium" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 mb-8 animate-fade-up opacity-0">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Mineradores ASIC de Alta Performance
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up opacity-0 stagger-1">
            Infraestrutura de{" "}
            <span className="gradient-text">Mineração</span>
            <br />
            de Nível Profissional
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up opacity-0 stagger-2">
            Os melhores mineradores do mercado para quem busca desempenho máximo, eficiência energética superior e suporte técnico especializado.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up opacity-0 stagger-3 max-w-xs sm:max-w-none mx-auto">
            <a href="#modelos" className="btn-monterey inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg border border-primary/20">
              Modelos Disponíveis
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#calculadora" className="btn-glass inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg border border-primary/20">
              Calcular Rentabilidade
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 animate-fade-up opacity-0 stagger-4">
            {stats.map((stat, index) => (
              <div key={index} className="glass-panel p-4 md:p-6 text-center">
                <div className="stat-value">
                  {stat.value}
                  {stat.unit && <span className="text-xs md:text-2xl ml-1">{stat.unit}</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 animate-fade-up opacity-0 stagger-5">
          {[
            { icon: Shield, text: "Garantia do Fabricante" },
            { icon: DollarSign, text: "Melhor Custo" },
            { icon: Zap, text: "Suporte 24/7" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-muted-foreground">
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
