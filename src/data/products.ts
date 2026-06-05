export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  description: string;
  category: "perfumes" | "skincare" | "makeup" | "corpo";
  image: string;
  featured?: boolean;
  promo?: boolean;
};

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  {
    id: "p1",
    name: "Nuit d'Or Eau de Parfum",
    brand: "MR Variedades",
    price: 489.9,
    oldPrice: 599.9,
    description: "Notas amadeiradas com toque de baunilha e âmbar dourado.",
    category: "perfumes",
    image: img("photo-1541643600914-78b084683601"),
    featured: true,
    promo: true,
  },
  {
    id: "p2",
    name: "Rose Velvet Eau de Toilette",
    brand: "Atelier Belle",
    price: 329.0,
    description: "Buquê floral de rosa búlgara, peônia e almíscar branco.",
    category: "perfumes",
    image: img("photo-1592945403244-b3fbafd7f539"),
    featured: true,
  },
  {
    id: "p3",
    name: "Sérum Glow Vitamina C",
    brand: "Pure Skin Lab",
    price: 189.9,
    description: "Antioxidante intenso para uma pele radiante e uniforme.",
    category: "skincare",
    image: img("photo-1556228720-195a672e8a03"),
    featured: true,
  },
  {
    id: "p4",
    name: "Hidratante Cashmere",
    brand: "Soft Couture",
    price: 129.9,
    oldPrice: 159.9,
    description: "Hidratação 24h com textura aveludada e toque sedoso.",
    category: "corpo",
    image: img("photo-1570194065650-d99fb4bedf0a"),
    promo: true,
  },
  {
    id: "p5",
    name: "Batom Matte Velour 12h",
    brand: "Lèvres",
    price: 89.0,
    description: "Cor intensa e conforto matte de longa duração.",
    category: "makeup",
    image: img("photo-1586495777744-4413f21062fa"),
    featured: true,
  },
  {
    id: "p6",
    name: "Máscara Cílios Volume Couture",
    brand: "Lèvres",
    price: 119.0,
    description: "Volume dramático com fibras alongadoras premium.",
    category: "makeup",
    image: img("photo-1631214540242-3cd8c4b0b3b8"),
  },
  {
    id: "p7",
    name: "Óleo Corporal Dourado",
    brand: "MR Variedades",
    price: 219.0,
    oldPrice: 269.0,
    description: "Toque luminoso com partículas douradas e óleo de argan.",
    category: "corpo",
    image: img("photo-1608248543803-ba4f8c70ae0b"),
    promo: true,
  },
  {
    id: "p8",
    name: "Creme Anti-idade Caviar",
    brand: "Pure Skin Lab",
    price: 459.0,
    description: "Tecnologia avançada com extrato de caviar e peptídeos.",
    category: "skincare",
    image: img("photo-1620916566398-39f1143ab7be"),
    featured: true,
  },
];

export const categories = [
  { id: "avon", name: "Avon", icon: "A" },
  { id: "natura", name: "Natura", icon: "N" },
  { id: "oboticario", name: "O Boticário", icon: "O" },
  { id: "eudora", name: "Eudora", icon: "E" },
];
