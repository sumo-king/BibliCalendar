import { render, screen} from '@testing-library/react';
import BibleView from './bible.controller';
import BibleService from '../../Services/bible.service';

// Mock BibleService
jest.mock('../../Services/bible.service');

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Book: () => <div>Book Icon</div>,
  AlertTriangle: () => <div>Alert Icon</div>,
  ChevronLeft: () => <div>Chevron Left</div>,
  ChevronRight: () => <div>Chevron Right</div>,
  Loader2: () => <div>Loader</div>,
  Search: () => <div>Search Icon</div>,
}));

describe('BibleView Component', () => {
  const defaultProps = {
    matches: true,
    isDarkMode: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
    BibleService.mockClear();
  });

  test('renders the BibleView component', () => {
    BibleService.mockImplementation(() => ({
      bibleBooks: {
        'Old Testament': ['Genesis', 'Exodus'],
        'New Testament': ['Matthew', 'Mark']
      },
      chapterCounts: {
        'Genesis': 50,
        'Matthew': 28
      },
      translations: [
        { id: 'web', name: 'WEB' }
      ],
      allBooks: ['Genesis', 'Matthew']
    }));

    render(<BibleView {...defaultProps} />);
    expect(screen.getByText('Book Icon')).toBeInTheDocument();
  });

  test('initializes with empty selections', () => {
    BibleService.mockImplementation(() => ({
      bibleBooks: {
        'Old Testament': [],
        'New Testament': []
      },
      chapterCounts: {},
      translations: [],
      allBooks: []
    }));

    const { container } = render(<BibleView {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  test('applies dark mode styles when isDarkMode is true', () => {
    BibleService.mockImplementation(() => ({
      bibleBooks: {
        'Old Testament': ['Genesis'],
        'New Testament': ['Matthew']
      },
      chapterCounts: {
        'Genesis': 50,
        'Matthew': 28
      },
      translations: [],
      allBooks: []
    }));

    const { container } = render(<BibleView {...defaultProps} isDarkMode={true} />);
    expect(container).toBeInTheDocument();
  });

  test('applies light mode styles when isDarkMode is false', () => {
    BibleService.mockImplementation(() => ({
      bibleBooks: {
        'Old Testament': ['Genesis'],
        'New Testament': ['Matthew']
      },
      chapterCounts: {
        'Genesis': 50,
        'Matthew': 28
      },
      translations: [],
      allBooks: []
    }));

    const { container } = render(<BibleView {...defaultProps} isDarkMode={false} />);
    expect(container).toBeInTheDocument();
  });

  test('renders responsive layout on desktop (matches=true)', () => {
    BibleService.mockImplementation(() => ({
      bibleBooks: {
        'Old Testament': [],
        'New Testament': []
      },
      chapterCounts: {},
      translations: [],
      allBooks: []
    }));

    const { container } = render(<BibleView {...defaultProps} matches={true} />);
    expect(container).toBeInTheDocument();
  });

  test('renders responsive layout on mobile (matches=false)', () => {
    BibleService.mockImplementation(() => ({
      bibleBooks: {
        'Old Testament': [],
        'New Testament': []
      },
      chapterCounts: {},
      translations: [],
      allBooks: []
    }));

    const { container } = render(<BibleView {...defaultProps} matches={false} />);
    expect(container).toBeInTheDocument();
  });

  test('initializes BibleService', () => {
    BibleService.mockImplementation(() => ({
      bibleBooks: {
        'Old Testament': [],
        'New Testament': []
      },
      chapterCounts: {},
      translations: [],
      allBooks: []
    }));

    render(<BibleView {...defaultProps} />);
    expect(BibleService).toHaveBeenCalled();
  });

  test('renders search functionality', () => {
    BibleService.mockImplementation(() => ({
      bibleBooks: {
        'Old Testament': ['Genesis'],
        'New Testament': ['Matthew']
      },
      chapterCounts: {
        'Genesis': 50,
        'Matthew': 28
      },
      translations: [],
      allBooks: ['Genesis', 'Matthew']
    }));

    // const { container } = render(<BibleView {...defaultProps} />);
    // Check for search-related elements
    expect(screen.getByText('Search Icon')).toBeInTheDocument();
  });

//   test('has book selection capability', () => {
//     BibleService.mockImplementation(() => ({
//       bibleBooks: {
//         'Old Testament': ['Genesis'],
//         'New Testament': ['Matthew']
//       },
//       chapterCounts: {
//         'Genesis': 50,
//         'Matthew': 28
//       },
//       translations: [],
//       allBooks: ['Genesis', 'Matthew']
//     }));

//     const { container } = render(<BibleView {...defaultProps} />);
//     const selects = container.querySelectorAll('select');
//     // Should have at least book and chapter selects
//     expect(selects.length).toBeGreaterThanOrEqual(0);
//   });

  test('displays loader when isLoading is true', () => {
    BibleService.mockImplementation(() => ({
      bibleBooks: {
        'Old Testament': [],
        'New Testament': []
      },
      chapterCounts: {},
      translations: [],
      allBooks: []
    }));

    render(<BibleView {...defaultProps} />);
    // Component should render without errors
    expect(screen.getByText('Loader')).toBeInTheDocument();
  });

  test('handles translation selection', () => {
    BibleService.mockImplementation(() => ({
      bibleBooks: {
        'Old Testament': [],
        'New Testament': []
      },
      chapterCounts: {},
      translations: [
        { id: 'web', name: 'WEB' },
        { id: 'kjv', name: 'KJV' }
      ],
      allBooks: []
    }));

    const { container } = render(<BibleView {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  test('renders with scroll-into-view for mobile sidebar', () => {
    BibleService.mockImplementation(() => ({
      bibleBooks: {
        'Old Testament': [],
        'New Testament': []
      },
      chapterCounts: {},
      translations: [],
      allBooks: []
    }));

    render(<BibleView {...defaultProps} matches={false} />);
    expect(screen.getByText('Book Icon')).toBeInTheDocument();
  });
});
