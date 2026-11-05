import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Property from '../models/Property.js';
import Inquiry from '../models/Inquiry.js';

dotenv.config();

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

const sampleUsers = [
  {
    name: 'FrameForge Admin',
    email: 'admin@urbannest.com',
    password: process.env.SEED_ADMIN_PASSWORD,
    role: 'admin',
    avatar: DEFAULT_AVATAR
  },
  {
    name: 'Rahul Sharma',
    email: 'user@urbannest.com',
    password: 'user123',
    role: 'user',
    avatar: DEFAULT_AVATAR
  }
];

const sampleProperties = [
  {
    title: 'The Skyline Penthouse & Sky Terrace',
    description: 'Breathtaking 4-bedroom panoramic penthouse located in the heart of Hitec City. Features Italian marble flooring, automated smart-home lighting, private elevator access, and a scenic wraparound sky deck overlooking the city skyline.',
    price: 38500000, // 3.85 Cr
    propertyType: 'Penthouse',
    purpose: 'For Sale',
    address: {
      street: 'Hitec City Blvd, Phase 2',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500081',
      country: 'India'
    },
    specs: {
      bedrooms: 4,
      bathrooms: 5,
      areaSqFt: 4650,
      parkingSpaces: 3,
      yearBuilt: 2024
    },
    amenities: [
      'Private Terrace Deck',
      'Smart Home Automation',
      'Infinity Pool',
      'Clubhouse & Gym',
      '24/7 Concierge',
      'High-Speed Elevators'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    status: 'Available'
  },
  {
    title: 'Serene Meadow Modernist Villa',
    description: 'An architectural masterpiece surrounded by manicured landscaped gardens. Designed with double-height glass walls, an open-concept gourmet kitchen, temperature-controlled private lap pool, and sustainable solar power generation.',
    price: 52000000, // 5.2 Cr
    propertyType: 'Villa',
    purpose: 'For Sale',
    address: {
      street: 'Jubilee Hills, Road No. 36',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500033',
      country: 'India'
    },
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      areaSqFt: 6200,
      parkingSpaces: 4,
      yearBuilt: 2023
    },
    amenities: [
      'Private Swimming Pool',
      'Landscaped Zen Garden',
      'Home Theater Room',
      'Solar Powered System',
      'Modular Italian Kitchen',
      'CCTV & Smart Security'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    status: 'Available'
  },
  {
    title: 'Minimalist Loft at Indiranagar',
    description: 'Chic Scandinavian-inspired 2-bedroom urban residence nestled in vibrant Indiranagar. Walkable distance to top-tier cafes and metro transit. Features exposed brick accents, high ceilings, custom cabinetry, and energy-efficient climate control.',
    price: 65000, // 65k/month
    propertyType: 'Apartment',
    purpose: 'For Rent',
    address: {
      street: '100 Feet Road, 12th Main',
      city: 'Bengaluru',
      state: 'Karnataka',
      zipCode: '560038',
      country: 'India'
    },
    specs: {
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 1450,
      parkingSpaces: 1,
      yearBuilt: 2022
    },
    amenities: [
      'Balcony with Greenery',
      'High-Speed Wi-Fi Ready',
      'Covered Car Parking',
      '24/7 Power Backup',
      'Gated Community'
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    status: 'Available'
  },
  {
    title: 'Seaside Coastal Sanctuary Villa',
    description: 'Portuguese heritage meets modern tropical luxury. Features open verandas, private plunge pool, outdoor rain showers, and manicured palm gardens just 400 meters away from the serene sands of Candolim beach.',
    price: 44000000, // 4.4 Cr
    propertyType: 'Villa',
    purpose: 'For Sale',
    address: {
      street: 'Fort Aguada Coastal Rd',
      city: 'Goa',
      state: 'Goa',
      zipCode: '403515',
      country: 'India'
    },
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 3800,
      parkingSpaces: 2,
      yearBuilt: 2021
    },
    amenities: [
      'Plunge Pool',
      'Walk to Beach',
      'Outdoor Dining Gazebo',
      'Tropical Landscaping',
      'Solar Heating'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    status: 'Available'
  },
  {
    title: 'Azure Bay Waterfront Luxury Residence',
    description: 'Immaculately curated 3-bedroom sea-facing apartment offering uninterrupted vistas of the Arabian Sea. Complete with designer fittings, imported German kitchen, club amenities, and 24/7 elite security.',
    price: 180000, // 1.8 Lakhs/month
    propertyType: 'Apartment',
    purpose: 'For Rent',
    address: {
      street: 'Marine Drive Promenade',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400020',
      country: 'India'
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 2200,
      parkingSpaces: 2,
      yearBuilt: 2020
    },
    amenities: [
      'Sea View Balcony',
      'Gym & Spa Access',
      'Valet Parking',
      'High-Speed Elevators',
      'Full Furnished'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    status: 'Available'
  },
  {
    title: 'Grand Horizon Executive Estate',
    description: 'Sprawling contemporary multi-level mansion situated in an exclusive gated enclave. Features state-of-the-art tennis court access, temperature-controlled wine cellar, smart surveillance, and private staff quarters.',
    price: 78000000, // 7.8 Cr
    propertyType: 'House',
    purpose: 'For Sale',
    address: {
      street: 'Golf Course Road, DLF Phase 5',
      city: 'Delhi NCR',
      state: 'Haryana',
      zipCode: '122002',
      country: 'India'
    },
    specs: {
      bedrooms: 6,
      bathrooms: 7,
      areaSqFt: 8500,
      parkingSpaces: 5,
      yearBuilt: 2023
    },
    amenities: [
      'Golf Course Views',
      'Private Heated Pool',
      'Jacuzzi & Sauna',
      'Staff Quarters',
      'Smart Automation'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    status: 'Available'
  }
];

if (!process.env.SEED_ADMIN_PASSWORD) sampleUsers.shift();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/urbannest_db';
    await mongoose.connect(mongoUri);
    console.log('[Seeder] Connected to database');

    if (process.argv[2] === '-d') {
      await Property.deleteMany();
      await User.deleteMany();
      await Inquiry.deleteMany();
      console.log('[Seeder] Database records cleared!');
      process.exit(0);
    }

    // Clear existing to avoid duplicate seeds
    await Property.deleteMany();
    await User.deleteMany();
    await Inquiry.deleteMany();

    // Insert users
    const createdUsers = [];
    for (const u of sampleUsers) {
      const user = await User.create(u);
      createdUsers.push(user);
    }
    const adminUser = createdUsers.find((user) => user.role === 'admin') || createdUsers[0];

    // Insert properties with admin createdBy
    const propertyPayloads = sampleProperties.map((p) => ({
      ...p,
      ...(adminUser ? { createdBy: adminUser._id } : {})
    }));

    const createdProperties = await Property.insertMany(propertyPayloads);

    // Insert sample inquiries
    await Inquiry.create([
      {
        property: createdProperties[0]._id,
        name: 'Anita Roy',
        email: 'anita.roy@example.com',
        phone: '+91 98765 43210',
        message: 'Hello, I am interested in scheduling a private viewing of the Skyline Penthouse this weekend.',
        status: 'New',
        preferredContact: 'Phone'
      },
      {
        property: createdProperties[2]._id,
        name: 'Karthik Menon',
        email: 'karthik.m@example.com',
        phone: '+91 98450 12345',
        message: 'Is the Indiranagar loft pet-friendly? What is the maintenance fee structure?',
        status: 'Contacted',
        preferredContact: 'Email'
      }
    ]);

    console.log(`[Seeder Success]: Inserted ${createdUsers.length} users, ${createdProperties.length} properties, and 2 inquiries!`);
    if (process.env.SEED_ADMIN_PASSWORD) console.log('Admin Login: admin@urbannest.com | password from SEED_ADMIN_PASSWORD');
    console.log(`User Login:  user@urbannest.com  | user123`);
    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`);
    process.exit(1);
  }
};

seedData();
