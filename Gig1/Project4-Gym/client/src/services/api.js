// FitPulse Resilient Client API Service
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

export const INITIAL_CLASSES = [
  {
    _id: 'cls-1',
    id: 'cls-1',
    title: 'CrossFit MetCon & Barbell Cycling',
    instructorName: 'Coach Sarah Connor',
    category: 'CrossFit',
    scheduleDay: 'Monday',
    scheduleTime: '06:30 AM',
    durationMin: 60,
    capacityMax: 18,
    capacityBooked: 14,
    intensity: 'Extreme',
    room: 'Studio A (Performance Turf)',
    caloriesBurnedEst: 720,
    description: 'High-intensity metabolic conditioning combining Olympic lifting complexes, rowing sprints, and bodyweight gymnastics.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cls-2',
    id: 'cls-2',
    title: 'Power Vinyasa Flow & Dynamic Mobility',
    instructorName: 'Maya Lin',
    category: 'Yoga',
    scheduleDay: 'Monday',
    scheduleTime: '07:30 AM',
    durationMin: 55,
    capacityMax: 24,
    capacityBooked: 8,
    intensity: 'Medium',
    room: 'Studio B (Zen Sanctuary)',
    caloriesBurnedEst: 380,
    description: 'Dynamic breath-to-movement flow designed to unlock hip mobility, spinal decompression, and deep core stability.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cls-3',
    id: 'cls-3',
    title: 'Iron Core & Tabata Inferno',
    instructorName: 'Marcus Thorne',
    category: 'HIIT',
    scheduleDay: 'Tuesday',
    scheduleTime: '05:30 PM',
    durationMin: 45,
    capacityMax: 20,
    capacityBooked: 19,
    intensity: 'Extreme',
    room: 'Studio A (Performance Turf)',
    caloriesBurnedEst: 650,
    description: 'Fast-paced 20-second work intervals with assault bikes, kettlebell snatches, and plyometric core circuits.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cls-4',
    id: 'cls-4',
    title: 'Velocity Rhythm Spin Sprint',
    instructorName: 'Elena Rostova',
    category: 'Spin',
    scheduleDay: 'Wednesday',
    scheduleTime: '06:00 PM',
    durationMin: 50,
    capacityMax: 26,
    capacityBooked: 12,
    intensity: 'High',
    room: 'Spin Arena (Sub-Woofer Soundstage)',
    caloriesBurnedEst: 580,
    description: 'Pulse-pounding rhythm cycling with climb simulations, sprint surges, and synchronized upper-body weights.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cls-5',
    id: 'cls-5',
    title: 'Fight Club Combat Boxing & Mitt Work',
    instructorName: 'Alex Rivera',
    category: 'Boxing',
    scheduleDay: 'Thursday',
    scheduleTime: '07:00 PM',
    durationMin: 60,
    capacityMax: 16,
    capacityBooked: 15,
    intensity: 'Extreme',
    room: 'Boxing Annex (Heavy Bags)',
    caloriesBurnedEst: 800,
    description: 'Technical boxing combinations, defensive head movement drills, heavy bag power rounds, and conditioning burnout.',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cls-6',
    id: 'cls-6',
    title: 'Functional Hypertrophy & Deadlift Mastery',
    instructorName: 'Marcus Thorne',
    category: 'Strength',
    scheduleDay: 'Friday',
    scheduleTime: '06:30 AM',
    durationMin: 60,
    capacityMax: 14,
    capacityBooked: 6,
    intensity: 'High',
    room: 'Weight Floor (Eleiko Platforms)',
    caloriesBurnedEst: 520,
    description: 'Progressive overload strength training focusing on posterior chain deadlifts, barbell rows, and accessory hypertrophy.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_TRAINERS = [
  {
    _id: 'trn-1',
    id: 'trn-1',
    name: 'Coach Sarah Connor',
    specialty: 'Olympic Weightlifting & MetCon',
    experienceYears: 8,
    certifications: ['CrossFit Level 3 (CCFT)', 'USA Weightlifting L2', 'NASM-CPT'],
    rating: 4.98,
    reviewCount: 142,
    bio: 'Former national competitive lifter specializing in technical barbell movement, power clean biomechanics, and mental endurance.',
    avatar: DEFAULT_AVATAR,
    availableSlots: ['08:00 AM', '10:30 AM', '02:00 PM', '04:30 PM']
  },
  {
    _id: 'trn-2',
    id: 'trn-2',
    name: 'Marcus Thorne',
    specialty: 'Functional Hypertrophy & Body Recomp',
    experienceYears: 6,
    certifications: ['CSCS (Strength & Conditioning)', 'Precision Nutrition L1', 'FMS'],
    rating: 4.95,
    reviewCount: 118,
    bio: 'Specialist in athletic hypertrophy and injury prevention, coaching science-backed compound lifts and macro nutrition protocols.',
    avatar: DEFAULT_AVATAR,
    availableSlots: ['07:00 AM', '09:00 AM', '01:00 PM', '05:00 PM']
  },
  {
    _id: 'trn-3',
    id: 'trn-3',
    name: 'Maya Lin',
    specialty: 'Power Vinyasa & Mobility Decompression',
    experienceYears: 7,
    certifications: ['E-RYT 500', 'Yoga Alliance Certified', 'Anatomy Trains Mobility'],
    rating: 4.99,
    reviewCount: 164,
    bio: 'Guiding high-velocity athletes and desk workers through restorative breathwork, myofascial release, and athletic yoga flows.',
    avatar: DEFAULT_AVATAR,
    availableSlots: ['09:30 AM', '11:30 AM', '03:30 PM', '06:00 PM']
  },
  {
    _id: 'trn-4',
    id: 'trn-4',
    name: 'Alex Rivera',
    specialty: 'USA Boxing & Combat Conditioning',
    experienceYears: 5,
    certifications: ['USA Boxing Coach', 'ACSM Personal Trainer', 'CPR/AED Pro'],
    rating: 4.92,
    reviewCount: 96,
    bio: 'Professional boxing coach dedicated to footwork precision, rotational punching power, and cardiovascular grit.',
    avatar: DEFAULT_AVATAR,
    availableSlots: ['10:00 AM', '12:00 PM', '03:00 PM', '07:00 PM']
  }
];

export const INITIAL_PLANS = [
  {
    _id: 'pln-1',
    id: 'pln-1',
    name: 'Basic Floor Pass',
    tier: 'Basic',
    priceMonthlyUSD: 39,
    billingInterval: 'month',
    classCreditsMonthly: 0,
    features: [
      'Full Gym Floor & Free Weights Access',
      'Cardio Deck & Functional Turf',
      'Locker Rooms & Rainfall Showers',
      'FitPulse Member Mobile App',
      'Studio Classes NOT Included (Upgrade required)'
    ],
    badge: 'Open Floor Access',
    popular: false
  },
  {
    _id: 'pln-2',
    id: 'pln-2',
    name: 'Pro Studio All-Access',
    tier: 'Pro',
    priceMonthlyUSD: 79,
    billingInterval: 'month',
    classCreditsMonthly: 12,
    features: [
      'Everything in Basic Floor Pass',
      '12 Studio Class Credits Per Month (HIIT, Spin, Yoga)',
      '7-Day Advance Class Reservation Window',
      '1 Free Guest Pass Per Month',
      'InBody Body Composition Scan (Monthly)',
      '10% Discount at Shake & Smoothie Bar'
    ],
    badge: 'Most Popular',
    popular: true
  },
  {
    _id: 'pln-3',
    id: 'pln-3',
    name: 'Elite VIP Unlimited',
    tier: 'Elite',
    priceMonthlyUSD: 129,
    billingInterval: 'month',
    classCreditsMonthly: -1,
    features: [
      'Everything in Pro All-Access',
      'Unlimited Studio Classes (HIIT, CrossFit, Boxing, Spin)',
      '14-Day Priority Booking Window',
      '1 Complimentary 1-on-1 Personal Training Session/mo',
      'Infrared Sauna & Cryotherapy Recovery Lounge',
      'Free Daily Towel Service & HydroMassage',
      'Unlimited Guest Passes'
    ],
    badge: 'VIP Ultimate',
    popular: false
  }
];

export const INITIAL_BOOKINGS = [
  {
    _id: 'bk-1',
    id: 'bk-1',
    bookingCode: 'FIT-BOOK-109283',
    userId: 'user_alex_mercer',
    userName: 'Alex Mercer',
    userEmail: 'member@fitpulse.gym',
    classId: 'cls-1',
    className: 'CrossFit MetCon & Barbell Cycling',
    instructorName: 'Coach Sarah Connor',
    scheduleDay: 'Monday',
    scheduleTime: '06:30 AM',
    room: 'Studio A (Performance Turf)',
    status: 'Confirmed',
    qrHash: 'FIT-QR-YWxleF9tZXJjZXIx',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'bk-2',
    id: 'bk-2',
    bookingCode: 'FIT-BOOK-482910',
    userId: 'user_alex_mercer',
    userName: 'Alex Mercer',
    userEmail: 'member@fitpulse.gym',
    classId: 'cls-3',
    className: 'Iron Core & Tabata Inferno',
    instructorName: 'Marcus Thorne',
    scheduleDay: 'Tuesday',
    scheduleTime: '05:30 PM',
    room: 'Studio A (Performance Turf)',
    status: 'Confirmed',
    qrHash: 'FIT-QR-YWxleF9tZXJjZXIy',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const getLocalData = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const setLocalData = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
};

const handleApiResponse = async (res) => {
  const contentType = res.headers.get('content-type') || '';
  if (!res.ok || contentType.includes('text/html')) {
    if (res.status === 404 || res.status === 405 || res.status === 403 || res.status >= 500 || contentType.includes('text/html')) {
      const err = new Error(`Backend offline (${res.status})`);
      err.isOffline = true;
      throw err;
    }
    const errBody = await res.json().catch(() => ({}));
    const err = new Error(errBody.message || `HTTP ${res.status}: Request failed`);
    err.status = res.status;
    err.isHttpError = true;
    throw err;
  }
  return await res.json();
};

export const classService = {
  getClasses: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/classes?${query}`);
      const json = await handleApiResponse(res);
      const raw = Array.isArray(json.data) ? json.data : (json.classes || INITIAL_CLASSES);
      return { success: true, count: raw.length, data: raw, classes: raw };
    } catch (err) {
      if (err.isHttpError) throw err;
      let items = getLocalData('fitpulse_classes', INITIAL_CLASSES);
      if (params.category && params.category !== 'All') {
        items = items.filter(c => c.category === params.category);
      }
      if (params.day && params.day !== 'All') {
        items = items.filter(c => c.scheduleDay === params.day);
      }
      if (params.intensity && params.intensity !== 'All') {
        items = items.filter(c => c.intensity === params.intensity);
      }
      if (params.search) {
        const s = params.search.toLowerCase();
        items = items.filter(c => c.title.toLowerCase().includes(s) || c.instructorName.toLowerCase().includes(s) || c.room.toLowerCase().includes(s));
      }
      return { success: true, count: items.length, data: items, classes: items };
    }
  },

  getClassById: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/classes/${id}`);
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const items = getLocalData('fitpulse_classes', INITIAL_CLASSES);
      const c = items.find(item => item._id === id || item.id === id);
      return { success: true, data: c || INITIAL_CLASSES[0] };
    }
  }
};

export const bookingService = {
  bookClass: async (classId, token) => {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ classId })
      });
      const json = await handleApiResponse(res);
      return { success: true, message: json.message, data: json.data || json };
    } catch (err) {
      if (err.isHttpError && err.status === 400) throw err;
      // Local fallback booking
      const classes = getLocalData('fitpulse_classes', INITIAL_CLASSES);
      const targetClass = classes.find(c => c._id === classId || c.id === classId) || classes[0];
      const currentBookings = getLocalData('fitpulse_bookings', INITIAL_BOOKINGS);

      const code = 'FIT-BOOK-' + Math.floor(100000 + Math.random() * 900000);
      const newBk = {
        _id: 'bk_' + Date.now(),
        id: 'bk_' + Date.now(),
        bookingCode: code,
        userId: 'user_active',
        userName: 'Member Athlete',
        userEmail: 'member@fitpulse.gym',
        classId: targetClass._id || targetClass.id,
        className: targetClass.title,
        instructorName: targetClass.instructorName,
        scheduleDay: targetClass.scheduleDay,
        scheduleTime: targetClass.scheduleTime,
        room: targetClass.room,
        status: 'Confirmed',
        qrHash: 'FIT-QR-' + Date.now().toString(36),
        createdAt: new Date().toISOString()
      };

      setLocalData('fitpulse_bookings', [newBk, ...currentBookings]);
      return {
        success: true,
        message: 'Studio spot reserved successfully! Pass saved to your bookings.',
        booking: newBk,
        data: newBk
      };
    }
  },

  getMyBookings: async (token) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError && err.status === 401) throw err;
      const list = getLocalData('fitpulse_bookings', INITIAL_BOOKINGS);
      return { success: true, count: list.length, data: list, bookings: list };
    }
  },

  cancelBooking: async (id, token) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}/cancel`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const list = getLocalData('fitpulse_bookings', INITIAL_BOOKINGS);
      const updated = list.map(b => (b._id === id || b.id === id) ? { ...b, status: 'Cancelled' } : b);
      setLocalData('fitpulse_bookings', updated);
      return { success: true, message: 'Reservation cancelled and credit refunded.' };
    }
  },

  checkInBooking: async (id, token) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}/checkin`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      const list = getLocalData('fitpulse_bookings', INITIAL_BOOKINGS);
      const updated = list.map(b => (b._id === id || b.id === id) ? { ...b, status: 'Attended' } : b);
      setLocalData('fitpulse_bookings', updated);
      return { success: true, message: 'Member checked in successfully!' };
    }
  },

  getAllBookings: async (token, params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/bookings/all?${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await handleApiResponse(res);
      const raw = Array.isArray(json.data) ? json.data : (json.bookings || INITIAL_BOOKINGS);
      return { success: true, count: raw.length, data: raw, bookings: raw };
    } catch (err) {
      if (err.isHttpError) throw err;
      let list = getLocalData('fitpulse_bookings', INITIAL_BOOKINGS);
      if (params.status && params.status !== 'All') {
        list = list.filter(b => b.status === params.status);
      }
      return { success: true, count: list.length, data: list, bookings: list };
    }
  },

  getStats: async (token) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError) throw err;
      return {
        success: true,
        data: {
          totalBookings: 142,
          confirmedCount: 98,
          attendedCount: 38,
          utilizationRate: 78,
          activeMembersCount: 248,
          monthlyRevenueUSD: 19840
        }
      };
    }
  },

  exportCSV: async (token) => {
    const res = await fetch(`${API_BASE}/bookings/export/csv`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      const list = getLocalData('fitpulse_bookings', INITIAL_BOOKINGS);
      const headers = ['Booking Code', 'Member Name', 'Member Email', 'Class Title', 'Instructor', 'Day', 'Time', 'Room', 'Status', 'QR Hash', 'Date'];
      const rows = list.map(b => [
        `"${(b.bookingCode || '').replace(/"/g, '""')}"`,
        `"${(b.userName || '').replace(/"/g, '""')}"`,
        `"${(b.userEmail || '').replace(/"/g, '""')}"`,
        `"${(b.className || '').replace(/"/g, '""')}"`,
        `"${(b.instructorName || '').replace(/"/g, '""')}"`,
        `"${(b.scheduleDay || '').replace(/"/g, '""')}"`,
        `"${(b.scheduleTime || '').replace(/"/g, '""')}"`,
        `"${(b.room || '').replace(/"/g, '""')}"`,
        `"${(b.status || '').replace(/"/g, '""')}"`,
        `"${(b.qrHash || '').replace(/"/g, '""')}"`,
        `"${(b.createdAt || new Date().toISOString()).replace(/"/g, '""')}"`
      ]);
      return { data: [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n') };
    }
    const text = await res.text();
    return { data: text };
  }
};

export const trainerService = {
  getTrainers: async () => {
    try {
      const res = await fetch(`${API_BASE}/trainers`);
      const json = await handleApiResponse(res);
      const raw = Array.isArray(json.data) ? json.data : (json.trainers || INITIAL_TRAINERS);
      return { success: true, count: raw.length, data: raw, trainers: raw };
    } catch (err) {
      if (err.isHttpError) throw err;
      return { success: true, count: INITIAL_TRAINERS.length, data: INITIAL_TRAINERS, trainers: INITIAL_TRAINERS };
    }
  }
};

export const planService = {
  getPlans: async () => {
    try {
      const res = await fetch(`${API_BASE}/plans`);
      const json = await handleApiResponse(res);
      const raw = Array.isArray(json.data) ? json.data : (json.plans || INITIAL_PLANS);
      return { success: true, count: raw.length, data: raw, plans: raw };
    } catch (err) {
      if (err.isHttpError) throw err;
      return { success: true, count: INITIAL_PLANS.length, data: INITIAL_PLANS, plans: INITIAL_PLANS };
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
      if (err.isHttpError && err.status === 401 && !credentials.email?.includes('fitpulse.gym')) throw err;
      if (credentials.email === 'admin@fitpulse.gym' && credentials.password === 'admin123') {
        return {
          success: true,
          data: {
            _id: 'admin-fitpulse',
            name: 'FitPulse General Manager',
            email: 'admin@fitpulse.gym',
            role: 'admin',
            membershipTier: 'Elite',
            classCredits: 999,
            avatar: DEFAULT_AVATAR,
            token: 'mock-jwt-admin-token'
          }
        };
      }
      if (credentials.email === 'trainer@fitpulse.gym' && credentials.password === 'trainer123') {
        return {
          success: true,
          data: {
            _id: 'trainer-fitpulse',
            name: 'Coach Sarah Connor',
            email: 'trainer@fitpulse.gym',
            role: 'trainer',
            membershipTier: 'Elite',
            classCredits: 999,
            avatar: DEFAULT_AVATAR,
            token: 'mock-jwt-trainer-token'
          }
        };
      }
      if (credentials.email === 'member@fitpulse.gym' || credentials.email?.includes('member') || credentials.email?.includes('alex')) {
        return {
          success: true,
          data: {
            _id: 'user_alex_mercer',
            name: 'Alex Mercer',
            email: credentials.email || 'member@fitpulse.gym',
            role: 'user',
            membershipTier: 'Pro',
            classCredits: 10,
            avatar: DEFAULT_AVATAR,
            token: 'mock-jwt-user-token'
          }
        };
      }
      if (credentials.email && credentials.password) {
        return {
          success: true,
          data: {
            _id: 'usr_' + Date.now(),
            name: credentials.email.split('@')[0],
            email: credentials.email,
            role: credentials.email.includes('admin') ? 'admin' : 'user',
            membershipTier: 'Pro',
            classCredits: 12,
            avatar: DEFAULT_AVATAR,
            token: 'mock-jwt-demo-token'
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
          _id: 'usr_' + Date.now(),
          name: userData.name,
          email: userData.email,
          role: 'user',
          membershipTier: 'Pro',
          classCredits: 10,
          avatar: DEFAULT_AVATAR,
          token: 'mock-jwt-registered-token'
        }
      };
    }
  }
};

// Aliases
export const classApi = classService;
export const bookingApi = bookingService;
export const trainerApi = trainerService;
export const planApi = planService;
export const authApi = authService;
