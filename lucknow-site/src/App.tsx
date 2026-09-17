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

// ─── Lucknow Data ───────────────────────────────────────────────────────────

const lucknow: Destination = {
  id: 'lucknow', slug: 'lucknow', name: 'Lucknow', localName: 'लखनऊ',
  destinationType: 'State Capital / Nawabi Heritage City', country: 'India', state: 'Uttar Pradesh', district: 'Lucknow',
  shortDescription: 'The city where 18th-century Nawabi grandeur, the drama of 1857, and a still-living culture of refined manners, embroidery and kebabs all share the same crowded, courteous streets.',
  tags: ['Nawabi Heritage', '1857 Rebellion', 'Awadhi Cuisine', 'Chikankari', 'State Capital', 'Heritage Architecture', 'Living Culture', 'Tehzeeb'],
  hero: { image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rumi Darwaza and Bara Imambara.jpg?width=2000', poster: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bara Imambara Lucknow.jpg?width=1600' },
  quickFacts: { bestTime: 'October to March', duration: '2-4 days', budget: 'INR 1,000 - 5,000/day', destinationType: 'State Capital / Nawabi Heritage City', difficulty: 'Easy', distance: 'Varies by origin city' },
  discoveryScore: { overall: 8.6, categories: [{ name: 'Popularity', score: 8 }, { name: 'Cultural Significance', score: 9 }, { name: 'Historical Weight', score: 9 }, { name: 'Uniqueness / Authenticity', score: 8.5 }] },
  editorial: { why: 'Lucknow is the rare Indian city where Nawabi architectural grandeur, the defining drama of the 1857 Rebellion, and a still-practised courtly culture of manners, embroidery and cuisine remain simultaneously visible and livable.', story: 'Lucknow rose to prominence as the capital of the Nawabs of Awadh, who relocated their seat of power here from Faizabad in 1775 under Nawab Asaf-ud-Daula, building a city of extraordinary architectural ambition that blended Mughal, Persian, Rajput and European influences into a distinctive Awadhi style.', storyFull: 'Lucknow rose to prominence as the capital of the Nawabs of Awadh, who relocated their seat of power here from Faizabad in 1775 under Nawab Asaf-ud-Daula. Over the following decades the Nawabs - a line of Shia Muslim rulers governing a largely Hindu population, nominally under Mughal suzerainty but increasingly dependent on the British East India Company - built a city of extraordinary architectural ambition, blending Mughal, Persian, Rajput and European classical influences into a distinctive Awadhi style. Asaf-ud-Daula\'s most famous legacy, the Bara Imambara (1784-85) and its accompanying Rumi Darwaza gateway, were built partly as a deliberate famine-relief \'food for work\' programme during a period of devastating drought - giving Lucknow one of the largest vaulted halls in the world alongside a labyrinthine upper gallery known as the Bhool Bhulaiya.\n\nThe Nawabi era ended abruptly in 1856, when the British East India Company annexed Awadh and exiled the last Nawab, Wajid Ali Shah, to Calcutta - an act of \'high-handedness\' that fed directly into the Indian Rebellion of 1857. Lucknow became one of the rebellion\'s most dramatic flashpoints: the British Residency, built from 1780 to house the Company\'s Resident at the Nawab\'s court, was besieged by rebel sepoys and loyalist forces from 25 May to 27 November 1857, in a defence organised by Sir Henry Lawrence (who was killed during the siege) and eventually relieved by Sir Colin Campbell\'s forces. Of roughly 3,000 people sheltering inside, over a thousand died before the eventual evacuation - the ruined Residency, its walls still pockmarked with shot, survives today as one of India\'s most evocative 1857 memorial sites.\n\nBeyond its monuments, Lucknow is celebrated for a living culture summed up locally in three words: tehzeeb (refined courtesy and manners), chikankari (the city\'s delicate white-thread shadow embroidery), and Tunday Kababi (the legendary galouti kebab, said to have been invented by a one-armed - tunday - chef for a toothless Nawab). Awadhi cuisine\'s slow dum-pukht cooking style, developed in Nawabi royal kitchens, produced some of North India\'s most refined non-vegetarian cooking, still served today in the old city\'s Chowk quarter alongside the bustle of Hazratganj\'s colonial-era shopping streets and the newer landmarks of Ambedkar Memorial Park and Janeshwar Mishra Park.' },
  history: { shortIntro: 'Lucknow\'s history spans the 1775 founding of the Awadh capital under the Nawabs, the architectural golden age of Asaf-ud-Daula, the pivotal 1857 Siege of the Residency, and the transition to British colonial administration.', timeline: [{ year: 'Legendary era', event: 'Local tradition credits Lakshmana, brother of Rama, as the city\'s namesake and early founder.', era: 'Legendary' }, { year: '1764', event: 'The Nawabs of Awadh are defeated by the British at the Battle of Buxar, deepening British influence over Awadh.', era: 'Early Nawabi' }, { year: '1775', event: 'Nawab Asaf-ud-Daula moves the Awadh capital from Faizabad to Lucknow.', era: 'Nawabi' }, { year: '1780-1800', event: 'Construction of the British Residency, begun under Asaf-ud-Daula and completed under Nawab Saadat Ali Khan.', era: 'Nawabi' }, { year: '1784-85', event: 'Asaf-ud-Daula commissions the Bara (Asafi) Imambara and the Rumi Darwaza, partly as famine-relief public works.', era: 'Nawabi' }, { year: '1839', event: 'Nawab Muhammad Ali Shah commissions the Chota Imambara, later serving as his own mausoleum.', era: 'Nawabi' }, { year: '1845', event: 'La Martiniere College is founded according to the will of Major General Claude Martin.', era: 'Nawabi' }, { year: '1856', event: 'The British East India Company annexes Awadh and exiles Nawab Wajid Ali Shah to Calcutta.', era: 'Colonial Transition' }, { year: '1857', event: 'The Siege of Lucknow: rebel forces besiege the British Residency from 25 May to 27 November, a pivotal episode of the Indian Rebellion.', era: '1857 Rebellion' }, { year: '1858', event: 'British forces under Sir Colin Campbell recapture Lucknow; the East India Company is later dissolved in favour of direct Crown rule.', era: 'Colonial' }] },
  culture: [{ title: 'Tehzeeb', description: 'Lucknow\'s famously elaborate, formal manner of speech and greeting - refined courtesy and gentle Hindi-Urdu speech that remains a genuine point of local pride.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bara Imambara Lucknow.jpg?width=1600' }, { title: 'Chikankari Embroidery', description: 'Lucknow\'s signature white-on-white shadow embroidery, traditionally worked on fine cotton and muslin and today one of India\'s most recognised regional textile crafts.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chikan embroidery, Lucknow.jpg?width=1600' }, { title: 'Lucknow Gharana of Kathak', description: 'One of the principal schools of the classical Kathak dance form, developed under Nawabi court patronage.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kathak dance India November 2011.jpg?width=1600' }, { title: 'Muharram at the Imambaras', description: 'Given the Nawabs\' Shia heritage, Muharram processions and majlis (mourning assemblies) remain a major annual observance centred on the Bara and Chota Imambaras.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/The Procession of \'Tazia\' passing through Chawri Bazaar, on the occasion of Muharram, in Delhi on December 17, 2010.jpg?width=1600' }, { title: 'Ganga-Jamuni Tehzeeb', description: 'Awadh\'s historic composite Hindu-Muslim cultural refinement, reflected in the city\'s shared festivals, food and courtly etiquette.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rumi Darwaza Lucknow.jpg?width=1600' }],
  food: [{ name: 'Galouti Kebab (Tunday Kebab)', description: 'Lucknow\'s most iconic dish: finely minced, deeply spiced meat tenderised with raw papaya and slow-cooked on a tawa until melt-in-the-mouth soft; legend credits its invention to a one-armed chef for a toothless Nawab.', category: 'Kebab', price: 'INR 150-400', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nihari, kabab and tandoori roti.jpg?width=1600' }, { name: 'Kakori Kebab', description: 'A celebrated Awadhi minced-meat kebab named for the nearby town of Kakori.', category: 'Kebab', price: 'INR 150-400', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nihari, kabab and tandoori roti.jpg?width=1600' }, { name: 'Awadhi Biryani', description: 'A slow dum-pukht-style biryani distinct from Hyderabadi or Kolkata styles, typically more subtly spiced.', category: 'Main Course', price: 'INR 200-500', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hyderabadi Chicken Biryani.jpg?width=1600' }, { name: 'Nihari', description: 'A slow-cooked, overnight mutton or buffalo stew, classically served with kulcha; Raheem\'s in Chowk is among the most celebrated century-old outlets.', category: 'Main Course', price: 'INR 150-350', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nihari, kabab and tandoori roti.jpg?width=1600' }, { name: 'Basket Chaat', description: 'A popular Lucknowi street-food item served in an edible potato basket.', category: 'Street Food', price: 'INR 50-150', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Panipuri, Golgappa, Phuchka.jpg?width=1600' }, { name: 'Kachori-Sabzi', description: 'A classic Lucknowi breakfast of fried lentil-stuffed kachoris with spiced potato curry.', category: 'Street Food', price: 'INR 40-100', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khasta kachori.jpg?width=1600' }, { name: 'Kulfi Falooda', description: 'A classic Lucknowi dessert combining dense kulfi with vermicelli and syrup.', category: 'Dessert', price: 'INR 60-150', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kulfi Faluda.jpg?width=1600' }, { name: 'Malai Paan Gilori', description: 'A betel-leaf-wrapped sweet speciality unique to Lucknow\'s dessert tradition.', category: 'Dessert', price: 'INR 30-100', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Malai pan.JPG?width=1600' }],
  attractions: [{ id: 'bara-imambara', name: 'Bara Imambara (Asafi Imambara)', category: 'Main Landmark / Historical-Religious', description: 'Built 1784-85 by Nawab Asaf-ud-Daula; one of the world\'s largest vaulted halls, with the famous Bhool Bhulaiya labyrinth above.', duration: '1.5-2 hrs', distance: 'City centre', score: 9.5, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bara Imambara Lucknow.jpg?width=1600' }, { id: 'rumi-darwaza', name: 'Rumi Darwaza', category: 'Main Landmark / Historical', description: 'An 18-metre gateway built 1784 by Asaf-ud-Daula, modelled on Istanbul\'s Sublime Porte; the city\'s iconic symbol.', duration: '20-30 min', distance: 'City centre', score: 9, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rumi Darwaza Lucknow.jpg?width=1600' }, { id: 'chota-imambara', name: 'Chota Imambara (Hussainabad Imambara)', category: 'Main Landmark / Historical-Religious', description: 'Built 1839 by Nawab Muhammad Ali Shah as his own mausoleum; known as the \'Palace of Lights\' for its Belgian chandeliers.', duration: '45-60 min', distance: 'City centre', score: 9, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chhota imambara Lucknow.jpg?width=1600' }, { id: 'residency', name: 'The Residency', category: 'Main Landmark / Historical', description: 'The ruined British Residency complex, site of the 87-day Siege of Lucknow in 1857; preserved in its battle-scarred state with an on-site museum.', duration: '1.5-2 hrs', distance: 'Central Lucknow, near Hazratganj', score: 9, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Residency at Lucknow in ruins.jpg?width=1600' }, { id: 'husainabad-clock-tower', name: 'Husainabad Clock Tower', category: 'Historical', description: 'A roughly 67 m clock tower built in the 1880s, among the tallest clock towers in India, near the Chota Imambara.', duration: '15-20 min', distance: 'Near Chota Imambara', score: 7, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Husainabad Clock Tower.jpg?width=1600' }, { id: 'la-martiniere', name: 'La Martiniere College (Constantia)', category: 'Historical', description: 'An 1845-founded school whose principal and students defended the Residency during the 1857 siege; a striking, eclectic 18th-century building.', duration: '30-45 min (exterior)', distance: '5.2 km from Charbagh', score: 7.5, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/La Martiniere College Lucknow.jpg?width=1600' }, { id: 'state-museum', name: 'State Museum & Picture Gallery', category: 'Museum / Cultural', description: 'Houses portraits of the Nawabs of Awadh and other regional historical artefacts.', duration: '45-60 min', distance: 'City centre', score: 7, image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Amohini relief, Mathura, circa 15 CE.jpg?width=1600' }],
  hiddenGems: [{ name: 'Husainabad Clock Tower', why: 'Overshadowed by the nearby Chota Imambara, this 1880s tower is among the tallest clock towers in India and rarely gets the attention it deserves.', distance: 'Near Chota Imambara', duration: '15-20 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Husainabad Clock Tower.jpg?width=1600' }, { name: 'La Martiniere College (Constantia)', why: 'A striking, eclectic 18th-century school building with a genuine 1857 siege history, often skipped in favour of the main Imambaras.', distance: '5.2 km from Charbagh', duration: '30-45 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/La Martiniere College Lucknow.jpg?width=1600' }, { name: 'Kakori', why: 'The small town that gave its name to the Kakori kebab, and the site of the historic 1925 Kakori train action - a worthwhile half-day detour for food and history enthusiasts.', distance: '~15-20 km', duration: 'Half day', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nihari, kabab and tandoori roti.jpg?width=1600' }, { name: 'State Museum & Picture Gallery', why: 'A quieter counterpoint to the crowded Imambaras, with rare portraits of the Nawabs of Awadh.', distance: 'City centre', duration: '45-60 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Amohini relief, Mathura, circa 15 CE.jpg?width=1600' }],
  thingsToDo: [{ activity: 'Explore the Bhool Bhulaiya labyrinth atop the Bara Imambara', duration: '45-60 min', cost: 'Included in Imambara entry', difficulty: 'Easy-Moderate (stairs, narrow passages)', bestTime: 'Morning', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bara Imambara Lucknow.jpg?width=1600' }, { activity: 'Food walk through Chowk (Tunday Kababi, Raheem\'s Nihari, Ram Asrey sweets)', duration: '2-3 hrs', cost: 'INR 400-800 per person', difficulty: 'Easy', bestTime: 'Evening', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nihari, kabab and tandoori roti.jpg?width=1600' }, { activity: 'Watch a chikankari artisan at work in the old city', duration: '30-45 min', cost: 'Free to observe; purchases optional', difficulty: 'Easy', bestTime: 'Daytime', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chikan embroidery, Lucknow.jpg?width=1600' }, { activity: 'Evening stroll and shopping in Hazratganj', duration: '1-2 hrs', cost: 'Variable', difficulty: 'Easy', bestTime: 'Evening', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hazratganj Lucknow.jpg?width=1600' }, { activity: 'Walk or cycle through Janeshwar Mishra Park', duration: '1-2 hrs', cost: 'Free', difficulty: 'Easy', bestTime: 'Morning or evening', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hazratganj Lucknow.jpg?width=1600' }, { activity: 'Visit the Residency museum and battlefield grounds', duration: '1.5-2 hrs', cost: 'Nominal entry fee', difficulty: 'Easy', bestTime: 'Morning', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Residency at Lucknow in ruins.jpg?width=1600' }],
  nearbyPlaces: [{ name: 'Kakori', distance: '~15-20 km', type: 'Historical / Culinary', travelTime: '30-40 min', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nihari, kabab and tandoori roti.jpg?width=1600' }, { name: 'Kanpur', distance: '~86-90 km', type: 'City / Heritage', travelTime: '~1.5-2 hrs', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hazratganj Lucknow.jpg?width=1600' }, { name: 'Ayodhya', distance: '~130-135 km', type: 'Pilgrimage', travelTime: '~2.5-3 hrs', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ram Janmbhoomi Mandir, Ayodhya Dham.jpg?width=1600' }, { name: 'Jhansi', distance: '~316 km', type: 'Heritage / Bundelkhand Circuit', travelTime: '~5-6 hrs', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Residency at Lucknow in ruins.jpg?width=1600' }, { name: 'Agra', distance: '~320-330 km', type: 'Heritage (Taj Mahal)', travelTime: '~5-6 hrs', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Taj Mahal-10.jpg?width=1600' }],
  travel: { air: { airport: 'Chaudhary Charan Singh International Airport (LKO)', distance: '15-20 km from city centre', time: '30-45 min' }, rail: { station: 'Lucknow Charbagh (LKO)', distance: 'City centre', time: 'N/A' }, road: { highway: 'NH27 / Lucknow-Agra Expressway', distance: 'Kanpur 86 km, Agra ~320-330 km, Jhansi ~316 km, Varanasi ~280 km', time: 'Varies by destination' } },
  stay: { categories: [{ type: 'Budget', range: 'INR 800-1,800/night', options: ['Hotels near Charbagh station', 'Budget lodges in Aminabad'] }, { type: 'Mid-range', range: 'INR 2,000-4,500/night', options: ['Hotels in Hazratganj', 'Business hotels in Gomti Nagar'] }, { type: 'Premium', range: 'INR 5,000+/night', options: ['Business/luxury hotels near the airport corridor', 'Boutique heritage-style stays in the old city'] }] },
  bestTime: { months: [{ month: 'Jan', status: 'ideal' }, { month: 'Feb', status: 'ideal' }, { month: 'Mar', status: 'good' }, { month: 'Apr', status: 'avoid' }, { month: 'May', status: 'avoid' }, { month: 'Jun', status: 'avoid' }, { month: 'Jul', status: 'good' }, { month: 'Aug', status: 'good' }, { month: 'Sep', status: 'good' }, { month: 'Oct', status: 'ideal' }, { month: 'Nov', status: 'ideal' }, { month: 'Dec', status: 'ideal' }] },
  budget: { tiers: [{ tier: 'Budget', perDay: 'INR 1,000-1,800', breakdown: [{ category: 'Accommodation', amount: 'INR 500-800' }, { category: 'Food', amount: 'INR 250-500' }, { category: 'Local Transport', amount: 'INR 150-300' }, { category: 'Entry Fees', amount: 'INR 100-200' }] }, { tier: 'Mid-range', perDay: 'INR 2,500-5,000', breakdown: [{ category: 'Accommodation', amount: 'INR 1,500-3,000' }, { category: 'Food', amount: 'INR 500-1,000' }, { category: 'Local Transport', amount: 'INR 300-600' }, { category: 'Entry Fees & Shopping', amount: 'INR 200-400' }] }] },
  itineraries: { '1 Day': [{ day: 1, schedule: [{ time: 'Morning', place: 'Bara Imambara and the Bhool Bhulaiya; Rumi Darwaza; Chota Imambara and Husainabad Clock Tower' }, { time: 'Afternoon', place: 'The Residency; lunch in Chowk (Tunday Kababi, Raheem\'s Nihari)' }, { time: 'Evening', place: 'Hazratganj for shopping, chikankari and dinner' }] }], '2 Days': [{ day: 1, schedule: [{ time: 'Day 1', place: 'Core heritage circuit - Bara Imambara, Rumi Darwaza, Chota Imambara, the Residency; overnight in Lucknow' }] }, { day: 2, schedule: [{ time: 'Day 2', place: 'State Museum and Picture Gallery; Dr. Ambedkar Memorial Park; Janeshwar Mishra Park; La Martiniere College exterior; evening food crawl in Chowk/Aminabad' }] }], '3 Days': [{ day: 1, schedule: [{ time: 'Day 1', place: 'Core heritage circuit - Bara Imambara, Rumi Darwaza, Chota Imambara, the Residency; overnight in Lucknow' }] }, { day: 2, schedule: [{ time: 'Day 2', place: 'State Museum and Picture Gallery; Dr. Ambedkar Memorial Park; Janeshwar Mishra Park; La Martiniere College exterior; evening food crawl in Chowk/Aminabad' }] }, { day: 3, schedule: [{ time: 'Day 3', place: 'Optional day trip to Kakori, or a half-day extension toward Ayodhya for a combined Awadh heritage-and-pilgrimage circuit' }] }] },
  experiences: [{ title: 'Guided Heritage Walk in Chowk', duration: '2-3 hrs', price: 'Variable (guide fee)', category: 'Heritage Walk', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bara Imambara Lucknow.jpg?width=1600' }, { title: 'Chikankari Workshop Visit', duration: '30-45 min', price: 'Free to visit; purchases optional', category: 'Craft Experience', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chikan embroidery, Lucknow.jpg?width=1600' }, { title: 'Awadhi Food Trail (Tunday Kababi, Raheem\'s Nihari, Ram Asrey)', duration: '2-3 hrs', price: 'INR 400-800 per person', category: 'Culinary', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nihari, kabab and tandoori roti.jpg?width=1600' }, { title: 'Kathak Performance (Lucknow Gharana)', duration: '1-1.5 hrs', price: 'Variable, seasonal availability', category: 'Performing Arts', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kathak dance India November 2011.jpg?width=1600' }, { title: 'Muharram Majlis Observance (seasonal, respectful observer)', duration: 'Variable', price: 'Free', category: 'Religious / Cultural', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/The Procession of \'Tazia\' passing through Chawri Bazaar, on the occasion of Muharram, in Delhi on December 17, 2010.jpg?width=1600' }],
  aiPrompts: ['What is the real story behind the 1857 Siege of the Lucknow Residency?', 'Why was the Bara Imambara built during a famine, and what makes its Bhool Bhulaiya labyrinth unique?', 'Plan a one-day Lucknow itinerary covering the Nawabi monuments and the best kebab and nihari spots in Chowk.', 'What is chikankari embroidery, and where can I see artisans making it in Lucknow?', 'How do I combine Lucknow with Ayodhya or Kanpur for a longer Awadh-region trip?'],
  reviews: [],
  sources: { official: ['Incredible India (incredibleindia.gov.in)', 'UP Tourism'], historical: ['Wikipedia - Lucknow, Rumi Darwaza, Asaf-ud-Daula, Siege of Lucknow', 'Britannica - Siege of Lucknow', 'Live History India - The Fall of Lucknow'], lastVerified: '2026-09-17' }
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
          {[{ top: '35%', left: '45%', label: 'Bara Imambara' }, { top: '42%', left: '38%', label: 'Rumi Darwaza' }, { top: '28%', left: '52%', label: 'The Residency' }].map(pin => (
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
                  {selected?.includes('Siege of the Lucknow Residency') && `The 87-day siege ran from July to November 1857, when a British garrison and loyal sepoys held out inside the Residency compound against rebel forces during the Indian Rebellion of 1857. It was finally relieved in stages by relief forces under Sir Henry Havelock and later Sir Colin Campbell. The ruins were deliberately never rebuilt — cannonball-scarred walls still stand today as a memorial, with an on-site museum detailing the siege.`}
                  {selected?.includes('built during a famine') && `Nawab Asaf-ud-Daula commissioned the Bara Imambara in 1784 partly as a famine-relief works project — nobles worked by day for wages, and by night quietly demolished sections so the poor could rebuild and keep earning, a scheme locally remembered as "Food for Work". The Bhool Bhulaiya above the main hall is a maze of narrow interconnected passages, originally designed to support the roof's weight, that visitors can now explore with a guide.`}
                  {selected?.includes('one-day Lucknow itinerary') && `Start at Bara Imambara for the Bhool Bhulaiya and Rumi Darwaza, then Chota Imambara and the Husainabad Clock Tower nearby. In the afternoon, visit the Residency, then head to Chowk for Tunday Kababi's galouti kebabs and Raheem's nihari. End the evening with a stroll and dinner in Hazratganj.`}
                  {selected?.includes('chikankari embroidery') && `Chikankari is Lucknow's signature white-on-white shadow embroidery, traditionally hand-worked on fine cotton and muslin using dozens of distinct stitch types. You can watch artisans at work in workshops around the old city — Chowk and the lanes near Aminabad are the easiest places to find working karigars, with finished pieces sold at both roadside stalls and established boutiques.`}
                  {selected?.includes('Ayodhya or Kanpur') && `Ayodhya is about 130–135 km away (roughly 2.5–3 hours by road), making it an easy extension for a combined Awadh heritage-and-pilgrimage trip. Kanpur is closer still at 86–90 km (1.5–2 hours), and works well as a stopover if you're continuing toward Jhansi or the Bundelkhand circuit.`}
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
    { title: 'Safety', content: 'Lucknow is generally safe for tourists, with the usual big-city precautions around crowded areas like Chowk and the Imambara complexes. Security is tighter around Bara Imambara and the Residency during Muharram and national holidays, so allow extra time and carry ID.' },
    { title: 'Local Transport', content: 'Auto-rickshaws, e-rickshaws and app-based cabs cover the city well; the Lucknow Metro connects Charbagh to Hazratganj and beyond. For a day covering Chowk, the Imambaras and the Residency, a pre-booked auto or taxi for a few hours is more efficient than hailing separately at each stop.' },
    { title: 'Photography Rules', content: 'Photography is generally welcome at Bara Imambara, Rumi Darwaza, Chota Imambara and the Residency grounds. Inside some Imambara sanctums and during active Muharram majlis observances, photography may be restricted or considered inappropriate — check with staff and be respectful of mourners.' },
    { title: 'Dress & Etiquette', content: 'Modest dress is appreciated at the Imambaras, particularly for women. Lucknow prides itself on tehzeeb — its refined, courteous manner of speech — so a polite greeting goes a long way. If observing a Muharram majlis, dress modestly in dark colours and remain a quiet, respectful observer.' },
    { title: 'Emergency Information', content: 'Police: 100 · Ambulance: 108 · UP Tourist Helpline: 1800-180-1414 · Lucknow Police Control: 0522-2623000. King George Medical University and several major private hospitals serve the city.' },
    { title: 'Travel Tips', content: 'Visit Bara Imambara early morning to enjoy the Bhool Bhulaiya before tour groups arrive. Save Chowk food stops for evening when stalls are at their liveliest. If visiting during Muharram, book accommodation ahead and expect road diversions near the Imambaras on major mourning days.' }
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
      <Hero destination={lucknow} />
      <QuickFacts facts={lucknow.quickFacts} />
      <WhyVisit destination={lucknow} />
      <DestinationStory destination={lucknow} />
      <HistoryTimeline destination={lucknow} />
      <CultureGrid destination={lucknow} />
      <FoodSection destination={lucknow} />
      <AttractionsGrid destination={lucknow} />
      <HiddenGems destination={lucknow} />
      <ThingsToDo destination={lucknow} />
      <NearbyPlaces destination={lucknow} />
      <HowToReach destination={lucknow} />
      <WhereToStay destination={lucknow} />
      <BestTime destination={lucknow} />
      <BudgetGuide destination={lucknow} />
      <Itineraries destination={lucknow} />
      <LocalExperiences destination={lucknow} />
      <MapSection destination={lucknow} />
      <AskD360 destination={lucknow} />
      <CommunityStories destination={lucknow} />
      <PracticalInfo />
      <SourcesTrust destination={lucknow} />
      <Footer />
    </div>
  )
}
