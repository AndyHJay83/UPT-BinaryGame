# UPT Binary Game

A sophisticated React Native app with Expo Router that implements a binary word-guessing system disguised as a ChatGPT interface. The app uses a dual-interpretation binary system to filter words through letter-based choices.

## 🚀 Features

### Core Binary System
- **Dual-Interpretation Logic**: Each binary choice (L/R) has two possible meanings creating separate word pools
- **Letter Sequence Processing**: Fixed sequence NTRLCSEUAI derived from ten predefined words
- **Real-time Word Filtering**: Words are filtered after each choice, updating both left and right pattern pools
- **Visual Progress Tracking**: White dot indicators show current letter processing position

### Interface Design
- **ChatGPT Disguise**: Authentic-looking ChatGPT interface that reveals the binary game
- **Pure Black Theme**: Sleek dark interface with white borders and accents
- **Responsive Layout**: Top 60% shows ChatGPT interface, bottom 40% contains binary controls
- **Cross-Platform Support**: iOS, Android, and Web platforms

### Game Flow
1. **Initialization**: Ten predefined words loaded with letter sequence NTRLCSEUAI
2. **Binary Choices**: User makes L/R choices for each letter in sequence
3. **Word Filtering**: Dual-interpretation system filters words into left and right pools
4. **Progress Tracking**: Dot moves through words as letters are processed
5. **Game Completion**: Results shown when sequence is complete or word pools are small enough

### Settings & Configuration
- **Word List Management**: Six default lists plus custom word collections
- **Letter Sequence Management**: Four preset sequences plus custom patterns
- **App Preferences**: Theme settings and export format options
- **Psychological Profiling**: Advanced question system for user analysis

## 🏗️ Architecture

### Technology Stack
- **React Native** with Expo Router for navigation
- **TypeScript** for type safety
- **Tailwind CSS** (NativeWind) for styling
- **React Context** with useReducer for state management

### State Management
```typescript
interface FilterState {
  currentLetter: string;
  currentLetterIndex: number;
  sequence: string[];
  leftWords: string[];
  rightWords: string[];
  usedLetters: Set<string>;
  isComplete: boolean;
  letterSequence: string;
}
```

### Binary Filtering Algorithm
The core algorithm implements dual-interpretation logic:

1. **Left Pattern**: L = word contains letter, R = word doesn't contain letter
2. **Right Pattern**: R = word contains letter, L = word doesn't contain letter
3. **Word Processing**: Each word is checked against both patterns
4. **Pool Updates**: Words matching left pattern go to leftWords, right pattern to rightWords

## 📱 Screens

### Home Screen
- Pure black background
- Two centered buttons with white borders
- "Settings" button navigates to configuration
- "Read Minds" button starts the game

### Settings Screen
- **Word Lists Tab**: Default and custom word list management
- **Sequences Tab**: Letter sequence configuration
- **Preferences Tab**: Theme and export settings
- **Profiling Tab**: Psychological question system

### Read Minds Screen
- **ChatGPT Interface**: Mock ChatGPT chat with ten predefined words
- **Dot Indicators**: White dots show current and processed letters
- **Binary Controls**: Large L/R buttons for user choices
- **Word Pools**: Real-time display of filtered word collections
- **Progress Tracking**: Current letter and sequence progress

## 🎮 How to Play

1. **Start the Game**: Navigate to "Read Minds" from the home screen
2. **Activate Interface**: Tap anywhere on the screen to reveal ChatGPT
3. **View Words**: See the ten predefined words with letter sequence NTRLCSEUAI
4. **Make Choices**: For each letter, choose L (Left) or R (Right)
5. **Watch Filtering**: See words move between left and right pattern pools
6. **Track Progress**: Follow the white dot as it moves through words
7. **Complete Game**: Continue until all letters are processed or pools are small enough

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd UPT-BinaryGame

# Install dependencies
npm install

# Start the development server
npm start
```

### Available Scripts
- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser

### Project Structure
```
UPT-BinaryGame/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home screen
│   ├── settings.tsx       # Settings screen
│   └── read-minds.tsx     # Game interface
├── components/             # Reusable components
├── contexts/               # React Context providers
│   └── AppContext.tsx     # Main app state management
├── types/                  # TypeScript type definitions
│   └── index.ts           # App interfaces and types
├── utils/                  # Utility functions
│   ├── binaryFilter.ts    # Core binary logic
│   └── defaultData.ts     # Default word lists and sequences
├── global.css              # Tailwind CSS imports
└── package.json            # Dependencies and scripts
```

## 🔧 Configuration

### Word Lists
The app includes six default word lists:
- EN-UK Dictionary
- 19K Words
- All Names
- Boys Names
- Girls Names
- Months & Star Signs

### Letter Sequences
Four preset letter sequences:
- Full Alphabet (A-Z)
- SEATJK
- Vowels Only (AEIOU)
- Most Frequent (ETAOINSHRDLUCMFWYPVBGKJQXZ)

### Custom Content
Users can create:
- Custom word lists (3+ words)
- Custom letter sequences (3-50 characters, letters only)
- Personal psychological profiles

## 🎯 Success Criteria

- ✅ Binary filtering produces accurate results
- ✅ Dot system correctly tracks letter progression
- ✅ ChatGPT interface looks authentic
- ✅ Word pools update correctly after each choice
- ✅ All functionality works smoothly across platforms
- ✅ Sophisticated binary logic maintained
- ✅ Engaging and intuitive user experience

## 🚀 Future Enhancements

- **Advanced Analytics**: Detailed choice pattern analysis
- **Multiplayer Support**: Competitive binary word games
- **Custom Themes**: Additional visual customization options
- **Export Features**: Save game results and word lists
- **Achievement System**: Unlockable content and badges
- **AI Integration**: Machine learning for pattern recognition

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue in the repository.
