import { Star } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    project: "Reforma Apartamento 120m²",
    rating: 5,
    text: "Equipe extremamente profissional. Cumpriram todos os prazos e o acabamento ficou impecável. Recomendo!",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    project: "Reforma Completa Casa",
    rating: 5,
    text: "A melhor decisão foi escolher a EBS. Transparência total do início ao fim, obra limpa e organizada.",
  },
  {
    id: 3,
    name: "Ana Rodrigues",
    project: "Renovação Cozinha e Banheiros",
    rating: 5,
    text: "Superou minhas expectativas! A atenção aos detalhes e qualidade dos materiais utilizados são excelentes.",
  },
  {
    id: 4,
    name: "Roberto Santos",
    project: "Reforma Escritório Comercial",
    rating: 5,
    text: "Profissionais sérios e competentes. Entregaram no prazo combinado sem comprometer a qualidade.",
  },
  {
    id: 5,
    name: "Juliana Costa",
    project: "Retrofit Apartamento Antigo",
    rating: 5,
    text: "Transformaram completamente meu apartamento. Trabalho impecável e equipe muito educada e pontual.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="fill-yellow-400 text-yellow-400" size={20} />
                ))}
              </div>

              <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>

              <div>
                <p className="font-medium text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.project}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-accent w-8" : "bg-border"
              }`}
              aria-label={`Ver depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
