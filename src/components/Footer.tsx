import { Mail, Phone, MapPin } from "lucide-react";
import iconLogo from "@/assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-105">
                <img src={iconLogo} alt="SYRION Store" className="w-16 h-16 object-contain" />
              </div>
              <span className="text-xl font-bold text-foreground">
                SYRION<span className="gradient-text ml-2">Store</span>
              </span>
            </a>
            <p className="text-muted-foreground max-w-sm">
              Especialistas em equipamentos de mineração de criptomoedas. 
              Oferecemos os melhores mineradores ASIC do mercado com suporte 
              técnico especializado.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { href: "#modelos", label: "Modelos" },
                { href: "#comparativo", label: "Comparativo" },
                { href: "#calculadora", label: "Calculadora" },
                { href: "#faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:syrion.mining@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  syrion.mining@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+5551980104595"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +55 51 8010-4595
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                Ciudad del Este, Paraguay
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SYRIONStore. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
