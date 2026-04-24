export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  treatment: string;
  date: string;
  time: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  patientName: string;
  treatment: string;
  rating: number;
  text: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
}

export interface BillItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Bill {
  id: string;
  patientName: string;
  phone: string;
  date: string;
  items: BillItem[];
  total: number;
}

export const dummyAppointments: Appointment[] = [
  { id: "a1", patientName: "Rajesh Patel", email: "rajesh@email.com", phone: "9876543210", treatment: "Panchakarma Therapy", date: "2026-03-28", time: "10:00 AM", status: "pending" },
  { id: "a2", patientName: "Priya Sharma", email: "priya@email.com", phone: "9876543211", treatment: "Abhyanga Massage", date: "2026-03-29", time: "11:00 AM", status: "approved" },
  { id: "a3", patientName: "Amit Joshi", email: "amit@email.com", phone: "9876543212", treatment: "Yoga & Meditation", date: "2026-03-30", time: "09:00 AM", status: "pending" },
  { id: "a4", patientName: "Neha Desai", email: "neha@email.com", phone: "9876543213", treatment: "Skin & Beauty Care", date: "2026-03-31", time: "02:00 PM", status: "rejected" },
];

export const dummyReviews: Review[] = [
  { id: "r1", patientName: "Rajesh Patel", treatment: "Panchakarma Therapy", rating: 5, text: "Excellent treatment! My chronic pain is gone.", date: "2026-03-20" },
  { id: "r2", patientName: "Priya Sharma", treatment: "Herbal Medicine", rating: 5, text: "Dr. Vandana's approach is truly holistic and effective.", date: "2026-03-18" },
  { id: "r3", patientName: "Amit Joshi", treatment: "Yoga & Meditation", rating: 4, text: "Great yoga sessions, very calming environment.", date: "2026-03-15" },
];

export const dummyMedicines: Medicine[] = [
  { id: "m1", name: "Triphala Churna", category: "Churna", quantity: 50, unit: "packets", pricePerUnit: 120 },
  { id: "m2", name: "Ashwagandha Capsules", category: "Capsule", quantity: 100, unit: "bottles", pricePerUnit: 250 },
  { id: "m3", name: "Brahmi Vati", category: "Vati", quantity: 30, unit: "bottles", pricePerUnit: 180 },
  { id: "m4", name: "Chyawanprash", category: "Avaleha", quantity: 20, unit: "jars", pricePerUnit: 350 },
  { id: "m5", name: "Mahanarayan Oil", category: "Oil", quantity: 40, unit: "bottles", pricePerUnit: 200 },
  { id: "m6", name: "Guduchi Tablets", category: "Tablet", quantity: 60, unit: "bottles", pricePerUnit: 150 },
];

export const dummyBills: Bill[] = [
  {
    id: "b1",
    patientName: "Rajesh Patel",
    phone: "9876543210",
    date: "2026-03-20",
    items: [
      { description: "Panchakarma Therapy (7 days)", quantity: 1, rate: 15000, amount: 15000 },
      { description: "Triphala Churna", quantity: 2, rate: 120, amount: 240 },
      { description: "Consultation Fee", quantity: 1, rate: 500, amount: 500 },
    ],
    total: 15740,
  },
];
