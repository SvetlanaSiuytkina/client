import { handleRegistration, sendMessage } from './chatLogic.js';

document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    modal: document.getElementById('modal-window'),
    chatContainer: document.getElementById('chat-container'),
    
    nicknameInput: document.getElementById('nickname-input'),
    registerBtn: document.getElementById('register-btn'),
    errorMsg: document.getElementById('error-msg'),

    msgInput: document.getElementById('message-input'),
    sendBtn: document.getElementById('send-btn'),
    messagesContainer: document.getElementById('messages-container'),
    userList: document.getElementById('user-list'),
    onlineCount: document.getElementById('online-count')
  };
  
  elements.registerBtn.addEventListener('click', () => {
    handleRegistration(elements);
  });
  
  elements.sendBtn.addEventListener('click', () => {
    sendMessage(elements);
  });
  
  elements.msgInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage(elements);
    }
  });
});
