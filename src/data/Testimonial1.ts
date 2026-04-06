// src/data/Testimonial1.ts
// Testimonial data for the Home page TestimonialCarousel

export interface Testimonial1 {
  id: number;
  quote: string;
  body: string;
  name: string;
  role: string;
  /** Replace each avatarPlaceholder string with the real image path,
   *  e.g. "/assets/testimonials/idowu.jpg"
   *  The component will show an emoji fallback until you do. */
  avatarPlaceholder: string;
}

export const testimonials1: Testimonial1[] = [
  {
    id: 1,
    quote: "\"I almost paid an agent before I found Oga Landlord.\"",
    body: "As a student in Ibadan, house hunting was stressful and confusing. Oga Landlord helped me verify the agent and warned me about red flags I didn't notice. I eventually found a genuine place and avoided losing my money.",
    name: "Idowu Daniel",
    role: "Student",
    avatarPlaceholder: "/assets/testimonials/user.png",
    // ↑ replace with e.g. "/assets/testimonials/idowu.jpg"
  },
  {
    id: 2,
    quote: "\"Finally rented without fear of being scammed.\"",
    body: "I had been scammed before and was very cautious. Using OgaLandlord gave me the confidence to contact agents knowing they were verified. The whole process was smooth and transparent.",
    name: "Amaka Obi",
    role: "Civil Servant",
    avatarPlaceholder: "/assets/testimonials/user.png",
    // ↑ replace with e.g. "/assets/testimonials/amaka.jpg"
  },
  {
    id: 3,
    quote: "\"The trust score feature saved me from a bad deal.\"",
    body: "I checked the agent's trust score before proceeding. It was low, so I held back. Later I found out the listing was fake. OgaLandlord literally saved me hundreds of thousands of naira.",
    name: "Babatunde Raji",
    role: "Engineer",
    avatarPlaceholder: "/assets/testimonials/user.png",
    // ↑ replace with e.g. "/assets/testimonials/babatunde.jpg"
  },
  {
    id: 4,
    quote: "\"Best platform for finding honest landlords in Lagos.\"",
    body: "Moving from Abuja to Lagos felt impossible until I used OgaLandlord. Within two weeks I had inspected three properties and signed a legitimate lease. Highly recommended for anyone relocating.",
    name: "Fatima Usman",
    role: "Marketing Executive",
    avatarPlaceholder: "/assets/testimonials/user.png",
    // ↑ replace with e.g. "/assets/testimonials/fatima.jpg"
  },
];