import Header from "../header/header";
import FeaturedEvent from "../featured-event/FeaturedEvent";
import EventList from "../Event_List/EventList";
import EventCategories from "../event_category/event_category";

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <FeaturedEvent />
        <EventList />
        <EventCategories />
      </main>
    </>
  );
}

export default HomePage;
