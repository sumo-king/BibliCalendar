import { Card } from "@mui/material"
import { useEffect, useState } from "react"
import { Moon } from "lunarphase-js";

export const LunarCal = ({cardStyles}) =>{

    useEffect(()=>{
        const currentDate = new Date()
  
        const moonPhase = Moon.lunarPhase(currentDate);
        const moonDay = Moon.lunarAge();
        const phaseEmoji = Moon.emojiForLunarPhase();
  
        setLunarDate({phase: moonPhase, day: Math.floor(moonDay), phaseEmoji: phaseEmoji, rawDay: moonDay })
      }, [])


    const [lunarDate, setLunarDate] = useState({
        phase: '', 
        day: null, 
        phaseEmoji: null, 
        rawDay: null})

    return(
        <Card variant="outlined" style={cardStyles}>
            <h1>Lunar Calendar</h1>
            <p>{lunarDate.phaseEmoji}</p>
            <label htmlFor="lunar-month">Month</label>
            <input type="text" id='lunar-month' disabled={true} value='?' />
            <label htmlFor="">Day</label>
            <input type="text" value={lunarDate.day} />
            <label htmlFor="">Raw Day</label>
            <input type="text" value={lunarDate.rawDay} />
    
          </Card>
    )
}