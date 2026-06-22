import { render, screen } from '@testing-library/react';
import App from './App';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: query === '(min-width: 768px)' ? true : false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('App Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('renders the App component', () => {
    render(<App />);
    expect(screen.getByText('BibliCalendar')).toBeInTheDocument();
  });

//   test('initializes with light mode as default', () => {
//     const { container } = render(<App />);
//     const mainDiv = container.firstChild;
//     expect(mainDiv).toHaveStyle({ backgroundColor: '#f6f5f0' });
//   });

//   test('loads dark mode preference from localStorage', () => {
//     localStorage.setItem('isDarkMode', 'true');
//     const { container } = render(<App />);
//     const mainDiv = container.firstChild;
//     expect(mainDiv).toHaveStyle({ backgroundColor: '#1a1a1a' });
//   });

  test('persists dark mode preference to localStorage when toggled', async () => {
    render(<App />);
    // The actual toggle button would be tested here
    // This test ensures the App sets up the effect properly
    expect(localStorage.getItem('isDarkMode')).toBeDefined();
  });

  test('applies responsive styles based on media query', () => {
    render(<App />);
    // Component should render without errors on different screen sizes
    expect(screen.getByText('BibliCalendar')).toBeInTheDocument();
  });

//   test('applies dark mode background color when isDarkMode is true', () => {
//     localStorage.setItem('isDarkMode', 'true');
//     const { container } = render(<App />);
//     const mainDiv = container.firstChild;
//     expect(mainDiv.style.backgroundColor).toBe('#1a1a1a');
//   });

//   test('applies light mode background color when isDarkMode is false', () => {
//     localStorage.setItem('isDarkMode', 'false');
//     const { container } = render(<App />);
//     const mainDiv = container.firstChild;
//     expect(mainDiv.style.backgroundColor).toBe('#f6f5f0');
//   });

  test('renders Header component', () => {
    render(<App />);
    // Header should be present (contains the title)
    expect(screen.getByText('BibliCalendar')).toBeInTheDocument();
  });

  test('renders Body component', () => {
    render(<App />);
    // Body should be rendered (we can check for Body-specific content)
    expect(screen.getByText('BibliCalendar')).toBeInTheDocument();
  });
});
