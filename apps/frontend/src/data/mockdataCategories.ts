export type Category = {
  id: number;
  name: string;
  description: string;
};

export const mockCategories: Category[] = [
  { id: 1, name: "Sports", description: "Outdoor and indoor athletic activities and competitions." },
  { id: 2, name: "Workshops", description: "Hands-on learning events focusing on skill development." },
  { id: 3, name: "Social", description: "Community gatherings, parties, and social meet-ups." },
  { id: 4, name: "Academic", description: "Lectures, seminars, and educational programs." },
  { id: 5, name: "Cultural", description: "Events celebrating various cultures and traditions." },
  { id: 6, name: "Technology", description: "Tech expos, hackathons, and innovation events." },
  { id: 7, name: "Health", description: "Fitness classes, wellness sessions, and awareness drives." },
  { id: 8, name: "Art", description: "Art exhibitions, painting classes, and creative showcases." },
  { id: 9, name: "Music", description: "Concerts, open mics, and performances." },
  { id: 10, name: "Volunteer", description: "Community service and charity-focused activities." },
];

 