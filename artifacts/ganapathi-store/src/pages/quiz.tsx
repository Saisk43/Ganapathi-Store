import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { getRecommendations, type QuizAnswers } from "@/lib/recommendation";

type Step = {
  key: keyof QuizAnswers;
  question: string;
  options: { value: string; label: string; description?: string }[];
};

const steps: Step[] = [
  {
    key: "budget",
    question: "What is your budget?",
    options: [
      { value: "under500", label: "Under ₹500", description: "Affordable eco-friendly idols" },
      { value: "500to2000", label: "₹500 – ₹2,000", description: "Clay, wood & folk art" },
      { value: "2000to5000", label: "₹2,000 – ₹5,000", description: "Brass, fiber & quality marble" },
      { value: "5000plus", label: "₹5,000 & above", description: "Premium silver & fine marble" },
    ],
  },
  {
    key: "ecoFriendly",
    question: "Do you prefer eco-friendly materials?",
    options: [
      { value: "yes", label: "Yes, eco is important", description: "Biodegradable, river-safe" },
      { value: "no", label: "No preference", description: "All materials welcome" },
    ],
  },
  {
    key: "style",
    question: "What style speaks to you?",
    options: [
      { value: "traditional", label: "Traditional", description: "Time-honored temple styles" },
      { value: "contemporary", label: "Contemporary", description: "Modern, design-forward" },
      { value: "both", label: "A blend of both", description: "Classic meets modern" },
    ],
  },
  {
    key: "size",
    question: "What size works for your space?",
    options: [
      { value: "small", label: "Small (under 6 inch)", description: "Desk, car, or travel idol" },
      { value: "medium", label: "Medium (6–12 inch)", description: "Puja room or mandir" },
      { value: "large", label: "Large (12 inch+)", description: "Home centrepiece" },
      { value: "outdoor", label: "Outdoor or event", description: "Pandal or garden" },
    ],
  },
  {
    key: "homeType",
    question: "What is this idol for?",
    options: [
      { value: "apartment", label: "Apartment home", description: "Compact, elegant pieces" },
      { value: "house", label: "Independent house", description: "Larger statement pieces" },
      { value: "office", label: "Office or workspace", description: "Professional, tasteful" },
      { value: "gift", label: "A gift", description: "Packaging and presentation matter" },
    ],
  },
];

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(1);

  const step = steps[currentStep];

  function handleSelect(value: string) {
    const newAnswers = { ...answers, [step.key]: value };
    setAnswers(newAnswers);
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setTimeout(() => setCurrentStep((s) => s + 1), 150);
    } else {
      setShowResults(true);
    }
  }

  function handleBack() {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }

  function handleRestart() {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  }

  const recommendations = showResults ? getRecommendations(answers as QuizAnswers) : [];

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 border-b border-border py-10">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
          <h1 className="font-serif text-3xl font-bold text-foreground">Find Your Ganesha</h1>
          <p className="text-muted-foreground mt-2">Answer 5 questions and we'll match you with the perfect idol.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {!showResults ? (
          <>
            {/* Progress */}
            <div className="flex gap-1.5 mb-10">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-2 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                  Question {currentStep + 1} of {steps.length}
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
                  {step.question}
                </h2>

                <div className="grid gap-3">
                  {step.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:border-primary hover:bg-primary/5 group ${
                        answers[step.key] === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background"
                      }`}
                      data-testid={`quiz-option-${opt.value}`}
                    >
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {opt.label}
                      </div>
                      {opt.description && (
                        <div className="text-sm text-muted-foreground mt-0.5">{opt.description}</div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="mt-8 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-quiz-back"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <div className="text-3xl mb-3">ॐ</div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                Your Perfect Matches
              </h2>
              <p className="text-muted-foreground">
                Based on your answers, we recommend these sculptures.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {recommendations.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={handleRestart}
                data-testid="button-retake-quiz"
              >
                Retake Quiz
              </Button>
              <Button
                className="bg-primary text-primary-foreground"
                onClick={() => window.location.href = "/products"}
                data-testid="button-view-all-products"
              >
                View All Sculptures
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
