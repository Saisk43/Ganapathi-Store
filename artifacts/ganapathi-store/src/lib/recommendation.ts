import { products, type Product } from "../data/products";

export type QuizAnswers = {
  budget: "under500" | "500to2000" | "2000to5000" | "5000plus";
  ecoFriendly: "yes" | "no";
  style: "traditional" | "contemporary" | "both";
  size: "small" | "medium" | "large" | "outdoor";
  homeType: "apartment" | "house" | "office" | "gift";
};

function budgetMax(budget: QuizAnswers["budget"]): number {
  switch (budget) {
    case "under500": return 499;
    case "500to2000": return 2000;
    case "2000to5000": return 5000;
    case "5000plus": return Infinity;
  }
}

export function getRecommendations(answers: QuizAnswers): Product[] {
  let scored = products.map((p) => {
    let score = 0;

    // Budget match
    const max = budgetMax(answers.budget);
    if (p.basePrice <= max) score += 3;
    else if (p.basePrice <= max * 1.3) score += 1;

    // Eco preference
    if (answers.ecoFriendly === "yes" && (p.category === "eco" || p.category === "clay" || p.category === "wood")) {
      score += 2;
    }

    // Style match
    if (answers.style === "traditional") {
      if (p.category === "brass" || p.category === "clay" || p.category === "folk" || p.category === "silver") score += 2;
    } else if (answers.style === "contemporary") {
      if (p.category === "crystal" || p.category === "marble" || p.category === "fiber") score += 2;
    } else {
      score += 1;
    }

    // Size match
    if (answers.size === "small" || answers.homeType === "apartment") {
      if (p.variants.sizes[0].label.includes("2") || p.variants.sizes[0].label.includes("3") || p.variants.sizes[0].label.includes("4")) score += 2;
    }
    if (answers.size === "outdoor" || answers.homeType === "office") {
      if (p.category === "fiber" || p.category === "marble") score += 2;
    }
    if (answers.size === "large") {
      if (p.variants.sizes.length >= 3) score += 1;
    }

    // Gift occasion
    if (answers.homeType === "gift") {
      if (p.category === "silver" || p.category === "crystal" || p.category === "brass") score += 2;
    }

    // Festival preference
    if (answers.ecoFriendly === "yes" && p.isFestivalSpecial) score += 1;

    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 4).map((s) => s.product);
}
