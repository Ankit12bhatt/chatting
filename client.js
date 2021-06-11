const socket=io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput=document.getElementById('messageinp');
const messageContainer=document.querySelector(".conatiner")

const append=(message,position)=>{
const messageElement=document.createElement('div');
messageElement.innerText=message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.nodeValue;
    append(`you:${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})

const name1=prompt("please enter your name");
socket.emit('new-user-joined', name1);

socket.on('user-joined', name1=>{

    append(`${name1} joined the chat`,'right');
})
socket.on('receive', data=>{

    append(`${data.name1}: ${data.message}:`,'left');
})
socket.on('leave', name1=>{

    append(`${name1} left the chat`,'left');
})