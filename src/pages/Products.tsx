import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { asicModels } from "@/data/asicModels";
import ModelCard from "@/components/ModelCard";

const Products = () => {
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
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Catálogo de <span className="gradient-text">Mineradores ASIC</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore nossa seleção completa de mineradores Bitmain Antminer 
              com as melhores especificações e preços do mercado.
            </p>
          </div>

          {/* Products Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center md:justify-items-start">
            {asicModels.map((model, index) => (
              <div
                key={model.id}
                onClick={() => navigate(`/produto/${model.id}`)}
                className="cursor-pointer transition-all hover:scale-105"
              >
                <ModelCard model={model} index={index} />
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <a
              href="https://api.whatsapp.com/send/?phone=5551980104595&text=Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+mais+informa%C3%A7%C3%B5es%21"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-monterey inline-flex items-center gap-2 text-sm py-3 px-6"
            >
              Falar com Consultor
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
