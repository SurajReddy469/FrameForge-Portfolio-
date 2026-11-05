// Resilient API Client for GourmetHaven
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

export const INITIAL_DISHES = [
  {
    _id: 'dish-1',
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
    _id: 'dish-2',
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
    _id: 'dish-3',
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
    _id: 'dish-4',
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
    _id: 'dish-5',
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
    _id: 'dish-6',
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
    _id: 'dish-7',
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
    _id: 'dish-8',
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
    _id: 'dish-9',
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
    _id: 'dish-10',
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
    _id: 'dish-11',
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
    _id: 'dish-12',
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

export const INITIAL_RESERVATIONS = [
  {
    _id: 'res-1',
    reservationCode: 'GH-RES-882194',
    guestName: 'Vikram Malhotra',
    guestEmail: 'vikram.m@example.com',
    guestPhone: '+91 98234 56789',
    guestsCount: 4,
    reservationDate: '2026-11-06',
    reservationTime: '20:00',
    seatingZone: 'Outdoor Terrace Garden',
    occasion: 'Anniversary Dinner',
    specialRequests: 'Prefers quiet corner table with floral arrangement if possible.',
    status: 'Confirmed',
    createdAt: '2026-11-04T10:00:00.000Z'
  },
  {
    _id: 'res-2',
    reservationCode: 'GH-RES-314920',
    guestName: 'Priya Sundaram',
    guestEmail: 'priya.s@example.com',
    guestPhone: '+91 99887 76655',
    guestsCount: 2,
    reservationDate: '2026-11-05',
    reservationTime: '19:30',
    seatingZone: 'Private Chef Table',
    occasion: 'Romantic Date',
    specialRequests: 'Chef tasting wine pairing requested.',
    status: 'Confirmed',
    createdAt: '2026-11-04T09:30:00.000Z'
  },
  {
    _id: 'res-3',
    reservationCode: 'GH-RES-741029',
    guestName: 'Sanjay Kapoor',
    guestEmail: 'sanjay.k@fintech.co',
    guestPhone: '+91 97112 33445',
    guestsCount: 6,
    reservationDate: '2026-11-07',
    reservationTime: '13:00',
    seatingZone: 'Main Dining Hall',
    occasion: 'Business Meeting',
    specialRequests: 'High speed wifi & projector screen nearby.',
    status: 'Pending',
    createdAt: '2026-11-04T08:15:00.000Z'
  }
];

export const INITIAL_ORDERS = [
  {
    _id: 'ord-1',
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
        title: 'Truffle Infused Wild Mushroom Risotto',
        price: 890,
        quantity: 2,
        specialInstructions: 'Extra truffle shavings please'
      },
      {
        title: 'San Marzano Burrata Caprese Flatbread',
        price: 740,
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
    paymentStatus: 'Pending (Demo)',
    orderStatus: 'Preparing',
    estimatedDeliveryMins: 30,
    createdAt: new Date().toISOString()
  }
];

// LocalStorage helpers for offline demo fallback
const getLocalData = (key, initial) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initial;
  } catch {
    return initial;
  }
};

const setLocalData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
};

// Safe API response processor: Surface HTTP errors clearly, never hide them!
const handleApiResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const err = new Error(errorData.message || `HTTP Request failed with status ${res.status}`);
    err.status = res.status;
    err.isHttpError = true;
    throw err;
  }
  return await res.json();
};

export const menuService = {
  getMenuItems: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/menu?${query}`);
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      // Network unreachable fallback
      let items = getLocalData('gh_dishes', INITIAL_DISHES);
      if (params.category && params.category !== 'All') {
        items = items.filter(d => d.category === params.category);
      }
      if (params.dietary && params.dietary !== 'All') {
        items = items.filter(d => d.dietaryTags?.includes(params.dietary));
      }
      if (params.search) {
        const s = params.search.toLowerCase();
        items = items.filter(d => d.title.toLowerCase().includes(s) || d.description.toLowerCase().includes(s));
      }
      if (params.sort === 'price-low') {
        items.sort((a, b) => a.price - b.price);
      } else if (params.sort === 'price-high') {
        items.sort((a, b) => b.price - a.price);
      } else if (params.sort === 'rating') {
        items.sort((a, b) => b.rating - a.rating);
      }
      return { success: true, count: items.length, data: items };
    }
  },

  createMenuItem: async (dishData, token) => {
    try {
      const res = await fetch(`${API_BASE}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(dishData)
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('gh_dishes', INITIAL_DISHES);
      const newDish = { ...dishData, _id: 'dish-' + Date.now(), rating: 4.8, numReviews: 1, createdAt: new Date().toISOString() };
      const updated = [newDish, ...current];
      setLocalData('gh_dishes', updated);
      return { success: true, data: newDish };
    }
  },

  updateMenuItem: async (id, dishData, token) => {
    try {
      const res = await fetch(`${API_BASE}/menu/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(dishData)
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('gh_dishes', INITIAL_DISHES);
      const updated = current.map(d => d._id === id ? { ...d, ...dishData } : d);
      setLocalData('gh_dishes', updated);
      return { success: true, data: dishData };
    }
  },

  deleteMenuItem: async (id, token) => {
    try {
      const res = await fetch(`${API_BASE}/menu/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('gh_dishes', INITIAL_DISHES);
      const updated = current.filter(d => d._id !== id);
      setLocalData('gh_dishes', updated);
      return { success: true, message: 'Dish removed successfully' };
    }
  }
};

export const reservationService = {
  createReservation: async (data) => {
    try {
      const res = await fetch(`${API_BASE}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('gh_reservations', INITIAL_RESERVATIONS);
      const capacities = { 'Main Dining Hall': 40, 'Outdoor Terrace Garden': 24, 'Private Chef Table': 8, 'Skyline Rooftop Lounge': 30 };
      const zone = data.seatingZone || 'Main Dining Hall';
      const booked = current
        .filter(r => r.reservationDate === data.reservationDate && r.reservationTime === data.reservationTime && r.seatingZone === zone && !['Cancelled', 'Completed'].includes(r.status))
        .reduce((sum, r) => sum + Number(r.guestsCount || 0), 0);
      if (booked + Number(data.guestsCount) > capacities[zone]) {
        throw new Error(`No capacity remains in ${zone} for this time slot.`);
      }
      const reservationCode = 'GH-RES-' + Math.floor(100000 + Math.random() * 900000);
      const newRes = { ...data, _id: 'res-' + Date.now(), reservationCode, status: 'Pending', createdAt: new Date().toISOString() };
      const updated = [newRes, ...current];
      setLocalData('gh_reservations', updated);
      return { success: true, message: 'Demo reservation saved in this browser only.', data: newRes, isFallback: true };
    }
  },

  getReservations: async (token, params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/reservations?${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      let items = getLocalData('gh_reservations', INITIAL_RESERVATIONS);
      if (params.status && params.status !== 'All') {
        items = items.filter(r => r.status === params.status);
      }
      if (params.search) {
        const s = params.search.toLowerCase();
        items = items.filter(r => r.guestName.toLowerCase().includes(s) || r.reservationCode.toLowerCase().includes(s) || r.guestPhone.includes(s));
      }
      return { success: true, count: items.length, data: items };
    }
  },

  updateStatus: async (id, status, token) => {
    try {
      const res = await fetch(`${API_BASE}/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('gh_reservations', INITIAL_RESERVATIONS);
      const updated = current.map(r => r._id === id ? { ...r, status } : r);
      setLocalData('gh_reservations', updated);
      return { success: true, data: { status }, isFallback: true };
    }
  }
};

export const orderService = {
  createOrder: async (data, token) => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('gh_orders', INITIAL_ORDERS);
      const orderNumber = 'GH-ORD-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        ...data,
        _id: 'ord-' + Date.now(),
        orderNumber,
        paymentStatus: 'Pending (Demo)',
        orderStatus: 'Received',
        estimatedDeliveryMins: 35,
        createdAt: new Date().toISOString()
      };
      const updated = [newOrder, ...current];
      setLocalData('gh_orders', updated);
      return { success: true, message: 'Demo order saved in this browser only. No payment was processed.', data: newOrder, isFallback: true };
    }
  },

  getOrders: async (token, params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/orders?${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      let items = getLocalData('gh_orders', INITIAL_ORDERS);
      if (params.status && params.status !== 'All') {
        items = items.filter(o => o.orderStatus === params.status);
      }
      if (params.search) {
        const s = params.search.toLowerCase();
        items = items.filter(o => o.orderNumber.toLowerCase().includes(s) || o.customerName.toLowerCase().includes(s) || o.customerPhone.includes(s));
      }
      return { success: true, count: items.length, data: items };
    }
  },

  getOrderByNumber: async (orderNumber) => {
    try {
      const res = await fetch(`${API_BASE}/orders/track/${orderNumber}`);
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('gh_orders', INITIAL_ORDERS);
      const order = current.find(o => o.orderNumber.toLowerCase() === orderNumber.toLowerCase());
      if (order) return { success: true, data: order };
      throw new Error('Order tracking number not found');
    }
  },

  updateStatus: async (id, orderStatus, token) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderStatus })
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const current = getLocalData('gh_orders', INITIAL_ORDERS);
      const updated = current.map(o => o._id === id ? { ...o, orderStatus } : o);
      setLocalData('gh_orders', updated);
      return { success: true, data: { orderStatus }, isFallback: true };
    }
  }
};

export const authService = {
  login: async (credentials) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err; // Real 401 Invalid Credentials
      // Only demo fallback if network is completely offline
      if (credentials.email === 'admin@gourmethaven.com' && credentials.password === 'admin123') {
        return {
          success: true,
          data: {
            _id: 'admin-gh',
            name: 'FrameForge Admin',
            email: 'admin@gourmethaven.com',
            role: 'admin',
            avatar: DEFAULT_AVATAR,
            token: 'mock-jwt-admin-token'
          }
        };
      }
      if (credentials.email === 'user@gourmethaven.com' && credentials.password === 'user123') {
        return {
          success: true,
          data: {
            _id: 'user-gh',
            name: 'Ananya Deshmukh',
            email: 'user@gourmethaven.com',
            role: 'user',
            avatar: DEFAULT_AVATAR,
            token: 'mock-jwt-user-token'
          }
        };
      }
      throw err;
    }
  },

  register: async (userData) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      return {
        success: true,
        data: {
          _id: 'user-' + Date.now(),
          name: userData.name,
          email: userData.email,
          role: 'user', // Forced role user
          avatar: DEFAULT_AVATAR,
          token: 'mock-jwt-registered-token'
        }
      };
    }
  }
};
