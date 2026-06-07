import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Particles } from "@/components/layout/Particles";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { Contact } from "@/components/sections/Contact";
import { OfficialStores } from "@/components/sections/OfficialStores";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products as ALL } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MR Variedades & Cosméticos · Perfumes, cosméticos e beleza" },
      { name: "description", content: "Curadoria premium de perfumes, skincare e maquiagem. Beleza, fragrância e cuidado para você." },
      { property: "og:title", content: "MR Variedades & Cosméticos" },
      { property: "og:description", content: "Perfumes, cosméticos e produtos de beleza selecionados para você." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [query, setQuery] = useState("");
 const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();
  if (!q) return ALL;

  return ALL.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  );
}, [query]);

const grouped = {
  avon: filtered.filter((p) => p.category === "avon"),
  natura: filtered.filter((p) => p.category === "natura"),
  oboticario: filtered.filter((p) => p.category === "oboticario"),
  eudora: filtered.filter((p) => p.category === "eudora"),
};

 const featured = filtered.filter((p) => p.featured);
 const promos = filtered.filter((p) => p.promo);

  return (
    <div className="relative min-h-screen">
      <Particles />
      <div className="relative z-10">
        <Header onSearch={setQuery} />
        <Hero />

{/* 1. DESTAQUES */}
{featured.length > 0 && (
  <section
  id="lancamentos"
   className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8">
    <header className="mb-10">
      <p className="text-xs uppercase tracking-[0.22em] text-primary">
        Seleção da casa
      </p>
      <h2 className="mt-2 font-display text-4xl md:text-5xl">
        Lançamentos
      </h2>
    </header>

    <ProductGrid products={featured} />
  </section>
)}
{grouped.avon.length > 0 && (
  <section
  id="avon"
   className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8">
    <h2 className="text-4xl font-display mb-6">Avon</h2>
    <ProductGrid products={grouped.avon} />
  </section>
)}
{grouped.natura.length > 0 && (
  <section
   id="natura"
   className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8">
    <h2 className="text-4xl font-display mb-6">Natura</h2>
    <ProductGrid products={grouped.natura} />
  </section>
)}
{grouped.oboticario.length > 0 && (
  <section
   id="oboticario"
   className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8">
    <h2 className="text-4xl font-display mb-6">O Boticário</h2>
    <ProductGrid products={grouped.oboticario} />
  </section>
)}
{grouped.eudora.length > 0 && (
  <section
   id="eudora"
   className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8">
    <h2 className="text-4xl font-display mb-6">Eudora</h2>
    <ProductGrid products={grouped.eudora} />
  </section>
)}

{/* 3. PROMOÇÕES */}
{promos.length > 0 && (
  <section id="promocoes" className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8">
    <header className="mb-10 flex items-end justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-primary">
          Ofertas especiais
        </p>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">
          Promoções
        </h2>
      </div>
    </header>

    <ProductGrid products={promos} />
  </section>
)}

        <Categories />
        <OfficialStores />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
