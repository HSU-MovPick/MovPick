import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function ChatInput({ userInput, setUserInput, sendMessageToAI, isLoading }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="'뭅'에게 물어보세요."
        value={userInput}
        onChangeText={setUserInput}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          (isLoading || !userInput.trim()) && styles.sendButtonDisabled,
        ]}
        onPress={sendMessageToAI}
        disabled={isLoading || !userInput.trim()}
      >
        <Image
          source={require('../../../assets/chatbot/send.png')}
          style={styles.sendButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 360, // 가로 길이 유지
    marginBottom: -15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginRight:10,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(199, 54, 89, 0.8)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(199, 54, 89, 0.3)',
  },
  sendButtonImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
