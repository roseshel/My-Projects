
const socket = new WebSocket("wss://echo.websocket.org");


const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messages");
const emojiPicker = document.getElementById("emoji-picker");


const emojiButtons = document.querySelectorAll(".emoji");


const loadMessages = () => {
    const storedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    storedMessages.forEach(msg => {
        const messageElement = createMessageElement(msg.content, msg.timestamp);
        messagesContainer.appendChild(messageElement);
    });
};


const createMessageElement = (content, timestamp) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    
    const timestampElement = document.createElement("small");
    timestampElement.textContent = new Date(timestamp).toLocaleTimeString();
    messageElement.appendChild(timestampElement);
    
    const contentElement = document.createElement("p");
    contentElement.textContent = content;
    messageElement.appendChild(contentElement);
    
    return messageElement;
};


const saveMessageToLocalStorage = (content, timestamp) => {
    const messages = JSON.parse(localStorage.getItem("messages") || "[]");
    messages.push({ content, timestamp });
    localStorage.setItem("messages", JSON.stringify(messages));
};


const sendMessage = () => {
    const message = messageInput.value.trim();
    if (message) {
        const timestamp = Date.now();
        
        
        socket.send(message);
        
       
        const messageElement = createMessageElement(message, timestamp);
        messagesContainer.appendChild(messageElement);
        
        
        saveMessageToLocalStorage(message, timestamp);
        
        messageInput.value = "";
        messagesContainer.scrollTop = messagesContainer.scrollHeight; 
    }
};


socket.onmessage = (event) => {
    const message = event.data;
    const timestamp = Date.now();
    
    
    const messageElement = createMessageElement(message, timestamp);
    messagesContainer.appendChild(messageElement);
    
    
    saveMessageToLocalStorage(message, timestamp);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight; 
};


sendBtn.addEventListener("click", sendMessage);


messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});


messageInput.addEventListener("focus", () => {
    emojiPicker.style.display = "block";
});


messageInput.addEventListener("blur", () => {
    setTimeout(() => emojiPicker.style.display = "none", 100);
});


emojiButtons.forEach(emojiButton => {
    emojiButton.addEventListener("click", () => {
        messageInput.value += emojiButton.dataset.emoji;
        messageInput.focus();
    });
});


window.onload = loadMessages;
