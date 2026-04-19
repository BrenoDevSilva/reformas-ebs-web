import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Apartamento Jardins",
    category: "Reforma Geral",
    before: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  },
  {
    id: 2,
    title: "Cobertura Morumbi",
    category: "Acabamento Fino",
    before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    after: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    id: 3,
    title: "Casa Alphaville",
    category: "Reforma Completa",
    before: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    after: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  },
];

export default function PortfolioSneak() {
  const [sliderPositions, setSliderPositions] = useState<{ [key: number]: number }>(
    projects.reduce((acc, project) => ({ ...acc, [project.id]: 50 }), {})
  );

  const handleSliderChange = (projectId: number, value: number) => {
    setSliderPositions(prev => ({ ...prev, [projectId]: value }));
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Projetos em Destaque</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Veja a transformação dos nossos projetos de reforma com qualidade comprovada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-muted">
                <ImageWithFallback
                  src={project.before}
                  alt={`${project.title} - Antes`}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPositions[project.id]}% 0 0)`,
                  }}
                >
                  <ImageWithFallback
                    src={project.after}
                    alt={`${project.title} - Depois`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="absolute top-4 left-4 flex gap-2 text-xs">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    Antes
                  </span>
                  <span className="bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Depois
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPositions[project.id]}
                  onChange={(e) => handleSliderChange(project.id, Number(e.target.value))}
                  className="absolute inset-x-0 bottom-4 mx-auto w-[calc(100%-2rem)] appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:h-12 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:w-1 [&::-moz-range-thumb]:h-12 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-lg"
                />
              </div>

              <h3 className="mb-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.category}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/portfolio"
            className="inline-block border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-lg transition-all"
          >
            Ver Portfólio Completo
          </Link>
        </div>
      </div>
    </section>
  );
}
