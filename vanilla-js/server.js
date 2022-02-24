const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const app = express();
// 소켓io를 연결하기 위함
const server = http.createServer(app);
const io = socketio(server);

// 정적 파일을 이용하는 방법 public폴더의 index파일 실행
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCord Bot";

// 유저가 접속하면 실행될 내용
io.on("connection", (socket) => {
  /// 방에 들어가는 경우 일어나는 동작들
  // 클라이언트의 joinRoom이벤트 발생을 바라보기
  socket.on("joinRoom", ({ username, room }) => {
    // users 배열에 유저 정보를 추가(방정보도 포함되어 모든 유저가 등록되는 배열)
    // user는 { id, username, room }을 가진 객체
    const user = userJoin(socket.id, username, room);

    // join 특정 소켓이 방에 들어가는 개념(방 리스트는 서버에만 존재)
    socket.join(user.room);

    // 방에 들어오면 clint에 message이벤트를 발동시킨다(on바라보기의 반대)
    // 본인 화면에 그려질 메세지
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // broadcast는 보내는 소켓의 클라이언트는 제외(즉 본인 제외)
    socket.broadcast
      .to(user.room) // 룸에 본인을 제외한 나머지 인원들에게 가는 메세지
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // 방정보, 방에 일치하는 유저들 배열을 클라이언트로 보내준다
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    // 소켓id로 현재 유저 정보 취득
    const user = getCurrentUser(socket.id);
    // 해당 방에 메세지 보내기
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    // 유저 리스트에서 해당하는 유저를 제거
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // 해당 유저가 나간 뒤의 방에 남아있는 유저 정보를 보내준다
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
