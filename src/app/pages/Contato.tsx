import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Contato() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    propertyType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = `Olá! Gostaria de solicitar um orçamento.

Nome: ${formData.name}
WhatsApp: ${formData.whatsapp}
Tipo de Imóvel: ${formData.propertyType}
Descrição: ${formData.message}`;

    const whatsappUrl = `https://wa.me/5511987850672?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4">Entre em Contato</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Solicite um orçamento sem compromisso ou tire suas dúvidas com nossa equipe
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-6">Solicite seu Orçamento</h2>
              <p className="text-muted-foreground mb-8">
                Preencha o formulário abaixo e entraremos em contato o mais breve possível
                para agendar uma visita técnica gratuita.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="(11) 98785-0672"
                  />
                </div>

                <div>
                  <label htmlFor="propertyType" className="block mb-2">
                    Tipo de Imóvel
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Selecione</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Cobertura">Cobertura</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2">
                    Descreva sua Necessidade
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="Conte-nos sobre o projeto que você tem em mente..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Enviar via WhatsApp
                </button>
              </form>
            </div>

            <div>
              <h2 className="mb-6">Informações de Contato</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="mb-1">Telefone</h4>
                    <a
                      href="tel:+5511987850672"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      (11) 98785-0672
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="mb-1">E-mail</h4>
                    <a
                      href="mailto:contato@reformasebs.com.br"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      contato@reformasebs.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="mb-1">Localização</h4>
                    <p className="text-muted-foreground">
                      São Paulo, SP
                      <br />
                      Atendemos toda a região metropolitana
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="mb-1">Horário de Atendimento</h4>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 8h às 18h
                      <br />
                      Sábado: 8h às 13h
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent to-accent/80 text-white rounded-lg p-6">
                <h3 className="mb-3">Visita Técnica Gratuita</h3>
                <p className="text-sm opacity-90 mb-4">
                  Oferecemos visita técnica sem custo para avaliar seu projeto e
                  fornecer um orçamento detalhado e transparente.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    Análise completa do local
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    Orientações técnicas
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    Orçamento detalhado
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    Cronograma da obra
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
