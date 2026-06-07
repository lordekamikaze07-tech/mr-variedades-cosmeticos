import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Particles } from "@/components/layout/Particles";
import { products as INITIAL, type Product } from "@/data/products";
import { Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · MR Variedades & Cosméticos" },
      { name: "description", content: "Painel administrativo da loja." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="relative min-h-screen">
      <Particles />
      <div className="relative z-10">
        <Header />
        <Inner />
      </div>
    </div>
  );
}

const fmt = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/* ================= FORM ================= */
function ProductForm({ initial, onClose, onSave }: any) {
  const [form, setForm] = useState(initial);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-card-luxe space-y-3 animate-in zoom-in">

        <h2 className="text-lg font-display text-primary">Editar Produto</h2>

        {["name", "brand", "price", "description", "image"].map((field) => (
          <input
            key={field}
            className="w-full border border-border rounded-lg p-2 bg-background/40 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
            value={(form as any)[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
          />
        ))}

        <select
          className="w-full border border-border rounded-lg p-2 bg-background/40"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="perfumes">Perfumes</option>
          <option value="cosmeticos">Cosméticos</option>
          <option value="beleza">Beleza</option>
        </select>

        <button
          onClick={() => {
            onSave(form);
            onClose();
          }}
          className="w-full bg-gradient-luxe text-white py-2 rounded-lg hover:shadow-glow-gold hover:scale-[1.02] transition"
        >
          Salvar
        </button>

        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-primary transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

/* ================= INNER ================= */
function Inner() {
  const [toast, setToast] = useState<any>(null);
  const [banners, setBanners] = useState([
  { id: 1, text: "✨ Bem-vindo à MR Variedades & Cosméticos — os melhores perfumes e cosméticos com preço justo e qualidade premium!" },
  { id: 2, text: "✨ Beleza, autoestima e qualidade em um só lugar. Descubra perfumes e cosméticos que elevam sua presença!" },
]);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"produtos" | "promocoes" | "banner">("produtos");

  const [list, setList] = useState<Product[]>(INITIAL);
  const [editing, setEditing] = useState<Product | null>(null);

  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const ADMIN_PASSWORD = "mr07102026";

  const remove = (id: string) =>
    setList((p) => p.filter((x) => x.id !== id));

  const save = (p: Product) => {
    setList((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      return exists ? prev.map((x) => (x.id === p.id ? p : x)) : [...prev, p];
    });

    setEditing(null);
    setToast({ type: "success", message: "Produto salvo com sucesso!" });
  };

  /* AUTO CLOSE TOAST */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const playSound = (type: "success" | "error") => {
    const audio = new Audio(
      type === "success"
        ? "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        : "https://actions.google.com/sounds/v1/alarms/beep_error.ogg"
    );
    audio.volume = 0.4;
    audio.play();
  };

  const Toast = () =>
    toast ? (
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in">
        <div
          className={`px-5 py-3 rounded-xl shadow-glow-gold backdrop-blur text-white ${
            toast.type === "success"
              ? "bg-gradient-luxe"
              : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      </div>
    ) : null;

  /* LOGIN */
  if (!authenticated) {
    return (
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 z-0">
          <Particles />
        </div>

        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className={`relative z-20 w-full max-w-md p-8 ${shake ? "animate-shake" : ""}`}>
          <h1 className="text-2xl text-primary text-center">
            Área Administrativa
          </h1>

          <input
            type="password"
            className="w-full mt-4 p-2 rounded border bg-background/40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full mt-4 bg-gradient-luxe text-white p-2 rounded hover:shadow-glow-gold transition"
            onClick={() => {
              setLoading(true);

              setTimeout(() => {
                if (password === ADMIN_PASSWORD) {
                  playSound("success");
                  setToast({ type: "success", message: "Acesso autorizado" });
                  setAuthenticated(true);
                } else {
                  playSound("error");
                  setToast({ type: "error", message: "Senha incorreta" });
                  setShake(true);
                  setTimeout(() => setShake(false), 500);
                }

                setLoading(false);
              }, 300);
            }}
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </div>
      </main>
    );
  }

  /* PAINEL */
  return (
    <>
      <Toast />

      <main className="mx-auto max-w-7xl px-4 py-12">


        {/* MENU CORRIGIDO */}
        <div className="flex items-center justify-center gap-4 mb-6 text-sm">
          {["Produtos", "Promoções", "Banner"].map((t, i) => (
            <div key={t} className="flex items-center gap-4">
              <button
                onClick={() => setTab(t as any)}
                className={tab === t ? "text-primary" : "text-muted-foreground"}
              >
                {t}
              </button>
              {i < 2 && <span className="text-muted-foreground">---</span>}
            </div>
          ))}
        </div>

        {/* PRODUTOS */}
        {tab === "Produtos" && (
  <>
    <button
      onClick={() =>
        setEditing({
          id: crypto.randomUUID(),
          name: "",
          brand: "",
          price: 0,
          description: "",
          category: "perfumes",
          image: "",
        })
      }
      className="
        mb-4 bg-gradient-luxe text-white px-4 py-2 rounded
        hover:shadow-glow-gold hover:scale-[1.05]
        transition-all duration-300
      "
    >
      + Novo produto
    </button>

    {list.map((p) => (
      <div
        key={p.id}
        className="
          flex justify-between border p-3 rounded
          hover:shadow-glow-gold/20
          transition-all duration-300
        "
      >
        {p.name}

        <div className="flex gap-2">
          <button
            onClick={() => setEditing(p)}
            className="
              text-primary
              hover:scale-125 hover:drop-shadow-lg
              transition
            "
          >
            <Pencil />
          </button>

          <button
            onClick={() => remove(p.id)}
            className="
              text-red-400
              hover:scale-125 hover:drop-shadow-lg
              transition
            "
          >
            <Trash2 />
          </button>
        </div>
      </div>
    ))}
  </>
)}

        {/* PROMOÇÕES */}
        {tab === "Promoções" && (
  <div className="space-y-2">
    {list.filter(p => p.promo).map((p) => (
      <div
        key={p.id}
        className="
          flex justify-between border p-3 rounded
          hover:shadow-glow-gold/20
          transition-all duration-300
        "
      >
        {p.name}

        <div className="flex gap-2">
          <button
            onClick={() => setEditing(p)}
            className="text-primary hover:scale-125 transition"
          >
            <Pencil />
          </button>

          <button
            onClick={() => remove(p.id)}
            className="text-red-400 hover:scale-125 transition"
          >
            <Trash2 />
          </button>
        </div>
      </div>
    ))}
  </div>
)}

        {/* BANNER */}
{tab === "Banner" && (
  <div className="space-y-4">

    {banners.map((b, index) => (
      <div
        key={b.id}
        className="border border-border rounded-lg p-3 transition hover:shadow-glow-gold"
      >
        <p className="text-sm text-muted-foreground mb-2">
          Banner {index + 1}
        </p>

        <input
          className="w-full border rounded p-2 bg-background/40 transition focus:ring-2 focus:ring-primary/30"
          value={b.text}
          onChange={(e) => {
            const copy = [...banners];
            copy[index].text = e.target.value;
            setBanners(copy);
          }}
        />
      </div>
    ))}

  </div>
)}

        {editing && (
          <ProductForm
            initial={editing}
            onClose={() => setEditing(null)}
            onSave={save}
          />
        )}

      </main>
    </>
  );
}