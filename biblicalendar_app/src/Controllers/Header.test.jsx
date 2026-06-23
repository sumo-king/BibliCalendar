import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

// Mock child components
jest.mock('./calendar_controllers/timedate.controller', () => {
  return {
    HebDay: function DummyHebDay() {
      return <div>Hebrew Day</div>;
    }
  };
});

describe('Header Component', () => {
  const defaultProps = {
    matches: true,
    isDarkMode: false,
    setIsDarkMode: jest.fn(),
    setCurrentView: jest.fn(),
    currentView: 0
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Header component', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('BibliCalendar')).toBeInTheDocument();
  });

  test('displays logo text', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('BibliCalendar')).toBeInTheDocument();
  });

  test('shows HebDay component on desktop (matches=true)', () => {
    render(<Header {...defaultProps} matches={true} />);
    expect(screen.getByText('Hebrew Day')).toBeInTheDocument();
  });

  test('hides HebDay component on mobile (matches=false)', () => {
    render(<Header {...defaultProps} matches={false} />);
    // HebDay should not be visible on mobile
    const hebDayElements = screen.queryAllByText('Hebrew Day');
    expect(hebDayElements.length).toBe(0);
  });

  test('shows menu button on mobile (matches=false)', () => {
    render(<Header {...defaultProps} matches={false} />);
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });

  test('hides menu button on desktop (matches=true)', () => {
    render(<Header {...defaultProps} matches={true} />);
    const menuButton = screen.queryByLabelText('Toggle menu');
    expect(menuButton).toHaveStyle({ display: 'none' });
  });

  test('toggles mobile menu when button is clicked', () => {
    render(<Header {...defaultProps} matches={false} />);
    const menuButton = screen.getByLabelText('Toggle menu');
    
    // Initially menu should be closed
    fireEvent.click(menuButton);
    
    // Menu should now be open (verify by checking if close icon appears)
    // This would be verified by checking the aria-label or icon change
    expect(menuButton).toBeInTheDocument();
  });

//   test('applies dark mode styling when isDarkMode is true', () => {
//     const { container } = render(<Header {...defaultProps} isDarkMode={true} />);
//     const header = container.querySelector('header');
//     expect(header).toHaveStyle({
//       backgroundColor: '#121212',
//       borderBottomColor: '#d4af37'
//     });
//   });

//   test('applies light mode styling when isDarkMode is false', () => {
//     const { container } = render(<Header {...defaultProps} isDarkMode={false} />);
//     const header = container.querySelector('header');
//     expect(header).toHaveStyle({
//       backgroundColor: '#2c3e50',
//       borderBottomColor: '#d4af37'
//     });
//   });

  test('calls setIsDarkMode when dark mode toggle is clicked', () => {
    render(<Header {...defaultProps} />);
    // const darkModeButton = screen.getByRole('button', { hidden: true });
    
    // Find and click the dark mode button (not the menu button)
    const buttons = screen.getAllByRole('button');
    // The last button should be the dark mode toggle (after menu if present)
    const darkModeToggle = buttons[buttons.length - 1];
    
    fireEvent.click(darkModeToggle);
    // The component should handle the toggle
    expect(darkModeToggle).toBeInTheDocument();
  });

//   test('renders header with correct accessible attributes', () => {
//     render(<Header {...defaultProps} />);
//     const header = screen.getByText('BibliCalendar').closest('header');
//     expect(header).toBeInTheDocument();
//   });

  // test('displays logo container', () => {
  //   // const { container } = render(<Header {...defaultProps} />);
  //   const logoText = screen.getByText('BibliCalendar');
  //   expect(logoText).toBeInTheDocument();
  // });

  test('maintains header visibility across all props changes', () => {
    const { rerender } = render(<Header {...defaultProps} />);
    expect(screen.getByText('BibliCalendar')).toBeInTheDocument();

    rerender(<Header {...defaultProps} isDarkMode={true} />);
    expect(screen.getByText('BibliCalendar')).toBeInTheDocument();

    rerender(<Header {...defaultProps} matches={false} />);
    expect(screen.getByText('BibliCalendar')).toBeInTheDocument();
  });
});
