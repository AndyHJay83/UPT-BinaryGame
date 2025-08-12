import { FilterState, BinaryChoice } from '../types';

// The predefined ten words and their letter sequence
export const PREDEFINED_WORDS = [
  'Necessary',
  'Toothbrush', 
  'Remember',
  'Loveable',
  'Clementine',
  'Swingset',
  'Elephant',
  'Umbrella',
  'Antidote',
  'Impression'
];

export const LETTER_SEQUENCE = 'NTRLCSEUAI';

// Initialize the filter state with the predefined words
export const initializeFilterState = (): FilterState => {
  return {
    currentLetter: 'N',
    currentLetterIndex: 0,
    sequence: [],
    leftWords: [...PREDEFINED_WORDS],
    rightWords: [...PREDEFINED_WORDS],
    usedLetters: new Set(),
    isComplete: false,
    letterSequence: LETTER_SEQUENCE
  };
};

// Apply dual-interpretation binary filtering
export const applyBinaryFilter = (
  words: string[],
  letter: string,
  choice: 'L' | 'R'
): { leftWords: string[], rightWords: string[] } => {
  const leftWords: string[] = [];
  const rightWords: string[] = [];

  words.forEach(word => {
    const hasLetter = word.toUpperCase().includes(letter.toUpperCase());
    
    // Left pattern interpretation: L = contains letter, R = doesn't contain letter
    const leftPattern = (choice === 'L' && hasLetter) || (choice === 'R' && !hasLetter);
    
    // Right pattern interpretation: R = contains letter, L = doesn't contain letter
    const rightPattern = (choice === 'R' && hasLetter) || (choice === 'L' && !hasLetter);
    
    if (leftPattern) {
      leftWords.push(word);
    }
    
    if (rightPattern) {
      rightWords.push(word);
    }
  });

  return { leftWords, rightWords };
};

// Process a binary choice and update the filter state
export const processBinaryChoice = (
  currentState: FilterState,
  choice: 'L' | 'R'
): FilterState => {
  const { currentLetter, currentLetterIndex, leftWords, rightWords, letterSequence } = currentState;
  
  // Apply filtering to both word pools
  const leftResult = applyBinaryFilter(leftWords, currentLetter, choice);
  const rightResult = applyBinaryFilter(rightWords, currentLetter, choice);
  
  // Add choice to sequence
  const newSequence = [...currentState.sequence, choice];
  
  // Move to next letter
  const nextLetterIndex = currentLetterIndex + 1;
  const nextLetter = nextLetterIndex < letterSequence.length ? letterSequence[nextLetterIndex] : '';
  
  // Check if sequence is complete
  const isComplete = nextLetterIndex >= letterSequence.length || 
                     leftResult.leftWords.length <= 1 || 
                     rightResult.rightWords.length <= 1;
  
  return {
    ...currentState,
    currentLetter: nextLetter,
    currentLetterIndex: nextLetterIndex,
    sequence: newSequence,
    leftWords: leftResult.leftWords,
    rightWords: rightResult.rightWords,
    usedLetters: new Set([...currentState.usedLetters, currentLetter]),
    isComplete
  };
};

// Get the current word with dot indicator
export const getCurrentWordWithDot = (currentLetterIndex: number): string => {
  if (currentLetterIndex >= 0 && currentLetterIndex < PREDEFINED_WORDS.length) {
    return PREDEFINED_WORDS[currentLetterIndex];
  }
  return '';
};

// Check if game should end
export const shouldEndGame = (leftWords: string[], rightWords: string[]): boolean => {
  return leftWords.length <= 1 || rightWords.length <= 1;
};

// Get game result summary
export const getGameResult = (filterState: FilterState): {
  leftWords: string[];
  rightWords: string[];
  totalChoices: number;
  finalChoice?: 'L' | 'R';
} => {
  return {
    leftWords: filterState.leftWords,
    rightWords: filterState.rightWords,
    totalChoices: filterState.sequence.length,
    finalChoice: filterState.sequence[filterState.sequence.length - 1]
  };
};
