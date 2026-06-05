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
  const [tab, setTab] = useState<"produtos" | "promocoes" | "banner">("produtos");
  const [list, setList] = useState<Product[]>(INITIAL);
  const [editing, setEditing] = useState<Product | null>(null);

  const remove = (id: string) => setList((p) => p.filter((x) => x.id !== id));
  const save = (p: Product) => {
    setList((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      return exists ? prev.map((x) => (x.id === p.id ? p : x)) : [...prev, p];
    });
    setEditing(null);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-primary">Painel</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">Administração</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie produtos, promoções e banner.{" "}
            <Link to="/" className="text-primary hover:underline">Voltar à loja</Link>
          </p>
        </div>
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          {(["produtos", "promocoes", "banner"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm capitalize transition ${
                tab === t ? "bg-gradient-luxe text-primary-foreground shadow-glow-gold" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "produtos" && (
        <section>
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => setEditing({ id: crypto.randomUUID(), name: "", brand: "", price: 0, description: "", category: "perfumes", image: "" })}
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
                    <td className="px-4 py-3 text-muted-foreground">{p.brand}</td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3 text-gradient-luxe font-semibold">{fmt(p.price)}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setEditing(p)} className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted text-primary">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => remove(p.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted text-destructive">
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

      {tab === "promocoes" && (
        <section className="rounded-2xl border border-border bg-card p-8 shadow-card-luxe">
          <h2 className="font-display text-2xl">Promoções ativas</h2>
          <p className="mt-1 text-sm text-muted-foreground">Marque produtos com preço antigo para virarem promoção automaticamente.</p>
          <ul className="mt-6 divide-y divide-border">
            {list.filter((p) => p.promo).map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3">
                <span>{p.name}</span>
                <span className="text-sm text-muted-foreground">
                  <span className="line-through mr-2">{p.oldPrice && fmt(p.oldPrice)}</span>
                  <span className="text-gradient-luxe font-semibold">{fmt(p.price)}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === "banner" && <BannerEditor />}

      {editing && <ProductForm initial={editing} onClose={() => setEditing(null)} onSave={save} />}
    </main>
  );
}

function BannerEditor() {
  const [data, setData] = useState({
    title: "Beleza, fragrância e cuidado para você.",
    subtitle: "Perfumes, cosméticos e produtos de beleza selecionados para você.",
    promoText: "Frete grátis acima de R$ 299",
  });
  return (
    <section className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-card-luxe md:grid-cols-2">
      <div className="space-y-4">
        <h2 className="font-display text-2xl">Banner principal</h2>
        <Field label="Título" value={data.title} onChange={(v) => setData({ ...data, title: v })} />
        <Field label="Subtítulo" value={data.subtitle} onChange={(v) => setData({ ...data, subtitle: v })} />
        <Field label="Texto promocional" value={data.promoText} onChange={(v) => setData({ ...data, promoText: v })} />
        <button className="mt-2 rounded-full bg-gradient-luxe px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-card-luxe hover:shadow-glow-gold">
          Salvar alterações
        </button>
      </div>
      <div className="rounded-xl border border-border bg-gradient-soft p-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary">Preview</p>
        <h3 className="mt-2 font-display text-3xl">{data.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{data.subtitle}</p>
        <span className="mt-4 inline-block rounded-full bg-gradient-luxe px-4 py-1 text-xs text-primary-foreground">{data.promoText}</span>
      </div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}

function ProductForm({ initial, onClose, onSave }: { initial: Product; onClose: () => void; onSave: (p: Product) => void }) {
  const [p, setP] = useState<Product>(initial);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
      <form
        onSubmit={(e) => { e.preventDefault(); onSave(p); }}
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-luxe"
      >
        <h3 className="font-display text-2xl">{initial.name ? "Editar produto" : "Novo produto"}</h3>
        <div className="mt-5 grid gap-4">
          <Field label="Nome" value={p.name} onChange={(v) => setP({ ...p, name: v })} />
          <Field label="Marca" value={p.brand} onChange={(v) => setP({ ...p, brand: v })} />
          <Field label="Descrição" value={p.description} onChange={(v) => setP({ ...p, description: v })} />
          <Field label="Imagem (URL)" value={p.image} onChange={(v) => setP({ ...p, image: v })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Preço" value={String(p.price)} onChange={(v) => setP({ ...p, price: Number(v) || 0 })} />
            <Field label="Preço antigo" value={String(p.oldPrice ?? "")} onChange={(v) => setP({ ...p, oldPrice: v ? Number(v) : undefined, promo: !!v })} />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full border border-border px-5 py-2 text-sm">Cancelar</button>
          <button type="submit" className="rounded-full bg-gradient-luxe px-5 py-2 text-sm font-medium text-primary-foreground shadow-card-luxe hover:shadow-glow-gold">Salvar</button>
        </div>
      </form>
    </div>
  );
}
