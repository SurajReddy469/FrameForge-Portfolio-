const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Department = require('../models/Department');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { getDbStatus } = require('../config/db');

// Sample departments
const sampleDepartments = [
  {
    _id: 'dept_card_01',
    name: 'Cardiology',
    code: 'CARD',
    description: 'Comprehensive cardiovascular diagnosis, echocardiography, hypertension and heart health management.',
    icon: 'HeartPulse',
    headOfDepartment: 'Dr. Sarah Jenkins, MD',
    roomNumber: 'Tower B, Suite 301',
  },
  {
    _id: 'dept_orth_02',
    name: 'Orthopedics',
    code: 'ORTH',
    description: 'Advanced joint care, fracture treatment, spinal health, and minimally invasive sports medicine.',
    icon: 'Bone',
    headOfDepartment: 'Dr. Marcus Vance, DO',
    roomNumber: 'Tower A, Suite 104',
  },
  {
    _id: 'dept_pedi_03',
    name: 'Pediatrics',
    code: 'PEDI',
    description: 'Compassionate pediatric care, infant wellness, childhood immunizations, and developmental monitoring.',
    icon: 'Baby',
    headOfDepartment: 'Dr. Elena Rostova, MD',
    roomNumber: 'Tower C, Suite 202',
  },
  {
    _id: 'dept_neur_04',
    name: 'Neurology',
    code: 'NEUR',
    description: 'Expert neurological assessments, migraine relief, neuropathy, and neurological rehabilitative care.',
    icon: 'Brain',
    headOfDepartment: 'Dr. Julian Thorne, MD, PhD',
    roomNumber: 'Tower B, Suite 405',
  },
  {
    _id: 'dept_derm_05',
    name: 'Dermatology',
    code: 'DERM',
    description: 'Clinical dermatology, acne treatment, allergy evaluations, and advanced laser/aesthetic skincare.',
    icon: 'Sparkles',
    headOfDepartment: 'Dr. Aisha Patel, MD',
    roomNumber: 'Tower A, Suite 210',
  },
  {
    _id: 'dept_genm_06',
    name: 'General Medicine',
    code: 'GENM',
    description: 'Routine health checkups, preventative screenings, diabetic care, and acute illness treatment.',
    icon: 'Stethoscope',
    headOfDepartment: 'Dr. David Chen, MD',
    roomNumber: 'Ground Floor, Wing 1',
  },
];

// Sample Doctors
const sampleDoctors = [
  {
    _id: 'doc_sarah_01',
    name: 'Dr. Sarah Jenkins, MD',
    email: 'sjenkins@medicare.clinic',
    department: 'Cardiology',
    departmentCode: 'CARD',
    specialization: 'Interventional Cardiology & Preventive Heart Health',
    qualifications: 'MD, FACC – Johns Hopkins Medicine',
    experienceYears: 14,
    consultationFee: 120,
    rating: 4.9,
    reviewsCount: 148,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '09:00 AM', end: '04:00 PM' },
    availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
    bio: 'Board-certified cardiologist specializing in structural heart disease, early diagnostic angiography, and lipid optimization.',
    isActive: true,
  },
  {
    _id: 'doc_marcus_02',
    name: 'Dr. Marcus Vance, DO',
    email: 'mvance@medicare.clinic',
    department: 'Orthopedics',
    departmentCode: 'ORTH',
    specialization: 'Sports Medicine & Robotic Knee/Hip Reconstruction',
    qualifications: 'DO, FAAOS – Mayo Clinic Orthopedic Fellowship',
    experienceYears: 11,
    consultationFee: 110,
    rating: 4.8,
    reviewsCount: 96,
    workingDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '08:30 AM', end: '03:30 PM' },
    availableSlots: ['09:00 AM', '10:30 AM', '11:30 AM', '01:30 PM', '02:30 PM'],
    bio: 'Experienced orthopedic surgeon focused on joint longevity, non-operative biologics, and rapid-recovery surgical techniques.',
    isActive: true,
  },
  {
    _id: 'doc_elena_03',
    name: 'Dr. Elena Rostova, MD',
    email: 'erostova@medicare.clinic',
    department: 'Pediatrics',
    departmentCode: 'PEDI',
    specialization: 'Pediatric Care & Neonatal Development',
    qualifications: 'MD, FAAP – Boston Children’s Hospital',
    experienceYears: 9,
    consultationFee: 85,
    rating: 5.0,
    reviewsCount: 215,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    workingHours: { start: '09:00 AM', end: '05:00 PM' },
    availableSlots: ['09:30 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'],
    bio: 'Dedicated pediatrician passionate about childhood development, preventive nutrition, and stress-free infant visits.',
    isActive: true,
  },
  {
    _id: 'doc_julian_04',
    name: 'Dr. Julian Thorne, MD, PhD',
    email: 'jthorne@medicare.clinic',
    department: 'Neurology',
    departmentCode: 'NEUR',
    specialization: 'Cognitive Disorders & Neuro-Vascular Therapies',
    qualifications: 'MD, PhD – Stanford Neuroscience Institute',
    experienceYears: 16,
    consultationFee: 150,
    rating: 4.9,
    reviewsCount: 112,
    workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '10:00 AM', end: '04:00 PM' },
    availableSlots: ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'],
    bio: 'Pioneering neurologist researching complex migrainous pathophysiology and modern neuro-diagnostic imaging.',
    isActive: true,
  },
  {
    _id: 'doc_aisha_05',
    name: 'Dr. Aisha Patel, MD',
    email: 'apatel@medicare.clinic',
    department: 'Dermatology',
    departmentCode: 'DERM',
    specialization: 'Medical Dermatology, Psoriasis & Mole Mapping',
    qualifications: 'MD, FAAD – Columbia Dermatology Dept.',
    experienceYears: 8,
    consultationFee: 95,
    rating: 4.9,
    reviewsCount: 130,
    workingDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    workingHours: { start: '09:00 AM', end: '04:30 PM' },
    availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
    bio: 'Expert clinician in chronic dermatologic disorders, inflammatory skin conditions, and dermoscopic skin cancer screening.',
    isActive: true,
  },
  {
    _id: 'doc_david_06',
    name: 'Dr. David Chen, MD',
    email: 'dchen@medicare.clinic',
    department: 'General Medicine',
    departmentCode: 'GENM',
    specialization: 'Internal Medicine & Chronic Disease Management',
    qualifications: 'MD, FACP – UCSF Medical Center',
    experienceYears: 12,
    consultationFee: 75,
    rating: 4.8,
    reviewsCount: 184,
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '08:00 AM', end: '04:00 PM' },
    availableSlots: ['08:30 AM', '09:30 AM', '10:30 AM', '01:30 PM', '02:30 PM', '03:30 PM'],
    bio: 'Primary care physician committed to patient empowerment, holistic metabolic care, and comprehensive wellness plans.',
    isActive: true,
  },
];

// Hash for demo password "Password123!"
const defaultHashedPassword = bcrypt.hashSync('Password123!', 10);

const sampleUsers = [
  {
    _id: 'usr_admin_01',
    name: 'Clinic Reception Desk',
    email: 'admin@medicare.clinic',
    password: defaultHashedPassword,
    role: 'admin',
    phone: '+1 (555) 234-5678',
    bloodGroup: 'O+',
    createdAt: new Date('2026-01-01T08:00:00Z'),
  },
  {
    _id: 'usr_doc_01',
    name: 'Dr. Sarah Jenkins',
    email: 'doctor@medicare.clinic',
    password: defaultHashedPassword,
    role: 'doctor',
    phone: '+1 (555) 345-6789',
    bloodGroup: 'A+',
    createdAt: new Date('2026-01-05T09:00:00Z'),
  },
  {
    _id: 'usr_patient_01',
    name: 'Alexander Wright',
    email: 'patient@medicare.clinic',
    password: defaultHashedPassword,
    role: 'patient',
    phone: '+1 (555) 987-6543',
    bloodGroup: 'B+',
    createdAt: new Date('2026-02-10T11:00:00Z'),
  },
];

const sampleAppointments = [
  {
    _id: 'appt_demo_01',
    appointmentCode: 'CARE-APPT-883A12',
    patientId: 'usr_patient_01',
    patientName: 'Alexander Wright',
    patientEmail: 'patient@medicare.clinic',
    patientPhone: '+1 (555) 987-6543',
    patientAge: 34,
    patientGender: 'Male',
    doctorId: 'doc_sarah_01',
    doctorName: 'Dr. Sarah Jenkins, MD',
    department: 'Cardiology',
    date: '2026-11-06',
    timeSlot: '09:00 AM',
    consultationFee: 120,
    symptoms: 'Occasional mild palpitations after cardiovascular exercise and routine lipid check.',
    medicalHistory: 'Mild familial hypertension, non-smoker.',
    status: 'Confirmed',
    createdAt: new Date('2026-11-01T10:15:00Z'),
  },
  {
    _id: 'appt_demo_02',
    appointmentCode: 'CARE-APPT-419F7C',
    patientId: 'usr_patient_01',
    patientName: 'Alexander Wright',
    patientEmail: 'patient@medicare.clinic',
    patientPhone: '+1 (555) 987-6543',
    patientAge: 34,
    patientGender: 'Male',
    doctorId: 'doc_david_06',
    doctorName: 'Dr. David Chen, MD',
    department: 'General Medicine',
    date: '2026-11-08',
    timeSlot: '10:30 AM',
    consultationFee: 75,
    symptoms: 'Annual physical exam, biometric checkup, and routine metabolic panel.',
    medicalHistory: 'None reported.',
    status: 'Confirmed',
    createdAt: new Date('2026-11-02T14:20:00Z'),
  },
  {
    _id: 'appt_demo_03',
    appointmentCode: 'CARE-APPT-902B4E',
    patientId: 'usr_patient_walkin_02',
    patientName: 'Emily Parker',
    patientEmail: 'emily.parker@example.com',
    patientPhone: '+1 (555) 432-1098',
    patientAge: 29,
    patientGender: 'Female',
    doctorId: 'doc_aisha_05',
    doctorName: 'Dr. Aisha Patel, MD',
    department: 'Dermatology',
    date: '2026-11-05',
    timeSlot: '11:00 AM',
    consultationFee: 95,
    symptoms: 'Evaluation of atypical mole on left shoulder and dry skin flare-ups.',
    medicalHistory: 'Penicillin allergy.',
    status: 'Checked-In',
    checkedInAt: new Date(),
    createdAt: new Date('2026-11-03T09:00:00Z'),
  },
];

// In-Memory Dual-Engine arrays initialized from samples
const inMemoryUsers = JSON.parse(JSON.stringify(sampleUsers));
const inMemoryDepartments = JSON.parse(JSON.stringify(sampleDepartments));
const inMemoryDoctors = JSON.parse(JSON.stringify(sampleDoctors));
const inMemoryAppointments = JSON.parse(JSON.stringify(sampleAppointments));

const seedDatabase = async () => {
  if (!getDbStatus()) {
    console.log('[MediCare Plus] Running purely in resilient In-Memory Store.');
    return;
  }

  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[MediCare Plus] Seeding Users into MongoDB...');
      await User.insertMany(sampleUsers);
    }

    const deptCount = await Department.countDocuments();
    if (deptCount === 0) {
      console.log('[MediCare Plus] Seeding Departments into MongoDB...');
      await Department.insertMany(sampleDepartments);
    }

    const docCount = await Doctor.countDocuments();
    if (docCount === 0) {
      console.log('[MediCare Plus] Seeding Doctors into MongoDB...');
      await Doctor.insertMany(sampleDoctors);
    }

    const apptCount = await Appointment.countDocuments();
    if (apptCount === 0) {
      console.log('[MediCare Plus] Seeding Appointments into MongoDB...');
      await Appointment.insertMany(sampleAppointments);
    }
  } catch (err) {
    console.error('[MediCare Plus] Error during seeding:', err.message);
  }
};

module.exports = {
  sampleUsers,
  sampleDepartments,
  sampleDoctors,
  sampleAppointments,
  inMemoryUsers,
  inMemoryDepartments,
  inMemoryDoctors,
  inMemoryAppointments,
  seedDatabase,
};
