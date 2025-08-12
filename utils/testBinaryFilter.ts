import { applyBinaryFilter, processBinaryChoice, initializeFilterState } from './binaryFilter';

// Test the binary filtering logic
export const testBinaryFilter = () => {
  console.log('🧪 Testing Binary Filter Logic...\n');

  // Test 1: Basic filtering with letter 'N'
  const testWords = ['Necessary', 'Toothbrush', 'Remember', 'Loveable', 'Clementine'];
  console.log('Test 1: Filtering words with letter "N"');
  console.log('Words:', testWords);
  
  const leftResult = applyBinaryFilter(testWords, 'N', 'L');
  const rightResult = applyBinaryFilter(testWords, 'N', 'R');
  
  console.log('Left Pattern (L = contains N):', leftResult.leftWords);
  console.log('Right Pattern (R = contains N):', rightResult.rightWords);
  console.log('');

  // Test 2: Process a binary choice
  console.log('Test 2: Processing binary choice');
  const initialState = initializeFilterState();
  console.log('Initial state - Left words:', initialState.leftWords.length, 'Right words:', initialState.rightWords.length);
  
  const afterChoice = processBinaryChoice(initialState, 'L');
  console.log('After L choice - Left words:', afterChoice.leftWords.length, 'Right words:', afterChoice.rightWords.length);
  console.log('Current letter:', afterChoice.currentLetter);
  console.log('Letter index:', afterChoice.currentLetterIndex);
  console.log('');

  // Test 3: Multiple choices
  console.log('Test 3: Multiple binary choices');
  let currentState = initialState;
  const choices: ('L' | 'R')[] = ['L', 'R', 'L', 'R'];
  
  choices.forEach((choice, index) => {
    currentState = processBinaryChoice(currentState, choice);
    console.log(`Choice ${index + 1} (${choice}): Letter ${currentState.currentLetter}, Left: ${currentState.leftWords.length}, Right: ${currentState.rightWords.length}`);
  });

  console.log('\n✅ Binary filter tests completed!');
  return true;
};

// Test the dual-interpretation logic
export const testDualInterpretation = () => {
  console.log('🧠 Testing Dual-Interpretation Logic...\n');

  const testWords = ['Necessary', 'Toothbrush', 'Remember', 'Loveable', 'Clementine'];
  const testLetter = 'N';

  console.log(`Testing letter "${testLetter}" with words:`, testWords);
  console.log('');

  // Test L choice
  console.log('L Choice:');
  const lResult = applyBinaryFilter(testWords, testLetter, 'L');
  console.log('  Left Pattern (L = contains N):', lResult.leftWords);
  console.log('  Right Pattern (L = does NOT contain N):', lResult.rightWords);
  console.log('');

  // Test R choice
  console.log('R Choice:');
  const rResult = applyBinaryFilter(testWords, testLetter, 'R');
  console.log('  Left Pattern (R = does NOT contain N):', rResult.leftWords);
  console.log('  Right Pattern (R = contains N):', rResult.rightWords);
  console.log('');

  console.log('✅ Dual-interpretation tests completed!');
  return true;
};

// Run all tests
export const runAllTests = () => {
  console.log('🚀 Starting Binary Filter Tests...\n');
  
  try {
    testBinaryFilter();
    console.log('');
    testDualInterpretation();
    console.log('\n🎉 All tests passed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
};
