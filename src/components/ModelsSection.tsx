import { asicModels } from "@/data/asicModels";
import ModelCard from "./ModelCard";

const ModelsSection = () => {
  return (
    <section id="modelos" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Modelos <span className="gradient-text">Mais Vendidos</span>
          </h2>
          <p className="text-muted-foreground">
            Seleção premium dos mineradores Bitmain Antminer com melhor 
            custo-benefício e eficiência energética do mercado.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {asicModels.slice(0, 3).map((model, index) => (
            <ModelCard key={model.id} model={model} index={index} />
          ))}
        </div>

        {/* Second Row */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8 max-w-4xl mx-auto">
          {asicModels.slice(3, 5).map((model, index) => (
            <ModelCard key={model.id} model={model} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;
