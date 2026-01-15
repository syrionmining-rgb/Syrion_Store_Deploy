import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ModelsSection from "@/components/ModelsSection";
import ComparisonTable from "@/components/ComparisonTable";
import Calculator from "@/components/Calculator";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ModelsSection />
        <ComparisonTable />
        <Calculator />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
