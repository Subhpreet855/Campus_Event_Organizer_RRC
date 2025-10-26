## 1. Custom Hook: `useFilteredEvents`

### What does this hook do?

The `useFilteredEvents` hook manages the search and filtering logic for events in the application.  
It keeps track of what the user types in the search bar and updates which events appear on the page.  
The hook only handles presentation logic — it does not deal with any database or backend rules.  

When a user types at least two characters, the hook filters through all events by checking their title, description, and location.  
This makes the search feature more interactive and keeps the code in the component simple.

---

### How did I decide what logic to include?

I followed the same idea from the instructors `useTerms` example in Module 3.  
The hook only uses `useState` and `useEffect` to manage local UI state.  
I included logic that directly affects what the user sees (like the search input and filtered list),  
and left all data fetching and validation for the service and repository layers.  

This separation keeps the logic clean — the hook just controls display behavior.

---

### Where is it used in the project?

The hook is imported and used in `EventList.tsx`.  
That component displays all events and includes a search bar that connects to this hook.  
Whenever the user types, the hook updates the list instantly.