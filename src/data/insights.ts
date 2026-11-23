export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const insights: Insight[] = [
  {
    slug: "planning-a-kitchen-that-works",
    title: "A kitchen that works as beautifully as it looks",
    excerpt:
      "A practical guide to planning the flow, storage and finishes that make a kitchen feel effortless every day.",
    category: "Kitchen design",
    publishedAt: "2026-11-23",
    readTime: "5 min read",
    image: "/images/kitchen.webp",
    imageAlt: "A thoughtfully finished custom kitchen",
    sections: [
      {
        heading: "Start with the way you live",
        paragraphs: [
          "Before choosing cabinet colours or handles, notice how your household uses the kitchen. Where do shopping bags land? Who cooks, and do they cook alone? Is the kitchen also a place for homework, conversation or a quick breakfast?",
          "Those everyday habits determine where work surfaces, seating and storage will be most useful. A beautiful plan is one that makes the routines you already have feel easier.",
        ],
      },
      {
        heading: "Plan the working zones",
        paragraphs: [
          "Group the sink, preparation area, cooking zone and refrigerator so the steps between them feel natural. Leave a generous stretch of clear counter beside the sink and hob, and make sure doors and drawers can open without colliding with each other.",
          "There is no single layout that suits every room. The goal is a clear route through the kitchen, with the busiest tasks close at hand and enough room for more than one person to move comfortably.",
        ],
      },
      {
        heading: "Give storage a specific job",
        paragraphs: [
          "Decide what each cabinet needs to hold before setting its dimensions. Deep drawers often make pots and everyday dishes easier to reach, while narrow pull-outs can make good use of awkward gaps. Keep frequently used items between waist and eye level.",
          "Finally, think about the details that are harder to change later: appliance sizes, lighting, ventilation, power points and the material around the sink. Planning these early helps the finished kitchen feel considered from every angle.",
        ],
      },
    ],
  },
  {
    slug: "wardrobe-storage-that-fits-your-routine",
    title: "Wardrobe storage that fits your routine",
    excerpt:
      "Make fitted storage work harder by planning around what you own, how you get dressed and the space available.",
    category: "Wardrobes",
    publishedAt: "2026-11-16",
    readTime: "4 min read",
    image: "/images/wardrobe.webp",
    imageAlt: "A fitted wardrobe designed for organised storage",
    sections: [
      {
        heading: "Take stock before you design",
        paragraphs: [
          "A wardrobe plan should begin with the clothes, shoes and accessories you actually use. Notice what needs hanging, what folds well and what you want to see at a glance. A quick inventory prevents giving valuable space to storage that will not suit your routine.",
          "Allow room for longer garments as well as shorter pieces, and consider whether seasonal items need a dedicated upper shelf or a separate place elsewhere in the home.",
        ],
      },
      {
        heading: "Make the interior easy to use",
        paragraphs: [
          "Drawers are useful for smaller items, while adjustable shelves can adapt as your needs change. A second hanging rail can make better use of vertical space for shirts and trousers. Place everyday essentials where you can reach them without moving everything else.",
          "If more than one person shares the wardrobe, clear zones can make mornings calmer. Divide the interior according to each person's habits instead of splitting it into identical halves by default.",
        ],
      },
      {
        heading: "Finish with light and good clearances",
        paragraphs: [
          "Check that doors, drawers and room entrances can all open freely. Sliding doors can be useful where swing space is limited, while hinged doors offer full access to the interior. Integrated lighting helps you see colours clearly, especially in deeper storage.",
          "A well-designed wardrobe is not just about fitting more in. It is about making the things you use easy to find and keeping the room feeling uncluttered.",
        ],
      },
    ],
  },
  {
    slug: "choosing-a-bathroom-vanity",
    title: "Choosing a bathroom vanity for a hardworking space",
    excerpt:
      "Balance storage, proportion and moisture-conscious materials to create a vanity that feels right for your bathroom.",
    category: "Bathroom design",
    publishedAt: "2026-11-09",
    readTime: "4 min read",
    image: "/images/vanity.webp",
    imageAlt: "A custom vanity with clean lines and practical storage",
    sections: [
      {
        heading: "Measure around the plumbing",
        paragraphs: [
          "The basin and existing pipework shape what can fit beneath the counter. Measure the room carefully, including door swings and the space needed to move around comfortably. A floating vanity can make a compact room feel more open, while a floor-standing unit may provide more enclosed storage.",
          "Choose the basin and tap together with the cabinet plan so their positions, heights and clearances work as one.",
        ],
      },
      {
        heading: "Choose materials for real conditions",
        paragraphs: [
          "Bathrooms regularly deal with splashes, humidity and cleaning products. Moisture-resistant construction, sealed edges and finishes suited to frequent wiping help a vanity keep its appearance over time.",
          "A durable surface is important, but so is a layout that keeps water from sitting around seams and edges. Thoughtful detailing can make daily maintenance simpler.",
        ],
      },
      {
        heading: "Keep the counter clear",
        paragraphs: [
          "Think about what you reach for every morning and evening. Drawers with practical internal organisation can keep those items close without filling the counter. Leave enough usable surface around the basin for the things that need to stay out.",
          "Good mirror and task lighting complete the setup. Together with a vanity sized to the room, they make a small bathroom feel calm and work efficiently.",
        ],
      },
    ],
  },
  {
    slug: "a-tv-unit-that-brings-the-room-together",
    title: "A media wall that brings the living room together",
    excerpt:
      "Plan a TV feature around viewing comfort, concealed cables and storage that keeps everyday clutter out of sight.",
    category: "Living spaces",
    publishedAt: "2026-11-02",
    readTime: "4 min read",
    image: "/images/tv-unit.webp",
    imageAlt: "A custom TV unit designed to anchor a living room",
    sections: [
      {
        heading: "Begin with the viewing position",
        paragraphs: [
          "The screen should feel comfortable from the seats you use most. Consider viewing distance, screen size, glare from windows and the height of the sofa before deciding where the unit belongs.",
          "Mark out the proposed screen and furniture positions in the room. This simple step helps reveal awkward sightlines before any cabinetry is built.",
        ],
      },
      {
        heading: "Design for equipment and cables",
        paragraphs: [
          "List every device that needs a home, from routers and consoles to speakers and streaming boxes. Allow space for ventilation and access to sockets, and plan cable routes so wires do not become a visible afterthought.",
          "A combination of open shelves and closed storage can keep frequently used equipment accessible while giving remotes, games and accessories a place to disappear.",
        ],
      },
      {
        heading: "Give the feature room to breathe",
        paragraphs: [
          "A media wall does not need to fill every centimetre. Balancing the screen with open space, shelves or a contrasting finish can make the composition feel lighter and help the rest of the room remain part of the design.",
          "Consider how the unit looks when the screen is off, too. Materials, lighting and storage proportions should feel at home in the room throughout the day.",
        ],
      },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((insight) => insight.slug === slug);
