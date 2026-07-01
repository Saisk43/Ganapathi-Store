import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  quantity: number;
  selectedVariants: {
    size: string;
    material: string;
    finish: string;
  };
  unitPrice: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variants: CartItem["selectedVariants"]) => void;
  updateQuantity: (productId: string, variants: CartItem["selectedVariants"], qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

function variantKey(v: CartItem["selectedVariants"]) {
  return `${v.size}|${v.material}|${v.finish}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && variantKey(i.selectedVariants) === variantKey(item.selectedVariants)
          );
          let newItems: CartItem[];
          if (existing) {
            newItems = state.items.map((i) =>
              i.productId === item.productId && variantKey(i.selectedVariants) === variantKey(item.selectedVariants)
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          } else {
            newItems = [...state.items, item];
          }
          const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
          const totalPrice = newItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
          return { items: newItems, totalItems, totalPrice };
        });
      },

      removeItem: (productId, variants) => {
        set((state) => {
          const newItems = state.items.filter(
            (i) => !(i.productId === productId && variantKey(i.selectedVariants) === variantKey(variants))
          );
          const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
          const totalPrice = newItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
          return { items: newItems, totalItems, totalPrice };
        });
      },

      updateQuantity: (productId, variants, qty) => {
        set((state) => {
          const newItems =
            qty <= 0
              ? state.items.filter(
                  (i) => !(i.productId === productId && variantKey(i.selectedVariants) === variantKey(variants))
                )
              : state.items.map((i) =>
                  i.productId === productId && variantKey(i.selectedVariants) === variantKey(variants)
                    ? { ...i, quantity: qty }
                    : i
                );
          const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
          const totalPrice = newItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
          return { items: newItems, totalItems, totalPrice };
        });
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    { name: "ganapathi-cart" }
  )
);
