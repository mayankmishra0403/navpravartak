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

// ─── Mathura Data ───────────────────────────────────────────────────────────

const mathura: Destination = {
  id: 'up-mathura', slug: 'mathura', name: 'Mathura', localName: 'मथुरा',
  destinationType: 'Pilgrimage City', country: 'India', state: 'Uttar Pradesh', district: 'Mathura',
  shortDescription: 'The ancient city on the Yamuna where Krishna was born — a Kushan-era art capital, one of Hinduism\'s seven sacred Sapta Puri cities, and the gateway to the entire Braj pilgrimage circuit.',
  tags: ['Krishna', 'Braj', 'Pilgrimage', 'Sapta Puri', 'Heritage', 'Kushan Art', 'Temples', 'Yamuna', 'Holi', 'Janmashtami'],
  hero: { image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vishram Ghat.jpg?width=2000', poster: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mathura Temple-Mathura-India0002.JPG?width=2000' },
  quickFacts: { bestTime: 'October to March', duration: '1 day for the city, 3–4 days for Braj', budget: '₹800 – ₹2,500 per day', destinationType: 'Pilgrimage City', difficulty: 'Easy in the city, Moderate for the Braj circuit', distance: '150 km from Delhi, 58 km from Agra' },
  discoveryScore: { overall: 9.2, categories: [{ name: 'Cultural Significance', score: 10 }, { name: 'Historical Weight', score: 10 }, { name: 'Uniqueness', score: 9 }, { name: 'Popularity', score: 9 }, { name: 'Accessibility', score: 8 }, { name: 'Solo Travel Safety', score: 7 }] },
  editorial: { why: 'Most visitors see one temple and leave 2,500 years behind. Mathura runs unbroken from a 6th-century-BCE mahajanapada capital to a working district headquarters, and the layers are all still standing — Kushan sculpture in the museum, a 1570 memorial tower by the river, an 1814 temple, a 1982 complex on the traditional prison site.', story: 'Mathura is one of India\'s oldest continuously inhabited cities. It was the capital of the Surasena Mahajanapada by the 6th century BCE, a Kushan imperial capital and art metropolis by the 1st century CE, and for Hindus it is the place where Krishna was born in Kansa\'s prison cell. It is also the practical gateway to Braj Bhoomi: Vrindavan, Gokul, Govardhan, Barsana and Nandgaon all sit within an hour.', storyFull: 'The Ramayana identifies this site as Madhuvan, where the Ikshvaku prince Shatrughna slew the demon Lavanasura and founded a city — Madhuvan became Madhupura, and Madhupura became Mathura. By the 6th century BCE it was the capital of the Surasena Mahajanapada, one of the sixteen great kingdoms of ancient India, recorded by the Greek geographer Megasthenes as Méthora.\n\nIts zenith came under the Kushans in the 1st to 3rd centuries CE, when Mathura served as one of two imperial capitals alongside Purushapura, modern Peshawar. Emperor Kanishka hosted the Third Buddhist Council here, and the city gave rise to the Mathura School of Art — a sculptural tradition in distinctive mottled red sandstone, contemporaneous with Gandhara, that produced some of the earliest anthropomorphic images of the Buddha alongside Jain and Hindu sculpture. The Chinese pilgrim Xuanzang, visiting in 634 CE, counted twenty Buddhist monasteries here.\n\nFor Hindus, Mathura\'s deepest significance is as Krishna\'s birthplace — born in a prison cell to Devaki and Vasudev, held by the tyrant Kansa, his own maternal uncle, whom he would later kill to free the city. The Shri Krishna Janmabhoomi complex stands on the traditional prison site; its temples were destroyed and rebuilt repeatedly across the centuries, including in Mahmud of Ghazni\'s sack of 1018 CE and under Sikandar Lodi. The present complex was built between 1953 and 1982, adjoining the historic Shahi Idgah mosque — a site subject to ongoing litigation, which visitors should approach with sensitivity while following local guidance.\n\nToday the city runs on two rhythms at once: an ordinary North Indian district headquarters of markets, offices and colleges, and an intensely active pilgrimage economy around Janmabhoomi, Dwarkadhish and the Yamuna ghats. Braj Bhasha is still the everyday dialect. And because Vrindavan is 15 km away, Gokul 16, Govardhan 22 and Barsana 45, Mathura is where a Braj trip is best based.' },
  history: { shortIntro: 'From a Ramayana-era forest settlement to a Surasena capital, a Kushan art metropolis, a Buddhist monastic centre and a living temple city — Mathura\'s urban history runs continuously for more than 2,500 years.', timeline: [{ year: 'c. 1100 BCE', event: 'Traditional settlement date. The Ramayana places Madhuvan here, founded by Shatrughna after slaying the demon Lavanasura.', era: 'Legendary' }, { year: '6th century BCE', event: 'Capital of the Surasena Mahajanapada, one of the sixteen great kingdoms of ancient India. Later recorded by Megasthenes as Méthora.', era: 'Mahajanapada' }, { year: '4th–2nd century BCE', event: 'Mauryan rule, followed by brief Indo-Greek influence and Indo-Scythian (Saka) conquest in the 1st century BCE.', era: 'Mauryan' }, { year: '1st–3rd century CE', event: 'Kushan zenith. One of two imperial capitals; Kanishka hosts the Third Buddhist Council; the Mathura School of Art flourishes in mottled red sandstone.', era: 'Kushan' }, { year: 'c. 400 CE', event: 'The Chinese pilgrim Faxian records Mathura as a major centre of Buddhism.', era: 'Gupta' }, { year: '634 CE', event: 'Xuanzang, calling the city Mot\'ulo, counts twenty Buddhist monasteries and five Brahmanical temples.', era: 'Gupta' }, { year: '1018 CE', event: 'Mathura is sacked by Mahmud of Ghazni and many of its temples destroyed.', era: 'Medieval' }, { year: '1489–1517 CE', event: 'Further temple destruction under Sikandar Lodi of the Delhi Sultanate.', era: 'Sultanate' }, { year: '1570 CE', event: 'Sati Burj, a four-storeyed memorial tower, is raised near Vishram Ghat by the son of Bihari Mal of Jaipur.', era: 'Mughal' }, { year: '1814 CE', event: 'Seth Gokul Das Parikh, treasurer of Gwalior State, builds the Dwarkadhish (Jagat Mandir) Temple in Rajasthani style.', era: 'Colonial' }, { year: '1944–1982 CE', event: 'Madan Mohan Malaviya buys the Janmabhoomi land in 1944; the Trust forms in 1951 under Jugal Kishore Birla; the present complex is built between 1953 and 1982.', era: 'Modern' }] },
  culture: [{ title: 'The Mathura School of Art', description: 'The city\'s most internationally significant legacy — Kushan and Gupta-era sculpture in mottled red sandstone quarried near Sikri, including some of the earliest anthropomorphic Buddha images ever carved, alongside Jain and Hindu work. Exported across north-central India in antiquity and now held at the Government Museum.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Inscribed Seated Buddha Image in Abhaya Mudra - Kushan Period - Katra Keshav Dev - ACCN A-1 - Government Museum - Mathura 2013-02-24 5972.JPG?width=1600' }, { title: 'Janmashtami', description: 'Krishna\'s birthday and Mathura\'s single biggest festival, marked with midnight rituals, processions and enormous crowds across the Mathura–Vrindavan region. Falls in August, by the lunar calendar.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Krishna Janmashtami.jpg?width=1600' }, { title: 'Lathmar Holi at Barsana and Nandgaon', description: 'A few days before the main Holi, the women of Barsana drive back the men of Nandgaon with sticks amid clouds of colour. Extraordinary, extremely crowded, and world-famous — book accommodation across Braj well in advance.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Barsana Holi Festival.jpg?width=1600' }, { title: 'Govardhan Puja and Annakut', description: 'Held the day after Diwali, commemorating Krishna\'s lifting of Govardhan Hill to shelter the villagers of Braj. Marked by Annakut — a mountain of food offerings — and elaborately decorated cattle.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Govardhan pooja.jpg?width=1600' }, { title: 'Braj Bhasha, Ras Leela and Kirtan', description: 'Braj Bhasha remains the everyday spoken dialect alongside Hindi. Ras Leela dance-drama re-enacting Krishna\'s pastimes, Braj folk music and devotional kirtan are part of ordinary cultural life across the region, not staged performance.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Radha Krishna Raas Leela-006.jpg?width=1600' }, { title: 'Temple etiquette', description: 'Modest dress and removal of footwear are expected at every temple. Photography is restricted in parts of the Krishna Janmabhoomi complex for security reasons — check current rules on arrival. Temple precincts maintain a strong vegetarian, sattvic food culture.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dwarkadhish Temple 01.JPG?width=1600' }],
  food: [{ name: 'Mathura Peda', description: 'The city\'s signature sweet — brown, square khoya fudge with ghee, sugar and cardamom. Mathura is regarded as the original source of the peda tradition now found across North India. Brijwasi Mithaiwala near Holi Gate is the celebrated address.', category: 'Sweet', price: '₹400–₹600 per kg', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Milk Peda.JPG?width=1600' }, { name: 'Brijwasi Kachori', description: 'Spicy lentil-stuffed kachoris served with tamarind chutney — the classic Mathura street breakfast, eaten standing up in the lanes around Dwarkadhish.', category: 'Street Food', price: '₹30–₹60 per plate', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khasta kachori.jpg?width=1600' }, { name: 'Rabri', description: 'Slow-cooked thickened milk, layered and studded with nuts. Found on every other corner of the old city and best eaten cold on a winter morning.', category: 'Sweet', price: '₹40–₹80 per bowl', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Milk Peda.JPG?width=1600' }, { name: 'Lassi', description: 'Thick yoghurt drink served in clay kulhads, topped with malai. The standard antidote to an April afternoon in Mathura.', category: 'Beverage', price: '₹30–₹60 per glass', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Malai Lassi.jpg?width=1600' }, { name: 'Makhan Mishri', description: 'Fresh white butter with sugar crystals, offered as prasad in reference to Krishna\'s butter-loving childhood. More devotional offering than dish, and worth taking in that spirit.', category: 'Prasad', price: '₹20–₹50', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Desi makhan.jpg?width=1600' }, { name: 'Thandai', description: 'Chilled milk ground with almonds, fennel, pepper and saffron — drunk across the city during Holi, and available year-round at the older sweet shops.', category: 'Beverage', price: '₹40–₹80 per glass', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Thandai (Spiced Indian Milk Drink).JPG?width=1600' }, { name: 'Braj Thali', description: 'A sattvic vegetarian thali built around seasonal sabzi, dal, kadhi, rice and rotis, served near the temple precincts where onion and garlic are typically avoided.', category: 'Meal', price: '₹120–₹250', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Traditional North Indian Thali.jpg?width=1600' }],
  attractions: [{ id: 'krishna-janmabhoomi', name: 'Shri Krishna Janmabhoomi Temple Complex', category: 'Religious', description: 'Built 1953–1982 around the traditional prison-cell birthplace of Krishna, incorporating the Kesava Deva Temple and Bhagvata Bhavan. Adjoins the historic Shahi Idgah mosque. Tight security screening applies and photography is restricted in parts — check the current rules on arrival.', duration: '1–2 hrs', distance: '4 km from Mathura Junction', score: 9.6, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mathura Temple-Mathura-India0002.JPG?width=1600' }, { id: 'dwarkadhish-temple', name: 'Dwarkadhish Temple', category: 'Religious', description: 'Built in 1814 by Seth Gokul Das Parikh, treasurer of Gwalior State, in Rajasthani style with a richly decorated interior. One of the city\'s largest and busiest temples, dedicated to Krishna as Dwarkadhish, and especially vivid during Holi and the Hindola festival.', duration: '45–60 min', distance: '1 km from Vishram Ghat', score: 9.3, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dwarkadhish Temple 01.JPG?width=1600' }, { id: 'vishram-ghat', name: 'Vishram Ghat', category: 'Religious', description: 'Mathura\'s principal Yamuna ghat, where Krishna is said to have rested after slaying Kansa — vishram means \'rest\'. The place for evening aarti, ritual bathing and boat rides. Go at dusk, when lamps are set afloat on the river.', duration: '45–60 min', distance: 'City centre', score: 9.4, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vishram Ghat.jpg?width=1600' }, { id: 'government-museum', name: 'Government Museum, Mathura', category: 'Museum', description: 'One of India\'s foremost collections of Kushan and Gupta-era sculpture, coins and inscriptions — the Mathura School of Art in its mottled red sandstone, including early anthropomorphic Buddha images. The quietest and most rewarding hour in the city.', duration: '1–1.5 hrs', distance: '3 km from city centre', score: 9.0, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Government Museum - Mathura 2013-02-23 5016.JPG?width=1600' }, { id: 'govardhan-hill', name: 'Govardhan Hill & Parikrama', category: 'Religious', description: 'A low sandstone ridge revered as the hill Krishna lifted to shelter Braj from Indra\'s storm. The 21–23 km barefoot parikrama passes Mansi Ganga, Danghati Temple, Radha Kund and Shyam Kund. A vehicle circuit is possible for those who cannot walk it.', duration: 'Half to full day', distance: '22 km from Mathura', score: 9.5, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Govardhan -1.JPG?width=1600' }, { id: 'radha-rani-barsana', name: 'Radha Rani (Shriji) Temple, Barsana', category: 'Religious', description: 'Atop Bhanugarh Hill — the traditional home and birthplace of Radha, and the epicentre of Lathmar Holi. The climb is repaid with a view across the whole town.', duration: '1–1.5 hrs', distance: '45 km from Mathura', score: 9.1, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Radharani Temple Barsana 3.jpg?width=1600' }, { id: 'nand-bhawan-nandgaon', name: 'Nand Bhawan, Nandgaon', category: 'Religious', description: 'Atop Nandishwar Hill — the traditional home of Nanda Baba and Krishna\'s childhood residence after the family left Gokul. Naturally paired with Barsana, 7–8 km away.', duration: '45–60 min', distance: '50 km from Mathura', score: 8.6, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/नंदगाँव का एक दृश्य.JPG?width=1600' }, { id: 'nand-bhavan-gokul', name: 'Nand Bhavan (Chaurasi Khamba), Gokul', category: 'Religious', description: 'In Mahavan, or Old Gokul — an 84-pillared hall identified as Nanda Baba\'s house, where the infant Krishna was secretly raised after being carried across the Yamuna. Its banyan tree hangs with devotees\' ribbons.', duration: '45–60 min', distance: '16 km from Mathura', score: 8.7, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gokul ashram.jpg?width=1600' }, { id: 'radha-kund', name: 'Radha Kund & Shyam Kund', category: 'Religious', description: 'Twin sacred ponds near Govardhan associated with Radha and Krishna, and a central stop on the parikrama route. Especially significant on Ahoi Ashtami, when pilgrims bathe here through the night.', duration: '30–45 min', distance: '26 km from Mathura', score: 8.8, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Radhakund.JPG?width=1600' }, { id: 'kans-qila', name: 'Kans Qila', category: 'Historical', description: 'A ruined riverside fort traditionally linked to the tyrant king Kansa, blending Hindu and later Mughal-era architectural elements. Lightly interpreted and largely empty — worth it for the setting and the legend rather than the ruins.', duration: '30 min', distance: '2 km from city centre', score: 7.6, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kans Quila, Mathura.jpg?width=1600' }, { id: 'kusum-sarovar', name: 'Kusum Sarovar', category: 'Historical', description: 'A stepped sandstone tank on the Govardhan circuit, ringed by the elaborately carved chhatris of the Bharatpur royal family. The most photogenic stop on the entire parikrama route, especially in late afternoon light.', duration: '30–45 min', distance: '24 km from Mathura', score: 8.9, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Reflection of kusum sarovar.jpg?width=1600' }, { id: 'sati-burj', name: 'Sati Burj', category: 'Historical', description: 'A four-storeyed memorial tower of 1570 near Vishram Ghat, raised by the son of Bihari Mal of Jaipur in memory of his mother\'s sati. Its upper storeys were razed under Aurangzeb and later rebuilt.', duration: '15–20 min', distance: 'City centre', score: 7.4, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vishram Ghat.jpg?width=1600' }],
  hiddenGems: [{ name: 'Kusum Sarovar at golden hour', why: 'Almost every pilgrim passes it on the parikrama and almost nobody stops. The Bharatpur chhatris and the stepped ghats take low afternoon light better than anything else in Braj.', distance: '24 km', duration: '45 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Reflection of kusum sarovar.jpg?width=1600' }, { name: 'The Kushan galleries, Government Museum', why: 'World-significant sculpture — among the earliest human-form Buddha images ever carved — sitting in near-empty rooms while crowds queue a few kilometres away at the temples.', distance: '3 km', duration: '1 hr', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Inscribed Seated Buddha Image in Abhaya Mudra - Kushan Period - Katra Keshav Dev - ACCN A-1 - Government Museum - Mathura 2013-02-24 5972.JPG?width=1600' }, { name: 'Kans Qila\'s river frontage', why: 'A ruined fort tied to the villain of the city\'s founding story, unrestored and unvisited, with an open view of the Yamuna that no temple gives you.', distance: '2 km', duration: '30 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kans Quila, Mathura.jpg?width=1600' }, { name: 'Sati Burj', why: 'A 1570 tower standing quietly beside the busiest ghat in the city, carrying a Mughal-era history of destruction and rebuilding that most people walk straight past.', distance: 'City centre', duration: '20 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vishram Ghat.jpg?width=1600' }, { name: 'Raman Reti, Gokul', why: 'Sacred sands where devotees roll in remembrance of Krishna\'s childhood play — one of the few places in Braj where the devotion is entirely physical.', distance: '16 km', duration: '30 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gokul ashram.jpg?width=1600' }],
  thingsToDo: [{ activity: 'Evening aarti at Vishram Ghat', duration: '1 hr', cost: 'Free', difficulty: 'Easy', bestTime: 'Sunset, year-round', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vishram Ghat.jpg?width=1600' }, { activity: 'Boat ride on the Yamuna', duration: '30–45 min', cost: '₹100–₹300 per boat', difficulty: 'Easy', bestTime: 'Early morning or sunset', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/YamunaRiver.jpg?width=1600' }, { activity: 'Govardhan Hill parikrama on foot', duration: '6–8 hrs', cost: 'Free', difficulty: 'Hard', bestTime: 'October to March, starting before dawn', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Govardhan -1.JPG?width=1600' }, { activity: 'Govardhan parikrama by vehicle', duration: '2–3 hrs', cost: '₹800–₹1,500 per cab', difficulty: 'Easy', bestTime: 'October to March', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Govardhan -1.JPG?width=1600' }, { activity: 'Kushan sculpture at the Government Museum', duration: '1–1.5 hrs', cost: '₹25–₹50', difficulty: 'Easy', bestTime: 'Any weekday morning', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Government Museum - Mathura 2013-02-23 5016.JPG?width=1600' }, { activity: 'Peda tasting near Holi Gate', duration: '30 min', cost: '₹100–₹300', difficulty: 'Easy', bestTime: 'Any time', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Milk Peda.JPG?width=1600' }, { activity: 'Lathmar Holi at Barsana', duration: 'Full day', cost: 'Free, transport extra', difficulty: 'Hard', bestTime: 'Days before Holi, Feb–Mar', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Barsana Holi Festival.jpg?width=1600' }, { activity: 'Janmashtami midnight celebration', duration: 'Overnight', cost: 'Free', difficulty: 'Moderate', bestTime: 'August, lunar date', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Krishna Janmashtami.jpg?width=1600' }],
  nearbyPlaces: [{ name: 'Vrindavan', distance: '15 km', type: 'Temple Town', travelTime: '30 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sri Krishna Balaram Temple, Vrindavan.JPG?width=1600' }, { name: 'Gokul & Mahavan', distance: '16 km', type: 'Pilgrimage', travelTime: '35 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gokul ashram.jpg?width=1600' }, { name: 'Govardhan', distance: '22 km', type: 'Pilgrimage', travelTime: '45 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Govardhan -1.JPG?width=1600' }, { name: 'Barsana', distance: '45 km', type: 'Pilgrimage', travelTime: '1 hr 15 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Barsana View from Shriji Temple.jpg?width=1600' }, { name: 'Nandgaon', distance: '50 km', type: 'Pilgrimage', travelTime: '1 hr 30 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/नंदगाँव का एक दृश्य.JPG?width=1600' }, { name: 'Agra & the Taj Mahal', distance: '58 km', type: 'Heritage City', travelTime: '1 hr', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Taj Mahal-10.jpg?width=1600' }],
  travel: { air: { airport: 'Indira Gandhi International Airport, Delhi (DEL) — the practical gateway; Agra Airport (AGR) is nearer at 58 km but has limited service', distance: '155 km', time: '3–4 hrs by road' }, rail: { station: 'Mathura Junction (MTJ) — a major railhead on the Delhi–Mumbai and Delhi–Chennai trunk lines, with direct trains to Delhi, Mumbai, Chennai, Lucknow and Jammu Tawi', distance: 'In the city', time: '2 hrs from Delhi by fast train' }, road: { highway: 'NH-44 (Agra–Delhi corridor) and the Yamuna Expressway', distance: '150 km from Delhi, 58 km from Agra', time: '3–4 hrs from Delhi, under 1 hr from Agra' } },
  stay: { categories: [{ type: 'Dharamshala & Ashram', range: '₹200 – ₹800 per night', options: ['Temple trust dharamshalas near Janmabhoomi', 'Ashram guesthouses in the old city', 'Pilgrim rest houses at Govardhan and Barsana'] }, { type: 'Budget Hotel', range: '₹800 – ₹2,000 per night', options: ['Hotels around Mathura Junction', 'Guesthouses near the Dwarkadhish temple area', 'Highway lodges on NH-44'] }, { type: 'Mid-Range Hotel', range: '₹2,000 – ₹5,000 per night', options: ['Business hotels along the Delhi–Agra highway', 'Mid-range properties on the Mathura–Vrindavan road', 'Resort-style stays near Vrindavan'] }, { type: 'Premium', range: '₹5,000+ per night', options: ['Upscale hotels in Vrindavan', 'Heritage and luxury properties in Agra, 58 km away'] }] },
  bestTime: { months: [{ month: 'Jan', status: 'ideal' }, { month: 'Feb', status: 'ideal' }, { month: 'Mar', status: 'good' }, { month: 'Apr', status: 'avoid' }, { month: 'May', status: 'avoid' }, { month: 'Jun', status: 'avoid' }, { month: 'Jul', status: 'good' }, { month: 'Aug', status: 'good' }, { month: 'Sep', status: 'good' }, { month: 'Oct', status: 'ideal' }, { month: 'Nov', status: 'ideal' }, { month: 'Dec', status: 'ideal' }] },
  budget: { tiers: [{ tier: 'Budget', perDay: '₹800 – ₹1,500', breakdown: [{ category: 'Stay', amount: '₹300 – ₹700' }, { category: 'Food', amount: '₹250 – ₹400' }, { category: 'Local transport', amount: '₹150 – ₹300' }, { category: 'Entry fees', amount: '₹50 – ₹100' }] }, { tier: 'Mid-Range', perDay: '₹2,000 – ₹4,000', breakdown: [{ category: 'Stay', amount: '₹1,200 – ₹2,200' }, { category: 'Food', amount: '₹500 – ₹800' }, { category: 'Private cab', amount: '₹1,000 – ₹1,500' }, { category: 'Entry fees & shopping', amount: '₹200 – ₹500' }] }, { tier: 'Premium', perDay: '₹6,000+', breakdown: [{ category: 'Stay', amount: '₹4,000+' }, { category: 'Food', amount: '₹1,200+' }, { category: 'Dedicated car & guide', amount: '₹2,500+' }, { category: 'Experiences & shopping', amount: '₹1,000+' }] }] },
  itineraries: { '1 Day': [{ day: 1, schedule: [{ time: '07:00', place: 'Shri Krishna Janmabhoomi Temple Complex', duration: '1.5 hrs' }, { time: '09:00', place: 'Dwarkadhish Temple', duration: '1 hr' }, { time: '10:30', place: 'Brijwasi kachori and peda near Holi Gate', duration: '45 min' }, { time: '12:30', place: 'Government Museum, Mathura', duration: '1.5 hrs' }, { time: '15:00', place: 'Kans Qila', duration: '30 min' }, { time: '16:00', place: 'Sati Burj', duration: '20 min' }, { time: '17:30', place: 'Vishram Ghat aarti', duration: '1 hr' }] }], '2 Days': [{ day: 1, schedule: [{ time: '07:00', place: 'Shri Krishna Janmabhoomi Temple Complex', duration: '1.5 hrs' }, { time: '09:00', place: 'Dwarkadhish Temple', duration: '1 hr' }, { time: '12:30', place: 'Government Museum, Mathura', duration: '1.5 hrs' }, { time: '15:00', place: 'Kans Qila & Sati Burj', duration: '1 hr' }, { time: '17:30', place: 'Vishram Ghat aarti', duration: '1 hr' }] }, { day: 2, schedule: [{ time: '07:30', place: 'Nand Bhavan (Chaurasi Khamba), Gokul', duration: '1 hr' }, { time: '09:00', place: 'Raman Reti', duration: '30 min' }, { time: '11:30', place: 'Banke Bihari Temple, Vrindavan', duration: '1.5 hrs' }, { time: '15:00', place: 'Prem Mandir', duration: '1.5 hrs' }, { time: '18:00', place: 'ISKCON Vrindavan', duration: '1 hr' }] }], '3 Days': [{ day: 1, schedule: [{ time: '07:00', place: 'Shri Krishna Janmabhoomi Temple Complex', duration: '1.5 hrs' }, { time: '09:00', place: 'Dwarkadhish Temple', duration: '1 hr' }, { time: '12:30', place: 'Government Museum, Mathura', duration: '1.5 hrs' }, { time: '15:00', place: 'Kans Qila & Sati Burj', duration: '1 hr' }, { time: '17:30', place: 'Vishram Ghat aarti', duration: '1 hr' }] }, { day: 2, schedule: [{ time: '07:30', place: 'Nand Bhavan, Gokul', duration: '1 hr' }, { time: '09:00', place: 'Raman Reti', duration: '30 min' }, { time: '11:30', place: 'Banke Bihari Temple', duration: '1.5 hrs' }, { time: '15:00', place: 'Prem Mandir & ISKCON', duration: '3 hrs' }] }, { day: 3, schedule: [{ time: '05:30', place: 'Mansi Ganga, Govardhan', duration: '30 min' }, { time: '06:00', place: 'Govardhan parikrama', duration: '3–8 hrs' }, { time: '10:00', place: 'Kusum Sarovar', duration: '45 min' }, { time: '11:30', place: 'Radha Kund & Shyam Kund', duration: '45 min' }, { time: '14:00', place: 'Danghati Temple', duration: '45 min' }] }] },
  experiences: [{ title: 'Evening aarti at Vishram Ghat', duration: '1 hr', price: 'Free', category: 'Spiritual', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vishram Ghat.jpg?width=1600' }, { title: 'Guided Govardhan parikrama with a local pilgrim guide', duration: '6–8 hrs', price: '₹800 – ₹1,500', category: 'Pilgrimage', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Govardhan -1.JPG?width=1600' }, { title: 'Yamuna boat ride at sunrise', duration: '45 min', price: '₹100 – ₹300', category: 'Nature', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/YamunaRiver.jpg?width=1600' }, { title: 'Mathura peda trail near Holi Gate', duration: '1–2 hrs', price: '₹300 – ₹600', category: 'Food', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Milk Peda.JPG?width=1600' }, { title: 'Kushan sculpture walk at the Government Museum', duration: '1.5 hrs', price: '₹25 – ₹50', category: 'Heritage', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Inscribed Seated Buddha Image in Abhaya Mudra - Kushan Period - Katra Keshav Dev - ACCN A-1 - Government Museum - Mathura 2013-02-24 5972.JPG?width=1600' }, { title: 'Lathmar Holi at Barsana and Nandgaon', duration: 'Full day', price: 'Transport ₹1,500+', category: 'Festival', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Barsana Holi Festival.jpg?width=1600' }, { title: 'Ras Leela performance in Braj', duration: '2 hrs', price: 'Free – ₹300', category: 'Culture', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Radha Krishna Raas Leela-006.jpg?width=1600' }],
  aiPrompts: ['What is the historical background of the Krishna Janmabhoomi site in Mathura?', 'Plan a 3-day Braj circuit covering Mathura, Vrindavan, Gokul, Govardhan and Barsana.', 'What is the story of Lathmar Holi, and when should I visit Barsana and Nandgaon to see it?', 'How long does the Govardhan Hill parikrama take, and what should I carry for it?', 'What makes the Mathura School of Art significant, and what can I see of it at the Government Museum?', 'मथुरा कैसे पहुँचें और यहाँ रुकने के लिए सबसे अच्छी जगह कौन सी है?', 'मथुरा में खाने में क्या मशहूर है?', 'विश्राम घाट की आरती का समय क्या है?', 'गोवर्धन परिक्रमा कितनी लंबी है और क्या गाड़ी से भी हो सकती है?', 'जन्माष्टमी पर मथुरा में क्या होता है?'],
  reviews: [],
  sources: { official: ['Government of Uttar Pradesh — Mathura District Portal (mathura.nic.in)', 'Uttar Pradesh Tourism (uptourism.gov.in)', 'Incredible India, Ministry of Tourism (incredibleindia.gov.in)', 'Archaeological Survey of India — Agra Circle records for the Braj region'], historical: ['Britannica — \'Mathura art\'', 'Wikipedia — Mathura; Krishna Janmasthan Temple Complex; Dwarkadhish Temple, Mathura; Government Museum, Mathura; Radha Rani Temple; Lathmar Holi', 'Government Museum, Mathura — Kushan and Gupta-era collection records', 'Accounts of Faxian (c. 400 CE) and Xuanzang (634 CE) on Mathura as a Buddhist centre', 'Megasthenes\' Indica, on Mathura as \'Méthora\', capital of the Surasena'], lastVerified: '2026-09-17' }
}

const vrindavan: Destination = {
  id: 'vrindavan', slug: 'vrindavan', name: 'Vrindavan', localName: 'वृन्दावन',
  destinationType: 'Major Hindu Pilgrimage Town / Living Temple City', country: 'India', state: 'Uttar Pradesh', district: 'Mathura',
  shortDescription: 'The forest-turned-town where Krishna is said to have spent his childhood — a living devotional city of hundreds of temples, sacred groves and ceaseless chanting on the banks of the Yamuna.',
  tags: ['Krishna Pilgrimage', 'Living Temple City', 'Braj Bhoomi', 'ISKCON', 'Prem Mandir', 'Vaishnava Heritage'],
  hero: { image: 'https://commons.wikimedia.org/wiki/Special:FilePath/A_Hindu_temple_Prem_Mandir_Love_temple_sights_culture_India.jpg?width=1920', poster: 'https://commons.wikimedia.org/wiki/Special:FilePath/A_Hindu_temple_Prem_Mandir_Love_temple_sights_culture_India.jpg?width=1920' },
  quickFacts: { bestTime: 'October to March', duration: '1 day (core circuit) – 2–3 days (with wider Braj circuit)', budget: '₹800 – ₹2,500 per person per day', destinationType: 'Major Hindu Pilgrimage Town / Living Temple City', difficulty: 'Easy — flat and walkable, though older temple lanes are narrow and crowded', distance: '~150 km from Delhi; ~12–15 km from Mathura Junction' },
  discoveryScore: { overall: 9.0, categories: [{ name: 'Popularity Index', score: 9.0 }, { name: 'Cultural Significance', score: 10.0 }, { name: 'Historical Weight', score: 8.0 }, { name: 'Uniqueness / Authenticity', score: 9.0 }] },
  editorial: { why: 'Vrindavan compresses 500 years of continuous Vaishnava devotional history — from 16th-century Goswami temples through to 21st-century global movements like ISKCON and the 2012-built Prem Mandir — into a single walkable pilgrimage town where mythology, architecture, living social history and a daily-practised ritual calendar are all still actively experienced rather than merely preserved.', story: 'Vrindavan is one of the most sacred towns in the Vaishnava Hindu tradition, revered as the place where Krishna, taken as an infant to Gokul to escape his uncle Kansa, spent his childhood and youth among the gopas and gopis of Braj. The town takes its name from vrinda (tulsi, holy basil) and van (forest) — a reference to the dense sacred groves believed to have once covered the area.', storyFull: 'Vrindavan is one of the most sacred towns in the Vaishnava Hindu tradition, revered as the place where Krishna, taken as an infant to the cowherd village of Gokul to escape his uncle Kansa, spent his childhood and youth among the gopas and gopis of Braj. The town takes its name from vrinda (tulsi, or holy basil) and van (forest) — a reference to the dense tulsi groves believed to have once covered the area and which remain sacred to the goddess Vrinda Devi, an aspect of Lakshmi. Tradition holds that Vrindavan\'s exact sacred sites were rediscovered in the 16th century, after centuries of obscurity, chiefly through the efforts of the Bengali saint Chaitanya Mahaprabhu, who visited in 1515, and the six Goswamis of Vrindavan — including Rupa Goswami and Sanatana Goswami — whom he sent to identify and revive the forest\'s Krishna-lila sites. What followed was a wave of temple building patronised by regional rulers and merchant families from the 16th century onward: the Govind Dev Temple (1590), Radha Madan Mohan Temple (1580), Radha Damodar Temple (1542) and Radha Raman Temple among them, several of which suffered damage during Mughal-era campaigns and were partly rebuilt or had their deities relocated (notably to Jaipur) for safekeeping. In the 20th and 21st centuries, Vrindavan gained a second wave of monumental temple-building, this time from global and modern Hindu movements — most visibly the ISKCON (International Society for Krishna Consciousness) temple complex, established in 1975 by A. C. Bhaktivedanta Swami Prabhupada, and the vast, elaborately carved Prem Mandir, completed in 2012 and illuminated nightly with elaborate light shows. Beyond its temples, Vrindavan is also known, more soberly, for its large population of widowed women — estimated at over 20,000 — many of whom travelled here from West Bengal and elsewhere in North India to live out their remaining years in devotional community, a phenomenon rooted in both religious devotion and social/economic circumstance, and which has drawn the attention of NGOs, journalists and the National Commission for Women. Today Vrindavan functions simultaneously as an intensely lived devotional town — with the ancient Parikrama Marg circumambulation path still walked daily, hundreds of ashrams and ISKCON\'s global following — and as one of India\'s most visited pilgrimage and festival destinations, drawing an estimated one million-plus visitors during Janmashtami alone.' },
  history: { shortIntro: 'According to the Bhagavata Purana, Krishna spent his childhood in Vrindavan\'s forests; the town\'s sacred sites were rediscovered in the 16th century by Chaitanya Mahaprabhu and the six Goswamis, and it has seen continuous temple-building ever since.', timeline: [{ year: '1515 CE', event: 'The Bengali saint Chaitanya Mahaprabhu visits Vrindavan and wanders through its sacred forests, reviving devotional interest in the region.', era: 'Rediscovery' }, { year: '1516 CE onward', event: 'Rupa Goswami and Sanatana Goswami arrive in Vrindavan to identify and re-establish Krishna\'s pastime sites, founding the town\'s six principal Goswami temples.', era: 'Rediscovery' }, { year: '1542 CE', event: 'Radha Damodar Temple founded by Jiva Goswami at Seva Kunj.', era: 'Goswami era' }, { year: '1580 CE', event: 'Radha Madan Mohan Temple built by Ram Das Kapur; its deities were later moved to Jaipur for protection during Mughal-era unrest.', era: 'Goswami era' }, { year: '1590 CE', event: 'The Govind Dev Temple is built, becoming one of Vrindavan\'s most architecturally significant Mughal-period structures.', era: 'Goswami era' }, { year: '1670 CE', event: 'Temple deities across Vrindavan are relocated for safety during a period of Mughal-era hostility toward Hindu temples.', era: 'Mughal era' }, { year: '1862 CE', event: 'The present Banke Bihari Temple, in Rajasthani architectural style, is completed.', era: 'Colonial era' }, { year: '1975 CE', event: 'ISKCON\'s Krishna-Balaram Mandir is established by A. C. Bhaktivedanta Swami Prabhupada, becoming a hub for the global Hare Krishna movement.', era: 'Modern' }, { year: '2001–2012', event: 'Prem Mandir is built by Jagadguru Shri Kripaluji Maharaj over roughly a decade, employing around 1,000 artisans across a 54-acre complex.', era: 'Modern' }, { year: '1972 onward', event: 'Planning begins for the Vrindavan Chandrodaya Mandir, an ISKCON-led project intended to be among the tallest religious monuments in the world; still under construction as of the mid-2020s.', era: 'Contemporary' }] },
  culture: [{ title: 'Holi at Banke Bihari & Widows\' Holi', description: 'One of India\'s most famous Holi celebrations, including the Phoolon Ki Holi (flower Holi) at Banke Bihari Temple, and a dedicated Widows\' Holi at the Gopinath Temple/Pagal Baba Ashram, where widows — traditionally excluded from Holi — now publicly participate.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bankebihari_temple_main_gate_Vrindavan.JPG?width=1600' }, { title: 'Janmashtami', description: 'Krishna\'s birthday, marked with midnight rituals, dramatised re-enactments of his life, all-night bhajans, and well over a million visitors to Vrindavan alone in recent years.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sri_Krishna_Balaram_Temple,_Vrindavan.JPG?width=1600' }, { title: 'The Widow Community', description: 'An estimated 20,000+ widowed women, many from West Bengal, live in Vrindavan\'s ashrams, supported by bhajan stipends, temple charity and NGOs working on welfare access and dignity.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ghat_at_Yamuna_river,_Vrindavan.jpg?width=1600' }],
  food: [{ name: 'Peda', description: 'The region\'s most famous milk sweet — a brown, square-shaped fudge made from milk, ghee, sugar and cardamom, closely associated with nearby Mathura.', category: 'Sweet', price: 'Varies by weight', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg?width=1200' }, { name: 'Makhan Mishri', description: 'Fresh white butter mixed with sugar crystals, offered widely as prasad in reference to Krishna\'s childhood fondness for butter.', category: 'Prasad / Sweet', price: 'Varies', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg?width=1200' }, { name: 'Rabri/Rabdi', description: 'A thick, slow-cooked, layered condensed-milk dessert, flavoured with cardamom and saffron and topped with nuts.', category: 'Dessert', price: 'Varies', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Benarasi_Rabdi.jpg?width=1200' }, { name: 'Kachori-Sabzi', description: 'A popular savoury breakfast/street-food combination of fried lentil-stuffed kachoris served with spiced potato curry.', category: 'Breakfast / Street Food', price: '₹40–80', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kachori_Sabji.JPG?width=1200' }, { name: 'Thandai', description: 'A chilled, spiced milk drink with saffron, dry fruits and rose petals, especially popular during Holi and Mahashivratri.', category: 'Beverage', price: '₹50–100', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Thandai_(Spiced_Indian_Milk_Drink).JPG?width=1200' }, { name: 'Chappan Bhog', description: 'An elaborate 56-item temple food offering tradition associated with Krishna worship.', category: 'Temple Offering', price: 'Not sold commercially', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kachori_Sabji.JPG?width=1200' }],
  attractions: [{ id: 'banke-bihari-temple', name: 'Banke Bihari Temple', category: 'Main Landmark / Religious', description: 'Vrindavan\'s most visited temple (completed 1862, Rajasthani style), dedicated to Krishna in his youthful \'Banke Bihari\' form; famous for its curtain-veiled darshan ritual.', duration: '45–60 min', distance: 'Town centre', score: 9.5, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bankebihari_temple_main_gate_Vrindavan.JPG?width=1600' }, { id: 'iskcon-temple', name: 'ISKCON Temple (Sri Krishna Balaram Mandir)', category: 'Main Landmark / Religious', description: 'Established 1975 by A. C. Bhaktivedanta Swami Prabhupada; the global hub of the Hare Krishna movement, known for its aartis, Bhagavad Gita classes and Govinda\'s Restaurant.', duration: '1–2 hrs', distance: 'Raman Reti area', score: 9.3, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sri_Krishna_Balaram_Temple,_Vrindavan.JPG?width=1600' }, { id: 'prem-mandir', name: 'Prem Mandir', category: 'Main Landmark / Religious', description: 'A 54-acre marble temple complex completed in 2012, dedicated to Radha-Krishna and Sita-Rama, famed for its carved facades and nightly illuminated light-and-water show.', duration: '1–2 hrs', distance: 'Approach road', score: 9.4, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Prem_Mandir_Vrindavan(6).jpg?width=1600' }, { id: 'nidhivan', name: 'Nidhivan', category: 'Hidden Gem / Legend Site', description: 'A dense, sacred tulsi grove said to be the site of Krishna and Radha\'s nightly Raas Leela; closes to all visitors before dusk in keeping with strict local custom.', duration: '20–30 min', distance: 'Near Seva Kunj', score: 8.8, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ghat_at_Yamuna_river,_Vrindavan.jpg?width=1600' }, { id: 'kesi-ghat', name: 'Kesi Ghat', category: 'Nature / Scenic', description: 'One of Vrindavan\'s principal Yamuna riverfront ghats, popular for morning and evening aarti and boat rides.', duration: '30–45 min', distance: 'Riverfront', score: 8.5, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ghat_at_Yamuna_river,_Vrindavan.jpg?width=1600' }, { id: 'vrindavan-chandrodaya-mandir', name: 'Vrindavan Chandrodaya Mandir (under construction)', category: 'Main Landmark / Religious', description: 'An ISKCON-led project planned as one of the tallest religious monuments in the world; viewable as a major ongoing construction landmark.', duration: '20–30 min (exterior)', distance: 'Outskirts', score: 7.5, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vrindavan_Chandrodaya_Mandir_(VCM)_Temple.jpg?width=1600' }],
  hiddenGems: [{ name: 'Govind Dev Temple', why: 'A major 1590 Mughal-period temple, one of the town\'s most architecturally significant historic structures, often overlooked in favour of Banke Bihari and ISKCON.', distance: 'Town centre', duration: '30–45 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Govind_Dev_Temple,_Vrindavan_1949.jpg?width=1600' }, { name: 'Radha Damodar Temple', why: 'Founded 1542 by Jiva Goswami at Seva Kunj; one of the seven principal Goswami temples, associated with Srila Prabhupada\'s residence before he founded ISKCON.', distance: 'Seva Kunj', duration: '30 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bankebihari_temple_main_gate_Vrindavan.JPG?width=1600' }, { name: 'Radha Madan Mohan Temple', why: 'Built 1580 under Sanatana Goswami\'s guidance — quieter than the main circuit despite its deep Goswami-era history.', distance: 'Town centre', duration: '30 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Govind_Dev_Temple,_Vrindavan_1949.jpg?width=1600' }],
  thingsToDo: [{ activity: 'Walk a section of (or the full) Parikrama Marg', duration: '2–4 hrs (full circuit)', cost: 'Free', difficulty: 'Easy to moderate', bestTime: 'Ideally on an Ekadashi day', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ghat_at_Yamuna_river,_Vrindavan.jpg?width=1600' }, { activity: 'Attend Mangala Aarti (pre-dawn) or evening aarti', duration: '30–45 min', cost: 'Free', difficulty: 'Easy', bestTime: 'Pre-dawn or evening at Banke Bihari or ISKCON', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bankebihari_temple_main_gate_Vrindavan.JPG?width=1600' }, { activity: 'Sattvic thali meal at Govinda\'s Restaurant', duration: '1 hr', cost: '₹200–500', difficulty: 'Easy', bestTime: 'Lunch or dinner', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sri_Krishna_Balaram_Temple,_Vrindavan.JPG?width=1600' }, { activity: 'Respectfully visit a widow ashram (with prior permission)', duration: '30–45 min', cost: 'Donations welcome', difficulty: 'Easy', bestTime: 'Daytime, especially during Widows\' Holi', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ghat_at_Yamuna_river,_Vrindavan.jpg?width=1600' }],
  nearbyPlaces: [{ name: 'Bhandirvan', distance: '~10 km', type: 'Sacred Grove', travelTime: '20–25 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ghat_at_Yamuna_river,_Vrindavan.jpg?width=1600' }, { name: 'Gokul', distance: '~25–30 km', type: 'Pilgrimage Town', travelTime: '40–50 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Govind_Dev_Temple,_Vrindavan_1949.jpg?width=1600' }, { name: 'Govardhan Hill & Radha Kunda', distance: '~25–30 km', type: 'Pilgrimage Site', travelTime: '40–50 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ghat_at_Yamuna_river,_Vrindavan.jpg?width=1600' }, { name: 'Barsana & Nandgaon', distance: '~50 km', type: 'Pilgrimage Villages', travelTime: '1–1.5 hrs', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Govind_Dev_Temple,_Vrindavan_1949.jpg?width=1600' }, { name: 'Agra & the Taj Mahal', distance: '~55–67 km', type: 'UNESCO Heritage City', travelTime: '1–1.5 hrs', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Mahal_Sunset.jpg?width=1600' }],
  travel: { air: { airport: 'Agra Airport (AGR) — nearest, limited domestic service; Indira Gandhi International Airport, Delhi (DEL) — far more flight options', distance: 'Agra ~55–67 km; Delhi ~130–160 km', time: 'Delhi ~2.5–3.5 hrs by road; Agra ~1–1.5 hrs by road' }, rail: { station: 'Mathura Junction (MTJ) — main railhead on Delhi–Mumbai and Delhi–Chennai trunk lines; Vrindaban Road (VRBD/BVD) has limited long-distance service', distance: 'Mathura Junction ~12–15 km from Vrindavan', time: 'Short taxi/auto transfer from Mathura Junction' }, road: { highway: 'Just off NH-44 (Agra–Delhi corridor); Yamuna Expressway from Delhi', distance: '~150 km from Delhi', time: '~3–4 hrs by road from Delhi; under 1 hr from Agra to Mathura, plus final approach' } },
  stay: { categories: [{ type: 'Ashrams & Dharamshalas', range: 'Budget', options: ['Numerous temple/trust-run devotional guesthouses across town', 'ISKCON\'s own guesthouse'] }, { type: 'Budget & Mid-Range Hotels', range: 'Moderate', options: ['Widely available around the main temple areas and approach roads'] }, { type: 'Premium / Boutique', range: 'Higher-end', options: ['A smaller, growing number of higher-end hotels near Chhatikara and the Vrindavan–Mathura corridor, popular for festival-season and destination-wedding visitors'] }] },
  bestTime: { months: [{ month: 'Jan', status: 'ideal' }, { month: 'Feb', status: 'ideal' }, { month: 'Mar', status: 'good' }, { month: 'Apr', status: 'avoid' }, { month: 'May', status: 'avoid' }, { month: 'Jun', status: 'avoid' }, { month: 'Jul', status: 'good' }, { month: 'Aug', status: 'good' }, { month: 'Sep', status: 'good' }, { month: 'Oct', status: 'ideal' }, { month: 'Nov', status: 'ideal' }, { month: 'Dec', status: 'ideal' }] },
  budget: { tiers: [{ tier: 'Budget', perDay: '₹800–₹1,500', breakdown: [{ category: 'Ashram/dharamshala stay', amount: '₹300–600' }, { category: 'Local transport', amount: '₹100–300' }, { category: 'Sattvic thalis & street food', amount: '₹200–500' }, { category: 'Temple darshan', amount: 'Free' }] }, { tier: 'Mid-Range', perDay: '₹2,000–₹4,000', breakdown: [{ category: 'Mid-range hotel', amount: '₹1,200–2,500' }, { category: 'Private cab hire', amount: '₹500–1,000' }, { category: 'Comfortable dining', amount: '₹300–500' }] }, { tier: 'Festival Season (Holi/Janmashtami)', perDay: 'Significantly higher', breakdown: [{ category: 'Accommodation (surge pricing)', amount: 'Book well in advance' }, { category: 'Transport & food', amount: 'Standard rates still apply' }] }] },
  itineraries: { '1 Day': [{ day: 1, schedule: [{ time: 'Morning', place: 'Banke Bihari Temple darshan; walk through Loi Bazar; visit Radha Raman and Radha Damodar Temples', duration: '3 hrs', distance: 'Town centre' }, { time: 'Afternoon', place: 'ISKCON temple complex, Govinda\'s Restaurant for a sattvic thali, Nidhivan/Seva Kunj (before dusk)', duration: '3 hrs', distance: 'Raman Reti area' }, { time: 'Evening', place: 'Prem Mandir for the illuminated evening show; Kesi Ghat aarti on the Yamuna before departure', duration: '2 hrs', distance: 'Approach road / Riverfront' }] }], '2 Days': [{ day: 1, schedule: [{ time: 'Morning', place: 'Vrindavan\'s core temple circuit: Banke Bihari, ISKCON, Prem Mandir, Nidhivan/Seva Kunj, overnight in Vrindavan', duration: 'Full day', distance: 'Vrindavan town' }] }, { day: 2, schedule: [{ time: 'Full Day', place: 'Gokul (where Krishna was raised) and Bhandirvan, returning to Vrindavan for the evening aarti at Kesi Ghat', duration: 'Full day', distance: 'Gokul / Bhandirvan' }] }], '3 Days': [{ day: 1, schedule: [{ time: 'Morning', place: 'Vrindavan\'s core temple circuit: Banke Bihari, ISKCON, Prem Mandir, Nidhivan/Seva Kunj, overnight in Vrindavan', duration: 'Full day', distance: 'Vrindavan town' }] }, { day: 2, schedule: [{ time: 'Full Day', place: 'Gokul (where Krishna was raised) and Bhandirvan, returning to Vrindavan for the evening aarti at Kesi Ghat', duration: 'Full day', distance: 'Gokul / Bhandirvan' }] }, { day: 3, schedule: [{ time: 'Full Day (optional)', place: 'Govardhan Hill and Radha Kunda, or Barsana/Nandgaon for the wider Braj circuit', duration: 'Full day', distance: 'Govardhan / Barsana' }] }] },
  experiences: [{ title: 'Parikrama Marg Walk', duration: '2–4 hrs', price: 'Free', category: 'Pilgrimage', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ghat_at_Yamuna_river,_Vrindavan.jpg?width=1600' }, { title: 'Sattvic Thali at Govinda\'s Restaurant', duration: '1 hr', price: '₹200–500', category: 'Food', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sri_Krishna_Balaram_Temple,_Vrindavan.JPG?width=1600' }, { title: 'Swami Haridas Sammelan (classical music festival)', duration: 'Seasonal event', price: 'Varies', category: 'Cultural Festival', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Prem_Mandir_Vrindavan(6).jpg?width=1600' }],
  aiPrompts: ['What is the legend of Nidhivan, and why does it close before sunset?', 'Plan a one-day Vrindavan temple circuit that ends at Prem Mandir for the evening light show.', 'What is the story behind Vrindavan\'s widow community, and how can I visit an ashram respectfully?', 'Which Vrindavan temples are the oldest, and how did they survive the Mughal era?', 'How do I combine Vrindavan with Barsana and Govardhan for a 3-day Braj pilgrimage circuit?'],
  reviews: [{ name: 'Traveler Review', location: 'India', text: 'Placeholder — add real visitor reviews here once available.', rating: 4.7, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format', date: '2026' }],
  sources: { official: ['Wikipedia — Vrindavan, Banke Bihari Temple, Prem Mandir, ISKCON Temple Vrindavan, Radha Damodar Temple, Vrindavan Chandrodaya Mandir, Bhandirvan', 'Sacredsites.com — Vrindavan pilgrimage overview'], historical: ['Vrindavanactnow.org — The History of Vrindavan', 'The Gaudiya Treasures of Bengal and Holidify — Goswami-era temple histories', 'National Commission for Women — Study on Widows at Vrindavan (2009–10)'], lastVerified: 'September 2026' }
}

// ─── Map Pins by Destination ────────────────────────────────────────────────
const mapPinsBySlug: Record<string, { top: string; left: string; label: string }[]> = {
  'mathura': [{ top: '35%', left: '45%', label: 'Shri Krishna Janmabhoomi Temple' }, { top: '42%', left: '38%', label: 'Dwarkadhish Temple' }, { top: '28%', left: '52%', label: 'Vishram Ghat' }],
  'vrindavan': [{ top: '35%', left: '45%', label: 'Prem Mandir' }, { top: '42%', left: '38%', label: 'Banke Bihari Temple' }, { top: '28%', left: '52%', label: 'ISKCON Temple' }]
}

// ─── Ask D360 Answers by Destination ────────────────────────────────────────
const askAnswersBySlug: Record<string, { match: string; response: string }[]> = {
  'mathura': [
    { match: 'Krishna Janmabhoomi site', response: `The Shri Krishna Janmabhoomi complex stands on the traditional site of the prison cell where Krishna was born to Devaki and Vasudev. Temples here have been destroyed and rebuilt repeatedly — including during Mahmud of Ghazni's 1018 CE raid and under Sikandar Lodi — and the present complex was built between 1953 and 1982, adjoining the historic Shahi Idgah mosque, a site subject to ongoing litigation.` },
    { match: '3-day Braj circuit', response: `Day 1: Mathura's core sites (Janmabhoomi, Dwarkadhish, the Museum, Vishram Ghat). Day 2: Vrindavan and Gokul, both under 20 minutes away. Day 3: the Govardhan-Barsana-Nandgaon loop, ideally by car since they're spread further out (22–50 km from Mathura). Base yourself in Mathura or Vrindavan throughout.` },
    { match: 'Lathmar Holi', response: `Lathmar Holi reenacts Krishna teasing Radha and the gopis in Barsana — the women drive the men of Nandgaon back with sticks (lathis) amid clouds of colour. It happens a few days before the main Holi (typically late Feb–March), split across a day each in Barsana and Nandgaon. Book accommodation across Braj well in advance, as it draws huge crowds.` },
    { match: 'Govardhan Hill parikrama', response: `The full barefoot circuit is 21–23 km and takes 6–8 hours, passing Mansi Ganga, Danghati Temple, Radha Kund and Shyam Kund. Carry water, a hat, and comfortable barefoot-friendly stretches of cloth or socks for the hot sections; a vehicle circuit covering the same stops takes 2–3 hours for those who can't walk it.` },
    { match: 'Mathura School of Art', response: `The Mathura School was a Kushan-and-Gupta-era sculptural tradition in distinctive mottled red sandstone, producing some of the earliest anthropomorphic Buddha images alongside Jain and Hindu work. The Government Museum's Kushan galleries hold this collection — including inscribed Buddha images and yakshi figures — usually in near-empty rooms even when the temples nearby are packed.` },
    { match: 'कैसे पहुँचें', response: `मथुरा दिल्ली से लगभग 150 किमी और आगरा से 58 किमी दूर है। नज़दीकी हवाई अड्डा आगरा है, और मथुरा जंक्शन रेलवे स्टेशन सीधे प्रमुख शहरों से जुड़ा है। शहर में रुकने के लिए जन्मभूमि के पास धर्मशालाएं, या द्वारकाधीश क्षेत्र और मथुरा जंक्शन के आसपास बजट व मिड-रेंज होटल अच्छे विकल्प हैं।` },
    { match: 'खाने में क्या मशहूर', response: `मथुरा का पेड़ा सबसे मशहूर है — होली गेट के पास ब्रिजवासी मिठाईवाला प्रसिद्ध जगह है। इसके अलावा ब्रिजवासी कचौरी, रबड़ी, लस्सी, और भगवान कृष्ण को अर्पित माखन मिश्री भी ज़रूर आज़माएं।` },
    { match: 'विश्राम घाट की आरती', response: `विश्राम घाट पर आरती रोज़ शाम सूर्यास्त के समय होती है, आमतौर पर गर्मियों में लगभग 7 बजे और सर्दियों में थोड़ा जल्दी। दीये नदी में प्रवाहित होते देखने के लिए सूर्यास्त से पहले वहाँ पहुँचें।` },
    { match: 'गोवर्धन परिक्रमा कितनी', response: `पूरी बैरफुट परिक्रमा 21–23 किमी की है और 6–8 घंटे लगते हैं। हाँ, गाड़ी से भी परिक्रमा की जा सकती है, जिसमें आमतौर पर 2–3 घंटे लगते हैं, मानसी गंगा, दानघाटी मंदिर, राधा कुंड और श्याम कुंड जैसे पड़ावों के साथ।` },
    { match: 'जन्माष्टमी पर मथुरा', response: `जन्माष्टमी पर मथुरा और वृंदावन में आधी रात को विशेष पूजा और जुलूस होते हैं, और भारी भीड़ उमड़ती है। यह हिंदू पंचांग के अनुसार अगस्त में मनाई जाती है, और मंदिरों में विशेष सजावट और भजन-कीर्तन का आयोजन होता है।` }
  ],
  'vrindavan': [
    { match: 'Nidhivan', response: `Nidhivan is a dense, sacred tulsi grove believed to be the site of Krishna and Radha's nightly Raas Leela (divine dance) with the gopis. Local custom holds that no one — not even priests or the resident monkeys — remains in the grove after dusk, out of respect for the couple's night-time presence there. A small "sleeping temple" shrine is set out each evening as though for their rest.` },
    { match: 'one-day Vrindavan temple circuit', response: `Morning: Banke Bihari darshan, then Loi Bazar and the Radha Raman/Radha Damodar temples. Afternoon: ISKCON's temple complex and a sattvic thali at Govinda's Restaurant, then Nidhivan/Seva Kunj before it closes at dusk. Evening: Prem Mandir for the illuminated light show, ending with the Kesi Ghat aarti on the Yamuna.` },
    { match: 'widow community', response: `Vrindavan is home to an estimated 20,000+ widowed women, many originally from West Bengal, who've settled in the town's ashrams. To visit respectfully: go through an established NGO or religious trust rather than an informal "tour," always ask permission before photographing anyone, and consider supporting organisations that provide housing, stipends and welfare access directly.` },
    { match: 'oldest', response: `The Goswami-era temples are the oldest: Radha Damodar (1542), Radha Madan Mohan (1580) and Govind Dev (1590). Several survived Mughal-era campaigns by having their deities relocated for safekeeping — most famously to Jaipur, where some remain enshrined today rather than returning to Vrindavan.` },
    { match: 'Barsana and Govardhan', response: `Day 1: Vrindavan's core circuit (Banke Bihari, ISKCON, Prem Mandir). Day 2: Gokul and Bhandirvan, returning for the evening aarti at Kesi Ghat. Day 3: Govardhan Hill and Radha Kunda, or continue to Barsana and Nandgaon for the wider Braj circuit — both are about 50 km away.` }
  ]
}

// ─── Practical Info by Destination ──────────────────────────────────────────
const practicalInfoBySlug: Record<string, { title: string; content: string }[]> = {
  'mathura': [
    { title: 'Safety', content: 'Mathura is generally safe for tourists and pilgrims, with a Solo Travel Safety Score of 7/10. Crowds intensify sharply around Janmabhoomi during Janmashtami and Holi, so keep valuables secure and agree on a meeting point with your group. Photography is restricted in parts of the Krishna Janmabhoomi complex for security reasons — check current rules on arrival.' },
    { title: 'Local Transport', content: 'Auto-rickshaws and e-rickshaws cover the city; agree on fares before boarding. For the wider Braj circuit (Vrindavan, Gokul, Govardhan, Barsana, Nandgaon), a private taxi for the day is the easiest way to cover multiple towns, since they are spread across a 20–50 km radius.' },
    { title: 'Photography Rules', content: 'Photography is generally welcome at open-air sites like Vishram Ghat, Kans Qila and Kusum Sarovar. Inside temple sanctums, including parts of Krishna Janmabhoomi and Dwarkadhish, cameras and phones are often restricted near the inner shrine — check signage or ask temple staff.' },
    { title: 'Dress & Etiquette', content: 'Modest dress covering shoulders and knees is expected at every temple; remove shoes before entering. Temple precincts maintain a strong vegetarian, sattvic food culture, so avoid bringing non-vegetarian food or alcohol near them. During Navratri and Janmashtami, expect very large crowds and longer queues for darshan.' },
    { title: 'Emergency Information', content: 'Police: 100 · Ambulance: 108 · UP Tourist Helpline: 1800-180-1414 · Mathura Police Control: 0565-2530100. District Hospital, Mathura and several private hospitals along the Mathura–Vrindavan road serve the city.' },
    { title: 'Travel Tips', content: 'Start Krishna Janmabhoomi and Dwarkadhish early morning to beat both the heat and the queues. The Government Museum is quietest on weekday mornings. If visiting during Lathmar Holi or Janmashtami, book accommodation months ahead and allow extra time for security checks and crowd movement.' }
  ],
  'vrindavan': [
    { title: 'Safety', content: 'Generally safe and extremely well-visited. Main risks are crowd density (especially during Janmashtami, Holi and around Banke Bihari Temple), monkeys that can snatch food, phones, glasses or bags, and heat exhaustion in summer months.' },
    { title: 'Local Transport', content: 'Autos, e-rickshaws, cycle-rickshaws and taxis are the main local transport. Within the temple core, many pilgrims move on foot or by e-rickshaw given the narrow, congested lanes around the older temples.' },
    { title: 'Touts & Monkeys', content: 'Touts near major temples may offer unofficial "priest" services or guided darshan for a fee — use official temple counters where available. Secure loose items (phones, spectacles, food) around monkey-populated areas such as Nidhivan and the ghats.' },
    { title: 'Strictly Vegetarian, Alcohol-Free', content: 'The entire town is strictly vegetarian — no meat, eggs or alcohol are sold or permitted within town/temple limits. Dress modestly (shoulders and knees covered) for all temple visits, and check posted photography rules, especially inside Banke Bihari Temple.' },
    { title: 'Emergency Information', content: 'Basic police and medical facilities are available within Vrindavan town; more comprehensive hospital care is available at the nearby district hospital. Note the nearest local police post before heading into the older, narrower temple lanes.' },
    { title: 'Travel Tips', content: 'Nidhivan closes to all visitors before dusk, in keeping with strict local custom — do not attempt to remain after closing. Summers (April–June) bring extreme heat regularly reaching 40–45°C — plan outdoor temple visits for early morning or evening. Book accommodation well ahead for Holi and Janmashtami.' }
  ]
}

// ─── Internal page routing (path -> destination slug) ──────────────────────
const destinationsBySlug: Record<string, Destination> = { 'mathura': mathura, 'vrindavan': vrindavan }
function useCurrentDestination(): Destination {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const slug = path.includes('vrindavan') ? 'vrindavan' : 'mathura'
  return destinationsBySlug[slug]
}

// ─── Vrindavan Data ─────────────────────────────────────────────────────────


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
          {(shown.length > 0 ? shown : destination.nearbyPlaces).map((place) => {
            const internalSlug = place.name.includes('Vrindavan') ? 'vrindavan' : place.name.startsWith('Mathura') ? 'mathura' : null
            const CardTag = internalSlug ? 'a' as const : 'div' as const
            const cardProps = internalSlug ? { href: `/${internalSlug}` } : {}
            return (
              <CardTag key={place.name} {...cardProps} className="group border border-d360-border bg-white hover:border-d360-muted transition-colors cursor-pointer block" style={{ borderRadius: '2px' }}>
                <div className="overflow-hidden relative" style={{ height: '160px' }}>
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-mono px-2 py-1">{place.distance}</div>
                  {internalSlug && <div className="absolute top-2 left-2 bg-d360-primary text-white text-[10px] font-mono px-2 py-1" style={{ borderRadius: '2px' }}>D360 PAGE</div>}
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm text-d360-ink mb-1">{place.name}</h3>
                  <p className="text-xs text-d360-muted">{place.type}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-d360-muted"><IconClock />{place.travelTime}</div>
                </div>
              </CardTag>
            )
          })}
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

function MapSection({ destination, pins }: { destination: Destination; pins: { top: string; left: string; label: string }[] }) {
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
          {pins.map(pin => (
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

function AskD360({ destination, answers }: { destination: Destination; answers: { match: string; response: string }[] }) {
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
                  {answers.filter(a => selected?.includes(a.match)).map(a => a.response).join(' ')}
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

function PracticalInfo({ items }: { items: { title: string; content: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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
  const destination = useCurrentDestination()
  const pins = mapPinsBySlug[destination.slug] ?? mapPinsBySlug['mathura']
  const answers = askAnswersBySlug[destination.slug] ?? []
  const practicalItems = practicalInfoBySlug[destination.slug] ?? []
  return (
    <div className="bg-d360-bg font-sans">
      <Nav />
      <Hero destination={destination} />
      <QuickFacts facts={destination.quickFacts} />
      <WhyVisit destination={destination} />
      <DestinationStory destination={destination} />
      <HistoryTimeline destination={destination} />
      <CultureGrid destination={destination} />
      <FoodSection destination={destination} />
      <AttractionsGrid destination={destination} />
      <HiddenGems destination={destination} />
      <ThingsToDo destination={destination} />
      <NearbyPlaces destination={destination} />
      <HowToReach destination={destination} />
      <WhereToStay destination={destination} />
      <BestTime destination={destination} />
      <BudgetGuide destination={destination} />
      <Itineraries destination={destination} />
      <LocalExperiences destination={destination} />
      <MapSection destination={destination} pins={pins} />
      <AskD360 destination={destination} answers={answers} />
      <CommunityStories destination={destination} />
      <PracticalInfo items={practicalItems} />
      <SourcesTrust destination={destination} />
      <Footer />
    </div>
  )
}
