const socket = io();

let author;
do {
    author = prompt('Please enter your name: ');
} while(!author);

let input = document.getElementById('textarea');
let chatWindow = document.getElementsByClassName('message_area')[0];

input.addEventListener('keyup', (event) => {
    if(event.key === 'Enter')
    {
        let message = event.target.value;
        sendMessage(message);
    }
});

function sendMessage(message) {
    let msg = {
        author: author,
        message: message.trim()
    };

    updateUI(msg, 'outgoing');
    input.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    socket.emit('message', msg);
}

function updateUI(message, messageClassName) {
    let messageBox = document.createElement('div');
    messageBox.classList.add(messageClassName, 'message');

    let nameTitle = document.createElement('h4');
    nameTitle.innerText = message.author;
    messageBox.appendChild(nameTitle);

    let messageArea = document.createElement('p');
    messageArea.innerText = message.message;
    messageBox.appendChild(messageArea);

    chatWindow.appendChild(messageBox);
    console.log(chatWindow);
}

socket.on('message', (msg) => {
    updateUI(msg, 'incoming');
    chatWindow.scrollTop = chatWindow.scrollHeight;
});