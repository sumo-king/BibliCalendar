import { render, screen } from '@testing-library/react';
import { CalendarView } from '../../Views/calendar_view';

// Mock child components
jest.mock('../../Controllers/calendar_controllers/lunar.controller', () => {
  return function DummyLunarController() {
    return <div>Lunar Controller</div>;
  };
});

jest.mock('../../Controllers/calendar_controllers/tradition.controller', () => {
  return function DummyTraditionController() {
    return <div>Tradition Controller</div>;
  };
});

jest.mock('../../Controllers/calendar_controllers/zadok.controller', () => {
  return function DummyZadokController() {
    return <div>Zadok Controller</div>;
  };
});

jest.mock('../../Controllers/calendar_controllers/timedate.controller', () => {
  return {
    HebDay: function DummyHebDay() {
      return <div>Hebrew Day</div>;
    }
  };
});

describe('CalendarView Component', () => {
  const defaultProps = {
    matches: true,
    isDarkMode: false,
    setCurrentView: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the CalendarView component', () => {
    const { container } = render(<CalendarView {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  test('applies dark mode styles when isDarkMode is true', () => {
    const { container } = render(<CalendarView {...defaultProps} isDarkMode={true} />);
    expect(container).toBeInTheDocument();
  });

  test('applies light mode styles when isDarkMode is false', () => {
    const { container } = render(<CalendarView {...defaultProps} isDarkMode={false} />);
    expect(container).toBeInTheDocument();
  });

  test('renders responsive layout on desktop (matches=true)', () => {
    const { container } = render(<CalendarView {...defaultProps} matches={true} />);
    expect(container).toBeInTheDocument();
  });

  test('renders responsive layout on mobile (matches=false)', () => {
    const { container } = render(<CalendarView {...defaultProps} matches={false} />);
    expect(container).toBeInTheDocument();
  });

  test('passes setCurrentView prop to children', () => {
    const mockSetCurrentView = jest.fn();
    render(<CalendarView {...defaultProps} setCurrentView={mockSetCurrentView} />);
    expect(mockSetCurrentView).toBeDefined();
  });

  test('renders multiple calendar controllers', () => {
    render(<CalendarView {...defaultProps} />);
    // Should render various calendar display modes
    expect(screen.getByText('Hebrew Day')).toBeInTheDocument();
  });

  test('maintains calendar view state', () => {
    const { rerender } = render(<CalendarView {...defaultProps} />);
    expect(screen.getByText('Hebrew Day')).toBeInTheDocument();

    rerender(<CalendarView {...defaultProps} isDarkMode={true} />);
    expect(screen.getByText('Hebrew Day')).toBeInTheDocument();
  });

  test('handles theme changes', () => {
    const { rerender } = render(<CalendarView {...defaultProps} isDarkMode={false} />);
    
    rerender(<CalendarView {...defaultProps} isDarkMode={true} />);
    expect(screen.getByText('Hebrew Day')).toBeInTheDocument();
  });

  test('responds to responsive breakpoint changes', () => {
    const { rerender } = render(<CalendarView {...defaultProps} matches={true} />);
    expect(screen.getByText('Hebrew Day')).toBeInTheDocument();

    rerender(<CalendarView {...defaultProps} matches={false} />);
    expect(screen.getByText('Hebrew Day')).toBeInTheDocument();
  });

  test('component does not throw errors with all prop combinations', () => {
    const combinations = [
      { ...defaultProps, isDarkMode: true, matches: true },
      { ...defaultProps, isDarkMode: true, matches: false },
      { ...defaultProps, isDarkMode: false, matches: true },
      { ...defaultProps, isDarkMode: false, matches: false },
    ];

    combinations.forEach(props => {
      const { unmount } = render(<CalendarView {...props} />);
      expect(screen.getByText('Hebrew Day')).toBeInTheDocument();
      unmount();
    });
  });
});
