export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
};

export const events: Event[] = [
  {
    id: 1,
    title: "RRC Hackathon 2025",
    date: "2025-10-10",
    location: "Room A104 - Roblin Centre",
    description:
      "Join us for a 24-hour hackathon where students collaborate to solve real-world problems.",
  },
  {
    id: 2,
    title: "Cultural Night 2025",
    date: "2025-10-15",
    location: "Main Hall - Notre Dame Campus",
    description:
      "Celebrate cultural diversity with food, music, and performances from around the world.",
  },
  {
    id: 3,
    title: "Career Prep Workshop",
    date: "2025-10-20",
    location: "Library Room 2 - EDC",
    description:
      "Learn resume and LinkedIn optimization from experienced career advisors.",
  },
  {
    id: 4,
    title: "Guest Lecture: Future of AI in Canada",
    date: "2025-10-25",
    location: "Great-West Life Lecture Theatre",
    description:
      "Explore how AI is transforming industries and what career paths are emerging in Canada.",
  },
  {
    id: 5,
    title: "Sports Day 2025",
    date: "2025-10-28",
    location: "Outdoor Field - Notre Dame Campus",
    description:
      "Compete in friendly sports matches and enjoy snacks and live commentary.",
  },
  {
    id: 6,
    title: "Tech Expo 2025",
    date: "2025-11-02",
    location: "Innovation Centre Atrium",
    description:
      "Showcase of RRC students' innovations in software, AI, and cloud technologies.",
  },
  {
    id: 7,
    title: "Volunteer Fair 2025",
    date: "2025-11-05",
    location: "EDC Main Lobby",
    description:
      "Connect with local organizations and learn how to make an impact through volunteering.",
  },
  {
    id: 8,
    title: "Coding Jam 2025",
    date: "2025-11-12",
    location: "Innovation Lab - Room 302",
    description:
      "A 6-hour coding competition to build quick, creative projects — solo or in teams.",
  },
  {
    id: 9,
    title: "Cybersecurity Awareness Week",
    date: "2025-11-20",
    location: "Notre Dame Campus - Room B208",
    description:
      "Interactive sessions on ethical hacking, password safety, and online security.",
  },
  {
    id: 10,
    title: "Student Showcase 2025",
    date: "2025-12-01",
    location: "Exchange District Auditorium",
    description:
      "End-of-term event featuring top student projects presented to staff and industry guests.",
  },
];
