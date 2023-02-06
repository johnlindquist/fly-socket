import { Server } from "socket.io"

const io = new Server(3000, {
  cors: {},
})

const users = []

io.on("connection", socket => {
  const id = socket.id
  users.push(id)

  console.log(`User connected: ${id}`)
  io.emit("users", users)

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${id}`)
    users.splice(users.indexOf(id), 1)
    io.emit("users", users)
  })

  socket.on("message", message => {
    console.log(`Message from ${message.sender} to ${message.recipient}: ${message.text}`)
    io.emit("message", message)
  })
})

console.log(`Server started`)
