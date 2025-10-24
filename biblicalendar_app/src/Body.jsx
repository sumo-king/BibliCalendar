import React, { useEffect, useState } from "react";
// import Card from '@mui/material/Card';
import { LunarCal } from "./calendar_controllers/lunar.controller";
import { TraditionCal } from "./calendar_controllers/tradition.controller";
import { ZadokCalendar } from "./calendar_controllers/zadok.controller";

export const Body = () => {
    // Checking window size of client device
    const mediaMatch = window.matchMedia('(min-width: 768px)');
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
      }
    );

    const bodyStyles = {
      container: isRowbased => ({
        display: 'flex',
        flexDirection: isRowbased ? 'row' :'column',
        justifyContent: 'center',
        gap: '5px',
        padding: '1rem'
      })
    }
  
    const cardStyles = {
      minWidth: '30vw',
      minHeight: '60vh',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
    }
  
    return(
      <div style={{justifyItems: 'center'}} >
        <h1>Torah Portion this week:</h1>
        <div style={bodyStyles.container(matches)}>
          {/* Lunar calendar */}
          <LunarCal cardStyles={cardStyles}/>
          {/* Traditional Jewish calendar */}
          <TraditionCal cardStyles={cardStyles}/>
          {/* Zadok/Jubilees Calendar */}
          <ZadokCalendar cardStyles={cardStyles}/>
        </div>
      </div>
    )
  }