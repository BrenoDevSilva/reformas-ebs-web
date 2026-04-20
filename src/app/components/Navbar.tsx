import { Link, useLocation } from "react-router";
import { Menu, X, LogIn, LogOut, User, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./auth/LoginModal";

const ADMIN_EMAILS = ["breno.ss1808@gmail.com"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user && ADMIN_EMAILS.includes(user.email ?? "");

  const links = [
    { name: "Home", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: "Portfólio", path: "/portfolio" },
    { name: "Galeria", path: "/galeria" },
    { name: "Sobre Nós", path: "/sobre" },
    { name: "Contato", path: "/contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    const name = user?.displayName ?? "você";
    await logout();
    setIsOpen(false);
    toast.success(`Até logo, ${name}! 👋`);
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Reformas EBS</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${
                    isActive(link.path) ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-1.5 text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <ShieldCheck size={15} />
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full" />
                    ) : (
                      <User size={18} />
                    )}
                    <span className="max-w-[120px] truncate">{user.displayName ?? user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg text-sm transition-all"
                >
                  <LogIn size={16} />
                  Entrar
                </button>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {user ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 mx-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm"
                      >
                        <ShieldCheck size={16} />
                        Painel Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <LogOut size={16} />
                      Sair ({user.displayName ?? user.email})
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setIsOpen(false); setLoginOpen(true); }}
                    className="flex items-center gap-2 mx-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm transition-all"
                  >
                    <LogIn size={16} />
                    Entrar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
