$(document).ready(function() {
    const socket = new WebSocket('ws://localhost:3000'); // WebSocket server URL

    socket.onopen = function() {
        console.log('Connected to chat server');
    };

    socket.onmessage = function(event) {
        const message = JSON.parse(event.data);
        displayMessage(message);
    };

    $('#send-btn').on('click', function() {
        const messageInput = $('#message-input');
        const message = messageInput.val().trim();

        if (message !== '') {
            const messageObj = {
                text: message,
                timestamp: new Date().toLocaleString()
            };
            socket.send(JSON.stringify(messageObj));
            displayMessage(messageObj);
            messageInput.val('');
        }
    });

    function displayMessage(message) {
        const chatMessages = $('#chat-messages');
        const newMessage = `<div><strong>${message.timestamp}</strong>: ${message.text}</div>`;
        chatMessages.append(newMessage);
        chatMessages.scrollTop(chatMessages[0].scrollHeight);
    }
});