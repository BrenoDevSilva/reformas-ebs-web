import {
  Home,
  Droplets,
  Zap,
  Paintbrush,
  HardHat,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router";

const services = [
  {
    icon: Home,
    title: "Reforma Geral",
    description: "Transformação completa do seu imóvel",
    details: [
      "Projeto arquitetônico personalizado",
      "Demolição e remoção de entulho",
      "Reconstrução estrutural",
      "Instalações hidráulicas e elétricas",
      "Acabamentos de alto padrão",
      "Gerenciamento completo da obra",
    ],
  },
  {
    icon: Droplets,
    title: "Hidráulica",
    description: "Sistemas hidráulicos modernos e eficientes",
    details: [
      "Instalação de tubulações de água e esgoto",
      "Sistemas de aquecimento solar",
      "Tratamento e reuso de água",
      "Manutenção preventiva e corretiva",
      "Detecção de vazamentos",
      "Adequação às normas ABNT",
    ],
  },
  {
    icon: Zap,
    title: "Elétrica",
    description: "Instalações elétricas seguras e certificadas",
    details: [
      "Projeto elétrico completo",
      "Quadros de distribuição",
      "Automação residencial",
      "Iluminação LED eficiente",
      "Aterramento e proteção",
      "Laudo técnico NR-10",
    ],
  },
  {
    icon: Paintbrush,
    title: "Pintura",
    description: "Acabamento impecável em todos os ambientes",
    details: [
      "Preparação de superfícies",
      "Texturas decorativas",
      "Pinturas especiais (epóxi, verniz)",
      "Acabamento em madeira",
      "Consultoria de cores",
      "Garantia de durabilidade",
    ],
  },
  {
    icon: HardHat,
    title: "Alvenaria",
    description: "Construção e reforma estrutural de qualidade",
    details: [
      "Levantamento de paredes",
      "Lajes e estruturas de concreto",
      "Reforço estrutural",
      "Impermeabilização",
      "Nivelamento de pisos",
      "Fundações e contenções",
    ],
  },
  {
    icon: Sparkles,
    title: "Acabamento Fino",
    description: "Detalhes que elevam o padrão do ambiente",
    details: [
      "Gesso e sancas decorativas",
      "Porcelanato e revestimentos premium",
      "Marcenaria sob medida",
      "Iluminação de destaque",
      "Metais e louças de luxo",
      "Paisagismo e decoração",
    ],
  },
];

export default function Servicos() {
  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4">Nossos Serviços</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Soluções completas e especializadas para cada etapa da sua reforma
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-card border border-border rounded-lg p-8 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-accent" size={28} />
                    </div>
                    <div>
                      <h2 className="mb-2">{service.title}</h2>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {service.details.map((detail) => (
                      <div key={detail} className="flex items-start gap-3">
                        <CheckCircle2
                          className="text-accent flex-shrink-0 mt-0.5"
                          size={20}
                        />
                        <span className="text-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-muted rounded-lg p-8 md:p-12 text-center">
            <h2 className="mb-4">Pronto para começar sua reforma?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e receba um orçamento personalizado sem compromisso
            </p>
            <Link
              to="/contato"
              className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg transition-all hover:scale-105"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
