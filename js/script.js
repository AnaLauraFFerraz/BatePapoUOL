const urlsAPI = {
    participants: "https://mock-api.driven.com.br/api/v6/uol/participants",
    messages: "https://mock-api.driven.com.br/api/v6/uol/messages",
    status: "https://mock-api.driven.com.br/api/v6/uol/status"
}

let userName = "";

function userLogin() {
    userName = document.querySelector('input[name="user-login"]').value;
    if (userName !== "") {
        startChat(userName);
    }
}

function startChat(userName) {
    axios.post(urlsAPI.participants, { name: userName })
        .then(() => {
            document.querySelector('.login-screen').classList.add('no-display');
        })
        .catch(() => {
            window.location.reload()
        });

    postStatus();
    getMessagesInterval();
}

let messagesList = [];

function getMessages() {
    axios.get(urlsAPI.messages)
        .then((response) => {
            messagesList = response.data;
            printAllMessages(messagesList);
        })
        .catch(() => { console.log("erro ao pegar mensagens") })
}

function printAllMessages(messagesList) {
    let txt = "";
    for (let i = 0; i < messagesList.length; i++) {
        if (messagesList[i].type === "status") {
            txt += `<div class="msg-box msg-status">
                <span class="msg-time">(${messagesList[i].time})&nbsp</span> <span class="msg-user">${messagesList[i].from}&nbsp</span> <span class="msg-text">${messagesList[i].text}</span>
            </div>`
        } else if (messagesList[i].type === "message") {
            txt += `<div class="msg-box msg-normal"><span class="msg-time">(${messagesList[i].time})&nbsp</span> <span class="msg-user">${messagesList[i].from}&nbsp</span> para <span class="msg-user">&nbsp${messagesList[i].to}&nbsp</span> <span class="msg-text">${messagesList[i].text}</span>
            </div>`
        } else if (messagesList[i].type === "private-message" && messagesList.to === userName) {
            txt += `<div class="msg-box msg-reserv">
            <p><span class="msg-time">(${messagesList[i].time})&nbsp</span> <span class="msg-user">${messagesList[i].from}&nbsp</span> para <span class="msg-user">&nbsp${messagesList[i].to}&nbsp</span> ${messagesList[i].text} </p></div>`
        }
    }
    document.querySelector("main").innerHTML = txt;
    document.querySelector("main").lastChild.scrollIntoView()
}

let msgTo = "Todos";
let msgType = "message";

function setMessage() {

    let txtMessage = String(document.querySelector('input[name="msg-input"]').value);
    if (txtMessage !== "") {
        let msgData = {
            from: userName,
            to: msgTo,
            text: txtMessage,
            type: msgType
        }
        axios.post(urlsAPI.messages, msgData)
            .then(() => {
                document.querySelector('input[name="msg-input"]').value = "";
            })
            .catch(() => {
                window.location.reload()
            });
    }
    getMessages();
}

let participantsList = [];

function getParticipants() {
    axios.get(urlsAPI.participants)
        .then((response) => {
            participantsList = response.data
            printAllParticipants(participantsList)
        })
        .catch(() => {
            window.location.reload()
        });
}


function printAllParticipants(participantsList) {
    let participantsTxt = "";

    for (let j = 0; j < participantsList.length; j++) {
        participantsTxt += `
        <li>
            <ion-icon class="contacts-icon" name="person-circle" alt="Público"></ion-icon>
            <p class="sidebar-list">${participantsList[j].name}</p>
            <ion-icon class="visibility-icon no-display" src="img/check.svg"></ion-icon>
        </li>`
    }
    document.querySelector('#nav-contacts').innerHTML += participantsTxt;
}

function getParticipants() {
    axios.get(urlsAPI.participants)
        .then((response) => {
            participantsList = response.name;
            printParticipants(participantsList);
        })
        .catch(() => {
            // window.location.reload()
            console.log("Error printing participants")
        });
}

function printParticipants(participantsList) {
    let participantsTxt = "";
    for (let j = 0; j < participantsList.length; j++) {
        participantsTxt += `
        <li>
            <ion-icon class="contacts-icon" name="person-circle" alt="Público"></ion-icon>
            <p class="sidebar-list">${participantsTxt[j].name}</p>
            <ion-icon class="visibility-icon no-display" src="img/check.svg"></ion-icon>
        </li>
        `
    }
    document.querySelector('#nav-contacts').innerHTML += participantsTxt;
}

function openSidebar() {
    document.querySelector('#sidebar-active').classList.remove('no-display');
    getParticipants();
}

function closeSidebar(element) {
    element.parentNode.classList.add('no-display');
}

function getMessagesInterval() {
    setInterval(() => {
        getMessages();
    }, 3000);
}

function postStatus() {
    setInterval(() => {
        axios.post(urlsAPI.status, { name: userName })
            .catch(() => {
                window.location.reload()
            })
    }, 5000);
}

setInterval(() => {
    axios.get(urlsAPI.participants)
        .then((response) => participantsList = response.data)
        .catch(() => {
            window.location.reload()
        });
}, 10000);
