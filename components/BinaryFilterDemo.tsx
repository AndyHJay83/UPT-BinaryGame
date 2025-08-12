import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { applyBinaryFilter, processBinaryChoice, initializeFilterState } from '../utils/binaryFilter';

export default function BinaryFilterDemo() {
  const [filterState, setFilterState] = useState(initializeFilterState());
  const [currentChoice, setCurrentChoice] = useState<'L' | 'R' | null>(null);

  const handleBinaryChoice = (choice: 'L' | 'R') => {
    setCurrentChoice(choice);
    const newState = processBinaryChoice(filterState, choice);
    setFilterState(newState);
  };

  const resetDemo = () => {
    setFilterState(initializeFilterState());
    setCurrentChoice(null);
  };

  const renderWordPools = () => (
    <View style={styles.poolsContainer}>
      <View style={styles.poolSection}>
        <Text style={styles.poolTitle}>
          Left Pattern Words ({filterState.leftWords.length})
        </Text>
        <ScrollView style={styles.poolScroll}>
          <Text style={styles.poolWords}>
            {filterState.leftWords.join(', ')}
          </Text>
        </ScrollView>
      </View>
      
      <View style={styles.poolSection}>
        <Text style={styles.poolTitle}>
          Right Pattern Words ({filterState.rightWords.length})
        </Text>
        <ScrollView style={styles.poolScroll}>
          <Text style={styles.poolWords}>
            {filterState.rightWords.join(', ')}
          </Text>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Binary Filter Demo</Text>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>
          Current Letter: <Text style={styles.highlight}>{filterState.currentLetter}</Text>
        </Text>
        <Text style={styles.infoText}>
          Progress: {filterState.currentLetterIndex + 1} / {filterState.letterSequence.length}
        </Text>
        <Text style={styles.infoText}>
          Choices Made: {filterState.sequence.join(' → ')}
        </Text>
      </View>

      {!filterState.isComplete ? (
        <View style={styles.choiceSection}>
          <Text style={styles.choiceTitle}>
            Choose L or R for letter "{filterState.currentLetter}"
          </Text>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.choiceButton,
                currentChoice === 'L' && styles.selectedChoice
              ]}
              onPress={() => handleBinaryChoice('L')}
            >
              <Text style={styles.choiceButtonText}>L</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.choiceButton,
                currentChoice === 'R' && styles.selectedChoice
              ]}
              onPress={() => handleBinaryChoice('R')}
            >
              <Text style={styles.choiceButtonText}>R</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.explanation}>
            L Choice: Left pattern = contains letter, Right pattern = does NOT contain letter{'\n'}
            R Choice: Left pattern = does NOT contain letter, Right pattern = contains letter
          </Text>
        </View>
      ) : (
        <View style={styles.completeSection}>
          <Text style={styles.completeTitle}>Game Complete!</Text>
          <Text style={styles.completeText}>
            All letters processed. Final word pools are shown below.
          </Text>
        </View>
      )}

      {renderWordPools()}

      <TouchableOpacity style={styles.resetButton} onPress={resetDemo}>
        <Text style={styles.resetButtonText}>Reset Demo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 5,
  },
  highlight: {
    color: '#00FF00',
    fontWeight: 'bold',
  },
  choiceSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  choiceTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 20,
  },
  choiceButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedChoice: {
    backgroundColor: '#FFFFFF',
  },
  choiceButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  explanation: {
    color: '#CCC',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  completeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  completeTitle: {
    color: '#00FF00',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  completeText: {
    color: '#CCC',
    fontSize: 14,
    textAlign: 'center',
  },
  poolsContainer: {
    flex: 1,
    gap: 15,
    marginBottom: 20,
  },
  poolSection: {
    flex: 1,
    backgroundColor: '#111',
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
  resetButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});
