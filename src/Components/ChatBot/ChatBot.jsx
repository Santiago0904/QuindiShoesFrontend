import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import coco_animated from "../../assets/images/coco_animated1.webm";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const videoRef = useRef(null);

  const toggleChat = () => {
    setChatVisible(prev => {
      const newState = !prev;

      if (!newState && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }

      return newState;
    });
  };

  const handleUserInput = async () => {
    const newMessage = { role: 'user', content: userInput };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setUserInput("");

    try {

      

      const response = await axios.post("https://quindishoes-backend-3.onrender.com/api/chat", {

        question: userInput,
        history: updatedMessages,
      });
      const assistantMessage = { role: 'assistant', content: response.data.reply };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error en la comunicación con el backend:', error);
    }
  };

  // Nuevo useEffect para enviar productos a la IA al cargar el chat
  useEffect(() => {
    if (chatVisible) {
      axios.post("https://quindishoes-backend-3.onrender.com/enviarProductosAI")
        .then(response => {
          console.log('Productos enviados a la IA:', response.data);
          // Puedes agregar un mensaje o lógica que dependa de la respuesta de la IA aquí
        })
        .catch(error => {
          console.error('Error enviando productos a la IA:', error);
        });
    }
  }, [chatVisible]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      {/* Botón animado del chatbot */}
      <motion.div
        onClick={toggleChat}
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '120px',
          height: '120px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        <video
          ref={videoRef}
          src={coco_animated}
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      <AnimatePresence>
        {chatVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              bottom: '140px',
              right: '20px',
              width: '340px',
              height: '460px',
              background: 'linear-gradient(to bottom, #fff, #f9f9f9)',
              borderRadius: '20px',
              boxShadow: '0px 8px 20px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #eee',
              zIndex: 999,
            }}
          >
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    marginBottom: '10px',
                    maxWidth: '85%',
                    position: 'relative',
                  }}
                >
                  <span style={{ fontSize: '22px', margin: msg.role === 'user' ? '0 0 0 8px' : '0 8px 0 0' }}>
                    {msg.role === 'user' ? '👤' : '🤖'}
                  </span>
                  <div style={{
                    backgroundColor: msg.role === 'user' ? '#fbd3e9' : '#d2f8d2',
                    padding: '10px 15px',
                    borderRadius: '20px',
                    color: '#333',
                    wordBreak: 'break-word',
                  }}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div style={{
              padding: '10px 15px',
              borderTop: '1px solid #ddd',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fff'
            }}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
                placeholder="Escribe un mensaje..."
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '20px',
                  border: '1px solid #ccc',
                  marginRight: '10px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleUserInput}
                style={{
                  backgroundColor: '#000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;