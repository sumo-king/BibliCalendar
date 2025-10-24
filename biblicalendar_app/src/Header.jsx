export const Header = ()=>{

    const headerStyles = {
      display: 'flex',
      border: 'solid black 1px',
      minHeight: '10vh',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      zIndex: 1000,
    }
  
    // const listStyles = {
    //   listStyle: 'none',
    //   display: 'flex',
    //   flexDirection: 'row',
    //   gap: '5rem',
    //   borderRight: ''
    // }
    
    return(
      <header style={headerStyles}>
          <h1>BibliCalendar</h1>
          {/* <ul style={listStyles}>
            <li style={{padding: '5px', borderRight: 'solid 1px black',borderLeft: '1px solid black'}}>Lunar</li>
            <li style={{padding: '5px', borderRight: 'solid 1px black',borderLeft: '1px solid black'}}>Traditional</li>
            <li style={{padding: '5px', borderRight: 'solid 1px black',borderLeft: '1px solid black'}}>Zadok</li>
          </ul> */}
        </header>
    )
  }