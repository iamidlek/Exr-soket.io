// 채팅 내용을 입력할 form
const chatForm = document.getElementById("chat-form");
// 채팅 내용이 보여질 div
const chatMessages = document.querySelector(".chat-messages");
// 방 이름이 표시될 h2
const roomName = document.getElementById("room-name");
// 방에 속한 유저리스트가 보여지는 ul
const userList = document.getElementById("users");

// Get username and room from URL
// 쿼리스트링qs 를 이용하여 정보 가져오기
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// socketio 사용
const socket = io();

// emit은 반대(서버)로 이벤트를 보내는 경우 with 보낼 데이터
// on은 반대(서버)에서 emit이 일어나는 이벤트를 바라보다가
// 받은 데이터, 실행해줄 내용을 정리하는 부분

// 유저 정보를 서버로 넘겨줌
socket.emit("joinRoom", { username, room });

// 방의 정보 및 방의 유저리스트를 서버로 부터 받는다.
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// 서버에서 message로 emit 하면 받은 내용을 보여주기
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// 메세지 보내기
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// 메세지 DOM 만들기
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
}

// 방이름을 주입
function outputRoomName(room) {
  roomName.innerText = room;
}

// ul 내부 초기화 및 li로 유저리스트 재생성
function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "../index.html";
  } else {
  }
});
