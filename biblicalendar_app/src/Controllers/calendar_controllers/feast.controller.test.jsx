import { render, screen } from '@testing-library/react';
import { HDate, months } from '@hebcal/core';
import { getNextFeast, formatCountdown, FeastCountdownBanner } from './feast.controller';

// Gregorian date (local midnight) for a Hebrew date
const greg = (day, month, year) => new HDate(day, month, year).greg();

describe('getNextFeast', () => {
  test('finds Passover as the next feast after the autumn feasts', () => {
    const next = getNextFeast(greg(3, months.CHESHVAN, 5787));
    expect(next.feast.name).toBe('Passover');
    expect(next.start.getFullYear()).toBe(5787);
    expect(next.start.greg().toDateString()).toBe(new Date(2027, 3, 21).toDateString());
  });

  test('counts exact days to the next feast', () => {
    const next = getNextFeast(greg(11, months.NISAN, 5787));
    expect(next.feast.name).toBe('Passover');
    expect(next.daysUntil).toBe(3);
  });

  test('reports the day of a multi-day feast in progress', () => {
    const next = getNextFeast(greg(17, months.TISHREI, 5787));
    expect(next.feast.name).toBe('Feast of Tabernacles');
    expect(next.daysUntil).toBe(0);
    expect(next.dayOfFeast).toBe(3);
  });

  test('rolls over to the following year after the last feast', () => {
    const next = getNextFeast(greg(23, months.TISHREI, 5787));
    expect(next.feast.name).toBe('Passover');
    expect(next.start.getFullYear()).toBe(5787);
    expect(next.start.getMonth()).toBe(months.NISAN);
  });
});

describe('formatCountdown', () => {
  const passover = { name: 'Passover', days: 1 };
  const tabernacles = { name: 'Feast of Tabernacles', days: 7 };

  test.each([
    [1, '1 day until Passover'],
    [3, '3 days until Passover'],
    [7, '7 days until Passover'],
    [8, '1 week until Passover'],
    [14, '2 weeks until Passover'],
    [17, '2 weeks until Passover'],
    [18, '3 weeks until Passover'],
  ])('%i days away -> "%s"', (daysUntil, expected) => {
    expect(formatCountdown({ feast: passover, daysUntil, dayOfFeast: 0 })).toBe(expected);
  });

  test('feast days themselves', () => {
    expect(formatCountdown({ feast: passover, daysUntil: 0, dayOfFeast: 1 })).toBe('Today is Passover');
    expect(formatCountdown({ feast: tabernacles, daysUntil: 0, dayOfFeast: 3 }))
      .toBe('Feast of Tabernacles: day 3 of 7');
  });
});

describe('FeastCountdownBanner', () => {
  afterEach(() => jest.useRealTimers());

  test('renders the countdown for the current date', () => {
    jest.useFakeTimers().setSystemTime(greg(11, months.NISAN, 5787));
    render(<FeastCountdownBanner isDarkMode={false} />);
    expect(screen.getByLabelText('Next biblical feast')).toBeInTheDocument();
    expect(screen.getByText('3 days until Passover')).toBeInTheDocument();
  });
});
