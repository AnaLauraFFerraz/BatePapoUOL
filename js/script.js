window.onload = userLogin();

const urlsAPI = {
    participants: "https://mock-api.driven.com.br/api/v6/uol/participants",
    messages: "https://mock-api.driven.com.br/api/v6/uol/messages",
    status: "https://mock-api.driven.com.br/api/v6/uol/status"
}

let userName = "";

//document.querySelector('.login-screen button').addEventListener('click', userLogin());

function userLogin() {() => {
    userLogin : {
        userName = document.querySelector('input[name="user-login"]');
        console.log(userName);
        if (userName === "") {
            break userLogin;
        }
        startChat(userName);
        }
    }
}    

function startChat(userName) {
    axios.post(urlsAPI.participants, { name: userName })
    .then((response) => {
        console.log("success", response);
        document.querySelector('.login-screen').classList.remove('no-display');
    })
    .catch(() => {window.location.reload()});
    //Tela de carregamento
}

function getMessages() {
    axios.get(urlsAPI.messages)
        .then((response) => {
            let messagesList = response.data;
            printAllMessages(messagesList)
        })
}

function printAllMessages(messagesList) {
    let txt = "";
    for (let i = 0; i < messagesList.length; i++) {
        if (messagesList.type === "status") {
            txt += `<div class="msg-box msg-status">
                <span class="msg-time">${messagesList.time}</span> 
                <span class="msg-user">${messagesList.from}</span> 
                <span class="msg-text">${messagesList.text}</span>
            </div>`            
        } else if (messagesList.type === "message") {
            txt += `<div class="msg-box msg-reserv">
                <span class="msg-time">${messagesList.time}</span> 
                <span class="msg-user">${messagesList.from}</span> para 
                <span class="msg-user">${messagesList.to}</span> 
                <span class="msg-text">${messagesList.text}</span>
            </div>`
        } else if (messagesList.type === "private-message" && messagesList.to == userName) {
            txt += `<div class="msg-box msg-normal">
                <span class="msg-time">${messagesList.time}</span> 
                <span class="msg-user">${messagesList.from}</span> para 
                <span class="msg-user">${messagesList.to}</span> 
                <span class="msg-text">${messagesList.text}</span>
            </div>`
        }
    }
    document.querySelector("main").innerHTML = txt;
    //document.querySelector("main").lastChild.scrollIntoView()
}

//document.querySelector('.login-screen button').addEventListener('click', setMessage());

function setMessage() {() => {
        setMessage : {
            message = document.querySelector('input[name="msg-input"]').nodeValue;
            console.log(message);
            if (message === "") {
                break setMessage;
            }
            postMessage(message);
        }
    }
}

function postMessage(message) {
    axios
    .post(urlsAPI.messages, {
        name: userName,
        to: "Todos", //type
        text: message,
        type: "message" //type
    })
    .then((response) => {
        console.log("success", response);
        message = "";
    })
    .catch(() => {window.location.reload()}); 
    getMessages();
}

//document.querySelector('#contacts-open').addEventListener('click', openSidebar());

function getParticipants() {
    axios.get(urlsAPI.participants)
        .then((response) => {
            let participants = response.nome;
            return participants;
        })
        .catch(() => {window.location.reload()});
}

function printParticipants(participants) {
    let participantsList = "";
    for (let j = 0; j< participants.length; j++) {
        participantsList += `
        <li>
            <ion-icon class="contacts-icon" name="person-circle" alt="Público"></ion-icon>
            <p class="sidebar-list">${participants.nome}</p>
            <ion-icon class="visibility-icon no-display" src="img/check.svg"></ion-icon>
        </li>`
    }
}

function openSidebar() {
    document.querySelector('#sidebar-active').classList.remove('no-display');
}
function closeSidebar(element) {
    element.parentNode.classList.add('no-display');
}

setInterval(() => {
    getMessages();
}, 3000);

setInterval(() => {
    axios.post(urlsAPI.status, {name: userName})
    //.catch(() => {window.location.reload()});
}, 5000);

setInterval(() => {
    axios.get(urlsAPI.participants)
    //.catch(() => {window.location.reload()});
    .catch(() => {window.location.reload()});
}, 10000);
