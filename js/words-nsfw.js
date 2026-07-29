// Just One companion · the after-dark word bank. Adults only.
//
//   DEEP_UNDERCOVER — the 390-word list from the koosvary/codenames repo
//   (word_lists/deep_undercover.txt), sentence-cased for the card. Robert
//   picked this list specifically: it is innuendo-first rather than
//   shock-first, which is exactly what the game needs — a word nobody can
//   hint at politely is still a word five people can hint at.
//
//   EXTRA — written for this app in the same register. Same test as the SFW
//   bank: can five people each write ONE word about it, and are they likely
//   to write five different ones?
//
// Words appear in both banks (Bacon, Beach, Candle, Sheep…) and that is fine —
// only one bank is ever loaded, and the innocent word is the joke.

const WORDS_NSFW_BASE = [
  "Acid", "Alcohol", "Animal", "Apples", "Ashes",
  "Ass", "Bacon", "Baked", "Balloon", "Balls",
  "Banana", "Bang", "Bar", "Bartender", "Beach",
  "Beans", "Bear", "Beaver", "Bed", "Beef",
  "Beer", "Behind", "Bender", "Biscuits", "Bisexual",
  "Bitch", "Black", "Bling", "Blonde", "Blow",
  "Blush", "Body", "Bond", "Bondage", "Bone",
  "Bong", "Boob", "Booty", "Booze", "Bottle",
  "Bottom", "Bowl", "Box", "Boxers", "Boy",
  "Bra", "Breast", "Briefs", "Brown", "Brownie",
  "Burn", "Bush", "Bust", "Butt", "Caboose",
  "Candle", "Cannons", "Carpet", "Catcher", "Chains",
  "Champagne", "Chaps", "Cheek", "Cherry", "Chest",
  "Chick", "Choke", "Chubby", "Cigar", "Cigarette",
  "Clam", "Clap", "Club", "Cock", "Cocktail",
  "Commando", "Condom", "Coozie", "Couch", "Cougar",
  "Couple", "Cowgirl", "Coyote", "Crabs", "Crack",
  "Crap", "Cream", "Cucumber", "Cuddle", "Cuffs",
  "Daddy", "Dame", "Diarrhea", "Dick", "Dildo",
  "Doggy", "Dominate", "Donkey", "Douche", "Down",
  "Drag", "Drill", "Drunk", "Eat", "Emission",
  "Escort", "Experiment", "Eyes", "Facial", "Fantasy",
  "Fatty", "Feather", "Fecal", "Fetish", "Film",
  "Finger", "Fire", "Fish", "Fist", "Flash",
  "Flesh", "Flower", "Fluff", "Foreskin", "Freak",
  "Freckles", "French", "Friction", "Furry", "Gag",
  "Gang", "Gangbang", "Gash", "Gay", "Gerbil",
  "Gigolo", "Girl", "Goose", "Grandma", "Grass",
  "Grope", "Group", "Gspot", "Hammer", "Hamster",
  "Hand", "Head", "Headboard", "Headlights", "Hell",
  "Herb", "High", "Hole", "Homerun", "Hooker",
  "Hooters", "Horny", "Horse", "Hose", "Hot",
  "Hotel", "Hump", "Hurl", "Ice", "Inch",
  "Intern", "Jazz", "Jerk", "Jewels", "Job",
  "John", "Johnson", "Joint", "Joystick", "Jugs",
  "Juice", "Keg", "Kinky", "Kitty", "Knees",
  "Knob", "Knockers", "Latex", "Legend", "Legs",
  "Lick", "Lighter", "Line", "Lingerie", "Lips",
  "Liquor", "Lizard", "Lobster", "Log", "Loose",
  "Lotion", "Love", "Lube", "Lust", "Manboobs",
  "Martini", "Mattress", "Meat", "Melons", "Member",
  "Mesh", "Milk", "Missionary", "Mixer", "Moist",
  "Mole", "Mom", "Monkey", "Motel", "Motorboat",
  "Mouth", "Movie", "Mug", "Mushroom", "Nail",
  "Naked", "Navel", "Necklace", "Needle", "Nipple",
  "Noodle", "Nude", "Nurse", "Nuts", "Nylon",
  "Olive", "Onion", "Orgasm", "Orgy", "Oyster",
  "Package", "Paddle", "Peaches", "Pecker", "Pee",
  "Penis", "Period", "Pickle", "Pie", "Pig",
  "Pillows", "Pimp", "Pinch", "Pink", "Pipe",
  "Pitcher", "Player", "Poker", "Pole", "Poop",
  "Pork", "Porn", "Pot", "Pound", "Prick",
  "Prison", "Prostate", "Pub", "Pucker", "Purple",
  "Pussy", "Queef", "Queen", "Queer", "Rack",
  "Rave", "Rectum", "Red", "Regret", "Roach",
  "Roll", "Roof", "Rookie", "Rubber", "Rug",
  "Sack", "Safe", "Salad", "Sauna", "Sausage",
  "Score", "Screw", "Secretary", "Seed", "Semen",
  "Sex", "Shaft", "Shame", "Share", "Shave",
  "Sheep", "Shot", "Shower", "Sin", "Skank",
  "Skid", "Skirt", "Slut", "Smegma", "Smell",
  "Smoke", "Snake", "Snatch", "Sniff", "Snort",
  "Softballs", "Solo", "Sore", "Spank", "Speed",
  "Sperm", "Spoon", "Spread", "Squirt", "Stalker",
  "Steamy", "Stiff", "Stiletto", "Stones", "Stool",
  "Straight", "Strap", "Strip", "Stripper", "Strobe",
  "Stud", "Swallow", "Sweat", "Swimmers", "Taboo",
  "Taco", "Tail", "Tap", "Tavern", "Teabag",
  "Tease", "Tent", "Tequila", "Threesome", "Throat",
  "Tickle", "Tie", "Tip", "Tit", "Tongue",
  "Tool", "Top", "Torture", "Touch", "Touchdown",
  "Toy", "Train", "Tramp", "Trim", "Trousers",
  "Trunk", "Tubesteak", "Tuna", "Turd", "Twig",
  "Udders", "Uranus", "Vasectomy", "Vegas", "Vein",
  "Vibrator", "Video", "Vinyl", "Virgin", "Vodka",
  "Vomit", "Wad", "Wang", "Waste", "Watch",
  "Wax", "Weed", "Wench", "Wet", "Whip",
  "Whiskey", "White", "Wiener", "Wine", "Wood",
];

const WORDS_NSFW_EXTRA = [
  // Bits, by any other name
  "Todger", "Willy", "Knackers", "Bollocks", "Schlong",
  "Salami", "Chorizo", "Bratwurst", "Frankfurter", "Eggplant",
  "Coconuts", "Grapefruit", "Muffin", "Buns", "Baguette",
  "Crumpet", "Tart", "Cupcake", "Honeypot", "Muff",
  "Fanny", "Minge", "Growler", "Bulge", "Cleavage",
  "Thigh", "Rump", "Belly", "Dimple", "Nape",
  "Curves", "Perky", "Saggy", "Hairy", "Smooth",

  // Things people do
  "Snog", "Pash", "Grind", "Thrust", "Straddle",
  "Ride", "Nibble", "Slap", "Smack", "Squeeze",
  "Rub", "Stroke", "Grab", "Bite", "Moan",
  "Groan", "Gasp", "Pant", "Wink", "Flirt",
  "Seduce", "Woo", "Shag", "Bonk", "Romp",
  "Canoodle", "Necking", "Petting", "Snuggle", "Jiggle",
  "Wiggle", "Smash", "Nudge", "Ogle", "Leer",

  // Modern romance
  "Hookup", "Fling", "Rebound", "Ghosting", "Sexting",
  "Swipe", "Match", "Tinder", "Nudes", "Thirst",
  "Simp", "Rizz", "Situationship", "Breadcrumb", "Benching",
  "Netflix", "Chill", "Slide", "Filter", "Catfishing",

  // Props and outfits
  "Blindfold", "Handcuff", "Massage", "Oil", "Petals",
  "Silk", "Satin", "Fishnet", "Garter", "Corset",
  "Thong", "Gstring", "Panties", "Knickers", "Undies",
  "Speedo", "Mankini", "Bikini", "Topless", "Nudist",
  "Streaker", "Bathhouse", "Lipstick", "Perfume", "Heels",

  // Scenes of the crime
  "Backseat", "Bathroom", "Basement", "Balcony", "Rooftop",
  "Jacuzzi", "Hottub", "Cabin", "Suite", "Honeymoon",
  "Vacancy", "Nightclub", "Karaoke", "Casino", "Cruise",
  "Bachelorette", "Hens", "Stag", "Buck", "Toga",
  "Frat", "Dorm", "Prom", "Cabana", "Brothel",
  "Alley", "Booth", "Bunk", "Curtains", "Doorknob",

  // The drinking
  "Shots", "Blunt", "Vape", "Hangover", "Blackout",
  "Chunder", "Spew", "Munchies", "Stoned", "Wasted",
  "Plastered", "Legless", "Buzzed", "Tipsy", "Sober",
  "Detox", "Rounds", "Shout", "Skulling", "Goon",
  "Cask", "Slab", "Tinnie", "Pint", "Schooner",
  "Nightcap", "Absinthe", "Moonshine", "Aspirin", "Chaser",

  // The unglamorous truth
  "Fart", "Belch", "Burp", "Stench", "Sweaty",
  "Sticky", "Crusty", "Stain", "Wedgie", "Chafe",
  "Rash", "Itch", "Lice", "Wart", "Zit",
  "Pimple", "Snot", "Drool", "Slobber", "Spit",
  "Gargle", "Retch", "Puke", "Heave", "Bloating",
  "Flatulence", "Morning", "Regrets", "Taxi", "Leftovers",

  // The cast
  "Milf", "Sugar", "Toyboy", "Wingman", "Casanova",
  "Womaniser", "Bachelor", "Spinster", "Divorcee", "Mistress",
  "Homewrecker", "Creep", "Perv", "Flasher", "Bimbo",
  "Himbo", "Hunk", "Beefcake", "Silverfox", "Dilf",

  // The feelings
  "Consent", "Safeword", "Roleplay", "Foreplay", "Aftercare",
  "Chemistry", "Tension", "Sparks", "Butterflies", "Crush",
  "Longing", "Frisky", "Naughty", "Filthy", "Dirty",
  "Raunchy", "Saucy", "Racy", "Risque", "Scandal",
  "Affair", "Cheating", "Divorce", "Prenup", "Alimony",
];

const WORDS_NSFW = WORDS_NSFW_BASE.concat(WORDS_NSFW_EXTRA);

if (typeof module !== "undefined" && module.exports) {
  module.exports = { WORDS_NSFW, WORDS_NSFW_BASE, WORDS_NSFW_EXTRA };
}
