export interface WordList {
  id: string;
  name: string;
  words: string[];
  isCustom: boolean;
}

export interface LetterSequence {
  id: string;
  name: string;
  sequence: string;
  isCustom: boolean;
}

export interface FilterState {
  currentLetter: string;
  currentLetterIndex: number;
  sequence: string[];
  leftWords: string[];
  rightWords: string[];
  usedLetters: Set<string>;
  isComplete: boolean;
  letterSequence: string;
}

export interface AppState {
  selectedWordList: WordList;
  filterState: FilterState;
  preferences: {
    theme: 'dark' | 'light';
    exportFormat: 'txt' | 'csv' | 'json';
  };
  customWordLists: WordList[];
  customLetterSequences: LetterSequence[];
}

export interface BinaryChoice {
  letter: string;
  choice: 'L' | 'R';
  leftPattern: boolean;
  rightPattern: boolean;
}

export interface AppAction {
  type: string;
  payload?: any;
}

export interface PsychologicalProfile {
  questions: string[];
  answers: string[];
  profile: string;
}

export interface GameResult {
  leftWords: string[];
  rightWords: string[];
  finalChoice: 'L' | 'R';
  totalChoices: number;
}
