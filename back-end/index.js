require('dotenv').config();

const express = require('express');

const app = express();
const path = require('path');

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const cors = require('cors');
const route = require('./routes');
const mongoMessage = require('./services/mongoMessage');

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());
app.use('/login', route.loginRouter);
app.use('/register', route.registerRouter);
app.use('/products', route.productsRouter);
app.use('/profile', route.profileRouter);
app.use('/sales', route.salesRouter);
app.use('/admin', route.adminRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((error, _req, res, _next) => {
  const { message, status } = error;
  if (status < 500) {
    return res.status(status).json(message);
  }
  res.status(500).send(message);
});

io.on('connection', (socket) => {
  const room = socket.handshake.query.clientId;
  // socket.join(room);
  console.log('connection roomJoined:', room);

  socket.on('message', async (payload, clientEmail) => {
    console.log('payload', payload, 'clientEmail', clientEmail);
    await mongoMessage.storeMessage(payload, clientEmail);
    const allChats = await mongoMessage.getAllMessages(clientEmail);
    socket.broadcast.emit('SendAllMessages_from_Message', {
      allChats,
    });
  });

  socket.on('getAllMessages', async (userId) => {
    const allChats = await mongoMessage.getAllMessages(userId);
    console.log('allMessages from socket message: ', allChats);
    socket.emit('SendAllMessages', {
      allChats,
    });
  });
});

http.listen(PORT, () => {
  console.log(`Http Listening PORT ${PORT}`);
});
