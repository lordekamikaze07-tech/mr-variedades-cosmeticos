import { categories } from "@/data/products";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export function Categories() {
  return (
    <section id="categorias" className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-primary">Explore</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Categorias</h2>
        </div>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => scrollToSection(c.id)}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card-luxe transition-all hover:-translate-y-1 hover:shadow-luxe text-left"
          >
            <div className="absolute inset-0 bg-gradient-luxe opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
            
            <span className="relative font-display text-5xl text-gradient-luxe">
              {c.icon}
            </span>

            <h3 className="relative mt-4 font-display text-xl">
              {c.name}
            </h3>

            <p className="relative mt-1 text-sm text-muted-foreground">
              Ver coleção →
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}