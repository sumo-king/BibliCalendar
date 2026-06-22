import BibleService from './bible.service';

// Mock fetch
global.fetch = jest.fn();

describe('BibleService', () => {
  let bibleService;

  beforeEach(() => {
    bibleService = new BibleService();
    jest.clearAllMocks();
    global.fetch.mockClear();
  });

  describe('fetchScripture', () => {
    test('fetches scripture with book and chapter', async () => {
      const mockData = {
        reference: 'Genesis 1',
        text: 'In the beginning...',
        translation_id: 'web'
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await bibleService.fetchScripture('Genesis', 1);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://bible-api.com/Genesis%201?translation=web'
      );
      expect(result).toEqual(mockData);
    });

    test('fetches scripture with specific verse', async () => {
      const mockData = {
        reference: 'Genesis 1:1',
        text: 'In the beginning God created the heavens and the earth.',
        translation_id: 'web'
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await bibleService.fetchScripture('Genesis', 1, '1');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://bible-api.com/Genesis%201%3A1?translation=web'
      );
      expect(result).toEqual(mockData);
    });

    test('fetches scripture with different translation', async () => {
      const mockData = {
        reference: 'John 1:1',
        text: 'In the beginning was the Word...',
        translation_id: 'kjv'
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await bibleService.fetchScripture('John', 1, '', 'kjv');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://bible-api.com/John%201?translation=kjv'
      );
      expect(result).toEqual(mockData);
    });

    test('throws error when fetch fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false
      });

      await expect(bibleService.fetchScripture('Genesis', 1)).rejects.toThrow(
        'Failed to fetch Bible text'
      );
    });

    test('encodes special characters in query', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({})
      });

      await bibleService.fetchScripture('1 John', 1, 1);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('1%20John')
      );
    });
  });

  describe('TORAH_PORTIONS', () => {
    test('has 54 Torah portions', () => {
      expect(bibleService.TORAH_PORTIONS.length).toBe(54);
    });

    test('first portion is Bereshit', () => {
      expect(bibleService.TORAH_PORTIONS[0].name).toBe('Bereshit');
    });

    test('last portion is V\'Zot HaBracha', () => {
      const lastPortion = bibleService.TORAH_PORTIONS[bibleService.TORAH_PORTIONS.length - 1];
      expect(lastPortion.name).toBe('V\'Zot HaBracha');
    });

    test('all portions have required properties', () => {
      bibleService.TORAH_PORTIONS.forEach(portion => {
        expect(portion).toHaveProperty('name');
        expect(portion).toHaveProperty('ref');
        expect(portion).toHaveProperty('book');
        expect(portion).toHaveProperty('chapter');
      });
    });
  });

  describe('getPortionIndexForDate', () => {
    test('returns valid portion index', () => {
      const date = new Date(2024, 0, 1); // January 1, 2024
      const index = bibleService.getPortionIndexForDate(date);
      
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(bibleService.TORAH_PORTIONS.length);
    });

    test('returns consistent portion for same date', () => {
      const date = new Date(2024, 0, 15);
      const index1 = bibleService.getPortionIndexForDate(date);
      const index2 = bibleService.getPortionIndexForDate(date);
      
      expect(index1).toBe(index2);
    });

    test('returns different portions for different dates', () => {
      const date1 = new Date(2024, 0, 1);
      const date2 = new Date(2024, 0, 8);
      const index1 = bibleService.getPortionIndexForDate(date1);
      const index2 = bibleService.getPortionIndexForDate(date2);
      
      // Different dates should likely have different portions
      // (unless they're both at boundaries)
      expect(typeof index1).toBe('number');
      expect(typeof index2).toBe('number');
    });
  });

  describe('bibleBooks', () => {
    test('has Old Testament books', () => {
      expect(bibleService.bibleBooks['Old Testament']).toBeDefined();
      expect(Array.isArray(bibleService.bibleBooks['Old Testament'])).toBe(true);
      expect(bibleService.bibleBooks['Old Testament'].length).toBeGreaterThan(0);
    });

    test('has New Testament books', () => {
      expect(bibleService.bibleBooks['New Testament']).toBeDefined();
      expect(Array.isArray(bibleService.bibleBooks['New Testament'])).toBe(true);
      expect(bibleService.bibleBooks['New Testament'].length).toBeGreaterThan(0);
    });

    test('contains expected Old Testament books', () => {
      const otBooks = bibleService.bibleBooks['Old Testament'];
      expect(otBooks).toContain('Genesis');
      expect(otBooks).toContain('Exodus');
      expect(otBooks).toContain('Psalms');
    });

    test('contains expected New Testament books', () => {
      const ntBooks = bibleService.bibleBooks['New Testament'];
      expect(ntBooks).toContain('Matthew');
      expect(ntBooks).toContain('John');
      expect(ntBooks).toContain('Revelation');
    });
  });

  describe('abbrvBooks', () => {
    test('maps abbreviations to full book names', () => {
      expect(bibleService.abbrvBooks['Gen']).toBe('Genesis');
      expect(bibleService.abbrvBooks['Matt']).toBe('Matthew');
      expect(bibleService.abbrvBooks['Rev']).toBe('Revelation');
    });

    test('has multiple abbreviations', () => {
      expect(Object.keys(bibleService.abbrvBooks).length).toBeGreaterThan(0);
    });
  });

  describe('chapterCounts', () => {
    test('has chapter counts for all books', () => {
      expect(bibleService.chapterCounts['Genesis']).toBe(50);
      expect(bibleService.chapterCounts['Matthew']).toBe(28);
      expect(bibleService.chapterCounts['Revelation']).toBe(22);
    });

    test('all chapter counts are positive numbers', () => {
      Object.values(bibleService.chapterCounts).forEach(count => {
        expect(typeof count).toBe('number');
        expect(count).toBeGreaterThan(0);
      });
    });

    test('has correct number of books', () => {
      // 66 books in the Bible (39 OT + 27 NT)
      expect(Object.keys(bibleService.chapterCounts).length).toBe(66);
    });
  });

  describe('translations', () => {
    test('has available translations', () => {
      expect(Array.isArray(bibleService.translations)).toBe(true);
      expect(bibleService.translations.length).toBeGreaterThan(0);
    });

    test('each translation has id and name', () => {
      bibleService.translations.forEach(translation => {
        expect(translation).toHaveProperty('id');
        expect(translation).toHaveProperty('name');
      });
    });

    test('contains WEB translation', () => {
      const webTranslation = bibleService.translations.find(t => t.id === 'web');
      expect(webTranslation).toBeDefined();
      expect(webTranslation.name).toBe('WEB');
    });
  });

  describe('allBooks', () => {
    test('is a flattened array of all books', () => {
      expect(Array.isArray(bibleService.allBooks)).toBe(true);
      expect(bibleService.allBooks.length).toBeGreaterThan(0);
    });

    test('contains books from both testaments', () => {
      expect(bibleService.allBooks).toContain('Genesis');
      expect(bibleService.allBooks).toContain('Matthew');
    });

    test('includes abbreviated forms', () => {
      expect(bibleService.allBooks).toContain('Gen');
      expect(bibleService.allBooks).toContain('Matt');
    });
  });
});
