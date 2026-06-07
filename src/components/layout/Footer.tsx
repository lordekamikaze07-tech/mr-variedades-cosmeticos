import { Instagram, MessageCircle, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border bg-gradient-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-luxe">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-xl">MR Variedades <span className="text-gradient-luxe">&</span> Cosméticos</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Perfumes, cosméticos e produtos de beleza selecionados para você. Variedade e qualidade em um só lugar.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase text-foreground">Navegação</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
  <a href="#lancamentos" className="hover:text-primary transition">
    Lançamentos
  </a>
</li>
            <li><a href="#promocoes" className="hover:text-primary transition">Promoções</a></li>
            <li><a href="#categorias" className="hover:text-primary transition">Categorias</a></li>
        
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase text-foreground">Fale conosco</h4>
          <div className="flex gap-3">
            <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Atendimento via WhatsApp ou Instagram. Pedidos finalizados manualmente com nosso time.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MR Variedades & Cosméticos. Todos os direitos reservados.
      </div>
    </footer>
  );
}
