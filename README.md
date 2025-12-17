## Features
- **Product Catalog**:  
  - Fetches and displays products (title, price, category, description, rating, image).  
  - Handles broken image URLs with a placeholder fallback.

- **Category Navigation**:  
  - Dynamic dropdown populated from API categories.  
  - Filters products by selected category.

- **Shopping Cart**:  
  - Add/remove products directly from product listing.  
  - Cart state managed with Redux Toolkit.  
  - SessionStorage persistence across sessions.  
  - Displays product count, individual prices, and total cost.

- **Checkout Simulation**:  
  - Clears cart state and storage.  
  - Provides visual feedback for successful checkout.

- **Authentication (Auth0)**:  
  - Secure login/logout flow integrated with React and TypeScript.

- **Modern Tooling**:  
  - TypeScript for type safety.  
  - React Query for efficient server state management.  
  - Redux Toolkit for predictable state handling.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

# Clone repository
git clone https://github.com/AnthonyI-626/Advanced-React-E-commerce-app-Redux
cd fakestore-app

Testing
This project includes both unit and integration tests to ensure reliability and maintainability.

Unit Testing
Framework: Jest + React Testing Library

Purpose: Validate individual components and functions in isolation.

Examples:

  Rendering components correctly (ProductList, ShoppingCart)

  Checking state changes and user interactions

  Ensuring Redux slices behave as expected

Run unit tests with:
  npm test (in fakestore-app)

Integration Testing
Framework: Jest + React Testing Library

Purpose: Verify that multiple components and services work together.

Examples:

  Adding a product updates the cart state

  Firebase Firestore queries return expected results

  Redux store integrates correctly with React components

Run integration tests with coverage:
  npm test --coverage (in fkaestore-app)

Coverage Reporting
Coverage reports are generated automatically when running tests with --coverage.

Reports include statements, branches, functions, and lines.

View results in the terminal or open the generated coverage/lcov-report/index.html in your browser.