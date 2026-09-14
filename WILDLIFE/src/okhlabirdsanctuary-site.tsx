import { useState, useRef, useEffect } from 'react'

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

// ─── Okhla Bird Sanctuary Data ────────────────────────────────────────────────

const okhlaBirdSanctuary: Destination = {
  id: 'okhla-bird-sanctuary',
  slug: 'okhla-bird-sanctuary-noida-uttar-pradesh',
  name: 'Okhla Bird Sanctuary',
  localName: 'ओखला पक्षी अभयारण्य / در أ ھكوا',
  destinationType: 'Urban Wetland / Protected Forest Reserve',
  country: 'India',
  state: 'Uttar Pradesh',
  district: 'Gautam Buddha Nagar',
  shortDescription: 'An urban ecological oasis where the Yamuna’s floodplains cradle thousands of migratory avian wanderers right at the lip of the National Capital Region.',
  tags: ['URBAN WETLAND', 'AVIAN REFUGE', 'FLYWAY CORRIDOR'],
  hero: {
    image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000',
    poster: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
  },
  quickFacts: {
    bestTime: 'Nov – Feb',
    duration: '2–4 Hours',
    budget: '₹150–₹500 ($2–$6)',
    destinationType: 'Urban Wetland / Sanctuary',
    difficulty: 'Easy (Flat bund paths)',
    distance: 'Sub-district Dadri / Sadar, Noida'
  },
  discoveryScore: {
    overall: 6.9,
    categories: [
      { name: 'Uniqueness / Authenticity', score: 8.5 },
      { name: 'Historical Weight', score: 6.5 },
      { name: 'Popularity Index', score: 6.0 },
      { name: 'Cultural Significance', score: 5.0 },
      { name: 'Crowd Level', score: 4.5 }
    ]
  },
  editorial: {
    why: 'One of the few protected urban wetlands in Asia accessible directly via a metropolitan underground subway system (Delhi Metro Magenta Line), offering high-density migratory birding within feet of a major capital\'s financial district.',
    story: 'Stretching over roughly 3.5 to 4 square kilometers where the Yamuna River exits Delhi and enters Uttar Pradesh, the Okhla Wetland is one of Northern India’s most critical urban avian habitats. Formed primarily by the damming of the Yamuna through the historical Agra Canal headworks and the subsequent construction of the new Okhla Barrage in 1986, this man-modified riverine ecosystem acts as a green lung sandwiched between high-density urban developments.',
    storyFull: 'The wetland comprises open water bodies, seasonal reed beds (Typha and Phragmites), mudflats, and alluvial terrestrial scrub forest. During winter, it transforms into an international migratory avian crossroads, drawing waterfowl, waders, and raptors traveling along the Central Asian Flyway. Beyond its ecological role, Okhla Wetland provides a tranquil green sanctuary amidst Noida\'s towering glass skyscrapers and high-speed expressways. It serves as a vital environmental buffer, carbon sink, and live outdoor laboratory for urban naturalists and ornithologists across North India.'
  },
  history: {
    shortIntro: 'A mid-19th century river hydro-engineering site turned globally recognized urban bird habitat and protected reserve.',
    timeline: [
      { year: '1874', event: 'The British colonial administration constructs the original Agra Canal weir/barrage at Okhla to supply irrigation water to the Agra region from the Yamuna.', era: 'British Colonial Hydro-Engineering' },
      { year: '1940s', event: 'Major-General H.P.W. Hutson conducts pioneering ornithological surveys along the Okhla riverbanks, documenting its role as a key stopover for migratory birds.', era: 'Early Avian Documentation' },
      { year: '1960s–1970s', event: 'Legendary "Birdman of India" Dr. Salim Ali and ornithologist Usha Ganguli extensively document the avifauna of the Okhla marshes in landmark publications.', era: 'Ornithological Research Era' },
      { year: '1986', event: 'Construction of the modern Okhla Barrage creates a large upstream lake-like reservoir.', era: 'Modern Barrage Construction' },
      { year: '1990', event: 'Government of Uttar Pradesh officially declares 3.5 sq km of the Yamuna floodplain at Okhla a protected Bird Sanctuary under the Wildlife Protection Act, 1972.', era: 'Official Protection Status' }
    ]
  },
  culture: [
    {
      title: 'Suburban Naturalists & Eco-Warriors',
      description: 'Bridging rural Yamuna agrarian communities with modern suburban Noida professionals, featuring active photography clubs, weekend trash cleanups, and citizen-science counts.',
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    },
    {
      title: 'Sacred Yamuna River Traditions',
      description: 'Reverence for Yamuna Devi (sister of Yama) with morning prayers along riverbanks, Asian Waterbird Census in January, and World Wetlands Day events.',
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    }
  ],
  food: [
    {
      name: 'Bedmi Puri & Aloo Sabzi',
      description: 'Crisp, lentil-stuffed fried breads served with spicy potato curry and pickled chilies—a morning staple for early birdwatchers.',
      category: 'Breakfast / Specialty',
      price: '₹50–₹100',
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    },
    {
      name: 'Chole Bhature',
      description: 'Deep-fried puffed bread served with spiced chickpea curry, popular at food stalls near Noida Sector 18.',
      category: 'Street Food',
      price: '₹80–₹150',
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    },
    {
      name: 'Dehati Kulhad Chai',
      description: 'Clay-pot brewed ginger and cardamom tea served hot right outside the sanctuary entry gates.',
      category: 'Beverage',
      price: '₹15–₹30',
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    },
    {
      name: 'Daulat Ki Chaat',
      description: 'A delicate winter-only whipped milk foam dessert infused with saffron and pistachios, found in nearby Old Delhi markets.',
      category: 'Seasonal Sweet',
      price: '₹60–₹120',
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    },
    {
      name: 'Winter Parathas',
      description: 'Stuffed radish (Mooli), cauliflower (Gobi), and jaggery parathas served piping hot with fresh white butter.',
      category: 'Main Course',
      price: '₹70–₹140',
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    },
    {
      name: 'Mughlai Delicacies (Jamia / Zakir Nagar)',
      description: 'Mutton Nihari, Galouti Kebabs, and fluffy Khamiri Roti from the historic culinary quarter across the bridge.',
      category: 'Heritage Eats',
      price: '₹150–₹350',
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    }
  ],
  attractions: [
    {
      id: 'central-open-water-lake-watchtower',
      name: 'Central Open-Water Lake & Watchtower',
      category: 'Nature / Scenic Spot',
      description: 'The primary water body formed by the barrage, featuring an elevated watchtower providing panoramic views of duck rafts and migratory birds.',
      duration: '1 – 1.5 Hours',
      distance: 'Central Reservoir Core',
      score: 9.0,
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    },
    {
      id: 'typha-reed-bed-trail',
      name: 'Typha Reed Bed Nature Walk Trail',
      category: 'Nature / Scenic Spot',
      description: 'A shaded earthen trail cutting through dense elephant grass and reed beds, ideal for spotting warblers, babblers, and weaver birds.',
      duration: '1 Hour',
      distance: 'Inner Wetland Sanctuary Path',
      score: 8.7,
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    },
    {
      id: 'agra-canal-headworks-barrage',
      name: 'Agra Canal Headworks & Historic Barrage',
      category: 'Main Landmark / Monument',
      description: '19th-century British irrigation engineering milestone where the Agra Canal branches away from the main Yamuna River.',
      duration: '45 Mins',
      distance: 'Southern Edge Boundary',
      score: 8.3,
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    },
    {
      id: 'interpretive-eco-center-nursery',
      name: 'Interpretive Eco-Center & Nursery',
      category: 'Museum / Cultural Center',
      description: 'Small educational center displaying taxidermy models, avian migration route maps, and native plant nurseries.',
      duration: '30 Mins',
      distance: 'Near Main Entrance Gate',
      score: 7.8,
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    },
    {
      id: 'st-kalindi-kunj-ghat-overlook',
      name: 'St. Kalindi Kunj Ghat Overlook',
      category: 'Religious / Spiritual Site',
      description: 'Riverbank vantage point on the periphery used for river viewing and witnessing morning sunrises over the Yamuna.',
      duration: '30 Mins',
      distance: 'Periphery Boundary Point',
      score: 7.5,
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    }
  ],
  hiddenGems: [
    {
      name: 'Deep Trail Reed Boardwalk',
      why: 'Surrounded by tall Typha domingensis reeds with immersive ambient bird calls and solitude away from main bund roads.',
      distance: '0.8 km from Gate 1',
      duration: '45 Mins',
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    },
    {
      name: 'Barrage Edge Platform',
      why: 'Standing right at the civil engineering intersection where the Agra Canal branches off the Yamuna River.',
      distance: '1.2 km from Main Watchtower',
      duration: '30 Mins',
      image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000'
    }
  ],
  thingsToDo: [
    { activity: 'Guided Avian Walks with Local Naturalists', duration: '2–3 Hours', cost: 'Free / Club Fee', difficulty: 'Easy', bestTime: 'Early Morning / Dawn', image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000' },
    { activity: 'Bird Photography Masterclass & Flight Shots', duration: '3 Hours', cost: 'DSLR Pass ₹50-₹100', difficulty: 'Easy', bestTime: 'Golden Hour / Sunrise', image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000' },
    { activity: 'Nature Cycling along Main Bund Roads', duration: '1–2 Hours', cost: 'Forest Pass Required', difficulty: 'Easy', bestTime: 'Morning / Late Afternoon', image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000' }
  ],
  nearbyPlaces: [
    { name: 'Kalindi Kunj Park', distance: '1.5 km', type: 'Riverside Public Park', travelTime: '5 mins', image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000' },
    { name: 'Noida Sector 18 & DLF Mall of India', distance: '3.5 km', type: 'Retail, Dining & Entertainment', travelTime: '10 mins', image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000' },
    { name: 'Jamia Nagar / Zakir Nagar Food Street', distance: '4 km', type: 'Heritage Mughlai Cuisine Hub', travelTime: '12 mins', image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000' },
    { name: 'Lotus Temple (Bahá\'í House of Worship)', distance: '5 km', type: 'Architectural Monument', travelTime: '15 mins', image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000' },
    { name: 'Humayun\'s Tomb & Sunder Nursery', distance: '8.5 km', type: 'UNESCO Heritage & Botanical Gardens', travelTime: '20 mins', image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000' },
    { name: 'Akshardham Temple', distance: '9 km', type: 'Traditional Sandstone Temple Complex', travelTime: '20 mins', image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000' }
  ],
  travel: {
    air: { airport: 'Indira Gandhi International Airport, Delhi (DEL)', distance: '22–26 km via DND Flyway', time: '~40–50 mins by cab' },
    rail: { station: 'Hazrat Nizamuddin (NZM) / NDLS / Anand Vihar', distance: '9 km (NZM) / 16 km (NDLS) / 14 km (ANVT)', time: '15–30 mins by taxi or metro' },
    road: { highway: 'Noida-Greater Noida Expressway / DND Flyway / NH-44', distance: 'Okhla Bird Sanctuary Metro Station (Magenta Line)', time: 'Direct gate entry' }
  },
  stay: {
    categories: [
      { type: 'Luxury Business Hotels', range: '₹6,000–₹14,000/night', options: ['Radisson Blu Noida (Sector 18)', 'Crowne Plaza Mayur Vihar'] },
      { type: 'Boutique Stays & Heritage Homestays', range: '₹3,500–₹7,000/night', options: ['Boutique Homestays in Nizamuddin East', 'New Friends Colony Homestays'] },
      { type: 'Budget Business & Hostels', range: '₹1,200–₹3,000/night', options: ['Noida Sector 27/62 Budget Hotels', 'Backpacking Hostels in Greater Kailash / Paharganj'] }
    ]
  },
  bestTime: {
    months: [
      { month: 'Jan', status: 'ideal' }, { month: 'Feb', status: 'ideal' }, { month: 'Mar', status: 'good' },
      { month: 'Apr', status: 'avoid' }, { month: 'May', status: 'avoid' }, { month: 'Jun', status: 'avoid' },
      { month: 'Jul', status: 'good' }, { month: 'Aug', status: 'good' }, { month: 'Sep', status: 'good' },
      { month: 'Oct', status: 'good' }, { month: 'Nov', status: 'ideal' }, { month: 'Dec', status: 'ideal' }
    ]
  },
  budget: {
    tiers: [
      { tier: 'Budget Visitor', perDay: '₹200–₹500', breakdown: [{ category: 'Entry & Camera Fee', amount: '₹30–₹150' }, { category: 'Food & Tea', amount: '₹100–₹250' }, { category: 'Metro Transit', amount: '₹40–₹80' }] },
      { tier: 'Comfort / Photographer', perDay: '₹1,500–₹3,500', breakdown: [{ category: 'Entry & Pro DSLR Pass', amount: '₹100–₹500' }, { category: 'Cafe Brunch & Meals', amount: '₹600–₹1,500' }, { category: 'Cab & Local Transit', amount: '₹500–₹1,200' }] }
    ]
  },
  itineraries: {
    '1 Day': [
      { day: 1, schedule: [{ time: '06:30 AM', place: 'Arrive at Okhla Bird Sanctuary Main Gate (Gate No. 1)', duration: '30 mins' }, { time: '07:00 AM', place: 'Walk main bund path to Central Watchtower & spot winter waterfowl', duration: '2.5 hrs' }, { time: '09:30 AM', place: 'Explore Typha reed bed trails for warblers and prinia', duration: '1 hr' }, { time: '11:00 AM', place: 'Exit sanctuary & take Magenta Line Metro to Sector 18 Noida for brunch', duration: '1.5 hrs' }, { time: '02:00 PM', place: 'Visit Sunder Nursery & Humayun\'s Tomb for heritage walks', duration: '3 hrs' }, { time: '05:30 PM', place: 'Sunset tea overlooking Sunder Nursery heritage fountains', duration: '1 hr' }] }
    ]
  },
  experiences: [
    { title: 'Guided Avian Trail Walk', duration: '2.5 Hours', price: 'Free / Organized by Delhi Bird Club', category: 'Nature Walk', image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000' },
    { title: 'Bird Photography Field Session', duration: '3 Hours', price: '₹50–₹100 (DSLR Gate Fee)', category: 'Photography', image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000' }
  ],
  aiPrompts: [
    "What migratory bird species can I see at Okhla Bird Sanctuary in January?",
    "How do I reach Okhla Bird Sanctuary using the Delhi Metro system?",
    "What are the entry ticket prices and DSLR camera fees at Okhla Wetland?",
    "Can I bring a bicycle inside Okhla Bird Sanctuary for nature rides?",
    "Plan a 3-hour morning photography itinerary at Okhla Bird Sanctuary."
  ],
  reviews: [
    { name: 'Ornithology Club NCR', location: 'Delhi / Noida', text: 'An amazing urban green lung! Stepping right off the Magenta Line Metro and watching thousands of Northern Pintails and Bar-headed Geese against the backdrop of Noida skyscrapers is surreal.', rating: 5, image: 'https://drive.google.com/thumbnail?id=PLACEHOLDER_ID&sz=w2000', date: 'January 2026' }
  ],
  sources: {
    official: ['Uttar Pradesh Forest Department (obs-up.com)', 'Gautam Buddha Nagar District Portal (gbnagar.nic.in)'],
    historical: ['BNHS / BirdLife International Important Bird Areas (IBA IN196) Factsheet'],
    lastVerified: 'Darshan360 Eco-Tourism Intelligence (2026)'
  }
}

// ─── Icons ───────────────────────────────────────────────────────────────────

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
const IconVolume = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
const IconPlay = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
const IconPause = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>

// ─── Reusable Place Card ──────────────────────────────────────────────────────

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
            <a href="#" className={`text-sm font-medium transition-colors ${scrolled ? 'text-d360-muted hover:text-d360-ink' : 'text-white/80 hover:text-white'}`}>Profile</a>
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
          {['Explore', 'Destinations', 'Hidden Gems', 'Plan a Trip', 'Experiences', 'Saved', 'Profile'].map(item => (
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
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.75) 100%)' }} />
      <div className="absolute top-20 left-0 right-0 px-6 lg:px-12">
        <p className="text-white/60 text-xs tracking-widest font-medium">
          {destination.country.toUpperCase()} &nbsp;/&nbsp; {destination.state.toUpperCase()} &nbsp;/&nbsp; {destination.name.toUpperCase()}
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
          <p className="text-white/70 text-sm md:text-base font-medium mb-4 tracking-wide">{destination.state}, {destination.country} &nbsp;·&nbsp; <span className="font-mono text-white/50">{destination.localName}</span></p>
          <p className="text-white/85 text-base md:text-lg font-light max-w-xl leading-relaxed mb-8">{destination.shortDescription}</p>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-d360-primary text-white text-sm font-medium hover:bg-d360-primary/90 transition-colors" style={{ borderRadius: '2px' }}>Explore {destination.name} <IconArrowRight /></button>
            <button onClick={() => setSaved(!saved)} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border transition-colors ${saved ? 'bg-white text-d360-primary border-white' : 'bg-transparent text-white border-white/50 hover:border-white'}`} style={{ borderRadius: '2px' }}>
              <IconBookmark active={saved} /> {saved ? 'Saved' : 'Save Place'}
            </button>
            <button className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-white border border-white/50 hover:border-white transition-colors" style={{ borderRadius: '2px' }}>
              Ask D360
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 right-6 lg:right-12 flex items-center gap-3">
          <button onClick={() => setMuted(!muted)} className="p-2.5 bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-colors border border-white/10" style={{ borderRadius: '2px' }}><IconVolume /></button>
          <button onClick={() => setPlaying(!playing)} className="p-2.5 bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-colors border border-white/10" style={{ borderRadius: '2px' }}>{playing ? <IconPause /> : <IconPlay />}</button>
        </div>
        <div className="hidden lg:flex items-center gap-2 absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
          <span className="w-px h-8 bg-white/30 block" />
          <span className="rotate-90 whitespace-nowrap text-[10px] tracking-[0.2em]">SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  )
}

// ─── Quick Facts Strip ────────────────────────────────────────────────────────

function QuickFacts({ facts }: { facts: QuickFact }) {
  const items = [
    { label: 'BEST TIME', value: facts.bestTime, icon: <IconSun /> },
    { label: 'IDEAL DURATION', value: facts.duration, icon: <IconClock /> },
    { label: 'BUDGET', value: facts.budget, icon: null },
    { label: 'DESTINATION TYPE', value: facts.destinationType, icon: null },
    { label: 'DIFFICULTY', value: facts.difficulty, icon: null },
    { label: 'DISTANCE', value: facts.distance, icon: <IconMapPin /> }
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
                <p className="text-xs text-d360-muted font-mono">RECOMMENDED</p>
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
  const [showAll, setShowAll] = useState(false)
  const shown = showAll ? destination.history.timeline : destination.history.timeline.slice(0, 4)
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">HISTORY & HERITAGE</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">A Sanctuary Written in History</h2>
          <p className="text-d360-muted mt-4">{destination.history.shortIntro}</p>
        </div>
        <div className="relative">
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-d360-border hidden md:block" />
          <div className="flex flex-col gap-0">
            {shown.map((entry, i) => (
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
          {!showAll && destination.history.timeline.length > 4 && (
            <button onClick={() => setShowAll(true)} className="mt-8 flex items-center gap-2 text-d360-primary text-sm font-medium hover:gap-3 transition-all">
              View Full History <IconArrowRight />
            </button>
          )}
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
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">The Soul of {destination.name}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-px bg-d360-border">
          {destination.culture.map((card) => (
            <div key={card.title} className="group bg-d360-surface hover:bg-d360-bg transition-colors">
              <div className="overflow-hidden" style={{ height: '200px' }}>
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
            <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">LOCAL FOOD</p>
            <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Taste of {destination.name}</h2>
            <p className="text-d360-muted mt-2 text-sm">Don't leave without trying these regional specialties.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-d360-primary hover:gap-3 transition-all">Explore Local Food <IconArrowRight /></button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
  const tabs = ['All', 'Nature', 'Landmarks', 'Cultural', 'Spiritual']
  const [activeTab, setActiveTab] = useState('All')
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const shown = activeTab === 'All' ? destination.attractions : destination.attractions.filter(a => a.category.toLowerCase().includes(activeTab.toLowerCase()))
  return (
    <section className="bg-d360-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">EXPLORE</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight mb-8">Key Landmarks & Spots</h2>
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`shrink-0 px-4 py-2 text-xs font-mono tracking-wider border transition-colors ${activeTab === tab ? 'bg-d360-primary text-white border-d360-primary' : 'bg-transparent text-d360-muted border-d360-border hover:text-d360-ink hover:border-d360-ink'}`} style={{ borderRadius: '2px' }}>
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(shown.length > 0 ? shown : destination.attractions).map(place => (
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
          <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">Beyond the Main Sanctuary Tracks</h2>
          <p className="text-white/50 mt-2 text-sm">Secluded spots and unique vantage points inside Okhla Wetland.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-white/10">
          {destination.hiddenGems.map((gem) => (
            <div key={gem.name} className="group bg-d360-ink hover:bg-white/5 transition-colors">
              <div className="overflow-hidden relative" style={{ height: '260px' }}>
                <img src={gem.image} alt={gem.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-d360-ink/80 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono tracking-widest text-d360-primary border border-d360-primary/50 px-2 py-1">HIDDEN GEM</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-white mb-3">{gem.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{gem.why}</p>
                <div className="flex gap-6">
                  <div>
                    <p className="text-white/30 text-[10px] font-mono tracking-widest mb-1">DISTANCE</p>
                    <p className="text-white/80 text-xs">{gem.distance}</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] font-mono tracking-widest mb-1">DURATION</p>
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
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Things To Do</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destination.thingsToDo.map((item) => (
            <div key={item.activity} className="group border border-d360-border bg-white hover:border-d360-muted transition-colors" style={{ borderRadius: '2px' }}>
              <div className="overflow-hidden" style={{ height: '140px' }}>
                <img src={item.image} alt={item.activity} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm text-d360-ink mb-3">{item.activity}</h3>
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
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">NEARBY</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight mb-6">Keep Exploring</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
    { label: 'By Air', icon: <IconPlane />, key: 'air', main: destination.travel.air.airport || '', detail: `${destination.travel.air.distance} · ${destination.travel.air.time}` },
    { label: 'By Rail', icon: <IconTrain />, key: 'rail', main: destination.travel.rail.station || '', detail: `${destination.travel.rail.distance} · ${destination.travel.rail.time}` },
    { label: 'By Metro / Road', icon: <IconCar />, key: 'road', main: destination.travel.road.highway || '', detail: `${destination.travel.road.distance} · ${destination.travel.road.time}` }
  ]
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">TRAVEL</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">How to Reach {destination.name}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {modes.map((mode) => (
            <div key={mode.key} className="border border-d360-border bg-white p-8 hover:border-d360-muted transition-colors" style={{ borderRadius: '2px' }}>
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
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">ACCOMMODATION</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Where to Stay</h2>
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
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">WHEN TO GO</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Best Time to Visit</h2>
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
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">TRIP COST</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Budget Guide</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mb-8">
          {destination.budget.tiers.map((t, i) => (
            <button key={t.tier} onClick={() => setActiveTier(i)} className={`p-6 text-left border transition-colors ${activeTier === i ? 'bg-d360-primary border-d360-primary text-white' : 'bg-white border-d360-border hover:border-d360-muted text-d360-ink'}`} style={{ borderRadius: '2px' }}>
              <p className={`text-xs font-mono tracking-widest mb-2 ${activeTier === i ? 'text-white/70' : 'text-d360-muted'}`}>{t.tier.toUpperCase()}</p>
              <p className="font-display text-xl">{t.perDay}</p>
              <p className={`text-xs mt-1 ${activeTier === i ? 'text-white/60' : 'text-d360-muted'}`}>per visit / day</p>
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
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight mb-6">Plan Your {destination.name} Trip</h2>
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
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Local Experiences</h2>
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

// ─── Ask D360 ─────────────────────────────────────────────────────────────────

function AskD360({ destination }: { destination: Destination }) {
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const handlePrompt = (prompt: string) => { setSelected(prompt); setInput(prompt); setTimeout(() => setAnswered(true), 600) }
  return (
    <section className="bg-d360-ink py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">AI TRAVEL ASSISTANT</p>
            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-4">Ask D360</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">Your intelligent guide to {destination.name}. Ask anything about migratory birds, metro routes, entry fees, photography rules, or cycling passes.</p>
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
                <p className="font-medium text-white text-sm">D360 Travel Guide</p>
                <p className="text-white/40 text-xs">Always available</p>
              </div>
            </div>
            {!answered ? (
              <div className="min-h-[200px] flex items-center justify-center">
                <p className="text-white/30 text-sm text-center">Select a prompt or type your question to begin your {destination.name} discovery.</p>
              </div>
            ) : (
              <div className="min-h-[200px]">
                <div className="bg-d360-primary/20 border border-d360-primary/30 p-4 mb-4" style={{ borderRadius: '2px' }}>
                  <p className="text-white/80 text-sm">"{selected}"</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 text-white/75 text-sm leading-relaxed" style={{ borderRadius: '2px' }}>
                  {selected?.includes('migratory bird') && `During peak winter (November to February), Okhla Bird Sanctuary hosts key migratory species including Bar-headed Geese, Northern Pintails, Northern Shovelers, Pochards, Flamingos, and Western Marsh Harriers.`}
                  {selected?.includes('Metro') && `Take the Delhi Metro Magenta Line and alight at Okhla Bird Sanctuary Metro Station. The sanctuary's main entrance (Gate No. 1) is located directly outside the station exit within a 3-minute walk.`}
                  {selected?.includes('ticket') && `Entry fees are ₹30–₹50 for Indian nationals and ₹350–₹500 for foreign tourists. Standard DSLR / zoom lens camera passes cost ₹50–₹100, while video/movie cameras range from ₹500–₹2,000.`}
                  {selected?.includes('bicycle') && `Yes, cycling is allowed along the main bund roads inside the sanctuary. Personal bicycles can be taken inside with appropriate forest passes purchased at the gate.`}
                  {selected?.includes('3-hour') && `Start at 6:30 AM at Gate 1. Walk the main bund path to the Central Watchtower for open water shots of waterfowl. By 8:30 AM, head to the Typha reed bed trails for close-ups of warblers and prinias before morning fog fully lifts.`}
                </div>
              </div>
            )}
            <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
              <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Ask about ${destination.name}...`} className="flex-1 bg-transparent text-white/70 text-sm outline-none placeholder-white/30" />
              <button onClick={() => { if(input) handlePrompt(input) }} className="p-2 bg-d360-primary text-white text-xs hover:bg-d360-primary/80 transition-colors" style={{ borderRadius: '2px' }}><IconArrowRight /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Community Stories ────────────────────────────────────────────────────────

function CommunityStories({ destination }: { destination: Destination }) {
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">COMMUNITY</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Travelers of D360</h2>
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

// ─── Sources & Trust ──────────────────────────────────────────────────────────

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
  const links = {
    Explore: ['Destinations', 'Hidden Gems', 'Heritage Sites', 'Natural Places'],
    Plan: ['Trip Planner', 'Itineraries', 'Budget Guide', 'Ask D360'],
    Experiences: ['Local Tours', 'Food Trails', 'Craft Workshops', 'Heritage Walks'],
    Company: ['About D360', 'EduFutura Technologies', 'Contact', 'Careers']
  }
  return (
    <footer className="bg-d360-ink text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid md:grid-cols-5 gap-10 mb-16">
          <div className="md:col-span-1">
            <p className="font-display text-2xl mb-2">D360</p>
            <p className="text-white/40 text-sm leading-relaxed">Discover Beyond the Usual.</p>
            <p className="text-white/25 text-xs mt-4 font-mono">An EduFutura Technologies product</p>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-white/40 text-[10px] font-mono tracking-widest mb-4">{section.toUpperCase()}</p>
              {items.map(item => <a key={item} href="#" className="block text-sm text-white/60 hover:text-white transition-colors mb-2">{item}</a>)}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-white/30 text-xs">© 2026 EduFutura Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map(l => <a key={l} href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-d360-bg font-sans">
      <Nav />
      <Hero destination={okhlaBirdSanctuary} />
      <QuickFacts facts={okhlaBirdSanctuary.quickFacts} />
      <WhyVisit destination={okhlaBirdSanctuary} />
      <DestinationStory destination={okhlaBirdSanctuary} />
      <HistoryTimeline destination={okhlaBirdSanctuary} />
      <CultureGrid destination={okhlaBirdSanctuary} />
      <FoodSection destination={okhlaBirdSanctuary} />
      <AttractionsGrid destination={okhlaBirdSanctuary} />
      <HiddenGems destination={okhlaBirdSanctuary} />
      <ThingsToDo destination={okhlaBirdSanctuary} />
      <NearbyPlaces destination={okhlaBirdSanctuary} />
      <HowToReach destination={okhlaBirdSanctuary} />
      <WhereToStay destination={okhlaBirdSanctuary} />
      <BestTime destination={okhlaBirdSanctuary} />
      <BudgetGuide destination={okhlaBirdSanctuary} />
      <Itineraries destination={okhlaBirdSanctuary} />
      <LocalExperiences destination={okhlaBirdSanctuary} />
      <AskD360 destination={okhlaBirdSanctuary} />
      <CommunityStories destination={okhlaBirdSanctuary} />
      <SourcesTrust destination={okhlaBirdSanctuary} />
      <Footer />
    </div>
  )
}