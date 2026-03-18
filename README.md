# BibliCalendar

![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Purpose
BibliCalendar is a comprehensive web application designed to integrate spiritual life with daily planning. It combines a functional calendar with a robust Bible reader, allowing users to seamlessly switch between managing their schedule and engaging with scripture. The application features a clean, responsive interface that works beautifully on both desktop and mobile devices.

## Features
- **Bible Reader**: 
  - Access multiple translations (WEB, KJV, BBE, Vulgate).
  - Easy navigation by Book, Chapter, and Verse.
  - Verse highlighting functionality.
  - Clean, distraction-free reading mode.
- **Advanced Calendar Integration**: 
  - Hebrew calendar integration powered by Hebcal.
  - Moon phase tracking with detailed lunar information.
  - Multiple calendar views (Lunar, Time/Date, Tradition, Zadok).
  - Moon phase details and lunar cycle tracking.
- **Responsive Design**: Optimized for both desktop and mobile experiences with Material Design principles.

## Tools and APIs Used
This project is built using the following technologies:

### Frontend
- **React**: The core framework for building the user interface (v18.2.0).
- **Tailwind CSS**: For utility-first styling and responsive design.
- **Material-UI (MUI)**: Comprehensive component library for building modern interfaces.
- **Emotion**: CSS-in-JS library for component styling.
- **Lucide React**: For beautiful, consistent iconography.

### Backend & Services
- **Bible API** (`bible-api.com`): Used to fetch scripture text in various translations.
- **@hebcal/core**: Provides Hebrew calendar calculations and Jewish holidays.
- **lunarphase-js**: Calculates moon phases for the calendar view.

## Project Architecture
The application follows a clean, modular architecture with clear separation of concerns:

### Structure
- **Controllers/**: Business logic and state management
  - `bible_controller/`: Handles Bible reader functionality
  - `calendar_controllers/`: Manages different calendar views (Lunar, Time/Date, Tradition, Zadok)
- **Views/**: Presentation components
  - `calendar_view.jsx`: Main calendar display component
  - `LunarDetailView.jsx`: Detailed lunar information view
- **Services/**: External API integration and utilities
  - `bible.service.js`: Bible API integration
- **Hooks/**: Custom React hooks (extensible)

This structure enables better code organization, reusability, and maintainability.

## Deployment
To deploy this project locally or for production:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sumo-king/BibliCalendar.git
    cd biblicalendar_app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run locally**:
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

4.  **Build for production**:
    ```bash
    npm run build
    ```
    The build artifacts will be stored in the `build/` directory.

## Contact
If you have any problems, suggestions, or feedback, please feel free to reach out:

**Email**: [stlosper@gmail.com](mailto:stlosper@gmail.com)
