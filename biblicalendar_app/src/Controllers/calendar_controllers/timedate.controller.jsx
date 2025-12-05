import { HDate } from '@hebcal/core';
import { useEffect, useState } from 'react';

export const HebDay = () => {
    const [tradDate, setTradDate] = useState({
        day: '',
        month: '',
        dayOfWeek: '',
        monthName: '',
        isShabbat: false,
        parsha: ''
    });

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const hd = new HDate();

        console.log("Error CHECKING", hd.getMonthName());
        
        setTradDate({
            day: hd.getDate(),
            month: hd.getMonth(),
            monthName: hd.getMonthName(), // Hebrew month name
            dayOfWeek: hd.greg().toLocaleDateString('en-US', { weekday: 'long' }),
            isShabbat: hd.getDay() === 6, // Saturday is day 6
            parsha: '' // Could be enhanced with Sedra class for Torah portion
        });
    }, []);

    // Function to get ordinal suffix (1st, 2nd, 3rd, etc.)
    const getOrdinalSuffix = (num) => {
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11) return "st";
        if (j === 2 && k !== 12) return "nd";
        if (j === 3 && k !== 13) return "rd";
        return "th";
    };

    // Adaptive time function that returns dynamic date string
    const adaptiveTime = () => {
        if (!tradDate.day || !tradDate.month || !tradDate.dayOfWeek) {
            return 'Loading...';
        }

        const dayWithSuffix = `${tradDate.day}${getOrdinalSuffix(tradDate.day)}`;
        const monthWithSuffix = `${tradDate.month}${getOrdinalSuffix(tradDate.month)}`;
        
        return `${tradDate.dayOfWeek}, ${dayWithSuffix} day of the ${monthWithSuffix} month`;
    };

    // Truncated version for initial view
    const getTruncatedDate = () => {
        if (!tradDate.day || !tradDate.dayOfWeek) {
            return 'Loading...';
        }
        const dayWithSuffix = `${tradDate.day}${getOrdinalSuffix(tradDate.day)}`;
        return `${tradDate.dayOfWeek}/${dayWithSuffix} day`;
    };

    const dateString = isHovered ? adaptiveTime() : getTruncatedDate();

    return (
        <div 
            style={styles.container}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={styles.day}>
                {dateString}
            </div>
        </div>
    );
}

export default HebDay;

// export const HebDay = ()=>{

//     const [tradDate, setTradDate] = useState({
//         day: '',
//         month: '',
//         dayOfWeek: '',
//         monthName: '',
//         isShabbat: false,
//         parsha: ''
//     });

//     useEffect(() => {
//     const hd = new HDate();

//     console.log("Error CHECKING",hd.getMonthName() )
    
//     setTradDate({
//         day: hd.getDate(),
//         month: hd.getMonth(),
//         monthName: hd.getMonthName(), // Hebrew month name
//         dayOfWeek: hd.greg().toLocaleDateString('en-US', { weekday: 'long' }),
//         isShabbat: hd.getDay() === 6, // Saturday is day 6
//         parsha: '' // Could be enhanced with Sedra class for Torah portion
//     });
//     }, []);
//     // Note: Make a function called adaptiveTime() that returns dynamic date string (eg. "Monday, 5th day of the 3rd month")
//     const dateString = `${tradDate.dayOfWeek}, ${tradDate.day}th day of the ${tradDate.month}th month`;

//     return(
//         <div style={styles.container}>
//             <div style={styles.day}>
//                 {dateString}
//             </div>
//         </div>
//     );
// }

export const HebTime = ()=>{

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    return(
            <div style={styles.time}>
                {timeString}
            </div>
    );
}


const styles = {
    
    day: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    time: {
        position: 'fixed',
        right: '1rem',
        top: '4rem',
        backgroundColor: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontSize: '1rem',
        fontWeight: '500',
        color: '#2c3e50',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    }
};