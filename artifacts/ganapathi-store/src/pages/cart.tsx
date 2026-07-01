import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { openWhatsAppOrder } from "@/lib/whatsapp";
import { products } from "@/data/products";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Explore our collection and find the perfect Ganesha for your home.
          </p>
          <Link href="/products">
            <Button className="bg-primary text-primary-foreground" data-testid="button-browse-collection">
              Browse Collection
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  function handleWhatsApp() {
    openWhatsAppOrder(items, products);
  }

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 border-b border-border py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-3xl font-bold text-foreground">Your Cart</h1>
          <p className="text-muted-foreground mt-1">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="md:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, i) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                return (
                  <motion.div
                    key={`${item.productId}-${item.selectedVariants.size}-${item.selectedVariants.finish}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 p-4 bg-background rounded-xl border border-border"
                    data-testid={`card-cart-item-${i}`}
                  >
                    <Link href={`/products/${product.slug}`} className="shrink-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-serif font-semibold text-foreground text-sm hover:text-primary transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        <div>Size: {item.selectedVariants.size}</div>
                        <div>Material: {item.selectedVariants.material}</div>
                        <div>Finish: {item.selectedVariants.finish}</div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.selectedVariants, item.quantity - 1)}
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-xs"
                            data-testid={`button-decrease-qty-${i}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center" data-testid={`text-qty-${i}`}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.selectedVariants, item.quantity + 1)}
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-xs"
                            data-testid={`button-increase-qty-${i}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sm text-foreground" data-testid={`text-item-total-${i}`}>
                            ₹{(item.unitPrice * item.quantity).toLocaleString("en-IN")}
                          </span>
                          <button
                            onClick={() => removeItem(item.productId, item.selectedVariants)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            data-testid={`button-remove-item-${i}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <button
              onClick={clearCart}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2"
              data-testid="button-clear-cart"
            >
              Clear cart
            </button>
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-xl border border-border p-5 space-y-4">
              <h3 className="font-serif font-semibold text-foreground text-lg">Order Summary</h3>
              <div className="space-y-2">
                {items.map((item, i) => {
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <div key={i} className="flex justify-between text-sm text-muted-foreground">
                      <span className="truncate max-w-[140px]">{product?.name} × {item.quantity}</span>
                      <span>₹{(item.unitPrice * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  );
                })}
                <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground">
                  <span>Total</span>
                  <span data-testid="text-cart-total">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at the time of order confirmation via WhatsApp.
              </p>
              <Button
                className="w-full bg-[#25D366] hover:bg-[#20b95a] text-white font-semibold"
                size="lg"
                onClick={handleWhatsApp}
                data-testid="button-whatsapp-order"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Order via WhatsApp
              </Button>
              <Link href="/products">
                <Button variant="outline" className="w-full text-sm" data-testid="button-continue-shopping">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <div className="rounded-lg bg-secondary/10 border border-secondary/20 p-4 text-xs text-foreground/70 space-y-1.5">
              <p className="font-medium text-foreground">How ordering works</p>
              <p>1. Click "Order via WhatsApp"</p>
              <p>2. Review your order message</p>
              <p>3. Send it to us on WhatsApp</p>
              <p>4. We'll confirm & share payment details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
