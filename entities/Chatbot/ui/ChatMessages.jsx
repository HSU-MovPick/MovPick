import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ChatMessages({ messages, scrollViewRef }) {
  return (
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
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    marginLeft: 12,
    marginRight: 12,
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
});
