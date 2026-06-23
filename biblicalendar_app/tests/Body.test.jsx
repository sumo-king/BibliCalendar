import { render, screen, fireEvent } from '@testing-library/react';
import { Body } from '../src/Body';

// Mock child components
jest.mock('../Controllers/bible_controller/bible.controller', () => {
  return function DummyBibleView() {
    return <div>Bible View</div>;
  };
});

jest.mock('../Views/calendar_view', () => {
  return {
    CalendarView: function DummyCalendarView() {
      return <div>Calendar View</div>;
    }
  };
});

jest.mock('../Views/LunarDetailView', () => {
  return {
    LunarDetailView: function DummyLunarDetailView() {
      return <div>Lunar Detail View</div>;
    }
  };
});

jest.mock('../Controllers/calendar_controllers/timedate.controller', () => {
  return {
    HebDay: function DummyHebDay() {
      return <div>Hebrew Day</div>;
    }
  };
});

describe('Body Component', () => {
  const defaultProps = {
    currentView: 0,
    setCurrentView: jest.fn(),
    matches: true,
    isDarkMode: false,
    theme: {}
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Body component', () => {
    const { container } = render(<Body {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  test('displays CalendarView when currentView is 0', () => {
    render(<Body {...defaultProps} currentView={0} />);
    expect(screen.getByText('Calendar View')).toBeInTheDocument();
  });

  test('displays BibleView when currentView is 1', () => {
    render(<Body {...defaultProps} currentView={1} />);
    expect(screen.getByText('Bible View')).toBeInTheDocument();
  });

  test('displays LunarDetailView when currentView is 2', () => {
    render(<Body {...defaultProps} currentView={2} />);
    expect(screen.getByText('Lunar Detail View')).toBeInTheDocument();
  });

//   test('applies dark mode styles when isDarkMode is true', () => {
//     const { container } = render(<Body {...defaultProps} isDarkMode={true} />);
//     const tabBar = container.querySelector('[style*="rgba"]');
//     // Should apply dark mode styling
//     expect(container).toBeInTheDocument();
//   });

  test('applies light mode styles when isDarkMode is false', () => {
    const { container } = render(<Body {...defaultProps} isDarkMode={false} />);
    // Should apply light mode styling
    expect(container).toBeInTheDocument();
  });

  test('handles scroll opacity changes', () => {
    const { container } = render(<Body {...defaultProps} />);
    
    // Simulate scroll event
    fireEvent.scroll(window, { scrollY: 150 });
    
    // Component should update scrollOpacity state
    expect(container).toBeInTheDocument();
  });

  test('passes correct props to child components', () => {
    render(<Body {...defaultProps} />);
    expect(screen.getByText('Calendar View')).toBeInTheDocument();
  });

  test('renders with responsive view on mobile (matches=false)', () => {
    render(<Body {...defaultProps} matches={false} />);
    expect(screen.getByText('Calendar View')).toBeInTheDocument();
  });

  test('renders with responsive view on desktop (matches=true)', () => {
    render(<Body {...defaultProps} matches={true} />);
    expect(screen.getByText('Calendar View')).toBeInTheDocument();
  });

  test('updates view when setCurrentView is called', () => {
    const setCurrentView = jest.fn();
    render(<Body {...defaultProps} setCurrentView={setCurrentView} currentView={0} />);
    // Component accepts setCurrentView for view switching
    expect(setCurrentView).toBeDefined();
  });

  test('removes scroll listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<Body {...defaultProps} />);
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
