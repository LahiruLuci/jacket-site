export type Article = {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content?: string[];
  size: "large" | "medium" | "small";
};

export const ARTICLES: Article[] = [
  {
    id: "1",
    title: "The Ghost Ride: Midnight Calibration in Tokyo",
    category: "Culture",
    date: "APR 24, 2024",
    readTime: "8 MIN",
    image: "/assets/splitshire-biker-407123_1920.webp",
    excerpt: "Exploring the subculture of midnight riders who test ballistic gear in the neon-drenched corridors of Shinjuku.",
    content: [
      "The neon glare of Shinjuku isn't just an aesthetic; for the Jacket Junction test pilots, it's a high-velocity laboratory. At 02:00, when the civilian population recedes, the 'Ghost Riders' emerge. These aren't just enthusiasts—they are tactical evaluators pushing the limits of the Jacket Junction Series jackets.",
      "Our latest midnight run focused on thermal regulation and kinetic dispersal during high-lean maneuvers. Tokyo's tight technical corners provide the perfect environment to test how the D3O® reactive armor maintains its position relative to the rider's anatomy when gravity is fighting back.",
      "Precision isn't just about the stitching. It's about the psychological confidence that comes from knowing your gear has been calibrated in the world's most demanding urban environments. The Tokyo calibration ensures that every Jacket Junction piece isn't just worn; it's deployed."
    ],
    size: "large"
  },
  {
    id: "2",
    title: "Molecular Defense: Inside D3O Lab",
    category: "Technology",
    date: "APR 20, 2024",
    readTime: "12 MIN",
    image: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
    excerpt: "A deep dive into the non-Newtonian polymer science that makes our reactive armor possible.",
    content: [
      "In the world of mechanical defense, the line between comfort and catastrophe is measured in milliseconds. Standard armor is either hard and restrictive or soft and useless. Jacket Junction bridges this gap using advanced D3O® Molecular Technology.",
      "D3O® is a non-Newtonian fluid. Under normal conditions, its molecules flow freely, allowing the jacket to feel like a second skin. However, upon high-velocity impact, these molecules instantly lock together to absorb and dissipate energy.",
      "The result is a material that is as thin as a standard fabric but as resilient as a ballistic shield. Our latest 'Molecular Defense' series takes this further, integrating titanium micro-lattice structures to prevent friction-drag during a slide."
    ],
    size: "medium"
  },
  {
    id: "3",
    title: "Aramid vs. Steel: The Friction Test",
    category: "Engineering",
    date: "APR 18, 2024",
    readTime: "5 MIN",
    image: "/assets/stocksnap-dark-2598357_1920.webp",
    excerpt: "Benchmarking tensile strength under extreme drag conditions.",
    content: [
      "We don't believe in marketing jargon; we believe in G-forces and friction coefficients. The latest friction test pitted our 1000D Aramid Weave against standard industrial steel at 120km/h.",
      "While steel grinds and generates lethal heat, our Aramid weave utilizes thermodynamic micro-vents to bleed off energy while maintaining structural integrity. The test results were conclusive: zero penetration after 45 meters of continuous asphalt drag.",
      "Engineering for the slide means engineering for survival. This is why every seam in a Jacket Junction garment is triple-stitched with bonded nylon thread, ensuring the armor stays exactly where it's needed most."
    ],
    size: "small"
  },
  {
    id: "4",
    title: "The Urban Movement: Summer Series",
    category: "Style",
    date: "APR 15, 2024",
    readTime: "6 MIN",
    image: "/assets/derneuemann-jacket-2821961_1920.webp",
    excerpt: "Transitioning from the machine to the city without compromising the silhouette.",
    content: [
      "The challenge of urban riding is the transition. A jacket that looks great at the cafe often fails on the highway. Conversely, race-spec gear looks absurd in a boardroom.",
      "The Urban Movement Summer Series solves this via 'Modular Stealth'. By integrating removable titanium sliders and internal ventilation channels, we've created a silhouette that remains sharp and minimal while concealing a full suite of Level 2 protection.",
      "Style is a survival trait. If you feel comfortable in your gear, you ride with more focus. The Summer Series ensures that heat exhaustion never compromises your reaction time."
    ],
    size: "medium"
  },
  {
    id: "5",
    title: "Archives: The 1994 Ballistic Prototype",
    category: "History",
    date: "APR 10, 2024",
    readTime: "15 MIN",
    image: "/assets/splitshire-biker-407123_1920.webp",
    excerpt: "Unearthing the original blueprint that started the Jacket Junction revolution.",
    content: [
      "Thirty years ago, the concept of 'high-performance motorcycle fashion' didn't exist. You either had heavy cowhide or plastic shells. The 1994 Ballistic Prototype changed that by introducing the first-ever integrated carbon fiber shoulder caps.",
      "This prototype, codenamed 'JJ-01', laid the foundation for our current design philosophy: Minimal UI, Maximal Protection. We've come a long way since the early carbon weaves, but the core DNA remains unchanged.",
      "Looking back at the Archives reminds us that innovation is a constant pursuit. Every jacket we ship today is a direct descendant of that original, rebellious blueprint."
    ],
    size: "small"
  }
];
