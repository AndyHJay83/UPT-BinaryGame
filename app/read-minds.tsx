import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../contexts/AppContext';
import { PREDEFINED_WORDS, LETTER_SEQUENCE } from '../utils/binaryFilter';

const { width, height } = Dimensions.get('window');

export default function ReadMindsScreen() {
  const router = useRouter();
  const { state, makeBinaryChoice, resetGame } = useAppContext();
  
  const [showChatGPT, setShowChatGPT] = useState(false);
  const [showWordList, setShowWordList] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Handle single tap to show ChatGPT
  const handleScreenTap = () => {
    if (!showChatGPT) {
      setShowChatGPT(true);
    }
  };

  // Handle binary choice
  const handleBinaryChoice = (choice: 'L' | 'R') => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    makeBinaryChoice(choice);
    
    // Check if game is complete
    if (state.filterState.isComplete) {
      showGameResults();
    }
  };

  // Show game results
  const showGameResults = () => {
    const { leftWords, rightWords, totalChoices } = state.filterState;
    
    let resultMessage = `Game Complete!\n\n`;
    resultMessage += `Total Choices: ${totalChoices}\n\n`;
    resultMessage += `Left Pattern Words (${leftWords.length}):\n`;
    resultMessage += leftWords.slice(0, 5).join(', ');
    if (leftWords.length > 5) resultMessage += `... and ${leftWords.length - 5} more`;
    
    resultMessage += `\n\nRight Pattern Words (${rightWords.length}):\n`;
    resultMessage += rightWords.slice(0, 5).join(', ');
    if (rightWords.length > 5) resultMessage += `... and ${rightWords.length - 5} more`;
    
    Alert.alert(
      'Game Results',
      resultMessage,
      [
        { text: 'Play Again', onPress: handlePlayAgain },
        { text: 'Back to Home', onPress: () => router.push('/') }
      ]
    );
  };

  // Handle play again
  const handlePlayAgain = () => {
    resetGame();
    setGameStarted(false);
    setShowChatGPT(false);
  };

  // Navigate back to home
  const navigateToHome = () => {
    router.push('/');
  };

  // Get current word with dot indicator
  const getCurrentWordWithDot = (index: number) => {
    if (index >= 0 && index < PREDEFINED_WORDS.length) {
      return PREDEFINED_WORDS[index];
    }
    return '';
  };

  // Render word with dot indicator
  const renderWordWithDot = (word: string, index: number) => {
    const isCurrentWord = index === state.filterState.currentLetterIndex;
    const isProcessed = index < state.filterState.currentLetterIndex;
    
    return (
      <View key={index} style={styles.wordContainer}>
        <Text style={[
          styles.wordText,
          isProcessed && styles.processedWordText
        ]}>
          {word}
        </Text>
        {isCurrentWord && <View style={styles.dot} />}
        {isProcessed && <View style={styles.processedDot} />}
      </View>
    );
  };

  // Render binary choice buttons
  const renderBinaryButtons = () => (
    <View style={styles.binaryContainer}>
      <Text style={styles.currentLetterText}>
        Current Letter: {state.filterState.currentLetter}
      </Text>
      <Text style={styles.instructionText}>
        Choose L or R for the letter {state.filterState.currentLetter}
      </Text>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.binaryButton}
          onPress={() => handleBinaryChoice('L')}
          activeOpacity={0.7}
        >
          <Text style={styles.binaryButtonText}>L</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.binaryButton}
          onPress={() => handleBinaryChoice('R')}
          activeOpacity={0.7}
        >
          <Text style={styles.binaryButtonText}>R</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.choiceHistoryText}>
        Choices: {state.filterState.sequence.join(' → ')}
      </Text>
    </View>
  );

  // Render word pools
  const renderWordPools = () => (
    <View style={styles.wordPoolsContainer}>
      <View style={styles.poolSection}>
        <Text style={styles.poolTitle}>Left Pattern Words ({state.filterState.leftWords.length})</Text>
        <ScrollView style={styles.poolScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.poolWords}>
            {state.filterState.leftWords.join(', ')}
          </Text>
        </ScrollView>
      </View>
      
      <View style={styles.poolSection}>
        <Text style={styles.poolTitle}>Right Pattern Words ({state.filterState.rightWords.length})</Text>
        <ScrollView style={styles.poolScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.poolWords}>
            {state.filterState.rightWords.join(', ')}
          </Text>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Top-right home button */}
      <TouchableOpacity style={styles.homeButton} onPress={navigateToHome}>
        <Text style={styles.homeButtonText}>🏠</Text>
      </TouchableOpacity>
      
      {/* Main content area */}
      <TouchableOpacity 
        style={styles.mainContent} 
        onPress={handleScreenTap}
        activeOpacity={1}
      >
        {!showChatGPT ? (
          <View style={styles.initialState}>
            <Text style={styles.initialText}>Tap anywhere to start</Text>
          </View>
        ) : (
          <View style={styles.chatGPTInterface}>
            {/* ChatGPT header */}
            <View style={styles.chatGPTHeader}>
              <Text style={styles.chatGPTTitle}>ChatGPT</Text>
              <Text style={styles.chatGPTSubtitle}>AI Assistant</Text>
            </View>
            
            {/* Words display with dots */}
            <View style={styles.wordsDisplay}>
              <Text style={styles.wordsTitle}>
                Here are 10 random words:
              </Text>
              <View style={styles.wordsList}>
                {PREDEFINED_WORDS.map((word, index) => 
                  renderWordWithDot(word, index)
                )}
              </View>
            </View>
            
            {/* Letter sequence info */}
            <View style={styles.sequenceInfo}>
              <Text style={styles.sequenceText}>
                Letter Sequence: {LETTER_SEQUENCE}
              </Text>
              <Text style={styles.progressText}>
                Progress: {state.filterState.currentLetterIndex + 1} / {LETTER_SEQUENCE.length}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
      
      {/* Bottom 40% - Binary choice interface */}
      {showChatGPT && (
        <View style={styles.bottomSection}>
          {!state.filterState.isComplete ? (
            renderBinaryButtons()
          ) : (
            <View style={styles.gameCompleteContainer}>
              <Text style={styles.gameCompleteText}>Game Complete!</Text>
              <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
                <Text style={styles.playAgainButtonText}>Play Again</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Word pools display */}
          {gameStarted && renderWordPools()}
        </View>
      )}
      
      {/* Word list overlay */}
      {showWordList && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayTitle}>Remaining Words</Text>
            <ScrollView style={styles.overlayScroll}>
              <Text style={styles.overlayWords}>
                {state.filterState.leftWords.join('\n')}
              </Text>
            </ScrollView>
            <TouchableOpacity 
              style={styles.closeOverlayButton} 
              onPress={() => setShowWordList(false)}
            >
              <Text style={styles.closeOverlayButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  homeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1000,
    padding: 10,
  },
  homeButtonText: {
    fontSize: 24,
  },
  mainContent: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  initialState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {
    color: '#FFFFFF',
    fontSize: 18,
    opacity: 0.7,
  },
  chatGPTInterface: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  chatGPTHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  chatGPTTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chatGPTSubtitle: {
    color: '#888',
    fontSize: 14,
  },
  wordsDisplay: {
    marginBottom: 20,
  },
  wordsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  wordsList: {
    gap: 8,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  wordText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  processedWordText: {
    color: '#666',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
  },
  processedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666',
    marginLeft: 10,
  },
  sequenceInfo: {
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  sequenceText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 5,
  },
  progressText: {
    color: '#888',
    fontSize: 12,
  },
  bottomSection: {
    flex: 0.4,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#333',
    padding: 20,
  },
  binaryContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentLetterText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructionText: {
    color: '#CCC',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 20,
  },
  binaryButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    paddingVertical: 25,
    paddingHorizontal: 40,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  binaryButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  choiceHistoryText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  gameCompleteContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  gameCompleteText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  playAgainButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  wordPoolsContainer: {
    flex: 1,
    gap: 15,
  },
  poolSection: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  poolTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  poolScroll: {
    flex: 1,
  },
  poolWords: {
    color: '#CCC',
    fontSize: 12,
    lineHeight: 18,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  overlayContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#333',
  },
  overlayTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  overlayScroll: {
    flex: 1,
    marginBottom: 15,
  },
  overlayWords: {
    color: '#CCC',
    fontSize: 14,
    lineHeight: 20,
  },
  closeOverlayButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeOverlayButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});
