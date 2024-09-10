// document.getElementById("data-form").addEventListener("submit", function(event) {
//     event.preventDefault();
//     // Logic to handle form submission and send data to backend
//     alert("Data submitted successfully!");
// });
// document.getElementById("data-form").addEventListener("submit", async function(event) {
//     event.preventDefault();
//     const info = event.target[0].value;
//     const location = event.target[1].value;

//     const response = await fetch('http://localhost:3000/api/report', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ info, location })
//     });

//     if (response.ok) {
//         alert('Data submitted successfully!');
//     } else {
//         alert('Failed to submit data.');
//     }
// });
// Function to handle form submissions
// Handle form submissions
document.getElementById('disasterReportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Disaster report submitted!');
});

document.getElementById('resourceRequestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Resource request submitted!');
});

// Handle file upload preview
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            document.getElementById('imagePreview').innerHTML = '';
            document.getElementById('imagePreview').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// Chatbot functionality
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        const userMessage = document.createElement('div');
        userMessage.textContent = `You: ${message}`;
        chatMessages.appendChild(userMessage);
        
        // Simple bot response
        const botMessage = document.createElement('div');
        botMessage.textContent = `Bot: I'm here to help!`;
        chatMessages.appendChild(botMessage);

        chatMessages.scrollTop = chatMessages.scrollHeight;
        userInput.value = '';
    }
}
// Sample code to send user input to the backend and receive a response
async function sendMessage(message) {
    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      // Process the response from the backend
      console.log(data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
  