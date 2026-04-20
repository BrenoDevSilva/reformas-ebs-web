import { useState } from "react";
import { toast } from "sonner";
import { LogIn, Mail, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useAuth } from "../../context/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Mode = "options" | "login" | "register" | "forgot";

export default function LoginModal({ open, onClose }: Props) {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, resetPassword } = useAuth();
  const [mode, setMode] = useState<Mode>("options");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const reset = () => {
    setMode("options");
    setForm({ name: "", email: "", password: "" });
    setShowPassword(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Bem-vindo! 👋");
      handleClose();
    } catch {
      toast.error("Falha ao entrar com Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(form.email, form.password);
        toast.success("Bem-vindo de volta! 👋");
      } else {
        await registerWithEmail(form.name, form.email, form.password);
        toast.success("Conta criada com sucesso! 🎉");
      }
      handleClose();
    } catch (err: any) {
      const msg =
        err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential"
          ? "E-mail ou senha incorretos."
          : err.code === "auth/email-already-in-use"
          ? "Este e-mail já está cadastrado."
          : err.code === "auth/weak-password"
          ? "A senha deve ter no mínimo 6 caracteres."
          : "Ocorreu um erro. Tente novamente.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(form.email);
      toast.success("E-mail de redefinição enviado! Verifique sua caixa de entrada.");
      setMode("login");
      setForm({ ...form, email: "" });
    } catch (err: any) {
      toast.error(
        err.code === "auth/user-not-found"
          ? "Nenhuma conta encontrada com este e-mail."
          : "Erro ao enviar e-mail. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const titles: Record<Mode, string> = {
    options: "Entrar na conta",
    login: "Entrar com e-mail",
    register: "Criar conta",
    forgot: "Redefinir senha",
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center">{titles[mode]}</DialogTitle>
        </DialogHeader>

        {mode === "options" && (
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="flex items-center justify-center gap-3 w-full border border-border rounded-lg px-4 py-3 hover:bg-muted transition-colors disabled:opacity-60"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">ou</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              onClick={() => setMode("login")}
              className="flex items-center justify-center gap-3 w-full border border-border rounded-lg px-4 py-3 hover:bg-muted transition-colors"
            >
              <Mail size={20} />
              Entrar com e-mail
            </button>

            <p className="text-center text-sm text-muted-foreground mt-1">
              Não tem conta?{" "}
              <button onClick={() => setMode("register")} className="text-accent hover:underline">
                Criar conta
              </button>
            </p>
          </div>
        )}

        {(mode === "login" || mode === "register") && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4 mt-2">
            {mode === "register" && (
              <div>
                <label className="block mb-1 text-sm font-medium">Nome</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Seu nome"
                />
              </div>
            )}

            <div>
              <label className="block mb-1 text-sm font-medium">E-mail</label>
              <input
                type="email"
                required
                autoComplete="off"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium">Senha</label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-xs text-accent hover:underline"
                  >
                    Esqueci minha senha
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2.5 rounded-lg transition-all disabled:opacity-60"
            >
              <LogIn size={16} />
              {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
            </button>

            <button type="button" onClick={() => setMode("options")} className="text-sm text-muted-foreground hover:text-foreground text-center">
              ← Voltar
            </button>
          </form>
        )}

        {mode === "forgot" && (
          <form onSubmit={handleForgot} className="flex flex-col gap-4 mt-2">
            <p className="text-sm text-muted-foreground">
              Digite seu e-mail e enviaremos um link para redefinir sua senha.
            </p>
            <div>
              <label className="block mb-1 text-sm font-medium">E-mail</label>
              <input
                type="email"
                required
                autoComplete="off"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="seu@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2.5 rounded-lg transition-all disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar link de redefinição"}
            </button>

            <button type="button" onClick={() => setMode("login")} className="text-sm text-muted-foreground hover:text-foreground text-center">
              ← Voltar
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
