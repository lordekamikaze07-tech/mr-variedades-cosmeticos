import { Instagram, MessageCircle } from "lucide-react";

export function Contact() {
  return (
    <section id="contato" className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-soft p-10 text-center shadow-luxe md:p-16">
        <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-luxe opacity-20 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.22em] text-primary">Atendimento exclusivo</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">
          Fale com nossa <span className="text-gradient-luxe italic">consultora de beleza</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Atendimento personalizado pelo WhatsApp ou Instagram — tire dúvidas,
          peça recomendações e finalize seu pedido com facilidade.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-luxe px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-luxe transition hover:shadow-glow-gold"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
