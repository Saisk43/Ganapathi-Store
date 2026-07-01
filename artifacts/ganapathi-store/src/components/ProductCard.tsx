import { Link } from "wouter";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isPopular && (
              <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
                Bestseller
              </Badge>
            )}
            {product.isFestivalSpecial && (
              <Badge className="bg-secondary text-secondary-foreground text-[10px] px-2 py-0.5">
                Festival
              </Badge>
            )}
          </div>
        </div>
        <div className="pt-3 pb-1 px-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{product.tagline}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="font-semibold text-foreground">
              ₹{product.basePrice.toLocaleString("en-IN")}
              <span className="text-xs text-muted-foreground font-normal"> onwards</span>
            </div>
            <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span>{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount})</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
