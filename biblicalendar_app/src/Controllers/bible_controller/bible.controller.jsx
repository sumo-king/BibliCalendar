import { useState } from "react";

export default function BibleView() {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedVerse, setSelectedVerse] = useState('');
  const [bibleData, setBibleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [translation, setTranslation] = useState('web');

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
    { id: 'web', name: 'World English Bible' },
    { id: 'kjv', name: 'King James Version' },
    { id: 'bbe', name: 'Bible in Basic English' },
    { id: 'clementine', name: 'Clementine Latin Vulgate' }
  ];

  const fetchBibleText = async () => {
    if (!selectedBook || !selectedChapter) {
      setError('Please select a book and chapter');
      return;
    }
    setLoading(true);
    setError(null);

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

  return (
    <div style={styles.bibleContainer}>
      {/* Navigation Arrows */}
      {selectedBook && selectedChapter && (
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      {/* Scripture Selection Card */}
      <div style={styles.selectionCard}>
        <div style={styles.cardHeader}>
          <div style={styles.headerIcon}>📖</div>
          <h2 style={styles.cardHeading}>Sacred Scripture</h2>
          <p style={styles.cardSubheading}>Select a passage to begin your reading</p>
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
                <span style={styles.labelIcon}>📚</span>
                Book
              </label>
              <select
                style={styles.select}
                value={selectedBook}
                onChange={handleBookChange}
              >
                <option value="">Choose a book...</option>
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
                <span style={styles.labelIcon}>📄</span>
                Chapter
              </label>
              <select
                style={{...styles.select, ...((!selectedBook) ? styles.selectDisabled : {})}}
                value={selectedChapter}
                onChange={handleChapterChange}
                disabled={!selectedBook}
              >
                <option value="">Select chapter...</option>
                {selectedBook && Array.from(
                  { length: chapterCounts[selectedBook] || 0 },
                  (_, i) => i + 1
                ).map(num => (
                  <option key={num} value={num}>
                    Chapter {num}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.selectGroup}>
              <label style={styles.selectLabel}>
                <span style={styles.labelIcon}>✨</span>
                Verse <span style={styles.optionalBadge}>Optional</span>
              </label>
              <input
                type="number"
                style={{...styles.select, ...((!selectedChapter) ? styles.selectDisabled : {})}}
                value={selectedVerse}
                onChange={(e) => setSelectedVerse(e.target.value)}
                placeholder="All verses"
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
                <span style={styles.buttonSpinner}></span>
                Loading...
              </>
            ) : (
              <>
                <span>📖</span>
                Read Scripture
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scripture Display Card */}
      <div style={styles.scriptureCard}>
        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div style={styles.loadingBox}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading scripture...</p>
          </div>
        )}

        {bibleData && !loading && (
          <div style={styles.scriptureContent}>
            <h3 style={styles.reference}>{bibleData.reference}</h3>
            
            <div style={styles.versesContainer}>
              {bibleData.verses.map((verse, index) => (
                <div key={index} style={styles.verseBlock}>
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
            <span style={styles.emptyStateIcon}>📖</span>
            <p style={styles.emptyStateText}>Your selected scripture will appear here</p>
            <p style={styles.emptyStateSubtext}>Choose a book and chapter above to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  bibleContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 1rem',
    position: 'relative',
  },
  navigationArrow: {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50px',
    height: '50px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    zIndex: 100,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  arrowLeft: {
    left: '1rem',
    borderRadius: '0 25px 25px 0',
  },
  arrowRight: {
    right: '1rem',
    borderRadius: '25px 0 0 25px',
  },
  arrowDisabled: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  selectionCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    marginBottom: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e8e8e8',
    overflow: 'hidden',
  },
  cardHeader: {
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    borderBottom: '3px solid #d4af37',
  },
  headerIcon: {
    fontSize: '3rem',
    marginBottom: '0.75rem',
  },
  cardHeading: {
    margin: '0 0 0.5rem 0',
    color: '#fff',
    fontSize: '2rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  cardSubheading: {
    margin: 0,
    color: 'rgba(255,255,255,0.85)',
    fontSize: '1rem',
    fontWeight: '400',
  },
  selectionBody: {
    padding: '2rem',
  },
  translationSection: {
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '2px solid #f0f0f0',
  },
  sectionLabel: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  translationButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  translationButton: {
    padding: '0.65rem 1.25rem',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    backgroundColor: '#fff',
    color: '#495057',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  translationButtonActive: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    borderColor: '#2c3e50',
    transform: 'scale(1.02)',
  },
  selectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  selectGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  selectLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#2c3e50',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  labelIcon: {
    fontSize: '1.1rem',
  },
  optionalBadge: {
    marginLeft: '0.5rem',
    fontSize: '0.75rem',
    padding: '0.15rem 0.5rem',
    backgroundColor: '#e8f4f8',
    color: '#4a90a4',
    borderRadius: '4px',
    fontWeight: '500',
  },
  select: {
    padding: '0.9rem 1rem',
    borderRadius: '10px',
    border: '2px solid #e0e0e0',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#fff',
    outline: 'none',
    fontFamily: 'inherit',
  },
  selectDisabled: {
    backgroundColor: '#f8f9fa',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  optgroup: {
    fontWeight: '600',
    color: '#2c3e50',
  },
  readButton: {
    width: '100%',
    padding: '1.1rem 2rem',
    backgroundColor: '#2c3e50',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    boxShadow: '0 4px 12px rgba(44,62,80,0.2)',
  },
  readButtonDisabled: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  buttonSpinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid #fff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
  },
  scriptureCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e8e8e8',
    minHeight: '300px',
  },
  errorBox: {
    color: '#c0392b',
    padding: '1.25rem',
    backgroundColor: '#fadbd8',
    borderRadius: '10px',
    border: '2px solid #e74c3c',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1rem',
  },
  errorIcon: {
    fontSize: '1.5rem',
  },
  loadingBox: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #2c3e50',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1.5rem',
  },
  loadingText: {
    color: '#6c757d',
    fontSize: '1.1rem',
    margin: 0,
  },
  scriptureContent: {
    padding: '0',
  },
  reference: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '3px solid #d4af37',
    textAlign: 'center',
  },
  versesContainer: {
    marginBottom: '2rem',
  },
  verseBlock: {
    marginBottom: '1.5rem',
    lineHeight: '1.9',
  },
  verseNumber: {
    fontWeight: '700',
    color: '#d4af37',
    marginRight: '0.75rem',
    fontSize: '0.85rem',
    verticalAlign: 'super',
  },
  verseText: {
    fontSize: '1.15rem',
    color: '#2c3e50',
    lineHeight: '1.9',
    fontFamily: 'Georgia, serif',
  },
  translationInfo: {
    marginTop: '2.5rem',
    paddingTop: '1.5rem',
    borderTop: '2px solid #f0f0f0',
    fontSize: '0.95rem',
    color: '#6c757d',
    textAlign: 'center',
  },
  translationLabel: {
    fontWeight: '600',
    color: '#495057',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  emptyStateIcon: {
    fontSize: '5rem',
    display: 'block',
    marginBottom: '1.5rem',
    opacity: 0.6,
  },
  emptyStateText: {
    color: '#2c3e50',
    fontSize: '1.3rem',
    margin: '0 0 0.5rem 0',
    fontWeight: '500',
  },
  emptyStateSubtext: {
    color: '#6c757d',
    fontSize: '1rem',
    margin: 0,
  },
};