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

// ─── Jaichand Fort Data ────────────────────────────────────────────────────

const jaichand: Destination = {
  id: 'jaichand-fort-kannauj', slug: 'jaichand-fort-kannauj', name: 'Raja Jaichand Fort', localName: 'जयचंद का किला',
  destinationType: 'Ruined Imperial Fort / Archaeological Heritage Mound', country: 'India', state: 'Uttar Pradesh', district: 'Kannauj',
  shortDescription: 'All that remains of the fort from which Kannauj\'s last great Rajput emperor ruled a city so magnificent it was fought over for three centuries.',
  tags: ['Imperial Capital Ruins', 'Gahadavala Dynasty', 'Off-the-Beaten-Path', 'Folklore & Legend Trail', 'Living Craft & Industry', 'Pilgrimage & Temple Ghats'],
  hero: { image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancient Site, Sankissa-002.jpg?width=2000', poster: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' },
  quickFacts: { bestTime: 'October to March', duration: 'Half day (fort); 1-2 days (with Kannauj town)', budget: 'INR 800 - 4,000/day', destinationType: 'Ruined Imperial Fort / Archaeological Heritage Mound', difficulty: 'Easy', distance: 'Varies by origin city' },
  discoveryScore: { overall: 7.3, categories: [{ name: 'Popularity', score: 2 }, { name: 'Cultural Significance', score: 9 }, { name: 'Historical Weight', score: 9 }, { name: 'Uniqueness / Authenticity', score: 9 }] },
  editorial: { why: 'Nowhere else in North India can a visitor stand on the actual ground of a fort tied to one of Indian history\'s most romanticised royal rivalries - the Jaichand-Prithviraj-Samyogita triangle - and then, within the same afternoon, walk into a working perfumery using techniques essentially unchanged since the Mughal era.', story: 'Long before Delhi or Agra claimed the title, Kannauj was the throne that every ambitious dynasty in North India wanted to sit on. Known in antiquity as Kanyakubja and later as Mahodaya, the city rose to its first imperial peak in the 7th century under Emperor Harshavardhana, rose again under the Gurjara-Pratihara dynasty, and then a third and final time under the Gahadavala dynasty, whose most famous ruler was Raja Jaichand.', storyFull: 'Long before Delhi or Agra claimed the title, Kannauj was the throne that every ambitious dynasty in North India wanted to sit on. Known in antiquity as Kanyakubja and later as Mahodaya, the city rose to its first imperial peak in the 7th century under Emperor Harshavardhana, whose court the Chinese pilgrim Xuanzang described as home to over a hundred monasteries and thousands of debating monks; it rose again under the Gurjara-Pratihara dynasty, and then a third and final time under the Gahadavala dynasty, whose most famous - and most tragic - ruler was Raja Jaichand (Jayachandra), king from roughly 1170 to 1194 CE.\n\nThe fort that bears Jaichand\'s name today survives only as mounds, scattered wall fragments, and foundation traces on the outskirts of the modern town, but in Jaichand\'s time it anchored one of the wealthiest and most contested capitals in the subcontinent. Jaichand\'s reign is remembered as much for court intrigue as for military power: legend holds that his daughter Samyogita\'s swayamvara (self-choice marriage ceremony) at Kannauj was disrupted when Prithviraj Chauhan III of Delhi, her secret love, abducted her from under her father\'s nose - a rivalry immortalised in the medieval epic poem Prithviraj Raso and still sung in Bundelkhandi and Awadhi folk ballads today. That rivalry, whether or not it directly enabled Muhammad of Ghor\'s invasions, coincided with Jaichand\'s death in battle against Ghori\'s forces in 1193-94 CE, an event that historians frequently cite as one of the turning points that opened North India to Delhi Sultanate rule.\n\nToday the fort\'s remnants sit quietly amid farmland and village settlements, their stone-and-earth construction barely distinguishable from the mounds around them, while the wider ballad tradition of Alha-Udal - semi-historical warrior-heroes whose exploits are woven into the folk memory of this entire stretch of the Ganga plain - keeps Jaichand\'s era alive in oral culture even where formal archaeology has yet to fully uncover it. Modern Kannauj, meanwhile, has become world-famous for something entirely different: it is India\'s "Perfume Capital," home to a centuries-old attar (ittar) distillation tradition that adds a fragrant, living layer of heritage on top of the town\'s buried imperial past.' },
  history: { shortIntro: 'Kannauj rose to imperial prominence three times - under Harshavardhana, the Gurjara-Pratihara dynasty, and finally the Gahadavalas under Raja Jaichand - before Jaichand\'s 1193-94 defeat by Muhammad of Ghor opened North India to Delhi Sultanate rule.', timeline: [{ year: '3rd c. BCE onward', event: 'Known as Kanyakubja (and, in the Ramayana tradition, as Mahodaya); later capital of the Panchala Mahajanapada and the Ayudha dynasty.', era: 'Ancient' }, { year: '7th century CE', event: 'Kannauj reaches its first great imperial peak under Emperor Harshavardhana, who convened a landmark religious council in 643 CE and hosted the Chinese pilgrim Xuanzang.', era: 'Early Medieval' }, { year: '9th-10th century CE', event: 'The city becomes the capital (as Mahodaya) of the Gurjara-Pratihara dynasty, a period of renewed imperial grandeur and artistic patronage.', era: 'Early Medieval' }, { year: '1114-1154 CE', event: 'Kannauj recovers a large measure of its former importance under regional rulers, setting the stage for Gahadavala dominance.', era: 'Medieval' }, { year: '1170-1194 CE', event: 'The Gahadavala dynasty, under Raja Jaichand (Jayachandra), rules Kannauj at the height of its medieval prominence.', era: 'Medieval' }, { year: 'Legend', event: 'Jaichand\'s daughter Samyogita\'s swayamvara at Kannauj is disrupted when Prithviraj Chauhan III of Delhi abducts her, sparking a lasting rivalry immortalised in the Prithviraj Raso.', era: 'Medieval' }, { year: '1193-94 CE', event: 'Muhammad of Ghor invades North India; Jaichand is killed in battle, a defeat historians cite as accelerating the fall of independent Rajput power and the establishment of the Delhi Sultanate.', era: 'Medieval' }, { year: 'Post-1194', event: 'Jaichand\'s son Harichandra continues to hold Kannauj even after the wider region passed under Muslim political supremacy.', era: 'Late Medieval' }, { year: '1233-34 CE', event: 'Sultan Iltutmish orders the Kannauj garrison to join an imperial expedition against Kalinjar, confirming the fort\'s continued military relevance.', era: 'Delhi Sultanate' }, { year: '13th-14th century CE', event: 'Kannauj and its forts pass through Mamluk, Khalji, and Tughlaq control.', era: 'Delhi Sultanate' }, { year: '1392 CE', event: 'Local Rajput clans, in collusion with Chauhans and Solankis, rise in open rebellion against Delhi Sultanate authority in the Kannauj region.', era: 'Delhi Sultanate' }, { year: 'Later centuries to present', event: 'The fort gradually falls into ruin, while the wider Kannauj region shifts its economic identity toward attar (perfume) production, tobacco, and rose-water manufacturing.', era: 'Modern' }] },
  culture: [{ title: 'Ganga-Jamuni Tehzeeb', description: 'Kannauj\'s composite Hindu-Muslim cultural tradition, reflected in Hindi being the everyday language while Urdu remains widely understood, and in shared devotional sites like the Bala Pir Dargah.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { title: 'Alha-Udal Ballad Tradition', description: 'The oral balladry of semi-legendary warrior heroes Alha and Udal, sung across the district\'s villages and closely associated with forts and mounds throughout the wider Kannauj region.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancient Site, Sankissa-002.jpg?width=1600' }, { title: 'Deg-Bhapka Attar Distillation', description: 'A generations-old craft lineage of ittar (attar) perfumery, using traditional copper stills (degs) and receiving vessels (bhapkas) to produce natural fragrances from roses, sandalwood, herbs and spices.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Camel skin Perfume Bottles from Kannauj.jpg?width=1600' }, { title: 'Ghat-Side Festivals', description: 'Ganga Dashahara, Kartik Purnima and Ashadh Purnima bring ritual bathing and festivity to Kannauj\'s Ganga ghats, particularly Mehndi (Mahadevi) Ghat and Jalesar Ganga Ghat.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { title: 'Annual Urs at Bala Pir Dargah', description: 'A vibrant Sufi festival marked by chadar offerings, incense and devotional music, drawing devotees across faiths.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dargah of Sufi saint Moinuddin Chishti Ajmer India (5).JPG?width=1600' }],
  food: [{ name: 'Bedmi Puri', description: 'A classic North Indian breakfast dish served with spicy potato curry.', category: 'Street Food', price: 'INR 40-100', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khasta kachori.jpg?width=1600' }, { name: 'Kachori', description: 'Fried pastry filled with spiced lentils or peas, served with tamarind chutney.', category: 'Street Food', price: 'INR 30-80', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khasta kachori.jpg?width=1600' }, { name: 'Kannauj-style Petha', description: 'A sweet made from ash gourd, in the same tradition as Agra\'s famous petha.', category: 'Dessert', price: 'INR 100-250/kg', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Petha-from-Agra.JPG?width=1600' }, { name: 'Biryani, Kebabs & Nihari', description: 'Non-vegetarian specialities reflecting centuries of Mughal-era culinary influence.', category: 'Main Course', price: 'INR 150-400', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nihari, kabab and tandoori roti.jpg?width=1600' }, { name: 'Rose Water & Rose-Based Preparations', description: 'Beverages and sweets drawing on the district\'s own rose cultivation for the attar industry.', category: 'Beverage', price: 'INR 50-200', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Camel skin Perfume Bottles from Kannauj.jpg?width=1600' }],
  attractions: [{ id: 'raja-jaichand-fort', name: 'Raja Jaichand Fort', category: 'Main Landmark / Historical', description: 'The mounds, wall fragments, and foundation remains of the 12th-century Gahadavala imperial fort, associated with Raja Jaichand and the Samyogita-Prithviraj legend.', duration: '1-2 Hours', distance: 'Outskirts of Kannauj city', score: 9, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancient Site, Sankissa-002.jpg?width=1600' }, { id: 'alha-udal-fort-mounds', name: 'Alha-Udal Fort / Mound Sites', category: 'Hidden Gem / Folklore Site', description: 'Scattered fort remains and mounds across nearby villages linked to the Alha-Udal ballad tradition, now largely merged into farmland; local permission advised.', duration: '1 Hour', distance: 'Within 10 km', score: 7, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancient Site, Sankissa-002.jpg?width=1600' }, { id: 'archaeological-museum-kannauj', name: 'Archaeological Museum, Kannauj', category: 'Museum / Cultural Centre', description: 'A museum on G.T. Road housing clay idols and antiquities spanning the Maurya, Shunga, Kushan, Gupta, post-Gupta, and Harsha periods; entry fee approximately INR 5; closed Mondays.', duration: '1-1.5 Hours', distance: 'Near Makrand Nagar / Safdarganj', score: 8, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Late Medieval Indian Art - Sculpture of Vajra Tara, Gahadavala Dynasty, Sarnath, Uttar Pradesh, 11th C. AD.jpg?width=1600' }, { id: 'ffdc', name: 'FFDC (Fragrance & Flavour Development Centre)', category: 'Local Experience / Industrial Heritage', description: 'A government research and training institute bridging Kannauj\'s traditional perfume craft with modern science; a unique stop for understanding the \'Perfume City\' legacy.', duration: '1 Hour', distance: 'Kannauj town', score: 7.5, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Camel skin Perfume Bottles from Kannauj.jpg?width=1600' }, { id: 'mehndi-ghat', name: 'Mehndi Ghat (Mahadevi Ghat)', category: 'Religious / Spiritual Site', description: 'A Ganga-side ghat renamed after the immersion of Hindi poetess Mahadevi Verma\'s ashes in 1987; home to a South Indian-style Shiva temple and a major venue for Ganga Dashahara and Kartik Purnima.', duration: '1 Hour', distance: 'Near Mehndipur village', score: 8, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { id: 'jalesar-ganga-ghat', name: 'Jalesar Ganga Ghat', category: 'Religious / Spiritual Site', description: 'A serene riverside ghat for bathing, prayer, and quiet reflection, especially atmospheric at sunrise and sunset.', duration: '45 Minutes-1 Hour', distance: 'Within 5 km', score: 7, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { id: 'gauri-shankar-temple', name: 'Gauri Shankar Temple', category: 'Religious / Spiritual Site', description: 'A prominent Shiva temple linked to Kannauj\'s Harshavardhana-era religious heritage, especially vibrant during Maha Shivaratri.', duration: '30-45 Minutes', distance: 'Kannauj town', score: 7, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { id: 'chiyasar-ghat', name: 'Chiyasar Ghat - Chyavan Rishi Ashram', category: 'Religious / Spiritual Site', description: 'A Ganga-side ashram complex associated with Sage Chyavan, traditionally credited with originating Chyawanprash.', duration: '45 Minutes', distance: 'Within 5 km', score: 6.5, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { id: 'bala-pir-dargah', name: 'Bala Pir Dargah', category: 'Religious / Spiritual Site', description: 'A revered Sufi shrine symbolising Kannauj\'s Ganga-Jamuni composite culture, especially lively during its annual Urs festival.', duration: '30-45 Minutes', distance: 'Kannauj town', score: 7, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dargah of Sufi saint Moinuddin Chishti Ajmer India (5).JPG?width=1600' }, { id: 'attar-distilleries', name: 'Attar (Ittar) Distilleries, Old Kannauj', category: 'Local Market / Craft Experience', description: 'Family-run perfume workshops using the centuries-old deg-bhapka distillation method to produce natural attars from roses, sandalwood, herbs, and spices.', duration: '1-2 Hours', distance: 'Old Kannauj town', score: 9, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Camel skin Perfume Bottles from Kannauj.jpg?width=1600' }, { id: 'lakh-bahosi-bird-sanctuary', name: 'Lakh Bahosi Bird Sanctuary', category: 'Nature / Scenic Spot', description: 'An 80 sq. km wetland sanctuary near Tirwa hosting Siberian cranes, sarus cranes, and dozens of other resident and migratory bird species, best visited November-March.', duration: '2-3 Hours', distance: '~15 km from Kannauj', score: 8, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sarus Crane Duet.jpg?width=1600' }],
  hiddenGems: [{ name: 'Alha-Udal Fort / Mound Sites', why: 'Scattered fort remains woven into local folklore and village place-names, largely reclaimed by farmland and rarely visited by outsiders.', distance: 'Within 10 km', duration: '1 Hour', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancient Site, Sankissa-002.jpg?width=1600' }, { name: 'Daipur Village (Arth Ganga Trail)', why: 'A government-recognised community and river-conservation eco-site known for Gangetic river dolphin sightings, off the typical tourist radar.', distance: 'Within 10 km', duration: '1-2 Hours', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { name: 'Chiyasar Ghat - Chyavan Rishi Ashram', why: 'A quiet Ganga-side ashram linked to the sage credited with originating Chyawanprash, overshadowed by Kannauj\'s bigger ghats.', distance: 'Within 5 km', duration: '45 Minutes', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { name: 'FFDC (Fragrance & Flavour Development Centre)', why: 'A research institute rarely visited by tourists, offering a technical counterpoint to the family-run attar workshops.', distance: 'Kannauj town', duration: '1 Hour', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Camel skin Perfume Bottles from Kannauj.jpg?width=1600' }],
  thingsToDo: [{ activity: 'Explore the Raja Jaichand Fort mounds with a local guide', duration: '1-2 Hours', cost: 'Free (landowner permission advised)', difficulty: 'Easy', bestTime: 'Morning', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancient Site, Sankissa-002.jpg?width=1600' }, { activity: 'Watch the deg-bhapka attar distillation process at a family-run perfumery', duration: '1-2 Hours', cost: 'Free to visit; purchases optional', difficulty: 'Easy', bestTime: 'Daytime', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Camel skin Perfume Bottles from Kannauj.jpg?width=1600' }, { activity: 'Tour the Archaeological Museum\'s Maurya-to-Harsha antiquities', duration: '1-1.5 Hours', cost: '~INR 5 entry', difficulty: 'Easy', bestTime: 'Afternoon (closed Mondays)', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Late Medieval Indian Art - Sculpture of Vajra Tara, Gahadavala Dynasty, Sarnath, Uttar Pradesh, 11th C. AD.jpg?width=1600' }, { activity: 'Sunset rituals and river views at Mehndi Ghat or Jalesar Ganga Ghat', duration: '1 Hour', cost: 'Free', difficulty: 'Easy', bestTime: 'Evening', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { activity: 'Birdwatching at Lakh Bahosi Bird Sanctuary', duration: '2-3 Hours', cost: '~INR 30 entry', difficulty: 'Easy', bestTime: 'November-March, early morning', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sarus Crane Duet.jpg?width=1600' }],
  nearbyPlaces: [{ name: 'Rizgir Village (Alha-Udal mounds)', distance: 'Within 10 km', type: 'Folklore / Archaeological', travelTime: '20-30 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancient Site, Sankissa-002.jpg?width=1600' }, { name: 'Daipur Village (Arth Ganga Trail)', distance: 'Within 10 km', type: 'Eco / Nature', travelTime: '20-30 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { name: 'Tirwa Town & Annapurna Devi Temple', distance: '~25 km', type: 'Religious / Nature', travelTime: '40-50 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { name: 'Lakh Bahosi Bird Sanctuary', distance: '~15 km', type: 'Nature / Wildlife', travelTime: '25-30 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sarus Crane Duet.jpg?width=1600' }, { name: 'Kanpur', distance: '~80 km', type: 'City / 1857 Heritage', travelTime: '~1.5-2 hrs', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ganga Barrage Kanpur.jpg?width=1600' }],
  travel: { air: { airport: 'Kanpur (Ganesh Shanker Vidyarthi / Chakeri) Airport', distance: '76-100 km', time: '~1.5-2 hrs' }, rail: { station: 'Kannauj Junction (KJN)', distance: 'Within Kannauj town', time: 'N/A' }, road: { highway: 'NH 91 (GT Road corridor)', distance: '~80 km from Kanpur', time: '~1.5-2 hrs from Kanpur' } },
  stay: { categories: [{ type: 'Budget', range: 'INR 800-1,500/day', options: ['Budget hotels and guesthouses in Kannauj town near the bazaar and railway station'] }, { type: 'Mid-range', range: 'INR 2,000-4,000/day', options: ['Mid-range and business hotels in Kanpur (~80 km away)'] }] },
  bestTime: { months: [{ month: 'Jan', status: 'ideal' }, { month: 'Feb', status: 'ideal' }, { month: 'Mar', status: 'good' }, { month: 'Apr', status: 'avoid' }, { month: 'May', status: 'avoid' }, { month: 'Jun', status: 'avoid' }, { month: 'Jul', status: 'avoid' }, { month: 'Aug', status: 'avoid' }, { month: 'Sep', status: 'good' }, { month: 'Oct', status: 'ideal' }, { month: 'Nov', status: 'ideal' }, { month: 'Dec', status: 'ideal' }] },
  budget: { tiers: [{ tier: 'Budget', perDay: 'INR 800-1,500', breakdown: [{ category: 'Local Transport', amount: 'INR 150-300' }, { category: 'Food', amount: 'INR 250-600' }, { category: 'Entry Fees', amount: 'INR 5-30' }, { category: 'Accommodation', amount: 'INR 400-600' }] }, { tier: 'Mid-range', perDay: 'INR 2,000-4,000', breakdown: [{ category: 'Private Taxi Hire', amount: 'INR 1,000-2,000' }, { category: 'Food', amount: 'INR 400-800' }, { category: 'Accommodation', amount: 'INR 800-1,500' }, { category: 'Entry Fees & Souvenirs', amount: 'INR 100-500' }] }] },
  itineraries: { '1 Day': [{ day: 1, schedule: [{ time: 'Morning', place: 'Raja Jaichand Fort mounds, exploring wall fragments and foundation remains with a local guide', duration: '1-2 hrs' }, { time: 'Afternoon', place: 'Archaeological Museum, then an attar distillery tour to watch the deg-bhapka process', duration: '2-3 hrs' }, { time: 'Evening', place: 'Sunset rituals and river views at Mehndi (Mahadevi) Ghat or Jalesar Ganga Ghat', duration: '1 hr' }] }], '2 Days': [{ day: 1, schedule: [{ time: 'Arrival', place: 'Overnight in Kannauj or Kanpur; afternoon exploration of the fort mounds, the Archaeological Museum, and the Gauri Shankar Temple', duration: 'Half day' }] }, { day: 2, schedule: [{ time: 'Morning', place: 'Attar workshop and the FFDC fragrance research centre', duration: '2 hrs' }, { time: 'Afternoon', place: 'Bala Pir Dargah and Chiyasar Ghat', duration: '2 hrs' }] }], '3 Days': [{ day: 1, schedule: [{ time: 'Arrival', place: 'Overnight in Kannauj or Kanpur; afternoon exploration of the fort mounds, the Archaeological Museum, and the Gauri Shankar Temple', duration: 'Half day' }] }, { day: 2, schedule: [{ time: 'Morning', place: 'Attar workshop and the FFDC fragrance research centre', duration: '2 hrs' }, { time: 'Afternoon', place: 'Bala Pir Dargah and Chiyasar Ghat', duration: '2 hrs' }] }, { day: 3, schedule: [{ time: 'Full Day', place: 'Excursion to Lakh Bahosi Bird Sanctuary for birdwatching, or a \'Two Ancient Capitals\' day trip combining Jaichand Fort with Kanpur\'s 1857-linked heritage sites', duration: 'Full day' }] }] },
  experiences: [{ title: 'Deg-Bhapka Attar Distillation Workshop Visit', duration: '1-2 Hours', price: 'Free to visit; purchases optional', category: 'Craft Experience', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Camel skin Perfume Bottles from Kannauj.jpg?width=1600' }, { title: 'Guided Walk Through the Jaichand Fort Mounds', duration: '1-2 Hours', price: 'Variable (guide fee)', category: 'Heritage Walk', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ancient Site, Sankissa-002.jpg?width=1600' }, { title: 'FFDC Fragrance Research Centre Tour', duration: '1 Hour', price: 'Variable', category: 'Industrial Heritage', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Camel skin Perfume Bottles from Kannauj.jpg?width=1600' }, { title: 'Ghat-Side Morning or Evening Ritual Visit', duration: '1 Hour', price: 'Free', category: 'Religious / Cultural', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mehndi Ghat, Ganga River, Kannauj.jpg?width=1600' }, { title: 'Winter Birdwatching at Lakh Bahosi Bird Sanctuary', duration: '2-3 Hours', price: '~INR 30 entry', category: 'Nature / Wildlife', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sarus Crane Duet.jpg?width=1600' }],
  aiPrompts: ['What really happened between Raja Jaichand and Prithviraj Chauhan over Samyogita\'s swayamvara?', 'How is traditional Kannauj attar actually made using the deg-bhapka method, and can I watch it in person?', 'Plan a half-day walking route covering Jaichand Fort, the Archaeological Museum and an attar workshop.', 'What is left standing today at Raja Jaichand\'s fort, and do I need permission to visit it?', 'Is it worth combining a trip to Kannauj with the Lakh Bahosi Bird Sanctuary, and what\'s the best season for both?'],
  reviews: [],
  sources: { official: ['Government of Uttar Pradesh, District Kannauj official portal (kannauj.nic.in)', 'Government of Uttar Pradesh, District Farrukhabad official portal (farrukhabad.nic.in)'], historical: ['Wikipedia - Kannauj, Gahadavala dynasty, Petha', 'The Indosphere - The Rise & Fall of Kannauj (606-1194 CE)', 'National Geographic - How did Kannauj become the perfume capital of India?', 'Sage Journals - The Ittar Industry of Kannauj'], lastVerified: '2026-09-17' }
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
              {[['Explore', '#attractions'], ['Destinations', '#destinations'], ['Hidden Gems', '#hidden-gems'], ['Plan a Trip', '#plan-a-trip'], ['Experiences', '#experiences']].map(([item, href]) => (
                <a key={item} href={href} className={`text-sm font-medium transition-colors hover:text-d360-primary ${scrolled ? 'text-d360-ink' : 'text-white/90'}`}>{item}</a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <button onClick={() => document.getElementById('attractions')?.scrollIntoView({ behavior: 'smooth' })} className={`transition-colors ${scrolled ? 'text-d360-muted hover:text-d360-ink' : 'text-white/80 hover:text-white'}`}><IconSearch /></button>
            <a href="#hidden-gems" className={`text-sm font-medium transition-colors ${scrolled ? 'text-d360-muted hover:text-d360-ink' : 'text-white/80 hover:text-white'}`}>Saved</a>
            <a href="#ask-d360" className={`text-sm font-medium transition-colors ${scrolled ? 'text-d360-muted hover:text-d360-ink' : 'text-white/80 hover:text-white'}`}>Profile</a>
            <button onClick={() => document.getElementById('attractions')?.scrollIntoView({ behavior: 'smooth' })} className="px-4 py-2 bg-d360-primary text-white text-sm font-medium hover:bg-d360-primary/90 transition-colors" style={{ borderRadius: '2px' }}>Explore Places</button>
          </div>
          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => { setMobileOpen(false); document.getElementById('attractions')?.scrollIntoView({ behavior: 'smooth' }) }} className={scrolled ? 'text-d360-ink' : 'text-white'}><IconSearch /></button>
            <button className={scrolled ? 'text-d360-ink' : 'text-white'} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-d360-bg border-t border-d360-border px-6 py-4 flex flex-col gap-4">
          {[['Explore', '#attractions'], ['Destinations', '#destinations'], ['Hidden Gems', '#hidden-gems'], ['Plan a Trip', '#plan-a-trip'], ['Experiences', '#experiences'], ['Saved', '#hidden-gems'], ['Profile', '#ask-d360']].map(([item, href]) => (
            <a key={item} href={href} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-d360-ink py-1 border-b border-d360-border last:border-0">{item}</a>
          ))}
          <button onClick={() => { setMobileOpen(false); document.getElementById('attractions')?.scrollIntoView({ behavior: 'smooth' }) }} className="mt-2 py-3 bg-d360-primary text-white text-sm font-medium" style={{ borderRadius: '2px' }}>Explore Places</button>
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
            <button onClick={() => document.getElementById('attractions')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 px-6 py-3 bg-d360-primary text-white text-sm font-medium hover:bg-d360-primary/90 transition-colors" style={{ borderRadius: '2px' }}>Explore {destination.name} <IconArrowRight /></button>
            <button onClick={() => setSaved(!saved)} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border transition-colors ${saved ? 'bg-white text-d360-primary border-white' : 'bg-transparent text-white border-white/50 hover:border-white'}`} style={{ borderRadius: '2px' }}>
              <IconBookmark active={saved} /> {saved ? 'Saved' : 'Save Place'}
            </button>
            <button onClick={() => document.getElementById('ask-d360')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-white border border-white/50 hover:border-white transition-colors" style={{ borderRadius: '2px' }}>
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
              <p className="font-display text-xl font-medium">1504 AD</p>
              <p className="text-xs text-white/60 mt-1">Lodi Dynasty</p>
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
    <section id="attractions" className="bg-d360-surface py-16 lg:py-24">
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
    <section id="hidden-gems" className="bg-d360-ink py-16 lg:py-24">
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
    <section id="destinations" className="bg-d360-surface py-16 lg:py-24">
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
          <button onClick={() => document.getElementById('ask-d360')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 flex items-center gap-2 px-6 py-3 bg-d360-primary text-white text-sm font-medium hover:bg-d360-primary/90 transition-colors" style={{ borderRadius: '2px' }}>Plan My Budget <IconArrowRight /></button>
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
    <section id="plan-a-trip" className="bg-d360-bg py-16 lg:py-24">
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
        <button onClick={() => document.getElementById('ask-d360')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 flex items-center gap-2 px-6 py-3 bg-d360-primary text-white text-sm font-medium hover:bg-d360-primary/90 transition-colors" style={{ borderRadius: '2px' }}>Use This Plan <IconArrowRight /></button>
      </div>
    </section>
  )
}

// ─── Local Experiences ────────────────────────────────────────────────────────

function LocalExperiences({ destination }: { destination: Destination }) {
  return (
    <section id="experiences" className="bg-d360-surface py-16 lg:py-24">
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
            <a href={`https://www.google.com/maps/search/${encodeURIComponent(destination.name + ', ' + destination.state)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-d360-primary hover:gap-3 transition-all whitespace-nowrap">View Full Map <IconArrowRight /></a>
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
          {[{ top: '35%', left: '45%', label: 'Raja Jaichand Fort' }, { top: '42%', left: '38%', label: 'Archaeological Museum' }, { top: '28%', left: '52%', label: 'Mehndi Ghat' }].map(pin => (
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
    <section id="ask-d360" className="bg-d360-ink py-16 lg:py-24">
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
                  {selected?.includes('Samyogita') && `Legend holds that Jaichand staged his daughter Samyogita's swayamvara at Kannauj while pointedly excluding Prithviraj Chauhan III of Delhi, her secret love — so Prithviraj arrived anyway and abducted her from under her father's nose, sparking a lasting royal rivalry immortalised in the medieval epic Prithviraj Raso. Whether or not it directly enabled Muhammad of Ghor's invasion, the feud coincided with Jaichand's death in battle in 1193-94 CE, a defeat historians cite as a turning point that opened North India to Delhi Sultanate rule.`}
                  {selected?.includes('deg-bhapka') && `Kannauj's attar is made using the centuries-old deg-bhapka method: copper stills (degs) are loaded with rose petals, sandalwood or other botanicals and heated over an open flame, with the vapour condensing into receiving vessels (bhapkas) cooled in water troughs before the finished attar is aged in camel-leather kuppi pouches. Several family-run distilleries in old Kannauj welcome visitors to watch the process firsthand, and the government-run FFDC nearby offers a more technical look at the craft.`}
                  {selected?.includes('half-day walking route') && `Start at the Raja Jaichand Fort mounds to trace the outline of the old imperial structure with a local guide. From there, head to the Archaeological Museum on G.T. Road for antiquities spanning the Maurya through Harsha periods (closed Mondays, ~INR 5 entry). Finish in the old town at a working attar distillery to watch the deg-bhapka process, then close the day at Mehndi Ghat for sunset over the Ganga.`}
                  {selected?.includes('do I need permission') && `Today the fort survives only as mounds, scattered wall fragments and foundation traces on the outskirts of Kannauj, barely distinguishable from the surrounding farmland — there is no standing structure. The site sits on largely unmarked private/agricultural land, so visitors should seek permission from local landowners or villagers, and arranging a local guide is strongly advised.`}
                  {selected?.includes('Lakh Bahosi') && `Yes — Lakh Bahosi Bird Sanctuary is only about 15 km from Kannauj and pairs naturally with a fort-and-heritage day, especially since both share the same best season. The sanctuary hosts Siberian cranes, sarus cranes and dozens of other species, and is best visited November to March, peaking December to February — the same cool, dry window that's ideal for walking the fort mounds and ghats.`}
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
    { title: 'Safety', content: 'Kannauj is generally safe for travellers, with no major tourist scams reported since organised tourism remains limited. The fort mounds and Alha-Udal sites sit on or near private agricultural land, so always seek permission from local landowners or villagers rather than entering unannounced.' },
    { title: 'Local Transport', content: 'Auto-rickshaws, cycle-rickshaws and shared tempos are the main modes of transport within Kannauj town. Reaching the fort mounds and outlying village sites typically requires a hired taxi or auto, followed by some walking across open or agricultural land.' },
    { title: 'Photography Rules', content: 'Photography is generally welcome at the fort mounds, ghats and the Archaeological Museum. Ask permission before photographing worshippers at temples and the dargah, or attar artisans at work inside family-run distilleries.' },
    { title: 'Dress & Etiquette', content: 'Dress modestly at temples, ghats and the Bala Pir Dargah, and remove footwear before entering shrine precincts. Treat the fort mounds as working agricultural land — seek permission from villagers before walking onto private plots.' },
    { title: 'Emergency Information', content: 'Basic police and medical facilities are available in Kannauj town; more comprehensive hospital care is in Kanpur, roughly 80 km away. Note the nearest local police thana and keep emergency numbers handy before heading to remote mound and village sites.' },
    { title: 'Travel Tips', content: 'Visit the fort mounds and Archaeological Museum in the cooler morning hours, and save the attar distillery tour for whenever workshops are active. Seasonal standing crops can make the mounds difficult to access outside the October-February window, so plan accordingly.' }
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
      <Hero destination={jaichand} />
      <QuickFacts facts={jaichand.quickFacts} />
      <WhyVisit destination={jaichand} />
      <DestinationStory destination={jaichand} />
      <HistoryTimeline destination={jaichand} />
      <CultureGrid destination={jaichand} />
      <FoodSection destination={jaichand} />
      <AttractionsGrid destination={jaichand} />
      <HiddenGems destination={jaichand} />
      <ThingsToDo destination={jaichand} />
      <NearbyPlaces destination={jaichand} />
      <HowToReach destination={jaichand} />
      <WhereToStay destination={jaichand} />
      <BestTime destination={jaichand} />
      <BudgetGuide destination={jaichand} />
      <Itineraries destination={jaichand} />
      <LocalExperiences destination={jaichand} />
      <MapSection destination={jaichand} />
      <AskD360 destination={jaichand} />
      <CommunityStories destination={jaichand} />
      <PracticalInfo />
      <SourcesTrust destination={jaichand} />
      <Footer />
    </div>
  )
}
