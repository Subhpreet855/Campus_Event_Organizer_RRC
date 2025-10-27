# In this sprint of my campus event organizer project I used Hook, Service, and Repository.
 
## 1. Hook:  useListControls.ts
 
### What it does:  
- This hook handles small actions like searching, sorting, and validating input fields on the webpage.  
- Instead of writing the same logic in different components, I kept all the control logic in one place.    
- This helps manage how data is filtered and how validation messages are shown.  
 
### Why it’s important:  
- It makes my code cleaner and easier to understand.  
- If I want to change how sorting or searching works, I only need to update this hook file once.  
- It helps to keep the app structure organized.
 
### Where I used it:  
- I used this hook in the `EventCategories` component to control searching and sorting of category names.  
- It helps the page update automatically when a user types something in the search bar or changes the sorting order.
 
---
 
## 2. Service: EventService.ts
 
### What it does:   
- It includes methods for sorting category names alphabetically and finding upcoming events by date.  
- It also communicates with the repository to access and modify data when needed.  
 
### Why it’s important:  
- It keeps my code modular and easy to update.  
- By separating logic into the service file, I can easily change how events or categories behave without touching the UI or repository code.  
- This helps maintain a clear separation between the display and the underlying logic.
 
### Where I used it:  
- I used this service in the `EventCategories` component to sort the category names in A–Z or Z–A order.  
- It works together with the repository to keep my list organized and up-to-date.
 
---
 
## 3. Repository: categoryRepository.ts
 
### What it does:  
- The repository handles all the data-related work.  
- It uses test data from my mockdataCategories.ts file and allows me to get, add, and delete categories.  
- It performs basic CRUD operations (Create, Read, Delete).
 
### Why I used it:  
- This keeps all the data logic separate from the rest of the app.  
- If I connect a real database or API in the future, I will only need to change this one file.  
- It makes managing data easier and helps keep the code organized and scalable.
 
### Where I used it:  
- I used this repository directly in the EventCategories component to load, add, and remove categories.  
- Whenever a user adds a new category, it is stored in the repository, and when they delete one, it is removed from there too.  
- This ensures the component’s data stays consistent.

 