// Handle the submission of the disaster report form
document.getElementById("disasterReportForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;
    const resourcesNeeded = document.getElementById("resources").value;

    const response = await fetch("http://localhost:5001/api/reports/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ location, description, resourcesNeeded })
    });

    if (response.ok) {
        alert("Report submitted successfully!");
    } else {
        alert("Failed to submit report.");
    }
});

// Handle the submission of the resource request form
document.getElementById("resourceRequestForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const resourceType = document.getElementById("resourceType").value;
    const quantity = document.getElementById("quantity").value;

    const response = await fetch("http://localhost:5001/api/resources/request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ resourceType, quantity })
    });

    if (response.ok) {
        alert("Resource request submitted successfully!");
    } else {
        alert("Failed to request resources.");
    }
});

// Handle photo upload
document.getElementById("uploadForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("uploadForm"));

    const response = await fetch("http://localhost:5001/api/photos/upload", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        const data = await response.json();
        const imagePreview = document.getElementById("imagePreview");
        const img = document.createElement("img");
        img.src = `http://localhost:5001/uploads/${data.file.filename}`;
        img.alt = "Uploaded Photo";
        img.style.width = '300px';
        img.style.height = 'auto';
        imagePreview.innerHTML = '';
        imagePreview.appendChild(img);
        alert("Photo uploaded successfully!");
    } else {
        alert("Failed to upload photo.");
    }
});

// Handle chatbot messages
document.getElementById("send-button").addEventListener("click", async function() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === '') return;

    const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    });

    if (response.ok) {
        const data = await response.json();
        const chatMessages = document.getElementById("chat-messages");
        const userMessage = document.createElement("div");
        userMessage.className = "message user-message";
        userMessage.textContent = userInput;
        chatMessages.appendChild(userMessage);

        const botMessage = document.createElement("div");
        botMessage.className = "message bot-message";
        botMessage.textContent = data.message;
        chatMessages.appendChild(botMessage);

        document.getElementById("user-input").value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
    } else {
        alert("Failed to send message.");
    }
});
