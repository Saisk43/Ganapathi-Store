import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Star, ShoppingCart, MessageCircle, Plus, Minus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProductBySlug } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { openWhatsAppSingleOrder } from "@/lib/whatsapp";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const { toast } = useToast();
  const addItem = useCartStore((s) => s.addItem);
  const totalItems = useCartStore((s) => s.totalItems);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.variants.sizes[0]?.label ?? "");
  const [selectedMaterial, setSelectedMaterial] = useState(product?.variants.materials[0]?.label ?? "");
  const [selectedFinish, setSelectedFinish] = useState(product?.variants.finishes[0]?.label ?? "");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-medium text-foreground mb-2">Product not found</p>
          <Link href="/products">
            <Button variant="outline">Back to Collection</Button>
          </Link>
        </div>
      </div>
    );
  }

  const sizeAdder = product.variants.sizes.find((s) => s.label === selectedSize)?.priceAdder ?? 0;
  const materialAdder = product.variants.materials.find((m) => m.label === selectedMaterial)?.priceAdder ?? 0;
  const finishAdder = product.variants.finishes.find((f) => f.label === selectedFinish)?.priceAdder ?? 0;
  const totalPrice = product.basePrice + sizeAdder + materialAdder + finishAdder;

  function handleAddToCart() {
    if (!product) return;
    addItem({
      productId: product.id,
      quantity,
      selectedVariants: { size: selectedSize, material: selectedMaterial, finish: selectedFinish },
      unitPrice: totalPrice,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) added successfully.`,
    });
  }

  function handleWhatsApp() {
    if (!product) return;
    openWhatsAppSingleOrder(product, {
      productId: product.id,
      quantity,
      selectedVariants: { size: selectedSize, material: selectedMaterial, finish: selectedFinish },
      unitPrice: totalPrice,
    });
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-primary transition-colors">Collection</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image gallery */}
          <div className="space-y-3">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-square rounded-xl overflow-hidden bg-muted"
              data-testid="img-product-main"
            >
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? "border-primary" : "border-transparent"
                    }`}
                    data-testid={`img-thumb-${i}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-2">
                {product.isPopular && <Badge className="bg-primary text-primary-foreground text-xs">Bestseller</Badge>}
                {product.isFestivalSpecial && <Badge className="bg-secondary text-secondary-foreground text-xs">Festival Special</Badge>}
              </div>
              <h1 className="font-serif text-3xl font-bold text-foreground">{product.name}</h1>
              <p className="text-muted-foreground mt-1 italic">{product.tagline}</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-border">
              <div className="text-3xl font-bold text-foreground" data-testid="text-price">
                ₹{totalPrice.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Base: ₹{product.basePrice.toLocaleString("en-IN")}
                {sizeAdder > 0 && ` + Size: ₹${sizeAdder.toLocaleString("en-IN")}`}
                {materialAdder > 0 && ` + Material: ₹${materialAdder.toLocaleString("en-IN")}`}
                {finishAdder > 0 && ` + Finish: ₹${finishAdder.toLocaleString("en-IN")}`}
              </p>
            </div>

            {/* Variants */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSelectedSize(s.label)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                        selectedSize === s.label
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:border-primary hover:text-primary"
                      }`}
                      data-testid={`button-size-${s.label}`}
                    >
                      {s.label}
                      {s.priceAdder > 0 && <span className="text-xs ml-1 opacity-70">+₹{s.priceAdder.toLocaleString("en-IN")}</span>}
                    </button>
                  ))}
                </div>
              </div>

              {product.variants.materials.length > 1 && (
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Material</label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger className="w-full" data-testid="select-material">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.variants.materials.map((m) => (
                        <SelectItem key={m.label} value={m.label}>
                          {m.label}{m.priceAdder > 0 ? ` (+₹${m.priceAdder.toLocaleString("en-IN")})` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Finish</label>
                <Select value={selectedFinish} onValueChange={setSelectedFinish}>
                  <SelectTrigger className="w-full" data-testid="select-finish">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.finishes.map((f) => (
                      <SelectItem key={f.label} value={f.label}>
                        {f.label}{f.priceAdder > 0 ? ` (+₹${f.priceAdder.toLocaleString("en-IN")})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    data-testid="button-qty-minus"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-base font-semibold w-8 text-center" data-testid="text-quantity">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    data-testid="button-qty-plus"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground font-semibold"
                onClick={handleAddToCart}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart — ₹{(totalPrice * quantity).toLocaleString("en-IN")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 font-semibold"
                onClick={handleWhatsApp}
                data-testid="button-whatsapp-order"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Order on WhatsApp
              </Button>
            </div>

            {/* Description */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-semibold text-foreground">About this sculpture</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Care */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-1.5">
              <h4 className="text-sm font-semibold text-foreground">Care Instructions</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{product.careInstructions}</p>
            </div>
          </div>
        </div>
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
