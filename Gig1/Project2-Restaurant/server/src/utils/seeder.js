require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const Reservation = require('../models/Reservation');
const Order = require('../models/Order');

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

const sampleUsers = [
  {
    name: 'FrameForge Admin',
    email: 'admin@gourmethaven.com',
    password: process.env.ADMIN_SEED_PASSWORD || 'admin123',
    role: 'admin',
    avatar: DEFAULT_AVATAR,
    phone: '+91 98765 43210'
  },
  {
    name: 'Ananya Deshmukh',
    email: 'user@gourmethaven.com',
    password: 'user123',
    role: 'user',
    avatar: DEFAULT_AVATAR,
    phone: '+91 91234 56789'
  }
];

const sampleDishes = [
  {
    title: 'Truffle Infused Wild Mushroom Risotto',
    description: 'Arborio rice slow-simmered with porcini stock, shaved black winter truffle, aged Parmigiano-Reggiano crisps, and micro-herbs.',
    price: 890,
    category: 'Chef Specials',
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'Chef Signature'],
    spiceLevel: 'None',
    preparationTime: 25,
    calories: 520,
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    rating: 4.9,
    numReviews: 68
  },
  {
    title: 'Pan-Seared Atlantic Salmon Fillet',
    description: 'Crisp-skin Scottish salmon served over saffron cauliflower purée, charred broccolini, and a delicate citrus dill beurre blanc.',
    price: 1250,
    category: 'Main Course',
    dietaryTags: ['Gluten-Free', 'Halal', 'Chef Signature'],
    spiceLevel: 'Mild',
    preparationTime: 22,
    calories: 610,
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    rating: 4.9,
    numReviews: 84
  },
  {
    title: 'San Marzano Burrata Caprese Flatbread',
    description: 'Hand-stretched sourdough crust fired in our 800° wood stone oven, DOP buffalo burrata, heirloom cherry tomatoes, cold-pressed olive oil, and organic basil leaves.',
    price: 740,
    category: 'Woodfired & Pasta',
    dietaryTags: ['Vegetarian'],
    spiceLevel: 'Mild',
    preparationTime: 18,
    calories: 580,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    rating: 4.8,
    numReviews: 95
  },
  {
    title: 'Crispy Rosemary Calamari Fritti',
    description: 'Tender squid dusted in seasoned semolina crust, flash fried with fresh rosemary sprigs, roasted garlic aioli, and charred Meyer lemon wedge.',
    price: 650,
    category: 'Starters',
    dietaryTags: ['Halal'],
    spiceLevel: 'Mild',
    preparationTime: 15,
    calories: 420,
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    rating: 4.7,
    numReviews: 53
  },
  {
    title: 'Handmade Black Truffle Tagliolini',
    description: 'Fresh artisanal pasta ribbons tossed in cultured French butter, emulsion of egg yolks, cracked Tellicherry pepper, and freshly grated Norcia black truffle.',
    price: 980,
    category: 'Woodfired & Pasta',
    dietaryTags: ['Vegetarian', 'Chef Signature'],
    spiceLevel: 'Mild',
    preparationTime: 20,
    calories: 640,
    imageUrl: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    rating: 4.9,
    numReviews: 112
  },
  {
    title: 'Spiced Avocado & Edamame Crostini',
    description: 'Crushed Hass avocado on toasted artisanal sourdough, edamame beans, toasted pepitas, feta snow, pomegranate pearls, and sumac vinaigrette.',
    price: 520,
    category: 'Starters',
    dietaryTags: ['Vegetarian', 'Vegan'],
    spiceLevel: 'Medium',
    preparationTime: 12,
    calories: 340,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    rating: 4.6,
    numReviews: 41
  },
  {
    title: 'Sous-Vide Rosemary Lamb Chops',
    description: 'Australian grass-fed lamb chops slow cooked to medium-rare tenderness, crusted with pistachio herb gremolata, served over smoked sweet potato mash and rosemary jus.',
    price: 1480,
    category: 'Main Course',
    dietaryTags: ['Gluten-Free', 'Halal', 'Chef Signature'],
    spiceLevel: 'Medium',
    preparationTime: 28,
    calories: 780,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    rating: 5.0,
    numReviews: 76
  },
  {
    title: 'Smoked Harissa Cottage Cheese Skewers',
    description: 'Charcoal grilled cottage cheese marinated in roasted Kashmiri chili paste and Tunisian harissa, layered with sweet bell peppers and mint labneh dip.',
    price: 590,
    category: 'Starters',
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    spiceLevel: 'Fiery',
    preparationTime: 16,
    calories: 410,
    imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    rating: 4.8,
    numReviews: 62
  },
  {
    title: 'Molten Valrhona Dark Chocolate Dome',
    description: 'Warm liquid core cake made with 70% Single Origin Valrhona cocoa, accompanied by Madagascar vanilla bean gelato, and caramelized almond crumble.',
    price: 490,
    category: 'Desserts',
    dietaryTags: ['Vegetarian'],
    spiceLevel: 'None',
    preparationTime: 15,
    calories: 550,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    rating: 4.9,
    numReviews: 140
  },
  {
    title: 'Sicilian Pistachio Tiramisu',
    description: 'Espresso-soaked Savoiardi ladyfingers layered with whipped mascarpone cream and roasted Bronte pistachio paste, dusted with green pistachio praline.',
    price: 530,
    category: 'Desserts',
    dietaryTags: ['Vegetarian'],
    spiceLevel: 'None',
    preparationTime: 10,
    calories: 480,
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    rating: 4.8,
    numReviews: 87
  },
  {
    title: 'Smoked Hibiscus & Rosemary Fizz',
    description: 'Brewed wild hibiscus petals, clarified lime juice, agave nectar, topped with artisanal tonic and garnished with torched aromatic rosemary.',
    price: 360,
    category: 'Beverages',
    dietaryTags: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    spiceLevel: 'None',
    preparationTime: 8,
    calories: 140,
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    rating: 4.7,
    numReviews: 39
  },
  {
    title: 'Yuzu Blood Orange Botanical Spritz',
    description: 'Japanese Yuzu infusion, cold-pressed Sicilian blood orange reduction, elderflower essence, sparkling mineral water, and dehydrated orange wheel.',
    price: 390,
    category: 'Beverages',
    dietaryTags: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    spiceLevel: 'None',
    preparationTime: 8,
    calories: 130,
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    rating: 4.8,
    numReviews: 54
  }
];

const sampleReservations = [
  {
    reservationCode: 'GH-RES-882194',
    guestName: 'Vikram Malhotra',
    guestEmail: 'vikram.m@example.com',
    guestPhone: '+91 98234 56789',
    guestsCount: 4,
    reservationDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    reservationTime: '20:00',
    seatingZone: 'Outdoor Terrace Garden',
    occasion: 'Anniversary Dinner',
    specialRequests: 'Prefers quiet corner table with floral arrangement if possible.',
    status: 'Confirmed'
  },
  {
    reservationCode: 'GH-RES-314920',
    guestName: 'Priya Sundaram',
    guestEmail: 'priya.s@example.com',
    guestPhone: '+91 99887 76655',
    guestsCount: 2,
    reservationDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    reservationTime: '19:30',
    seatingZone: 'Private Chef Table',
    occasion: 'Romantic Date',
    specialRequests: 'Chef tasting wine pairing requested.',
    status: 'Confirmed'
  },
  {
    reservationCode: 'GH-RES-741029',
    guestName: 'Sanjay Kapoor',
    guestEmail: 'sanjay.k@fintech.co',
    guestPhone: '+91 97112 33445',
    guestsCount: 6,
    reservationDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    reservationTime: '13:00',
    seatingZone: 'Main Dining Hall',
    occasion: 'Business Meeting',
    specialRequests: 'High speed wifi & projector screen nearby.',
    status: 'Confirmed'
  }
];

const seedData = async () => {
  try {
    if (process.env.NODE_ENV === 'production' && (!process.env.ADMIN_SEED_PASSWORD || process.env.ADMIN_SEED_PASSWORD.length < 16)) {
      throw new Error('Production seeding requires ADMIN_SEED_PASSWORD with at least 16 characters.');
    }
    if (process.env.NODE_ENV === 'production') sampleUsers.splice(1, 1);
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gourmethaven_db');
    console.log('[Seed] Connected to database');

    await User.deleteMany({});
    await MenuItem.deleteMany({});
    await Reservation.deleteMany({});
    await Order.deleteMany({});

    await User.create(sampleUsers);
    console.log(`[Seed] Created ${sampleUsers.length} users (Admin & User with neutral avatars)`);

    const createdDishes = await MenuItem.create(sampleDishes);
    console.log(`[Seed] Created ${createdDishes.length} artisanal dishes`);

    await Reservation.create(sampleReservations);
    console.log(`[Seed] Created ${sampleReservations.length} table bookings`);

    // Create an initial sample order
    const sampleOrder = {
      orderNumber: 'GH-ORD-104921',
      customerName: 'Ananya Deshmukh',
      customerEmail: 'user@gourmethaven.com',
      customerPhone: '+91 91234 56789',
      orderType: 'Delivery',
      deliveryAddress: {
        street: 'Apt 402, Signature Towers, Jubilee Hills',
        city: 'Hyderabad',
        postalCode: '500033',
        landmark: 'Opposite Golf Course Gate 2'
      },
      items: [
        {
          title: createdDishes[0].title,
          price: createdDishes[0].price,
          quantity: 2,
          specialInstructions: 'Extra truffle shavings please'
        },
        {
          title: createdDishes[2].title,
          price: createdDishes[2].price,
          quantity: 1,
          specialInstructions: 'Well crisped crust'
        }
      ],
      subtotal: 2520,
      tax: 126,
      deliveryFee: 0,
      tip: 100,
      discountAmount: 252,
      promoCode: 'GOURMET10',
      totalAmount: 2494,
      paymentMethod: 'Credit/Debit Card',
      paymentStatus: 'Pending',
      orderStatus: 'Preparing',
      estimatedDeliveryMins: 30
    };

    await Order.create(sampleOrder);
    console.log('[Seed] Created sample delivery order');

    console.log('[Seed] Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = { sampleDishes, sampleUsers, sampleReservations };
