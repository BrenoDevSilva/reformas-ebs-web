import { Star, LogIn, Send, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "sonner";
import { db } from "../../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Review {
  id: string;
  userId: string;
  name: string;
  photoURL: string | null;
  project: string;
  rating: number;
  text: string;
}

interface FormState {
  project: string;
  rating: number;
  text: string;
}

export default function Testimonials() {
  const { user, loginWithGoogle } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormState>({ project: "", rating: 5, text: "" });

  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Review)));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (reviews.length <= 3) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const openCreate = () => {
    setEditingReview(null);
    setFormData({ project: "", rating: 5, text: "" });
    setDialogOpen(true);
  };

  const openEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({ project: review.project, rating: review.rating, text: review.text });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      if (editingReview) {
        await updateDoc(doc(db, "reviews", editingReview.id), {
          project: formData.project,
          rating: formData.rating,
          text: formData.text,
        });
        toast.success("Avaliação atualizada!");
      } else {
        await addDoc(collection(db, "reviews"), {
          userId: user.uid,
          name: user.displayName ?? "Anônimo",
          photoURL: user.photoURL ?? null,
          project: formData.project,
          rating: formData.rating,
          text: formData.text,
          createdAt: serverTimestamp(),
        });
        toast.success("Avaliação publicada! Obrigado 🙌");
      }
      setDialogOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (review: Review) => {
    if (!confirm("Tem certeza que deseja remover sua avaliação?")) return;
    await deleteDoc(doc(db, "reviews", review.id));
    toast.success("Avaliação removida.");
  };

  const visibleReviews =
    reviews.length === 0
      ? []
      : reviews.length <= 3
      ? reviews
      : [
          reviews[currentIndex % reviews.length],
          reviews[(currentIndex + 1) % reviews.length],
          reviews[(currentIndex + 2) % reviews.length],
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

        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground mb-10">
            Ainda não há avaliações. Seja o primeiro!
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {visibleReviews.map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-all relative"
                >
                  {user?.uid === review.userId && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => openEdit(review)}
                        className="text-muted-foreground hover:text-accent transition-colors"
                        title="Editar"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(review)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        title="Remover"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}

                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="fill-yellow-400 text-yellow-400" size={20} />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    {review.photoURL ? (
                      <img src={review.photoURL} alt="" className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                        {review.name[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {reviews.length > 3 && (
              <div className="flex justify-center gap-2 mb-10">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex % reviews.length ? "bg-accent w-8" : "bg-border"
                    }`}
                    aria-label={`Ver avaliação ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="text-center">
          {!user ? (
            <div>
              <p className="text-muted-foreground mb-4">
                Já foi nosso cliente? Entre com o Google para deixar sua avaliação.
              </p>
              <button
                onClick={loginWithGoogle}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg transition-all"
              >
                <LogIn size={18} />
                Entrar com Google para avaliar
              </button>
            </div>
          ) : (
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg transition-all hover:scale-105"
            >
              <Star size={18} />
              Deixar minha avaliação
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingReview ? "Editar Avaliação" : "Sua Avaliação"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label className="block mb-1 text-sm font-medium">Serviço contratado</label>
              <input
                type="text"
                required
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: Construção de casa, Elétrica..."
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Nota</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                  >
                    <Star
                      size={28}
                      className={
                        star <= formData.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-border"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Comentário</label>
              <textarea
                required
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Conte como foi sua experiência..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg transition-all disabled:opacity-60"
              >
                <Send size={16} />
                {submitting ? "Salvando..." : editingReview ? "Salvar" : "Publicar"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
