import type { CartItem } from "../store/cartStore";
import type { Product } from "../data/products";

const WHATSAPP_NUMBER = "919043269893";

function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

function formatCartMessage(items: CartItem[], products: Product[]): string {
  const lines: string[] = ["Hello! I would like to place an order:\n"];

  items.forEach((item, index) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return;
    lines.push(`${index + 1}. *${product.name}*`);
    lines.push(`   - Size: ${item.selectedVariants.size}`);
    lines.push(`   - Material: ${item.selectedVariants.material}`);
    lines.push(`   - Finish: ${item.selectedVariants.finish}`);
    lines.push(`   - Quantity: ${item.quantity}`);
    lines.push(`   - Price: ${formatPrice(item.unitPrice)} each`);
    lines.push("");
  });

  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  lines.push(`*Total: ${formatPrice(total)}*`);
  lines.push("\nPlease confirm availability and delivery details. Thank you!");

  return lines.join("\n");
}

export type CustomOrderForm = {
  name: string;
  phone: string;
  size: string;
  material: string;
  finish: string;
  budget: string;
  description: string;
  deadline: string;
};

function formatCustomOrderMessage(form: CustomOrderForm): string {
  const lines: string[] = [
    "Hello! I would like to place a *Custom Order* for a Ganesha idol:\n",
    `*Name:* ${form.name}`,
    `*Phone:* ${form.phone}`,
    `*Preferred Size:* ${form.size}`,
    `*Material:* ${form.material}`,
    `*Finish:* ${form.finish}`,
    `*Budget:* ${form.budget}`,
    `*Delivery By:* ${form.deadline || "Flexible"}`,
    `\n*Description:*\n${form.description}`,
    "\nPlease get in touch to discuss details. Thank you!",
  ];
  return lines.join("\n");
}

export function openWhatsAppOrder(items: CartItem[], products: Product[]): void {
  const msg = formatCartMessage(items, products);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

export function openWhatsAppCustomOrder(form: CustomOrderForm): void {
  const msg = formatCustomOrderMessage(form);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

export function openWhatsAppSingleOrder(product: Product, item: CartItem): void {
  const lines = [
    `Hello! I'm interested in ordering:\n`,
    `*${product.name}*`,
    `- Size: ${item.selectedVariants.size}`,
    `- Material: ${item.selectedVariants.material}`,
    `- Finish: ${item.selectedVariants.finish}`,
    `- Quantity: ${item.quantity}`,
    `- Price: ${formatPrice(item.unitPrice)}\n`,
    "Please confirm availability and share payment details. Thank you!",
  ];
  const msg = lines.join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}
