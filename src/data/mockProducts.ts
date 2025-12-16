export interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    category: 'Electronics' | 'Fashion' | 'Home' | 'Gaming' | 'Beauty';
    image: string;
    description: string;
}

export const PRODUCTS: Product[] = [
    // Electronics
    { id: 1, name: "DRIP Audio Max", price: 29999, rating: 4.8, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", description: "Basst boosted, noise cancelled. Pure vibe." },
    { id: 2, name: "Neon Mech 60", price: 14999, rating: 4.5, category: "Electronics", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80", description: "Clicky switches with custom RGB drip." },
    { id: 3, name: "Cyber Glider Pro", price: 8999, rating: 4.2, category: "Electronics", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80", description: "Zero drag. Infinite headshots." },
    { id: 4, name: "Quantum Core 9", price: 59999, rating: 5.0, category: "Electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80", description: "Process reality faster than it happens." },
    { id: 5, name: "Holo Watch V", price: 39999, rating: 4.7, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", description: "Wear the future on your wrist." },
    { id: 6, name: "Void 4K Panel", price: 89999, rating: 4.9, category: "Electronics", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", description: "Blacker than black OLED." },
    { id: 7, name: "Sonic Boom Box", price: 12999, rating: 4.6, category: "Electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80", description: "Start the party anywhere." },
    { id: 8, name: "Sky Cam X1", price: 49999, rating: 4.4, category: "Electronics", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&q=80", description: "See the world from god mode." },
    { id: 9, name: "Reality Visor", price: 34999, rating: 4.3, category: "Electronics", image: "https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?w=500&q=80", description: "Escape the matrix." },
    { id: 10, name: "Smart Monolith", price: 7999, rating: 4.1, category: "Electronics", image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&q=80", description: "Obey your voice commands." },

    // Fashion
    { id: 11, name: "Ops Jacket", price: 19999, rating: 4.7, category: "Fashion", image: "https://images.unsplash.com/photo-1551028919-ac66e624ec06?w=500&q=80", description: "Tactical streetwear for the urban ninja." },
    { id: 12, name: "Cyber Stompers", price: 15999, rating: 4.5, category: "Fashion", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80", description: "Crush the pavement." },
    { id: 13, name: "3M Joggers", price: 8999, rating: 4.2, category: "Fashion", image: "https://images.unsplash.com/photo-1588696722883-500b58309df9?w=500&q=80", description: "Shine bright in the dark." },
    { id: 14, name: "Nano Tee", price: 4999, rating: 4.6, category: "Fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80", description: "Sweat-proof, stain-proof, life-proof." },
    { id: 15, name: "Neo Shades", price: 12999, rating: 4.8, category: "Fashion", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&q=80", description: "Block the haters + UV rays." },
    { id: 16, name: "Loadout Vest", price: 11999, rating: 4.4, category: "Fashion", image: "https://images.unsplash.com/photo-1512353087810-25dfcd100962?w=500&q=80", description: "Carry everything." },
    { id: 17, name: "Carbon Wallet", price: 5999, rating: 4.9, category: "Fashion", image: "https://images.unsplash.com/photo-1627123424574-18bd75f72674?w=500&q=80", description: "Indestructible cash storage." },
    { id: 18, name: "Nomad Pack", price: 14999, rating: 4.7, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", description: "Your mobile base of operations." },
    { id: 19, name: "Luma Beanie", price: 3999, rating: 4.1, category: "Fashion", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&q=80", description: "Lit. Literally." },
    { id: 20, name: "NFC Ring", price: 19999, rating: 4.5, category: "Fashion", image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=500&q=80", description: "Pay with a fist bump." },

    // Gaming
    { id: 21, name: "Elite Controller", price: 17999, rating: 4.9, category: "Gaming", image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d88?w=500&q=80", description: "No excuses. Just wins." },
    { id: 22, name: "Chroma Mat XL", price: 4999, rating: 4.3, category: "Gaming", image: "https://images.unsplash.com/photo-1615663245857-acda6b025e6e?w=500&q=80", description: "The foundation of your aim." },
    { id: 23, name: "Titan Throne", price: 49999, rating: 4.6, category: "Gaming", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80", description: "Sit like a king." },
    { id: 24, name: "Macro Deck", price: 9999, rating: 4.7, category: "Gaming", image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80", description: "Control your stream." },
    { id: 25, name: "Stream Cap 4K", price: 19999, rating: 4.5, category: "Gaming", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80", description: "Capture every frame." },
    { id: 26, name: "Flow Stand", price: 2999, rating: 4.2, category: "Gaming", image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=500&q=80", description: "Display your console." },
    { id: 27, name: "VR Stock", price: 8999, rating: 4.4, category: "Gaming", image: "https://images.unsplash.com/photo-1616499370260-485b3e5ed653?w=500&q=80", description: "Aim true in VR." },
    { id: 28, name: "Battlestation Desk", price: 29999, rating: 4.8, category: "Gaming", image: "https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?w=500&q=80", description: "The ultimate setup base." },
    { id: 29, name: "Headset Rest", price: 3999, rating: 4.1, category: "Gaming", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80", description: "Respect your gear." },
    { id: 30, name: "Boom Arm", price: 5999, rating: 4.6, category: "Gaming", image: "https://images.unsplash.com/photo-1590845947844-3c6600c32d43?w=500&q=80", description: "Studio quality positioning." },

    // Home
    { id: 31, name: "Luma Bulb", price: 2999, rating: 4.5, category: "Home", image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500&q=80", description: "Set the mood." },
    { id: 32, name: "Clean Bot", price: 39999, rating: 4.7, category: "Home", image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?w=500&q=80", description: "Never sweep again." },
    { id: 33, name: "Pure Air", price: 14999, rating: 4.8, category: "Home", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80", description: "Breathe easy." },
    { id: 34, name: "Secure Lock", price: 19999, rating: 4.6, category: "Home", image: "https://images.unsplash.com/photo-1558002038-1091a1661116?w=500&q=80", description: "Your fingerprint is the key." },
    { id: 35, name: "Java Bot", price: 12999, rating: 4.4, category: "Home", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80", description: "Morning fuel generator." },
    { id: 36, name: "Flora Sense", price: 1999, rating: 4.2, category: "Home", image: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=500&q=80", description: "Talk to your plants." },
    { id: 37, name: "Vibe Strip 5m", price: 3999, rating: 4.5, category: "Home", image: "https://images.unsplash.com/photo-1552345371-55822cc0d2cb?w=500&q=80", description: "Instant atmosphere." },
    { id: 38, name: "Eco Stat", price: 16999, rating: 4.7, category: "Home", image: "https://images.unsplash.com/photo-1563461661026-6b22533c33fd?w=500&q=80", description: "Smart climate control." },
    { id: 39, name: "Sentry Cam", price: 8999, rating: 4.3, category: "Home", image: "https://images.unsplash.com/photo-1557324232-b8917d3c3d63?w=500&q=80", description: "Watch over your domain." },
    { id: 40, name: "Mist Zen", price: 4999, rating: 4.6, category: "Home", image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=500&q=80", description: "Relaxification device." },

    // Beauty
    { id: 41, name: "Nano Mist", price: 5999, rating: 4.4, category: "Beauty", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&q=80", description: "Spa day at home." },
    { id: 42, name: "Sonic Clean", price: 8999, rating: 4.8, category: "Beauty", image: "https://images.unsplash.com/photo-1559591937-e1bc15e5a23c?w=500&q=80", description: "Next level smile." },
    { id: 43, name: "Ion Dry", price: 19999, rating: 4.7, category: "Beauty", image: "https://images.unsplash.com/photo-1522338140262-b57f951e7075?w=500&q=80", description: "Blow away the competition." },
    { id: 44, name: "Glow Mirror", price: 7999, rating: 4.5, category: "Beauty", image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&q=80", description: "Perfect lighting always." },
    { id: 45, name: "Derma Set", price: 12999, rating: 4.9, category: "Beauty", image: "https://images.unsplash.com/photo-1556228720-1957be83f311?w=500&q=80", description: "Skin so glass." },
    { id: 46, name: "Pro Brushes", price: 4999, rating: 4.6, category: "Beauty", image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?w=500&q=80", description: "Artist tools." },
    { id: 47, name: "Fizz Bombs", price: 2999, rating: 4.3, category: "Beauty", image: "https://images.unsplash.com/photo-1601618361517-cbe0ea2717ce?w=500&q=80", description: "Bath time explosion." },
    { id: 48, name: "Sharp Edge", price: 6999, rating: 4.5, category: "Beauty", image: "https://images.unsplash.com/photo-1559737446-aa3c5e03239a?w=500&q=80", description: "Clean cut." },
    { id: 49, name: "Percussion", price: 14999, rating: 4.8, category: "Beauty", image: "https://images.unsplash.com/photo-1598209279122-8541213a0383?w=500&q=80", description: "Muscle relief." },
    { id: 50, name: "UV Cure", price: 3999, rating: 4.4, category: "Beauty", image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500&q=80", description: "Salon nails at home." },
];
