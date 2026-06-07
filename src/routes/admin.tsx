import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Particles } from "@/components/layout/Particles";
import { products as INITIAL, type Product } from "@/data/products";
import { Pencil, Plus, Trash2 } from "lucide-react";

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

function Inner() {
  const [toast, setToast] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  const playSound = (type: "success" | "error") => {
  const audio = new Audio(
    type === "success"
      ? "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
      : "https://actions.google.com/sounds/v1/alarms/beep_error.ogg"
  );
  audio.volume = 0.4;
  audio.play();
};
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"produtos" | "promocoes" | "banner">(
    "produtos"
  );

  const [list, setList] = useState<Product[]>(INITIAL);
  const [editing, setEditing] = useState<Product | null>(null);

  const ADMIN_PASSWORD = "mr07102026";
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const remove = (id: string) =>
    setList((p) => p.filter((x) => x.id !== id));

  const save = (p: Product) => {
    setList((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      return exists
        ? prev.map((x) => (x.id === p.id ? p : x))
        : [...prev, p];
    });
    setEditing(null);
  };

  const Toast = () =>
    toast ? (
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div
          className={`px-5 py-3 rounded-xl text-sm font-medium shadow-luxe transition-all duration-300 animate-in fade-in zoom-in ${
            toast.type === "success"
              ? "bg-gradient-luxe text-primary-foreground"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      </div>
    ) : null;

  // 🔐 LOGIN
 if (!authenticated) {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* fundo igual site */}
      <Particles />

      {/* overlay escuro premium */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl" />

      {/* card login */}
      <div
        className={`
          relative z-10 w-full max-w-md rounded-2xl
          border border-border
          bg-card/30 backdrop-blur-2xl
          shadow-card-luxe
          p-8
          transition-all duration-300
          ${shake ? "animate-shake" : ""}
        `}
      >

        <div className="text-center mb-6">
          <h1 className="text-2xl font-display text-primary">
            Área Administrativa
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Digite a senha para continuar
          </p>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha de acesso"
          className="
            w-full rounded-xl border border-border
            bg-background/40 backdrop-blur-md
            px-3 py-3 text-sm
            focus:border-primary focus:ring-2 focus:ring-primary/30
            transition
          "
        />

        <button
  onClick={() => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        playSound("success");

        setToast({
          type: "success",
          message: "Acesso autorizado",
        });

        setShake(false);

        setTimeout(() => {
          setAuthenticated(true);

          setTimeout(() => {
            setToast(null);
            setLoading(false);
          }, 1200);
        }, 900);

      } else {
        playSound("error");

        setToast({
          type: "error",
          message: "Senha incorreta",
        });

        setShake(true);

        setTimeout(() => setShake(false), 500);

        setTimeout(() => {
          setToast(null);
          setLoading(false);
        }, 1500);
      }
    }, 300);
  }}
  disabled={loading}
  className="
    mt-4 w-full rounded-xl
    bg-gradient-luxe
    text-primary-foreground
    py-2 font-medium
    transition-all duration-300
    hover:shadow-glow-gold hover:scale-[1.02]
    active:scale-[0.98]
    disabled:opacity-50
  "
>
  {loading ? "Verificando..." : "Entrar no painel"}
</button>

        <p className="mt-4 text-xs text-center text-muted-foreground">
          Sistema seguro • acesso restrito
        </p>
      </div>
    </main>
  );
}
  // 🔓 PAINEL
  return (
    <>
      <Toast />

      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary">
              Painel
            </p>
            <h1 className="mt-1 font-display text-4xl md:text-5xl">
              Administração
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gerencie produtos, promoções e banner.{" "}
              <Link to="/" className="text-primary hover:underline">
                Voltar à loja
              </Link>
            </p>
          </div>

          <div className="inline-flex rounded-full border border-border bg-card p-1">
            {(["produtos", "promocoes", "banner"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 text-sm capitalize transition ${
                  tab === t
                    ? "bg-gradient-luxe text-primary-foreground shadow-glow-gold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUTOS */}
        {tab === "produtos" && (
          <section>
            <div className="mb-4 flex justify-end">
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
                className="inline-flex items-center gap-2 rounded-full bg-gradient-luxe px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-card-luxe hover:shadow-glow-gold"
              >
                <Plus className="h-4 w-4" /> Novo produto
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card-luxe">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Produto</th>
                    <th className="px-4 py-3">Marca</th>
                    <th className="px-4 py-3">Categoria</th>
                    <th className="px-4 py-3">Preço</th>
                    <th className="px-4 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((p) => (
                    <tr key={p.id} className="border-t border-border">
                      <td className="px-4 py-3 font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {p.brand}
                      </td>
                      <td className="px-4 py-3 capitalize text-muted-foreground">
                        {p.category}
                      </td>
                      <td className="px-4 py-3 text-gradient-luxe font-semibold">
                        {fmt(p.price)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setEditing(p)}
                          className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted text-primary"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => remove(p.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* PROMOÇÕES */}
        {tab === "promocoes" && (
          <section className="rounded-2xl border border-border bg-card p-8 shadow-card-luxe">
            <h2 className="font-display text-2xl">Promoções ativas</h2>
            <ul className="mt-6 divide-y divide-border">
              {list
                .filter((p) => p.promo)
                .map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between py-3"
                  >
                    <span>{p.name}</span>
                    <span className="text-sm text-muted-foreground">
                      <span className="line-through mr-2">
                        {p.oldPrice && fmt(p.oldPrice)}
                      </span>
                      <span className="text-gradient-luxe font-semibold">
                        {fmt(p.price)}
                      </span>
                    </span>
                  </li>
                ))}
            </ul>
          </section>
        )}

        {/* BANNER */}
        {tab === "banner" && <BannerEditor />}

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