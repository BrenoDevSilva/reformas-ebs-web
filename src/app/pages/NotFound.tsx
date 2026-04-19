import { Link } from "react-router";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center px-4">
        <div className="text-9xl font-bold text-accent mb-4">404</div>
        <h1 className="mb-4">Página Não Encontrada</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg transition-all hover:scale-105"
        >
          <Home size={20} />
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
