import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  Alert,
  Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../contexts/AppContext';
import { 
  DEFAULT_WORD_LISTS, 
  DEFAULT_LETTER_SEQUENCES,
  PSYCHOLOGICAL_QUESTIONS,
  PSYCHOLOGICAL_ANSWERS
} from '../utils/defaultData';

export default function SettingsScreen() {
  const router = useRouter();
  const { state, selectWordList, updatePreferences } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'wordlists' | 'sequences' | 'preferences' | 'profiling'>('wordlists');
  const [customWordListName, setCustomWordListName] = useState('');
  const [customWordListContent, setCustomWordListContent] = useState('');
  const [customSequenceName, setCustomSequenceName] = useState('');
  const [customSequence, setCustomSequence] = useState('');
  const [psychologicalAnswers, setPsychologicalAnswers] = useState<string[]>(new Array(5).fill(''));

  const navigateToHome = () => {
    router.push('/');
  };

  const handleWordListSelection = (wordList: any) => {
    selectWordList(wordList);
    Alert.alert('Success', `Selected word list: ${wordList.name}`);
  };

  const handleCustomWordListSubmit = () => {
    if (!customWordListName.trim() || !customWordListContent.trim()) {
      Alert.alert('Error', 'Please fill in both name and content');
      return;
    }

    const words = customWordListContent.split('\n').filter(word => word.trim().length > 0);
    if (words.length < 3) {
      Alert.alert('Error', 'Please provide at least 3 words');
      return;
    }

    const customList = {
      id: `custom-${Date.now()}`,
      name: customWordListName.trim(),
      words: words.map(word => word.trim()),
      isCustom: true
    };

    // Add to custom lists (this would need to be implemented in the context)
    Alert.alert('Success', `Created custom word list: ${customList.name} with ${words.length} words`);
    
    // Reset form
    setCustomWordListName('');
    setCustomWordListContent('');
  };

  const handleCustomSequenceSubmit = () => {
    if (!customSequenceName.trim() || !customSequence.trim()) {
      Alert.alert('Error', 'Please fill in both name and sequence');
      return;
    }

    if (customSequence.length < 3 || customSequence.length > 50) {
      Alert.alert('Error', 'Sequence must be between 3 and 50 characters');
      return;
    }

    if (!/^[A-Za-z]+$/.test(customSequence)) {
      Alert.alert('Error', 'Sequence must contain only letters');
      return;
    }

    Alert.alert('Success', `Created custom sequence: ${customSequenceName}`);
    
    // Reset form
    setCustomSequenceName('');
    setCustomSequence('');
  };

  const handlePsychologicalAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...psychologicalAnswers];
    newAnswers[questionIndex] = answer;
    setPsychologicalAnswers(newAnswers);
  };

  const generatePsychologicalProfile = () => {
    const answeredQuestions = psychologicalAnswers.filter(answer => answer.trim().length > 0);
    if (answeredQuestions.length < 3) {
      Alert.alert('Error', 'Please answer at least 3 questions to generate a profile');
      return;
    }

    // Simple profile generation logic
    const profile = `Based on your answers, you appear to be a ${answeredQuestions.length >= 4 ? 'balanced' : 'focused'} individual who ${answeredQuestions[0] ? 'prefers careful analysis' : 'trusts intuition'}. Your social approach is ${answeredQuestions[1] ? 'outgoing and exploratory' : 'comfortable with familiarity'}.`;
    
    Alert.alert('Psychological Profile', profile);
  };

  const renderWordListsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Default Word Lists</Text>
      {DEFAULT_WORD_LISTS.map((wordList) => (
        <TouchableOpacity
          key={wordList.id}
          style={[
            styles.listItem,
            state.selectedWordList.id === wordList.id && styles.selectedItem
          ]}
          onPress={() => handleWordListSelection(wordList)}
        >
          <Text style={styles.listItemText}>{wordList.name}</Text>
          <Text style={styles.listItemCount}>{wordList.words.length} words</Text>
        </TouchableOpacity>
      ))}
      
      <Text style={styles.sectionTitle}>Custom Word Lists</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Word List Name"
          placeholderTextColor="#666"
          value={customWordListName}
          onChangeText={setCustomWordListName}
        />
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Enter words (one per line)"
          placeholderTextColor="#666"
          value={customWordListContent}
          onChangeText={setCustomWordListContent}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleCustomWordListSubmit}>
          <Text style={styles.submitButtonText}>Create Custom List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSequencesTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Default Letter Sequences</Text>
      {DEFAULT_LETTER_SEQUENCES.map((sequence) => (
        <View key={sequence.id} style={styles.listItem}>
          <Text style={styles.listItemText}>{sequence.name}</Text>
          <Text style={styles.listItemCount}>{sequence.sequence}</Text>
        </View>
      ))}
      
      <Text style={styles.sectionTitle}>Custom Letter Sequences</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Sequence Name"
          placeholderTextColor="#666"
          value={customSequenceName}
          onChangeText={setCustomSequenceName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Letter Sequence (e.g., ABCDEF)"
          placeholderTextColor="#666"
          value={customSequence}
          onChangeText={setCustomSequence}
          autoCapitalize="characters"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleCustomSequenceSubmit}>
          <Text style={styles.submitButtonText}>Create Custom Sequence</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPreferencesTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>App Preferences</Text>
      
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceLabel}>Dark Theme</Text>
        <Switch
          value={state.preferences.theme === 'dark'}
          onValueChange={(value) => updatePreferences({ theme: value ? 'dark' : 'light' })}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={state.preferences.theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceLabel}>Export Format</Text>
        <View style={styles.exportOptions}>
          {['txt', 'csv', 'json'].map((format) => (
            <TouchableOpacity
              key={format}
              style={[
                styles.exportOption,
                state.preferences.exportFormat === format && styles.selectedExportOption
              ]}
              onPress={() => updatePreferences({ exportFormat: format as any })}
            >
              <Text style={[
                styles.exportOptionText,
                state.preferences.exportFormat === format && styles.selectedExportOptionText
              ]}>
                {format.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderProfilingTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Psychological Profiling</Text>
      <Text style={styles.profilingDescription}>
        Answer these questions to generate a psychological profile based on your binary choices.
      </Text>
      
      {PSYCHOLOGICAL_QUESTIONS.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question}</Text>
          <View style={styles.answerOptions}>
            {PSYCHOLOGICAL_ANSWERS[index].map((answer, answerIndex) => (
              <TouchableOpacity
                key={answerIndex}
                style={[
                  styles.answerOption,
                  psychologicalAnswers[index] === answer && styles.selectedAnswerOption
                ]}
                onPress={() => handlePsychologicalAnswer(index, answer)}
              >
                <Text style={[
                  styles.answerOptionText,
                  psychologicalAnswers[index] === answer && styles.selectedAnswerOptionText
                ]}>
                  {answer}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      
      <TouchableOpacity style={styles.submitButton} onPress={generatePsychologicalProfile}>
        <Text style={styles.submitButtonText}>Generate Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={navigateToHome}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { key: 'wordlists', label: 'Word Lists' },
            { key: 'sequences', label: 'Sequences' },
            { key: 'preferences', label: 'Preferences' },
            { key: 'profiling', label: 'Profiling' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'wordlists' && renderWordListsTab()}
        {activeTab === 'sequences' && renderSequencesTab()}
        {activeTab === 'preferences' && renderPreferencesTab()}
        {activeTab === 'profiling' && renderProfilingTab()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 60,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FFFFFF',
  },
  tabText: {
    color: '#666',
    fontSize: 16,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    gap: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#111',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedItem: {
    borderColor: '#FFFFFF',
    backgroundColor: '#222',
  },
  listItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  listItemCount: {
    color: '#666',
    fontSize: 14,
  },
  inputContainer: {
    gap: 15,
  },
  textInput: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#111',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  preferenceLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  exportOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  exportOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#666',
  },
  selectedExportOption: {
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
  exportOptionText: {
    color: '#666',
    fontSize: 14,
  },
  selectedExportOptionText: {
    color: '#000000',
  },
  profilingDescription: {
    color: '#CCC',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  questionContainer: {
    gap: 10,
    marginBottom: 20,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  answerOptions: {
    gap: 10,
  },
  answerOption: {
    padding: 12,
    backgroundColor: '#111',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedAnswerOption: {
    borderColor: '#FFFFFF',
    backgroundColor: '#222',
  },
  answerOptionText: {
    color: '#CCC',
    fontSize: 14,
  },
  selectedAnswerOptionText: {
    color: '#FFFFFF',
  },
});
