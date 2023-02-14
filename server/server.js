const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./src/routes/route');
const cookieParser = require('cookie-parser');

const http = require("http");

const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

let countVisitor = 0;
io.on("connection", (socket) => {
    console.log("User visit");

    socket.on("join", param => {
        console.log(`User visit`);
        countVisitor++;
        io.emit('countUsers', countVisitor)
    });

    socket.on("disconnect", param => {
        console.log(`User DC`);
        if(countVisitor > 0){
            countVisitor--;
        }
        io.emit('countUsers', countVisitor)
    });
});

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTION_STRING)
    .then(console.log("Db connected!"))
    .catch(err => console.log(err));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});