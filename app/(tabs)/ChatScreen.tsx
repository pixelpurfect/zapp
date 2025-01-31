// src/components/ChatScreen.tsx
import React, { useState, useEffect } from 'react';
import { FlatList, TextInput, View, Button, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase/Config';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import MessageItem from '../../components/MessageItem';

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [userId, setUserId] = useState<string>(''); // Replace with actual user id (customer or delivery person)

  // Set userId here (you can use Firebase Auth to get the current user ID)
  useEffect(() => {
    // Example, replace with your actual logic
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
    }
  }, []);

  useEffect(() => {
    // Listen for new messages in Firestore collection
    const messagesRef = collection(db, 'chats');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedMessages: any[] = [];
      querySnapshot.forEach((doc) => {
        loadedMessages.push(doc.data());
      });
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      await addDoc(collection(db, 'chats'), {
        message,
        senderId: userId,
        createdAt: new Date(),
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageItem
            message={item.message}
            isSender={item.senderId === userId}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
});

export default ChatScreen;
