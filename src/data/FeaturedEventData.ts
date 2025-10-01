export type FeaturedEventData = {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export const featuredEvents: FeaturedEventData[] = [
  {
    id: "Event 1",
    name: "Newcomers Orientation",
    date: "Oct 15, 2025",
    time: "11:00 AM to 1:00 PM",
    location: "RRC Polytech — EDC Auditorium",
    description:
      "A welcome session for new students to get familiar with the campus, meet classmates, and grab some free snacks."
  },
  {
    id: "Event 2",
    name: "Tech Workshop",
    date: "Oct 20, 2025",
    time: "2:00 PM to 4:00 PM",
    location: "RRC Polytech — Lab 101",
    description:
      "Learn the basics of modern web development in a fun, hands-on workshop designed for beginners."
  },
  {
    id: "Event 3",
    name: "Sports Meetup",
    date: "Oct 25, 2025",
    time: "5:00 PM to 7:00 PM",
    location: "RRC Polytech — Gymnasium",
    description:
      "An evening of friendly games and activities where students can relax, play, and connect through sports."
  }
];
