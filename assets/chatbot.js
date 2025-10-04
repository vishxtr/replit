// SmartSOC Chatbot Component
// Reusable chatbot functionality for all pages

class SmartSOCChatbot {
    constructor() {
        this.isInitialized = false;
        this.chatbotHistory = [];
        this.chatbotBusy = false;
        this.CHAT_HISTORY_KEY = 'smartsoc_chat_history_v1';
        this.GROQ_API_KEY = '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';
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.createChatbotHTML();
        this.setupEventListeners();
        this.loadChatHistory();
        this.isInitialized = true;
    }

    createChatbotHTML() {
        // Check if chatbot already exists
        if (document.getElementById('chatbot-container')) return;

        const chatbotHTML = `
            <!-- SmartSOC Chatbot -->
            <div id="chatbot-container" class="fixed bottom-6 right-6 z-50">
                <button id="chatbot-toggle" class="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-transform transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
                <div id="chatbot-window" class="hidden absolute bottom-20 right-0 w-80 card shadow-xl chatbot-bubble chatbot-window relative" style="min-width: 18rem; min-height: 18rem;">
                    <div class="chatbot-halo"></div>
                    <div class="p-4 chatbot-header">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                <h3 class="font-semibold text-white">SmartSOC Assistant</h3>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="flex items-center space-x-2 text-xs">
                                    <button id="chatbot-size-sm" class="px-2 py-1 bg-gray-800/60 hover:bg-gray-700 rounded text-gray-200">S</button>
                                    <button id="chatbot-size-md" class="px-2 py-1 bg-gray-800/60 hover:bg-gray-700 rounded text-gray-200">M</button>
                                    <button id="chatbot-size-lg" class="px-2 py-1 bg-gray-800/60 hover:bg-gray-700 rounded text-gray-200">L</button>
                                </div>
                                <button id="chatbot-close" class="chatbot-icon-btn" aria-label="Close chatbot">✕</button>
                            </div>
                        </div>
                    </div>
                    <div id="chatbot-messages" class="p-4 h-64 overflow-y-auto">
                        <div class="text-sm p-2 bg-blue-900/50 rounded-lg text-gray-300 mb-2">
                            Hi! I'm your SmartSOC Assistant. I can help you with:
                            <ul class="mt-2 space-y-1 text-xs">
                                <li>• Incident analysis and triage</li>
                                <li>• Threat intelligence queries</li>
                                <li>• Security best practices</li>
                                <li>• SOC operations guidance</li>
                            </ul>
                        </div>
                    </div>
                    <div class="p-2 border-t border-gray-600">
                        <input id="chatbot-input" type="text" class="w-full chatbot-input rounded-md p-2 text-sm" placeholder="Ask about security operations...">
                    </div>
                    <div class="chatbot-resize-handle"></div>
                </div>
            </div>
        `;

        // Add to body
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    setupEventListeners() {
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotWindow = document.getElementById('chatbot-window');
        const chatbotClose = document.getElementById('chatbot-close');
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotMessages = document.getElementById('chatbot-messages');

        // Toggle chatbot
        chatbotToggle?.addEventListener('click', () => {
            chatbotWindow?.classList.toggle('hidden');
            if (!chatbotWindow?.classList.contains('hidden')) {
                chatbotInput?.focus();
                this.scrollToBottom();
            }
        });

        // Close chatbot
        chatbotClose?.addEventListener('click', () => {
            chatbotWindow?.classList.add('hidden');
        });

        // Send message on Enter
        chatbotInput?.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' && chatbotInput.value.trim() !== '') {
                const query = chatbotInput.value.trim();
                chatbotInput.value = '';
                this.addChatMessage(query, 'user');
                this.chatbotHistory.push({ role: 'user', content: query });
                this.saveChatHistory();
                this.processChatbotQuery(query);
            }
        });

        // Resize functionality
        this.setupResizeFunctionality();
    }

    setupResizeFunctionality() {
        const win = document.getElementById('chatbot-window');
        const msgs = document.getElementById('chatbot-messages');
        const btnS = document.getElementById('chatbot-size-sm');
        const btnM = document.getElementById('chatbot-size-md');
        const btnL = document.getElementById('chatbot-size-lg');
        const handle = win?.querySelector('.chatbot-resize-handle');

        function setSize(width, height) {
            if (!win) return;
            win.style.width = width + 'px';
            win.style.height = height + 'px';
            
            if (msgs) {
                const headerH = 60;
                const inputH = 60;
                const padding = 16;
                const messagesHeight = Math.max(160, height - (headerH + inputH + padding));
                msgs.style.height = messagesHeight + 'px';
            }
        }

        btnS?.addEventListener('click', () => setSize(320, 360));
        btnM?.addEventListener('click', () => setSize(380, 440));
        btnL?.addEventListener('click', () => setSize(460, 560));

        // Drag-to-resize
        let resizing = false;
        let startX = 0, startY = 0, startW = 0, startH = 0;

        function onMouseMove(e) {
            if (!resizing) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const newW = Math.max(300, startW - dx);
            const newH = Math.max(300, startH - dy);
            setSize(newW, newH);
        }

        function onMouseUp() {
            resizing = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        handle?.addEventListener('mousedown', (e) => {
            if (!win) return;
            resizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startW = win.offsetWidth;
            startH = win.offsetHeight;
            e.preventDefault();
            e.stopPropagation();
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        // Set default size
        if (win && !win.classList.contains('hidden')) {
            setSize(win.offsetWidth, win.offsetHeight || 420);
        }
    }

    addChatMessage(content, sender) {
        const chatbotMessages = document.getElementById('chatbot-messages');
        if (!chatbotMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-3 ${sender === 'user' ? 'text-right' : 'text-left'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = `inline-block max-w-xs p-3 rounded-lg ${
            sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-100'
        }`;
        
        // Format markdown-like content
        const formattedContent = this.formatMessage(content);
        messageContent.innerHTML = formattedContent;
        
        messageDiv.appendChild(messageContent);
        chatbotMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(content) {
        // Simple markdown formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1 py-0.5 rounded text-xs">$1</code>')
            .replace(/\n/g, '<br>')
            .replace(/^### (.*$)/gm, '<h3 class="text-sm font-semibold text-blue-300 mt-2 mb-1">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 class="text-base font-semibold text-blue-400 mt-3 mb-2">$1</h2>')
            .replace(/^\- (.*$)/gm, '<li class="ml-4">• $1</li>')
            .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>');
    }

    addTyping() {
        const chatbotMessages = document.getElementById('chatbot-messages');
        if (!chatbotMessages) return;

        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'mb-3 text-left';
        typingDiv.innerHTML = `
            <div class="inline-block bg-gray-700 text-gray-100 p-3 rounded-lg">
                <div class="flex items-center space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTyping() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        const chatbotMessages = document.getElementById('chatbot-messages');
        if (chatbotMessages) {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }

    buildSocContext() {
        try {
            // Get current page context
            const currentPage = window.location.pathname.split('/').pop() || 'dashboard';
            const pageContext = this.getPageContext(currentPage);
            
            const now = new Date().toLocaleString();
            return `Current SmartSOC context as of ${now}: ${pageContext}`;
        } catch (error) {
            return 'Current SmartSOC context: metrics unavailable.';
        }
    }

    getPageContext(page) {
        const contexts = {
            'index.html': 'Dashboard view - monitoring overall security posture',
            'threat-intel.html': 'Threat Intelligence page - analyzing IOCs and threat feeds',
            'threat-detection.html': 'Threat Detection page - monitoring active threats',
            'cases.html': 'Incident Management page - handling security incidents',
            'analytics.html': 'Analytics page - reviewing security metrics and trends',
            'playbooks.html': 'Automation Playbooks page - managing response procedures',
            'assets.html': 'Asset Management page - tracking organizational assets',
            'settings.html': 'Settings page - configuring system parameters'
        };
        
        return contexts[page] || `Currently on ${page} - general security operations`;
    }

    async processChatbotQuery(query) {
        if (this.chatbotBusy) return;
        this.chatbotBusy = true;

        const systemPrompt = 'You are the SmartSOC Assistant embedded in the Smart SOC Incident Response System (SmartSOC IRS). You help security analysts with SOC operations: interpreting alerts, incident triage, phishing analysis, threat intelligence, and safe remediation guidance. If asked about yourself, say you are the SmartSOC Assistant integrated into this app and currently powered by Groq. Respond in clean, ChatGPT-style markdown with short headings (##/###), bold labels, concise bullet points, and numbered steps for playbooks. Keep responses concise, accurate, and action-oriented. Avoid giving instructions that could enable harm. When information is missing, ask a brief clarifying question before proceeding. Where helpful, include concrete next steps.';
        
        const maxTurns = 10;
        const recentTurns = this.chatbotHistory.slice(-maxTurns).map(m => ({ 
            role: m.role === 'assistant' ? 'assistant' : m.role, 
            content: m.content 
        }));
        
        const messages = [
            { role: 'system', content: systemPrompt },
            { role: 'system', content: this.buildSocContext() },
            ...recentTurns,
            { role: 'user', content: query }
        ];

        try {
            const url = 'https://api.groq.com/openai/v1/chat/completions';
            this.addTyping();
            
            const resp = await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + this.GROQ_API_KEY 
                },
                body: JSON.stringify({
                    model: 'openai/gpt-oss-120b',
                    messages,
                    temperature: 0.6,
                    max_tokens: 512
                })
            });

            if (!resp.ok) {
                let msg = 'The AI service returned an error. Please try again.';
                try {
                    const err = await resp.json();
                    if (err && err.error && err.error.message) msg = err.error.message;
                } catch (_) {
                    const errText = await resp.text();
                    if (errText) msg = errText;
                }
                console.error('Chatbot API error', resp.status, msg);
                this.removeTyping();
                this.addChatMessage(msg, 'bot');
                return;
            }

            const data = await resp.json();
            let text = '';
            if (data && Array.isArray(data.choices) && data.choices.length > 0) {
                const msg = data.choices[0].message;
                if (msg && typeof msg.content === 'string') text = msg.content;
            }
            
            this.removeTyping();
            if (!text) text = 'Sorry, I could not get a response right now. Please try again.';
            
            this.addChatMessage(text, 'bot');
            this.chatbotHistory.push({ role: 'assistant', content: text });
            this.saveChatHistory();
            
        } catch (error) {
            console.error('Chatbot request failed', error);
            this.removeTyping();
            const errMsg = 'I\'m having trouble reaching the AI service. Please try again.';
            this.addChatMessage(errMsg, 'bot');
            this.chatbotHistory.push({ role: 'assistant', content: errMsg });
            this.saveChatHistory();
        } finally {
            this.chatbotBusy = false;
        }
    }

    loadChatHistory() {
        try {
            const saved = localStorage.getItem(this.CHAT_HISTORY_KEY);
            if (saved) {
                this.chatbotHistory = JSON.parse(saved);
                this.renderChatHistory();
            }
        } catch (error) {
            console.error('Failed to load chat history:', error);
            this.chatbotHistory = [];
        }
    }

    saveChatHistory() {
        try {
            localStorage.setItem(this.CHAT_HISTORY_KEY, JSON.stringify(this.chatbotHistory));
        } catch (error) {
            console.error('Failed to save chat history:', error);
        }
    }

    renderChatHistory() {
        const chatbotMessages = document.getElementById('chatbot-messages');
        if (!chatbotMessages || !Array.isArray(this.chatbotHistory) || this.chatbotHistory.length === 0) return;

        chatbotMessages.innerHTML = '';
        this.chatbotHistory.forEach(m => {
            this.addChatMessage(m.content, m.role === 'user' ? 'user' : 'bot');
        });
        this.scrollToBottom();
    }

    // Public methods for external control
    show() {
        const chatbotWindow = document.getElementById('chatbot-window');
        if (chatbotWindow) {
            chatbotWindow.classList.remove('hidden');
            document.getElementById('chatbot-input')?.focus();
            this.scrollToBottom();
        }
    }

    hide() {
        const chatbotWindow = document.getElementById('chatbot-window');
        if (chatbotWindow) {
            chatbotWindow.classList.add('hidden');
        }
    }

    clearHistory() {
        this.chatbotHistory = [];
        this.saveChatHistory();
        const chatbotMessages = document.getElementById('chatbot-messages');
        if (chatbotMessages) {
            chatbotMessages.innerHTML = `
                <div class="text-sm p-2 bg-blue-900/50 rounded-lg text-gray-300 mb-2">
                    Chat history cleared. How can I help you today?
                </div>
            `;
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.smartsocChatbot = new SmartSOCChatbot();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartSOCChatbot;
}
