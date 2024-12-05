import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import StandardBackground from '../shared/components/StandardBackground';
import { getMoviesByTitle } from '../api/movies';
import axios from 'axios';
import { OPENAI_API_KEY } from '../config/openai-api-keys';
import { useNavigation } from "@react-navigation/native";
import ChatInput from '../entities/Chatbot/ui/ChatInput';
import ChatMessages from '../entities/Chatbot/ui/ChatMessages';

export default function ChatbotChattingPage() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  const handleFetchMoviesByTitle = async () => {
    try {
      const title = "타이타닉";
      const moviesList = await getMoviesByTitle(title);

      if (moviesList.length > 0) {
        navigation.navigate("ChatbotResultPage", { movie: moviesList[0] });
      } else {
        console.log("No movies found for the given title.");
      }
    } catch (error) {
      console.error("Error fetching movies by title:", error);
    }
  };

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
