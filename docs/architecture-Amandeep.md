Overview

This document explains the architecture design used in my Campus Event Organizer project for this sprint. It describes how I applied the Hook-Service-Repository pattern to separate logic and ensure better maintainability. The project structure follows a clear flow:
Component - Hook - Service - Repository - Test Data.

Each part of the implementation is described below with what it does, how I decided what logic to include, and where it is used.

1. Hook: useFeaturedEvents.ts
## What it does

The useFeaturedEvents hook manages event-related state and logic in the application. It loads, adds, and removes featured events by communicating with the service layer. It keeps the UI synchronized with the data stored in the repository.

## How I decided what logic to include

The hook contains only presentation logic and state management — no data processing or storage logic. I decided to include only actions that affect the UI (such as updating lists or showing loading states). This correctly separates presentation concerns from data management, keeping the component simple and reusable.

## Where it is used

This hook is used inside the FeaturedEvent component. It provides the items, loading, addFeatured, and remove functions that the component calls when users add or remove events.

2. Service: featuredEventService.ts
## What it does

The featuredEventService acts as the middle layer between the hook and the repository. It defines reusable methods such as listAll(), getById(), add(), update(), and remove(). These methods call the repository functions to perform CRUD operations.

##How I decided what logic to include

The service includes only business logic and data communication rules, not UI logic or direct data handling. This ensures a clean separation of concerns — the service focuses on how the app interacts with data, while the repository focuses on storing it. This design makes it easy to connect a future backend without changing the hook or component code.

##Where it is used

This service is used in the useFeaturedEvents hook to fetch and manage event data. For example, listAll() retrieves all events, and add() or remove() update the data stored in the repository.

3. Repository: featuredEventRepository.ts
##What it does

The featuredEventRepository handles all direct interactions with the data layer. It imports test data from FeaturedEventData.ts and provides CRUD operations — create, getAll, getById, update, and remove. It serves as the foundation for managing persistent event data.

## How I decided what logic to include

I included only data-access logic here. The repository doesn’t handle UI or state; its job is purely to manage the data structure and act as a bridge between the service and the test data. This structure will make it easy to replace mock data with a real database or API later.

##Where it is used

The repository is used by the featuredEventService file to perform actual data operations. Every create, read, update, or delete action passes through this repository, ensuring consistent data handling across the app.

Summary

This layered architecture provides clarity and flexibility:

Hook - Handles UI logic and connects components to data.

Service - Manages business rules and communication between UI and data.

Repository - Stores and manages data, using test data for now.

By separating responsibilities into these three layers, my project becomes easier to debug, maintain, and expand in future sprints when real APIs or databases are introduced.