
const API_KEY = "a650beda66094d58b3e5c84b664420e8f2e65edd";
const messagesEl = document.getElementById("messages");

window.onload = () => { appendMessage("Hi! I am Rhy bot🤖.", "bot"); }

function appendMessage(text, sender) {
    const container = document.createElement("div");
    container.className = "msg-container";

    const msg = document.createElement("div");
    msg.className = "msg " + sender;

    if(sender === "bot"){
        const avatar = document.createElement("img");
        avatar.className = "avatar";
        avatar.src = "https://i.imgur.com/aJlGn9L.jpeg";
        container.appendChild(avatar);
    }

    const now = new Date();
    const timestamp = now.getHours().toString().padStart(2,'0') + ":" + now.getMinutes().toString().padStart(2,'0');
    msg.innerHTML = `<span>${text}</span><div class="timestamp">${timestamp}</div>`;

    container.appendChild(msg);
    messagesEl.appendChild(container);

    messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
}

function clearChat(){
    messagesEl.innerHTML = "";
    appendMessage("Hi! I am Rhy bot🤖.", "bot");
}

async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if(!text) return;

    appendMessage(text, "user");
    input.value = "";

    const typing = document.getElementById("typing");
    typing.style.display = "block";

    try {
        const url = `https://simsimi-api-pro.onrender.com/sim?query=${encodeURIComponent(text)}&apikey=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        setTimeout(() => {
            typing.style.display = "none";
            appendMessage(data.respond || data.response || JSON.stringify(data), "bot");
        }, 800 + Math.random()*700);
    } catch (err){
        typing.style.display = "none";
        appendMessage("Error connecting to API: " + err.message, "bot");
    }
}
