import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, AlertTriangle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Particles } from "@/components/layout/Particles";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho · MR Variedades & Cosméticos" },
      { name: "description", content: "Revise os itens da sua sacola e finalize seu pedido." },
    ],
  }),
  component: CartPage,
});

const fmt = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const WHATSAPP_NUMBER = "5500000000000";
const INSTAGRAM_USER = "lumiere.beleza";

function CartPage() {
  const { items, setQty, remove, total, clear } = useCart();

  const buildMessage = () => {
    const lines = items.map(
      (i) => `• ${i.product.name} (${i.quantity}x) — ${fmt(i.product.price * i.quantity)}`,
    );
    return [
      "Olá! Gostaria de fazer um pedido:",
      "",
      ...lines,
      "",
      `Total estimado: ${fmt(total)}`,
    ].join("\n");
  };

  const sendWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank");
  };
  const sendInstagram = () => {
    navigator.clipboard?.writeText(buildMessage()).catch(() => {});
    window.open(`https://instagram.com/${INSTAGRAM_USER}`, "_blank");
  };

  return (
    <div className="relative min-h-screen">
      <Particles />
      <div className="relative z-10">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-12 md:px-8">
          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">Sua sacola</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">Carrinho</h1>
          </header>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-16 text-center shadow-card-luxe">
              <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-primary/40" />
              <p className="font-display text-2xl">Sua sacola está vazia</p>
              <p className="mt-2 text-sm text-muted-foreground">Explore nossa curadoria e adicione produtos.</p>
              <Link
                to="/"
                className="mt-6 inline-flex rounded-full bg-gradient-luxe px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow-gold"
              >
                Voltar à loja
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr,360px]">
              <ul className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card-luxe">
                    <img src={product.image} alt={product.name} className="h-28 w-28 rounded-xl object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-primary/80">{product.brand}</p>
                          <p className="font-display text-lg leading-tight">{product.name}</p>
                        </div>
                        <button
  onClick={() => {
    remove(product.id);

    toast.error(`${product.name} removido do carrinho`, {
  description: "Produto removido com sucesso.",
  icon: <Trash2 className="h-4 w-4" />,
});
  }}
  className="text-muted-foreground hover:text-destructive"
  aria-label="Remover"
>
  <Trash2 className="h-4 w-4" />
</button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            onClick={() => setQty(product.id, quantity - 1)}
                            className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-primary"
                            aria-label="Diminuir"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm">{quantity}</span>
                          <button
                            onClick={() => setQty(product.id, quantity + 1)}
                            className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-primary"
                            aria-label="Aumentar"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-display text-lg font-semibold text-gradient-luxe">
                          {fmt(product.price * quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <aside className="h-fit space-y-3 rounded-2xl border border-border bg-gradient-soft p-6 shadow-card-luxe">
                <h2 className="font-display text-xl">Resumo</h2>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{fmt(total)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-2xl text-gradient-luxe">{fmt(total)}</span>
                </div>
                <button
                  onClick={sendWhatsApp}
                  className="w-full rounded-full bg-gradient-luxe py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-gold transition hover:opacity-95 active:scale-[0.98]"
                >
                  Finalizar pelo WhatsApp
                </button>
                <button
  onClick={sendInstagram}
  className="w-full rounded-full border border-primary/40 py-3 text-sm font-medium text-primary transition hover:bg-primary/5"
>
  Finalizar pelo Instagram
</button>

<button
  onClick={() => {
    clear();

    toast.warning("Carrinho esvaziado", {
  description: "Todos os produtos foram removidos.",
  icon: <AlertTriangle className="h-4 w-4" />,
});
  }}
  className="w-full py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-destructive"
>
  Esvaziar carrinho
</button>
              </aside>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
