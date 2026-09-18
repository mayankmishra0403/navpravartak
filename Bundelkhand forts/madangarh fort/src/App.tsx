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

// ─── Madangarh Fort Data ─────────────────────────────────────────────────────

const madangarh: Destination = {
  id: 'madangarh-fort',
  slug: 'madangarh-fort-lalitpur',
  name: 'Madangarh Fort',
  localName: 'मदनगढ़ किला (ललितपुर)',
  destinationType: 'Hidden Hill-Ridge Fort & Rugged Wilderness Heritage',
  country: 'India',
  state: 'Uttar Pradesh',
  district: 'Lalitpur',
  shortDescription: "A little-known ridge fort in the Lalitpur hills, where ruined defensive architecture meets the raw Bundelkhand landscape.",
  tags: ['RIDGE FORT', 'HIDDEN HERITAGE', 'BUNDELKHAND HILLS'],
  hero: {
    image: '/images/madangarh_hero_fullhd.jpg',
    poster: '/images/madangarh_ridge.jpg'
  },
  quickFacts: {
    bestTime: 'Oct – Mar',
    duration: '3–5 Hours',
    budget: '₹',
    destinationType: 'Hill-Ridge Fort & Trek',
    difficulty: 'Moderate–Strenuous',
    distance: 'Lalitpur District Hills'
  },
  discoveryScore: {
    overall: 9.3,
    categories: [
      { name: 'Offbeat Solitude', score: 9.9 },
      { name: 'Landscape Drama', score: 9.6 },
      { name: 'Archaeological Mystery', score: 9.4 },
      { name: 'Crowd Level', score: 9.8 },
      { name: 'Raw Adventure', score: 9.0 }
    ]
  },
  editorial: {
    why: "Madangarh is best positioned as a discovery-led heritage destination rather than a conventional tourist monument. Its allure lies in the dramatic combination of elevated granite terrain, strategic defensive geography, and raw solitude away from crowded tourist circuits.",
    story: "Constructed along an elevated hill ridge in the rugged wilderness of Lalitpur, Madangarh was engineered to harness the natural topography for surveillance and control over vital mountain passes in medieval Bundelkhand.",
    storyFull: "Trekking up the ridge trail reveals ancient rock-cut steps, collapsed stone battlements overgrown with wild vegetation, dry-masonry bastions, and panoramic views stretching across the forested valleys of Lalitpur. Free from commercial tourist trappings, it offers hikers and heritage seekers an authentic, unvarnished encounter with the forgotten fortified landscape of Central India."
  },
  history: {
    shortIntro: "A strategic hilltop stronghold built into the natural ridge line of the Lalitpur hills.",
    timeline: [
      { year: 'Medieval Era', event: 'Fortified ridge outpost established to monitor movement along the ancient trade and military corridors between Bundelkhand and Malwa.', era: 'Medieval Fortress' },
      { year: '17th–18th Century', event: 'Reinforced with stone bastions, defensive parapets, and rainwater harvesting cisterns during regional Bundela feudal conflicts.', era: 'Feudal Era' },
      { year: '19th Century', event: 'Fell into disuse as regional warfare shifted to plains; reclaimed by natural forest and vegetation.', era: 'Historical Transition' },
      { year: 'Present', event: 'A hidden, uncommercialized adventure trekking and archaeological destination for discerning offbeat explorers.', era: 'Discovery Heritage' }
    ]
  },
  culture: [
    { title: 'Bundelkhand Hill Geography', description: 'The rugged granite ridges and dry deciduous forests form the ancient backbone of Lalitpur, steeped in folklore of warrior clans and forest guardians.', image: '/images/madangarh_hills.jpg' },
    { title: 'Vernacular Dry-Stone Architecture', description: 'The surviving ramparts demonstrate traditional dry-stone masonry, where local granite boulders were shaped and interlocked without mortar.', image: '/images/madangarh_ridge.jpg' },
    { title: 'Ancient Sacred Shrines', description: 'Weathered stone carvings and small rock-hewn shrines dedicated to regional deities dot the approach trails and surrounding village hillocks.', image: '/images/madangarh_temple_ruins.jpg' },
    { title: 'Gupta & Bundela Legacy of Lalitpur', description: 'Lalitpur is a treasure trove of ancient civilization, from 6th-century Gupta masterpieces at Deogarh to hidden hill forts across the district.', image: '/images/madangarh_dashavatara.jpg' }
  ],
  food: [
    { name: 'Rustic Bundeli Roti & Dal', description: 'Wholesome thick wheat rotis baked on clay tawas, served with spiced toor dal, raw onions, and fiery green chili chutney.', category: 'Traditional Meal', price: '₹60–₹100', image: '/images/litti_chokha.jpg' },
    { name: 'Lalitpur Dal-Bati & Roasted Baingan', description: 'Crispy wood-fired wheat batis drenched in desi ghee, paired with smoky fire-roasted eggplant chokha and spiced lentils.', category: 'Specialty', price: '₹90–₹140', image: '/images/litti_chokha.jpg' },
    { name: 'Khasta Moong Dal Kachori', description: 'Flaky deep-fried pastry filled with fragrant spiced moong dal, served with piping hot potato curry and tangy sonth chutney.', category: 'Trail Snack', price: '₹20–₹40', image: '/images/kachori.jpg' },
    { name: 'Spiced Buttermilk & Jaggery', description: 'Cool churned country mattha flavored with roasted cumin and rock salt, followed by organic sugarcane jaggery.', category: 'Beverage', price: '₹20–₹35', image: '/images/sattu_drink.jpg' },
    { name: 'Samosa Chaat & Clay Pot Chai', description: 'Golden potato samosas topped with sweet curd and tamarind chutney, accompanied by boiling ginger-cardamom tea.', category: 'Tea Stall', price: '₹25–₹50', image: '/images/samosa_chaat.jpg' }
  ],
  attractions: [
    { id: 'madangarh-ridge-core', name: 'Madangarh Ridge & Fort Core', category: 'Heritage / Adventure', description: 'The central defensive ridge complex featuring surviving stone battlements, parapets, and commanding 360-degree hill views.', duration: '2 hrs', distance: 'Hill Ridge', score: 9.8, image: '/images/madangarh_hero_fullhd.jpg' },
    { id: 'ridge-approach-trail', name: 'Scenic Hill Approach Trail', category: 'Trek / Nature', description: 'Rugged hiking trail weaving through rocky terrain, scrub forest, and historic rock-cut steps leading to the summit.', duration: '1–1.5 hrs', distance: 'Base to Summit', score: 9.4, image: '/images/madangarh_hills.jpg' },
    { id: 'defensive-bastions', name: 'Ancient Stone Bastions & Parapets', category: 'Archaeology', description: 'Weathered granite bastions showing military surveillance loopholes and interlocking stone architecture.', duration: '45 min', distance: 'Fort Periphery', score: 9.2, image: '/images/madangarh_ridge.jpg' },
    { id: 'panoramic-summit-viewpoint', name: 'Summit Panoramic Viewpoint', category: 'Scenic', description: 'The highest accessible vantage point overlooking the endless undulating hills and forests of the Bundelkhand plateau.', duration: '45 min', distance: 'Highest Ridge', score: 9.6, image: '/images/madangarh_ruins.jpg' },
    { id: 'ancient-shrine-remains', name: 'Rock-Cut Shrine & Carvings', category: 'Culture', description: 'Vestiges of ancient stone carvings and rock-hewn votive niches sheltered beneath natural granite overhangs.', duration: '30 min', distance: 'South Flank', score: 9.0, image: '/images/madangarh_temple_ruins.jpg' },
    { id: 'deogarh-heritage-circuit', name: 'Deogarh Dashavatara Temple', category: 'Culture / Nearby', description: 'World-famous 6th-century Gupta temple in Lalitpur district renowned for iconic Vishnu Anantasayana stone reliefs.', duration: '2 hrs', distance: 'Lalitpur Circuit', score: 9.7, image: '/images/madangarh_dashavatara.jpg' }
  ],
  hiddenGems: [
    { name: 'Secluded Valley Overlook', why: 'A hidden rocky cliff edge on the eastern face where mist pools in the forested ravines during early winter mornings.', distance: 'East Ridge', duration: '45 min', image: '/images/madangarh_hills.jpg' },
    { name: 'Rock-Cut Rainwater Cistern', why: 'Ancient water reservoir carved directly into the living granite bedrock to sustain the garrison through severe summer droughts.', distance: 'Upper Citadel', duration: '30 min', image: '/images/madangarh_ruins.jpg' },
    { name: 'Rural Terracotta Hamlets of Lalitpur', why: 'Small tribal and pastoral hamlets at the base of the hills practicing age-old clay pottery and livestock rearing.', distance: 'Base Village', duration: '1 hr', image: '/images/madangarh_temple_ruins.jpg' }
  ],
  thingsToDo: [
    { activity: 'Ridge Fortress Summit Trek', duration: '3 hrs', cost: 'Free', difficulty: 'Moderate', bestTime: '06:30 AM – 10:30 AM, Oct–Mar', image: '/images/madangarh_hero_fullhd.jpg' },
    { activity: 'Landscape & Ruin Photography', duration: '2 hrs', cost: 'Free', difficulty: 'Easy', bestTime: 'Golden Hour (04:30 PM)', image: '/images/madangarh_hills.jpg' },
    { activity: 'Exploration of Stone Masonry & Bastions', duration: '1.5 hrs', cost: 'Free', difficulty: 'Moderate', bestTime: 'Morning', image: '/images/madangarh_ridge.jpg' },
    { activity: 'Combined Deogarh Gupta Temple Excursion', duration: '3 hrs', cost: '₹25 (ASI Entry)', difficulty: 'Easy', bestTime: 'Afternoon', image: '/images/madangarh_dashavatara.jpg' },
    { activity: 'Rustic Bundelkhandi Dal-Bati Meal', duration: '45 min', cost: '₹80–₹140', difficulty: 'Easy', bestTime: 'Lunch in Lalitpur', image: '/images/litti_chokha.jpg' }
  ],
  nearbyPlaces: [
    { name: 'Lalitpur Town & Railway Junction', distance: '25–35 km', type: 'District Center', travelTime: '45 min', image: '/images/madangarh_ridge.jpg' },
    { name: 'Deogarh Gupta & Jain Temples', distance: '50 km', type: 'World Heritage Site', travelTime: '1 hr', image: '/images/madangarh_dashavatara.jpg' },
    { name: 'Talbehat Fort & Mansarovar Lake', distance: '55 km', type: 'Bundela Water Fort', travelTime: '1.1 hrs', image: '/images/madangarh_ruins.jpg' },
    { name: 'Jhansi Heritage City', distance: '85 km', type: 'Historical Hub', travelTime: '1.5 hrs', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=500&h=340&fit=crop&auto=format' }
  ],
  travel: {
    air: { airport: 'Gwalior Airport (GWL) / Bhopal (BHO)', distance: '190 km / 240 km', time: 'Gwalior ~3.5 hrs; Bhopal ~4.5 hrs drive' },
    rail: { station: 'Lalitpur Junction (LAR) / Jhansi (JHS)', distance: '30 km / 85 km', time: 'Lalitpur Junction is on the main Delhi-Mumbai/Chennai mainline with daily express halts' },
    road: { highway: 'State Roads via Lalitpur District', distance: 'Rural paved road leading to base village trails', time: 'Private vehicle or hired taxi from Lalitpur is the most reliable transit option' }
  },
  stay: {
    categories: [
      { type: 'Lalitpur City Hotels', range: '₹1,200–₹2,600/night', options: ['Hotel Bundelkhand Pride Lalitpur', 'Hotel Rahi Tourist Bungalow', 'Hotel Shanti Palace'] },
      { type: 'Jhansi Luxury Hotels', range: '₹2,500–₹5,500/night', options: ['Hotel Nataraj Sarovar Portico', 'Bundelkhand Pride Jhansi', 'Hotel Landmark'] },
      { type: 'Rural Guesthouses', range: '₹600–₹1,200/night', options: ['Eco-Farmstays in Lalitpur Countryside', 'Highway Yatri Niwas'] }
    ]
  },
  bestTime: {
    months: [
      { month: 'Jan', status: 'ideal' }, { month: 'Feb', status: 'ideal' }, { month: 'Mar', status: 'good' },
      { month: 'Apr', status: 'avoid' }, { month: 'May', status: 'avoid' }, { month: 'Jun', status: 'avoid' },
      { month: 'Jul', status: 'good' }, { month: 'Aug', status: 'good' }, { month: 'Sep', status: 'good' },
      { month: 'Oct', status: 'ideal' }, { month: 'Nov', status: 'ideal' }, { month: 'Dec', status: 'ideal' }
    ]
  },
  budget: {
    tiers: [
      { tier: 'Offbeat Trekker', perDay: '₹700–₹1,400', breakdown: [{ category: 'Local Transport', amount: '₹200–₹350' }, { category: 'Trail Food & Water', amount: '₹200–₹300' }, { category: 'Entry Fee', amount: 'Free' }, { category: 'Local Guide Tip', amount: '₹300–₹500' }] },
      { tier: 'Day Excursion from Lalitpur', perDay: '₹2,000–₹3,500', breakdown: [{ category: 'Private Cab from Lalitpur', amount: '₹1,400–₹2,000' }, { category: 'Meals & Snacks', amount: '₹400–₹600' }, { category: 'Guide Fee', amount: '₹400–₹600' }, { category: 'Deogarh Add-on', amount: '₹300+' }] },
      { tier: 'Bundelkhand Explorer Circuit', perDay: '₹4,500+', breakdown: [{ category: 'Hotel Base in Lalitpur/Jhansi', amount: '₹2,200–₹3,500' }, { category: 'Full Day Chauffeur Cab', amount: '₹2,200–₹3,000' }, { category: 'Dining & Experiences', amount: '₹800+' }] }
    ]
  },
  itineraries: {
    '1 Day': [{ day: 1, schedule: [{ time: '06:30 AM', place: 'Early morning departure from Lalitpur town to base village', duration: '45 min', distance: 'Rural Road' }, { time: '07:30 AM', place: 'Ascend ridge trail through rock-cut steps to Madangarh summit', duration: '2.5 hrs', distance: 'Ridge Summit' }, { time: '10:00 AM', place: 'Explore stone bastions, defensive parapets, and enjoy panoramic views', duration: '1.5 hrs', distance: 'Fort Core' }, { time: '12:00 PM', place: 'Descend to base and have traditional Bundeli lunch at local dhaba', duration: '1 hr', distance: 'Base Village' }, { time: '02:00 PM', place: 'Drive to Deogarh to explore 6th-century Gupta Dashavatara Temple', duration: '2.5 hrs', distance: 'Deogarh' }] }],
    '2 Days': [
      { day: 1, schedule: [{ time: '07:00 AM', place: 'Full morning trek and archaeological exploration of Madangarh Fort ridge', duration: '4 hrs', distance: 'Madangarh' }, { time: '01:00 PM', place: 'Rustic lunch in Lalitpur town & check-in to hotel', duration: '2 hrs', distance: 'Lalitpur' }, { time: '03:30 PM', place: 'Afternoon visit to local Stepwells and ancient Jain temples in Lalitpur', duration: '2.5 hrs', distance: 'Town Circuit' }] },
      { day: 2, schedule: [{ time: '08:00 AM', place: 'Excursion to Talbehat Fort and morning boat cruise on Mansarovar Lake', duration: '3.5 hrs', distance: 'Talbehat (31 km)' }, { time: '01:30 PM', place: 'Lunch along NH-44 and heritage visit to Deogarh Gupta Temple', duration: '3.5 hrs', distance: 'Deogarh' }] }
    ],
    '3 Days': [
      { day: 1, schedule: [{ time: '08:00 AM', place: 'Arrival in Lalitpur & morning trek to Madangarh hidden ridge fortress', duration: '4.5 hrs', distance: 'Madangarh' }, { time: '02:00 PM', place: 'Exploration of rural pottery villages and sunset over the granite plateau', duration: '3 hrs', distance: 'Lalitpur Valley' }] },
      { day: 2, schedule: [{ time: '08:30 AM', place: 'Deep exploration of Deogarh: Dashavatara Temple, Jain Fort, and Betwa River gorge', duration: '5 hrs', distance: 'Deogarh' }, { time: '03:00 PM', place: 'Scenic drive to Matatila Dam reservoir for evening boat views', duration: '3 hrs', distance: 'Matatila' }] },
      { day: 3, schedule: [{ time: '08:30 AM', place: 'Drive to Talbehat Fort & Jhansi 1857 memorial heritage trail', duration: '5 hrs', distance: 'Talbehat / Jhansi' }, { time: '03:30 PM', place: 'Departure from Jhansi Junction railway station', duration: '2 hrs', distance: 'Jhansi Station' }] }
    ]
  },
  experiences: [
    { title: 'Wild Ridge Fortress Trek', duration: '3 hrs', price: 'Free', category: 'Adventure', image: '/images/madangarh_hero_fullhd.jpg' },
    { title: 'Bundelkhand Hill Landscape Photography', duration: '2 hrs', price: 'Free', category: 'Photography', image: '/images/madangarh_hills.jpg' },
    { title: 'Archaeological Masonry & Ruin Exploration', duration: '1.5 hrs', price: 'Free', category: 'History', image: '/images/madangarh_ridge.jpg' },
    { title: 'Deogarh Gupta Art Heritage Trail', duration: '2.5 hrs', price: '₹25', category: 'Culture', image: '/images/madangarh_dashavatara.jpg' }
  ],
  aiPrompts: [
    "What is the trekking difficulty and route to reach Madangarh Fort?",
    "How does Madangarh Fort compare with Talbehat and Deogarh in Lalitpur?",
    "What essential gear and water supplies should I carry for Madangarh?",
    "Can you plan a 2-day offbeat adventure itinerary around Lalitpur hills?",
    "What is the architectural style of ridge forts in Bundelkhand?",
    "Madangarh kile par trekking ke liye best time aur safety tips kya hain?"
  ],
  reviews: [
    { name: 'Devendra Pratap Singh', location: 'Jhansi', text: 'If you love raw, untouched history away from crowds, Madangarh is thrilling! The views across the Bundelkhand hills from the ridge are breathtaking. Wear good hiking boots.', rating: 5, image: '/images/madangarh_hero_fullhd.jpg', date: 'January 2026' },
    { name: 'Naveen Goswami', location: 'Gwalior', text: 'An incredible discovery for trekking enthusiasts. Ancient stone ramparts surrounded by pure nature and total peace. Pair it with Deogarh for the perfect Lalitpur trip.', rating: 5, image: '/images/madangarh_hills.jpg', date: 'December 2025' },
    { name: 'Dr. Anita Saxena', location: 'Bhopal', text: 'A fascinating example of defensive hill architecture built into natural granite outcrops. Solitude, fresh air, and raw Bundelkhand heritage at its purest.', rating: 5, image: '/images/madangarh_ridge.jpg', date: 'November 2025' }
  ],
  sources: {
    official: ['Lalitpur District Administration Portal (lalitpur.nic.in)', 'Uttar Pradesh State Archaeology Directorate (uparchaeology.org)', 'Survey of Bundelkhand Hill Forts & Defense Architecture'],
    historical: ['District Gazetteers of the United Provinces: Jhansi & Lalitpur Division', 'Archaeological Survey Records of Bundelkhand Ridge Strongholds'],
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
      {/* Breadcrumb */}
      <div className="absolute top-20 left-0 right-0 px-6 lg:px-12">
        <p className="text-white/60 text-xs tracking-widest font-medium">
          {destination.country.toUpperCase()} &nbsp;/&nbsp; {destination.state.toUpperCase()} &nbsp;/&nbsp; {destination.name.toUpperCase()}
        </p>
      </div>
      {/* Main content */}
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
        {/* Video controls */}
        <div className="absolute bottom-8 right-6 lg:right-12 flex items-center gap-3">
          <button onClick={() => setMuted(!muted)} className="p-2.5 bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-colors border border-white/10" style={{ borderRadius: '2px' }}><IconVolume /></button>
          <button onClick={() => setPlaying(!playing)} className="p-2.5 bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-colors border border-white/10" style={{ borderRadius: '2px' }}>{playing ? <IconPause /> : <IconPlay />}</button>
        </div>
        {/* Scroll indicator */}
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
                <p className="text-xs text-d360-muted font-mono">HIGHLY RECOMMENDED</p>
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
            <div className="absolute -bottom-4 -left-4 hidden lg:block bg-d360-ink text-white px-6 py-4" style={{ maxWidth: '240px', borderRadius: '2px' }}>
              <p className="font-mono text-xs text-white/50 mb-1">ESTABLISHED</p>
              <p className="font-display text-xl font-medium">Medieval</p>
              <p className="text-xs text-white/60 mt-1">Ridge Stronghold</p>
            </div>
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
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">A City Written in History</h2>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-d360-border">
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
            <p className="text-d360-muted mt-2 text-sm">Don't leave without trying these.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-d360-primary hover:gap-3 transition-all">Explore Local Food <IconArrowRight /></button>
        </div>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-5">
          {destination.food.map((item) => (
            <div key={item.name} className="shrink-0 w-64 md:w-auto border border-d360-border bg-white hover:border-d360-muted transition-colors group" style={{ borderRadius: '2px' }}>
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
        <button className="md:hidden mt-6 flex items-center gap-2 text-sm font-medium text-d360-primary">Explore Local Food <IconArrowRight /></button>
      </div>
    </section>
  )
}

// ─── Attractions Grid ─────────────────────────────────────────────────────────

function AttractionsGrid({ destination }: { destination: Destination }) {
  const tabs = ['All', 'Heritage', 'Hidden Gems', 'Nature', 'Culture', 'Food']
  const [activeTab, setActiveTab] = useState('All')
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const shown = activeTab === 'All' ? destination.attractions : destination.attractions.filter(a => a.category.toLowerCase().includes(activeTab.toLowerCase()))
  return (
    <section className="bg-d360-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">EXPLORE</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight mb-8">Places to Explore</h2>
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
          <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">Beyond the Famous</h2>
          <p className="text-white/50 mt-2 text-sm">Places most visitors miss.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-white/10">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
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
  const filters = ['5 km', '25 km', '50 km', '100 km', 'All']
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? destination.nearbyPlaces : destination.nearbyPlaces.filter(p => {
    const km = parseInt(p.distance)
    const limit = parseInt(filter)
    return km <= limit
  })
  return (
    <section className="bg-d360-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">NEARBY</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight mb-6">Keep Exploring</h2>
          <div className="flex gap-2 flex-wrap">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 text-xs font-mono tracking-wider border transition-colors ${filter === f ? 'bg-d360-primary text-white border-d360-primary' : 'bg-transparent text-d360-muted border-d360-border hover:text-d360-ink'}`} style={{ borderRadius: '2px' }}>{f}</button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {(shown.length > 0 ? shown : destination.nearbyPlaces).map((place) => (
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
    { label: 'By Rail', icon: <IconTrain />, key: 'rail', main: destination.travel.rail.station || '', detail: destination.travel.rail.time },
    { label: 'By Road', icon: <IconCar />, key: 'road', main: destination.travel.road.highway || '', detail: `${destination.travel.road.distance} · ${destination.travel.road.time}` }
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
        <div className="grid md:grid-cols-3 gap-3 mb-8">
          {destination.budget.tiers.map((t, i) => (
            <button key={t.tier} onClick={() => setActiveTier(i)} className={`p-6 text-left border transition-colors ${activeTier === i ? 'bg-d360-primary border-d360-primary text-white' : 'bg-white border-d360-border hover:border-d360-muted text-d360-ink'}`} style={{ borderRadius: '2px' }}>
              <p className={`text-xs font-mono tracking-widest mb-2 ${activeTier === i ? 'text-white/70' : 'text-d360-muted'}`}>{t.tier.toUpperCase()}</p>
              <p className="font-display text-xl">{t.perDay}</p>
              <p className={`text-xs mt-1 ${activeTier === i ? 'text-white/60' : 'text-d360-muted'}`}>per day</p>
            </button>
          ))}
        </div>
        <div className="border border-d360-border bg-white p-8" style={{ borderRadius: '2px' }}>
          <h3 className="font-display text-xl text-d360-ink mb-6">Breakdown — {tier.tier}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tier.breakdown.map(item => (
              <div key={item.category} className="p-4 bg-d360-surface border border-d360-border" style={{ borderRadius: '2px' }}>
                <p className="text-xs font-mono text-d360-muted mb-1.5">{item.category.toUpperCase()}</p>
                <p className="font-display text-base text-d360-ink">{item.amount}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 flex items-center gap-2 px-6 py-3 bg-d360-primary text-white text-sm font-medium hover:bg-d360-primary/90 transition-colors" style={{ borderRadius: '2px' }}>Plan My Budget <IconArrowRight /></button>
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
        <div className="grid lg:grid-cols-2 gap-8">
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
                      {item.distance && <span className="text-xs text-d360-muted flex items-center gap-1"><IconMapPin />{item.distance}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 flex items-center gap-2 px-6 py-3 bg-d360-primary text-white text-sm font-medium hover:bg-d360-primary/90 transition-colors" style={{ borderRadius: '2px' }}>Use This Plan <IconArrowRight /></button>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

// ─── Map Section ──────────────────────────────────────────────────────────────

function MapSection({ destination }: { destination: Destination }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const filters = ['All', 'Attractions', 'Food', 'Hidden Gems', 'Stay', 'Experiences']
  return (
    <section className="bg-d360-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">INTERACTIVE MAP</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">{destination.name} on the Map</h2>
            <button className="flex items-center gap-2 text-sm font-medium text-d360-primary hover:gap-3 transition-all whitespace-nowrap">View Full Map <IconArrowRight /></button>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`px-3 py-1 text-xs font-mono tracking-wider border transition-colors ${activeFilter === f ? 'bg-d360-primary text-white border-d360-primary' : 'bg-white text-d360-muted border-d360-border hover:text-d360-ink'}`} style={{ borderRadius: '2px' }}>{f.toUpperCase()}</button>
          ))}
        </div>
        <div className="relative border border-d360-border bg-d360-surface overflow-hidden" style={{ height: '420px', borderRadius: '2px' }}>
          <img src="https://images.unsplash.com/photo-1663089551295-cee8e58807a0?w=1200&h=600&fit=crop&auto=format" alt={`Map of ${destination.name}`} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-d360-primary/10 border border-d360-primary/30 flex items-center justify-center mx-auto mb-3" style={{ borderRadius: '50%' }}>
                <IconMapPin />
              </div>
              <p className="font-display text-xl text-d360-ink">{destination.name}</p>
              <p className="text-sm text-d360-muted mt-1">{destination.state}, {destination.country}</p>
            </div>
          </div>
          {/* Map pins */}
          {[{ top: '35%', left: '45%', label: 'Madangarh Ridge Summit' }, { top: '42%', left: '38%', label: 'Base Trail' }, { top: '28%', left: '52%', label: 'Lalitpur Hills' }].map(pin => (
            <div key={pin.label} className="absolute group cursor-pointer" style={{ top: pin.top, left: pin.left }}>
              <div className="w-3 h-3 bg-d360-primary border-2 border-white shadow-md" style={{ borderRadius: '50%' }} />
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-d360-ink text-white text-xs px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderRadius: '2px' }}>{pin.label}</div>
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
            <p className="text-white/50 text-sm leading-relaxed mb-8">Your intelligent guide to {destination.name}. Ask anything about history, food, hidden gems, travel planning or local experiences.</p>
            <div className="flex flex-col gap-2">
              {destination.aiPrompts.map((prompt, i) => (
                <button key={i} onClick={() => handlePrompt(prompt)} className={`text-left px-4 py-3 text-sm border transition-colors ${selected === prompt ? 'bg-d360-primary border-d360-primary text-white' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:text-white'}`} style={{ borderRadius: '2px' }}>
                  "{prompt}"
                </button>
              ))}
              <button className="flex items-center gap-2 mt-2 text-white/40 text-xs font-medium hover:text-white/70 transition-colors">
                <IconMic /> Ask in Hindi
              </button>
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
                  {selected?.includes('difficulty') && `Madangarh Fort is a moderate trek involving an ascent over natural granite ridges and rock-cut steps. It takes about 1 to 1.5 hours to reach the summit from the base village.`}
                  {selected?.includes('compare') && `While Talbehat is a lakeside Bundela fort on NH-44 and Deogarh is famous for Gupta-era rock art, Madangarh offers raw wilderness, solitude, and authentic ridge-fort trekking.`}
                  {selected?.includes('gear') && `Essential gear: Sturdy hiking shoes, at least 2 litres of drinking water, sun hat, sunglasses, backpack, and light snacks. There are no commercial shops on the ridge.`}
                  {selected?.includes('itinerary') && `Day 1: Morning trek to Madangarh Fort ridge, followed by an afternoon tour of Deogarh Gupta Temple. Day 2: Visit Talbehat Fort and enjoy sunset boating on Mansarovar Lake.`}
                  {selected?.includes('style') && `The fort exhibits classical Bundelkhand hill military engineering, utilizing natural granite cliff faces as defensive ramparts with dry-stone masonry bastions and surveillance loopholes.`}
                  {selected?.includes('tips kya') && `मदनगढ़ किले पर ट्रैकिंग के लिए सुबह जल्दी (6:30 से 7:30 बजे) शुरुआत करें। साथ में पर्याप्त पानी और मजबूत ट्रैकिंग जूते अवश्य रखें। स्थानीय ग्रामीण को गाइड के रूप में साथ लेना सुरक्षित रहता है।`}
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
        <div className="grid md:grid-cols-3 gap-5">
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

// ─── Practical Info ───────────────────────────────────────────────────────────

function PracticalInfo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items = [
    { title: 'Trekking & Gear', content: 'Wear sturdy ankle-support hiking boots or trekking shoes with good grip. The trail involves uneven granite rocks, loose gravel, and thorny scrub vegetation.' },
    { title: 'Water & Supplies', content: 'There are no shops, stalls, or drinking water points along the ridge trail. Carry at least 2 litres of drinking water per person along with energy snacks and basic first aid.' },
    { title: 'Navigation & Guide', content: 'Because the site is off the beaten track and lacks signboards, hire a local village guide from the base settlement to guide you along the safest ridge path.' },
    { title: 'Preservation & Caution', content: 'Portions of the stone ramparts are fragile and crumbling. Avoid walking on unbonded wall crests or unstable precipices. Do not displace ancient masonry or remove carved stones.' },
    { title: 'Emergency Contacts', content: 'Lalitpur Police Control Room: 112 / +91-5176-272200 · District Hospital Lalitpur: +91-5176-272202 · Forest Division Lalitpur: +91-5176-272300.' },
    { title: 'Connectivity & Timing', content: 'Mobile network can be intermittent along the base valley but generally picks up at the summit. Start the trek early morning to avoid midday heat; descend before dusk.' }
  ]
  return (
    <section className="bg-d360-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-d360-primary text-xs font-mono tracking-widest mb-4">PRACTICAL</p>
          <h2 className="font-display text-3xl md:text-4xl text-d360-ink leading-tight">Before You Go</h2>
        </div>
        <div className="max-w-2xl border border-d360-border divide-y divide-d360-border" style={{ borderRadius: '2px' }}>
          {items.map((item, i) => (
            <div key={i} className="bg-white">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-d360-surface/50 transition-colors">
                <span className="font-medium text-d360-ink text-sm">{item.title}</span>
                <span className={`text-d360-muted transition-transform ${openIndex === i ? 'rotate-180' : ''}`}><IconChevronDown /></span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-d360-muted leading-relaxed">{item.content}</p>
                </div>
              )}
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
            <p className="text-d360-muted text-[10px] font-mono tracking-widest mb-3">HISTORICAL REFERENCES</p>
            {destination.sources.historical.map((s, i) => <p key={i} className="text-xs text-d360-muted mb-1.5 italic">{s}</p>)}
          </div>
          <div>
            <p className="text-d360-muted text-[10px] font-mono tracking-widest mb-3">VERIFICATION</p>
            <p className="text-xs text-d360-muted">Last verified: <span className="text-d360-ink font-medium">{destination.sources.lastVerified}</span></p>
            <p className="text-xs text-d360-muted mt-2">All information is cross-referenced with official tourism and archaeological sources.</p>
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
      <Hero destination={madangarh} />
      <QuickFacts facts={madangarh.quickFacts} />
      <WhyVisit destination={madangarh} />
      <DestinationStory destination={madangarh} />
      <HistoryTimeline destination={madangarh} />
      <CultureGrid destination={madangarh} />
      <FoodSection destination={madangarh} />
      <AttractionsGrid destination={madangarh} />
      <HiddenGems destination={madangarh} />
      <ThingsToDo destination={madangarh} />
      <NearbyPlaces destination={madangarh} />
      <HowToReach destination={madangarh} />
      <WhereToStay destination={madangarh} />
      <BestTime destination={madangarh} />
      <BudgetGuide destination={madangarh} />
      <Itineraries destination={madangarh} />
      <LocalExperiences destination={madangarh} />
      <MapSection destination={madangarh} />
      <AskD360 destination={madangarh} />
      <CommunityStories destination={madangarh} />
      <PracticalInfo />
      <SourcesTrust destination={madangarh} />
      <Footer />
    </div>
  )
}
