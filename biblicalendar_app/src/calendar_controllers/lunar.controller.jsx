import { Card } from "@mui/material"
import { useEffect, useState } from "react"
import { Moon } from "lunarphase-js";

export const LunarCal = ({cardStyles}) =>{

    useEffect(()=>{
        const currentDate = new Date();
        const moonPhase = Moon.lunarPhase(currentDate);
        const moonDay = Moon.lunarAge();
        const phaseEmoji = Moon.emojiForLunarPhase();
        
        // Calculate lunar month since spring equinox
        const lunarMonth = calculateLunarMonth(currentDate);
  
        setLunarDate({
            phase: moonPhase, 
            day: Math.floor(moonDay), 
            phaseEmoji: phaseEmoji, 
            rawDay: moonDay,
            month: lunarMonth
        })
    }, [])

    // Calculate which lunar month we're in since spring equinox
    const calculateLunarMonth = (currentDate) => {
        const year = currentDate.getFullYear();
        
        // Spring equinox is typically March 19-21
        // Using March 20 as approximation
        const springEquinox = new Date(year, 2, 20); // Month is 0-indexed
        
        // If we're before this year's equinox, use last year's
        const equinoxDate = currentDate < springEquinox 
            ? new Date(year - 1, 2, 20)
            : springEquinox;
        
        // Average lunar cycle is 29.53 days
        const daysSinceEquinox = (currentDate - equinoxDate) / (1000 * 60 * 60 * 24);
        const lunarCycleLength = 29.53;
        
        // Count how many complete lunar cycles have passed
        const lunarMonth = Math.floor(daysSinceEquinox / lunarCycleLength) + 1;
        
        return lunarMonth;
    }

    const [lunarDate, setLunarDate] = useState({
        phase: '', 
        day: null, 
        phaseEmoji: null, 
        rawDay: null,
        month: null
    });

    const isSabbath = (day) =>{
        if (day === 8 || day === 15 || day === 22 || day === 29){
            return "Sabbath";
        }

        return day
    }

    return(
        <Card variant="outlined" style={cardStyles}>
            <h1>Lunar Calendar</h1>
            <label htmlFor="lunar-phase">Phase</label>
            <p>{lunarDate.phaseEmoji}</p>
            <p>{lunarDate.phase}</p>
            <label htmlFor="lunar-month">Month</label>
            <p >{lunarDate.month || '?'}</p>
            <label htmlFor="day">Day</label>
            <p id="day">{isSabbath(lunarDate.day)}</p>
            <label htmlFor="raw">Raw Day</label>
            <p id="raw">{lunarDate.rawDay?.toFixed(1)}</p>
        </Card>
    )
}