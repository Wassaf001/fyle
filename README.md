# Health Challenge Tracker

## Project Overview

Welcome to the Health Challenge Tracker project! This single-page application (SPA) is designed to help users track their workout routines efficiently. The application is built using Angular 18, and includes features like search, filter, pagination, and chart visualizations.

<img width="1470" alt="Screenshot 2024-07-17 at 1 41 03 AM" src="https://github.com/user-attachments/assets/f36ab2da-75a7-4862-a3b2-6d78ef0b398e">

## Features

- **Add User Workouts**: Input fields for user name, workout type, and workout minutes.
- **Workout List**: Display user workouts in a table grid.
- **Search and Filter**: Search by user name and filter by workout type.
- **Pagination**: Paginate the user workout list when it exceeds five users.
- **Charts**: Display workout progress using charts.
<img width="1470" alt="Screenshot 2024-07-17 at 1 41 17 AM" src="https://github.com/user-attachments/assets/42b2f75a-615b-44b0-928a-9668a6c0263b">

## Requirements

- Angular 18.0.1
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js
- Angular CLI

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Wassaf001/fyle.git
   cd fyle
   ```
2. **Install dependencies**:
   ```
   npm install
   ```
3. **Development Server:**
    Run ```ng serve``` for a development server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

4. **Build:**
Run ```ng build``` to build the project. 

5. **Running Unit Tests:**
   Run ```ng test``` to execute the unit tests via Karma.


## Application Structure

#### src/app/my_components: Contains all the Angular custom components.
#### src/app/services: Contains the service files for data handling.

## Implementation Details

### Adding Workouts
Users can add their workout details using the input fields provided. The data is stored in localStorage and displayed in a table grid.



### Workout List
The workout list is displayed in a table format with options to search by user name and filter by workout type. Pagination is implemented for lists exceeding five users.



### Charts 
Visualize the workout progress of users through charts. This feature is implemented using PrimeNG Chart



### Unit Testing

The project includes unit tests for one component and one service, ensuring 100% code coverage. 

### Running Tests
To run the unit tests, use the following command:

```
ng test
```

### Test Coverage
The screenshot of the coverage report is available here.
<img width="1470" alt="Screenshot 2024-07-16 at 11 27 41 PM" src="https://github.com/user-attachments/assets/3b39cdae-f45a-490b-8bd8-e706a80897f8">

### Hosting

The application is hosted on Vercel. The hosted link can be found here: <a href="https://fyleassignment-git-main-wassaf001s-projects.vercel.app">Fyle</a>

