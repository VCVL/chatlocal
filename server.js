const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

// Armazena salas na memória (some quando o servidor reinicia)
// sala: { users: Set de socket.ids, names: Map de id->nome, messages: [] }
const rooms = {};

function getOrCreateRoom(code) {
  if (!rooms[code]) {
    rooms[code] = { users: new Set(), names: new Map(), messages: [] };
  }
  return rooms[code];
}

function cleanupRoom(code) {
  if (rooms[code] && rooms[code].users.size === 0) {
    delete rooms[code];
    console.log(`Sala "${code}" removida (vazia)`);
  }
}

io.on("connection", (socket) => {
  let currentRoom = null;
  let currentName = null;

  socket.on("join", ({ roomCode, name }) => {
    roomCode = roomCode.trim().toLowerCase();
    name = name.trim().slice(0, 20) || "Anônimo";

    const room = getOrCreateRoom(roomCode);
    currentRoom = roomCode;
    currentName = name;

    room.users.add(socket.id);
    room.names.set(socket.id, name);
    socket.join(roomCode);

    // Envia histórico da sessão atual para quem entrou
    socket.emit("history", room.messages);

    // Avisa todos na sala
    const userCount = room.users.size;
    io.to(roomCode).emit("system", {
      text: `${name} entrou na sala`,
      count: userCount,
    });

    console.log(`${name} entrou na sala "${roomCode}" (${userCount} pessoas)`);
  });

  socket.on("message", (text) => {
    if (!currentRoom || !text.trim()) return;
    const room = rooms[currentRoom];
    if (!room) return;

    const msg = {
      name: currentName,
      text: text.trim().slice(0, 500),
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };

    room.messages.push(msg);
    // Mantém no máximo 200 mensagens na memória
    if (room.messages.length > 200) room.messages.shift();

    io.to(currentRoom).emit("message", msg);
  });

  socket.on("disconnect", () => {
    if (!currentRoom) return;
    const room = rooms[currentRoom];
    if (!room) return;

    room.users.delete(socket.id);
    room.names.delete(socket.id);

    const userCount = room.users.size;
    io.to(currentRoom).emit("system", {
      text: `${currentName} saiu da sala`,
      count: userCount,
    });

    cleanupRoom(currentRoom);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
