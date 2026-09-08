import { useState, useEffect, useMemo } from "react";
import {
  Book,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  Sparkles,
  CalendarDays,
} from 'lucide-react';
import BibleService from "../../Services/bible.service";

export default function BibleView({ matches, isDarkMode }) {

  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [bibleData, setBibleData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [translation, setTranslation] = useState('web');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [highlightedVerses, setHighlightedVerses] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [bookChapters, setBookChapters] = useState([]);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const themeStyles = {
    container: {
      color: isDarkMode ? '#e0e0e0' : 'inherit',
    },
    card: {
      backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
      borderColor: isDarkMode ? '#444' : '#f0f0f0',
      color: isDarkMode ? '#e0e0e0' : 'inherit',
    },
    text: {
      color: isDarkMode ? '#e0e0e0' : '#2c3e50',
    },
    subText: {
      color: isDarkMode ? '#aaa' : '#6c757d',
    },
    input: {
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderColor: isDarkMode ? '#444' : '#e0e0e0',
      color: isDarkMode ? '#fff' : '#495057',
    },
    button: {
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderColor: isDarkMode ? '#444' : '#e0e0e0',
      color: isDarkMode ? '#e0e0e0' : '#495057',
    },
    buttonActive: {
      backgroundColor: isDarkMode ? '#d4af37' : '#2c3e50',
      color: isDarkMode ? '#1a1a1a' : '#fff',
      borderColor: isDarkMode ? '#d4af37' : '#2c3e50',
    },
    verseText: {
      color: isDarkMode ? '#e0e0e0' : '#2c3e50',
    },
    verseNumber: {
      color: isDarkMode ? '#888' : '#95a5a6',
    },
    highlight: {
      backgroundColor: isDarkMode ? 'rgba(212, 175, 55, 0.2)' : '#fff9c4',
    },
    icon: {
      color: isDarkMode ? '#d4af37' : '#2c3e50',
    },
    menuToggle: {
      backgroundColor: isDarkMode ? '#d4af37' : '#2c3e50',
      color: isDarkMode ? '#1a1a1a' : '#fff',
    }
  };

  const bibleService = useMemo(() => new BibleService(), []);

  const fetchScripture = async (book, chapter, verse = '') => {
    setLoading(true);
    setError(null);
    setHighlightedVerses(new Set());

    try {
      const response = await bibleService.fetchScripture(book, chapter, verse, translation);

      const data = await response;
      setBibleData(data);
      if (!matches) setIsSidebarOpen(false);
    } catch (err) {
      setError(err.message);
      setBibleData(null);
    } finally {
      setLoading(false);
    }
  };

  // Search Handler
  const handleSearch = async (e, overrideQuery) => {
    if (e.key === 'Enter' || e.type === 'click') {
      // Trim and validate input
      setBookChapters([]); // Reset chapter list on new search
      setBibleData(null) // Clear previous scripture on new search
      const query = (overrideQuery ?? searchQuery).trim()
      if (!query) return;

      // Clean up query
      const cleanQuery = query.replace(/\s+/g, ' ');

      // Find matching book
      // We sort books by length descending to match "1 John" before "John"
      const sortedBooks = bibleService.allBooks.sort((a, b) => b.length - a.length);
      const matchedBook = sortedBooks.find(book =>
        cleanQuery.toLowerCase().startsWith(book.toLowerCase())
      );

      if (!matchedBook) {
        setError('Book not found. Please check spelling.');
        return;
      }

      // Extract remainder
      const remainder = cleanQuery.slice(matchedBook.length).trim();

      if (!remainder) {
        setSelectedBook(matchedBook);
        setBookChapters(
          Array.from({ length: bibleService.chapterCounts[matchedBook] }, (_, i) => i + 1)
        );
        return;
      }
      
      // Try to parse Chapter:Verse or Chapter
      // Formats: "1", "1:1", "1 1"
      const parts = remainder.split(/[:\s]/);
      const chapter = parts[0];
      const verse = parts.length > 1 ? parts[1] : '';

      if (!chapter || isNaN(chapter)) {
        // Maybe they typed "Genesis Chapter 1" - advanced parsing not requested but good to be safe
        // For now assume "Book Chapter..."
        setSelectedBook(matchedBook);
        setError(`Invalid chapter: ${chapter}`);
        return;
      }

      // Update state
      setSelectedBook(matchedBook);
      setSelectedChapter(chapter);

      // Fetch immediately
      await fetchScripture(matchedBook, chapter, verse);
    }
  };

  const handleInputChange = (e) => {
  const value = e.target.value;
  setSearchQuery(value);

  if (value.trim() === '') {
    setSuggestions([]);
    setShowSuggestions(false);
    return;
  }

  // Match against book names (full + abbreviated)
  const lower = value.toLowerCase();
  const matched = bibleService.allBooks
    .filter(book => book.toLowerCase().startsWith(lower))
    .slice(0, 5); // limit to 5 suggestions

  setSuggestions(matched);
  setShowSuggestions(matched.length > 0);
  };

  const navigateChapter = async (direction) => {
    if (!selectedBook || !selectedChapter) return;

    const currentChapter = Number(selectedChapter);
    const maxChapter = bibleService.chapterCounts[selectedBook];
    let newChapter;

    if (direction === 'prev') {
      newChapter = currentChapter <= 1 ? 1 : currentChapter - 1;
    } else {
      newChapter = currentChapter >= maxChapter ? maxChapter : currentChapter + 1;
    }

    if (newChapter === currentChapter) return;

    setSelectedChapter(String(newChapter));
    // setSelectedVerse('');
    setHighlightedVerses(new Set()); // Reset highlights

    await fetchScripture(selectedBook, String(newChapter), '');
  };

  const toggleHighlight = (index) => {
    const newHighlights = new Set(highlightedVerses);
    if (newHighlights.has(index)) {
      newHighlights.delete(index);
    } else {
      newHighlights.add(index);
    }
    setHighlightedVerses(newHighlights);
  };

  return (
    <div style={styles.bibleContainer}>

      {/* Verse of the Day / Week */}
      <DailyVerseCard
        bibleService={bibleService}
        translation={translation}
        isDarkMode={isDarkMode}
      />

      {/* Navigation Arrows */}
      {selectedBook && selectedChapter && !isSidebarOpen && (
        <>
          {/* -- Left Arrow -- */}
          <button
            style={{
              ...styles.navigationArrow,
              ...styles.arrowLeft,
              ...themeStyles.button,
              ...(Number(selectedChapter) <= 1 ? styles.arrowDisabled : {})
            }}
            onClick={() => navigateChapter('prev')}
            disabled={Number(selectedChapter) <= 1}
            aria-label="Previous chapter"
          >
            <ChevronLeft size={24} />
          </button>
          {/* -- Right Arrow -- */}
          <button
            style={{
              ...styles.navigationArrow,
              ...styles.arrowRight,
              ...themeStyles.button,
              ...(Number(selectedChapter) >= bibleService.chapterCounts[selectedBook] ? styles.arrowDisabled : {})
            }}
            onClick={() => navigateChapter('next')}
            disabled={Number(selectedChapter) >= bibleService.chapterCounts[selectedBook]}
            aria-label="Next chapter"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Scripture Selection Card / Sidebar */}
      <div style={{
        ...styles.selectionCard,
        ...themeStyles.card
        }}>

        <div style={{ ...styles.cardHeader, borderBottomColor: isDarkMode ? '#444' : '#f0f0f0'  }}>
          <Book size={28} style={{ ...styles.headerIcon, ...themeStyles.icon }} />
          <div>
            <h2 style={{ ...styles.cardHeading, ...themeStyles.text }}>Scripture</h2>
            <p style={{ ...styles.cardSubheading, ...themeStyles.subText }}>Select passage</p>
          </div>
        </div>
        
        {/* Scripture Selection Section */}
        <div style={matches?styles.selectionBody: {display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", padding: "2rem 2rem"}}>
          {/* Search bar */}
          <div style={matches ? styles.searchSection: {display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center"}}>
            {/* Search Input */}
            <div style={{...themeStyles.input, display: 'flex', alignItems: 'center', borderRadius: '4px', padding: '0.5rem'}}> 
              <input
                type="text"
                placeholder="Search (e.g. John 3:16)"
                value={searchQuery}
                onChange={handleInputChange}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onKeyDown={handleSearch}
                style={{ ...styles.searchInput, ...themeStyles.input, maxWidth: matches ? "100%" : "80%", border: 'none' }}
              />
              <button
              type="button"
              onClick={handleSearch}
              style={{
                ...styles.searchButton,
                backgroundColor: isDarkMode ? '#d4af37' : '#2c3e50',
                color: isDarkMode ? '#1a1a1a' : '#fff'
              }}
            >
              {isLoading ? <Loader2 size={20} /> : <Search size={20} />}
          </button>
            </div>
            <div style={{ position: 'relative', width: '100%', marginTop: '0.5rem' }}>
              {showSuggestions && (
                <ul style={{...styles.suggestionList, backgroundColor: themeStyles.input.backgroundColor, borderColor: themeStyles.input.borderColor, color: themeStyles.input.color}}>
                  {suggestions.map((suggestion, index) => (
                    <li key={index} style={{listStyle: 'none'}} >
                      <button
                        // key={index}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                        }}
                        onClick={()=>{
                          setSearchQuery(suggestion); 
                          handleSearch({ type: 'click' }, suggestion); 
                          setShowSuggestions(false);}}>
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* Translation Selector */}
          <div style={styles.translationSection }>
            <label style={styles.sectionLabel}>Translation</label>
            <div style={styles.translationButtons}>
              {bibleService.translations.map(trans => (
                <button
                  key={trans.id}
                  style={{
                    ...styles.translationButton,
                    ...themeStyles.button,
                    ...(translation === trans.id ? { ...styles.translationButtonActive, ...themeStyles.buttonActive } : {})
                  }}
                  onClick={() => setTranslation(trans.id)}
                >
                  {trans.name}
                </button>
              ))}
            </div>
          </div>
          {/* <button
              type="button"
              onClick={handleSearch}
              style={{
                ...styles.searchButton,
                backgroundColor: isDarkMode ? '#d4af37' : '#2c3e50',
                color: isDarkMode ? '#1a1a1a' : '#fff'
              }}
            >
              Search
          </button> */}
        </div>
      </div>

      {/* -- Scripture Display Card -- */}
      <div style={{ ...styles.scriptureCard, ...themeStyles.card }}>

        {/* Chapter suggestions */}
        {
          bookChapters?.length > 0 && 
            <ul>
              {bookChapters.map((value, index)=>(
                <li key={index} style={{listStyle: 'none'}}>
                  <button type="button" onClick={async ()=>{
                    await fetchScripture(selectedBook, value); 
                    setBookChapters([])
                    setSelectedBook(selectedBook);
                    setSelectedChapter(value);
                  }} 
                    style={styles.tab}
                  >
                    {selectedBook} {value}
                  </button>
                </li>
              ))}
            </ul>
        }

        {/* Error Message */}
        {error && (
          <div style={styles.errorBox}>
            <AlertTriangle size={24} />
            <span>{error}</span>
          </div>
        )}
        {/* Loading Message */}
        {isLoading && (
          <div style={styles.loadingBox}>
            <Loader2 size={40} style={styles.spin} />
            <p style={styles.loadingText}>Loading scripture...</p>
          </div>
        )}
        {/* Scripture Content */}
        {bibleData && !isLoading && (
          <div style={styles.scriptureContent}>
            <h3 style={{ ...styles.reference, ...themeStyles.text }}>{bibleData.reference}</h3>

            <div style={styles.versesContainer}>
              {bibleData.verses.map((verse, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.verseBlock,
                    ...(highlightedVerses.has(index) ? themeStyles.highlight : {})
                  }}
                  onClick={() => toggleHighlight(index)}
                >
                  <span style={{ ...styles.verseNumber, ...themeStyles.verseNumber }}>{verse.verse}</span>
                  <span style={{ ...styles.verseText, ...themeStyles.verseText }}>{verse.text}</span>
                </div>
              ))}
            </div>

            {bibleData.translation_name && (
              <div style={{ ...styles.translationInfo, borderTopColor: isDarkMode ? '#444' : '#f0f0f0' }}>
                <span style={styles.translationLabel}>Translation:</span> {bibleData.translation_name}
                {bibleData.translation_note && ` — ${bibleData.translation_note}`}
              </div>
            )}
          </div>
        )}

        {!bibleData && !isLoading && !error && (
          <div style={styles.emptyState}>
            <Book size={64} style={{ ...styles.emptyStateIcon, color: isDarkMode ? '#444' : 'inherit' }} />
            <p style={{ ...styles.emptyStateText, ...themeStyles.text }}>Select a passage</p>
            <p style={{ ...styles.emptyStateSubtext, ...themeStyles.subText }}>Choose a book and chapter to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}


function DailyVerseCard({ bibleService, translation, isDarkMode }) {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('votdMode') === 'weekly' ? 'weekly' : 'daily';
    } catch {
      return 'daily';
    }
  });
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const entry = useMemo(
    () => (typeof bibleService.getVerseOfDay === 'function'
      ? bibleService.getVerseOfDay(new Date(), mode)
      : null),
    [bibleService, mode]
  );

  useEffect(() => {
    try {
      localStorage.setItem('votdMode', mode);
    } catch {
      /* ignore storage errors */
    }
  }, [mode]);

  useEffect(() => {
    if (!entry) return;

    let active = true;
    setLoading(true);
    setError(false);

    bibleService
      .fetchScripture(entry.book, entry.chapter, entry.verse, translation)
      .then((data) => {
        if (!active) return;
        setVerse({
          text: (data.text || '').replace(/\s+/g, ' ').trim(),
          reference: data.reference || entry.reference,
          translationName: data.translation_name || '',
        });
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [bibleService, entry, translation]);

  if (!entry) return null;

  const accent = isDarkMode ? '#d4af37' : '#2c3e50';
  const onAccent = isDarkMode ? '#1a1a1a' : '#fff';
  const cardStyle = {
    ...styles.dvCard,
    backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
    borderColor: isDarkMode ? '#444' : '#f0f0f0',
    color: isDarkMode ? '#e0e0e0' : '#2c3e50',
  };
  const subText = { color: isDarkMode ? '#aaa' : '#6c757d' };

  const isWeekly = mode === 'weekly';
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const modeButton = (value, label, Icon) => {
    const active = mode === value;
    return (
      <button
        type="button"
        onClick={() => setMode(value)}
        aria-pressed={active}
        style={{
          ...styles.dvToggleButton,
          color: active ? onAccent : (isDarkMode ? '#aaa' : '#6c757d'),
          backgroundColor: active ? accent : 'transparent',
        }}
      >
        <Icon size={14} strokeWidth={2.5} />
        {label}
      </button>
    );
  };

  return (
    <div style={cardStyle}>
      <div style={styles.dvHeader}>
        <div style={styles.dvHeaderLeft}>
          <Sparkles size={22} style={{ color: accent, flexShrink: 0 }} />
          <div>
            <h2 style={styles.dvTitle}>
              {isWeekly ? 'Verse of the Week' : 'Verse of the Day'}
            </h2>
            <p style={{ ...styles.dvSubtitle, ...subText }}>{today}</p>
          </div>
        </div>
        <div
          style={{
            ...styles.dvToggle,
            borderColor: isDarkMode ? '#444' : '#e0e0e0',
          }}
        >
          {modeButton('daily', 'Day', Sparkles)}
          {modeButton('weekly', 'Week', CalendarDays)}
        </div>
      </div>

      {loading && (
        <div style={{ ...styles.dvStatus, ...subText }}>
          <Loader2 size={18} style={styles.spin} />
          <span>Loading verse…</span>
        </div>
      )}

      {error && !loading && (
        <div style={{ ...styles.dvStatus, color: '#c0392b' }}>
          <AlertTriangle size={18} />
          <span>Couldn&apos;t load {entry.reference}. Check your connection.</span>
        </div>
      )}

      {verse && !loading && !error && (
        <>
          <blockquote style={styles.dvVerseText}>“{verse.text}”</blockquote>
          <div>
            <span style={{ ...styles.dvReference, color: accent }}>
              {verse.reference}
            </span>
            {verse.translationName && (
              <span style={{ ...styles.dvTranslation, ...subText }}>
                {verse.translationName}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  dvCard: {
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    border: '1px solid',
    padding: '1.5rem',
    marginBottom: '2rem',
  },
  dvHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1.25rem',
  },
  dvHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  dvTitle: {
    margin: 0,
    fontSize: '1.15rem',
    fontWeight: 700,
    letterSpacing: '-0.3px',
  },
  dvSubtitle: {
    margin: 0,
    fontSize: '0.8rem',
  },
  dvToggle: {
    display: 'flex',
    borderRadius: '50px',
    overflow: 'hidden',
    border: '1px solid',
    flexShrink: 0,
  },
  dvToggleButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.35rem 0.85rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  dvVerseText: {
    fontFamily: 'Georgia, serif',
    fontSize: '1.2rem',
    lineHeight: 1.8,
    fontStyle: 'italic',
    margin: '0 0 1rem 0',
  },
  dvReference: {
    fontWeight: 700,
    fontSize: '0.95rem',
  },
  dvTranslation: {
    fontSize: '0.8rem',
    marginLeft: '0.5rem',
  },
  dvStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    padding: '0.5rem 0',
  },
  suggestionList: {
    position: 'relative',
    top: '100%',
    left: 0,
    right: 0,
    border: '1px solid #ccc',
    borderRadius: '4px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    zIndex: 1000,
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 2rem',
    border: '2px solid #e0e0e0',
    backgroundColor: '#f8f9fa',
    color: '#495057',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s',
    outline: 'none',
  },
  tabActive: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    borderColor: '#2c3e50',
    transform: 'scale(1.05)',
  },
  hebtime: {
    position: 'fixed',
  },
  bibleContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 1rem',
    position: 'relative',
    // Removed display: flex to restore stacked layout on desktop
  },
  menuToggle: {
    position: 'fixed',
    top: '1rem', // Moved to top
    left: '1rem', // Moved to left
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#2c3e50',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    cursor: 'pointer',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 998,
    backdropFilter: 'blur(2px)',
  },
  searchButton: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  mobileSidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '85%',
    maxWidth: '320px',
    margin: 0,
    borderRadius: '0 16px 16px 0',
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease',
    zIndex: 999,
    height: '100vh',
    overflowY: 'auto',
    boxShadow: '4px 0 16px rgba(0,0,0,0.1)',
  },
  mobileSidebarOpen: {
    transform: 'translateX(0)',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    color: '#6c757d',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  navigationArrow: {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    backgroundColor: '#fff',
    color: '#2c3e50',
    border: '1px solid #e0e0e0',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    zIndex: 100,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  arrowLeft: {
    left: '2rem',
  },
  arrowRight: {
    right: '2rem',
  },
  arrowDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    backgroundColor: '#f8f9fa',
  },
  selectionCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    border: '1px solid #f0f0f0',
    // Removed width: 300px, flexShrink, sticky, top to restore stacked layout
    marginBottom: '2rem', // Add margin bottom for stacked layout
  },
  cardHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  headerIcon: {
    color: '#2c3e50',
  },
  cardHeading: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  cardSubheading: {
    margin: 0,
    color: '#6c757d',
    fontSize: '0.875rem',
  },
  selectionBody: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // border: 'red solid 1px'
  },
  translationSection: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column-reverse',
    marginBottom: '1.5rem',
    alignItems: 'center',
    gap: '0.5rem',
  },
  searchSection: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    width: '97%',
  },
  searchInput: {
    width: '50vw',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid ',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#495057',
    outline: 'none',
  },
  sectionLabel: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  translationButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  translationButton: {
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    color: '#495057',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  translationButtonActive: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    borderColor: '#2c3e50',
  },
  selectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 0.30fr)',
    gap: '5px',
    marginBottom: '1.5rem',
    justifyContent: 'center',
  },
  selectGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
  },
  selectLabel: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#2c3e50',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  optionalBadge: {
    marginLeft: 'auto',
    fontSize: '0.7rem',
    padding: '0.1rem 0.4rem',
    backgroundColor: '#f0f0f0',
    color: '#6c757d',
    borderRadius: '4px',
  },
  select: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '0.9rem',
    cursor: 'pointer',
    backgroundColor: '#fff',
    outline: 'none',
    width: '100%',
  },
  selectDisabled: {
    backgroundColor: '#f8f9fa',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  readButton: {
    width: '100%',
    padding: '0.9rem',
    backgroundColor: '#2c3e50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  readButtonDisabled: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  scriptureCard: {
    // Removed flex: 1
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '3rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    border: '1px solid #f0f0f0',
    minHeight: '400px',
  },
  errorBox: {
    color: '#c0392b',
    padding: '1rem',
    backgroundColor: '#fadbd8',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
  },
  loadingBox: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#6c757d',
  },
  spin: {
    animation: 'spin 1s linear infinite',
  },
  scriptureContent: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  reference: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '2rem',
    textAlign: 'center',
    letterSpacing: '-0.5px',
  },
  versesContainer: {
    marginBottom: '2rem',
  },
  verseBlock: {
    marginBottom: '0.5rem',
    lineHeight: '1.8',
    padding: '0.5rem',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
  },
  verseHighlighted: {
    backgroundColor: '#fff9c4', // Light yellow highlight
  },
  verseNumber: {
    fontWeight: '600',
    color: '#95a5a6',
    marginRight: '0.75rem',
    fontSize: '0.75rem',
    verticalAlign: 'super',
    userSelect: 'none',
  },
  verseText: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    fontFamily: 'Georgia, serif',
  },
  translationInfo: {
    marginTop: '3rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #f0f0f0',
    fontSize: '0.85rem',
    color: '#95a5a6',
    textAlign: 'center',
  },
  translationLabel: {
    fontWeight: '600',
    color: '#6c757d',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#95a5a6',
  },
  emptyStateIcon: {
    marginBottom: '1rem',
    opacity: 0.2,
  },
  emptyStateText: {
    color: '#2c3e50',
    fontSize: '1.25rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
  },
  emptyStateSubtext: {
    fontSize: '0.95rem',
  },
};

// Add keyframes for spin animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);