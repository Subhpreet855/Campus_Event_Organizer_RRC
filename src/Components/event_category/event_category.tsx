import "../../Components/event_category/event_category.css"
function EventCategories() {
  // Initialize list of data
  const categories: string[] = ["Sports", "Workshops", "Social", "Academic", "Cultural"];

  // Return a section with a className
  return (
    <section className="event-categories">
      <h2>Event Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EventCategories;
