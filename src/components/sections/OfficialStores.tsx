import { ExternalLink } from "lucide-react";

const stores = [
  { id: "avon", name: "Avon", tag: "Loja oficial", url: "https://www.avon.com.br/" },
  { id: "natura", name: "Natura", tag: "Loja oficial", url: "https://www.natura.com.br/" },
  { id: "oboticario", name: "O Boticário", tag: "Loja oficial", url: "https://www.boticario.com.br/" },
  { id: "eudora", name: "Eudora", tag: "Loja oficial", url: "https://www.eudora.com.br/" },
];

export function OfficialStores() {
  return (
    <section id="lojas-oficiais" className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-primary">Parcerias</p>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">
          Compre direto na <span className="text-gradient-luxe italic">loja oficial</span>
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Acesse as marcas parceiras pelos nossos links oficiais e aproveite ofertas exclusivas.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stores.map((s) => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card-luxe transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow-gold"
          >
            <div className="absolute inset-0 bg-gradient-luxe opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
            <div className="relative flex items-start justify-between">
              <span className="font-display text-3xl text-gradient-luxe">{s.name}</span>
              <ExternalLink className="h-4 w-4 text-primary opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="relative mt-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80">{s.tag}</p>
              <p className="mt-1 text-sm text-muted-foreground">Comprar agora →</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
