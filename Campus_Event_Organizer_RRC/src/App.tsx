import "./App.css";
import Header from "./Components/header/header";
import FeaturedEventsPage from "./pages/FeaturedEventsPage";
import EventList from "./Components/Event_List/EventList";
import EventCategories from "./Components/event_category/event_category";
import Footer from "./Components/footer/footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <FeaturedEventsPage />
        <EventList />
        <EventCategories />
      </main>
      <Footer />
    </>
  );
}

export default App;
