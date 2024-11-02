import { useState, useEffect, useRef } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {GEMINI_API_KEY} from "@env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import backend from "../../utils/Backend";
import { ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Speech from 'expo-speech';
import { useUser } from "../../utils/UserContext";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const Index = () => {
    const {t, i18n} = useTranslation();
    const {userRole, setUserRole} = useUser();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [speaking, setSpeaking] = useState(false);
    const chatRef = useRef(null);
    const scrollViewRef = useRef();

    useEffect(() => {
        fetchElderlyData();
    }, []);

    const fetchElderlyData = async () => {
        try {
            const now = new Date();
            const currentDate = now.toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const currentTime = now.toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            const response = await backend.post("/api/general_info/", { senior_id: 1 });
            const data = JSON.stringify(response.data);
            
            const seniorPrompt = `You are talking to an elderly person.
                Current date is ${currentDate} and time is ${currentTime}. Just use plain text.
                Talk friendly. Talk ${i18n.language}. Give a detailed asummary of what they did and what they should do this month.
                The monthly summary of the elderly person's health and activities is as follows: ${data}`;
            
            const caregiverPrompt = `You are talking to a caregiver.
                Current date is ${currentDate} and time is ${currentTime}. Just use plain text.
                Give a status report on the elderly person.
                Talk ${i18n.language}. The monthly summary of the elderly person's health and activities is as follows: ${data}`;

            chatRef.current = model.startChat({
                history: [],
            });
            
            let result = await chatRef.current.sendMessage(userRole === "caregiver" ? caregiverPrompt : seniorPrompt);
            let messages = [{ text: result.response.text(), sender: "model", id: Date.now().toString() }];
            setMessages(messages);
        } catch (err) {
            setError(t('dataLoadError'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (message) => {
        if (!message.trim()) return;
        
        setMessages((prevMessages) => [...prevMessages, { 
            text: message, 
            sender: "user",
            id: Date.now().toString()
        }]);
        
        setLoading(true);
        try {
            const response = await chatRef.current.sendMessage(message);
            setMessages((prevMessages) => [...prevMessages, { 
                text: response.response.text(), 
                sender: "model",
                id: Date.now().toString()
            }]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const speak = (text) => {
        if (speaking) {
            Speech.stop();
            setSpeaking(false);
        } else {
            setSpeaking(true);
            Speech.speak(text, { onDone: () => setSpeaking(false), language: i18n.language  });
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={"padding"}
            style={styles.container}
        >
            <ScrollView
                style={styles.messageList}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {messages.map((message) => (
                    <View key={message.id}>
                        <TouchableOpacity style={[
                                styles.speakerButton,
                                message.sender === "user" ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }
                            ]}
                            onPress={() => speak(message.text)}>
                        {speaking ?
                            <ActivityIndicator size="small" color="#0000ff" />
                        :
                            <Icon name="volume-up" size={24} />
                        }
                        </TouchableOpacity>
                        <View
                            style={[
                                styles.messageBubble,
                                message.sender === "user" ? styles.userBubble : styles.modelBubble
                            ]}
                        >
                            <Text style={[
                                styles.messageText,
                                message.sender === "user" ? styles.userText : styles.modelText
                            ]}>
                                {message.text}
                            </Text>
                        </View>
                    </View>
                ))}
                {loading && <ActivityIndicator style={styles.loader} color="#0066cc" />}
            </ScrollView>

            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
    
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        loading && styles.inputDisabled
                    ]}
                    value={inputMessage}
                    onChangeText={setInputMessage}
                    placeholder={t("typeAMessage")}
                    multiline
                    editable={!loading}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        loading && styles.sendButtonDisabled
                    ]}
                    onPress={() => {
                        sendMessage(inputMessage);
                        setInputMessage('');
                    }}
                    disabled={loading}
                >
                    <Icon name="send" size={20} style={styles.sendButtonText} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    speakerButton: {
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        width: 40,
        height: 40,
        alignItems: 'center',
        margin: 10
    },
    messageList: {
        flex: 1,
        padding: 15,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 20,
        marginVertical: 5,
    },
    userBubble: {
        backgroundColor: '#0084ff',
        alignSelf: 'flex-end',
        marginLeft: '20%',
    },
    modelBubble: {
        backgroundColor: '#e9ecef',
        alignSelf: 'flex-start',
        marginRight: '20%',
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    userText: {
        color: '#ffffff',
    },
    modelText: {
        color: '#000000',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: '#0084ff',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#ffffff',
        fontSize: 20,
    },
    loader: {
        marginVertical: 20,
    },
    inputDisabled: {
        backgroundColor: '#e5e5e5',
        color: '#999'
    },
    sendButtonDisabled: {
        backgroundColor: '#cccccc'
    },
    errorContainer: {
        backgroundColor: '#ffebee',
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#ef5350'
    },
    errorText: {
        color: '#c62828',
        fontSize: 14
    },
});

export default Index;