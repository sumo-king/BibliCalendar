# BibliCalendar 📅

A comprehensive web application for tracking and converting dates across three biblical and traditional calendar systems: Lunar Calendar, Hebrew (Traditional) Calendar, and Zadok/Jubilees Calendar.

## 🌟 Features

### 1. **Multi-Calendar Display**
View today's date simultaneously across three different calendar systems:
- **Lunar Calendar**: Based on moon phases and cycles
- **Hebrew Calendar**: The traditional Jewish lunisolar calendar
- **Zadok Calendar**: The 364-day solar calendar from Qumran (coming soon)

### 2. **Date Converter Tool** 🔄
Convert any Gregorian date to:
- Hebrew calendar dates with full details (year, month, day)
- Lunar calendar positions (month and day)
- View all three calendar systems side-by-side

### 3. **Holiday Calendar** 🎉
- Browse all Hebrew/Jewish holidays for any year
- See upcoming holidays at a glance
- View both Gregorian and Hebrew dates for each observance
- Categorized by holiday type (major, minor, fast days, etc.)
- Navigate between years easily

### 4. **Educational Information Pages** 📚
Detailed explanations for each calendar system including:
- How each calendar works
- Biblical and historical significance
- Month structures and calculations
- Sabbath observance patterns
- Major holidays and appointed times

### 5. **Interactive Features**
- **Info Buttons**: Click ℹ️ on any calendar card to learn more
- **Year Navigation**: Browse holidays across different years
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Automatically calculates current dates

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sumo-king/BibliCalendar.git
cd biblicalendar_app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Required packages**
```bash
npm install @hebcal/core
# or
yarn add @hebcal/core
```

### Running the Application

**Development mode:**
```bash
npm run dev
# or
yarn dev
```

**Production build:**
```bash
npm run build
npm run start
# or
yarn build
yarn start
```

The application will be available at `http://localhost:3000` (or your configured port).

## 📖 Usage Guide

### Viewing Today's Date

1. Navigate to the **Calendar** tab (default view)
2. See today's date displayed in all three calendar systems
3. Click the ℹ️ button on any calendar card to learn more about that system

### Converting Dates

1. Click the **Converter** tab in the bottom navigation
2. Select any date using the date picker
3. View the conversion results for all three calendar systems
4. See detailed breakdowns including:
   - Full Gregorian date with day of the week
   - Hebrew year, month, and day
   - Lunar month and day positions

### Exploring Holidays

1. Click the **Holidays** tab in the bottom navigation
2. View upcoming holidays in the current year
3. Use the arrow buttons to browse different years
4. See both Gregorian and Hebrew dates for each holiday
5. Holidays are categorized (e.g., "major", "minor", "fast")

### Learning About Calendar Systems

1. On the main Calendar view, click any ℹ️ info button
2. Read detailed information about that calendar system
3. Learn about:
   - Historical context and significance
   - How the calendar is structured
   - Important observances and patterns
   - Biblical references and practices
4. Click the ✕ or outside the modal to close

## 🗂️ Project Structure

```
biblicalendar/
├── src/
│   ├── components/
│   │   ├── CalendarView.jsx      # Main calendar display
│   │   ├── DateConverter.jsx     # Date conversion tool
│   │   ├── HolidayCalendar.jsx   # Holiday listing
│   │   ├── InfoPage.jsx          # Educational modals
│   │   └── BibleView.jsx         # Scripture reader
│   ├── utils/
│   │   ├── lunarCalculations.js  # Lunar calendar logic
│   │   └── hebrewCalendar.js     # Hebrew calendar helpers
│   ├── styles/
│   │   └── globals.css           # Global styles
│   └── App.jsx                   # Main application component
├── public/
│   └── assets/                   # Images and icons
├── package.json
└── README.md
```

## 🎨 Design Philosophy

### Visual Design
- **Clean and Modern**: Minimalist interface with clear hierarchy
- **Respectful Aesthetics**: Dignified design appropriate for sacred content
- **Color Scheme**: 
  - Primary: #2c3e50 (Dark blue-gray)
  - Accent: #d4af37 (Gold)
  - Purple gradient for calendar headers
- **Typography**: System fonts for readability, Georgia serif for scripture

### User Experience
- **Intuitive Navigation**: Bottom tab bar for easy switching
- **Progressive Disclosure**: Info buttons reveal details when needed
- **Responsive Layout**: Adapts to all screen sizes
- **Accessibility**: High contrast, clear labels, keyboard navigation

## 📚 Calendar Systems Explained

### Lunar Calendar 🌙
- Based on the phases of the moon
- Each month begins at the new moon (~29.5 days)
- 12 months per year (354 days total)
- Used for tracking moon phases and some observances
- Days: 1 (New Moon) → 8 (First Quarter) → 15 (Full Moon) → 22 (Last Quarter) → 29/30

### Hebrew (Traditional) Calendar ✡️
- Lunisolar calendar combining lunar months with solar years
- 12 months in regular years, 13 in leap years
- Leap years occur 7 times in a 19-year cycle
- Day begins at sunset (evening to evening)
- Used for all Jewish holidays and observances
- Current year: 5786 (as of 2025)

**Months:**
1. Nisan (Spring - 30 days)
2. Iyar (30 days)
3. Sivan (30 days)
4. Tammuz (29 days)
5. Av (30 days)
6. Elul (29 days)
7. Tishrei (Fall - 30 days)
8. Cheshvan (29/30 days)
9. Kislev (29/30 days)
10. Tevet (29 days)
11. Shevat (30 days)
12. Adar (29 days, or Adar I & II in leap years)

### Zadok/Jubilees Calendar 📜
- 364-day solar calendar (52 weeks exactly)
- Used by Qumran community (Dead Sea Scrolls)
- 4 quarters of 91 days each
- Each quarter: 30 + 30 + 31 days
- Always begins on Wednesday (4th day)
- Feast days fall on same weekday every year
- Sabbaths on 4th, 11th, 18th, 25th of each month
- *Note: Full implementation coming soon*

## 🔧 Technical Details

### Dependencies
- **React**: UI framework
- **@hebcal/core**: Hebrew calendar calculations and holiday data
- **JavaScript Date API**: Gregorian date handling
- **Custom lunar calculations**: Moon phase and cycle tracking

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Lightweight (~50KB gzipped with dependencies)
- Fast initial load
- Efficient re-renders with React hooks
- No external API calls (all calculations client-side)

## 🛣️ Roadmap

### Phase 1: Core Features ✅
- [x] Multi-calendar display
- [x] Date converter
- [x] Holiday calendar
- [x] Information pages
- [x] Responsive design

### Phase 2: Enhanced Features 🚧
- [ ] Complete Zadok calendar implementation
- [ ] Scripture reader integration
- [ ] Bible reading plans aligned with calendars
- [ ] Export holidays to external calendars
- [ ] Dark mode support

### Phase 3: Advanced Features 📋
- [ ] Notifications for upcoming holidays
- [ ] Location-based sunset times
- [ ] Torah portion (Parsha) display
- [ ] Offline mode with PWA
- [ ] Multi-language support
- [ ] Print-friendly calendar views

### Phase 4: Community Features 🌐
- [ ] Personal notes on dates
- [ ] Sharing calendar links
- [ ] Custom holiday reminders
- [ ] Integration with calendar apps

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs**: Open an issue with detailed information
2. **Suggest Features**: Share your ideas in the discussions
3. **Submit Pull Requests**: 
   - Fork the repository
   - Create a feature branch
   - Make your changes
   - Submit a PR with clear description

### Development Guidelines
- Follow existing code style
- Write clear commit messages
- Test on multiple browsers
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **@hebcal/core**: Excellent Hebrew calendar library
- **Qumran Community**: For preserving ancient calendar knowledge
- **Open Source Community**: For inspiration and tools

## 📞 Support

- **Email**: stlosper@gmail.com

## 🌐 Links

- **Live Demo**: [https://wonderful-kashata-2a57a3.netlify.app/](https://wonderful-kashata-2a57a3.netlify.app/)
- **GitHub**: [https://github.com/sumo-king/BibliCalendar](https://github.com/sumo-king/BibliCalendar)

## 📱 Screenshots

### Calendar View
Displays today's date across all three calendar systems with beautiful card layouts and real-time moon phase indicators.

### Date Converter
Convert any date between calendar systems with detailed breakdowns of year, month, and day values.

### Holiday Calendar
Browse holidays across years with both Gregorian and Hebrew dates, featuring upcoming holiday highlights.

### Information Pages
Learn about each calendar system with comprehensive historical and practical information.

---

**Made with ❤️ for biblical calendar enthusiasts**

*"He appointed the moon for seasons; The sun knows its going down." - Psalm 104:19*