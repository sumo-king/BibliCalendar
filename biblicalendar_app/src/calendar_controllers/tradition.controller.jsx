import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import {/*HebrewCalendar,*/ HDate} from '@hebcal/core';

export const TraditionCal = ({ cardStyles }) =>{

    const [tradDate, setTradDate] = useState({day: '', month: ''});

    useEffect(()=>{
        const hd = new HDate();
        setTradDate({day: hd.getDate(), month: hd.getMonth()});
  
      },[]);

    return(
        <Card variant="outlined" style={cardStyles}>
            <h1>Traditional Calendar</h1>
            <table>
            <thead>
              <tr>
                <th>Month</th>
                <td>{tradDate.month}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
              <th>Day</th>
                <td>{tradDate.day}</td>
              </tr>
            </tbody>
          </table>
            {/* <label htmlFor="trad-month">Month</label>
            <input type="text" id='trad-month' disabled={true} value={tradDate.month} style={{textAlign: 'center'}}/>
            <label htmlFor="trad-day">Day</label>
            <input type="text" id="trad-day" value={tradDate.day} disabled={true} style={{textAlign: 'center'}}/> */}
          </Card>
    )
}