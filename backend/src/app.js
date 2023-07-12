const express = require('express');
const cors = require('cors');
const { port } = require('./config');
const db = require('./utils/database');
const http = require('http');
const { Server } = require('socket.io');
const announcementController = require('./controllers/announcement.controller');
const announcementRoutes = require('./routes/announcement.route');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use('/api', announcementRoutes);

app.get('/announcements', announcementController.getAnnouncements);

db.authenticate()
  .then(() => console.log('DB authenticated'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('DB synced'))
  .catch((err) => console.log(err));

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('event', (data) => {
    console.log('Evento recibido:', data);
    io.emit('event', 'Respuesta del servidor');
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log('Server is running on port:', port);
});
