import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Components/pages/Layout/Layout";
import Header from "./Components/header/header";
import FeaturedEvent from "./Components/featured-event/FeaturedEvent";
import EventList from "./Components/Event_List/EventList";
import EventCategories from "./Components/event_category/event_category";
import { NotFound } from "./Components/pages/NotFound/NotFound";

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

function EventsPage() {
  return (
    <>
      <Header />
      <main>
        <EventList />
      </main>
    </>
  );
}

function CategoriesPage() {
  return (
    <>
      <Header />
      <main>
        <EventCategories />
      </main>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <Header />
      <main className="p-4">
        <h2>About Campus Event Organizer</h2>
        <p>
          This platform helps students explore, organize, and participate in
          campus events to enhance community engagement.
        </p>
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <EventsPage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
