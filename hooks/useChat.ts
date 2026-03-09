import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { getOrientationAdvice } from '../services/geminiService';
import { fetchExternalData } from '../services/externalApi';
import { MOCKED_COURSES } from '../constants';

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: "Bonjour ! Je suis votre consultant EcoOrient. Je peux vous aider à concevoir un parcours de formation qui optimise vos compétences techniques tout en minimisant votre empreinte carbone et en maximisant votre souveraineté numérique. Par quoi souhaiteriez-vous commencer ?",
  timestamp: new Date()
};

/**
 * Manages the state and operations of the AI Chat interface.
 * Decoupling this logic from the UI component allows for cleaner maintenance
 * and potential reuse of the chat logic in other parts of the application.
 */
export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([{ ...INITIAL_MESSAGE }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Ensures the chat automatically scrolls to the latest message for a fluid UX
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  /**
   * Processes the user's message and retrieves an AI response.
   * Integrates external data and local course context for a personalized advice.
   */
  const sendMessage = useCallback(async (text: string = input) => {
    const messageToSend = text.trim();
    if (!messageToSend) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Enrichment of the prompt with real-time external data for higher accuracy
      const external = await fetchExternalData(messageToSend);
      const advice = await getOrientationAdvice(messageToSend, MOCKED_COURSES, external);

      const botMsg: ChatMessage = {
        role: 'assistant',
        content: advice,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
    } finally {
      setIsTyping(false);
    }
  }, [input]);

  /**
   * Resets the conversation to its initial state.
   * Useful for users who want to start a fresh orientation path.
   */
  const resetChat = useCallback(() => {
    setMessages([{ ...INITIAL_MESSAGE, timestamp: new Date() }]);
    setInput('');
    setIsTyping(false);
  }, []);

  return {
    messages,
    input,
    setInput,
    isTyping,
    scrollRef,
    sendMessage,
    resetChat
  };
};
