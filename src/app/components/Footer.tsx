import { Link } from "react-router";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="mb-4">Reformas EBS</h3>
            <p className="text-sm opacity-80 mb-4">
              Construção de alto padrão com qualidade garantida e entrega no prazo.
            </p>
            <a
              href="https://www.instagram.com/reformas.ebs/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
            >
              <Instagram size={20} className="text-pink-500" />
              reformas.ebs
            </a>
          </div>

          <div>
            <h4 className="mb-4">Links Rápidos</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
                Home
              </Link>
              <Link to="/servicos" className="opacity-80 hover:opacity-100 transition-opacity">
                Serviços
              </Link>
              <Link to="/portfolio" className="opacity-80 hover:opacity-100 transition-opacity">
                Portfólio
              </Link>
              <Link to="/galeria" className="opacity-80 hover:opacity-100 transition-opacity">
                Galeria
              </Link>
              <Link to="/sobre" className="opacity-80 hover:opacity-100 transition-opacity">
                Sobre Nós
              </Link>
              <Link to="/contato" className="opacity-80 hover:opacity-100 transition-opacity">
                Contato
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Contato</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:contato@reformasebs.com.br"
                className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
              >
                <Mail size={16} />
                contato@reformasebs.com.br
              </a>
              <a
                href="tel:+5511987850672"
                className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
              >
                <Phone size={16} />
                (11) 98785-0672
              </a>
              <div className="flex items-center gap-2 opacity-80">
                <MapPin size={16} />
                São Paulo, SP
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm opacity-60 space-y-1">
          <p>© {new Date().getFullYear()} Reformas EBS. Todos os direitos reservados.</p>
          <p className="flex items-center justify-center gap-3 flex-wrap">
            <span>Desenvolvido por</span>
            <a
              href="mailto:breno.ss1808@gmail.com"
              className="hover:opacity-100 underline underline-offset-2 transition-opacity"
            >
              breno.ss1808@gmail.com
            </a>
            <span>·</span>
            <a
              href="https://www.linkedin.com/in/brenodevsilva/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 underline underline-offset-2 transition-opacity"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
