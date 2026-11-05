require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const FitnessClass = require('../models/FitnessClass');
const Trainer = require('../models/Trainer');
const Booking = require('../models/Booking');
const Plan = require('../models/Plan');

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

const sampleUsers = [
  {
    name: 'FitPulse General Manager',
    email: 'admin@fitpulse.gym',
    password: 'admin123',
    role: 'admin',
    membershipTier: 'Elite',
    classCredits: 999,
    phone: '+1 (555) 019-2831',
    avatar: DEFAULT_AVATAR
  },
  {
    name: 'Coach Sarah Connor',
    email: 'trainer@fitpulse.gym',
    password: 'trainer123',
    role: 'trainer',
    membershipTier: 'Elite',
    classCredits: 999,
    phone: '+1 (555) 019-4822',
    avatar: DEFAULT_AVATAR
  },
  {
    name: 'Alex Mercer',
    email: 'member@fitpulse.gym',
    password: 'member123',
    role: 'user',
    membershipTier: 'Pro',
    classCredits: 10,
    phone: '+1 (555) 019-8711',
    avatar: DEFAULT_AVATAR
  }
];

const sampleClasses = [
  {
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
    description: 'Progressive overload strength training focusing on posterior chain deadlifts, barbell rows, and accessory hyper-trophy.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'
  }
];

const sampleTrainers = [
  {
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

const samplePlans = [
  {
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
    name: 'Elite VIP Unlimited',
    tier: 'Elite',
    priceMonthlyUSD: 129,
    billingInterval: 'month',
    classCreditsMonthly: -1, // Unlimited
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

const sampleBookings = [
  {
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
    qrHash: 'FIT-QR-YWxleF9tZXJjZXIx'
  },
  {
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
    qrHash: 'FIT-QR-YWxleF9tZXJjZXIy'
  },
  {
    bookingCode: 'FIT-BOOK-726194',
    userId: 'user_sarah_client',
    userName: 'Sarah Jenkins',
    userEmail: 'sarah.j@example.com',
    classId: 'cls-2',
    className: 'Power Vinyasa Flow & Dynamic Mobility',
    instructorName: 'Maya Lin',
    scheduleDay: 'Monday',
    scheduleTime: '07:30 AM',
    room: 'Studio B (Zen Sanctuary)',
    status: 'Attended',
    qrHash: 'FIT-QR-c2FyYWhfajAx'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fitpulse_db');
    console.log('[FitPulse Seed] Connected to database');

    await User.deleteMany({});
    await FitnessClass.deleteMany({});
    await Trainer.deleteMany({});
    await Booking.deleteMany({});
    await Plan.deleteMany({});

    await User.create(sampleUsers);
    console.log(`[FitPulse Seed] Created ${sampleUsers.length} users`);

    await FitnessClass.create(sampleClasses);
    console.log(`[FitPulse Seed] Created ${sampleClasses.length} fitness classes`);

    await Trainer.create(sampleTrainers);
    console.log(`[FitPulse Seed] Created ${sampleTrainers.length} trainer profiles`);

    await Plan.create(samplePlans);
    console.log(`[FitPulse Seed] Created ${samplePlans.length} membership plans`);

    await Booking.create(sampleBookings);
    console.log(`[FitPulse Seed] Created ${sampleBookings.length} initial bookings`);

    console.log('[FitPulse Seed] Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[FitPulse Seed Error]', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = {
  sampleUsers,
  sampleClasses,
  sampleTrainers,
  samplePlans,
  sampleBookings
};
