import { useState, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuickFact { bestTime: string; duration: string; budget: string; destinationType: string; difficulty: string; distance: string }
interface ScoreCategory { name: string; score: number }
interface DiscoveryScore { overall: number; categories: ScoreCategory[] }
interface TimelineEntry { year: string; event: string; era: string }
interface CultureCard { title: string; description: string; image: string }
interface FoodItem { name: string; description: string; category: string; price: string; image: string }
interface Attraction { id: string; name: string; category: string; description: string; duration: string; distance: string; score: number; image: string }
interface HiddenGem { name: string; why: string; distance: string; duration: string; image: string }
interface Activity { activity: string; duration: string; cost: string; difficulty: string; bestTime: string; image: string }
interface NearbyPlace { name: string; distance: string; type: string; travelTime: string; image: string }
interface TransportOption { airport?: string; station?: string; highway?: string; distance: string; time: string }
interface StayCategory { type: string; range: string; options: string[] }
interface MonthStatus { month: string; status: 'ideal' | 'good' | 'avoid' }
interface BudgetBreakdown { category: string; amount: string }
interface BudgetTier { tier: string; perDay: string; breakdown: BudgetBreakdown[] }
interface ScheduleItem { time: string; place: string; duration: string; distance?: string }
interface DayPlan { day: number; schedule: ScheduleItem[] }
interface Experience { title: string; duration: string; price: string; category: string; image: string }
interface Review { name: string; location: string; text: string; rating: number; image: string; date: string }
interface Sources { official: string[]; historical: string[]; lastVerified: string }

interface Destination {
  id: string; slug: string; name: string; localName: string; destinationType: string
  country: string; state: string; district: string; shortDescription: string; tags: string[]
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

// ─── Deogarh Destination Data ─────────────────────────────────────────────────

const deogarhData: Destination = {
  id: 'deogarh-lalitpur',
  slug: 'deogarh-lalitpur-uttar-pradesh',
  name: 'Deogarh',
  localName: 'देवगढ़, ललितपुर',
  destinationType: 'Archaeological / Heritage Site',
  country: 'India',
  state: 'Uttar Pradesh',
  district: 'Lalitpur',
  shortDescription: 'A remarkable hill-fort landscape where Gupta-era temple architecture and a later Jain sacred complex survive together amid the rocky Bundelkhand countryside[cite: 13].',
  tags: ['GUPTA ARCHITECTURE', 'JAIN HERITAGE', 'HILL-FORT'],
  hero: {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80'
  },
  quickFacts: {
    bestTime: 'Oct – Mar',
    duration: '4–6 Hours / 1 Day',
    budget: '₹₹',
    destinationType: 'Archaeological / Fort',
    difficulty: 'Moderate',
    distance: '~33 km from Lalitpur'
  },
  discoveryScore: {
    overall: 8.6,
    categories: [
      { name: 'Uniqueness / Authenticity', score: 9.0 },
      { name: 'Historical Weight', score: 9.0 },
      { name: 'Cultural Significance', score: 9.0 },
      { name: 'Crowd Level', score: 2.0 },
      { name: 'Popularity Index', score: 3.0 }
    ]
  },
  editorial: {
    why: 'An extraordinary concentration of early medieval Indian art and architecture in a low-density heritage setting[cite: 13]. It blends landmark Gupta-period Hindu temples with a expansive medieval Jain temple fort cluster above the scenic Betwa valley[cite: 13].',
    story: 'Deogarh is one of the most important archaeological landscapes in Lalitpur district[cite: 13]. Its centerpiece, the 5th-century Dashavatara Temple, stands as one of the earliest surviving structural stone temples in North India[cite: 13].',
    storyFull: 'Positioned on a rocky bluff overlooking the Betwa River[cite: 13], Deogarh presents layers of Indian sacred art spanning centuries[cite: 13]. While the Dashavatara Temple showcases the pinnacle of Gupta classical sculpture and the origins of Nagara temple design[cite: 13], the nearby Deogarh Fort houses a complex of 31 Jain temples dating from the 8th to 17th centuries, adorned with hundreds of exquisite relief panels and ancient epigraphs[cite: 13].'
  },
  history: {
    shortIntro: 'A continuous sacred landscape evolving from the golden age of Gupta temple building into a vibrant medieval Jain religious complex[cite: 13].',
    timeline: [
      { year: 'c. 5th Century CE', event: 'Construction of the monumental Dashavatara Temple during the Gupta Empire, establishing fundamental Nagara architectural conventions[cite: 13].', era: 'Gupta Dynasty' },
      { year: '8th–9th Century CE', event: 'Beginnings of the major Jain temple complex within Deogarh Fort under Pratihara patronage[cite: 13].', era: 'Early Medieval Era' },
      { year: '11th–16th Century CE', event: 'Expansion of fort ramparts, additions of Jain shrines, votive pillars (Manastambhas), and extensive iconographic carving.', era: 'Chandela / Medieval Era' },
      { year: '19th–20th Century CE', event: 'Rediscovery, archaeological mapping, and preservation initiatives by the Archaeological Survey of India (ASI)[cite: 13].', era: 'Modern Archaeology' }
    ]
  },
  culture: [
    {
      title: 'Bundelkhand Heritage & Stone Craft',
      description: 'The local culture reflects the resilient traditions of the Bundelkhand countryside, renowned for ancient stone masonry, sculpting heritage, and rural pilgrimages[cite: 13].',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Dual Sacred Traditions',
      description: 'Deogarh preserves a harmonious coexistence of early Hindu Vaisnava iconology and Jain Tirthankara iconography across its shared riverine bluffs[cite: 13].',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  food: [
    {
      name: 'Bundeli Dal Bafla (बुंदेली दाल बाफला)',
      description: 'Traditional wheat dumplings boiled and baked in ghee, served with spicy mixed lentils and mint chutney.',
      category: 'Main Course',
      price: '₹120–₹220',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Desi Saag & Bajra Roti (साग और बाजरा रोटी)',
      description: 'Wholesome seasonal greens cooked in mustard oil, paired with unleavened millet flatbreads[cite: 13].',
      category: 'Main Course',
      price: '₹90–₹160',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Lalitpur Kadhi Chawal (ललितपुर कढ़ी चावल)',
      description: 'Tangy chickpea flour curry tempered with mustard seeds and curry leaves, served over hot steamed rice.',
      category: 'Main Course',
      price: '₹70–₹130',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Fresh Kulhad Chai & Snacks (कुल्हड़ चाय)',
      description: 'Hot spiced milk tea in clay cups served with savory mathri or pakoras along the travel routes[cite: 13].',
      category: 'Beverage & Snack',
      price: '₹20–₹50',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  attractions: [
    {
      id: 'dashavatara-temple',
      name: 'Dashavatara Temple',
      category: 'Monument / Gupta Heritage',
      description: 'A masterpiece 5th-century Gupta temple famed for its early structural Nagara spire and carved Vishnu relief panels[cite: 13].',
      duration: '60–90 min',
      distance: 'Within Deogarh complex',
      score: 9.5,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'jain-temple-complex',
      name: 'Jain Temple Complex (Deogarh Fort)',
      category: 'Religious / Heritage',
      description: 'A walled sanctuary of over 30 medieval Jain temples containing thousands of carved Tirthankara figures and ancient votive slabs[cite: 13].',
      duration: '90–120 min',
      distance: 'Inside Deogarh Fort',
      score: 9.2,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'deogarh-fort-ramparts',
      name: 'Deogarh Fort Ramparts & Gateways',
      category: 'Main Landmark / Fort',
      description: 'Ancient hill fort walls and carved gateways offering wide panoramic vistas of the surrounding countryside[cite: 13].',
      duration: '60–90 min',
      distance: 'Deogarh Hill',
      score: 8.8,
      image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'sculptural-epigraphic-remains',
      name: 'Sculptural & Epigraphic Remains',
      category: 'Cultural Heritage',
      description: 'Open-air archaeological displays, inscriptions, and carved architectural fragments illustrating centuries of artistry[cite: 13].',
      duration: '45–60 min',
      distance: 'Fort museum / outer yards',
      score: 8.5,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  hiddenGems: [
    {
      name: 'Betwa River Overlook Bluffs',
      why: 'Rocky elevated outcrops behind the fort offering tranquil sunset views across the winding Betwa River gorge[cite: 13].',
      distance: '0.5 km from Fort Gate',
      duration: '30–60 min',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  thingsToDo: [
    { activity: 'Architecture & Relief Photography', duration: '2–3 hrs', cost: 'Free / Entry fee', difficulty: 'Easy', bestTime: 'Morning Light', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80' },
    { activity: 'Deogarh Fort Exploration Walk', duration: '2 hrs', cost: 'Free', difficulty: 'Moderate', bestTime: 'Late Afternoon', image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1000&q=80' },
    { activity: 'Study of Jain Inscriptions & Panels', duration: '1.5 hrs', cost: 'Free', difficulty: 'Easy', bestTime: 'Mid-Day', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80' }
  ],
  nearbyPlaces: [
    { name: 'Lalitpur Town', distance: '33 km', type: 'Historical District Center', travelTime: '45 mins', image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Chanderi Heritage Town', distance: '40 km', type: 'Fort & Handloom Weaving Hub', travelTime: '1 hr', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Matatila Dam', distance: '55 km', type: 'Reservoir & Scenic Lake', travelTime: '1.2 hrs', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80' }
  ],
  travel: {
    air: { airport: 'Gwalior (GWL) / Bhopal (BHO) / Jhansi Airport', distance: '~200 km (GWL) / ~220 km (BHO)', time: '4–5 hrs by road[cite: 13]' },
    rail: { station: 'Lalitpur Junction (LAR)', distance: '33 km from Deogarh', time: 'Direct taxi/auto from station (~45 mins)[cite: 13]' },
    road: { highway: 'NH-44 via Lalitpur to Deogarh State Highway', distance: '33 km from Lalitpur city', time: '45–60 mins by car/cab[cite: 13]' }
  },
  stay: {
    categories: [
      { type: 'Town Hotels in Lalitpur', range: '₹1,200–₹3,000/night', options: ['Hotel Bundelkhand Pride (Lalitpur)', 'Hotel Vijay Palace', 'Local Commercial Lodges[cite: 13]'] },
      { type: 'Heritage & Budget Guesthouses', range: '₹800–₹1,800/night', options: ['UP Tourism Rahi Yatri Niwas (Lalitpur)', 'Local Travel Lodges[cite: 13]'] }
    ]
  },
  bestTime: {
    months: [
      { month: 'Jan', status: 'ideal' }, { month: 'Feb', status: 'ideal' }, { month: 'Mar', status: 'good' },
      { month: 'Apr', status: 'avoid' }, { month: 'May', status: 'avoid' }, { month: 'Jun', status: 'avoid' },
      { month: 'Jul', status: 'avoid' }, { month: 'Aug', status: 'good' }, { month: 'Sep', status: 'good' },
      { month: 'Oct', status: 'ideal' }, { month: 'Nov', status: 'ideal' }, { month: 'Dec', status: 'ideal' }
    ]
  },
  budget: {
    tiers: [
      { tier: 'Budget Explorer', perDay: '₹1,000–₹1,800', breakdown: [{ category: 'Stay (Lalitpur)', amount: '₹600–₹1,000' }, { category: 'Food', amount: '₹250–₹400' }, { category: 'Local Transport', amount: '₹150–₹400' }] },
      { tier: 'Comfort / Mid-Range', perDay: '₹2,500–₹4,500', breakdown: [{ category: 'Hotel Stay', amount: '₹1,500–₹2,500' }, { category: 'Food', amount: '₹500–₹800' }, { category: 'Private Cab & Guide', amount: '₹500–₹1,200' }] }
    ]
  },
  itineraries: {
    '1 Day Express': [
      { day: 1, schedule: [{ time: '08:00 AM', place: 'Morning departure from Lalitpur to Deogarh', duration: '45 mins' }, { time: '09:00 AM', place: 'Dashavatara Temple Architecture & Reliefs Study', duration: '1.5 hrs' }, { time: '10:45 AM', place: 'Deogarh Fort Ramparts & Viewpoints Exploration', duration: '1.5 hrs' }, { time: '12:30 PM', place: 'Jain Temple Complex & Inscription Yards', duration: '2 hrs' }, { time: '02:30 PM', place: 'Rural Bundeli Lunch en route to Lalitpur', duration: '1 hr' }] }
    ],
    '2 Days Comprehensive': [
      { day: 1, schedule: [{ time: '09:00 AM', place: 'Arrival in Lalitpur & District Heritage Sites', duration: '3 hrs' }, { time: '02:00 PM', place: 'Excursion to Matatila Dam & Betwa Riverside', duration: '3 hrs' }] },
      { day: 2, schedule: [{ time: '08:00 AM', place: 'Early Arrival at Deogarh Fort for Photographers Light', duration: '2 hrs' }, { time: '10:30 AM', place: 'In-Depth Study of Jain Temples & Sculptural Panels', duration: '2.5 hrs' }, { time: '01:30 PM', place: 'Dashavatara Temple & ASI Archaeological Grounds', duration: '2 hrs' }] }
    ]
  },
  experiences: [
    { title: 'Gupta Art Architecture Photography Tour', duration: '2 hrs', price: 'Free / Self-guided', category: 'Heritage Trail', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80' },
    { title: 'Betwa Valley Fort Viewpoint Sunset Walk', duration: '1.5 hrs', price: 'Free', category: 'Scenic Walk', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80' }
  ],
  aiPrompts: [
    "Why is the Dashavatara Temple at Deogarh significant in Indian architectural history?[cite: 13]",
    "What is the historical relation between Gupta monuments and Jain temples in Deogarh?[cite: 13]",
    "Plan a 5-hour photography and heritage itinerary for Deogarh Fort[cite: 13].",
    "How do I reach Deogarh from Lalitpur railway station?[cite: 13]"
  ],
  reviews: [
    { name: 'Dr. Rajesh Vardhan', location: 'Bhopal', text: 'An amazing hidden archaeological jewel. Standing in front of the 5th-century Vishnu reliefs at Dashavatara Temple without crowds is a spiritual and artistic experience like no other.', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80', date: 'January 2026' }
  ],
  sources: {
    official: ['Archaeological Survey of India (ASI) Northern Circle Records[cite: 13]', 'Lalitpur District Administration Portal (lalitpur.nic.in)[cite: 13]'],
    historical: ['Research Architecture & Epigraphic Surveys on Deogarh Fort Monuments[cite: 13]'],
    lastVerified: 'September 2026'
  }
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconSun = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
const IconClock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconMapPin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
const IconStar = ({ filled = false }: { filled?: boolean }) => <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
const IconBookmark = ({ active = false }: { active?: boolean }) => <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
const IconArrowRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const IconSearch = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const IconMenu = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
const IconX = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
const IconPlane = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5 18 1 16 1 14.5 2.5L11 6 2.8 4.2 1.4 5.6l6.4 4.5L6 11.5l-1.5.5L3 11l-1.5 1.5 3 3 3 3L9 17l.5-1.5 1-1.5 4.5 6.4 1.4-1.4z"/></svg>
const IconTrain = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="13" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="M8 19l-2 3"/><path d="M18 22l-2-3"/><path d="M8 19h8"/></svg>
const IconCar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17" r="2.5"/><path d="M15 17H10"/><circle cx="17.5" cy="17" r="2.5"/></svg>
const IconVolume = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
const IconPlay = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
const IconPause = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>

// ─── Place Card Component ─────────────────────────────────────────────────────

function PlaceCard({ place, saved, onSave }: { place: Attraction; saved: boolean; onSave: () => void }) {
  return (
    <div className="group flex flex-col border border-d360-border bg-white hover:border-d360-muted transition-colors duration-200" style={{ borderRadius: '2px' }}>
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-3 left-3 text-xs font-mono font-medium tracking-widest text-white/90 bg-black/50 px-2 py-1">{place.category.toUpperCase()}</span>
        <button onClick={onSave} className={`absolute top-3 right-3 p-1.5 transition-colors ${saved ? 'text-d360-primary' : 'text-white/70 hover:text-white'}`}>
          <IconBookmark active={saved} />
        </button>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-1">
          <span className="font-mono text-xs font-medium text-white">{place.score}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-display text-base font-medium text-d360-ink leading-snug">{place.name}</h3>
        <p className="text-sm text-d360-muted leading-relaxed line-clamp-2">{place.description}</p>
        <div className="flex items-center gap-4 mt-auto pt-2 border-t border-d360-border">
          <span className="flex items-center gap-1 text-xs text-d360-muted"><IconClock />{place.duration}</span>
          <span className="flex items-center gap-1 text-xs text-d360-muted"><IconMapPin />{place.distance}</span>
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-d360-bg/95 backdrop-blur-sm border-b border-d360-border' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <span className={`font-display text-xl font-medium tracking-wide transition-colors ${scrolled ? 'text-d360-ink' : 'text-white'}`}>D360</span>
            <div className="hidden md:flex items-center gap-7">
              {['Explore', 'Destinations', 'Hidden Gems', 'Plan a Trip', 'Experiences'].map(item => (
                <a key={item} href="#" className={`text-sm font-medium transition-colors hover:text-d360-primary ${scrolled ? 'text-d360-ink' : 'text-white/90'}`}>{item}</a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <button className={`transition-colors ${scrolled ? 'text-d360-muted hover:text-d360-ink' : 'text-white/80 hover:text-white'}`}><IconSearch /></button>
            <a href="#" className={`text-sm font-medium transition-colors ${scrolled ? 'text-d360-muted hover:text-d360-ink' : 'text-white/80 hover:text-white'}`}>Saved</a>
            <button className="px-4 py-2 bg-d360-primary text-white text-sm font-medium hover:bg-d360-primary/90 transition-colors" style={{ borderRadius: '2px' }}>Explore Places</button>
          </div>
          <div className="flex md:hidden items-center gap-4">
            <button className={scrolled ? 'text-d360-ink' : 'text-white'}><IconSearch /></button>
            <button className={scrolled ? 'text-d360-ink' : 'text-white'} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-d360-bg border-t border-d360-border px-6 py-4 flex flex-col gap-4">
          {['Explore', 'Destinations', 'Hidden Gems', 'Plan a Trip', 'Experiences', 'Saved'].map(item => (
            <a key={item} href="#" className="text-sm font-medium text-d360-ink py-1 border-b border-d360-border last:border-0">{item}</a>
          ))}
          <button className="mt-2 py-3 bg-d360-primary text-white text-sm font-medium" style={{ borderRadius: '2px' }}>Explore Places</button>
        </div>
      )}
    </nav>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function Hero({ destination }: { destination: Destination }) {
  const [saved, setSaved] = useState(false)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  return (
    <section className="relative w-full bg-d360-dark" style={{ height: '85vh', minHeight: '560px' }}>
      <img src={destination.hero.image} alt={`${destination.name} — ${destination.state}`} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.8) 100%)' }} />
      <div className="absolute top-20 left-0 right-0 px-6 lg:px-12">
        <p className="text-white/60 text-xs tracking-widest font-medium">
          {destination.country.toUpperCase()} &nbsp;/&nbsp; {destination.state.toUpperCase()} &nbsp;/&nbsp; {destination.district.toUpperCase()}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-12 lg:pb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            {destination.tags.map(tag => (
              <span key={tag} className="text-xs font-mono tracking-widest text-white/80 border border-white/30 px-3 py-1">{tag}</span>
            ))}
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-none tracking-tight mb-2">{destination.name}</h1>
          <p className="text-white/70 text-sm md:text-base font-medium mb-4 tracking-wide">{destination.district}, {destination.state} &nbsp;·&nbsp; <span className="font-mono text-white/50">{destination.localName}</span></p>
          <p className="text-white/85 text-base md:text-lg font-light max-w-xl leading-relaxed mb-8">{destination.shortDescription}</p>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-d360-primary text-white text-sm font-medium hover:bg-d360-primary/90 transition-colors" style={{ borderRadius: '2px' }}>Explore {destination.name} <IconArrowRight /></button>
            <button onClick={() => setSaved(!saved)} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border transition-colors ${saved ? 'bg-white text-d360-primary border-white' : 'bg-transparent text-white border-white/50 hover:border-white'}`} style={{ borderRadius: '2px' }}>
              <IconBookmark active={saved} /> {saved ? 'Saved' : 'Save Place'}
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 right-6 lg:right-12 flex items-center gap-3">
          <button onClick={() => setMuted(!muted)} className="p-2.5 bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-colors border border-white/10" style={{ borderRadius: '2px' }}><IconVolume /></button>
          <button onClick={() => setPlaying(!playing)} className="p-2.5 bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-colors border border-white/10" style={{ borderRadius: '2px' }}>{playing ? <IconPause /> : <IconPlay />}</button>
        </div>
      </div>
    </section>
  )
}

// ─── Quick Facts Strip ────────────────────────────────────────────────────────

function QuickFacts({ facts }: { facts: QuickFact }) {
  const items = [
    { label: 'BEST MONTHS', value: facts.bestTime, icon: <IconSun /> },
    { label: 'RECOMMENDED DURATION', value: facts.duration, icon: <IconClock /> },
    { label: 'BUDGET TIER', value: facts.budget, icon: null },
    { label: 'DESTINATION TYPE', value: facts.destinationType, icon: null },
    { label: 'DIFFICULTY', value: facts.difficulty, icon: null },
    { label: 'DISTANCE FROM LALITPUR', value: facts.distance, icon: <IconMapPin /> }
  ]
  return (
    <section className="bg-d360-ink border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-white/10">
          {items.map((item) => (
            <div key={item.label} className="px-5 py-5 lg:py-6">
              <p className="text-white/40 text-[10px] font-mono tracking-widest mb-1.5">{item.label}</p>
              <div className="flex items-center gap-1.5 text-white/90">
                {item.icon && <span className="text-d360-primary/80">{item.icon}</span>}
                <span className="font-medium text-sm">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Why Visit + Discovery Score ──────────────────────────────────────────────

function WhyVisit({ destination }: { destination: Destination }) {
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">WHY VISIT</p>
            <h2 className="font-display text-3xl md:text-4xl text-d360-ink mb-6 leading-tight">Why {destination.name}?</h2>
            <p className="text-d360-muted text-lg leading-relaxed">{destination.editorial.why}</p>
          </div>
          <div className="border border-d360-border p-8" style={{ borderRadius: '2px' }}>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-d360-muted text-xs font-mono tracking-widest mb-1">D360 DISCOVERY SCORE</p>
                <div className="flex items-end gap-2">
                  <span className="font-display text-5xl font-medium text-d360-ink">{destination.discoveryScore.overall}</span>
                  <span className="text-d360-muted text-lg mb-1.5">/ 10</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-d360-muted font-mono">HERITAGE RATING</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {destination.discoveryScore.categories.map(cat => (
                <div key={cat.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-d360-ink font-medium">{cat.name}</span>
                    <span className="font-mono text-sm text-d360-muted">{cat.score}</span>
                  </div>
                  <div className="h-1 bg-d360-border">
                    <div className="h-full bg-d360-primary transition-all duration-700" style={{ width: `${(cat.score / 10) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Destination Story ────────────────────────────────────────────────────────

function DestinationStory({ destination }: { destination: Destination }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <section className="bg-d360-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">DESTINATION STORY</p>
            <h2 className="font-display text-3xl md:text-4xl text-d360-ink mb-6 leading-tight">The Story of {destination.name}</h2>
            <p className="text-d360-ink/80 text-base leading-relaxed mb-4">{destination.editorial.story}</p>
            {expanded && <p className="text-d360-ink/80 text-base leading-relaxed mb-4">{destination.editorial.storyFull}</p>}
            <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-d360-primary text-sm font-medium hover:gap-3 transition-all">
              {expanded ? 'Show less' : 'Read more'} <span className={`transition-transform ${expanded ? 'rotate-90' : ''}`}><IconArrowRight /></span>
            </button>
          </div>
          <div className="relative">
            <img src={destination.hero.poster || destination.hero.image} alt={`The story of ${destination.name}`} className="w-full object-cover" style={{ height: '420px', borderRadius: '2px' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── History Timeline ─────────────────────────────────────────────────────────

function HistoryTimeline({ destination }: { destination: Destination }) {
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">HISTORY & ARCHAEOLOGY</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Centuries of Stone & Scripture</h2>
          <p className="text-d360-muted mt-4">{destination.history.shortIntro}</p>
        </div>
        <div className="relative">
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-d360-border hidden md:block" />
          <div className="flex flex-col gap-0">
            {destination.history.timeline.map((entry, i) => (
              <div key={i} className="flex gap-8 md:gap-0 group">
                <div className="hidden md:flex items-start pt-6 w-[88px] shrink-0 justify-end pr-8">
                  <span className="font-mono text-sm font-medium text-d360-primary">{entry.year}</span>
                </div>
                <div className="hidden md:flex items-start pt-7 shrink-0 relative">
                  <div className="w-3 h-3 rounded-full border-2 border-d360-primary bg-d360-bg group-hover:bg-d360-primary transition-colors -translate-x-1.5" />
                </div>
                <div className="flex-1 pb-8 pl-0 md:pl-8 pt-4 md:pt-5 border-b border-d360-border last:border-0">
                  <span className="md:hidden font-mono text-xs text-d360-primary mb-1 block">{entry.year}</span>
                  <span className="inline-block text-[10px] font-mono tracking-widest text-d360-muted border border-d360-border px-2 py-0.5 mb-2">{entry.era.toUpperCase()}</span>
                  <p className="text-d360-ink/85 text-sm leading-relaxed">{entry.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Culture Grid ─────────────────────────────────────────────────────────────

function CultureGrid({ destination }: { destination: Destination }) {
  return (
    <section className="bg-d360-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">CULTURE & SIGNIFICANCE</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Cultural Heritage of Bundelkhand</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-px bg-d360-border">
          {destination.culture.map((card) => (
            <div key={card.title} className="group bg-d360-surface hover:bg-d360-bg transition-colors">
              <div className="overflow-hidden" style={{ height: '220px' }}>
                <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-d360-ink mb-3">{card.title}</h3>
                <p className="text-sm text-d360-muted leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Food Section ─────────────────────────────────────────────────────────────

function FoodSection({ destination }: { destination: Destination }) {
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">CULINARY GUIDE</p>
            <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">The Taste of Lalitpur & Bundelkhand</h2>
            <p className="text-d360-muted mt-2 text-sm">Authentic regional dishes to complement your heritage tour[cite: 13].</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {destination.food.map((item) => (
            <div key={item.name} className="shrink-0 border border-d360-border bg-white hover:border-d360-muted transition-colors group" style={{ borderRadius: '2px' }}>
              <div className="overflow-hidden" style={{ height: '160px' }}>
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-mono tracking-widest text-d360-primary uppercase">{item.category}</span>
                <h3 className="font-display text-base text-d360-ink mt-1 mb-2">{item.name}</h3>
                <p className="text-xs text-d360-muted leading-relaxed line-clamp-2">{item.description}</p>
                <p className="text-xs font-mono text-d360-muted mt-3 pt-3 border-t border-d360-border">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Attractions Grid ─────────────────────────────────────────────────────────

function AttractionsGrid({ destination }: { destination: Destination }) {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  return (
    <section className="bg-d360-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">PLACES TO EXPLORE</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight mb-8">Attractions & Monuments</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {destination.attractions.map(place => (
            <PlaceCard key={place.id} place={place} saved={savedIds.has(place.id)} onSave={() => setSavedIds(prev => { const n = new Set(prev); n.has(place.id) ? n.delete(place.id) : n.add(place.id); return n })} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Hidden Gems ─────────────────────────────────────────────────────────────

function HiddenGems({ destination }: { destination: Destination }) {
  return (
    <section className="bg-d360-ink py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">D360 HIDDEN GEMS</p>
          <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">Beyond the Main Temples</h2>
          <p className="text-white/50 mt-2 text-sm">Quiet corners around the hill fort and river valley[cite: 13].</p>
        </div>
        <div className="grid md:grid-cols-1 gap-px bg-white/10">
          {destination.hiddenGems.map((gem) => (
            <div key={gem.name} className="group bg-d360-ink hover:bg-white/5 transition-colors grid md:grid-cols-2 items-center">
              <div className="overflow-hidden relative" style={{ height: '280px' }}>
                <img src={gem.image} alt={gem.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80" />
              </div>
              <div className="p-8">
                <span className="text-[10px] font-mono tracking-widest text-d360-primary border border-d360-primary/50 px-2 py-1 inline-block mb-3">HIDDEN SPOT</span>
                <h3 className="font-display text-2xl text-white mb-3">{gem.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{gem.why}</p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-white/30 text-[10px] font-mono tracking-widest mb-1">DISTANCE</p>
                    <p className="text-white/80 text-xs">{gem.distance}</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] font-mono tracking-widest mb-1">SUGGESTED DURATION</p>
                    <p className="text-white/80 text-xs">{gem.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Things To Do ─────────────────────────────────────────────────────────────

function ThingsToDo({ destination }: { destination: Destination }) {
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">ACTIVITIES</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Things To Do at Deogarh</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destination.thingsToDo.map((item) => (
            <div key={item.activity} className="group border border-d360-border bg-white hover:border-d360-muted transition-colors" style={{ borderRadius: '2px' }}>
              <div className="overflow-hidden" style={{ height: '140px' }}>
                <img src={item.image} alt={item.activity} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-base text-d360-ink mb-3">{item.activity}</h3>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-d360-muted"><IconClock />{item.duration}</div>
                  <div className="flex items-center gap-1.5 text-xs text-d360-muted"><span className="font-mono">{item.cost}</span></div>
                  <div className="text-xs text-d360-muted">{item.bestTime}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Nearby Places ────────────────────────────────────────────────────────────

function NearbyPlaces({ destination }: { destination: Destination }) {
  return (
    <section className="bg-d360-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">RADIUS EXPLORATION</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight mb-6">Explore the Region</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {destination.nearbyPlaces.map((place) => (
            <div key={place.name} className="group border border-d360-border bg-white hover:border-d360-muted transition-colors cursor-pointer" style={{ borderRadius: '2px' }}>
              <div className="overflow-hidden relative" style={{ height: '160px' }}>
                <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-mono px-2 py-1">{place.distance}</div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm text-d360-ink mb-1">{place.name}</h3>
                <p className="text-xs text-d360-muted">{place.type}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-d360-muted"><IconClock />{place.travelTime}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How To Reach ─────────────────────────────────────────────────────────────

function HowToReach({ destination }: { destination: Destination }) {
  const modes = [
    { label: 'By Rail', icon: <IconTrain />, main: destination.travel.rail.station || '', detail: `${destination.travel.rail.distance} · ${destination.travel.rail.time}` },
    { label: 'By Road', icon: <IconCar />, main: destination.travel.road.highway || '', detail: `${destination.travel.road.distance} · ${destination.travel.road.time}` },
    { label: 'By Air', icon: <IconPlane />, main: destination.travel.air.airport || '', detail: `${destination.travel.air.distance} · ${destination.travel.air.time}` }
  ]
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">LOGISTICS</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">How to Reach Deogarh</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {modes.map((mode) => (
            <div key={mode.label} className="border border-d360-border bg-white p-8 hover:border-d360-muted transition-colors" style={{ borderRadius: '2px' }}>
              <div className="w-12 h-12 bg-d360-surface flex items-center justify-center text-d360-primary mb-6" style={{ borderRadius: '2px' }}>{mode.icon}</div>
              <h3 className="font-display text-xl text-d360-ink mb-2">{mode.label}</h3>
              <p className="font-medium text-d360-ink/80 text-sm mb-3">{mode.main}</p>
              <p className="text-sm text-d360-muted leading-relaxed">{mode.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Where To Stay ────────────────────────────────────────────────────────────

function WhereToStay({ destination }: { destination: Destination }) {
  const [activeType, setActiveType] = useState(destination.stay.categories[0].type)
  const active = destination.stay.categories.find(c => c.type === activeType)!
  return (
    <section className="bg-d360-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">ACCOMMODATION GUIDE</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Where to Stay (Base: Lalitpur)</h2>
          <p className="text-d360-muted mt-2 text-sm">Lalitpur town serves as the primary base for visiting Deogarh[cite: 13].</p>
        </div>
        <div className="flex gap-2 flex-wrap mb-8">
          {destination.stay.categories.map(cat => (
            <button key={cat.type} onClick={() => setActiveType(cat.type)} className={`px-4 py-2 text-xs font-mono tracking-wider border transition-colors ${activeType === cat.type ? 'bg-d360-primary text-white border-d360-primary' : 'bg-white text-d360-muted border-d360-border hover:text-d360-ink'}`} style={{ borderRadius: '2px' }}>{cat.type.toUpperCase()}</button>
          ))}
        </div>
        <div className="border border-d360-border bg-white p-8" style={{ borderRadius: '2px' }}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl text-d360-ink">{active.type}</h3>
              <p className="text-d360-primary font-mono text-sm mt-1">{active.range}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {active.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-d360-surface border border-d360-border text-sm text-d360-ink" style={{ borderRadius: '2px' }}>
                <span className="w-1.5 h-1.5 bg-d360-primary shrink-0" style={{ borderRadius: '50%' }} />
                {opt}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Best Time Calendar ───────────────────────────────────────────────────────

function BestTime({ destination }: { destination: Destination }) {
  const colorMap = { ideal: 'bg-d360-ideal text-white', good: 'bg-d360-good text-white', avoid: 'bg-d360-avoid text-white' }
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">SEASONALITY</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Best Time to Visit Deogarh</h2>
        </div>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2 mb-6">
          {destination.bestTime.months.map((m) => (
            <div key={m.month} className={`flex flex-col items-center py-3 px-1 ${colorMap[m.status]}`} style={{ borderRadius: '2px' }}>
              <span className="font-mono text-xs font-medium">{m.month}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6">
          {(['ideal', 'good', 'avoid'] as const).map(status => (
            <div key={status} className="flex items-center gap-2">
              <div className={`w-3 h-3 ${colorMap[status]}`} style={{ borderRadius: '2px' }} />
              <span className="text-xs text-d360-muted capitalize">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Budget Guide ─────────────────────────────────────────────────────────────

function BudgetGuide({ destination }: { destination: Destination }) {
  const [activeTier, setActiveTier] = useState(0)
  const tier = destination.budget.tiers[activeTier]
  return (
    <section className="bg-d360-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">COST ESTIMATES</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Trip Budget Guide</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mb-8">
          {destination.budget.tiers.map((t, i) => (
            <button key={t.tier} onClick={() => setActiveTier(i)} className={`p-6 text-left border transition-colors ${activeTier === i ? 'bg-d360-primary border-d360-primary text-white' : 'bg-white border-d360-border hover:border-d360-muted text-d360-ink'}`} style={{ borderRadius: '2px' }}>
              <p className={`text-xs font-mono tracking-widest mb-2 ${activeTier === i ? 'text-white/70' : 'text-d360-muted'}`}>{t.tier.toUpperCase()}</p>
              <p className="font-display text-xl">{t.perDay}</p>
              <p className={`text-xs mt-1 ${activeTier === i ? 'text-white/60' : 'text-d360-muted'}`}>per day estimated</p>
            </button>
          ))}
        </div>
        <div className="border border-d360-border bg-white p-8" style={{ borderRadius: '2px' }}>
          <h3 className="font-display text-xl text-d360-ink mb-6">Breakdown — {tier.tier}</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {tier.breakdown.map(item => (
              <div key={item.category} className="p-4 bg-d360-surface border border-d360-border" style={{ borderRadius: '2px' }}>
                <p className="text-xs font-mono text-d360-muted mb-1.5">{item.category.toUpperCase()}</p>
                <p className="font-display text-base text-d360-ink">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Itineraries ─────────────────────────────────────────────────────────────

function Itineraries({ destination }: { destination: Destination }) {
  const durations = Object.keys(destination.itineraries)
  const [active, setActive] = useState(durations[0])
  const days = destination.itineraries[active]
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">TRIP PLANNING</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight mb-6">Curated Heritage Itineraries</h2>
          <div className="flex gap-2">
            {durations.map(d => (
              <button key={d} onClick={() => setActive(d)} className={`px-5 py-2 text-xs font-mono tracking-wider border transition-colors ${active === d ? 'bg-d360-primary text-white border-d360-primary' : 'bg-transparent text-d360-muted border-d360-border hover:text-d360-ink'}`} style={{ borderRadius: '2px' }}>{d.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-1 gap-8">
          {days.map((day) => (
            <div key={day.day} className="border border-d360-border bg-white p-6" style={{ borderRadius: '2px' }}>
              <p className="font-mono text-xs tracking-widest text-d360-primary mb-5">DAY {day.day}</p>
              <div className="relative pl-16">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-d360-border" />
                {day.schedule.map((item, i) => (
                  <div key={i} className="relative mb-5 last:mb-0">
                    <div className="absolute -left-10 top-1 w-2 h-2 rounded-full bg-d360-surface border-2 border-d360-primary" />
                    <p className="font-mono text-xs text-d360-muted mb-0.5">{item.time}</p>
                    <p className="font-medium text-d360-ink text-sm">{item.place}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-d360-muted flex items-center gap-1"><IconClock />{item.duration}</span>
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

// ─── Local Experiences ────────────────────────────────────────────────────────

function LocalExperiences({ destination }: { destination: Destination }) {
  return (
    <section className="bg-d360-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">EXPERIENCES</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Recommended Heritage Trails</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {destination.experiences.map((exp) => (
            <div key={exp.title} className="group border border-d360-border bg-white hover:border-d360-muted transition-colors" style={{ borderRadius: '2px' }}>
              <div className="overflow-hidden" style={{ height: '180px' }}>
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-mono tracking-widest text-d360-primary">{exp.category.toUpperCase()}</span>
                <h3 className="font-display text-base text-d360-ink mt-1 mb-4">{exp.title}</h3>
                <div className="flex justify-between items-center text-xs text-d360-muted border-t border-d360-border pt-3">
                  <span className="flex items-center gap-1"><IconClock />{exp.duration}</span>
                  <span className="font-mono text-d360-primary">{exp.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Ask D360 AI Assistant ───────────────────────────────────────────────────

function AskD360({ destination }: { destination: Destination }) {
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const handlePrompt = (prompt: string) => { setSelected(prompt); setInput(prompt); setTimeout(() => setAnswered(true), 500) }
  return (
    <section className="bg-d360-ink py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">AI TRAVEL ASSISTANT</p>
            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-4">Ask D360 Copilot</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">Query historical architecture, travel logistics, or photography spots in Deogarh[cite: 13].</p>
            <div className="flex flex-col gap-2">
              {destination.aiPrompts.map((prompt, i) => (
                <button key={i} onClick={() => handlePrompt(prompt)} className={`text-left px-4 py-3 text-sm border transition-colors ${selected === prompt ? 'bg-d360-primary border-d360-primary text-white' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:text-white'}`} style={{ borderRadius: '2px' }}>
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
          <div className="border border-white/10 bg-white/5 p-6" style={{ borderRadius: '2px' }}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-8 h-8 bg-d360-primary flex items-center justify-center text-white text-xs font-display" style={{ borderRadius: '50%' }}>D</div>
              <div>
                <p className="font-medium text-white text-sm">D360 Deogarh Copilot</p>
                <p className="text-white/40 text-xs">Verified Heritage Assistant[cite: 13]</p>
              </div>
            </div>
            {!answered ? (
              <div className="min-h-[200px] flex items-center justify-center">
                <p className="text-white/30 text-sm text-center">Select a prompt or ask your own question about Deogarh architecture and logistics[cite: 13].</p>
              </div>
            ) : (
              <div className="min-h-[200px]">
                <div className="bg-d360-primary/20 border border-d360-primary/30 p-4 mb-4" style={{ borderRadius: '2px' }}>
                  <p className="text-white/80 text-sm">"{selected}"</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 text-white/75 text-sm leading-relaxed" style={{ borderRadius: '2px' }}>
                  {selected?.includes('Dashavatara') && `The Dashavatara Temple is pivotal in Indian art history as one of the earliest surviving structural stone temples in North India[cite: 13]. Built during the 5th century (Gupta period), it marks the transition from rock-cut architecture to standalone temples and early Nagara spire development[cite: 13].`}
                  {selected?.includes('Jain') && `While the Dashavatara Hindu temple belongs to the 5th century Gupta era, the Jain temple complex inside Deogarh Fort represents a subsequent medieval sacred development starting around the 8th-9th century CE under the Pratiharas[cite: 13].`}
                  {selected?.includes('5-hour') && `Recommended 5-hour photographic trail: 1. Morning side light on Dashavatara Vishnu reliefs (90 mins). 2. Walk up to Deogarh Fort gates & ramparts (60 mins). 3. Midday detail shots inside the Jain temple courtyard & votive pillars (90 mins). 4. Sunset over the Betwa River bluffs (60 mins)[cite: 13].`}
                  {selected?.includes('railway') && `Deogarh is 33 km from Lalitpur Junction (LAR)[cite: 13]. From the station, pre-arranged taxis or private autos reach Deogarh in approximately 45 minutes along state roads[cite: 13].`}
                </div>
              </div>
            )}
            <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
              <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Ask about Deogarh...`} className="flex-1 bg-transparent text-white/70 text-sm outline-none placeholder-white/30" />
              <button onClick={() => { if(input) handlePrompt(input) }} className="p-2 bg-d360-primary text-white text-xs hover:bg-d360-primary/80 transition-colors" style={{ borderRadius: '2px' }}><IconArrowRight /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Community Reviews ────────────────────────────────────────────────────────

function CommunityStories({ destination }: { destination: Destination }) {
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">HERITAGE VISITOR REVIEWS</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Traveler Insights</h2>
        </div>
        <div className="grid md:grid-cols-1 gap-5">
          {destination.reviews.map((review, i) => (
            <div key={i} className="border border-d360-border bg-white p-6 hover:border-d360-muted transition-colors" style={{ borderRadius: '2px' }}>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className={j < review.rating ? 'text-d360-amber' : 'text-d360-border'}><IconStar filled={j < review.rating} /></span>
                ))}
              </div>
              <p className="text-d360-ink/80 text-sm leading-relaxed mb-6">{review.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-d360-border">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-d360-surface shrink-0">
                  <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium text-d360-ink text-sm">{review.name}</p>
                  <p className="text-xs text-d360-muted">{review.location} · {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Sources & Verification ───────────────────────────────────────────────────

function SourcesTrust({ destination }: { destination: Destination }) {
  return (
    <section className="bg-d360-bg py-12 border-t border-d360-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-d360-muted text-[10px] font-mono tracking-widest mb-3">OFFICIAL SOURCES</p>
            {destination.sources.official.map((s, i) => <p key={i} className="text-xs text-d360-muted mb-1.5">{s}</p>)}
          </div>
          <div>
            <p className="text-d360-muted text-[10px] font-mono tracking-widest mb-3">HISTORICAL & RESEARCH REFERENCES</p>
            {destination.sources.historical.map((s, i) => <p key={i} className="text-xs text-d360-muted mb-1.5 italic">{s}</p>)}
          </div>
          <div>
            <p className="text-d360-muted text-[10px] font-mono tracking-widest mb-3">VERIFICATION</p>
            <p className="text-xs text-d360-muted">Last verified: <span className="text-d360-ink font-medium">{destination.sources.lastVerified}</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-d360-ink text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-1">
            <p className="font-display text-2xl mb-2">D360</p>
            <p className="text-white/40 text-sm leading-relaxed">Discover Beyond the Usual.</p>
            <p className="text-white/25 text-xs mt-4 font-mono">An EduFutura Technologies product</p>
          </div>
          <div>
            <p className="text-white/40 text-[10px] font-mono tracking-widest mb-4">EXPLORE</p>
            <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors mb-2">Heritage Destinations</a>
            <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors mb-2">Gupta Temple Circuits</a>
            <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors mb-2">Jain Sanctuary Sites</a>
          </div>
          <div>
            <p className="text-white/40 text-[10px] font-mono tracking-widest mb-4">PLANNING</p>
            <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors mb-2">Lalitpur Travel Guide</a>
            <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors mb-2">Ask D360 Copilot</a>
          </div>
          <div>
            <p className="text-white/40 text-[10px] font-mono tracking-widest mb-4">COMPANY</p>
            <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors mb-2">About D360</a>
            <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors mb-2">Terms & Privacy</a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-white/30 text-xs">© 2026 EduFutura Technologies Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Main App Component ───────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-d360-bg font-sans">
      <Nav />
      <Hero destination={deogarhData} />
      <QuickFacts facts={deogarhData.quickFacts} />
      <WhyVisit destination={deogarhData} />
      <DestinationStory destination={deogarhData} />
      <HistoryTimeline destination={deogarhData} />
      <CultureGrid destination={deogarhData} />
      <FoodSection destination={deogarhData} />
      <AttractionsGrid destination={deogarhData} />
      <HiddenGems destination={deogarhData} />
      <ThingsToDo destination={deogarhData} />
      <NearbyPlaces destination={deogarhData} />
      <HowToReach destination={deogarhData} />
      <WhereToStay destination={deogarhData} />
      <BestTime destination={deogarhData} />
      <BudgetGuide destination={deogarhData} />
      <Itineraries destination={deogarhData} />
      <LocalExperiences destination={deogarhData} />
      <AskD360 destination={deogarhData} />
      <CommunityStories destination={deogarhData} />
      <SourcesTrust destination={deogarhData} />
      <Footer />
    </div>
  )
}