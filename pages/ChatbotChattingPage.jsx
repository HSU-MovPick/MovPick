import React, { useState, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StandardBackground from '../shared/components/StandardBackground';
import axios from 'axios';
import { OPENAI_API_KEY } from '../config/openai-api-keys';
import { TouchableOpacity } from 'react-native';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';

// 나중에.... 컴포넌트로 분리할거임,,,, 일단 구현 몬저 하구,,,,
export default function ChatbotChattingPage() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const sendMessageToAI = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: newMessages.map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
          })),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setMessages((prev) => [...prev, { sender: 'ai', text: '오류 발생. 다시 시도해주세요.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StandardBackground>
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(); // 키보드 내려가기
        scrollViewRef.current?.scrollToEnd({ animated: true }); // 스크롤 최하단으로 가도록
      }}
    >
      {/* 키보드 움직일때 화면 설정하는 방법 */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={50} // 인풋 필드 높이 (37) + 여유 공간 (10~15)
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContentContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.sender === 'user' ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text style={message.sender === 'ai' ? styles.aiMessageText : styles.messageText}>
                {message.text}
              </Text>
            </View>
          ))}
        </ScrollView>

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
              source={require('../assets/chatbot/send.png')}
              style={styles.sendButtonImage}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    </StandardBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width:360,
    flex: 1,
  },
  chatContainer: {
    marginLeft:12,
    marginRight:12,
    flex: 1,
    marginBottom: 8,
  },
  chatContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 13,
    marginBottom: 8,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#f0f0f0',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#A91D3A',
  },
  messageText: {
    fontSize: 16,
  },
  aiMessageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    marginBottom:-15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
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
