
export default class BibleService {

  async fetchScripture(book, chapter, verse = '', translation = 'web') {
      let query = `${book} ${chapter}`;
      if (verse) {
        query += `:${verse}`;
      }
      const url = `https://bible-api.com/${encodeURIComponent(query)}?translation=${translation}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch Bible text');
      }

      const data = await response.json();
      return data;
  }

  TORAH_PORTIONS = [
    { name: "Bereshit",     ref: "Genesis 1",         book: "Genesis",      chapter: 1  },
    { name: "Noach",        ref: "Genesis 6",         book: "Genesis",      chapter: 6  },
    { name: "Lech-Lecha",   ref: "Genesis 12",        book: "Genesis",      chapter: 12 },
    { name: "Vayera",       ref: "Genesis 18",        book: "Genesis",      chapter: 18 },
    { name: "Chayei Sarah", ref: "Genesis 23",        book: "Genesis",      chapter: 23 },
    { name: "Toldot",       ref: "Genesis 25",        book: "Genesis",      chapter: 25 },
    { name: "Vayetzei",     ref: "Genesis 28",        book: "Genesis",      chapter: 28 },
    { name: "Vayishlach",   ref: "Genesis 32",        book: "Genesis",      chapter: 32 },
    { name: "Vayeshev",     ref: "Genesis 37",        book: "Genesis",      chapter: 37 },
    { name: "Miketz",       ref: "Genesis 41",        book: "Genesis",      chapter: 41 },
    { name: "Vayigash",     ref: "Genesis 44",        book: "Genesis",      chapter: 44 },
    { name: "Vayechi",      ref: "Genesis 47",        book: "Genesis",      chapter: 47 },
    { name: "Shemot",       ref: "Exodus 1",          book: "Exodus",       chapter: 1  },
    { name: "Vaera",        ref: "Exodus 6",          book: "Exodus",       chapter: 6  },
    { name: "Bo",           ref: "Exodus 10",         book: "Exodus",       chapter: 10 },
    { name: "Beshalach",    ref: "Exodus 13",         book: "Exodus",       chapter: 13 },
    { name: "Yitro",        ref: "Exodus 18",         book: "Exodus",       chapter: 18 },
    { name: "Mishpatim",    ref: "Exodus 21",         book: "Exodus",       chapter: 21 },
    { name: "Terumah",      ref: "Exodus 25",         book: "Exodus",       chapter: 25 },
    { name: "Tetzaveh",     ref: "Exodus 27",         book: "Exodus",       chapter: 27 },
    { name: "Ki Tisa",      ref: "Exodus 30",         book: "Exodus",       chapter: 30 },
    { name: "Vayakhel",     ref: "Exodus 35",         book: "Exodus",       chapter: 35 },
    { name: "Pekudei",      ref: "Exodus 38",         book: "Exodus",       chapter: 38 },
    { name: "Vayikra",      ref: "Leviticus 1",       book: "Leviticus",    chapter: 1  },
    { name: "Tzav",         ref: "Leviticus 6",       book: "Leviticus",    chapter: 6  },
    { name: "Shemini",      ref: "Leviticus 9",       book: "Leviticus",    chapter: 9  },
    { name: "Tazria",       ref: "Leviticus 12",      book: "Leviticus",    chapter: 12 },
    { name: "Metzora",      ref: "Leviticus 14",      book: "Leviticus",    chapter: 14 },
    { name: "Acharei Mot",  ref: "Leviticus 16",      book: "Leviticus",    chapter: 16 },
    { name: "Kedoshim",     ref: "Leviticus 19",      book: "Leviticus",    chapter: 19 },
    { name: "Emor",         ref: "Leviticus 21",      book: "Leviticus",    chapter: 21 },
    { name: "Behar",        ref: "Leviticus 25",      book: "Leviticus",    chapter: 25 },
    { name: "Bechukotai",   ref: "Leviticus 26",      book: "Leviticus",    chapter: 26 },
    { name: "Bamidbar",     ref: "Numbers 1",         book: "Numbers",      chapter: 1  },
    { name: "Nasso",        ref: "Numbers 4",         book: "Numbers",      chapter: 4  },
    { name: "Beha'alotcha", ref: "Numbers 8",         book: "Numbers",      chapter: 8  },
    { name: "Shelach",      ref: "Numbers 13",        book: "Numbers",      chapter: 13 },
    { name: "Korach",       ref: "Numbers 16",        book: "Numbers",      chapter: 16 },
    { name: "Chukat",       ref: "Numbers 19",        book: "Numbers",      chapter: 19 },
    { name: "Balak",        ref: "Numbers 22",        book: "Numbers",      chapter: 22 },
    { name: "Pinchas",      ref: "Numbers 25",        book: "Numbers",      chapter: 25 },
    { name: "Matot",        ref: "Numbers 30",        book: "Numbers",      chapter: 30 },
    { name: "Masei",        ref: "Numbers 33",        book: "Numbers",      chapter: 33 },
    { name: "Devarim",      ref: "Deuteronomy 1",     book: "Deuteronomy",  chapter: 1  },
    { name: "Vaetchanan",   ref: "Deuteronomy 3",     book: "Deuteronomy",  chapter: 3  },
    { name: "Eikev",        ref: "Deuteronomy 7",     book: "Deuteronomy",  chapter: 7  },
    { name: "Re'eh",        ref: "Deuteronomy 11",    book: "Deuteronomy",  chapter: 11 },
    { name: "Shoftim",      ref: "Deuteronomy 16",    book: "Deuteronomy",  chapter: 16 },
    { name: "Ki Teitzei",   ref: "Deuteronomy 21",    book: "Deuteronomy",  chapter: 21 },
    { name: "Ki Tavo",      ref: "Deuteronomy 26",    book: "Deuteronomy",  chapter: 26 },
    { name: "Nitzavim",     ref: "Deuteronomy 29",    book: "Deuteronomy",  chapter: 29 },
    { name: "Vayeilech",    ref: "Deuteronomy 31",    book: "Deuteronomy",  chapter: 31 },
    { name: "Ha'azinu",     ref: "Deuteronomy 32",    book: "Deuteronomy",  chapter: 32 },
    { name: "V'Zot HaBracha", ref: "Deuteronomy 33", book: "Deuteronomy",  chapter: 33 },
  ];

  getPortionIndexForDate(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - start) / 86400000);
  return dayOfYear % this.TORAH_PORTIONS.length;
  }

  bibleBooks = {
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
  
  abbrvBooks = {
    'Gen': 'Genesis', 'Exod': 'Exodus', 'Lev': 'Leviticus', 'Num': 'Numbers', 'Deut': 'Deuteronomy',
    'Josh': 'Joshua', 'Judg': 'Judges', 'Ruth': 'Ruth', '1 Sam': '1 Samuel', '2 Sam': '2 Samuel',
    '1 Kgs': '1 Kings', '2 Kgs': '2 Kings', '1 Chr': '1 Chronicles', '2 Chr': '2 Chronicles',
    'Ezra': 'Ezra', 'Neh': 'Nehemiah', 'Esth': 'Esther', 'Job': 'Job', 'Ps': 'Psalms',
    'Prov': 'Proverbs', 'Eccl': 'Ecclesiastes', 'Song': 'Song of Solomon', 'Isa': 'Isaiah',
    'Jer': 'Jeremiah', 'Lam': 'Lamentations', 'Ezek': 'Ezekiel', 'Dan': 'Daniel',
    'Hos': 'Hosea', 'Joel': 'Joel', 'Amos': 'Amos', 'Obad': 'Obadiah', 'Jonah': 'Jonah',
    'Mic': 'Micah', 'Nah': 'Nahum', 'Hab': 'Habakkuk', 'Zeph': 'Zephaniah', 'Hag': 'Haggai',
    'Zech': 'Zechariah', 'Mal': 'Malachi', 'Matt': 'Matthew', 'Mark': 'Mark',
    'Luke': 'Luke', 'John': 'John', 'Acts': 'Acts', 'Rom': 'Romans', '1 Cor': '1 Corinthians', '2 Cor': '2 Corinthians',
    'Gal': 'Galatians', 'Eph': 'Ephesians', 'Phil': 'Philippians', 'Col': 'Colossians',
    '1 Thess': '1 Thessalonians', '2 Thess': '2 Thessalonians',
    '1 Tim': '1 Timothy', '2 Tim': '2 Timothy', 'Titus': 'Titus', 'Philem': 'Philemon',
    'Heb': 'Hebrews', 'Jas': 'James', '1 Pet': '1 Peter', '2 Pet': '2 Peter',
    '1 John': '1 John', '2 John': '2 John', '3 John': '3 John', 'Jude': 'Jude', 'Rev': 'Revelation'};

  chapterCounts = {
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

  translations = [
    { id: 'web', name: 'WEB' },
    { id: 'kjv', name: 'KJV' },
    { id: 'bbe', name: 'BBE' },
    { id: 'clementine', name: 'Vulgate' }
  ];

  // Flatten books list for searching
  allBooks = [...this.bibleBooks['Old Testament'], ...this.bibleBooks['New Testament'], ...Object.keys(this.abbrvBooks)];
}