import heroImg from "@/assets/hero-perfume.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div className="animate-fade-up space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Nova coleção
          </span>
          <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Beleza, fragrância <br />
            e cuidado <span className="text-gradient-luxe italic">para você.</span>
          </h1>
          <p className="max-w-lg text-lg text-muted-foreground">
            Perfumes, cosméticos e produtos de beleza selecionados a dedo —
            uma curadoria sofisticada para realçar sua essência.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#produtos"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-luxe px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-luxe transition hover:shadow-glow-gold"
            >
              Ver produtos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#promocoes"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
            >
              Promoções
            </a>
          </div>
          <div className="flex gap-8 pt-6 text-sm text-muted-foreground">
            <div>
              <p className="font-display text-2xl text-foreground">200+</p>
              <p>Marcas selecionadas</p>
            </div>
            <div>
              <p className="font-display text-2xl text-foreground">100%</p>
              <p>Originais & autênticos</p>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-luxe opacity-20 blur-3xl" />
          <a
            href="#produto-p1"
            aria-label="Ver Nuit d'Or Eau de Parfum"
            className="group relative block overflow-hidden rounded-[2rem] border border-primary/20 shadow-luxe transition-all hover:shadow-glow-gold"
          >
            <img
              src={heroImg}
              alt="Perfume premium dourado"
              className="h-[520px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute bottom-5 left-5 right-5 glass-panel rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80">Destaque · clique para ver</p>
              <p className="font-display text-lg">Nuit d'Or Eau de Parfum</p>
              <p className="text-xs text-muted-foreground">MR Variedades · Edição limitada</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
