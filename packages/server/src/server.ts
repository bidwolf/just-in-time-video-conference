import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { roomHandler } from './handlers/room';
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
io.on('connection', (socket) => {
  console.log('a user connected');
  roomHandler(socket);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
httpServer.listen(8080, () => {
  console.log('listening on *:8080');
});