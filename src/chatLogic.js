import { renderUserList, addMessage } from './renderer.js';

let currentUser = null;
let ws;
const wsUrl = 'ws://helpful-wisdom-production-4cea.up.railway.app';

export const handleRegistration = async (elements) => {
  const name = elements.nicknameInput.value.trim();
  
  if (!name) {
    elements.errorMsg.textContent = 'Пожалуйста, введите имя';
    return;
  }

  elements.errorMsg.textContent = '';
  elements.registerBtn.disabled = true;

  try {
    const apiUrl = 'https://helpful-wisdom-production-4cea.up.railway.app';
    const response = await fetch(`${apiUrl}/new-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name})
    });

    const result = await response.json();

    if (response.ok) {
      currentUser = result.user;

      elements.modal.style.display = 'none';
      elements.chatContainer.style.display = 'flex';
      elements.msgInput.disabled = false;
      elements.sendBtn.disabled = false;
      elements.msgInput.focus();

      const emptyState = document.querySelector('.empty-state');
      if (emptyState) emptyState.remove();

      initWebSocket(elements);
    } else {
      elements.errorMsg.textContent = result.message || 'Этот никнейм уже занят';
      elements.registerBtn.disabled = false;
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    elements.errorMsg.textContent = 'Ошибка соединения с сервером';
    elements.registerBtn.disabled = false;
  }
}

function initWebSocket(elements) {
  ws = new WebSocket(wsUrl);
  ws.onopen = () => console.log('WebSocket соединение установлено');

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (Array.isArray(data)) {
      renderUserList(data);
      return;
    }

    if (data.type === 'send') {
      handleIncomingMessage(data, elements);
    }
  }
  
  ws.onclose = () => console.log('WebSocket соединение закрыто');

  ws.onerror = (error) => console.error('WebSocket ошибка:', error);
}

function handleIncomingMessage(data, elements) {
  if (currentUser && data.user.id === currentUser.id) {
    return;
  }

  addMessage(data.user.name, data.message, 'other');
}

export const sendMessage = (elements) => {
  const text = elements.msgInput.value.trim();

  if (!text) return;
  if (!currentUser) return;

  const payload = {
    type: 'send',
    message: text,
    user: currentUser
  }
  
  ws.send(JSON.stringify(payload));
  addMessage(currentUser.name, text, 'me');
  elements.msgInput.value = '';
};