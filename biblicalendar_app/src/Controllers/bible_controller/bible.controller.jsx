import { useState } from "react";

export const BibleView = () => {
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

  return (
    <div style={styles.bibleContainer}>
      <div style={styles.bibleCard}>
        <h2 style={styles.bibleHeading}>Select Scripture</h2>
        
        <div style={styles.selectGrid}>
          <div style={styles.selectGroup}>
            <label style={styles.selectLabel}>Translation</label>
            <select
              style={styles.select}
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
            >
              {translations.map(trans => (
                <option key={trans.id} value={trans.id}>
                  {trans.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.selectGroup}>
            <label style={styles.selectLabel}>Book</label>
            <select
              style={styles.select}
              value={selectedBook}
              onChange={handleBookChange}
            >
              <option value="">Select a book...</option>
              {Object.entries(bibleBooks).map(([testament, books]) => (
                <optgroup key={testament} label={testament}>
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
            <label style={styles.selectLabel}>Chapter</label>
            <select
              style={styles.select}
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
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.selectGroup}>
            <label style={styles.selectLabel}>Verse (Optional)</label>
            <input
              type="number"
              style={styles.select}
              value={selectedVerse}
              onChange={(e) => setSelectedVerse(e.target.value)}
              placeholder="All verses"
              min="1"
              disabled={!selectedChapter}
            />
          </div>
        </div>

        <button
          style={{...styles.button, ...((!selectedBook || !selectedChapter || loading) ? styles.buttonDisabled : {})}}
          onClick={fetchBibleText}
          disabled={!selectedBook || !selectedChapter || loading}
        >
          {loading ? 'Loading...' : 'Read Scripture'}
        </button>
      </div>

      <div style={styles.bibleCard}>
        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        {loading && (
          <div style={styles.loadingBox}>
            <div style={styles.spinner}></div>
            <p>Loading scripture...</p>
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
                Translation: {bibleData.translation_name}
                {bibleData.translation_note && ` — ${bibleData.translation_note}`}
              </div>
            )}
          </div>
        )}

        {!bibleData && !loading && !error && (
          <div style={styles.emptyState}>
            <span style={styles.emptyStateIcon}>📖</span>
            <p style={styles.emptyStateText}>Select a book and chapter to begin reading</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2c3e50',
    borderBottom: '3px solid #d4af37',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  headerContent: {
    padding: '1rem 2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoIcon: {
    fontSize: '2rem',
  },
  logoText: {
    margin: 0,
    color: '#fff',
    fontSize: '1.75rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  body: {
    paddingTop: '80px',
    paddingBottom: '100px',
    minHeight: '100vh',
  },
  mainContent: {
    padding: '2rem 1rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  calendarSection: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontWeight: '600',
  },
  cardGrid: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    minWidth: '280px',
    maxWidth: '400px',
    flex: '1',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #e0e0e0',
  },
  cardHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1.25rem',
    borderBottom: '2px solid #d4af37',
  },
  cardTitle: {
    margin: 0,
    color: '#fff',
    fontSize: '1.25rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  cardBody: {
    padding: '1.5rem',
  },
  moonPhaseDisplay: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  moonEmoji: {
    fontSize: '4rem',
    marginBottom: '0.5rem',
  },
  moonPhaseName: {
    fontSize: '1.1rem',
    color: '#495057',
    fontWeight: '500',
  },
  dataRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 0',
    borderBottom: '1px solid #e9ecef',
  },
  dataLabel: {
    fontSize: '0.95rem',
    color: '#6c757d',
    fontWeight: '500',
  },
  dataValue: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    fontWeight: '600',
  },
  dataValueSmall: {
    fontSize: '1rem',
    color: '#495057',
    fontWeight: '500',
  },
  sabbathHighlight: {
    color: '#d4af37',
    fontWeight: '700',
  },
  comingSoon: {
    textAlign: 'center',
    padding: '2rem 1rem',
  },
  comingSoonIcon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '1rem',
  },
  comingSoonText: {
    color: '#6c757d',
    fontSize: '0.95rem',
    margin: 0,
  },
  tabBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderTop: '2px solid #d4af37',
    boxShadow: '0 -2px 12px rgba(0,0,0,0.1)',
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
  tabIcon: {
    fontSize: '1.25rem',
  },
  bibleContainer: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  bibleCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '1px solid #e0e0e0',
  },
  bibleHeading: {
    margin: '0 0 1.5rem 0',
    color: '#2c3e50',
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  selectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  selectGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  selectLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#495057',
  },
  select: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
    backgroundColor: '#fff',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#2c3e50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    outline: 'none',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
  },
  errorBox: {
    color: '#c0392b',
    padding: '1rem',
    backgroundColor: '#fadbd8',
    borderRadius: '8px',
    border: '1px solid #e74c3c',
  },
  loadingBox: {
    textAlign: 'center',
    padding: '3rem',
    color: '#6c757d',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #2c3e50',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem',
  },
  scriptureContent: {
    padding: '1rem 0',
  },
  reference: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    paddingBottom: '0.75rem',
    borderBottom: '3px solid #d4af37',
  },
  versesContainer: {
    marginBottom: '2rem',
  },
  verseBlock: {
    marginBottom: '1.25rem',
    lineHeight: '1.8',
  },
  verseNumber: {
    fontWeight: '700',
    color: '#d4af37',
    marginRight: '0.75rem',
    fontSize: '0.9rem',
    verticalAlign: 'super',
    // fontSize: '0.8rem',
  },
  verseText: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    lineHeight: '1.8',
  },
  translationInfo: {
    marginTop: '2rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e0e0e0',
    fontSize: '0.9rem',
    color: '#6c757d',
    fontStyle: 'italic',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem',
  },
  emptyStateIcon: {
    fontSize: '4rem',
    display: 'block',
    marginBottom: '1rem',
  },
  emptyStateText: {
    color: '#6c757d',
    fontSize: '1.1rem',
    margin: 0,
  },
};