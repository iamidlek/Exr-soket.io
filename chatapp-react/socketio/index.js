const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
