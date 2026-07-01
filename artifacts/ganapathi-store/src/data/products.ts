import panchalogaImg1 from "@assets/Panchaloga_1782722955929.jpg";
import marbleImg1 from "@assets/Marble_1782722955930.jpg";
import brassDancingImg1 from "@assets/Brass_Dancing_1782722955931.jpg";
import silverImg1 from "@assets/silver_1782722955929.jpg";
import pattachitraImg1 from "@assets/Pattachitra_1782722955929.webp";
import teakImg1 from "@assets/Teak_1782722955931.webp";
import fiberImg1 from "@assets/fiber_1782722955930.jpg";
import crystalImg1 from "@assets/Crystal_1782722955931.webp";
import specialImg1 from "@assets/special_1782722955927.jpg";
import ecoGaneshaImg1 from "@assets/eco_1782723169784.jpg";

export type ProductVariant = {
  label: string;
  priceAdder: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  images: string[];
  category: "eco" | "brass" | "marble" | "clay" | "fiber" | "silver" | "wood" | "crystal" | "folk";
  isPopular: boolean;
  isFestivalSpecial: boolean;
  variants: {
    sizes: ProductVariant[];
    materials: ProductVariant[];
    finishes: ProductVariant[];
  };
  careInstructions: string;
  rating: number;
  reviewCount: number;
};

// Curated Ganapathi statue collection
export const products: Product[] = [
  {
    id: "eco-ganesha-001",
    slug: "eco-ganesha",
    name: "Eco Ganesha",
    tagline: "Sacred. Sustainable. Biodegradable.",
    description:
      "Crafted from natural river clay and plant-based dyes, our Eco Ganesha returns to the earth as gently as a prayer. Each idol is hand-shaped by artisans in Pune, celebrating the ancient tradition of eco-friendly worship. Ideal for immersion festivals \u2014 no harm to rivers, no trace left behind.",
    basePrice: 499,
    images: [ecoGaneshaImg1],
    category: "eco",
    isPopular: true,
    isFestivalSpecial: true,
    variants: {
      sizes: [
        { label: "4 inch", priceAdder: 0 },
        { label: "6 inch", priceAdder: 200 },
        { label: "9 inch", priceAdder: 500 },
        { label: "12 inch", priceAdder: 800 },
      ],
      materials: [
        { label: "River Clay", priceAdder: 0 },
        { label: "Shaadu Clay", priceAdder: 100 },
      ],
      finishes: [
        { label: "Natural Earth", priceAdder: 0 },
        { label: "Gold Accent", priceAdder: 150 },
        { label: "Multi-Color", priceAdder: 200 },
      ],
    },
    careInstructions: "Keep away from moisture before puja. For immersion, use a bucket of water at home. Fully biodegradable within 2\u20133 days of immersion.",
    rating: 4.8,
    reviewCount: 312,
  },
  {
    id: "panchaloga-001",
    slug: "panchaloga-ganesha",
    name: "Panchaloga Ganesha",
    tagline: "Five sacred metals. One eternal blessing.",
    description:
      "Panchaloga \u2014 the sacred alloy of gold, silver, copper, iron, and lead \u2014 has been the medium of choice for temple idols for over 2,000 years. Our Panchaloga Ganesha is cast using the lost-wax technique by master craftsmen in Swamimalai, following Agama Shastra proportions. A treasure for generations.",
    basePrice: 2999,
    images: [panchalogaImg1],
    category: "brass",
    isPopular: true,
    isFestivalSpecial: false,
    variants: {
      sizes: [
        { label: "3 inch", priceAdder: 0 },
        { label: "5 inch", priceAdder: 1500 },
        { label: "8 inch", priceAdder: 3500 },
        { label: "12 inch", priceAdder: 6000 },
      ],
      materials: [
        { label: "Panchaloga", priceAdder: 0 },
      ],
      finishes: [
        { label: "Antique Finish", priceAdder: 0 },
        { label: "Gold Polish", priceAdder: 500 },
        { label: "Silver Polish", priceAdder: 400 },
      ],
    },
    careInstructions: "Wipe with a dry soft cloth. Polish monthly with tamarind paste for natural shine. Avoid chemical cleaners.",
    rating: 4.9,
    reviewCount: 187,
  },
  {
    id: "marble-ganesha-001",
    slug: "marble-ganesha",
    name: "Marble Ganesha",
    tagline: "Carved from the heart of the Aravalli.",
    description:
      "Sculpted by hand from Makrana white marble \u2014 the same stone used in the Taj Mahal \u2014 our Marble Ganesha exudes a serene purity. Each sculpture takes 4\u20136 weeks to complete, with artisans in Jaipur dedicating hundreds of hours to achieve the perfect proportions and delicate surface texture.",
    basePrice: 4999,
    images: [marbleImg1],
    category: "marble",
    isPopular: false,
    isFestivalSpecial: false,
    variants: {
      sizes: [
        { label: "4 inch", priceAdder: 0 },
        { label: "6 inch", priceAdder: 2000 },
        { label: "9 inch", priceAdder: 5000 },
        { label: "12 inch", priceAdder: 10000 },
      ],
      materials: [
        { label: "Makrana White", priceAdder: 0 },
        { label: "Pink Marble", priceAdder: 1000 },
        { label: "Black Marble", priceAdder: 1500 },
      ],
      finishes: [
        { label: "Natural Polish", priceAdder: 0 },
        { label: "Gold Inlay", priceAdder: 1500 },
        { label: "Painted Details", priceAdder: 800 },
      ],
    },
    careInstructions: "Dust with a soft dry cloth. Avoid acidic substances. Apply a thin coat of coconut oil monthly to maintain sheen.",
    rating: 4.7,
    reviewCount: 94,
  },
  {
    id: "brass-dancing-001",
    slug: "brass-dancing-ganesha",
    name: "Brass Dancing Ganesha",
    tagline: "The Lord in joyful motion.",
    description:
      "Captured mid-dance in pure brass, this sculpture embodies Ganesha as Nritya Ganapati \u2014 the dancer who removes obstacles with joy. The intricate lost-wax casting captures flowing garments, a lifted leg, and the characteristic playful expression. A centrepiece that transforms any space.",
    basePrice: 1999,
    images: [brassDancingImg1],
    category: "brass",
    isPopular: true,
    isFestivalSpecial: false,
    variants: {
      sizes: [
        { label: "4 inch", priceAdder: 0 },
        { label: "6 inch", priceAdder: 800 },
        { label: "9 inch", priceAdder: 2000 },
        { label: "12 inch", priceAdder: 4000 },
      ],
      materials: [
        { label: "Pure Brass", priceAdder: 0 },
        { label: "Bronze", priceAdder: 600 },
      ],
      finishes: [
        { label: "Antique Brown", priceAdder: 0 },
        { label: "Bright Gold", priceAdder: 300 },
        { label: "Dark Patina", priceAdder: 200 },
      ],
    },
    careInstructions: "Apply tamarind or lemon juice paste and rinse to remove tarnish. Store in a dry place. Polish with brass polish once a month.",
    rating: 4.8,
    reviewCount: 256,
  },
  {
    id: "silver-ganesha-001",
    slug: "silver-ganesha",
    name: "Silver Ganesha",
    tagline: "999 pure. Infinitely precious.",
    description:
      "Hallmarked 999 pure silver, this Ganesha is the ultimate expression of devotion and generosity. Ideal as a wedding gift, housewarming, or milestone celebration. Each piece is handcrafted in Rajkot, certified by the Bureau of Indian Standards, and comes in a velvet-lined wooden gift box.",
    basePrice: 9999,
    images: [silverImg1],
    category: "silver",
    isPopular: false,
    isFestivalSpecial: false,
    variants: {
      sizes: [
        { label: "2 inch", priceAdder: 0 },
        { label: "3 inch", priceAdder: 5000 },
        { label: "5 inch", priceAdder: 12000 },
        { label: "8 inch", priceAdder: 25000 },
      ],
      materials: [
        { label: "999 Pure Silver", priceAdder: 0 },
      ],
      finishes: [
        { label: "Bright Polish", priceAdder: 0 },
        { label: "Oxidized", priceAdder: 500 },
        { label: "Matte Finish", priceAdder: 300 },
      ],
    },
    careInstructions: "Clean with a silver cloth. Store in the anti-tarnish pouch provided. Avoid exposure to sulfur-containing substances.",
    rating: 5.0,
    reviewCount: 43,
  },
  {
    id: "pattachitra-001",
    slug: "pattachitra-ganesha",
    name: "Pattachitra Ganesha",
    tagline: "Odisha's living art tradition.",
    description:
      "Painted on handmade tasar silk canvas using natural stone colors and lacquer, Pattachitra is a 2,000-year-old Odishan tradition. Our Pattachitra Ganesha panels are crafted by Chitrakar families in Raghurajpur, a UNESCO-recognized craft village. Each work is one-of-a-kind \u2014 no two are identical.",
    basePrice: 799,
    images: [pattachitraImg1],
    category: "folk",
    isPopular: false,
    isFestivalSpecial: false,
    variants: {
      sizes: [
        { label: "6x8 inch", priceAdder: 0 },
        { label: "9x12 inch", priceAdder: 500 },
        { label: "12x16 inch", priceAdder: 1000 },
        { label: "18x24 inch", priceAdder: 2000 },
      ],
      materials: [
        { label: "Tasar Silk", priceAdder: 0 },
        { label: "Sal Leaf", priceAdder: 200 },
      ],
      finishes: [
        { label: "Traditional Colors", priceAdder: 0 },
        { label: "Gold Leaf Accents", priceAdder: 600 },
      ],
    },
    careInstructions: "Frame behind UV-protective glass. Avoid direct sunlight. Dust lightly with a feather duster.",
    rating: 4.6,
    reviewCount: 71,
  },
  {
    id: "wooden-ganesha-001",
    slug: "wooden-ganesha",
    name: "Teak Ganesha",
    tagline: "Hand-carved. Century-lasting.",
    description:
      "Sculpted from sustainably sourced Indian teak by master wood-carvers in Saharanpur, this Ganesha will outlast generations. The dense grain of teak develops a beautiful honey patina with age. Each piece takes 3\u20135 days to carve and is finished with natural beeswax for a warm, living feel.",
    basePrice: 1499,
    images: [teakImg1],
    category: "wood",
    isPopular: false,
    isFestivalSpecial: false,
    variants: {
      sizes: [
        { label: "4 inch", priceAdder: 0 },
        { label: "6 inch", priceAdder: 600 },
        { label: "9 inch", priceAdder: 1500 },
        { label: "12 inch", priceAdder: 2500 },
      ],
      materials: [
        { label: "Indian Teak", priceAdder: 0 },
        { label: "Rosewood", priceAdder: 800 },
        { label: "Sandalwood", priceAdder: 2000 },
      ],
      finishes: [
        { label: "Natural Beeswax", priceAdder: 0 },
        { label: "Dark Walnut Stain", priceAdder: 200 },
        { label: "Gold Highlights", priceAdder: 400 },
      ],
    },
    careInstructions: "Wipe with a damp cloth and dry immediately. Apply teak oil every 3 months. Keep away from direct sunlight to prevent cracking.",
    rating: 4.7,
    reviewCount: 128,
  },
  {
    id: "fiber-ganesha-001",
    slug: "fiber-ganesha",
    name: "Fiber Ganesha",
    tagline: "Grand presence. Light as a feather.",
    description:
      "Our fiberglass Ganesha idols are the choice for pandals, offices, and large spaces where weight and weather resistance matter. UV-resistant and weatherproof, these can be placed outdoors without fading. Available in large formats up to 6 feet, painted by trained artists for maximum visual impact.",
    basePrice: 2499,
    images: [fiberImg1],
    category: "fiber",
    isPopular: false,
    isFestivalSpecial: true,
    variants: {
      sizes: [
        { label: "12 inch", priceAdder: 0 },
        { label: "18 inch", priceAdder: 1500 },
        { label: "24 inch", priceAdder: 3000 },
        { label: "36 inch", priceAdder: 6000 },
      ],
      materials: [
        { label: "Fiberglass", priceAdder: 0 },
      ],
      finishes: [
        { label: "Traditional Colors", priceAdder: 0 },
        { label: "Gold & Red", priceAdder: 500 },
        { label: "White with Gold", priceAdder: 500 },
        { label: "Custom Colors", priceAdder: 1000 },
      ],
    },
    careInstructions: "Wipe with a damp cloth. Suitable for outdoor use. Avoid harsh chemical solvents on the painted surface.",
    rating: 4.5,
    reviewCount: 89,
  },
  {
    id: "crystal-ganesha-001",
    slug: "crystal-ganesha",
    name: "Crystal Ganesha",
    tagline: "Pure quartz. Pure light.",
    description:
      "Carved from natural clear quartz crystal mined in Rajasthan, this Ganesha harnesses the stone's legendary properties of clarity and positive energy. Each crystal idol is unique \u2014 the natural inclusions and rainbow flashes within make every piece a one-of-a-kind treasure. Comes with a certificate of authenticity.",
    basePrice: 3499,
    images: [crystalImg1],
    category: "crystal",
    isPopular: false,
    isFestivalSpecial: false,
    variants: {
      sizes: [
        { label: "2 inch", priceAdder: 0 },
        { label: "3 inch", priceAdder: 2000 },
        { label: "4 inch", priceAdder: 4500 },
        { label: "6 inch", priceAdder: 8000 },
      ],
      materials: [
        { label: "Clear Quartz", priceAdder: 0 },
        { label: "Rose Quartz", priceAdder: 500 },
        { label: "Amethyst", priceAdder: 800 },
        { label: "Smoky Quartz", priceAdder: 300 },
      ],
      finishes: [
        { label: "Natural Crystal", priceAdder: 0 },
        { label: "Gold Base", priceAdder: 400 },
      ],
    },
    careInstructions: "Cleanse monthly under running water or moonlight. Avoid prolonged direct sunlight to prevent discoloration. Store separately from other stones.",
    rating: 4.6,
    reviewCount: 55,
  },
  {
    id: "festival-special-001",
    slug: "festival-special-ganesha",
    name: "Ganesh Chaturthi Special",
    tagline: "The festival idol, reimagined.",
    description:
      "Our Ganesh Chaturthi Special is designed for the grandest celebration of the year. Made from Shaadu clay with natural vegetable dyes, this idol is crafted specifically for the 10-day festival. Large, vibrant, and fully eco-friendly \u2014 it arrives in a festive gift box with puja items included.",
    basePrice: 699,
    images: [specialImg1],
    category: "clay",
    isPopular: true,
    isFestivalSpecial: true,
    variants: {
      sizes: [
        { label: "6 inch", priceAdder: 0 },
        { label: "9 inch", priceAdder: 400 },
        { label: "12 inch", priceAdder: 900 },
        { label: "18 inch", priceAdder: 1800 },
      ],
      materials: [
        { label: "Shaadu Clay", priceAdder: 0 },
        { label: "Shadu + Organic Dyes", priceAdder: 200 },
      ],
      finishes: [
        { label: "Traditional Multicolor", priceAdder: 0 },
        { label: "Gold & Red", priceAdder: 300 },
        { label: "White with Gold", priceAdder: 300 },
      ],
    },
    careInstructions: "Store in a cool dry place before the festival. For immersion, use a bucket at home or a designated pond. Fully biodegradable.",
    rating: 4.9,
    reviewCount: 428,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isPopular);
}

export function getFestivalProducts(): Product[] {
  return products.filter((p) => p.isFestivalSpecial);
}
