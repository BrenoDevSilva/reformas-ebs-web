import { Mail, Phone, MapPin, Clock, MessageCircle, Handshake } from "lucide-react";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "../../lib/firebase";

type Tab = "orcamento" | "parceria";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function Contato() {
  const [activeTab, setActiveTab] = useState<Tab>("orcamento");
  const [submitting, setSubmitting] = useState(false);

  const [orcamentoData, setOrcamentoData] = useState({
    name: "",
    whatsapp: "",
    propertyType: "",
    message: "",
  });

  const [parceriaData, setParceriaData] = useState({
    name: "",
    company: "",
    whatsapp: "",
    area: "",
    message: "",
  });

  const handleOrcamentoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "orcamentos"), {
        ...orcamentoData,
        tipo: "orcamento",
        createdAt: serverTimestamp(),
      });

      const text = `Olá! Gostaria de solicitar um orçamento.

Nome: ${orcamentoData.name}
WhatsApp: ${orcamentoData.whatsapp}
Tipo de Imóvel: ${orcamentoData.propertyType}
Descrição: ${orcamentoData.message}`;

      window.open(`https://wa.me/5511987850672?text=${encodeURIComponent(text)}`, "_blank");
      toast.success("Orçamento enviado! Entraremos em contato em breve.");
      setOrcamentoData({ name: "", whatsapp: "", propertyType: "", message: "" });
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleParceriaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "parcerias"), {
        ...parceriaData,
        tipo: "parceria",
        createdAt: serverTimestamp(),
      });

      const text = `Olá! Tenho interesse em uma parceria com a Reformas EBS.

Nome: ${parceriaData.name}
Empresa: ${parceriaData.company}
WhatsApp: ${parceriaData.whatsapp}
Área de Atuação: ${parceriaData.area}
Mensagem: ${parceriaData.message}`;

      window.open(`https://wa.me/5511987850672?text=${encodeURIComponent(text)}`, "_blank");
      toast.success("Proposta enviada! Entraremos em contato.");
      setParceriaData({ name: "", company: "", whatsapp: "", area: "", message: "" });
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4">Entre em Contato</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Solicite um orçamento ou entre em contato para uma parceria
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-muted rounded-lg p-1 gap-1">
              <button
                onClick={() => setActiveTab("orcamento")}
                className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all font-medium ${
                  activeTab === "orcamento"
                    ? "bg-card shadow text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageCircle size={18} />
                Solicitar Orçamento
              </button>
              <button
                onClick={() => setActiveTab("parceria")}
                className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all font-medium ${
                  activeTab === "parceria"
                    ? "bg-card shadow text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Handshake size={18} />
                Quero ser Parceiro
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Forms */}
            <div>
              {activeTab === "orcamento" ? (
                <>
                  <h2 className="mb-6">Solicite seu Orçamento</h2>
                  <p className="text-muted-foreground mb-8">
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível
                    para agendar uma visita técnica gratuita.
                  </p>

                  <form onSubmit={handleOrcamentoSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={orcamentoData.name}
                        onChange={(e) => setOrcamentoData({ ...orcamentoData, name: e.target.value })}
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
                        value={orcamentoData.whatsapp}
                        onChange={(e) => setOrcamentoData({ ...orcamentoData, whatsapp: formatPhone(e.target.value) })}
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
                        value={orcamentoData.propertyType}
                        onChange={(e) => setOrcamentoData({ ...orcamentoData, propertyType: e.target.value })}
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
                        value={orcamentoData.message}
                        onChange={(e) => setOrcamentoData({ ...orcamentoData, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        placeholder="Conte-nos sobre o projeto que você tem em mente..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <MessageCircle size={20} />
                      {submitting ? "Enviando..." : "Enviar via WhatsApp"}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h2 className="mb-6">Proposta de Parceria</h2>
                  <p className="text-muted-foreground mb-8">
                    Trabalhamos com fornecedores, prestadores e empresas alinhados com
                    nosso padrão de qualidade. Preencha abaixo e entraremos em contato.
                  </p>

                  <form onSubmit={handleParceriaSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="p-name" className="block mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        id="p-name"
                        value={parceriaData.name}
                        onChange={(e) => setParceriaData({ ...parceriaData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div>
                      <label htmlFor="p-company" className="block mb-2">
                        Empresa / Profissão
                      </label>
                      <input
                        type="text"
                        id="p-company"
                        value={parceriaData.company}
                        onChange={(e) => setParceriaData({ ...parceriaData, company: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Nome da empresa ou sua profissão"
                      />
                    </div>

                    <div>
                      <label htmlFor="p-whatsapp" className="block mb-2">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="p-whatsapp"
                        value={parceriaData.whatsapp}
                        onChange={(e) => setParceriaData({ ...parceriaData, whatsapp: formatPhone(e.target.value) })}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="(11) 98785-0672"
                      />
                    </div>

                    <div>
                      <label htmlFor="p-area" className="block mb-2">
                        Área de Atuação
                      </label>
                      <select
                        id="p-area"
                        value={parceriaData.area}
                        onChange={(e) => setParceriaData({ ...parceriaData, area: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="">Selecione</option>
                        <option value="Fornecedor de materiais">Fornecedor de materiais</option>
                        <option value="Arquitetura e design">Arquitetura e design</option>
                        <option value="Engenharia">Engenharia</option>
                        <option value="Mão de obra especializada">Mão de obra especializada</option>
                        <option value="Imobiliária">Imobiliária</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="p-message" className="block mb-2">
                        Como podemos colaborar?
                      </label>
                      <textarea
                        id="p-message"
                        value={parceriaData.message}
                        onChange={(e) => setParceriaData({ ...parceriaData, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        placeholder="Descreva sua proposta de parceria..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <MessageCircle size={20} />
                      {submitting ? "Enviando..." : "Enviar via WhatsApp"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Info column */}
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
                      São Paulo, SP — Alagoas, AL
                      <br />
                      Atendemos diversas regiões do Brasil
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
