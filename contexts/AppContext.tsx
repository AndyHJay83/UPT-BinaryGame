import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, FilterState } from '../types';
import { 
  DEFAULT_WORD_LISTS, 
  DEFAULT_LETTER_SEQUENCES, 
  DEFAULT_PREFERENCES 
} from '../utils/defaultData';
import { initializeFilterState, processBinaryChoice } from '../utils/binaryFilter';

// Initial app state
const initialState: AppState = {
  selectedWordList: DEFAULT_WORD_LISTS[0],
  filterState: initializeFilterState(),
  preferences: DEFAULT_PREFERENCES,
  customWordLists: [],
  customLetterSequences: []
};

// Action types
export const ACTIONS = {
  SELECT_WORD_LIST: 'SELECT_WORD_LIST',
  MAKE_BINARY_CHOICE: 'MAKE_BINARY_CHOICE',
  RESET_GAME: 'RESET_GAME',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  ADD_CUSTOM_WORD_LIST: 'ADD_CUSTOM_WORD_LIST',
  ADD_CUSTOM_LETTER_SEQUENCE: 'ADD_CUSTOM_LETTER_SEQUENCE',
  SET_THEME: 'SET_THEME',
  SET_EXPORT_FORMAT: 'SET_EXPORT_FORMAT'
} as const;

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case ACTIONS.SELECT_WORD_LIST:
      return {
        ...state,
        selectedWordList: action.payload,
        filterState: initializeFilterState() // Reset game when changing word list
      };

    case ACTIONS.MAKE_BINARY_CHOICE:
      return {
        ...state,
        filterState: processBinaryChoice(state.filterState, action.payload)
      };

    case ACTIONS.RESET_GAME:
      return {
        ...state,
        filterState: initializeFilterState()
      };

    case ACTIONS.UPDATE_PREFERENCES:
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };

    case ACTIONS.ADD_CUSTOM_WORD_LIST:
      return {
        ...state,
        customWordLists: [...state.customWordLists, action.payload]
      };

    case ACTIONS.ADD_CUSTOM_LETTER_SEQUENCE:
      return {
        ...state,
        customLetterSequences: [...state.customLetterSequences, action.payload]
      };

    case ACTIONS.SET_THEME:
      return {
        ...state,
        preferences: { ...state.preferences, theme: action.payload }
      };

    case ACTIONS.SET_EXPORT_FORMAT:
      return {
        ...state,
        preferences: { ...state.preferences, exportFormat: action.payload }
      };

    default:
      return state;
  }
};

// Context interface
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  makeBinaryChoice: (choice: 'L' | 'R') => void;
  resetGame: () => void;
  selectWordList: (wordList: any) => void;
  updatePreferences: (preferences: Partial<AppState['preferences']>) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Helper functions
  const makeBinaryChoice = (choice: 'L' | 'R') => {
    dispatch({ type: ACTIONS.MAKE_BINARY_CHOICE, payload: choice });
  };

  const resetGame = () => {
    dispatch({ type: ACTIONS.RESET_GAME });
  };

  const selectWordList = (wordList: any) => {
    dispatch({ type: ACTIONS.SELECT_WORD_LIST, payload: wordList });
  };

  const updatePreferences = (preferences: Partial<AppState['preferences']>) => {
    dispatch({ type: ACTIONS.UPDATE_PREFERENCES, payload: preferences });
  };

  const value: AppContextType = {
    state,
    dispatch,
    makeBinaryChoice,
    resetGame,
    selectWordList,
    updatePreferences
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
