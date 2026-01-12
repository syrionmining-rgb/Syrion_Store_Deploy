import { Menu, X } from "lucide-react";
import { useState } from "react";
import iconLogo from "@/assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#modelos", label: "Modelos" },
    { href: "#comparativo", label: "Comparativo" },
    { href: "#calculadora", label: "Calculadora" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-panel mx-4 mt-4 md:mx-8">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center transition-transform group-hover:scale-105">
                <img src={iconLogo} alt="ASIC Pro" className="w-16 h-16 object-contain" />
              </div>
              <span className="text-xl font-bold text-foreground">
                SYRION<span className="gradient-text ml-2">Store</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a href="#contato" className="btn-monterey text-sm py-3 px-6">
                Falar com Consultor
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contato"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-monterey text-center mt-2"
                >
                  Falar com Consultor
                </a>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
