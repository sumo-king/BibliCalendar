import { useEffect, useState } from "react";
import { HDate, months } from '@hebcal/core';

// The appointed times of Leviticus 23, on the traditional Hebrew calendar.
// `days` is how many days the feast lasts (1 for single-day feasts).
export const BIBLICAL_FEASTS = [
  { name: 'Passover', month: months.NISAN, day: 14, days: 1, scripture: 'Leviticus 23:5' },
  { name: 'Feast of Unleavened Bread', month: months.NISAN, day: 15, days: 7, scripture: 'Leviticus 23:6' },
  { name: 'Feast of Weeks (Shavuot)', month: months.SIVAN, day: 6, days: 1, scripture: 'Leviticus 23:16' },
  { name: 'Feast of Trumpets', month: months.TISHREI, day: 1, days: 1, scripture: 'Leviticus 23:24' },
  { name: 'Day of Atonement', month: months.TISHREI, day: 10, days: 1, scripture: 'Leviticus 23:27' },
  { name: 'Feast of Tabernacles', month: months.TISHREI, day: 15, days: 7, scripture: 'Leviticus 23:34' },
  { name: 'Eighth Day Assembly', month: months.TISHREI, day: 22, days: 1, scripture: 'Leviticus 23:36' },
];

/**
 * Returns the feast happening today (with which day of it), or else the next
 * upcoming one: { feast, start: HDate, daysUntil, dayOfFeast }.
 */
export const getNextFeast = (date = new Date()) => {
  const today = new HDate(date);
  const todayAbs = today.abs();
  const year = today.getFullYear();

  // Check this Hebrew year and the next so we always find an upcoming date.
  const occurrences = [year - 1, year, year + 1].flatMap(y =>
    BIBLICAL_FEASTS.map(feast => ({ feast, start: new HDate(feast.day, feast.month, y) }))
  );

  // A feast in progress today takes priority
  const current = occurrences.find(({ feast, start }) =>
    todayAbs >= start.abs() && todayAbs < start.abs() + feast.days
  );
  if (current) {
    return { ...current, daysUntil: 0, dayOfFeast: todayAbs - current.start.abs() + 1 };
  }

  const next = occurrences
    .filter(({ start }) => start.abs() > todayAbs)
    .sort((a, b) => a.start.abs() - b.start.abs())[0];

  return { ...next, daysUntil: next.start.abs() - todayAbs, dayOfFeast: 0 };
};

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** "2 weeks until Passover" (more than 7 days away) or "3 days until Passover". */
export const formatCountdown = ({ feast, daysUntil, dayOfFeast }) => {
  if (daysUntil === 0) {
    return feast.days > 1
      ? `${feast.name}: day ${dayOfFeast} of ${feast.days}`
      : `Today is ${feast.name}`;
  }
  if (daysUntil > 7) {
    return `${plural(Math.round(daysUntil / 7), 'week')} until ${feast.name}`;
  }
  return `${plural(daysUntil, 'day')} until ${feast.name}`;
};

export const FeastCountdownBanner = ({ isDarkMode }) => {
  const [now, setNow] = useState(() => new Date());

  // Keep the countdown correct if the page stays open past midnight
  useEffect(() => {
    const id = setInterval(() => {
      setNow(prev => (new Date().toDateString() !== prev.toDateString() ? new Date() : prev));
    }, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const next = getNextFeast(now);
  const isToday = next.daysUntil === 0;
  const dateLabel = next.start.greg().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const themeStyles = {
    banner: {
      backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
      borderColor: isDarkMode ? '#444' : '#e0e0e0',
      borderLeftColor: '#d4af37',
    },
    title: {
      color: isDarkMode ? '#fff' : '#2c3e50',
    },
    subText: {
      color: isDarkMode ? '#aaa' : '#6c757d',
    },
  };

  return (
    <section
      aria-label="Next biblical feast"
      style={{ ...styles.banner, ...themeStyles.banner }}
    >
      <span style={styles.icon} aria-hidden="true">{isToday ? '🎉' : '🗓️'}</span>
      <div style={styles.text}>
        <div style={{ ...styles.eyebrow, ...themeStyles.subText }}>
          {isToday ? 'Feast day' : 'Next feast'}
        </div>
        <div style={{ ...styles.countdown, ...themeStyles.title }}>{formatCountdown(next)}</div>
        <div style={{ ...styles.details, ...themeStyles.subText }}>
          {isToday ? next.feast.scripture : `${dateLabel} · begins at sundown the evening before · ${next.feast.scripture}`}
        </div>
      </div>
    </section>
  );
};

const styles = {
  banner: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto 1.5rem',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '1px solid',
    borderLeft: '5px solid',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    boxSizing: 'border-box',
  },
  icon: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  text: {
    minWidth: 0,
  },
  eyebrow: {
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  countdown: {
    fontSize: '1.3rem',
    fontWeight: '700',
    margin: '0.15rem 0',
  },
  details: {
    fontSize: '0.85rem',
  },
};
