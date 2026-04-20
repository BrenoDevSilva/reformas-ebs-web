import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <img
        src="/galeria/WhatsApp Image 2026-04-18 at 21.41.03 (2).jpeg"
        alt="Obra Reformas EBS"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-primary/90 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-white mb-6 max-w-4xl mx-auto text-4xl md:text-5xl lg:text-6xl">
          Construção sem dor de cabeça e entregue no prazo, com qualidade garantida
        </h1>

        <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg md:text-xl">
          Transformamos seu projeto em realidade com excelência, transparência e compromisso total com prazos
        </p>

        <Link
          to="/contato"
          className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-xl"
        >
          Solicitar Orçamento
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}
