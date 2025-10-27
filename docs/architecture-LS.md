# Campus Event Organizer - Sprint 3
### Architecture Documentation (Hook, Service ,Repository)

---

## 1. Custom Hook - `useEventState.ts`

### What this hook does:
The `useEventState` hook manages all the event data that appears on the page.
It loads mock event data when the application starts, keeps track of when data is ready, and allows adding or removing events without refreshing the page.

It uses React built-in `useState` and `useEffect` functions to control the data that is shown on the screen.
This helps to keep the main component simple and focused only on displaying information.

### Why this logic belongs here:
I decided to keep this logic inside a custom hook because it only deals with how the user sees and interacts with the event data, not where the data comes from.
This is considered presentation logic, which means it controls what is shown on the user interface rather than how the data is stored.
By separating this code, the project becomes easier to read and maintain.

### Where it is used:
This hook is imported and used in the `EventList.tsx` component.
The component uses `allEvents` and `loading` from the hook to display the events smoothly on the page.

---

## 2. Service - `EventListService.ts`

### What this service does:
The `EventListService` file manages the business logic of the event feature.
It communicates with the repository to get all events, sort them by date, and find the upcoming ones.
It also defines how data should be organized before it is displayed on the screen.

### Why this logic belongs here:
This file helps to keep non-UI logic separate from the components.
If the way events are sorted or filtered needs to change later, I only need to update this file instead of touching any of the React components.
It acts as a bridge between the user interface and the repository where the data is stored.

### Where it is used:
The service is used inside the hook and can also be used by other components in the future.
It connects directly with the `eventListRepository` file to get or modify event data.

---

## 3. Repository - `eventListRepository.ts`

### What this repository does:
The repository handles all data-related operations for events.
It imports mock data from `EventListMockData.ts` and allows basic CRUD actions such as getting all events, adding new ones, and deleting by ID.
It works like a small local database layer that keeps the data organized for display.

### Why this logic belongs here:
The purpose of this file is to keep all data management separate from the user interface and business logic.
If I replace the mock data with Firestore or a real API in the future, I will only need to edit this one file.
This approach follows clean coding principles and prepares the project for real backend integration.

### Where it is used:
The repository is used by the `EventListService`.
The service calls the methods from this repository to get and manage event data before sending it to the hook.

---

## Summary
In this sprint, I built my Event List feature using the hook, service, and repository structure.
The **hook** controls how data appears and updates in the interface.
The **service** manages business logic like sorting and filtering.
The **repository** handles the mock data and basic CRUD operations.

This structure keeps my code simple, well organized, and ready for future database integration in the next sprint.

---