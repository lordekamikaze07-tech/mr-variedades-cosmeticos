import { ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import heroImg from "@/assets/hero-perfume.jpg";
import { useEffect, useState } from "react";

export function Hero() {
  const [index, setIndex] = useState(0);

  const heroProducts = products.filter(p => p.image);

  const heroProduct = heroProducts.length
    ? heroProducts[index % heroProducts.length]
    : null;

  useEffect(() => {
    if (!heroProducts.length) return;

    const interval = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroProducts.length]);

  const getTarget = (p: any) => {
    if (!p) return "#produtos";

    if (p.featured) return "#lancamentos";
    if (p.promo) return "#promocoes";

    if (p.category === "avon") return "#avon";
    if (p.category === "natura") return "#natura";
    if (p.category === "oboticario") return "#oboticario";
    if (p.category === "eudora") return "#eudora";

    return "#produtos";
  };

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">

        {/* TEXTO */}
        <div className="animate-fade-up space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Nova coleção
          </span>

          <h1 className="font-display text-5xl md:text-7xl">
            Beleza, fragrância <br />
            e cuidado <span className="text-gradient-luxe italic">para você.</span>
          </h1>

          <p className="text-muted-foreground max-w-lg">
            Perfumes e cosméticos que elevam sua presença, sua autoestima e seu estilo.
          </p>

          <div className="flex gap-3 flex-wrap">
            <a
  href="/#avon"
  className="group inline-flex items-center gap-2 rounded-full bg-gradient-luxe px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-luxe transition hover:scale-105 hover:shadow-glow-gold"
>
  Ver produtos
  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
</a>

            <a href="#promocoes"
               className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-sm font-semibold text-primary transition hover:scale-105">
              Promoções
            </a>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="relative animate-fade-up">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-luxe opacity-20 blur-3xl" />

          <a
            href={getTarget(heroProduct)}
            className="group relative block overflow-hidden rounded-[2rem] border border-primary/20"
          >
            <img
              src={heroProduct?.image || heroImg}
              alt={heroProduct?.name || "Produto destaque"}
              className="h-[520px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute bottom-5 left-5 right-5 glass-panel rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80">
                Destaque · clique para ver
              </p>

              <p className="font-display text-lg">
                {heroProduct?.name || "Destaque da loja"}
              </p>

              <p className="text-xs text-muted-foreground">
                {heroProduct?.brand || "MR Variedades"}
              </p>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}