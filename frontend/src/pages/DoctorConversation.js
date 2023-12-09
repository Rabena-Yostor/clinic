import React, { useState } from 'react';
import axios from 'axios'; // You need to install axios or use another HTTP library

const ConversationPageDoctor = () => {
    const [receiverName, setReceiverName] = useState('');
    const [conversation, setConversation] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversationId, setConversationId] = useState('');
    const handleReceiverNameChange = (event) => {
        setReceiverName(event.target.value);
    };

    const handleGetConversation = async () => {
        try {
            const senderName = localStorage.getItem('username');
            // Assuming you have an API endpoint to retrieve the conversation
            const response = await axios.post('/api/doctors/getConversationDoctor', {
                senderName: senderName, // Replace with the actual sender's username
                recieverName: receiverName,
            });
            setConversation(response.data.messages);
            setConversationId(response.data.conversationId);
            console.log(response.data.conversationId);
        } catch (error) {
            console.error('Error fetching conversation:', error);
            // Handle error, show a message to the user, etc.
        }
    };

    const handleSendMessage = async () => {
        console.log(conversationId);
        try {
            const senderName = localStorage.getItem('username');
            // Assuming you have an API endpoint to send a message
            const response = await fetch('/api/doctors/sendMessageDoctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    conversationId: conversationId,
                    senderName: senderName,
                    text: newMessage,
                    
                }),
            });


            // Optionally, you can refresh the conversation after sending a message
            handleGetConversation();

            // Clear the message input field
            setNewMessage('');
        } catch (error) {
            console.error('Error Here:', error);
            // Handle error, show a message to the user, etc.
        }
    };

    return (
        <div>
            <div>
                <label>Receiver Username:</label>
                <input type="text" value={receiverName} onChange={handleReceiverNameChange} />
                <button onClick={handleGetConversation}>Get Conversation</button>
            </div>
            <div>
                <h3>Conversation:</h3>
                <ul>
                    {conversation.map((message) => (
                        <li key={message._id}>
                            <strong>{message.senderName}:</strong> {message.text}
                        </li>
                    ))}
                </ul>
            </div>


            <div>
                <label>Write a Message:</label>
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <button onClick={handleSendMessage}>Send Message</button>
            </div>
        </div>
    );
};

export default ConversationPageDoctor;
