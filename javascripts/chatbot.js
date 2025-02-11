const API_KEY = "sk-kmppdbmzegoiagsibyiucwmghzjlbwgzfmfcmbgiqceabsof";  // 替换为您的 API 密钥
const API_URL = "https://api.siliconflow.cn/v1/chat/completions";  // 硅基流动平台的 API URL
const MODEL_NAME = "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B";  // 或 "deepseek-ai/DeepSeek-R1"，根据您的需求选择

let isDragging = false;
let offsetX, offsetY;
let isMinimized = false; // 标识聊天框是否处于折叠状态

// 添加聊天窗口
function createChatbotUI() {
    let chatbot = document.createElement("div");
    chatbot.id = "chat-container";
    chatbot.innerHTML = `
        <div id="chat-header">Deepseek Chatbot</div>
        <div id="chat-box"></div>
        <input type="text" id="chat-input" placeholder="输入你的问题...">
        <button onclick="sendMessage()">发送</button>
    `;
    document.body.appendChild(chatbot);

    // 实现聊天窗口拖动
    let header = document.getElementById("chat-header");
    header.addEventListener('mousedown', startDrag);


    function startDrag(event) {
        isDragging = true;
        offsetX = event.clientX - chatbot.offsetLeft;
        offsetY = event.clientY - chatbot.offsetTop;

        document.addEventListener('mousemove', dragChatWindow);
        document.addEventListener('mouseup', stopDrag);
    }

    function dragChatWindow(event) {
        if (!isDragging) return;
        chatbot.style.left = (event.clientX - offsetX) + "px";
        chatbot.style.top = (event.clientY - offsetY) + "px";
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', dragChatWindow);
        document.removeEventListener('mouseup', stopDrag);
    }

    // Enter 键发送消息
    document.getElementById("chat-input").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();  // 防止换行
            sendMessage();
        }
    });
}

// 发送消息到 DeepSeek API
async function sendMessage() {
    let inputBox = document.getElementById("chat-input");
    let chatBox = document.getElementById("chat-box");

    let userMessage = inputBox.value.trim();
    if (!userMessage) return;

    // 显示用户消息
    chatBox.innerHTML += `<div class="user-message">用户: ${userMessage}</div>`;
    inputBox.value = "";

    // 确保聊天框滚动到底部
    chatBox.scrollTop = chatBox.scrollHeight;

    // 显示加载提示
    chatBox.innerHTML += `<div class="bot-message" id="loading-msg">正在思考中...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    let response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: MODEL_NAME,
            messages: [{ role: "user", content: userMessage }]
        })
    });

    let data = await response.json();
    let botMessage = data.choices?.[0]?.message?.content || "Error: No response";

    // 删除加载提示并显示 AI 回复
    document.getElementById("loading-msg").remove();

    // 将用户消息和 AI 消息按照对话顺序显示
    chatBox.innerHTML += `<div class="bot-message">${botMessage}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // 自动滚动到最新消息
    chatBox.scrollTop = chatBox.scrollHeight;
}


// 全局加载
// window.onload = createChatbotUI;