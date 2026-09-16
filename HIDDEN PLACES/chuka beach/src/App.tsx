import { useState, useRef, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuickFact {
  bestTime: string
  duration: string
  budget: string
  destinationType: string
  difficulty: string
  distance: string
}

export interface ScoreCategory {
  name: string
  score: number
}

export interface DiscoveryScore {
  overall: number
  categories: ScoreCategory[]
}

export interface TimelineEntry {
  year: string
  event: string
  era: string
}

export interface CultureCard {
  title: string
  description: string
  image: string
}

export interface FoodItem {
  name: string
  description: string
  category: string
  price: string
  image: string
}

export interface Attraction {
  id: string
  name: string
  category: string
  description: string
  duration: string
  distance: string
  score: number
  image: string
}

export interface HiddenGem {
  name: string
  why: string
  distance: string
  duration: string
  image: string
}

export interface Activity {
  activity: string
  duration: string
  cost: string
  difficulty: string
  bestTime: string
  image: string
}

export interface NearbyPlace {
  name: string
  distance: string
  type: string
  travelTime: string
  image: string
}

export interface TransportOption {
  airport?: string
  station?: string
  highway?: string
  distance: string
  time: string
}

export interface StayCategory {
  type: string
  range: string
  options: string[]
}

export interface MonthStatus {
  month: string
  status: 'ideal' | 'good' | 'avoid'
}

export interface BudgetBreakdown {
  category: string
  amount: string
}

export interface BudgetTier {
  tier: string
  perDay: string
  breakdown: BudgetBreakdown[]
}

export interface ScheduleItem {
  time: string
  place: string
  duration: string
  distance?: string
}

export interface DayPlan {
  day: number
  schedule: ScheduleItem[]
}

export interface Experience {
  title: string
  duration: string
  price: string
  category: string
  image: string
}

export interface Review {
  name: string
  location: string
  text: string
  rating: number
  image: string
  date: string
}

export interface Sources {
  official: string[]
  historical: string[]
  lastVerified: string
}

export interface Destination {
  id: string
  slug: string
  name: string
  localName: string
  destinationType: string
  country: string
  state: string
  district: string
  tehsil: string
  shortDescription: string
  tags: string[]
  hero: { image: string; poster?: string }
  quickFacts: QuickFact
  discoveryScore: DiscoveryScore
  editorial: { why: string; story: string; storyFull: string }
  history: { timeline: TimelineEntry[]; shortIntro: string }
  culture: CultureCard[]
  food: FoodItem[]
  attractions: Attraction[]
  hiddenGems: HiddenGem[]
  thingsToDo: Activity[]
  nearbyPlaces: NearbyPlace[]
  travel: { air: TransportOption; rail: TransportOption; road: TransportOption }
  stay: { categories: StayCategory[] }
  bestTime: { months: MonthStatus[] }
  budget: { tiers: BudgetTier[] }
  itineraries: Record<string, DayPlan[]>
  experiences: Experience[]
  aiPrompts: string[]
  reviews: Review[]
  sources: Sources
}

// ─── CHUKA BEACH DATA ─────────────────────────────────────────────────────────

export const chukaBeach: Destination = {
  id: "chuka-beach",
  slug: "chuka-beach-pilibhit",
  name: "Chuka Beach",
  localName: "चुका बीच (पीलीभीत फॉरेस्ट बीच)",
  destinationType: "Inland Forest Beach & Tiger Reserve Ecotourism",
  country: "India",
  state: "Uttar Pradesh",
  district: "Pilibhit",
  tehsil: "Kalinagar / Puranpur (Mustafabad Range)",
  shortDescription: "Uttar Pradesh’s best-kept secret, where dense Sal forests meet the shimmering, wave-lapped shores of a massive Himalayan reservoir.",
  tags: ["ECOTOURISM BEACH", "PILIBHIT TIGER RESERVE", "SHARDA SAGAR RESERVOIR", "CANOPY TREE HOUSES", "TERAI BIG CATS"],
  hero: {
    image: "/images/chuka_beach_hero_fullhd.jpg",
    poster: "/images/pilibhit_tiger.jpg"
  },
  quickFacts: {
    bestTime: "Nov – Mar",
    duration: "2 Days / 1 Night",
    budget: "₹₹ (Moderate)",
    destinationType: "Freshwater Beach & Wildlife Reserve",
    difficulty: "Easy",
    distance: "~63 km from Pilibhit / ~75 km from Bareilly"
  },
  discoveryScore: {
    overall: 9.3,
    categories: [
      { name: "Forest Shoreline Authenticity", score: 9.9 },
      { name: "Tiger Reserve Biodiversity", score: 9.6 },
      { name: "Vernacular Eco-Architecture", score: 9.2 },
      { name: "Tharu Tribal Heritage", score: 7.0 },
      { name: "Exclusivity & Serenity", score: 9.5 }
    ]
  },
  editorial: {
    why: "Sitting hundreds of miles from India's ocean coasts, Chuka Beach is an extraordinary natural anomaly. Here, pristine white sands and gentle freshwater waves of the Sharda Sagar Dam lap against the dramatic backdrop of towering Sal and Teak canopies in the heart of the Pilibhit Tiger Reserve.",
    story: "Originally conceptualized in 2002 as a pioneering community conservation initiative by visionary IFS officer Ramesh Pandey, Chuka Beach was designed to curb illegal encroachments, protect critical wildlife corridors, and generate sustainable livelihoods for indigenous communities. Surrounded by the sprawling 22-km expanse of the Sharda Sagar reservoir along the Indo-Nepal border, it has transformed into a tranquil sanctuary free of commercial hawkers, loud beach shacks, and mass tourism.",
    storyFull: "Visitors stay in elevated wooden tree houses and traditional Tharu bamboo water huts constructed right over the water’s edge. Mornings begin with thick golden mist rolling off the reservoir, accompanied by the musical calls of hornbills, bar-headed geese, and the haunting alarm calls of spotted deer echoing through the Terai grasslands. With dedicated jeep safari tracks through the Mustafabad range, travelers can track Royal Bengal tigers, leopards, and swamp deer before returning to serene water-view sunsets."
  },
  history: {
    shortIntro: "From historic Nawabi hunting grounds and an irrigation dam to an award-winning eco-tourism haven.",
    timeline: [
      { year: "Pre-Independence", event: "Dense, untamed Terai forest tract under Nawabi and British feudal control, primarily used for timber extraction and royal shikar.", era: "Colonial Era" },
      { year: "1970s–1980s", event: "Construction of the massive Sharda Sagar Dam on the Sharda River creates a 22-km Himalayan-fed reservoir flanking rich alluvial forests.", era: "Hydrology Milestone" },
      { year: "2002", event: "Visionary IFS officer Ramesh Pandey conceptualizes Chuka Beach, building low-impact Tharu eco-huts and tree houses with local community participation.", era: "Conservation Pioneer" },
      { year: "2008", event: "Formally notified as Pilibhit Tiger Reserve (45th in India); later awarded the prestigious global TX2 Award for doubling tiger population ahead of target.", era: "Tiger Reserve Notification" },
      { year: "Present", event: "Regulated strictly by the UP Forest Department with controlled daily permits, online ecotourism booking, and trained local guides.", era: "Sustainable Future" }
    ]
  },
  culture: [
    {
      title: "Indigenous Tharu Tribal Heritage",
      description: "Local fringe villages are home to the Tharu people, who maintain an intimate bond with the Terai forests, practicing sustainable foraging, bamboo craftsmanship, and vibrant folk traditions.",
      image: '/images/treehouse_hut.jpg'
    },
    {
      title: "Bansuri Nagari (Flute Capital of India)",
      description: "Pilibhit crafts over 90% of India's classical bamboo flutes under the ODOP scheme, immortalized by the 61-foot world-record flute at Bansuri Chowk.",
      image: '/images/bansuri_chowk.jpg'
    },
    {
      title: "Sacred Groves & Bhairo Baba Shrines",
      description: "Ancient Pavitra Van (sacred forest groves) border the reserve where villagers offer prayers to local deities like Bhairo Baba for protection and peaceful coexistence with tigers.",
      image: '/images/forest_watch_tower.jpg'
    },
    {
      title: "Legends of the Terai Spirits",
      description: "Centuries-old oral folklore tells of benevolent Terai forest spirits that guard the big cats and punish those who disrespect the sacred waters of Sharda Sagar.",
      image: '/images/pilibhit_tiger_grass.jpg'
    }
  ],
  food: [
    {
      name: "Pilibhit Bajra Roti with Saag",
      description: "Wholesome pearl millet flatbread baked on wood-fire ovens, served with fresh mustard or bathua greens and generous dollops of country white butter.",
      category: "Specialty",
      price: "₹80–₹140/thali",
      image: '/images/litti_chokha.jpg'
    },
    {
      name: "Desi Ghee Terai Dal-Bati & Chokha",
      description: "Crisp whole wheat baked batis steeped in pure local desi ghee, paired with smoky fire-roasted brinjal-tomato chokha and spiced lentil curry.",
      category: "Main Course",
      price: "₹100–₹160",
      image: '/images/litti_chokha.jpg'
    },
    {
      name: "Pilibhit Special Urad Dal Kachori",
      description: "Golden flaky pastries stuffed with spiced lentils, accompanied by tangy aloo rasedar gravy and crushed green chili-coriander chutney.",
      category: "Breakfast / Snack",
      price: "₹30–₹60/plate",
      image: '/images/kachori.jpg'
    },
    {
      name: "Fresh Churned Mattha & Sugarcane Gur",
      description: "Refreshing spiced buttermilk tempered with roasted cumin, followed by pure unrefined country jaggery freshly pressed from neighboring sugarcane fields.",
      category: "Beverage",
      price: "₹20–₹40/glass",
      image: '/images/sattu_drink.jpg'
    },
    {
      name: "Madhotanda Kulhad Chai & Samosa Chaat",
      description: "Cardamom-ginger steeped hot clay-pot tea enjoyed with crispy potato samosas topped with fresh curd, tamarind chutney, and roasted spices.",
      category: "Highway Snack",
      price: "₹30–₹60",
      image: '/images/samosa_chaat.jpg'
    },
    {
      name: "Slow-Cooked Kheer & Rabri",
      description: "Thick creamy rice dessert slow-simmered with country buffalo milk, cardamom, and toasted dry fruits, popular across Pilibhit and Madhotanda dhabas.",
      category: "Dessert",
      price: "₹40–₹80",
      image: '/images/kheer.jpg'
    }
  ],
  attractions: [
    {
      id: "chuka-beach-shoreline",
      name: "Chuka Main Beach & Shoreline",
      category: "Forest Beach & Scenic Waterfront",
      description: "A serene white sand shoreline meeting the vast freshwater Sharda Sagar reservoir with gentle waves, perfect for peaceful walks, birdwatching, and morning photography.",
      duration: "2–3 Hours",
      distance: "Core Eco-Tourism Zone",
      score: 9.8,
      image: '/images/chuka_beach_hero_fullhd.jpg'
    },
    {
      id: "water-huts-treehouses",
      name: "Water Huts & Elevated Tree Houses",
      category: "Vernacular Eco-Architecture",
      description: "Picturesque elevated wooden machans and traditional Tharu bamboo huts perched directly over the water's edge, offering an immersive jungle-living stay.",
      duration: "Overnight / 1 Hour Visit",
      distance: "Waterfront Enclave",
      score: 9.6,
      image: '/images/treehouse_hut.jpg'
    },
    {
      id: "mustafabad-safari",
      name: "Mustafabad Forest Safari Track",
      category: "Wildlife & Tiger Country",
      description: "Designated 4x4 open jeep safari routes winding through towering Sal forests and Terai grasslands with high probabilities of spotting Royal Bengal tigers, leopards, and swamp deer.",
      duration: "3–4 Hours",
      distance: "Mustafabad Range",
      score: 9.7,
      image: '/images/pilibhit_tiger.jpg'
    },
    {
      id: "sharda-sagar-dam",
      name: "Sharda Sagar Dam Reservoir Viewpoint",
      category: "Wetland & Panoramic Vista",
      description: "A massive 22-km long reservoir bordering Nepal that acts as a vital wintering ground for thousands of migratory birds including bar-headed geese, mallards, and osprey.",
      duration: "1–2 Hours",
      distance: "Dam Embankment",
      score: 9.4,
      image: '/images/sharda_sagar_dam.jpg'
    },
    {
      id: "canopy-watchtower",
      name: "Forest Canopy Watchtower (Machan)",
      category: "Observation Deck & Birding",
      description: "High-altitude forest department watchtower providing sweeping 360-degree vistas across the canopy, grassland-to-water transition zone, and grazing wild herbivores.",
      duration: "1 Hour",
      distance: "1 km from beach",
      score: 9.2,
      image: '/images/forest_watch_tower.jpg'
    },
    {
      id: "bansuri-chowk",
      name: "Bansuri Chowk (Pilibhit City)",
      category: "Cultural Landmark & Craft Hub",
      description: "The city's vibrant artisan crossroads featuring the world's largest 61-foot bamboo flute, celebrating Pilibhit's GI-tagged flute making heritage.",
      duration: "1 Hour",
      distance: "63 km in Pilibhit City",
      score: 9.0,
      image: '/images/bansuri_chowk.jpg'
    }
  ],
  hiddenGems: [
    {
      name: "Banbasa Feeder Canal Confluence",
      why: "A secluded emerald waterway connecting the Banbasa barrage to Sharda Sagar, where smooth-coated otters and marsh mugger crocodiles bask in quiet solitude.",
      distance: "Near Dam inlet",
      duration: "1.5 hrs",
      image: '/images/sharda_feeder_canal.jpg'
    },
    {
      name: "Bhimtaal Savannah Grasslands",
      why: "Expansive natural Terai grassland glade famous among forest guides for early morning sightings of majestic tigers emerging from tall grass and herds of swamp deer.",
      distance: "Deep Mustafabad Zone",
      duration: "2 hrs",
      image: '/images/pilibhit_tiger_grass.jpg'
    },
    {
      name: "Mahof Colonial Forest Bungalow",
      why: "A historic British-era forest outpost shaded by century-old heritage trees, offering tranquil walking trails, vintage architecture, and rare butterfly sightings.",
      distance: "Mahof Forest Range",
      duration: "1.5 hrs",
      image: '/images/forest_watch_tower.jpg'
    }
  ],
  thingsToDo: [
    { activity: "Sunrise White Sand Beach Walk & Birding", duration: "2.5 hrs", cost: "₹100 (Entry)", difficulty: "Easy", bestTime: "06:30 AM – 09:30 AM, Nov–Mar", image: "/images/chuka_beach_hero_fullhd.jpg" },
    { activity: "Mustafabad 4x4 Jeep Tiger Safari", duration: "3.5 hrs", cost: "₹3,600–₹4,500/vehicle", difficulty: "Moderate", bestTime: "06:30 AM or 02:30 PM shift", image: "/images/pilibhit_tiger.jpg" },
    { activity: "Calm Water Boating & Reservoir Cruise", duration: "1 hr", cost: "₹150–₹300/person", difficulty: "Easy", bestTime: "03:30 PM – 05:30 PM", image: "/images/sharda_sagar_dam.jpg" },
    { activity: "Canopy Watchtower Raptor & Deer Staking", duration: "1.5 hrs", cost: "Included with permit", difficulty: "Easy", bestTime: "Golden Hour 04:00 PM – 05:30 PM", image: "/images/forest_watch_tower.jpg" },
    { activity: "Pilibhit Bamboo Flute Artisan Trail", duration: "2 hrs", cost: "Free / Craft Purchase", difficulty: "Easy", bestTime: "11:00 AM – 04:00 PM", image: "/images/bansuri_chowk.jpg" }
  ],
  nearbyPlaces: [
    { name: "Madhotanda Rural Market", distance: "10 km", type: "Terai Bazaar & Local Dhabas", travelTime: "15 min", image: "/images/samosa_chaat.jpg" },
    { name: "Pilibhit City Center", distance: "63 km", type: "District HQ & Historic Flute Hub", travelTime: "1.5 hrs", image: "/images/bansuri_chowk.jpg" },
    { name: "Bareilly Junction & City", distance: "75 km", type: "Major Railway Trunk & Airport", travelTime: "2 hrs", image: "https://images.unsplash.com/photo-1591018653367-9c01498b3320?w=500&h=340&fit=crop&auto=format" },
    { name: "Dudhwa National Park Buffer", distance: "50 km", type: "Tiger & One-Horned Rhino Sanctuary", travelTime: "1.5 hrs", image: "/images/pilibhit_tiger_grass.jpg" }
  ],
  travel: {
    air: { airport: "Bareilly Airport (BEK) / Lucknow Airport (LKO)", distance: "80 km / 260 km", time: "Bareilly ~2 hrs drive; Lucknow ~5 hrs drive via smooth State Highways" },
    rail: { station: "Pilibhit Junction (PBE) / Bareilly Junction (BRY)", distance: "63 km / 75 km", time: "Pilibhit connects regional expresses; Bareilly is a major national trunk junction with daily Shatabdi & Rajdhani connections" },
    road: { highway: "State Highway 30 via Madhotanda & Mustafabad Check Post", distance: "Scenic forest approach road", time: "Smooth paved road shaded by Sal canopy leading directly to the forest entry barrier" }
  },
  stay: {
    categories: [
      { type: "Chuka Forest Eco-Huts & Tree Houses", range: "₹2,400–₹7,600/night", options: ["Elevated Tree Machan (Waterfront)", "Traditional Tharu Bamboo Cottages (Official UP Ecotourism portal booking)"] },
      { type: "Peripheral Agro-Homestays & Resorts", range: "₹1,800–₹3,500/night", options: ["Royal Kingdom Resort (Pilibhit Road)", "Madhotanda Farmstays"] },
      { type: "City Hotels in Pilibhit", range: "₹1,200–₹2,500/night", options: ["City hotels near Pilibhit Junction & Station Road"] }
    ]
  },
  bestTime: {
    months: [
      { month: "Jan", status: "ideal" }, { month: "Feb", status: "ideal" }, { month: "Mar", status: "good" },
      { month: "Apr", status: "good" }, { month: "May", status: "good" }, { month: "Jun", status: "avoid" },
      { month: "Jul", status: "avoid" }, { month: "Aug", status: "avoid" }, { month: "Sep", status: "avoid" },
      { month: "Oct", status: "good" }, { month: "Nov", status: "ideal" }, { month: "Dec", status: "ideal" }
    ]
  },
  budget: {
    tiers: [
      { tier: "Day Trip / Backpacker", perDay: "₹1,500–₹2,500", breakdown: [{ category: "Beach Entry & Shared Cab", amount: "₹800–₹1,200" }, { category: "Local Food & Tea", amount: "₹400–₹600" }, { category: "Boating / Activity", amount: "₹300–₹700" }] },
      { tier: "Eco-Hut Safari Experience", perDay: "₹4,500–₹7,500", breakdown: [{ category: "Tree House / Tharu Hut (shared)", amount: "₹2,500–₹4,000" }, { category: "4x4 Jungle Jeep Safari", amount: "₹1,500–₹2,500" }, { category: "Forest Canteen Dining", amount: "₹500–₹1,000" }] }
    ]
  },
  itineraries: {
    '1-Day Express': [
      {
        day: 1,
        schedule: [
          { time: "07:00 AM", place: "Early arrival at Mustafabad Forest Gate, entry formalities, and morning open-gypsy tiger safari", duration: "3.5 hrs", distance: "Mustafabad Range" },
          { time: "11:00 AM", place: "Wholesome lunch at Forest Canteen followed by relaxed stroll along Chuka Beach shoreline", duration: "2.5 hrs", distance: "Chuka Beach" },
          { time: "02:30 PM", place: "Scenic boat cruise on Sharda Sagar Dam with bird photography of Bar-headed Geese", duration: "1.5 hrs", distance: "Dam Shoreline" },
          { time: "04:30 PM", place: "Sunset panoramic view from Canopy Watchtower and departure through Sal forest tunnel road", duration: "1.5 hrs", distance: "Gate Exit" }
        ]
      }
    ],
    '2-Day Forest Stay': [
      {
        day: 1,
        schedule: [
          { time: "12:00 PM", place: "Arrival at Mustafabad Check Post and check-in to elevated tree house or Tharu bamboo hut", duration: "1.5 hrs", distance: "Waterfront Huts" },
          { time: "02:30 PM", place: "Afternoon nature trail along the Sharda canal feeder and tranquil beach relaxation", duration: "3 hrs", distance: "Chuka Beach" },
          { time: "06:00 PM", place: "Spectacular crimson sunset over Sharda Sagar reservoir followed by night stargazing by the water", duration: "2.5 hrs", distance: "Shoreline Deck" }
        ]
      },
      {
        day: 2,
        schedule: [
          { time: "06:30 AM", place: "Sunrise deep-forest jeep safari in core tiger territory of Pilibhit Tiger Reserve", duration: "3.5 hrs", distance: "Core Jungle" },
          { time: "10:30 AM", place: "Hearty breakfast of Bajra Roti, Saag, and churned Mattha at the forest canteen", duration: "1 hr", distance: "Complex" },
          { time: "12:00 PM", place: "Check-out, visit to Madhotanda local market and stop at Pilibhit Bansuri Chowk", duration: "2 hrs", distance: "Madhotanda & Pilibhit" }
        ]
      }
    ]
  },
  experiences: [
    { title: "Sharda Sagar Shoreline Walk & Boating", duration: "2 hrs", price: "₹250", category: "Waterfront", image: "/images/chuka_beach_hero_fullhd.jpg" },
    { title: "Mustafabad 4x4 Tiger Safari", duration: "3.5 hrs", price: "₹3,800/gypsy", category: "Wildlife", image: "/images/pilibhit_tiger.jpg" },
    { title: "Tharu Bamboo Treehouse Overnight Experience", duration: "Overnight", price: "₹3,500+", category: "Eco-Living", image: "/images/treehouse_hut.jpg" },
    { title: "Pilibhit Bamboo Flute (Bansuri) Heritage Walk", duration: "2 hrs", price: "Free", category: "ODOP Craft", image: "/images/bansuri_chowk.jpg" }
  ],
  aiPrompts: [
    "How do I book an official forest department tree house at Chuka Beach, and what is included in the tariff?",
    "What are the best months and photography tips for capturing migratory birds and wildlife at Sharda Sagar Dam?",
    "Can you outline a safe 2-day family itinerary combining Chuka Beach with Pilibhit's Bansuri Chowk?",
    "What wildlife species can I spot during a morning jeep safari in the Mustafabad range of Pilibhit Tiger Reserve?",
    "What should I pack for a winter stay in the eco-huts of Chuka Beach considering Terai cold and mist?"
  ],
  reviews: [
    { name: "Vikramaditya Rathore", location: "Bareilly", text: "Finding white sand beaches and gentle waves in the middle of a tiger reserve in UP feels surreal! Staying in the wooden treehouse with mist rolling over Sharda Sagar was an unforgettable experience.", rating: 5, image: "/images/chuka_beach_hero_fullhd.jpg", date: "February 2026" },
    { name: "Sunita Deshmukh", location: "New Delhi", text: "We spotted a magnificent tigress right on the Mustafabad safari track! The forest department's eco-huts are clean, well-managed, and the peace along the water is divine.", rating: 5, image: "/images/pilibhit_tiger.jpg", date: "January 2026" }
  ],
  sources: {
    official: ["Uttar Pradesh Ecotourism Development Board (upecotourism.in)", "Pilibhit Tiger Reserve Administration (pilibhittigerreserve.in)", "District Administration Pilibhit (pilibhit.nic.in)"],
    historical: ["Pilibhit Forest Division Working Plan & Field Survey (UP Forest Dept)", "National Tiger Conservation Authority (NTCA) — Pilibhit Evaluation Report"],
    lastVerified: "September 2026"
  }
}

// ─── Components ───────────────────────────────────────────────────────────────

const IconSun = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
const IconClock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconMapPin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
const IconStar = ({ filled = false }: { filled?: boolean }) => <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
const IconBookmark = ({ active = false }: { active?: boolean }) => <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
const IconArrowRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const IconChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
const IconMic = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
const IconSearch = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const IconMenu = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
const IconX = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
const IconPlane = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5 18 1 16 1 14.5 2.5L11 6 2.8 4.2 1.4 5.6l6.4 4.5L6 11.5l-1.5.5L3 11l-1.5 1.5 3 3 3 3L9 17l.5-1.5 1-1.5 4.5 6.4 1.4-1.4z"/></svg>
const IconTrain = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="13" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="M8 19l-2 3"/><path d="M18 22l-2-3"/><path d="M8 19h8"/></svg>
const IconCar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17" r="2.5"/><path d="M15 17H10"/><circle cx="17.5" cy="17" r="2.5"/></svg>
const IconShield = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IconPhone = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>

// ─── Reusable Place Card ──────────────────────────────────────────────────────

function PlaceCard({ place, saved, onSave }: { place: Attraction; saved: boolean; onSave: () => void }) {
  return (
    <div className="group flex flex-col border border-d360-border bg-white hover:border-d360-muted transition-colors duration-200" style={{ borderRadius: '2px' }}>
      <div className="relative overflow-hidden" style={{ height: '210px' }}>
        <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-3 left-3 text-xs font-mono font-medium tracking-widest text-white/90 bg-black/60 px-2.5 py-1">{place.category.toUpperCase()}</span>
        <button onClick={onSave} className={`absolute top-3 right-3 p-1.5 transition-colors ${saved ? 'text-d360-primary' : 'text-white/70 hover:text-white'}`}>
          <IconBookmark active={saved} />
        </button>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 px-2 py-1">
          <span className="text-amber-400 text-xs">★</span>
          <span className="font-mono text-xs font-medium text-white">{place.score}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-display text-base font-medium text-d360-ink leading-snug">{place.name}</h3>
        <p className="text-sm text-d360-muted leading-relaxed line-clamp-2">{place.description}</p>
        <div className="flex items-center gap-4 mt-auto pt-3 border-t border-d360-border">
          <span className="flex items-center gap-1.5 text-xs text-d360-muted"><IconClock />{place.duration}</span>
          <span className="flex items-center gap-1.5 text-xs text-d360-muted"><IconMapPin />{place.distance}</span>
        </div>
        <button className="mt-2 flex items-center gap-2 text-xs font-medium text-d360-primary hover:gap-3 transition-all">Explore <IconArrowRight /></button>
      </div>
    </div>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-d360-bg/95 backdrop-blur-sm border-b border-d360-border shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <span className={`font-display text-xl font-bold tracking-wider transition-colors ${scrolled ? 'text-d360-ink' : 'text-white'}`}>DARSHAN360</span>
            <div className="hidden md:flex items-center gap-7">
              {['Overview', 'Attractions', 'Tree Houses', 'Tiger Safari', 'Tharu Culture', 'Cuisine', 'Plan Trip'].map(item => (
                <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className={`text-sm font-medium transition-colors hover:text-d360-primary ${scrolled ? 'text-d360-ink' : 'text-white/90'}`}>{item}</a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <a href="#quick-facts" className={`text-sm font-medium transition-colors ${scrolled ? 'text-d360-muted hover:text-d360-ink' : 'text-white/80 hover:text-white'}`}>Quick Facts</a>
            <a href="#guidelines" className={`text-sm font-medium transition-colors ${scrolled ? 'text-d360-muted hover:text-d360-ink' : 'text-white/80 hover:text-white'}`}>Permits</a>
            <button onClick={() => window.open('https://upecotourism.in', '_blank')} className="px-4 py-2 bg-d360-primary text-white text-sm font-medium hover:bg-d360-primary/90 transition-colors shadow-sm" style={{ borderRadius: '2px' }}>Book Safari & Stay</button>
          </div>
          <div className="flex md:hidden items-center gap-4">
            <button className={scrolled ? 'text-d360-ink' : 'text-white'} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-d360-bg border-t border-d360-border px-6 py-4 flex flex-col gap-3">
          {['Overview', 'Attractions', 'Tree Houses', 'Tiger Safari', 'Tharu Culture', 'Cuisine', 'Plan Trip', 'Permits'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-d360-ink py-1 border-b border-d360-border last:border-0">{item}</a>
          ))}
          <button onClick={() => window.open('https://upecotourism.in', '_blank')} className="mt-2 py-2.5 bg-d360-primary text-white text-sm font-medium" style={{ borderRadius: '2px' }}>Book Safari & Stay</button>
        </div>
      )}
    </nav>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function Hero({ destination }: { destination: Destination }) {
  const [saved, setSaved] = useState(false)
  return (
    <section className="relative w-full bg-d360-dark" style={{ height: '88vh', minHeight: '580px' }}>
      <img src={destination.hero.image} alt={`${destination.name} — ${destination.state}`} className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 100%)' }} />
      
      {/* Breadcrumb */}
      <div className="absolute top-20 left-0 right-0 px-6 lg:px-12">
        <p className="text-white/70 text-xs tracking-widest font-mono">
          {destination.country.toUpperCase()} &nbsp;/&nbsp; {destination.state.toUpperCase()} &nbsp;/&nbsp; {destination.district.toUpperCase()} &nbsp;/&nbsp; <span className="text-amber-300 font-semibold">{destination.name.toUpperCase()}</span>
        </p>
      </div>

      {/* Floating Save and Status */}
      <div className="absolute top-20 right-6 lg:right-12 flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          ECO-TOURISM ZONE OPEN
        </span>
        <button onClick={() => setSaved(!saved)} className={`p-2 rounded bg-black/50 border border-white/20 backdrop-blur-sm transition-colors ${saved ? 'text-d360-primary' : 'text-white/80 hover:text-white'}`}>
          <IconBookmark active={saved} />
        </button>
      </div>

      {/* Hero Body */}
      <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-12">
        <div className="max-w-4xl flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {destination.tags.map(tag => (
              <span key={tag} className="text-[11px] font-mono font-medium tracking-widest text-white/90 bg-black/60 border border-white/10 px-2.5 py-1">
                {tag}
              </span>
            ))}
          </div>
          <div>
            <h1 className="font-display text-4xl sm:text-6xl font-light text-white tracking-tight leading-none">
              {destination.name}
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-amber-200/90 mt-1 font-normal">
              {destination.localName}
            </p>
          </div>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl font-light leading-relaxed">
            {destination.shortDescription}
          </p>

          {/* Key Metric Chips */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-white/90">
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15">📍 {destination.tehsil}</span>
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15">⏱ Best: {destination.quickFacts.bestTime}</span>
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15">🐅 Pilibhit Tiger Reserve (TX2 Global Award)</span>
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15">🌊 Sharda Sagar Dam Reservoir</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Quick Facts Ribbon ───────────────────────────────────────────────────────

function QuickFactsRibbon({ facts }: { facts: QuickFact }) {
  const items = [
    { label: 'BEST TIME', value: facts.bestTime, icon: <IconSun /> },
    { label: 'RECOMMENDED STAY', value: facts.duration, icon: <IconClock /> },
    { label: 'BUDGET TIER', value: facts.budget, icon: <span className="font-mono font-bold text-xs">₹</span> },
    { label: 'TYPE', value: facts.destinationType, icon: <IconMapPin /> },
    { label: 'DIFFICULTY', value: facts.difficulty, icon: <span className="text-xs">⚡</span> },
    { label: 'CONNECTIVITY', value: facts.distance, icon: <IconCar /> }
  ]
  return (
    <section id="quick-facts" className="bg-white border-b border-d360-border py-6 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {items.map(item => (
          <div key={item.label} className="flex flex-col gap-1 border-l-2 border-d360-primary/60 pl-3">
            <span className="text-[11px] font-mono tracking-widest text-d360-muted uppercase">{item.label}</span>
            <span className="font-display text-sm font-semibold text-d360-ink leading-tight">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Discovery Score Section ──────────────────────────────────────────────────

function DiscoveryScoreSection({ score }: { score: DiscoveryScore }) {
  return (
    <section className="bg-d360-bg border-b border-d360-border py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-d360-primary/10 border-2 border-d360-primary flex flex-col items-center justify-center">
            <span className="font-mono text-2xl font-bold text-d360-primary leading-none">{score.overall}</span>
            <span className="text-[10px] font-mono text-d360-muted tracking-wider">OUT OF 10</span>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-d360-ink">D360 Ecotourism Discovery Score</h2>
            <p className="text-sm text-d360-muted mt-0.5">Evaluated across ecological virginity, wildlife safety, and authentic local heritage.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full md:w-auto">
          {score.categories.map(cat => (
            <div key={cat.name} className="bg-white border border-d360-border p-3 flex flex-col gap-1" style={{ borderRadius: '2px' }}>
              <span className="text-[10px] font-mono tracking-wider text-d360-muted uppercase truncate">{cat.name}</span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-bold text-d360-ink">{cat.score}</span>
                <div className="w-12 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-d360-primary h-full" style={{ width: `${(cat.score / 10) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Editorial Story Section ──────────────────────────────────────────────────

function EditorialSection({ editorial }: { editorial: Destination['editorial'] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <section id="overview" className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-xs font-mono font-bold tracking-widest text-d360-primary uppercase">EDITORIAL PERSPECTIVE</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-d360-ink leading-tight">
            Where Tropical Beach Vibe Meets Deep-Jungle Tiger Country
          </h2>
          <blockquote className="border-l-2 border-d360-primary pl-4 text-base italic text-d360-ink/90 font-serif leading-relaxed">
            "{editorial.why}"
          </blockquote>
          <div className="mt-4 p-4 bg-amber-50/60 border border-amber-200/60 rounded flex flex-col gap-1">
            <span className="font-mono text-xs font-bold text-amber-900 tracking-wide uppercase">UNIQUE SELLING PROPOSITION (USP)</span>
            <p className="text-xs text-amber-800 leading-relaxed">
              Uttar Pradesh’s only forest beach experience. Offers the serene aesthetics of a white-sand beach vacation combined with high-probability big-cat wildlife tracking—entirely free of hawkers and commercial noise.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-col gap-4 text-d360-muted text-base leading-relaxed">
          <p>{editorial.story}</p>
          <p>{editorial.storyFull}</p>
          {expanded && (
            <div className="flex flex-col gap-3 pt-2 text-sm text-d360-muted/90 border-t border-d360-border">
              <p>
                <strong>Conservation Significance:</strong> Chuka Beach is within the Mustafabad range of Pilibhit Tiger Reserve, which shares a contiguous ecological corridor with Shuklaphanta National Park in Nepal and Kishanpur Wildlife Sanctuary. In 2020, the reserve was internationally honored with the TX2 award for doubling its wild tiger population in just over a decade.
              </p>
              <p>
                <strong>The Non-Coastal Shoreline:</strong> While ocean waves are salty and unpredictable, the waters of Sharda Sagar are crystal-clear Himalayan freshwater fed by the Sharda River and Banbasa barrage, creating soft white sandy banks that contrast sharply with dense dark-green Sal timber stands.
              </p>
            </div>
          )}
          <button onClick={() => setExpanded(!expanded)} className="self-start text-xs font-mono font-bold text-d360-primary hover:underline mt-2">
            {expanded ? 'SHOW LESS' : 'READ FULL ECOLOGICAL OVERVIEW →'}
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Key Highlights Showcase ──────────────────────────────────────────────────

function HighlightsGrid() {
  const highlights = [
    {
      title: "Elevated Tree Machans & Water Huts",
      subtitle: "Vernacular Tharu architecture built without concrete footprint",
      image: "/images/treehouse_hut.jpg",
      tag: "ECO LIVING"
    },
    {
      title: "Mustafabad 4x4 Tiger Safari",
      subtitle: "Dense Sal canopies and Terai grasslands tracking Royal Bengal tigers",
      image: "/images/pilibhit_tiger.jpg",
      tag: "WILDLIFE"
    },
    {
      title: "Sharda Sagar Dam Reservoir",
      subtitle: "22-km freshwater lake hosting flocks of Siberian migratory geese",
      image: "/images/sharda_sagar_dam.jpg",
      tag: "SCENIC EXPEDITION"
    },
    {
      title: "Pilibhit Bansuri GI-Craft",
      subtitle: "India's flute capital producing hand-turned musical bamboo instruments",
      image: "/images/bansuri_chowk.jpg",
      tag: "ODOP CRAFT"
    }
  ]
  return (
    <section className="bg-d360-dark text-white py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">THE CHUKA SIGNATURES</span>
          <h2 className="font-display text-3xl font-light text-white">Curated Pillars of the Experience</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map(h => (
            <div key={h.title} className="group relative overflow-hidden rounded bg-black/40 border border-white/10 hover:border-amber-400/50 transition-colors flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={h.image} alt={h.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4 flex flex-col gap-1 flex-1">
                <span className="text-[10px] font-mono tracking-wider text-amber-300 font-semibold">{h.tag}</span>
                <h3 className="font-display text-lg font-medium text-white group-hover:text-amber-200 transition-colors">{h.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed mt-1">{h.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Attractions & Exploration ────────────────────────────────────────────────

function AttractionsSection({ attractions, savedList, toggleSave }: { attractions: Attraction[]; savedList: string[]; toggleSave: (id: string) => void }) {
  const [filter, setFilter] = useState('all')
  const categories = ['all', 'Waterfront', 'Wildlife', 'Vernacular', 'Cultural']
  const filtered = filter === 'all' ? attractions : attractions.filter(a => a.category.toLowerCase().includes(filter.toLowerCase()))

  return (
    <section id="attractions" className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-d360-primary uppercase">PLACES TO EXPLORE</span>
          <h2 className="font-display text-3xl font-light text-d360-ink mt-1">Core Attractions & Enclaves</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${filter === cat ? 'bg-d360-primary text-white font-semibold' : 'bg-white border border-d360-border text-d360-muted hover:border-d360-muted'}`}
              style={{ borderRadius: '2px' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <PlaceCard key={item.id} place={item} saved={savedList.includes(item.id)} onSave={() => toggleSave(item.id)} />
        ))}
      </div>
    </section>
  )
}

// ─── Hidden Gems ──────────────────────────────────────────────────────────────

function HiddenGemsSection({ gems }: { gems: HiddenGem[] }) {
  return (
    <section className="bg-amber-50/40 border-y border-amber-200/50 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-800 uppercase">OFF THE BEATEN TRACK</span>
          <h2 className="font-display text-3xl font-light text-d360-ink">Terai Hidden Gems & Quiet Corners</h2>
          <p className="text-sm text-d360-muted max-w-xl">Exclusive outposts often missed by casual day-trippers that offer intimate encounters with nature and heritage.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gems.map(gem => (
            <div key={gem.name} className="bg-white border border-amber-200/70 p-5 rounded flex flex-col gap-3 shadow-xs">
              <div className="h-44 overflow-hidden rounded">
                <img src={gem.image} alt={gem.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-lg font-semibold text-d360-ink">{gem.name}</h3>
              <p className="text-xs text-d360-muted leading-relaxed flex-1">{gem.why}</p>
              <div className="flex items-center justify-between text-[11px] font-mono text-d360-primary pt-3 border-t border-amber-100">
                <span>📍 {gem.distance}</span>
                <span>⏱ {gem.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Wildlife & Safari Details ────────────────────────────────────────────────

function WildlifeSafariSection() {
  return (
    <section id="tiger-safari" className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 relative overflow-hidden rounded border border-d360-border shadow-sm">
          <img src="/images/pilibhit_tiger.jpg" alt="Tiger on the road at Pilibhit Tiger Reserve" className="w-full h-auto object-cover" />
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-mono px-3 py-1.5 backdrop-blur-sm">
            TIGER SAFARI TRACK — MUSTAFABAD RANGE
          </div>
        </div>
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="text-xs font-mono font-bold tracking-widest text-d360-primary uppercase">WILDLIFE & ECOLOGY</span>
          <h2 className="font-display text-3xl font-light text-d360-ink leading-tight">
            Mustafabad Jungle Safaris & Big Cat Corridors
          </h2>
          <p className="text-sm text-d360-muted leading-relaxed">
            Pilibhit Tiger Reserve spans over 730 sq km along the Terai Arc Landscape. The Mustafabad range surrounding Chuka Beach hosts an exceptional density of Royal Bengal Tigers (<em>Panthera tigris</em>), Indian leopards, sloth bears, swamp deer (Barasingha), and wild boars.
          </p>
          <div className="grid grid-cols-2 gap-4 my-2">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
              <span className="text-xs font-bold text-emerald-900 font-mono">MORNING SAFARI SHIFT</span>
              <p className="text-xs text-emerald-800 mt-1">06:30 AM – 10:00 AM<br />Best for tiger pugmark tracking & bird flight</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
              <span className="text-xs font-bold text-amber-900 font-mono">AFTERNOON SHIFT</span>
              <p className="text-xs text-amber-800 mt-1">02:30 PM – 05:30 PM<br />Best for waterhole stakeouts & golden sunset</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-xs text-d360-ink bg-gray-50 p-4 border border-d360-border rounded">
            <span className="font-semibold font-mono text-d360-primary">SAFARI BOOKING RULES & TARIFF:</span>
            <span>• Gypsy Tariff: ₹3,600 to ₹4,500 per vehicle (accommodates up to 6 visitors + guide + driver).</span>
            <span>• Compulsory Govt Guide fee & park entry permits included.</span>
            <span>• Advance booking mandatory on official UP Ecotourism portal (upecotourism.in). Carry original Govt ID proof.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Tree Houses & Tharu Accommodation ────────────────────────────────────────

function TreeHouseSection() {
  return (
    <section id="tree-houses" className="bg-stone-100 py-16 px-6 lg:px-12 border-y border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase">ECO-LIVING IN THE CANOPY</span>
            <h2 className="font-display text-3xl font-light text-d360-ink mt-1">Water Huts & Elevated Wooden Machans</h2>
          </div>
          <button onClick={() => window.open('https://upecotourism.in', '_blank')} className="px-5 py-2.5 bg-emerald-800 text-white text-xs font-mono font-bold tracking-wider hover:bg-emerald-900 transition-colors self-start md:self-auto rounded">
            BOOK HUT ON UP ECOTOURISM PORTAL →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-stone-700 leading-relaxed">
              Constructed following vernacular Tharu tribal architecture, the accommodation at Chuka Beach comprises elevated bamboo machans and thatched wooden cottages standing at the very edge of the Sharda Sagar Dam.
            </p>
            <div className="flex flex-col gap-3">
              <div className="p-4 bg-white border border-stone-200 rounded">
                <h4 className="font-display text-base font-semibold text-stone-900">Tree Machans (Waterfront Canopy Huts)</h4>
                <p className="text-xs text-stone-600 mt-1">Elevated on sturdy Sal poles overlooking the reservoir with wooden balconies. Excellent for sunrise misty lake panoramas.</p>
                <span className="inline-block mt-2 font-mono text-xs font-bold text-emerald-700">Tariff: ₹3,500 – ₹7,600 / night</span>
              </div>
              <div className="p-4 bg-white border border-stone-200 rounded">
                <h4 className="font-display text-base font-semibold text-stone-900">Tharu Bamboo Eco-Cottages</h4>
                <p className="text-xs text-stone-600 mt-1">Ground-level natural cottages crafted from woven bamboo reeds and earthen thatch, keeping interiors naturally cool in summer and warm in winter.</p>
                <span className="inline-block mt-2 font-mono text-xs font-bold text-emerald-700">Tariff: ₹2,400 – ₹4,500 / night</span>
              </div>
            </div>
            <div className="text-xs text-amber-900 bg-amber-100/70 p-3 rounded border border-amber-300/60 font-mono">
              ⚠️ Note: Forest department huts have limited availability (typically 4–6 units) and sell out weeks in advance during winter peak season (Dec–Jan).
            </div>
          </div>
          <div className="h-96 rounded overflow-hidden shadow-sm border border-stone-300">
            <img src="/images/treehouse_hut.jpg" alt="Treehouse and bamboo eco hut at Chuka" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── History & Timeline ───────────────────────────────────────────────────────

function HistorySection({ history }: { history: Destination['history'] }) {
  return (
    <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-10">
        <span className="text-xs font-mono font-bold tracking-widest text-d360-primary uppercase">CHRONICLES & CONSERVATION</span>
        <h2 className="font-display text-3xl font-light text-d360-ink">Historical Timeline & Evolution</h2>
        <p className="text-sm text-d360-muted max-w-xl">{history.shortIntro}</p>
      </div>
      <div className="relative border-l-2 border-d360-border pl-6 ml-4 flex flex-col gap-8">
        {history.timeline.map((item, idx) => (
          <div key={idx} className="relative flex flex-col gap-1">
            <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-d360-primary border-2 border-white ring-2 ring-d360-primary/30" />
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-d360-primary">{item.year}</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-d360-muted bg-gray-100 px-2 py-0.5 rounded">{item.era}</span>
            </div>
            <p className="text-sm text-d360-ink/90 leading-relaxed mt-0.5">{item.event}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Culture & Handicrafts ────────────────────────────────────────────────────

function CultureSection({ culture }: { culture: CultureCard[] }) {
  return (
    <section id="tharu-culture" className="bg-d360-bg border-y border-d360-border py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-d360-primary uppercase">TERAI HERITAGE</span>
          <h2 className="font-display text-3xl font-light text-d360-ink">Culture, Tribal Folkways & GI Crafts</h2>
          <p className="text-sm text-d360-muted max-w-2xl">From the mystical forest lore of the indigenous Tharu tribe to Pilibhit's world-renowned bansuri flutes.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {culture.map(card => (
            <div key={card.title} className="bg-white border border-d360-border rounded flex flex-col overflow-hidden group hover:border-d360-muted transition-colors">
              <div className="h-44 overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-display text-base font-semibold text-d360-ink">{card.title}</h3>
                <p className="text-xs text-d360-muted leading-relaxed flex-1">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Culinary Guide ───────────────────────────────────────────────────────────

function FoodSection({ food }: { food: FoodItem[] }) {
  return (
    <section id="cuisine" className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-10">
        <span className="text-xs font-mono font-bold tracking-widest text-d360-primary uppercase">TASTE OF PILIBHIT & TERAI</span>
        <h2 className="font-display text-3xl font-light text-d360-ink">Rustic Wood-Fired Delicacies</h2>
        <p className="text-sm text-d360-muted max-w-xl">Hearty rural North Indian recipes cooked with pure country desi ghee, fresh mustard greens, and wholesome millets.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {food.map(item => (
          <div key={item.name} className="flex border border-d360-border bg-white rounded overflow-hidden hover:border-d360-muted transition-colors">
            <div className="w-1/3 min-w-[110px] overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1 gap-1">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-d360-primary font-semibold">{item.category}</span>
                <h3 className="font-display text-sm font-semibold text-d360-ink leading-snug">{item.name}</h3>
                <p className="text-xs text-d360-muted leading-relaxed mt-1 line-clamp-2">{item.description}</p>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-700">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Itineraries & Planner ────────────────────────────────────────────────────

function ItinerarySection({ itineraries }: { itineraries: Destination['itineraries'] }) {
  const [activePlan, setActivePlan] = useState('1-Day Express')
  const plans = Object.keys(itineraries)

  return (
    <section id="plan-trip" className="bg-stone-50 py-16 px-6 lg:px-12 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-d360-primary uppercase">CURATED TRIP BLUEPRINTS</span>
            <h2 className="font-display text-3xl font-light text-d360-ink mt-1">Trip Schedules & Action Plans</h2>
          </div>
          <div className="flex gap-2">
            {plans.map(p => (
              <button
                key={p}
                onClick={() => setActivePlan(p)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors rounded ${activePlan === p ? 'bg-d360-ink text-white font-bold' : 'bg-white border border-stone-300 text-stone-600 hover:border-stone-500'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {itineraries[activePlan].map(day => (
            <div key={day.day} className="bg-white border border-stone-200 rounded p-6 shadow-xs">
              <h3 className="font-display text-lg font-bold text-d360-ink mb-4 pb-2 border-b border-stone-100 flex items-center justify-between">
                <span>DAY {day.day} TIMELINE</span>
                <span className="text-xs font-mono font-normal text-d360-muted">{activePlan}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {day.schedule.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-stone-50/70 border border-stone-200/60 rounded">
                    <span className="font-mono text-xs font-bold text-d360-primary whitespace-nowrap">{item.time}</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-d360-ink">{item.place}</span>
                      <span className="text-[11px] text-d360-muted">Duration: {item.duration} &nbsp;|&nbsp; Area: {item.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How to Reach & Logistics ─────────────────────────────────────────────────

function TravelSection({ travel }: { travel: Destination['travel'] }) {
  return (
    <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-10">
        <span className="text-xs font-mono font-bold tracking-widest text-d360-primary uppercase">CONNECTIVITY & TRANSIT</span>
        <h2 className="font-display text-3xl font-light text-d360-ink">How to Reach Chuka Beach</h2>
        <p className="text-sm text-d360-muted max-w-xl">Smooth multi-modal connectivity from Bareilly, Lucknow, and New Delhi.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-d360-border p-5 rounded flex flex-col gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
            <IconPlane />
          </div>
          <h3 className="font-display text-base font-semibold text-d360-ink">By Air</h3>
          <p className="text-xs text-d360-muted flex-1 leading-relaxed">
            <strong>Nearest:</strong> {travel.air.airport}<br />
            <strong>Distance:</strong> {travel.air.distance}<br />
            <strong>Travel Time:</strong> {travel.air.time}
          </p>
        </div>
        <div className="bg-white border border-d360-border p-5 rounded flex flex-col gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
            <IconTrain />
          </div>
          <h3 className="font-display text-base font-semibold text-d360-ink">By Train</h3>
          <p className="text-xs text-d360-muted flex-1 leading-relaxed">
            <strong>Stations:</strong> {travel.rail.station}<br />
            <strong>Distance:</strong> {travel.rail.distance}<br />
            <strong>Details:</strong> {travel.rail.time}
          </p>
        </div>
        <div className="bg-white border border-d360-border p-5 rounded flex flex-col gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <IconCar />
          </div>
          <h3 className="font-display text-base font-semibold text-d360-ink">By Road</h3>
          <p className="text-xs text-d360-muted flex-1 leading-relaxed">
            <strong>Highway:</strong> {travel.road.highway}<br />
            <strong>Approach:</strong> {travel.road.distance}<br />
            <strong>Route Note:</strong> {travel.road.time}
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Visiting Guidelines & Safety Rules ───────────────────────────────────────

function GuidelinesSection() {
  return (
    <section id="guidelines" className="bg-amber-50/60 border-y border-amber-200/80 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-900 uppercase">OFFICIAL FOREST ADVISORY</span>
          <h2 className="font-display text-3xl font-light text-d360-ink">Visiting Guidelines, Permits & Safety</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-800">
          <div className="p-5 bg-white border border-amber-200 rounded flex flex-col gap-2">
            <h4 className="font-mono text-sm font-bold text-emerald-800 uppercase flex items-center gap-1.5">
              <span>✅</span> DO'S (BEST PRACTICES)
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 leading-relaxed">
              <li>Book your entry permit and vehicle pass in advance through the official UP Ecotourism portal.</li>
              <li>Carry original government ID (Aadhaar, Passport, or Voter ID) matching permit details.</li>
              <li>Wear muted, earth-toned clothes (khaki, olive, brown) to avoid alarming wild animals.</li>
              <li>Maintain strict silence and follow all directions given by official forest naturalists and drivers.</li>
              <li>Carry sufficient physical cash as digital UPI gateways frequently drop inside forest zones.</li>
            </ul>
          </div>
          <div className="p-5 bg-white border border-amber-200 rounded flex flex-col gap-2">
            <h4 className="font-mono text-sm font-bold text-rose-800 uppercase flex items-center gap-1.5">
              <span>❌</span> DON'TS (STRICTLY PROHIBITED)
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 leading-relaxed">
              <li>No plastic bags, bottles, or littering inside the tiger reserve boundaries.</li>
              <li>No loud music, car stereos, shouting, or flash photography during safari excursions.</li>
              <li>No consumption of alcohol or smoking inside the forest reserve premises.</li>
              <li>Do NOT step into deep waters of the Sharda Sagar Dam due to unseen currents and crocodiles.</li>
              <li>Do NOT step out of the safari vehicle under any circumstance inside the tiger tracking zone.</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-white border border-amber-300 rounded flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-900 rounded"><IconPhone /></div>
            <div>
              <span className="font-mono text-xs font-bold text-stone-900">PILIBHIT TIGER RESERVE CONTROL ROOM / HELPLINE:</span>
              <p className="text-xs text-stone-600">+91-8920707042 / +91-8700245593 (Mustafabad Range Office)</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-amber-900 bg-amber-100/80 px-3 py-1.5 rounded">Police: Madhotanda & Puranpur Police Station</span>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const faqs = [
    {
      q: "Is Chuka Beach a natural ocean beach?",
      a: "No, Chuka Beach is an inland freshwater forest beach situated on the white sand banks of the 22-km Sharda Sagar Dam reservoir inside Pilibhit Tiger Reserve. It has soft sands and gentle waves, offering a coastal vibe in the midst of deep Terai jungles."
    },
    {
      q: "How can I book an official tree house or Tharu hut at Chuka Beach?",
      a: "All forest accommodation is managed exclusively by the Uttar Pradesh Forest Department and must be booked online through the official UP Ecotourism portal (upecotourism.in). Tree houses and bamboo huts range from ₹2,400 to ₹7,600 per night."
    },
    {
      q: "What is the best time to visit Chuka Beach?",
      a: "The ideal months are November to March when temperatures are pleasant (10°C to 24°C) and tens of thousands of migratory birds arrive from Central Asia and Siberia. The tiger reserve officially closes for tourism during the monsoon season (mid-June to October)."
    },
    {
      q: "Can we swim in the water at Chuka Beach?",
      a: "Swimming is strictly prohibited due to deep drop-offs, underwater currents, and the presence of freshwater wildlife such as marsh mugger crocodiles. Visitors can enjoy paddle boating and boat safaris under supervised forest safety measures."
    },
    {
      q: "What are the timings and entry fees for Chuka Beach?",
      a: "Day visitors can enter from 07:00 AM to 05:00 PM with an entry ticket of ₹100 per person. Safari gypsies cost ₹3,600 to ₹4,500 per vehicle (inclusive of mandatory guide and driver)."
    }
  ]
  return (
    <section className="py-16 px-6 lg:px-12 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2 mb-8 text-center">
        <span className="text-xs font-mono font-bold tracking-widest text-d360-primary uppercase">FREQUENTLY ASKED QUESTIONS</span>
        <h2 className="font-display text-3xl font-light text-d360-ink">Everything You Need to Know</h2>
      </div>
      <div className="flex flex-col gap-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-d360-border bg-white rounded overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
            >
              <span className="font-display text-base font-semibold text-d360-ink">{faq.q}</span>
              <span className={`transform transition-transform ${openIdx === idx ? 'rotate-180' : ''}`}><IconChevronDown /></span>
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-4 text-xs text-d360-muted leading-relaxed border-t border-d360-border/50 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Reviews & Testimonials ───────────────────────────────────────────────────

function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section className="bg-stone-100 py-16 px-6 lg:px-12 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-xs font-mono font-bold tracking-widest text-d360-primary uppercase">VISITOR REFLECTIONS</span>
          <h2 className="font-display text-3xl font-light text-d360-ink">Verified Traveler Testimonials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-white border border-stone-200 p-6 rounded flex flex-col justify-between gap-4 shadow-xs">
              <p className="text-sm italic text-stone-700 leading-relaxed font-serif">"{rev.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                <img src={rev.image} alt={rev.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-d360-ink">{rev.name}</span>
                  <span className="text-[11px] text-d360-muted">{rev.location} &nbsp;•&nbsp; {rev.date}</span>
                </div>
                <div className="ml-auto flex text-amber-500 text-xs">
                  {'★'.repeat(rev.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── AI Prompts Section ───────────────────────────────────────────────────────

function AIPromptsSection({ prompts }: { prompts: string[] }) {
  const [copied, setCopied] = useState<number | null>(null)
  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text)
    setCopied(idx)
    setTimeout(() => setCopied(null), 2000)
  }
  return (
    <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-950 to-stone-900 text-white rounded-lg p-8 shadow-sm">
        <div className="flex flex-col gap-2 mb-6">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">AI TRAVEL COPILOT SEEDS</span>
          <h2 className="font-display text-2xl font-light text-white">Ask Darshan360 AI About Chuka Beach</h2>
          <p className="text-xs text-white/70 max-w-xl">Click to copy any prompt seed into your AI assistant for instant customized trip suggestions.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prompts.map((p, idx) => (
            <div
              key={idx}
              onClick={() => handleCopy(p, idx)}
              className="cursor-pointer bg-white/10 hover:bg-white/15 border border-white/10 p-3 rounded flex items-center justify-between gap-3 text-xs text-white/90 transition-colors"
            >
              <span>{p}</span>
              <span className="text-[10px] font-mono text-emerald-300 whitespace-nowrap bg-emerald-900/60 px-2 py-1 rounded">
                {copied === idx ? 'COPIED!' : 'CLICK TO COPY'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ sources }: { sources: Destination['sources'] }) {
  return (
    <footer className="bg-d360-dark text-white/80 border-t border-white/10 py-12 px-6 lg:px-12 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="flex flex-col gap-2">
          <span className="font-display text-xl font-bold tracking-wider text-white">DARSHAN360</span>
          <p className="text-white/60 text-[11px] leading-relaxed">
            Preserving, exploring, and honoring the hidden ecotourism and cultural wonders of Uttar Pradesh.
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">OFFICIAL SOURCES</span>
          {sources.official.map((s, idx) => (
            <span key={idx} className="text-white/60">{s}</span>
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">RESEARCH REPOSITORIES</span>
          {sources.historical.map((h, idx) => (
            <span key={idx} className="text-white/60">{h}</span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">VERIFICATION</span>
          <span className="text-emerald-400 font-mono">Last Verified: {sources.lastVerified}</span>
          <p className="text-white/50 text-[11px] mt-1">Data curated directly from UP Forest Dept, Pilibhit Tiger Reserve Administration, and District Gazetteers.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-3">
        <span>© 2026 Navpravartak / Darshan360 • Ecotourism Division</span>
        <span>Curated with authentic field data for Pilibhit Tiger Reserve</span>
      </div>
    </footer>
  )
}

// ─── Main App Component ───────────────────────────────────────────────────────

export default function App() {
  const [savedList, setSavedList] = useState<string[]>([])
  const toggleSave = (id: string) => {
    setSavedList(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="min-h-screen bg-white text-d360-ink flex flex-col font-sans selection:bg-d360-primary selection:text-white">
      <Nav />
      <main className="flex-1">
        <Hero destination={chukaBeach} />
        <QuickFactsRibbon facts={chukaBeach.quickFacts} />
        <DiscoveryScoreSection score={chukaBeach.discoveryScore} />
        <EditorialSection editorial={chukaBeach.editorial} />
        <HighlightsGrid />
        <AttractionsSection attractions={chukaBeach.attractions} savedList={savedList} toggleSave={toggleSave} />
        <TreeHouseSection />
        <WildlifeSafariSection />
        <HiddenGemsSection gems={chukaBeach.hiddenGems} />
        <HistorySection history={chukaBeach.history} />
        <CultureSection culture={chukaBeach.culture} />
        <FoodSection food={chukaBeach.food} />
        <ItinerarySection itineraries={chukaBeach.itineraries} />
        <TravelSection travel={chukaBeach.travel} />
        <GuidelinesSection />
        <FAQSection />
        <ReviewsSection reviews={chukaBeach.reviews} />
        <AIPromptsSection prompts={chukaBeach.aiPrompts} />
      </main>
      <Footer sources={chukaBeach.sources} />
    </div>
  )
}
