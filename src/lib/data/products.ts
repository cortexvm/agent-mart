import { Product } from "../types";

export const products: Product[] = [
  // Books - Programming
  {
    id: "clean-code",
    name: "Clean Code",
    description: "A Handbook of Agile Software Craftsmanship by Robert C. Martin. Learn to write code that is clean, readable, and maintainable.",
    price: 34.99,
    currency: "USD",
    category: "books",
    subcategory: "programming",
    image: "/images/clean-code.svg",
    inStock: true,
    tags: ["software", "best-practices", "agile"],
  },
  {
    id: "pragmatic-programmer",
    name: "The Pragmatic Programmer",
    description: "Your Journey to Mastery by David Thomas and Andrew Hunt. One of the most influential books on software development.",
    price: 39.99,
    currency: "USD",
    category: "books",
    subcategory: "programming",
    image: "/images/pragmatic-programmer.svg",
    inStock: true,
    tags: ["software", "career", "craftsmanship"],
  },
  {
    id: "design-patterns",
    name: "Design Patterns: Elements of Reusable Object-Oriented Software",
    description: "The classic Gang of Four book on design patterns. Essential reading for software architects.",
    price: 44.99,
    currency: "USD",
    category: "books",
    subcategory: "programming",
    image: "/images/design-patterns.svg",
    inStock: true,
    tags: ["patterns", "architecture", "oop"],
  },
  {
    id: "intro-algorithms",
    name: "Introduction to Algorithms (CLRS)",
    description: "The comprehensive textbook by Cormen, Leiserson, Rivest, and Stein. The definitive guide to algorithms.",
    price: 74.99,
    currency: "USD",
    category: "books",
    subcategory: "programming",
    image: "/images/intro-algorithms.svg",
    inStock: true,
    tags: ["algorithms", "data-structures", "computer-science"],
  },
  // Books - AI
  {
    id: "ai-modern-approach",
    name: "Artificial Intelligence: A Modern Approach",
    description: "By Stuart Russell and Peter Norvig. The leading textbook on artificial intelligence, used in over 1500 universities.",
    price: 69.99,
    currency: "USD",
    category: "books",
    subcategory: "ai",
    image: "/images/ai-modern-approach.svg",
    inStock: true,
    tags: ["ai", "textbook", "machine-learning"],
  },
  {
    id: "deep-learning",
    name: "Deep Learning",
    description: "By Ian Goodfellow, Yoshua Bengio, and Aaron Courville. The comprehensive deep learning textbook.",
    price: 59.99,
    currency: "USD",
    category: "books",
    subcategory: "ai",
    image: "/images/deep-learning.svg",
    inStock: true,
    tags: ["deep-learning", "neural-networks", "ai"],
  },
  {
    id: "hands-on-ml",
    name: "Hands-On Machine Learning",
    description: "By Aurelien Geron. Practical guide using Scikit-Learn, Keras, and TensorFlow.",
    price: 49.99,
    currency: "USD",
    category: "books",
    subcategory: "ai",
    image: "/images/hands-on-ml.svg",
    inStock: true,
    tags: ["machine-learning", "python", "practical"],
  },
  // Books - Fiction
  {
    id: "dune",
    name: "Dune",
    description: "By Frank Herbert. The epic science fiction masterpiece about politics, religion, and ecology on the desert planet Arrakis.",
    price: 14.99,
    currency: "USD",
    category: "books",
    subcategory: "fiction",
    image: "/images/dune.svg",
    inStock: true,
    tags: ["sci-fi", "classic", "epic"],
  },
  {
    id: "neuromancer",
    name: "Neuromancer",
    description: "By William Gibson. The groundbreaking cyberpunk novel that defined a genre and predicted the internet age.",
    price: 12.99,
    currency: "USD",
    category: "books",
    subcategory: "fiction",
    image: "/images/neuromancer.svg",
    inStock: true,
    tags: ["cyberpunk", "sci-fi", "classic"],
  },
  {
    id: "hitchhikers-guide",
    name: "The Hitchhiker's Guide to the Galaxy",
    description: "By Douglas Adams. The comedic science fiction classic about the answer to life, the universe, and everything.",
    price: 11.99,
    currency: "USD",
    category: "books",
    subcategory: "fiction",
    image: "/images/hitchhikers-guide.svg",
    inStock: true,
    tags: ["comedy", "sci-fi", "classic"],
  },
  // Gadgets - Cables
  {
    id: "usb-c-cable",
    name: "USB-C to USB-A Cable 6ft",
    description: "High-quality braided USB-C to USB-A cable, 6 feet long. Supports fast charging and data transfer up to 480Mbps.",
    price: 8.99,
    currency: "USD",
    category: "gadgets",
    subcategory: "cables",
    image: "/images/usb-c-cable.svg",
    inStock: true,
    tags: ["usb", "charging", "data-transfer"],
  },
  {
    id: "hdmi-cable",
    name: "HDMI 2.1 Cable 3ft",
    description: "Ultra high-speed HDMI 2.1 cable supporting 8K@60Hz and 4K@120Hz. Perfect for gaming and high-res displays.",
    price: 12.99,
    currency: "USD",
    category: "gadgets",
    subcategory: "cables",
    image: "/images/hdmi-cable.svg",
    inStock: true,
    tags: ["hdmi", "video", "gaming"],
  },
  {
    id: "lightning-adapter",
    name: "Lightning to USB-C Adapter",
    description: "Compact adapter to connect Lightning devices to USB-C ports. Supports charging and data sync.",
    price: 9.99,
    currency: "USD",
    category: "gadgets",
    subcategory: "cables",
    image: "/images/lightning-adapter.svg",
    inStock: true,
    tags: ["apple", "adapter", "usb-c"],
  },
  // Gadgets - Tools
  {
    id: "screwdriver-set",
    name: "Precision Screwdriver Set (64-bit)",
    description: "Professional 64-in-1 precision screwdriver set with magnetic bits. Ideal for electronics repair.",
    price: 24.99,
    currency: "USD",
    category: "gadgets",
    subcategory: "tools",
    image: "/images/screwdriver-set.svg",
    inStock: true,
    tags: ["repair", "electronics", "precision"],
  },
  {
    id: "anti-static-strap",
    name: "Anti-Static Wrist Strap",
    description: "Adjustable anti-static wrist strap with grounding cord. Essential for safe electronics handling.",
    price: 6.99,
    currency: "USD",
    category: "gadgets",
    subcategory: "tools",
    image: "/images/anti-static-strap.svg",
    inStock: true,
    tags: ["esd", "safety", "electronics"],
  },
  {
    id: "digital-multimeter",
    name: "Digital Multimeter",
    description: "Compact digital multimeter with auto-ranging. Measures voltage, current, resistance, and continuity.",
    price: 19.99,
    currency: "USD",
    category: "gadgets",
    subcategory: "tools",
    image: "/images/digital-multimeter.svg",
    inStock: true,
    tags: ["measurement", "electronics", "diagnostic"],
  },
  // Gadgets - Accessories
  {
    id: "laptop-stand",
    name: "Laptop Stand (Aluminum)",
    description: "Ergonomic aluminum laptop stand with adjustable height. Improves airflow and posture.",
    price: 29.99,
    currency: "USD",
    category: "gadgets",
    subcategory: "accessories",
    image: "/images/laptop-stand.svg",
    inStock: true,
    tags: ["ergonomic", "desk", "cooling"],
  },
  {
    id: "keyboard-switch-tester",
    name: "Mechanical Keyboard Switch Tester",
    description: "12-key switch tester featuring popular Cherry MX, Gateron, and Kailh switches. Try before you buy.",
    price: 15.99,
    currency: "USD",
    category: "gadgets",
    subcategory: "accessories",
    image: "/images/keyboard-switch-tester.svg",
    inStock: true,
    tags: ["keyboard", "mechanical", "testing"],
  },
  {
    id: "webcam-cover",
    name: "Webcam Privacy Cover (3-pack)",
    description: "Ultra-thin sliding webcam covers for laptops, tablets, and phones. Protect your privacy.",
    price: 4.99,
    currency: "USD",
    category: "gadgets",
    subcategory: "accessories",
    image: "/images/webcam-cover.svg",
    inStock: true,
    tags: ["privacy", "security", "laptop"],
  },
  {
    id: "cable-clips",
    name: "Cable Management Clips (10-pack)",
    description: "Self-adhesive cable management clips for desk organization. Holds up to 3 cables per clip.",
    price: 7.99,
    currency: "USD",
    category: "gadgets",
    subcategory: "accessories",
    image: "/images/cable-clips.svg",
    inStock: true,
    tags: ["organization", "desk", "cable-management"],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category?: string, subcategory?: string, search?: string): Product[] {
  let filtered = products;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (subcategory) {
    filtered = filtered.filter((p) => p.subcategory === subcategory);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return filtered;
}
