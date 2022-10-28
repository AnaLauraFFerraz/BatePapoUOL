

const urlsAPI = [
    //participants: "https://mock-api.driven.com.br/api/v6/uol/participants",
    //messages: "https://mock-api.driven.com.br/api/v6/uol/messages",
    //status: "https://mock-api.driven.com.br/api/v6/uol/status"
]

let userName = "";

document.querySelector('.login-screen button').addEventListener('click', loginUser());

function loginUser() {() => {
    loginUser : {
        userName = document.querySelector('input[name="user-login"]');
        //console.log(userName);
        if (userName === "") {
            break loginUser;
        }
        startChat(userName);
        }
    }
}    

function startChat(userName) {
    axios
    .post(urlsAPI.participants, { name: userName })
    .then((response) => {
        console.log("success", response);
        document.querySelector('.login-screen').style.display = none;
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
    document.querySelector("main").lastElementChild.scrollIntoView()
}

document.querySelector('.login-screen button').addEventListener('click', setMessage());

function setMessage() {() => {
        setMessage : {
            message = document.querySelector('input[name="msg-input"]');
            //console.log(message);
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

document.querySelector('ion-icon[ion-icon name="people"]').addEventListener('click', printParticipants());

function getParticipants() {
    axios.get(urlsAPI.participants)
        .then((response) => {
            let participants = response.nome;
            return participants;
        })
        .catch(() => {window.location.reload()});
}

function printParticipants(participants) {
    getParticipants();
    
    //Fazer sidebar
}

setInterval(() => {
    getMessages();
}, 3000);

setInterval(() => {
    axios.post(urls.status, {name: userName})
    .catch(() => {window.location.reload()});
}, 5000);

setInterval(() => {
    axios.get(urls.participants)
    .catch(() => {window.location.reload()});
}, 10000);