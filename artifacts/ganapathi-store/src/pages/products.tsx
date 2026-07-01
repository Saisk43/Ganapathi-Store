import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { Link } from "wouter";

const categories = [
  { value: "all", label: "All" },
  { value: "eco", label: "Eco-Friendly" },
  { value: "brass", label: "Brass & Metal" },
  { value: "marble", label: "Marble" },
  { value: "clay", label: "Clay" },
  { value: "silver", label: "Silver" },
  { value: "wood", label: "Wood" },
  { value: "crystal", label: "Crystal" },
  { value: "fiber", label: "Fiber" },
  { value: "folk", label: "Folk Art" },
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "under1000", label: "Under ₹1,000" },
  { value: "1000to3000", label: "₹1,000–₹3,000" },
  { value: "3000to10000", label: "₹3,000–₹10,000" },
  { value: "above10000", label: "Above ₹10,000" },
];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function Products() {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (priceRange !== "all") {
      list = list.filter((p) => {
        if (priceRange === "under1000") return p.basePrice < 1000;
        if (priceRange === "1000to3000") return p.basePrice >= 1000 && p.basePrice <= 3000;
        if (priceRange === "3000to10000") return p.basePrice > 3000 && p.basePrice <= 10000;
        if (priceRange === "above10000") return p.basePrice > 10000;
        return true;
      });
    }
    if (sort === "priceLow") list.sort((a, b) => a.basePrice - b.basePrice);
    else if (sort === "priceHigh") list.sort((a, b) => b.basePrice - a.basePrice);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    return list;
  }, [category, priceRange, sort]);

  const activeFilters = [
    category !== "all" && categories.find((c) => c.value === category)?.label,
    priceRange !== "all" && priceRanges.find((p) => p.value === priceRange)?.label,
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border py-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Our Collection</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-1">
              Sacred Sculptures
            </h1>
            <p className="text-muted-foreground mt-2">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} in this collection
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                    category === c.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                  data-testid={`filter-category-${c.value}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40 text-xs h-8" data-testid="select-price-range">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((p) => (
                  <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-44 text-xs h-8" data-testid="select-sort">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {activeFilters.map((f) => (
              <Badge key={f} variant="secondary" className="text-xs gap-1">
                {f}
                <button
                  onClick={() => {
                    if (categories.find((c) => c.label === f)) setCategory("all");
                    if (priceRanges.find((p) => p.label === f)) setPriceRange("all");
                  }}
                  data-testid={`remove-filter-${f}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            <button
              onClick={() => { setCategory("all"); setPriceRange("all"); }}
              className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-2"
              data-testid="button-clear-filters"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-medium">No sculptures found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => { setCategory("all"); setPriceRange("all"); }}
              data-testid="button-reset-filters"
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>

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
