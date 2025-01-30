<div class="chat-container">
  <header class="chat-header">
    <h1>Chat Room</h1>
    <i class="fa-regular fa-comment"></i>
  </header>
  <div class="chat-messages" id="chatMessages">
    <!-- Messages will be appended dynamically -->
  </div>
  <div id="loadingSpinner" class="loading-spinner hidden">
    <div class="spinner"></div>
  </div>
  <div id="errorMessage" class="error-message"></div>
  <footer class="chat-footer">
    <input 
      type="text" 
      id="messageInput" 
      placeholder="Type your message..." 
      autocomplete="off"
    />
    <button id="sendButton">Send</button>
  </footer>
</div>
<script src="/frontend/zones/chat/chat.js"></script>