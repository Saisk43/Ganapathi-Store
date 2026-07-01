import { motion } from "framer-motion";
import { MessageCircle, PenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { openWhatsAppCustomOrder } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  size: z.string().min(1, "Please select a size"),
  material: z.string().min(1, "Please select a material"),
  finish: z.string().min(1, "Please select a finish"),
  budget: z.string().min(1, "Please select a budget"),
  description: z.string().min(20, "Please describe your requirements (min 20 characters)"),
  deadline: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CustomOrder() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      size: "",
      material: "",
      finish: "",
      budget: "",
      description: "",
      deadline: "",
    },
  });

  function onSubmit(values: FormValues) {
    openWhatsAppCustomOrder({
      name: values.name,
      phone: values.phone,
      size: values.size,
      material: values.material,
      finish: values.finish,
      budget: values.budget,
      description: values.description,
      deadline: values.deadline || "Flexible",
    });
  }

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 border-b border-border py-10">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <PenLine className="w-8 h-8 text-primary mx-auto mb-3" />
          <h1 className="font-serif text-3xl font-bold text-foreground">Custom Order</h1>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Commission a Ganesha idol tailored exactly to your vision. Our master craftsmen will bring it to life.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* How it works */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-semibold text-foreground">How it works</h3>
            {[
              { step: "1", title: "Submit the form", desc: "Tell us what you have in mind" },
              { step: "2", title: "We connect on WhatsApp", desc: "Our team will reach out within 24 hours" },
              { step: "3", title: "Design & quote", desc: "We share sketches and a firm price" },
              { step: "4", title: "Craft & deliver", desc: "Your idol is handcrafted and shipped safely" },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-size">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["Under 4 inch", "4–6 inch", "6–9 inch", "9–12 inch", "12–18 inch", "18 inch+"].map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-material">
                              <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["Clay", "Brass", "Panchaloga", "Marble", "Silver", "Wood (Teak)", "Sandalwood", "Crystal", "Fiber", "Other"].map((m) => (
                              <SelectItem key={m} value={m}>{m}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="finish"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Finish</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-finish">
                              <SelectValue placeholder="Select finish" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["Natural / Unfinished", "Antique", "Gold Polish", "Silver Polish", "Multi-Color Paint", "White + Gold Accents", "Custom Colors"].map((f) => (
                              <SelectItem key={f} value={f}>{f}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Range</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-budget">
                              <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["Under ₹1,000", "₹1,000–₹3,000", "₹3,000–₹7,000", "₹7,000–₹15,000", "₹15,000–₹30,000", "₹30,000+"].map((b) => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe your vision</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the idol you have in mind — pose, expression, accessories, style references, occasion, special requirements..."
                          className="min-h-[120px] resize-none"
                          {...field}
                          data-testid="textarea-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery deadline (optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} data-testid="input-deadline" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#20b95a] text-white font-semibold"
                  data-testid="button-submit-custom-order"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Request on WhatsApp
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  This will open WhatsApp with your request pre-filled. We'll respond within 24 hours.
                </p>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
