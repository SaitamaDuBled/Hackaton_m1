const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

// API endpoint
const API_ENDPOINT = '/api/chat';

// Handle sending messages
sendButton.addEventListener('click', () => {
    sendMessage();
});

// Handle pressing Enter to send a message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Show spinner
function showSpinner() {
    loadingSpinner.classList.remove('hidden');
}

// Hide spinner
function hideSpinner() {
    loadingSpinner.classList.add('hidden');
}

// Show error message
function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Hide error message
function hideErrorMessage() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

function getMessages() {
    fetch(API_ENDPOINT)
        .then(res => res.json())
        .then(
            messages => {

                // Clear existing messages
                chatMessages.innerHTML = '';

                // Post fetch treatment
                messages.forEach(
                    message => {
                        message.time = new Date(message.time)
                    }
                );
                
                // Sort and display messages by date
                messages
                    .sort((a, b) => a.time.getTime() - b.time.getTime())
                    .forEach(message => addMessage(message.text, message.author, new Date(message.time)));
                hideSpinner();
                hideErrorMessage();
            }
        ).catch(
            error => {
                console.error('Error:', error);
                showErrorMessage('Unable to load messages. Please check your connection.');
            }
        );
}

// Add a message to the chat
function addMessage(text, author, time = new Date()) {
    const formattedDateTime = time.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const messageDiv = document.createElement('div');
    const messageClass = author === getUserName() ? 'user' : 'other';
    messageDiv.className = `message ${messageClass}`;

    messageDiv.innerHTML = `
      <div class="meta"><strong>${author}</strong> • ${formattedDateTime}</div>
      <div class="content">${text}</div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
}

// Send a message
async function sendMessage() {
    const userMessage = messageInput.value.trim();
    if (userMessage) {
        const userName = getUserName();

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    author: userName,
                    text: userMessage
                })
            });

            console.log('Response status:', response.status);
            const responseData = await response.json();
            console.log('Response data:', responseData);

            if (response.ok) {
                getMessages(); // Refreshing messages
                messageInput.value = '';
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// Generate a random username
function generateRandomName() {
    const adjectives = ['Happy', 'Cool', 'Smart', 'Fast', 'Bold'];
    const nouns = ['Tiger', 'Eagle', 'Fox', 'Wolf', 'Lion'];
    const randomNumber = Math.floor(Math.random() * 1000);
    const randomName = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}#${randomNumber}`;
    return randomName;
}

// Get the username from local storage 
function getUserName() {
    let userName = localStorage.getItem('userName');
    if (!userName) {
        userName = generateRandomName();
        localStorage.setItem('userName', userName);
    }
    return userName;
}

// Init.
showSpinner();
const refreshMsgInterval = setInterval(() => getMessages(), 2000); // Refresh messages every 2 seconds