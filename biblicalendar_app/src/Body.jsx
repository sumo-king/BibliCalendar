import { useEffect, useState } from "react";
import { LunarCal } from "./calendar_controllers/lunar.controller";
import { TraditionCal } from "./calendar_controllers/tradition.controller";
import { ZadokCalendar } from "./calendar_controllers/zadok.controller";
import { BibleView } from "./bible_controller/bible.controller";

export const Body = () => {
    // Checking window size of client device
    const mediaMatch = window.matchMedia('(min-width: 768px)');
    const [matches, setMatches] = useState(mediaMatch.matches);
    const [currentView, setCurrentView] = useState(0); // 0 = calendar, 1 = bible

    // Update matches state on media query change
    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });

    const bodyStyles = {
        container: isRowbased => ({
            display: 'flex',
            flexDirection: isRowbased ? 'row' : 'column',
            justifyContent: 'center',
            gap: '5px',
            padding: '1rem'
        }),
        tabBar: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1rem',
            borderTop: '1px solid #ddd',
            background: 'white',
            zIndex: 1000,
        },
        tab: (isActive) => ({
            padding: '0.5rem 1.5rem',
            border: 'none',
            background: isActive ? '#007bff' : '#f0f0f0',
            color: isActive ? 'white' : 'black',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: isActive ? 'bold' : 'normal',
        })
    };
  
    const cardStyles = {
        minWidth: '30vw',
        minHeight: '60vh',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
    };

    // Calendar View Component
    const CalendarView = () => (
        <div className="calendar-section">
            <h1>Calendar event this week:</h1>
            <div style={bodyStyles.container(matches)}>
                {/* Lunar calendar */}
                <LunarCal cardStyles={cardStyles}/>
                {/* Traditional Jewish calendar */}
                <TraditionCal cardStyles={cardStyles}/>
                {/* Zadok/Jubilees Calendar */}
                <ZadokCalendar cardStyles={cardStyles}/>
            </div>
        </div>
    );
  
    return(
        <div style={{justifyItems: 'center'}}>
            {/* Fixed tab buttons at bottom */}
            <div style={bodyStyles.tabBar}>
                <button 
                    style={bodyStyles.tab(currentView === 0)}
                    onClick={() => setCurrentView(0)}
                >
                    Calendar
                </button>
                <button 
                    style={bodyStyles.tab(currentView === 1)}
                    onClick={() => setCurrentView(1)}
                >
                    Bible
                </button>
            </div>

            {/* Add padding to account for fixed bottom tab bar */}
            <div style={{paddingTop: '1rem', paddingBottom: '90px'}}>
                {/* Render only the active view */}
                {currentView === 0 ? <CalendarView /> : <BibleView />}
            </div>
        </div>
    );
}