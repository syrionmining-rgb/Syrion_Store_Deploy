import { useNavigate } from "react-router-dom";
import { ArrowLeft, Cpu, Zap, TrendingUp, Award, ChevronRight } from "lucide-react";
import { asicModels } from "@/data/asicModels";
import { formatCurrency } from "@/utils/formatters";

const Models = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
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
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Todos os <span className="gradient-text">Modelos</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Conheça em detalhes todas as especificações de cada minerador ASIC disponível
            </p>
          </div>

          {/* Models List */}
          <div className="space-y-4 max-w-5xl mx-auto">
            {asicModels.map((model) => (
              <div
                key={model.id}
                onClick={() => navigate(`/produto/${model.id}`)}
                className="glass-panel p-6 rounded-2xl cursor-pointer hover:border-primary/50 transition-all hover:scale-[1.02] group"
              >
                <div className="flex items-start justify-between gap-6">
                  {/* Left Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold">
                        {model.brand} {model.name}
                      </h3>
                      {model.badge && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-primary to-accent text-white">
                          {model.badge}
                        </span>
                      )}
                      {model.featured && (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50">
                          <Award className="w-3 h-3 text-amber-500" />
                          <span className="text-xs font-semibold text-amber-500">Destaque</span>
                        </div>
                      )}
                    </div>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <Cpu className="w-4 h-4" />
                          Hashrate
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {model.hashrate} TH/s
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          Consumo
                        </p>
                        <p className="text-lg font-bold">
                          {model.power}W
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Eficiência
                        </p>
                        <p className="text-lg font-bold">
                          {model.efficiency} J/TH
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          Lançamento
                        </p>
                        <p className="text-lg font-bold">
                          {model.releaseYear}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm">
                      {model.algorithm} • Eficiência otimizada • Modelo {model.releaseYear}
                    </p>
                  </div>

                  {/* Right Content - Price */}
                  <div className="flex flex-col items-end justify-between h-full min-w-fit">
                    <div className="text-right mb-4">
                      <p className="text-xs text-muted-foreground mb-1">Preço a partir de</p>
                      <p className="text-3xl font-bold text-foreground">
                        R$ {model.price.toLocaleString('pt-BR')}
                      </p>
                    </div>

                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="font-semibold mb-4">Legenda de Especificações</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span><strong>Hashrate</strong> - Power de processamento (TH/s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span><strong>Consumo</strong> - Energia consumida em Watts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span><strong>Eficiência</strong> - Razão Joules/TH (menor = melhor)</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span><strong>Lançamento</strong> - Ano de lançamento do modelo</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href="https://api.whatsapp.com/send/?phone=5551980104595&text=Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+mais+informa%C3%A7%C3%B5es%21"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-monterey inline-flex items-center gap-2 text-sm py-3 px-6"
            >
              Falar com Consultor
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Models;
