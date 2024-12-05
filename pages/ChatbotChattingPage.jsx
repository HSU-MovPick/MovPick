import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import StandardBackground from '../shared/components/StandardBackground';
import { useNavigation } from "@react-navigation/native";
import { callOpenAI } from '../entities/Chatbot/openai'; //  GPT호출 로직
import ChatInput from '../entities/Chatbot/ui/ChatInput';
import ChatMessages from '../entities/Chatbot/ui/ChatMessages';

export default function ChatbotChattingPage() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  //gpt api 호출
  const sendMessageToAI = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const { text: aiResponse, isMovieIdentified, identifiedMovieTitle } = await callOpenAI(newMessages);

      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);

      // 특정 영화가 확인되면 페이지 이동
      if (isMovieIdentified && identifiedMovieTitle) {
        console.log("identifiedMovieTitle 전달됨,", identifiedMovieTitle);
        navigation.navigate('ChatbotResultPage', { movieTitle: identifiedMovieTitle });
      }
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
          Keyboard.dismiss();
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={50}
        >
          <ChatMessages messages={messages} scrollViewRef={scrollViewRef} />
          <ChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            sendMessageToAI={sendMessageToAI}
            isLoading={isLoading}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </StandardBackground>
  );
}
