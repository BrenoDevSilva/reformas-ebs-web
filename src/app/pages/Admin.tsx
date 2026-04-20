import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";
import { Trash2, Phone, Mail, Building, MessageSquare, Calendar } from "lucide-react";
import { toast } from "sonner";

const ADMIN_EMAILS = ["breno.ss1808@gmail.com"];

interface Orcamento {
  id: string;
  name: string;
  whatsapp: string;
  propertyType: string;
  message: string;
  createdAt: any;
}

interface Parceria {
  id: string;
  name: string;
  company: string;
  whatsapp: string;
  area: string;
  message: string;
  createdAt: any;
}

type Tab = "orcamentos" | "parcerias";

function formatDate(ts: any) {
  if (!ts) return "—";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function Admin() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("orcamentos");
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [parcerias, setParcerias] = useState<Parceria[]>([]);

  const isAdmin = user && ADMIN_EMAILS.includes(user.email ?? "");

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, "orcamentos"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) =>
      setOrcamentos(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Orcamento)))
    );
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, "parcerias"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) =>
      setParcerias(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Parceria)))
    );
  }, [isAdmin]);

  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  const handleDelete = async (colecao: string, id: string) => {
    if (!confirm("Remover este registro?")) return;
    await deleteDoc(doc(db, colecao, id));
    toast.success("Registro removido.");
  };

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-2">Painel Administrativo</h1>
          <p className="opacity-80">Gerencie orçamentos e propostas de parceria recebidas</p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setTab("orcamentos")}
              className={`pb-3 px-1 font-medium transition-colors border-b-2 -mb-px ${
                tab === "orcamentos" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Orçamentos{" "}
              <span className="ml-1 bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                {orcamentos.length}
              </span>
            </button>
            <button
              onClick={() => setTab("parcerias")}
              className={`pb-3 px-1 font-medium transition-colors border-b-2 -mb-px ${
                tab === "parcerias" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Parcerias{" "}
              <span className="ml-1 bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                {parcerias.length}
              </span>
            </button>
          </div>

          {/* Orçamentos */}
          {tab === "orcamentos" && (
            <div className="space-y-4">
              {orcamentos.length === 0 ? (
                <p className="text-muted-foreground text-center py-16">Nenhum orçamento recebido ainda.</p>
              ) : (
                orcamentos.map((o) => (
                  <div key={o.id} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{o.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar size={12} />
                          {formatDate(o.createdAt)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete("orcamentos", o.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-accent flex-shrink-0" />
                        <a href={`https://wa.me/55${o.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                          {o.whatsapp}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building size={14} className="text-accent flex-shrink-0" />
                        <span>{o.propertyType}</span>
                      </div>
                    </div>

                    {o.message && (
                      <div className="flex gap-2 text-sm text-muted-foreground bg-muted rounded-lg p-3">
                        <MessageSquare size={14} className="flex-shrink-0 mt-0.5" />
                        <p>{o.message}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Parcerias */}
          {tab === "parcerias" && (
            <div className="space-y-4">
              {parcerias.length === 0 ? (
                <p className="text-muted-foreground text-center py-16">Nenhuma proposta de parceria recebida ainda.</p>
              ) : (
                parcerias.map((p) => (
                  <div key={p.id} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{p.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar size={12} />
                          {formatDate(p.createdAt)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete("parcerias", p.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-accent flex-shrink-0" />
                        <a href={`https://wa.me/55${p.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                          {p.whatsapp}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building size={14} className="text-accent flex-shrink-0" />
                        <span>{p.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-accent flex-shrink-0" />
                        <span>{p.area}</span>
                      </div>
                    </div>

                    {p.message && (
                      <div className="flex gap-2 text-sm text-muted-foreground bg-muted rounded-lg p-3">
                        <MessageSquare size={14} className="flex-shrink-0 mt-0.5" />
                        <p>{p.message}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
