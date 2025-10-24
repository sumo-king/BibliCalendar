import { BibleView } from "./bible_controller/bible.controller";
import { CalendarView } from "./Views/calendar";

export const Body = ({ currentView, setCurrentView, matches }) => {
  return (
    <div style={styles.body}>
      <div style={styles.mainContent}>
        {currentView === 0 ? <CalendarView matches={matches} /> : <BibleView />}
      </div>
      
      <nav style={styles.tabBar}>
        <button 
          style={{...styles.tab, ...(currentView === 0 ? styles.tabActive : {})}}
          onClick={() => setCurrentView(0)}
        >
          <span style={styles.tabIcon}>📅</span>
          <span>Calendar</span>
        </button>
        <button 
          style={{...styles.tab, ...(currentView === 1 ? styles.tabActive : {})}}
          onClick={() => setCurrentView(1)}
        >
          <span style={styles.tabIcon}>📖</span>
          <span>Bible</span>
        </button>
      </nav>
    </div>
  );
};

const styles = {
    app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  body: {
    paddingTop: '80px',
    paddingBottom: '100px',
    minHeight: '100vh',
  },
  mainContent: {
    padding: '2rem 1rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 2rem',
    border: '2px solid #e0e0e0',
    backgroundColor: '#f8f9fa',
    color: '#495057',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s',
    outline: 'none',
  },
  tabActive: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    borderColor: '#2c3e50',
    transform: 'scale(1.05)',
  },
  tabIcon: {
    fontSize: '1.25rem',
  },
  tabBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderTop: '2px solid #d4af37',
    boxShadow: '0 -2px 12px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },

}
// export const Body = () => {
//     // Checking window size of client device
//     const mediaMatch = window.matchMedia('(min-width: 768px)');
//     const [matches, setMatches] = useState(mediaMatch.matches);
//     const [currentView, setCurrentView] = useState(0); // 0 = calendar, 1 = bible

//     // Update matches state on media query change
//     useEffect(() => {
//         const handler = e => setMatches(e.matches);
//         mediaMatch.addListener(handler);
//         return () => mediaMatch.removeListener(handler);
//     });

//     const bodyStyles = {
//         container: isRowbased => ({
//             display: 'flex',
//             flexDirection: isRowbased ? 'row' : 'column',
//             justifyContent: 'center',
//             gap: '5px',
//             padding: '1rem'
//         }),
//         tabBar: {
//             position: 'fixed',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             display: 'flex',
//             justifyContent: 'center',
//             gap: '1rem',
//             padding: '1rem',
//             borderTop: '1px solid #ddd',
//             background: 'white',
//             zIndex: 1000,
//         },
//         tab: (isActive) => ({
//             padding: '0.5rem 1.5rem',
//             border: 'none',
//             background: isActive ? '#007bff' : '#f0f0f0',
//             color: isActive ? 'white' : 'black',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             fontSize: '1rem',
//             fontWeight: isActive ? 'bold' : 'normal',
//         })
//     };
  
//     const cardStyles = {
//         minWidth: '30vw',
//         minHeight: '40vh',
//         borderRadius: '5px',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     };

//     // Calendar View Component
//     const CalendarView = () => (
//         <div className="calendar-section">
//             <h1>Calendar event this week:</h1>
//             <div style={bodyStyles.container(matches)}>
//                 {/* Lunar calendar */}
//                 <LunarCal cardStyles={cardStyles}/>
//                 {/* Traditional Jewish calendar */}
//                 <TraditionCal cardStyles={cardStyles}/>
//                 {/* Zadok/Jubilees Calendar */}
//                 <ZadokCalendar cardStyles={cardStyles}/>
//             </div>
//         </div>
//     );
  
//     return(
//         <div style={{justifyItems: 'center', paddingTop: '10vh'}}>
//             {/* Fixed tab buttons at bottom */}
//             <div style={bodyStyles.tabBar}>
//                 <button 
//                     style={bodyStyles.tab(currentView === 0)}
//                     onClick={() => setCurrentView(0)}
//                 >
//                     Calendar
//                 </button>
//                 <button 
//                     style={bodyStyles.tab(currentView === 1)}
//                     onClick={() => setCurrentView(1)}
//                 >
//                     Bible
//                 </button>
//             </div>

//             {/* Add padding to account for fixed bottom tab bar */}
//             <div style={{paddingTop: '1rem', paddingBottom: '90px'}}>
//                 {/* Render only the active view */}
//                 {currentView === 0 ? <CalendarView /> : <BibleView />}
//             </div>
//         </div>
//     );
// }