import { Socket } from "socket.io"
import { v4 as uuidv4 } from 'uuid'
import { RoomEvents } from "@rtcapp/utils"
export const roomHandler = (socket: Socket) => {
  const rooms = new Map<string, Set<string>>()
  const createRoom = () => {
    const roomId = uuidv4()
    rooms.set(roomId, new Set())
    socket.emit(RoomEvents.Created, roomId)
    console.log('room created')
  }
  const joinRoom = () => {
    console.log('joinRoom')
  }
  const leaveRoom = () => {
    console.log('leaveRoom')
  }
  const sendMessage = () => {
    console.log('sendMessage')
  }
  socket.on(RoomEvents.Create, createRoom)
  socket.on(RoomEvents.Join, joinRoom)
  socket.on(RoomEvents.Leave, leaveRoom)
  socket.on(RoomEvents.Message, sendMessage)
}