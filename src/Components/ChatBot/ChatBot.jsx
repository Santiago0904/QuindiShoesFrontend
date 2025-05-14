import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const handleUserInput = async () => {
  const newMessage = { role: 'user', content: userInput };
  setMessages([...messages, newMessage]);
  setUserInput("");

  try {
    const response = await axios.post("http://localhost:3000/api/chat", {
      question: userInput, // Esta es la pregunta del usuario
      history: messages,   // Esta es la historia del chat
    });

    const assistantMessage = { role: 'assistant', content: response.data.reply };
    setMessages([...messages, newMessage, assistantMessage]);
  } catch (error) {
    console.error('Error en la comunicación con el backend:', error);
  }
};

  return (
    <div>
      {/* Botón flotante */}
      <button 
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          padding: '15px',
          fontSize: '20px',
          boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
          cursor: 'pointer',
        }}
      >
        Chat
      </button>

      {/* Ventana de chat */}
      {chatVisible && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '300px',
          height: '400px',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '10px',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        }}>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {messages.map((message, index) => (
              <div key={index} style={{ margin: '10px 0' }}>
                <strong>{message.role === 'user' ? 'Tú' : 'Asistente'}:</strong>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={{
                width: '80%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <button 
              onClick={handleUserInput}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '8px 12px',
                cursor: 'pointer',
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
