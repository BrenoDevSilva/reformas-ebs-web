import {
  Home,
  Droplets,
  Zap,
  Paintbrush,
  HardHat,
  Sparkles
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Reforma Geral",
    description: "Transformação completa do seu imóvel com planejamento e execução impecável",
  },
  {
    icon: Droplets,
    title: "Hidráulica",
    description: "Instalação e manutenção de sistemas hidráulicos com tecnologia de ponta",
  },
  {
    icon: Zap,
    title: "Elétrica",
    description: "Projetos elétricos seguros e eficientes, dentro das normas técnicas",
  },
  {
    icon: Paintbrush,
    title: "Pintura",
    description: "Acabamento profissional com as melhores técnicas e materiais",
  },
  {
    icon: HardHat,
    title: "Alvenaria",
    description: "Construção e reforma estrutural com engenharia de qualidade",
  },
  {
    icon: Sparkles,
    title: "Acabamento Fino",
    description: "Detalhes que fazem a diferença em ambientes de alto padrão",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Nossos Serviços</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluções completas em reformas e construção civil para projetos residenciais e comerciais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-card p-6 rounded-lg hover:shadow-lg transition-shadow border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="text-accent" size={24} />
                </div>
                <h3 className="mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
