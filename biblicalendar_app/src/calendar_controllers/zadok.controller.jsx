import { Card } from "@mui/material";
import React, { useState } from 'react';

export const ZadokCalendar = ({ cardStyles }) => {

  return (
    <Card variant='outlined' style={cardStyles}>
            <h1>Zadok Calendar</h1>
            <label htmlFor="zadok-month">Month</label>
            <input type="text" id='zadok-month' disabled={true} />
            <label htmlFor="">Day</label>
            <input type="text" />
    </Card>
  );
};