import { MessageCircle, Mail, Phone, ArrowRight, User } from "lucide-react";
import { useState, useEffect } from "react";
import { BUSINESS_HOURS } from "@/constants/mining";
import { isBusinessHours } from "@/utils/formatters";

const CTASection = () => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkBusinessHours = () => {
      setIsOnline(isBusinessHours(
        BUSINESS_HOURS.startDay,
        BUSINESS_HOURS.endDay,
        BUSINESS_HOURS.startHour,
        BUSINESS_HOURS.endHour
      ));
    };

    // Verifica imediatamente
    checkBusinessHours();

    // Verifica a cada minuto
    const interval = setInterval(checkBusinessHours, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-panel p-8 md:p-12 lg:p-16 max-w-5xl mx-auto text-center glow-blue animate-glow-pulse-blue">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-relaxed">
            Pronto para <span className="gradient-text">Começar a Minerar</span>?
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Fale com nossos consultores especializados e monte sua operação 
            de mineração com os melhores equipamentos do mercado.
          </p>

          {/* Contact Options */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10 w-full sm:max-w-none mx-auto px-4 sm:px-0">
            <a
              href="https://api.whatsapp.com/send/?phone=5551980104595&text=Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+mais+informa%C3%A7%C3%B5es%21"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 hover:border-green-500/50 group"
            >
              <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold mb-1">WhatsApp</p>
              <p className="text-sm text-muted-foreground">Resposta Imediata</p>
            </a>
            
            <a
              href="mailto:syrion.mining@gmail.com"
              className="glass-card p-6 hover:border-primary/50 group"
            >
              <Mail className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold mb-1">E-mail</p>
              <p className="text-sm text-muted-foreground">syrion.mining@gmail.com</p>
            </a>
            
            <a
              href="tel:+5551980104595"
              className="glass-card p-6 hover:border-accent/50 group"
            >
              <Phone className="w-8 h-8 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold mb-1">Telefone</p>
              <p className="text-sm text-muted-foreground">+55 51 8010-4595</p>
            </a>
          </div>

          {/* Main CTA */}
          <a
            href="https://api.whatsapp.com/send/?phone=5551980104595&text=Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+mais+informa%C3%A7%C3%B5es%21"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-monterey inline-flex items-center gap-2 text-sm py-3 px-6"
          >
            Falar com Consultor
            <ArrowRight className="w-5 h-5" />
          </a>

          <div className="mt-6">
            {isOnline ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
                <User className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Online</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Atendimento de segunda a sexta, das 9h às 18h
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
