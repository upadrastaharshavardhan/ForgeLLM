(function () {
  'use strict';

  const STORAGE_KEY = 'forgellm_conversations_v1';
  const THEME_KEY = 'forgellm_theme';
  const MODE_KEY = 'forgellm_mode';

  const MODE_TEMPS = { precise: 0.2, balanced: 0.7, creative: 1.15 };

  // ---------- DOM refs ----------
  const messagesEl = document.getElementById('messages');
  const emptyState = document.getElementById('emptyState');
  const inputEl = document.getElementById('input');
  const sendBtn = document.getElementById('sendBtn');
  const heatBar = document.getElementById('heatBar');
  const statusText = document.getElementById('statusText');
  const conversationListEl = document.getElementById('conversationList');
  const newChatBtn = document.getElementById('newChatBtn');
  const convTitleLive = document.getElementById('convTitleLive');
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menuBtn');
  const themeToggle = document.getElementById('themeToggle');
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const modeRow = document.getElementById('modeRow');
  const modalModeRow = document.getElementById('modalModeRow');
  const suggestionsEl = document.getElementById('suggestions');

  // ---------- State ----------
  /** @type {{id:string, title:string, messages:{role:string,content:string}[], createdAt:number}[]} */
  let conversations = loadConversations();
  let activeId = conversations[0] ? conversations[0].id : null;
  let busy = false;
  let abortController = null;
  let mode = localStorage.getItem(MODE_KEY) || 'balanced';

  if (!activeId) {
    createConversation();
  }

  // ---------- Persistence ----------
  function loadConversations() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveConversations() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (e) {
      console.warn('Could not save conversations (storage full or unavailable).', e);
    }
  }

  function getActive() {
    return conversations.find((c) => c.id === activeId) || null;
  }

  function createConversation() {
    const conv = {
      id: 'c_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      title: 'New chat',
      messages: [],
      createdAt: Date.now(),
    };
    conversations.unshift(conv);
    activeId = conv.id;
    saveConversations();
    renderSidebar();
    renderMessages();
  }

  function deleteConversation(id) {
    conversations = conversations.filter((c) => c.id !== id);
    if (activeId === id) {
      activeId = conversations[0] ? conversations[0].id : null;
      if (!activeId) createConversation();
    }
    saveConversations();
    renderSidebar();
    renderMessages();
  }

  function renameConversation(id, title) {
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      conv.title = title.trim().slice(0, 60) || 'Untitled';
      saveConversations();
      renderSidebar();
      if (id === activeId) convTitleLive.textContent = conv.title;
    }
  }

  // ---------- Sidebar rendering ----------
  function renderSidebar() {
    conversationListEl.innerHTML = '';
    for (const conv of conversations) {
      const item = document.createElement('div');
      item.className = 'conv-item' + (conv.id === activeId ? ' active' : '');
      item.innerHTML = `
        <span class="conv-title">${escapeHtml(conv.title)}</span>
        <span class="conv-actions">
          <button class="icon-btn" data-action="rename" title="Rename">✎</button>
          <button class="icon-btn" data-action="delete" title="Delete">✕</button>
        </span>
      `;
      item.addEventListener('click', (e) => {
        const action = e.target.closest('[data-action]');
        if (action) {
          e.stopPropagation();
          if (action.dataset.action === 'delete') {
            if (confirm('Delete this conversation? This can\'t be undone.')) {
              deleteConversation(conv.id);
            }
          } else if (action.dataset.action === 'rename') {
            const next = prompt('Rename conversation', conv.title);
            if (next !== null) renameConversation(conv.id, next);
          }
          return;
        }
        activeId = conv.id;
        renderSidebar();
        renderMessages();
        if (window.innerWidth <= 820) sidebar.classList.remove('open');
      });
      conversationListEl.appendChild(item);
    }
  }

  // ---------- Message rendering ----------
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderMarkdown(text) {
    let html;
    try {
      html = marked.parse(text, { breaks: true });
    } catch {
      html = escapeHtml(text);
    }
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    wrapper.querySelectorAll('pre code').forEach((block) => {
      const langMatch = /language-(\w+)/.exec(block.className || '');
      const lang = langMatch ? langMatch[1] : 'text';
      try {
        if (window.hljs) window.hljs.highlightElement(block);
      } catch {}

      const pre = block.parentElement;
      const codeBlockWrap = document.createElement('div');
      codeBlockWrap.className = 'code-block';
      const header = document.createElement('div');
      header.className = 'code-block-header';
      header.innerHTML = `<span>${escapeHtml(lang)}</span>`;
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(block.textContent || '').then(() => {
          copyBtn.textContent = 'Copied';
          setTimeout(() => (copyBtn.textContent = 'Copy'), 1400);
        });
      });
      header.appendChild(copyBtn);
      pre.parentElement.insertBefore(codeBlockWrap, pre);
      codeBlockWrap.appendChild(header);
      codeBlockWrap.appendChild(pre);
    });

    return wrapper.innerHTML;
  }

  function renderMessages() {
    messagesEl.innerHTML = '';
    const conv = getActive();
    if (!conv || conv.messages.length === 0) {
      messagesEl.appendChild(emptyState);
      emptyState.style.display = 'block';
      convTitleLive.textContent = conv ? conv.title : 'New chat';
      return;
    }
    emptyState.style.display = 'none';
    convTitleLive.textContent = conv.title;

    conv.messages.forEach((m, idx) => {
      const wrap = buildMessageEl(m.role, m.content);
      if (m.role === 'assistant' && idx === conv.messages.length - 1) {
        const actions = document.createElement('div');
        actions.className = 'msg-actions';
        actions.innerHTML = '<button data-action="regenerate">Regenerate</button><button data-action="copy">Copy</button>';
        actions.addEventListener('click', (e) => {
          const btn = e.target.closest('button');
          if (!btn) return;
          if (btn.dataset.action === 'regenerate') regenerate();
          if (btn.dataset.action === 'copy') navigator.clipboard.writeText(m.content);
        });
        wrap.appendChild(actions);
      }
      messagesEl.appendChild(wrap);
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function buildMessageEl(role, content) {
    const wrap = document.createElement('div');
    wrap.className = 'msg ' + role;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = renderMarkdown(content);
    wrap.appendChild(bubble);
    return wrap;
  }

  function addTypingIndicator() {
    emptyState.style.display = 'none';
    const wrap = document.createElement('div');
    wrap.className = 'msg assistant';
    wrap.id = 'typingWrap';
    wrap.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTypingIndicator() {
    const el = document.getElementById('typingWrap');
    if (el) el.remove();
  }

  // ---------- Sending ----------
  function setBusy(state) {
    busy = state;
    sendBtn.disabled = state;
    sendBtn.textContent = state ? 'Stop ⏹' : 'Forge ›';
    heatBar.classList.toggle('active', state);
    statusText.textContent = state ? 'forging...' : 'ready';
  }

  sendBtn.addEventListener('click', () => {
    if (busy) {
      stopGenerating();
    } else {
      send();
    }
  });

  function stopGenerating() {
    if (abortController) abortController.abort();
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && busy) stopGenerating();
  });

  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 200) + 'px';
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!busy) send();
    }
  });

  suggestionsEl.addEventListener('click', (e) => {
    const chip = e.target.closest('.suggestion-chip');
    if (chip) {
      inputEl.value = chip.textContent;
      inputEl.focus();
    }
  });

  async function send(overrideText) {
    const text = (overrideText !== undefined ? overrideText : inputEl.value).trim();
    if (!text || busy) return;

    const conv = getActive();
    conv.messages.push({ role: 'user', content: text });
    if (conv.messages.length === 1) {
      conv.title = text.slice(0, 48) + (text.length > 48 ? '…' : '');
    }
    saveConversations();
    renderSidebar();
    renderMessages();

    inputEl.value = '';
    inputEl.style.height = 'auto';

    await streamAssistantReply(conv);
  }

  async function regenerate() {
    const conv = getActive();
    if (!conv || busy) return;
    // Drop the last assistant message, keep the conversation up to the last user turn.
    if (conv.messages.length && conv.messages[conv.messages.length - 1].role === 'assistant') {
      conv.messages.pop();
    }
    saveConversations();
    renderMessages();
    await streamAssistantReply(conv);
  }

  async function streamAssistantReply(conv) {
    setBusy(true);
    addTypingIndicator();
    abortController = new AbortController();

    let assistantBubble = null;
    let assistantText = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conv.messages,
          temperature: MODE_TEMPS[mode] ?? 0.7,
        }),
        signal: abortController.signal,
      });

      if (!res.ok || !res.body) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || 'Request failed');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.delta) {
              if (!assistantBubble) {
                removeTypingIndicator();
                const wrap = buildMessageEl('assistant', '');
                messagesEl.appendChild(wrap);
                assistantBubble = wrap.querySelector('.bubble');
              }
              assistantText += parsed.delta;
              assistantBubble.innerHTML = renderMarkdown(assistantText);
              messagesEl.scrollTop = messagesEl.scrollHeight;
            }
          } catch {}
        }
      }

      if (assistantText) {
        conv.messages.push({ role: 'assistant', content: assistantText });
        saveConversations();
        renderMessages();
      } else {
        removeTypingIndicator();
        addMessageDirect('assistant', "Something went wrong on this one — try again.");
      }
    } catch (err) {
      removeTypingIndicator();
      if (err.name === 'AbortError') {
        if (assistantText) {
          conv.messages.push({ role: 'assistant', content: assistantText + '\n\n_(stopped)_' });
          saveConversations();
          renderMessages();
        }
      } else {
        addMessageDirect('assistant', "Couldn't reach the forge — " + (err.message || 'check your connection and try again.'));
      }
    } finally {
      setBusy(false);
      abortController = null;
      inputEl.focus();
    }
  }

  function addMessageDirect(role, text) {
    emptyState.style.display = 'none';
    const wrap = buildMessageEl(role, text);
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // ---------- Theme ----------
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    themeToggle.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('active', b.dataset.themeBtn === theme);
    });
  }
  themeToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-theme-btn]');
    if (btn) applyTheme(btn.dataset.themeBtn);
  });
  applyTheme(localStorage.getItem(THEME_KEY) || 'forge');

  // ---------- Mode (response style) ----------
  function applyMode(nextMode) {
    mode = nextMode;
    localStorage.setItem(MODE_KEY, mode);
    [modeRow, modalModeRow].forEach((row) => {
      row.querySelectorAll('.mode-chip').forEach((c) => c.classList.toggle('active', c.dataset.mode === mode));
    });
  }
  [modeRow, modalModeRow].forEach((row) => {
    row.addEventListener('click', (e) => {
      const chip = e.target.closest('.mode-chip');
      if (chip) applyMode(chip.dataset.mode);
    });
  });
  applyMode(mode);

  // ---------- Sidebar / settings chrome ----------
  newChatBtn.addEventListener('click', () => {
    createConversation();
    if (window.innerWidth <= 820) sidebar.classList.remove('open');
  });
  menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
  settingsBtn.addEventListener('click', () => settingsModal.classList.add('open'));
  closeSettingsBtn.addEventListener('click', () => settingsModal.classList.remove('open'));
  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.classList.remove('open');
  });
  clearAllBtn.addEventListener('click', () => {
    if (confirm('Delete every conversation? This can\'t be undone.')) {
      conversations = [];
      createConversation();
      settingsModal.classList.remove('open');
    }
  });

  // ---------- Init ----------
  renderSidebar();
  renderMessages();
})();
