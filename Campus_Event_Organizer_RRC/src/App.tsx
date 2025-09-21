import "./App.css";
import Header from "./Components/header/header";
import FeaturedEvent from "./Components/featured-event/FeaturedEvent";
import EventList from "./Components/Event_List/EventList";
import EventCategories from "./Components/event_category/event_category";
 
function App() {
  return (
    <>
      <main>
        <Header />
        <FeaturedEvent />
        <EventList />
        <EventCategories />
        <footer />
      </main>
    </>
  );
}
 
export default App;