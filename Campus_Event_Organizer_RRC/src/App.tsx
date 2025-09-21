import "./App.css";
import Header from "./Components/header/Header";
import FeaturedEvent from "./Components/featured-event/FeaturedEvent";
import EventList from "./Components/Event_List/EventList";
import EventCategories from "./Components/event_category/EventCategories";
import Footer from "./Components/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <FeaturedEvent />
        <EventList />
        <EventCategories />
      </main>
      <Footer />
    </>
  );
}

export default App;
