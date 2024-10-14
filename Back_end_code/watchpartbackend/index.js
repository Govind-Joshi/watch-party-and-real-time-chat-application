// server.js
const express = require('express');
const connectDB = require('./src/config/db');
const uidRoutes = require('./src/routes/uidRoutes');
// const { Server } = require('socket.io');
const { createSocketServer } = require('./src/socket/socket');






const app = express();

// Connect to MongoDB..
connectDB();

// Middleware
app.use(express.json());




// Routes
app.use('/api', uidRoutes);

// Start Server
const PORT =  5002;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
createSocketServer(server);








// const express = require('express');
// const connectDB = require('./src/config/db');
// const uidRoutes = require('./src/routes/uidRoutes');
// const { createSocketServer } = require('./src/socket'); // Import the socket server setup

// require('events').EventEmitter.defaultMaxListeners = 20;

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api', uidRoutes);

// // Start Server
// const PORT = 5002;
// const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Setup Socket.IO
// createSocketServer(server);
