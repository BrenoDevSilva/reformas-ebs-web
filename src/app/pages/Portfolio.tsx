import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

const categories = ["Todos", "Residencial", "Comercial", "Reforma Geral", "Acabamento"];

const projects = [
  {
    id: 1,
    title: "Apartamento Jardins",
    category: "Residencial",
    type: "Reforma Geral",
    area: "120m²",
    duration: "3 meses",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  },
  {
    id: 2,
    title: "Cobertura Morumbi",
    category: "Residencial",
    type: "Acabamento",
    area: "250m²",
    duration: "4 meses",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    id: 3,
    title: "Casa Alphaville",
    category: "Residencial",
    type: "Reforma Geral",
    area: "350m²",
    duration: "6 meses",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  },
  {
    id: 4,
    title: "Escritório Corporativo",
    category: "Comercial",
    type: "Reforma Geral",
    area: "180m²",
    duration: "2 meses",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    id: 5,
    title: "Loft Vila Madalena",
    category: "Residencial",
    type: "Acabamento",
    area: "80m²",
    duration: "2 meses",
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80",
  },
  {
    id: 6,
    title: "Consultório Médico",
    category: "Comercial",
    type: "Reforma Geral",
    area: "100m²",
    duration: "1.5 mês",
    image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=800&q=80",
  },
  {
    id: 7,
    title: "Residência Higienópolis",
    category: "Residencial",
    type: "Reforma Geral",
    area: "200m²",
    duration: "5 meses",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
  },
  {
    id: 8,
    title: "Restaurante Gourmet",
    category: "Comercial",
    type: "Reforma Geral",
    area: "220m²",
    duration: "3 meses",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  },
  {
    id: 9,
    title: "Cobertura Itaim",
    category: "Residencial",
    type: "Acabamento",
    area: "280m²",
    duration: "4 meses",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
  },
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProjects =
    selectedCategory === "Todos"
      ? projects
      : projects.filter(
          (project) =>
            project.category === selectedCategory || project.type === selectedCategory
        );

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4">Nosso Portfólio</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Conheça alguns dos projetos que transformamos com excelência e qualidade
          </p>
        </div>
      </section>

      <section className="py-12 bg-muted sticky top-16 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-accent-foreground"
                    : "bg-card text-foreground hover:bg-accent/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6">
                  <h3 className="mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                      {project.type}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Área: {project.area}</p>
                    <p>Duração: {project.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
