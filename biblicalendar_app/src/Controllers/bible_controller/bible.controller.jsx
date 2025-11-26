import { useState } from "react";
import {
  Book,
  FileText,
  Sparkles,
  AlertTriangle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Library
} from 'lucide-react';

export default function BibleView({ matches }) {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedVerse, setSelectedVerse] = useState('');
  const [bibleData, setBibleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [translation, setTranslation] = useState('web');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [highlightedVerses, setHighlightedVerses] = useState(new Set());

  const bibleBooks = {
    'Old Testament': [
      'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
      'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
      '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
      'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
      'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
      'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel',
      'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
      'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
    ],
    'New Testament': [
      'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
      '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
      'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
      '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
      'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
      'Jude', 'Revelation'
    ]
  };

  const chapterCounts = {
    'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
    'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
    '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36,
    'Ezra': 10, 'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150,
    'Proverbs': 31, 'Ecclesiastes': 12, 'Song of Solomon': 8, 'Isaiah': 66,
    'Jeremiah': 52, 'Lamentations': 5, 'Ezekiel': 48, 'Daniel': 12,
    'Hosea': 14, 'Joel': 3, 'Amos': 9, 'Obadiah': 1, 'Jonah': 4,
    'Micah': 7, 'Nahum': 3, 'Habakkuk': 3, 'Zephaniah': 3, 'Haggai': 2,
    'Zechariah': 14, 'Malachi': 4, 'Matthew': 28, 'Mark': 16, 'Luke': 24,
    'John': 21, 'Acts': 28, 'Romans': 16, '1 Corinthians': 16,
    '2 Corinthians': 13, 'Galatians': 6, 'Ephesians': 6, 'Philippians': 4,
    'Colossians': 4, '1 Thessalonians': 5, '2 Thessalonians': 3,
    '1 Timothy': 6, '2 Timothy': 4, 'Titus': 3, 'Philemon': 1,
    'Hebrews': 13, 'James': 5, '1 Peter': 5, '2 Peter': 3,
    '1 John': 5, '2 John': 1, '3 John': 1, 'Jude': 1, 'Revelation': 22
  };

  const translations = [
    { id: 'web', name: 'WEB' },
    { id: 'kjv', name: 'KJV' },
    { id: 'bbe', name: 'BBE' },
    { id: 'clementine', name: 'Vulgate' }
  ];

  const fetchBibleText = async () => {
    if (!selectedBook || !selectedChapter) {
      setError('Please select a book and chapter');
      return;
    }
    setLoading(true);
    setError(null);
    setHighlightedVerses(new Set()); // Reset highlights on new fetch

    try {
      let query = `${selectedBook} ${selectedChapter}`;
      if (selectedVerse) {
        query += `:${selectedVerse}`;
      }
      const url = `https://bible-api.com/${encodeURIComponent(query)}?translation=${translation}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch Bible text');
      }

      const data = await response.json();
      setBibleData(data);
      if (!matches) setIsSidebarOpen(false); // Close sidebar on mobile after fetch
    } catch (err) {
      setError(err.message);
      setBibleData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBookChange = (e) => {
    setSelectedBook(e.target.value);
    setSelectedChapter('');
    setSelectedVerse('');
    setBibleData(null);
  };

  const handleChapterChange = (e) => {
    setSelectedChapter(e.target.value);
    setSelectedVerse('');
    setBibleData(null);
  };

  const navigateChapter = async (direction) => {
    if (!selectedBook || !selectedChapter) return;

    const currentChapter = Number(selectedChapter);
    const maxChapter = chapterCounts[selectedBook];
    let newChapter;

    if (direction === 'prev') {
      newChapter = currentChapter <= 1 ? 1 : currentChapter - 1;
    } else {
      newChapter = currentChapter >= maxChapter ? maxChapter : currentChapter + 1;
    }

    if (newChapter === currentChapter) return;

    setSelectedChapter(String(newChapter));
    setSelectedVerse('');
    setHighlightedVerses(new Set()); // Reset highlights

    try {
      setLoading(true);
      setError(null);
      const query = `${selectedBook} ${newChapter}`;
      const url = `https://bible-api.com/${encodeURIComponent(query)}?translation=${translation}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch Bible text');
      }

      const data = await response.json();
      setBibleData(data);
    } catch (err) {
      setError(err.message);
      setBibleData(null);
    } finally {
      setLoading(false);
    }
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
      {/* Mobile Menu Toggle - Only show on mobile (!matches) */}
      {!matches && (
        <button
          style={styles.menuToggle}
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar Overlay - Only on mobile */}
      {!matches && isSidebarOpen && (
        <div style={styles.overlay} onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Navigation Arrows */}
      {selectedBook && selectedChapter && !isSidebarOpen && (
        <>
          <button
            style={{
              ...styles.navigationArrow,
              ...styles.arrowLeft,
              ...(Number(selectedChapter) <= 1 ? styles.arrowDisabled : {})
            }}
            onClick={() => navigateChapter('prev')}
            disabled={Number(selectedChapter) <= 1}
            aria-label="Previous chapter"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            style={{
              ...styles.navigationArrow,
              ...styles.arrowRight,
              ...(Number(selectedChapter) >= chapterCounts[selectedBook] ? styles.arrowDisabled : {})
            }}
            onClick={() => navigateChapter('next')}
            disabled={Number(selectedChapter) >= chapterCounts[selectedBook]}
            aria-label="Next chapter"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Scripture Selection Card / Sidebar */}
      <div style={{
        ...styles.selectionCard,
        ...(!matches ? styles.mobileSidebar : {}),
        ...(!matches && isSidebarOpen ? styles.mobileSidebarOpen : {})
      }}>
        {!matches && (
          <button
            style={styles.closeButton}
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        )}

        <div style={styles.cardHeader}>
          <Book size={28} style={styles.headerIcon} />
          <div>
            <h2 style={styles.cardHeading}>Scripture</h2>
            <p style={styles.cardSubheading}>Select passage</p>
          </div>
        </div>

        <div style={styles.selectionBody}>
          {/* Translation Selector */}
          <div style={styles.translationSection}>
            <label style={styles.sectionLabel}>Translation</label>
            <div style={styles.translationButtons}>
              {translations.map(trans => (
                <button
                  key={trans.id}
                  style={{
                    ...styles.translationButton,
                    ...(translation === trans.id ? styles.translationButtonActive : {})
                  }}
                  onClick={() => setTranslation(trans.id)}
                >
                  {trans.name}
                </button>
              ))}
            </div>
          </div>

          {/* Book, Chapter, Verse Selection */}
          <div style={styles.selectionsGrid}>
            <div style={styles.selectGroup}>
              <label style={styles.selectLabel}>
                <Library size={16} />
                Book
              </label>
              <select
                style={styles.select}
                value={selectedBook}
                onChange={handleBookChange}
              >
                <option value="">Choose...</option>
                {Object.entries(bibleBooks).map(([testament, books]) => (
                  <optgroup key={testament} label={testament} style={styles.optgroup}>
                    {books.map(book => (
                      <option key={book} value={book}>
                        {book}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div style={styles.selectGroup}>
              <label style={styles.selectLabel}>
                <FileText size={16} />
                Chapter
              </label>
              <select
                style={{ ...styles.select, ...((!selectedBook) ? styles.selectDisabled : {}) }}
                value={selectedChapter}
                onChange={handleChapterChange}
                disabled={!selectedBook}
              >
                <option value="">Select...</option>
                {selectedBook && Array.from(
                  { length: chapterCounts[selectedBook] || 0 },
                  (_, i) => i + 1
                ).map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.selectGroup}>
              <label style={styles.selectLabel}>
                <Sparkles size={16} />
                Verse <span style={styles.optionalBadge}>Opt</span>
              </label>
              <input
                type="number"
                style={{ ...styles.select, ...((!selectedChapter) ? styles.selectDisabled : {}) }}
                value={selectedVerse}
                onChange={(e) => setSelectedVerse(e.target.value)}
                placeholder="All"
                min="1"
                disabled={!selectedChapter}
              />
            </div>
          </div>

          <button
            style={{
              ...styles.readButton,
              ...((!selectedBook || !selectedChapter || loading) ? styles.readButtonDisabled : {})
            }}
            onClick={fetchBibleText}
            disabled={!selectedBook || !selectedChapter || loading}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" style={styles.spin} />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Book size={20} />
                <span>Read</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scripture Display Card */}
      <div style={styles.scriptureCard}>
        {error && (
          <div style={styles.errorBox}>
            <AlertTriangle size={24} />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div style={styles.loadingBox}>
            <Loader2 size={40} style={styles.spin} />
            <p style={styles.loadingText}>Loading scripture...</p>
          </div>
        )}

        {bibleData && !loading && (
          <div style={styles.scriptureContent}>
            <h3 style={styles.reference}>{bibleData.reference}</h3>

            <div style={styles.versesContainer}>
              {bibleData.verses.map((verse, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.verseBlock,
                    ...(highlightedVerses.has(index) ? styles.verseHighlighted : {})
                  }}
                  onClick={() => toggleHighlight(index)}
                >
                  <span style={styles.verseNumber}>{verse.verse}</span>
                  <span style={styles.verseText}>{verse.text}</span>
                </div>
              ))}
            </div>

            {bibleData.translation_name && (
              <div style={styles.translationInfo}>
                <span style={styles.translationLabel}>Translation:</span> {bibleData.translation_name}
                {bibleData.translation_note && ` — ${bibleData.translation_note}`}
              </div>
            )}
          </div>
        )}

        {!bibleData && !loading && !error && (
          <div style={styles.emptyState}>
            <Book size={64} style={styles.emptyStateIcon} />
            <p style={styles.emptyStateText}>Select a passage</p>
            <p style={styles.emptyStateSubtext}>Choose a book and chapter to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
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
  },
  translationSection: {
    marginBottom: '1.5rem',
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
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  selectGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
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