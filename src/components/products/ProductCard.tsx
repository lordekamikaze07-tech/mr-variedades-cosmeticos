import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const fmt = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article id={`produto-${product.id}`} className="product-card group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card-luxe hover:[&]:product-card-hover scroll-mt-24">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {product.promo && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-luxe px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-glow-gold">
            Promoção
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-primary/80">{product.brand}</p>
        <h3 className="font-display text-lg leading-snug text-foreground">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            {product.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">{fmt(product.oldPrice)}</p>
            )}
            <p className="text-xl font-semibold text-gradient-luxe">{fmt(product.price)}</p>
          </div>
          <button
            onClick={() => add(product)}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className="group/btn inline-flex h-11 items-center gap-1.5 rounded-full bg-gradient-luxe px-4 text-sm font-medium text-primary-foreground shadow-card-luxe transition-all hover:shadow-glow-gold active:scale-95"
          >
            <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
