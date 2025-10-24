import { useState } from 'react';
import { Card } from '@mui/material';

export const BibleView = () => {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedVerse, setSelectedVerse] = useState('');
  const [bibleData, setBibleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [translation, setTranslation] = useState('web');

  // Bible books organized by testament
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

  // Chapter counts for each book
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

  const styles = {
    container: {
      padding: '1rem',
      maxWidth: '900px',
      margin: '0 auto',
    },
    controlsCard: {
      padding: '1.5rem',
      marginBottom: '1rem',
      borderRadius: '8px',
    },
    selectRow: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      marginBottom: '1rem',
    },
    selectGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      flex: '1',
      minWidth: '150px',
    },
    label: {
      fontWeight: 'bold',
      fontSize: '0.9rem',
      color: '#333',
    },
    select: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    contentCard: {
      padding: '1.5rem',
      borderRadius: '8px',
      minHeight: '300px',
    },
    reference: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#007bff',
    },
    verseContainer: {
      marginBottom: '1rem',
    },
    verseNumber: {
      fontWeight: 'bold',
      color: '#007bff',
      marginRight: '0.5rem',
      fontSize: '0.9rem',
    },
    verseText: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: '#333',
    },
    translationInfo: {
      marginTop: '2rem',
      fontSize: '0.9rem',
      color: '#666',
      fontStyle: 'italic',
    },
    error: {
      color: '#d32f2f',
      padding: '1rem',
      backgroundColor: '#ffebee',
      borderRadius: '4px',
    },
    loading: {
      textAlign: 'center',
      padding: '2rem',
      fontSize: '1.2rem',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      <Card variant="outlined" style={styles.controlsCard}>
        <h2>Select Scripture</h2>
        
        <div style={styles.selectRow}>
          <div style={styles.selectGroup}>
            <label style={styles.label}>Translation</label>
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
            <label style={styles.label}>Book</label>
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
            <label style={styles.label}>Chapter</label>
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
            <label style={styles.label}>Verse (Optional)</label>
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
          style={styles.button}
          onClick={fetchBibleText}
          disabled={!selectedBook || !selectedChapter || loading}
        >
          {loading ? 'Loading...' : 'Read Scripture'}
        </button>
      </Card>

      <Card variant="outlined" style={styles.contentCard}>
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {loading && (
          <div style={styles.loading}>
            Loading scripture...
          </div>
        )}

        {bibleData && !loading && (
          <>
            <div style={styles.reference}>
              {bibleData.reference}
            </div>
            
            {bibleData.verses.map((verse, index) => (
              <div key={index} style={styles.verseContainer}>
                <span style={styles.verseNumber}>{verse.verse}</span>
                <span style={styles.verseText}>{verse.text}</span>
              </div>
            ))}

            {bibleData.translation_name && (
              <div style={styles.translationInfo}>
                Translation: {bibleData.translation_name}
                {bibleData.translation_note && ` - ${bibleData.translation_note}`}
              </div>
            )}
          </>
        )}

        {!bibleData && !loading && !error && (
          <div style={styles.loading}>
            Select a book and chapter to begin reading
          </div>
        )}
      </Card>
    </div>
  );
};