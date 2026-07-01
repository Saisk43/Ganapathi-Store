import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Star, Sparkles, Leaf, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts, getFestivalProducts } from "@/data/products";
import { useCartStore } from "@/store/cartStore";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const testimonials = [
  {
    name: "Ananya R.",
    location: "Bengaluru",
    text: "The Panchaloga Ganesha I ordered arrived beautifully packaged. The craftsmanship is extraordinary — it feels like it came straight from a temple.",
    rating: 5,
  },
  {
    name: "Rahul M.",
    location: "Mumbai",
    text: "Ordered the Eco Ganesha for Ganesh Chaturthi. It dissolved completely in 2 days. Such peace of mind knowing we didn't harm the river.",
    rating: 5,
  },
  {
    name: "Priya S.",
    location: "Chennai",
    text: "The Silver Ganesha was a wedding gift. It came in the most gorgeous velvet box. My family was moved to tears. Highly recommend.",
    rating: 5,
  },
];

export default function Home() {
  const totalItems = useCartStore((s) => s.totalItems);
  const featured = getFeaturedProducts();
  const festival = getFestivalProducts();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-accent text-accent-foreground overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a017' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl mb-6"
          >
            ॐ
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl font-bold text-accent-foreground leading-tight mb-6"
          >
            Sacred Sculptures,
            <br />
            <span className="text-secondary">Crafted With Devotion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-accent-foreground/80 text-lg md:text-xl mb-10 max-w-xl mx-auto"
          >
            Hand-crafted Ganapathi idols in brass, marble, clay, silver, and more — by master artisans across India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/products">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8"
                data-testid="button-shop-collection"
              >
                Explore Collection
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/quiz">
              <Button
                size="lg"
                variant="outline"
                className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 font-semibold px-8"
                data-testid="button-find-yours"
              >
                Find My Ganesha
              </Button>
            </Link>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent-foreground/50 text-xs tracking-widest uppercase"
        >
          Scroll
        </motion.div>
      </section>

      {/* Trust badges */}
      <section className="bg-secondary/10 py-8 border-y border-secondary/20">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🛕", label: "Temple-Grade Craftsmanship" },
            { icon: "🌿", label: "Eco-Friendly Options" },
            { icon: "📦", label: "Insured Delivery" },
            { icon: "💬", label: "WhatsApp Order Support" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium text-foreground/80">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-primary font-medium">Our Bestsellers</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">Beloved by Devotees</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            The sculptures that have found homes in thousands of puja rooms across India.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5" data-testid="button-view-all">
              View Full Collection
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Festival Collection */}
      <section className="bg-secondary/5 py-16 border-y border-secondary/20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-medium">Ganesh Chaturthi 2025</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-1">Festival Collection</h2>
            </div>
            <Leaf className="w-8 h-8 text-primary opacity-60 hidden md:block" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {festival.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div
          {...fadeUp}
          className="rounded-2xl bg-accent text-accent-foreground p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(45 90% 57%) 0%, transparent 60%), radial-gradient(circle at 80% 50%, hsl(30 71% 47%) 0%, transparent 60%)" }} />
          <Sparkles className="w-8 h-8 text-secondary mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Not sure which Ganesha is right for you?
          </h2>
          <p className="text-accent-foreground/80 mb-8 max-w-lg mx-auto">
            Answer 5 simple questions and we'll match you with the perfect idol for your home, budget, and occasion.
          </p>
          <Link href="/quiz">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-10"
              data-testid="button-take-quiz"
            >
              Take the Quiz
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Devotees Speak</span>
            <h2 className="font-serif text-3xl font-bold text-foreground mt-2">Words From Our Community</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background rounded-xl p-6 border border-border shadow-sm"
                data-testid={`card-testimonial-${i}`}
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="py-16 max-w-3xl mx-auto px-4 text-center">
        <motion.div {...fadeUp}>
          <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            Have Something Specific in Mind?
          </h2>
          <p className="text-muted-foreground mb-8">
            Commission a bespoke Ganesha idol — your size, your material, your finish. We work with you from sketch to shrine.
          </p>
          <Link href="/custom-order">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/5 px-10 font-semibold"
              data-testid="button-custom-order-cta"
            >
              Request Custom Order
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-accent text-accent-foreground/70 py-10 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="font-serif font-bold text-accent-foreground text-lg">Ganapathi Sacred Sculptures</div>
          <div className="flex gap-6">
            <Link href="/products" className="hover:text-accent-foreground transition-colors">Collection</Link>
            <Link href="/quiz" className="hover:text-accent-foreground transition-colors">Find Yours</Link>
            <Link href="/custom-order" className="hover:text-accent-foreground transition-colors">Custom Order</Link>
          </div>
          <div className="text-xs">© 2025 Ganapathi. All rights reserved.</div>
        </div>
      </footer>

      {/* Mobile sticky cart */}
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-4 left-4 right-4 md:hidden z-40"
        >
          <Link href="/cart">
            <Button
              className="w-full bg-primary text-primary-foreground shadow-xl py-4 text-base font-semibold"
              data-testid="button-sticky-cart"
            >
              View Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
