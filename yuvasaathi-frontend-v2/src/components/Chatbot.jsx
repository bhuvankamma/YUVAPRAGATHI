import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Mic, StopCircle, Loader2 } from 'lucide-react';

// === Configuration and Constants (FIXED) ===
const OLLAMA_CHAT_ENDPOINT = 'https://yuvasaathi-backend-v2.vercel.app/api/chat';
const OLLAMA_MODEL_NAME = "tinyllama";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const isSpeechRecognitionSupported = !!SpeechRecognition;

// Helper component for Bot's Avatar
const BotAvatar = () => (
  <div className="w-7 h-7 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 flex-shrink-0">
    <Bot size={14} />
  </div>
);

const LoadingDots = () => (
  <div className="flex items-center space-x-1 py-1">
    <div className="dot-flashing-blue" />
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am your AI assistant for the Bihar job portal. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showScrollGreeting, setShowScrollGreeting] = useState(false); // 👈 New state
  const [hideGreeting, setHideGreeting] = useState(false); // 👈 For manual close
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll & textarea resize
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 80)}px`;
    }
  }, [messages, input]);

  // Cleanup voice recognition
  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  // 👇 Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 150;
      if (scrollPosition >= threshold && !hideGreeting && !isOpen) {
        setShowScrollGreeting(true);
      } else {
        setShowScrollGreeting(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideGreeting, isOpen]);

  const toggleChatbot = () => {
    setIsOpen(prev => {
      if (prev) stopListening();
      return !prev;
    });
    setShowScrollGreeting(false); // hide greeting when chatbot opens
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const startListening = () => {
    if (!isSpeechRecognitionSupported) {
      alert("Sorry, your browser doesn't support voice commands.");
      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setInput('Listening...');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSendMessage({ preventDefault: () => {} }, transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setInput(`Error: ${event.error}. Try again.`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (input === 'Listening...') setInput('');
      };

      recognitionRef.current = recognition;
    }

    setInput('');
    recognitionRef.current.start();
  };

  // Stream response
  const streamResponse = async (messageContent) => {
    let accumulatedResponse = '';
    let initialPlaceholderAdded = false;

    const updateLastBotMessage = (content, isStreaming = false) => {
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        const lastIndex = newMessages.length - 1;
        if (newMessages[lastIndex] && newMessages[lastIndex].role === 'bot') {
          newMessages[lastIndex].content = content;
          if (isStreaming) newMessages[lastIndex].isStreaming = true;
          else delete newMessages[lastIndex].isStreaming;
        } else {
          newMessages.push({ role: 'bot', content });
        }
        return newMessages;
      });
    };

    try {
      setMessages(prev => [...prev, { role: 'bot', content: '', isStreaming: true }]);
      initialPlaceholderAdded = true;

      const response = await fetch(OLLAMA_CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: OLLAMA_MODEL_NAME, prompt: messageContent }),
      });

      if (!response.ok) throw new Error(await response.text() || `Error ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulatedResponse += chunk;
        updateLastBotMessage(accumulatedResponse, true);
      }

      updateLastBotMessage(accumulatedResponse.trim() || "No response received.");
    } catch (error) {
      console.error('Chat API error:', error);
      const msg = `Connection Error: ${error.message.substring(0, 80)}...`;
      if (initialPlaceholderAdded) updateLastBotMessage(msg);
      else setMessages(prev => [...prev, { role: 'bot', content: msg }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle message send
  const handleSendMessage = async (e, voiceInput = null) => {
    e.preventDefault();
    stopListening();

    const messageContent = voiceInput !== null ? voiceInput : input;
    if (!messageContent.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: messageContent }]);
    setInput('');
    setIsLoading(true);
    await streamResponse(messageContent);
  };

  return (
    <>
      {/* Scroll Greeting Bubble 👇 */}
      {showScrollGreeting && !isOpen && !hideGreeting && (
        <div className="fixed bottom-20 right-6 z-40 bg-white border border-gray-200 shadow-lg rounded-2xl px-3 py-2 flex items-center space-x-2 animate-fadeInUp max-w-[240px] text-sm text-gray-700">
          <Bot size={18} className="text-blue-600 flex-shrink-0" />
          <span className="flex-1">Hi there! How can I help you?</span>
          <button
            onClick={() => setHideGreeting(true)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Chatbot Toggle Button */}
      <button
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={toggleChatbot}
        aria-label="Toggle Chatbot"
      >
        <Bot size={24} />
      </button>

      {/* Chatbot Window */}
      <div
        className={`fixed bottom-14 right-4 z-40 w-full max-w-[320px] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          border border-gray-100 top-[140px] max-h-[calc(100vh-160px)]`}
      >
        {/* Header */}
        <div className="bg-white text-gray-800 p-3 border-b border-gray-200 rounded-t-lg flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <Bot size={20} className="text-blue-600" />
            <h3 className="font-semibold text-sm">AI Job Assistant</h3>
            {isLoading && messages[messages.length - 1]?.content === '' && (
              <Loader2 size={14} className="animate-spin text-blue-500" />
            )}
          </div>
          <button
            onClick={toggleChatbot}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50 chat-scrollbar text-xs">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && <BotAvatar />}
              <div
                className={`max-w-[85%] p-2 rounded-lg shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                }`}
              >
                {msg.role === 'bot' && msg.isStreaming && msg.content === '' ? <LoadingDots /> : msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-2 bg-white border-t border-gray-100">
          <div className="relative flex items-end">
            <textarea
              ref={textAreaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              rows={1}
              className="w-full pl-3 pr-[75px] py-2 text-sm resize-none border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white shadow-inner placeholder-gray-400 overflow-hidden"
              placeholder={isListening ? "Listening..." : "Type your message..."}
              disabled={isLoading || isListening}
            />
            <div className="absolute right-0 bottom-0 top-0 flex items-center pr-1 space-x-0.5">
              {isSpeechRecognitionSupported && (
                <button
                  type="button"
                  onClick={startListening}
                  disabled={isLoading}
                  className={`p-1.5 rounded-full transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {isListening ? <StopCircle size={18} /> : <Mic size={18} />}
                </button>
              )}
              <button
                type="submit"
                className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-md"
                disabled={isLoading || !input.trim() || isListening}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .chat-scrollbar::-webkit-scrollbar { width: 6px; }
        .chat-scrollbar::-webkit-scrollbar-thumb { background: #c5c5c5; border-radius: 3px; }
        .chat-scrollbar::-webkit-scrollbar-thumb:hover { background: #999; }
        .dot-flashing-blue {
          position: relative;
          width: 6px; height: 6px; border-radius: 3px;
          background-color: #3b82f6;
          animation: dot-flashing 1s infinite alternate;
        }
        .dot-flashing-blue::before, .dot-flashing-blue::after {
          content: ''; position: absolute; top: 0; width: 6px; height: 6px; border-radius: 3px;
          background-color: #3b82f6; animation: dot-flashing 1s infinite alternate;
        }
        .dot-flashing-blue::before { left: -10px; animation-delay: 0.2s; }
        .dot-flashing-blue::after { left: 10px; animation-delay: 0.4s; }
        @keyframes dot-flashing {
          0% { background-color: #3b82f6; }
          50%, 100% { background-color: rgba(59,130,246,0.3); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
