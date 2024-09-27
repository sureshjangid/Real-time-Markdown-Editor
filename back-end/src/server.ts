import express, { Request, Response } from 'express';
import http from 'http';
import { Server as WebSocketServer } from 'socket.io';
import { marked } from 'marked'; // To convert Markdown to HTML
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('markdown', (markdownText: string) => {
    const htmlContent = marked(markdownText); // Convert Markdown to HTML
    socket.emit('html', htmlContent); // Send HTML back to the client
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Serve the application on port 4000
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
