import React from 'react';
import {Text, StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SetupProfile from '../components/SetupProfile';

function WelcomeScreen({navigation}) {
  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.block}>
        <Text style={styles.description}>프로필을 설정하세요.</Text>
        <SetupProfile />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  title: {
    fontSize: 48,
  },
  description: {
    marginTop: 16,
    fontSize: 21,
    color: '#757575',
  },
});

export default WelcomeScreen;
