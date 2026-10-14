import { render, screen, fireEvent } from '@testing-library/react';
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
  Sparkles: () => <div>Sparkles Icon</div>,
  CalendarDays: () => <div>Calendar Days Icon</div>,
  ChevronDown: () => <div>Chevron Down</div>,
  Bookmark: () => <div>Bookmark Icon</div>,
  BookmarkCheck: () => <div>Bookmark Check Icon</div>,
  X: () => <div>X Icon</div>,
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

  // test('renders the BibleView component', () => {
  //   BibleService.mockImplementation(() => ({
  //     bibleBooks: {
  //       'Old Testament': ['Genesis', 'Exodus'],
  //       'New Testament': ['Matthew', 'Mark']
  //     },
  //     chapterCounts: {
  //       'Genesis': 50,
  //       'Matthew': 28
  //     },
  //     translations: [
  //       { id: 'web', name: 'WEB' }
  //     ],
  //     allBooks: ['Genesis', 'Matthew']
  //   }));

  //   render(<BibleView {...defaultProps} />);
  //   expect(screen.getByText('Book Icon')).toBeInTheDocument();
  // });

  // test('initializes with empty selections', () => {
  //   BibleService.mockImplementation(() => ({
  //     bibleBooks: {
  //       'Old Testament': [],
  //       'New Testament': []
  //     },
  //     chapterCounts: {},
  //     translations: [],
  //     allBooks: []
  //   }));

  //   const { container } = render(<BibleView {...defaultProps} />);
  //   expect(container).toBeInTheDocument();
  // });

  test('applies dark mode styles when isDarkMode is true', async () => {
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
      allBooks: [],
      getVerseOfDay: () => ({
        book: 'Genesis', chapter: 1, verse: '1', index: 0, mode: 'daily',
        reference: 'Genesis 1:1'
      }),
      fetchScripture: jest.fn().mockResolvedValue({
        text: 'In the beginning...',
        reference: 'Genesis 1:1',
        translation_name: 'World English Bible'
      })
    }));

    const { container } = render(<BibleView {...defaultProps} isDarkMode={true} />);
    expect(container).toBeInTheDocument();
    // Verse of the Day resolves asynchronously; wait for it to settle
    expect(await screen.findByText(/In the beginning/)).toBeInTheDocument();
  });

  // test('applies light mode styles when isDarkMode is false', () => {
  //   BibleService.mockImplementation(() => ({
  //     bibleBooks: {
  //       'Old Testament': ['Genesis'],
  //       'New Testament': ['Matthew']
  //     },
  //     chapterCounts: {
  //       'Genesis': 50,
  //       'Matthew': 28
  //     },
  //     translations: [],
  //     allBooks: []
  //   }));

  //   const { container } = render(<BibleView {...defaultProps} isDarkMode={false} />);
  //   expect(container).toBeInTheDocument();
  // });

  // test('renders responsive layout on desktop (matches=true)', () => {
  //   BibleService.mockImplementation(() => ({
  //     bibleBooks: {
  //       'Old Testament': [],
  //       'New Testament': []
  //     },
  //     chapterCounts: {},
  //     translations: [],
  //     allBooks: []
  //   }));

  //   const { container } = render(<BibleView {...defaultProps} matches={true} />);
  //   expect(container).toBeInTheDocument();
  // });

  // test('renders responsive layout on mobile (matches=false)', () => {
  //   BibleService.mockImplementation(() => ({
  //     bibleBooks: {
  //       'Old Testament': [],
  //       'New Testament': []
  //     },
  //     chapterCounts: {},
  //     translations: [],
  //     allBooks: []
  //   }));

  //   const { container } = render(<BibleView {...defaultProps} matches={false} />);
  //   expect(container).toBeInTheDocument();
  // });

  // test('initializes BibleService', () => {
  //   BibleService.mockImplementation(() => ({
  //     bibleBooks: {
  //       'Old Testament': [],
  //       'New Testament': []
  //     },
  //     chapterCounts: {},
  //     translations: [],
  //     allBooks: []
  //   }));

  //   render(<BibleView {...defaultProps} />);
  //   expect(BibleService).toHaveBeenCalled();
  // });

  // test('renders search functionality', () => {
  //   BibleService.mockImplementation(() => ({
  //     bibleBooks: {
  //       'Old Testament': ['Genesis'],
  //       'New Testament': ['Matthew']
  //     },
  //     chapterCounts: {
  //       'Genesis': 50,
  //       'Matthew': 28
  //     },
  //     translations: [],
  //     allBooks: ['Genesis', 'Matthew']
  //   }));

  //   // const { container } = render(<BibleView {...defaultProps} />);
  //   // Check for search-related elements
  //   expect(screen.getByText('Search Icon')).toBeInTheDocument();
  // });

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

  // test('displays loader when isLoading is true', () => {
  //   BibleService.mockImplementation(() => ({
  //     bibleBooks: {
  //       'Old Testament': [],
  //       'New Testament': []
  //     },
  //     chapterCounts: {},
  //     translations: [],
  //     allBooks: []
  //   }));

  //   render(<BibleView {...defaultProps} />);
  //   // Component should render without errors
  //   expect(screen.getByText('Loader')).toBeInTheDocument();
  // });

  // test('handles translation selection', () => {
  //   BibleService.mockImplementation(() => ({
  //     bibleBooks: {
  //       'Old Testament': [],
  //       'New Testament': []
  //     },
  //     chapterCounts: {},
  //     translations: [
  //       { id: 'web', name: 'WEB' },
  //       { id: 'kjv', name: 'KJV' }
  //     ],
  //     allBooks: []
  //   }));

  //   const { container } = render(<BibleView {...defaultProps} />);
  //   expect(container).toBeInTheDocument();
  // });

  // test('renders with scroll-into-view for mobile sidebar', () => {
  //   BibleService.mockImplementation(() => ({
  //     bibleBooks: {
  //       'Old Testament': [],
  //       'New Testament': []
  //     },
  //     chapterCounts: {},
  //     translations: [],
  //     allBooks: []
  //   }));

  //   render(<BibleView {...defaultProps} matches={false} />);
  //   expect(screen.getByText('Book Icon')).toBeInTheDocument();
  // });
  test('persists highlighted verses to localStorage and restores them', async () => {
    localStorage.clear();
    const chapter = {
      reference: 'John 3',
      verses: [
        { book_name: 'John', chapter: 3, verse: 16, text: 'For God so loved the world' },
        { book_name: 'John', chapter: 3, verse: 17, text: 'For God sent not his Son' },
      ],
    };
    BibleService.mockImplementation(() => ({
      chapterCounts: { John: 21 },
      translations: [],
      allBooks: ['John'],
      fetchScripture: jest.fn().mockResolvedValue(chapter),
    }));

    const { unmount } = render(<BibleView {...defaultProps} />);
    const input = screen.getByPlaceholderText(/Search/);
    fireEvent.change(input, { target: { value: 'John 3' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    fireEvent.click(await screen.findByText('For God so loved the world'));

    expect(JSON.parse(localStorage.getItem('highlightedVerses'))['John|3'].verses).toEqual([16]);
    // Highlights are listed in the My Verses sidebar
    fireEvent.click(screen.getByLabelText('Open saved verses and highlights'));
    expect(screen.getByLabelText('My verses')).toHaveAttribute('aria-hidden', 'false');
    expect(screen.getByText('John 3:16')).toBeInTheDocument();

    // Highlights survive a remount
    unmount();
    render(<BibleView {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument(); // badge count on the sidebar toggle
    expect(screen.getByText('John 3:16')).toBeInTheDocument();
  });

  test('sidebar opens, shows empty states, and closes with Escape', () => {
    localStorage.clear();
    BibleService.mockImplementation(() => ({
      chapterCounts: {},
      translations: [],
      allBooks: [],
      fetchScripture: jest.fn().mockResolvedValue({ reference: '', verses: [] }),
    }));

    render(<BibleView {...defaultProps} />);
    const sidebar = screen.getByLabelText('My verses');
    expect(sidebar).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(screen.getByLabelText('Open saved verses and highlights'));
    expect(sidebar).toHaveAttribute('aria-hidden', 'false');
    expect(screen.getByText(/bookmark next to a passage title/)).toBeInTheDocument();
    expect(screen.getByText(/Tap any verse while reading/)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(sidebar).toHaveAttribute('aria-hidden', 'true');
  });
  test('daily verse card collapses, remembers it, and shows the reference', async () => {
    localStorage.clear();
    BibleService.mockImplementation(() => ({
      chapterCounts: {},
      translations: [],
      allBooks: [],
      getVerseOfDay: () => ({
        book: 'Genesis', chapter: 1, verse: '1', index: 0, mode: 'daily',
        reference: 'Genesis 1:1'
      }),
      fetchScripture: jest.fn().mockResolvedValue({
        text: 'In the beginning...',
        reference: 'Genesis 1:1',
      }),
    }));

    const { unmount } = render(<BibleView {...defaultProps} />);
    expect(await screen.findByText(/In the beginning/)).toBeInTheDocument();

    const toggle = screen.getByRole('button', { name: /Verse of the Day/ });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(/In the beginning/)).not.toBeInTheDocument();
    expect(screen.queryByText('Week')).not.toBeInTheDocument();
    expect(screen.getByText('Genesis 1:1')).toBeInTheDocument(); // reference stays in the header
    expect(JSON.parse(localStorage.getItem('votdCollapsed'))).toBe(true);

    // Stays collapsed after a remount
    unmount();
    render(<BibleView {...defaultProps} />);
    expect(await screen.findByRole('button', { name: /Verse of the Day/ })).toHaveAttribute('aria-expanded', 'false');
  });
});
