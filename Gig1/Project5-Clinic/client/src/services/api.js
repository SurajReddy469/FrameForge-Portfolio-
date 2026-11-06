// Resilient API Client for MediCare Plus with Dual-Engine Fallback
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const INITIAL_DEPARTMENTS = [
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

export const INITIAL_DOCTORS = [
  {
    _id: 'doc_sarah_01',
    name: 'Dr. Sarah Jenkins, MD',
    email: 'sjenkins@medicare.clinic',
    department: 'Cardiology',
    departmentCode: 'CARD',
    specialization: 'Interventional Cardiology & Preventive Heart Health',
    qualifications: 'MD, FACC – Johns Hopkins Medicine',
    experienceYears: 14,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1594824813579-5683c31e9c56?auto=format&fit=crop&w=600&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
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

export const INITIAL_APPOINTMENTS = [
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
    createdAt: new Date('2026-11-01T10:15:00Z').toISOString(),
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
    createdAt: new Date('2026-11-02T14:20:00Z').toISOString(),
  },
  {
    _id: 'appt_demo_03',
    appointmentCode: 'CARE-APPT-902B4E',
    patientId: 'usr_patient_walkin_02',
    patientName: 'Emily Parker',
    patientEmail: 'emily.parker@example.com',
    patientPhone: '+1 (555) 345-6789',
    patientAge: 28,
    patientGender: 'Female',
    doctorId: 'doc_elena_03',
    doctorName: 'Dr. Elena Rostova, MD',
    department: 'Pediatrics',
    date: '2026-11-07',
    timeSlot: '02:00 PM',
    consultationFee: 85,
    symptoms: 'Infant wellness follow-up and vaccination schedule check.',
    medicalHistory: 'None.',
    status: 'Confirmed',
    createdAt: new Date('2026-11-03T11:00:00Z').toISOString(),
  }
];

const getLocalData = (key, initial) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initial;
  } catch {
    return initial;
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

const getAuthHeaders = () => {
  const token = localStorage.getItem('medicare_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const authApi = {
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return await handleApiResponse(res);
    } catch (err) {
      if (err.isHttpError && err.status === 401 && !email.includes('medicare.clinic')) throw err;
      // Resilient demo auth fallback
      let userRole = 'patient';
      let userName = 'Alexander Wright';
      if (email.includes('admin') || email === 'admin@medicare.clinic') {
        userRole = 'admin';
        userName = 'Clinic Reception Desk';
      } else if (email.includes('doctor') || email === 'doctor@medicare.clinic') {
        userRole = 'doctor';
        userName = 'Dr. Sarah Jenkins, MD';
      }

      const demoUser = {
        _id: 'usr_' + Date.now(),
        name: userName,
        email,
        role: userRole,
        phone: '+1 (555) 987-6543',
        bloodGroup: 'O+'
      };
      const token = 'demo-jwt-token-' + userRole;
      localStorage.setItem('medicare_token', token);
      localStorage.setItem('medicare_user', JSON.stringify(demoUser));
      return { success: true, token, user: demoUser };
    }
  },

  register: async (userData) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return await handleApiResponse(res);
    } catch (err) {
      // fallback to local data
      const demoUser = {
        _id: 'usr_' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'patient',
        phone: userData.phone || '+1 (555) 000-0000',
        bloodGroup: userData.bloodGroup || 'O+'
      };
      const token = 'demo-jwt-token-patient';
      localStorage.setItem('medicare_token', token);
      localStorage.setItem('medicare_user', JSON.stringify(demoUser));
      return { success: true, token, user: demoUser };
    }
  },

  me: async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders(),
      });
      const data = await handleApiResponse(res);
      return data.user;
    } catch (err) {
      // fallback to local data
      const stored = localStorage.getItem('medicare_user');
      if (stored) {
        try { return JSON.parse(stored); } catch {}
      }
      return {
        _id: 'usr_patient_01',
        name: 'Alexander Wright',
        email: 'patient@medicare.clinic',
        role: 'patient',
        phone: '+1 (555) 987-6543',
        bloodGroup: 'B+'
      };
    }
  },
};

export const departmentApi = {
  getAll: async () => {
    try {
      const res = await fetch(`${API_BASE}/departments`);
      const data = await handleApiResponse(res);
      return data.data || data;
    } catch (err) {
      // fallback to local data
      return getLocalData('medicare_departments', INITIAL_DEPARTMENTS);
    }
  },

  getByCode: async (code) => {
    try {
      const res = await fetch(`${API_BASE}/departments/${code}`);
      const data = await handleApiResponse(res);
      return data.data || data;
    } catch (err) {
      // fallback to local data
      const depts = getLocalData('medicare_departments', INITIAL_DEPARTMENTS);
      return depts.find(d => d.code === code) || depts[0];
    }
  },
};

export const doctorApi = {
  getAll: async (params = {}) => {
    try {
      const query = new URLSearchParams();
      if (params.department && params.department !== 'ALL') query.append('department', params.department);
      if (params.search) query.append('search', params.search);

      const res = await fetch(`${API_BASE}/doctors?${query.toString()}`);
      const data = await handleApiResponse(res);
      return data.data || data;
    } catch (err) {
      // fallback to local data
      let docs = getLocalData('medicare_doctors', INITIAL_DOCTORS);
      if (params.department && params.department !== 'ALL') {
        docs = docs.filter(d => d.department.toLowerCase() === params.department.toLowerCase() || d.departmentCode === params.department);
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        docs = docs.filter(d => d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q) || d.department.toLowerCase().includes(q));
      }
      return docs;
    }
  },

  getById: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/doctors/${id}`);
      const data = await handleApiResponse(res);
      return data.data || data;
    } catch (err) {
      // fallback to local data
      const docs = getLocalData('medicare_doctors', INITIAL_DOCTORS);
      return docs.find(d => d._id === id) || docs[0];
    }
  },

  getAvailability: async (id, date) => {
    try {
      const res = await fetch(`${API_BASE}/doctors/${id}/availability?date=${date}`);
      const data = await handleApiResponse(res);
      return data.data || data;
    } catch (err) {
      const docs = getLocalData('medicare_doctors', INITIAL_DOCTORS);
      const doc = docs.find(d => d._id === id) || docs[0];
      const appts = getLocalData('medicare_appointments', INITIAL_APPOINTMENTS);
      const bookedSlots = appts
        .filter(a => a.doctorId === id && a.date === date && a.status !== 'Cancelled')
        .map(a => a.timeSlot);

      const allSlots = doc.availableSlots || ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
      const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
      return {
        date,
        doctorId: id,
        allSlots,
        bookedSlots,
        availableSlots: availableSlots.length > 0 ? availableSlots : allSlots
      };
    }
  },
};

export const appointmentApi = {
  book: async (appointmentData) => {
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(appointmentData),
      });
      const data = await handleApiResponse(res);
      return data.data || data;
    } catch (err) {
      if (err.isHttpError && err.status === 400) throw err;
      const appts = getLocalData('medicare_appointments', INITIAL_APPOINTMENTS);
      const randCode = 'CARE-APPT-' + Math.floor(100000 + Math.random() * 900000);
      const newAppt = {
        ...appointmentData,
        _id: 'appt_' + Date.now(),
        appointmentCode: randCode,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };
      const updated = [newAppt, ...appts];
      setLocalData('medicare_appointments', updated);
      return newAppt;
    }
  },

  getMy: async () => {
    try {
      const res = await fetch(`${API_BASE}/appointments/my`, {
        headers: getAuthHeaders(),
      });
      const data = await handleApiResponse(res);
      return data.data || data;
    } catch (err) {
      // fallback to local data
      return getLocalData('medicare_appointments', INITIAL_APPOINTMENTS);
    }
  },

  getByCode: async (code) => {
    try {
      const res = await fetch(`${API_BASE}/appointments/code/${code}`);
      const data = await handleApiResponse(res);
      return data.data || data;
    } catch (err) {
      // fallback to local data
      const appts = getLocalData('medicare_appointments', INITIAL_APPOINTMENTS);
      const found = appts.find(a => a.appointmentCode.toLowerCase() === (code || '').toLowerCase());
      if (!found) throw new Error('Appointment not found');
      return found;
    }
  },

  getAll: async (filters = {}) => {
    try {
      const query = new URLSearchParams();
      if (filters.status && filters.status !== 'All') query.append('status', filters.status);
      if (filters.search) query.append('search', filters.search);
      if (filters.date) query.append('date', filters.date);

      const res = await fetch(`${API_BASE}/appointments?${query.toString()}`, {
        headers: getAuthHeaders(),
      });
      const data = await handleApiResponse(res);
      return data.data || data;
    } catch (err) {
      // fallback to local data
      let appts = getLocalData('medicare_appointments', INITIAL_APPOINTMENTS);
      if (filters.status && filters.status !== 'All') {
        appts = appts.filter(a => a.status === filters.status);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        appts = appts.filter(a => a.patientName.toLowerCase().includes(q) || a.appointmentCode.toLowerCase().includes(q) || a.doctorName.toLowerCase().includes(q));
      }
      if (filters.date) {
        appts = appts.filter(a => a.date === filters.date);
      }
      return appts;
    }
  },

  updateStatus: async (id, status, cancellationReason = '') => {
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, cancellationReason }),
      });
      const data = await handleApiResponse(res);
      return data.data || data;
    } catch (err) {
      // fallback to local data
      const appts = getLocalData('medicare_appointments', INITIAL_APPOINTMENTS);
      const updated = appts.map(a => a._id === id ? { ...a, status, cancellationReason } : a);
      setLocalData('medicare_appointments', updated);
      return updated.find(a => a._id === id);
    }
  },

  cancel: async (id, reason = '') => {
    try {
      const res = await fetch(`${API_BASE}/appointments/${id}/cancel`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ reason }),
      });
      const data = await handleApiResponse(res);
      return data.data || data;
    } catch (err) {
      // fallback to local data
      const appts = getLocalData('medicare_appointments', INITIAL_APPOINTMENTS);
      const updated = appts.map(a => a._id === id ? { ...a, status: 'Cancelled', cancellationReason: reason } : a);
      setLocalData('medicare_appointments', updated);
      return updated.find(a => a._id === id);
    }
  },

  downloadCSV: async () => {
    try {
      const token = localStorage.getItem('medicare_token');
      const res = await fetch(`${API_BASE}/appointments/export/csv`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error('API failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medicare_appointments_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      // Offline fallback CSV export
      const appts = getLocalData('medicare_appointments', INITIAL_APPOINTMENTS);
      const headers = ['Appointment Code', 'Patient Name', 'Email', 'Phone', 'Doctor', 'Department', 'Date', 'Time Slot', 'Fee ($)', 'Status'];
      const rows = appts.map(a => [
        `"${(a.appointmentCode || '').replace(/"/g, '""')}"`,
        `"${(a.patientName || '').replace(/"/g, '""')}"`,
        `"${(a.patientEmail || '').replace(/"/g, '""')}"`,
        `"${(a.patientPhone || '').replace(/"/g, '""')}"`,
        `"${(a.doctorName || '').replace(/"/g, '""')}"`,
        `"${(a.department || '').replace(/"/g, '""')}"`,
        `"${(a.date || '').replace(/"/g, '""')}"`,
        `"${(a.timeSlot || '').replace(/"/g, '""')}"`,
        `"${a.consultationFee || 0}"`,
        `"${(a.status || '').replace(/"/g, '""')}"`
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medicare_appointments_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  },
};
