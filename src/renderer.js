export const renderUserList = (users) => {
  const userList = document.getElementById('user-list');
  const onlineCount = document.getElementById('online-count');

  userList.innerHTML = '';
  onlineCount.textContent = users.length;

  users.forEach(user => {
    const li = document.createElement('li');
    li.className = 'user-item';

    //перв буква имени автора
    const initial = user.name.charAt(0).toUpperCase();

    li.innerHTML = `
      <div class="avatar">${initial}</div>
      <span>${user.name}</span>
      `;
      userList.appendChild(li);
  });
}

//доб сообщ
export const addMessage = (author, text, type) => {
  const messagesContainer = document.getElementById('messagesContainer');
  if (!messagesContainer) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `msg ${type}`;

  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  msgDiv.innerHTML = `
    <strong>${author}</strong>
    <span>${text}</span>
    <small>${time}</small>
  `;
  
  messagesContainer.appendChild(msgDiv);
  scrollToBottom();
}

//прокрутка сообщ
const scrollToBottom = () => {
  const messagesContainer = document.getElementById('messages-container');

  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}