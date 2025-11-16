import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext } from "react";
import { Layout } from "./Components/pages/Layout/Layout";
import { NotFound } from "./Components/pages/NotFound/NotFound";
import { useEventState } from "./Components/hooks/useEventState";
import HomePage from "./Components/pages/HomePage";
import EventsPage from "./Components/pages/EventPage";
import CategoriesPage from "./Components/pages/CategoriesPage";
import AboutPage from "./Components/pages/AboutPage";

export const SharedEventContext = createContext<any>(null);

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
  const sharedEventState = useEventState();

  return (
    <SharedEventContext.Provider value={sharedEventState}>
      <RouterProvider router={router} />
    </SharedEventContext.Provider>
  );
}

export default App;
