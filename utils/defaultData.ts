import { WordList, LetterSequence } from '../types';

// Default word lists
export const DEFAULT_WORD_LISTS: WordList[] = [
  {
    id: 'en-uk',
    name: 'EN-UK Dictionary',
    words: [
      'apple', 'banana', 'cherry', 'dragon', 'elephant', 'flamingo', 'giraffe', 'hamburger',
      'iceberg', 'jacket', 'kangaroo', 'lemon', 'mountain', 'notebook', 'orange', 'penguin',
      'queen', 'rainbow', 'sunshine', 'tiger', 'umbrella', 'violin', 'watermelon', 'xylophone',
      'yellow', 'zebra', 'airplane', 'butterfly', 'camera', 'dolphin', 'eagle', 'fireworks'
    ],
    isCustom: false
  },
  {
    id: '19k-words',
    name: '19K Words',
    words: [
      'abandon', 'ability', 'abroad', 'absolute', 'accept', 'access', 'account', 'achieve',
      'across', 'action', 'active', 'actual', 'admit', 'adopt', 'adult', 'advance',
      'advantage', 'adventure', 'advertise', 'advice', 'affect', 'afford', 'afraid', 'after',
      'again', 'against', 'age', 'agency', 'agent', 'agree', 'agreement', 'ahead'
    ],
    isCustom: false
  },
  {
    id: 'all-names',
    name: 'All Names',
    words: [
      'alex', 'bella', 'chris', 'diana', 'emma', 'frank', 'grace', 'henry',
      'isabella', 'james', 'kate', 'leo', 'maya', 'noah', 'olivia', 'paul',
      'quinn', 'rachel', 'sam', 'taylor', 'uma', 'victor', 'willa', 'xavier',
      'yara', 'zoe', 'adam', 'beth', 'carl', 'daisy', 'eric', 'fiona'
    ],
    isCustom: false
  },
  {
    id: 'boys-names',
    name: 'Boys Names',
    words: [
      'aaron', 'benjamin', 'christopher', 'daniel', 'ethan', 'finn', 'gabriel', 'henry',
      'isaac', 'jack', 'kevin', 'liam', 'mason', 'noah', 'owen', 'parker',
      'quinn', 'ryan', 'samuel', 'thomas', 'ulysses', 'victor', 'william', 'xavier',
      'yusuf', 'zachary', 'alex', 'blake', 'carter', 'dylan', 'elijah', 'felix'
    ],
    isCustom: false
  },
  {
    id: 'girls-names',
    name: 'Girls Names',
    words: [
      'ava', 'bella', 'charlotte', 'diana', 'emma', 'fiona', 'grace', 'hannah',
      'isabella', 'julia', 'kate', 'lily', 'maya', 'nora', 'olivia', 'penelope',
      'quinn', 'ruby', 'sophia', 'taylor', 'una', 'violet', 'willow', 'xena',
      'yara', 'zoe', 'alice', 'brooklyn', 'claire', 'daisy', 'eve', 'faith'
    ],
    isCustom: false
  },
  {
    id: 'months-stars',
    name: 'Months & Star Signs',
    words: [
      'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
      'september', 'october', 'november', 'december', 'aries', 'taurus', 'gemini', 'cancer',
      'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    ],
    isCustom: false
  }
];

// Default letter sequences
export const DEFAULT_LETTER_SEQUENCES: LetterSequence[] = [
  {
    id: 'full-alphabet',
    name: 'Full Alphabet',
    sequence: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    isCustom: false
  },
  {
    id: 'seatjk',
    name: 'SEATJK',
    sequence: 'SEATJK',
    isCustom: false
  },
  {
    id: 'vowels-only',
    name: 'Vowels Only',
    sequence: 'AEIOU',
    isCustom: false
  },
  {
    id: 'most-frequent',
    name: 'Most Frequent',
    sequence: 'ETAOINSHRDLUCMFWYPVBGKJQXZ',
    isCustom: false
  }
];

// Psychological profiling questions
export const PSYCHOLOGICAL_QUESTIONS = [
  'When faced with a difficult decision, do you prefer to:',
  'In social situations, do you tend to:',
  'When solving problems, you usually:',
  'Your preferred way to relax is:',
  'In a group project, you typically:'
];

export const PSYCHOLOGICAL_ANSWERS = [
  ['Analyze all options carefully', 'Go with your gut feeling'],
  ['Meet new people', 'Stick with familiar faces'],
  ['Think through step by step', 'Jump in and figure it out'],
  ['Read a book or meditate', 'Exercise or be active'],
  ['Take charge and lead', 'Support and collaborate']
];

// App preferences
export const DEFAULT_PREFERENCES = {
  theme: 'dark' as const,
  exportFormat: 'txt' as const
};
