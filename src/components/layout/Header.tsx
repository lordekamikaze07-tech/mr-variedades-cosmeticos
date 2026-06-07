import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Sparkles } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "@/contexts/CartContext";

type Props = { onSearch?: (q: string) => void };

export function Header({ onSearch }: Props) {
  const { count } = useCart();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 glass-panel">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:px-8">

        {/* LOGO */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-luxe shadow-glow-gold">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display text-xl tracking-tight">
            MR <span className="text-gradient-luxe">Variedades</span>
          </span>
        </Link>

        {/* SEARCH */}
        <div className="relative ml-auto hidden flex-1 max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Buscar perfumes, marcas, categorias…"
            className="h-10 w-full rounded-full border border-border bg-background/60 pl-9 pr-4 text-sm placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* NAV */}
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition hover:text-primary"
          >
            Início
          </Link>

          <a href="#lancamentos" className="transition hover:text-primary">
            Lançamentos
          </a>

          <a href="#promocoes" className="transition hover:text-primary">
            Promoções
          </a>

          <a href="#categorias" className="transition hover:text-primary">
            Categorias
          </a>
        </nav>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />

          <Link
            to="/carrinho"
            aria-label="Ver carrinho"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur transition-all hover:border-primary hover:shadow-glow-gold"
          >
            <ShoppingBag className="h-4 w-4 text-primary" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-luxe px-1 text-[10px] font-semibold text-primary-foreground shadow-glow-gold">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}