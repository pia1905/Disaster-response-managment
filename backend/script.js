function sendMessage() {
    const userMessage = document.getElementById("user-input").value;
    if (userMessage.trim() === "") return;

    // Append user message to chat
    appendMessage("user", userMessage);

    // Clear input
    document.getElementById("user-input").value = "";

    // Send the message to the backend via an API call
    fetch('http://localhost:3000/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    })
    .then(response => response.json())
    .then(data => {
        // Append bot response to chat
        appendMessage("bot", data.response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);

    const messageContent = document.createElement("p");
    messageContent.textContent = message;

    messageElement.appendChild(messageContent);
    document.getElementById("chat-messages").appendChild(messageElement);
    
    // Scroll to the bottom of the chat
    document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;
}
