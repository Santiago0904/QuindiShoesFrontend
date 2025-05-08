import React, { useState } from 'react';
import axios from 'axios';

const ChatWidget = () => {
    const [open, setOpen] = useState(false); // Estado para mostrar/ocultar el chat
    const [messages, setMessages] = useState([]); // Mensajes del chat
    const [input, setInput] = useState(''); // Entrada del usuario

    const toggleChat = () => setOpen(!open); // Alternar visibilidad del chat

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]); // Agregar mensaje del usuario

        try {
            console.log('Enviando mensaje al microservicio...');
            const response = await axios.post('/chatBot', {
                question: input,
                history: messages // Enviar el historial de mensajes
            });

            const botMessage = { sender: 'bot', text: response.data.reply };
            setMessages(prev => [...prev, botMessage]); // Agregar mensaje del bot
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Error al conectar con el microservicio.' }]);
        }

        setInput(''); // Limpiar input
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <button
                onClick={toggleChat}
                className="bg-blue-600 text-white rounded-full w-12 h-12 text-xl shadow-lg hover:bg-blue-700 transition"
            >
                💬
            </button>

            {open && (
                <div className="w-[300px] h-[400px] bg-white border border-gray-300 p-3 mt-2 rounded-lg flex flex-col shadow-xl">
                    <div className="flex-1 overflow-y-auto mb-2 space-y-2">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`text-sm px-3 py-2 rounded-md max-w-[80%] ${
                                    msg.sender === 'user'
                                        ? 'bg-blue-100 text-right self-end'
                                        : 'bg-gray-100 text-left self-start'
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            className="flex-1 px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim()}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 disabled:opacity-50"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
