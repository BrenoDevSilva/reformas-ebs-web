import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Users, Clock, ThumbsUp, Shield } from "lucide-react";

const values = [
  {
    icon: Clock,
    title: "Pontualidade",
    description: "Comprometimento total com prazos estabelecidos em contrato",
  },
  {
    icon: ThumbsUp,
    title: "Qualidade",
    description: "Excelência em cada detalhe, do planejamento à execução",
  },
  {
    icon: Shield,
    title: "Transparência",
    description: "Comunicação clara e honesta em todas as etapas do projeto",
  },
  {
    icon: Users,
    title: "Profissionalismo",
    description: "Equipe qualificada, educada e comprometida com resultados",
  },
];

const stats = [
  { number: "150+", label: "Projetos Concluídos" },
  { number: "12+", label: "Anos de Experiência" },
  { number: "98%", label: "Clientes Satisfeitos" },
  { number: "100%", label: "Obras no Prazo" },
];

export default function Sobre() {
  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4">Sobre a Reformas EBS</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Construindo com qualidade, confiança e expertise desde 2014
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Nossa História</h2>
              <div className="space-y-4 text-foreground">
                <p>
                  A Reformas EBS nasceu em 2014 com uma missão clara: realizar construções
                  de alto padrão sem os problemas tradicionais do setor. Fundada por
                  Eduardo Barbosa Silva, engenheiro civil com mais de 15 anos de experiência,
                  a empresa se destacou desde o início pela entrega pontual e qualidade
                  impecável.
                </p>
                <p>
                  Ao longo dos anos, construímos uma reputação sólida baseada em três
                  pilares fundamentais: cumprimento de prazos, transparência total com
                  o cliente e acabamento de excelência. Cada projeto é tratado com o
                  mesmo cuidado e atenção aos detalhes, independentemente do tamanho.
                </p>
                <p>
                  Hoje, somos referência em construções residenciais e comerciais de alto
                  padrão na região de São Paulo, com uma equipe especializada e
                  processos otimizados que garantem a satisfação dos nossos clientes.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Eduardo Barbosa Silva - Fundador"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-xl max-w-xs">
                <p className="text-sm">
                  "Nossa missão é transformar cada construção em uma experiência positiva
                  e sem estresse para o cliente."
                </p>
                <p className="text-xs mt-2 opacity-80">
                  Eduardo Barbosa Silva, Fundador
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Nossos Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam cada decisão e ação da nossa empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-card p-6 rounded-lg text-center hover:shadow-lg transition-shadow border border-border"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-accent" size={28} />
                  </div>
                  <h3 className="mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl mb-2 text-accent">{stat.number}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
