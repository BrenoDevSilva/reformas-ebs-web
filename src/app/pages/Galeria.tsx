import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { id: 1, image: "/galeria/WhatsApp Image 2026-04-18 at 21.24.04.jpeg" },
  { id: 2, image: "/galeria/WhatsApp Image 2026-04-18 at 21.39.39.jpeg" },
  { id: 3, image: "/galeria/WhatsApp Image 2026-04-18 at 21.39.40.jpeg" },
  { id: 4, image: "/galeria/WhatsApp Image 2026-04-18 at 21.39.44 (1).jpeg" },
  { id: 5, image: "/galeria/WhatsApp Image 2026-04-18 at 21.39.44.jpeg" },
  { id: 6, image: "/galeria/WhatsApp Image 2026-04-18 at 21.39.45.jpeg" },
  { id: 7, image: "/galeria/WhatsApp Image 2026-04-18 at 21.39.46.jpeg" },
  { id: 8, image: "/galeria/WhatsApp Image 2026-04-18 at 21.39.47.jpeg" },
  { id: 9, image: "/galeria/WhatsApp Image 2026-04-18 at 21.39.49.jpeg" },
  { id: 10, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.06.jpeg" },
  { id: 11, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.10.jpeg" },
  { id: 12, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.13.jpeg" },
  { id: 13, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.15.jpeg" },
  { id: 14, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.17.jpeg" },
  { id: 15, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.20.jpeg" },
  { id: 16, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.28.jpeg" },
  { id: 17, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.31.jpeg" },
  { id: 18, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.33.jpeg" },
  { id: 19, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.40 (1).jpeg" },
  { id: 20, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.40.jpeg" },
  { id: 21, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.41 (1).jpeg" },
  { id: 22, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.41.jpeg" },
  { id: 23, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.42.jpeg" },
  { id: 24, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.58 (1).jpeg" },
  { id: 25, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.58 (2).jpeg" },
  { id: 26, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.58.jpeg" },
  { id: 27, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.59 (1).jpeg" },
  { id: 28, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.59 (2).jpeg" },
  { id: 29, image: "/galeria/WhatsApp Image 2026-04-18 at 21.40.59.jpeg" },
  { id: 30, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.00 (1).jpeg" },
  { id: 31, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.00 (2).jpeg" },
  { id: 32, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.00.jpeg" },
  { id: 33, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.01 (1).jpeg" },
  { id: 34, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.01 (2).jpeg" },
  { id: 35, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.01.jpeg" },
  { id: 36, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.02 (1).jpeg" },
  { id: 37, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.02 (2).jpeg" },
  { id: 38, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.02.jpeg" },
  { id: 39, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.03 (1).jpeg" },
  { id: 40, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.03 (2).jpeg" },
  { id: 41, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.03.jpeg" },
  { id: 42, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.04 (1).jpeg" },
  { id: 43, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.04 (2).jpeg" },
  { id: 44, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.04.jpeg" },
  { id: 45, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.05 (1).jpeg" },
  { id: 46, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.05..jpeg" },
  { id: 47, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.05.jpeg" },
  { id: 48, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.06 (1).jpeg" },
  { id: 49, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.06..jpeg" },
  { id: 50, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.06.jpeg" },
  { id: 51, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.07 (1).jpeg" },
  { id: 52, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.07 (2).jpeg" },
  { id: 53, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.07.jpeg" },
  { id: 54, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.08 (1).jpeg" },
  { id: 55, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.08 (2).jpeg" },
  { id: 56, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.08.jpeg" },
  { id: 57, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.09 (1).jpeg" },
  { id: 58, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.09..jpeg" },
  { id: 59, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.09.jpeg" },
  { id: 60, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.10 (1).jpeg" },
  { id: 61, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.10 (2).jpeg" },
  { id: 62, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.10.jpeg" },
  { id: 63, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.11 (1).jpeg" },
  { id: 64, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.11 (2).jpeg" },
  { id: 65, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.11.jpeg" },
  { id: 66, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.12 (1).jpeg" },
  { id: 67, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.12.jpeg" },
  { id: 68, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.13 (1).jpeg" },
  { id: 69, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.13 (2).jpeg" },
  { id: 70, image: "/galeria/WhatsApp Image 2026-04-18 at 21.41.13.jpeg" },
];

export default function Galeria() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (dir: number) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + dir + photos.length) % photos.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") navigate(1);
    if (e.key === "ArrowLeft") navigate(-1);
  };

  return (
    <div className="min-h-screen" onKeyDown={handleKeyDown} tabIndex={-1}>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4">Galeria de Fotos</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Conheça de perto os detalhes dos nossos trabalhos
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            style={{
              columns: "4 250px",
              columnGap: "0.75rem",
            }}
          >
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative cursor-zoom-in overflow-hidden rounded-lg mb-3"
                onClick={() => openLightbox(index)}
                style={{ breakInside: "avoid" }}
              >
                <ImageWithFallback
                  src={photo.image}
                  alt=""
                  className="w-full block transition-transform duration-400 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/93 flex items-center justify-center p-6"
          onClick={closeLightbox}
        >
          {/* Prev */}
          <button
            className="fixed left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded p-2 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next */}
          <button
            className="fixed right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded p-2 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
          >
            <ChevronRight size={28} />
          </button>

          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={closeLightbox}
          >
            <X size={30} />
          </button>

          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback
              src={photos[lightboxIndex].image}
              alt=""
              className="w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
