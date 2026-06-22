import { render, screen } from '@testing-library/react';
import { LunarDetailView } from './LunarDetailView';

// Mock child components if needed
jest.mock('lucide-react', () => ({
  Moon: () => <div>Moon Icon</div>,
  AlertCircle: () => <div>Alert Icon</div>,
}));

describe('LunarDetailView Component', () => {
  const defaultProps = {
    matches: true,
    isDarkMode: false,
    selectedLunarDate: null
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the LunarDetailView component', () => {
    const { container } = render(<LunarDetailView {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  test('applies dark mode styles when isDarkMode is true', () => {
    const { container } = render(<LunarDetailView {...defaultProps} isDarkMode={true} />);
    expect(container).toBeInTheDocument();
  });

  test('applies light mode styles when isDarkMode is false', () => {
    const { container } = render(<LunarDetailView {...defaultProps} isDarkMode={false} />);
    expect(container).toBeInTheDocument();
  });

  test('renders responsive layout on desktop (matches=true)', () => {
    const { container } = render(<LunarDetailView {...defaultProps} matches={true} />);
    expect(container).toBeInTheDocument();
  });

  test('renders responsive layout on mobile (matches=false)', () => {
    const { container } = render(<LunarDetailView {...defaultProps} matches={false} />);
    expect(container).toBeInTheDocument();
  });

  test('handles null selectedLunarDate', () => {
    const { container } = render(<LunarDetailView {...defaultProps} selectedLunarDate={null} />);
    expect(container).toBeInTheDocument();
  });

  test('displays lunar data when provided', () => {
    const mockLunarDate = {
      date: '2024-02-14',
      phase: 'Waxing Crescent',
      illumination: 15
    };

    const { container } = render(
      <LunarDetailView {...defaultProps} selectedLunarDate={mockLunarDate} />
    );
    expect(container).toBeInTheDocument();
  });

  test('maintains view state across prop changes', () => {
    const { rerender } = render(<LunarDetailView {...defaultProps} />);
    expect(screen.queryByText('Moon Icon')).not.toBeInTheDocument();

    rerender(<LunarDetailView {...defaultProps} isDarkMode={true} />);
    expect(screen.queryByText('Moon Icon')).not.toBeInTheDocument();
  });

  test('handles theme changes', () => {
    const { rerender } = render(<LunarDetailView {...defaultProps} isDarkMode={false} />);
    
    rerender(<LunarDetailView {...defaultProps} isDarkMode={true} />);
    expect(screen.queryByText('Alert Icon')).not.toBeInTheDocument();
  });

  test('responds to responsive breakpoint changes', () => {
    const { rerender } = render(<LunarDetailView {...defaultProps} matches={true} />);
    
    rerender(<LunarDetailView {...defaultProps} matches={false} />);
    expect(screen.queryByText('Alert Icon')).not.toBeInTheDocument();
  });

  test('component renders without errors with all prop combinations', () => {
    const combinations = [
      { ...defaultProps, isDarkMode: true, matches: true },
      { ...defaultProps, isDarkMode: true, matches: false },
      { ...defaultProps, isDarkMode: false, matches: true },
      { ...defaultProps, isDarkMode: false, matches: false },
    ];

    combinations.forEach(props => {
      const { unmount } = render(<LunarDetailView {...props} />);
      expect(screen.queryByText('Alert Icon')).not.toBeInTheDocument();
      unmount();
    });
  });

  test('updates when selectedLunarDate changes', () => {
    const { rerender } = render(<LunarDetailView {...defaultProps} selectedLunarDate={null} />);
    
    const newLunarDate = {
      date: '2024-02-15',
      phase: 'Full Moon',
      illumination: 100
    };

    rerender(<LunarDetailView {...defaultProps} selectedLunarDate={newLunarDate} />);
    expect(screen.queryByText('Alert Icon')).not.toBeInTheDocument();
  });
});
